'use client';

import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const STAR_COUNT = 200;

const StarField = ({ count = STAR_COUNT, reducedMotion }: { count?: number; reducedMotion: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    timeRef.current += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.002;
      pointsRef.current.rotation.x += delta * 0.001;
    }
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const radius = 50 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const color = new THREE.Color('#00ff88');
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = Math.random() * 2 + 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true,
    transparent: true,
    opacity: 0.15,
    sizeAttenuation: true,
    depthWrite: false,
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const Icosahedron = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (!meshRef.current) return;

    if (!reducedMotion) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.3;
    }

    if (hovered && !reducedMotion) {
      meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, 1.1, delta * 5));
    } else {
      meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, 1, delta * 5));
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[2.5, 2]} />
      <meshStandardMaterial
        color="#00ff88"
        metalness={0.9}
        roughness={0.1}
        emissive="#00ff88"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const HeroScene = ({ onCreated, isVisible }: { onCreated: () => void; isVisible: boolean }) => {
  const { camera } = useThree();
  const reducedMotion = useReducedMotion();

  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!isVisible) return;
    
    timeRef.current += delta;

    targetRef.current.x = lerp(targetRef.current.x, mouseRef.current.x * 0.5, 0.05);
    targetRef.current.y = lerp(targetRef.current.y, mouseRef.current.y * 0.5, 0.05);

    if (groupRef.current) {
      groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetRef.current.y * 0.3, 0.02);
      groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRef.current.x * 0.5, 0.02);
      groupRef.current.rotation.z = Math.sin(timeRef.current * 0.2) * 0.05;
    }

    if (!reducedMotion) {
      camera.position.x = lerp(camera.position.x, targetRef.current.x * 0.3, 0.02);
      camera.position.y = lerp(camera.position.y, targetRef.current.y * 0.3, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      <Icosahedron reducedMotion={reducedMotion} />
      <StarField count={STAR_COUNT} reducedMotion={reducedMotion} />

      <pointLight
        color="#00ff88"
        intensity={0.5}
        distance={30}
        position={[5, 10, 5]}
        decay={2}
      />
      <pointLight
        color="#00d4ff"
        intensity={0.3}
        distance={30}
        position={[-5, -5, -5]}
        decay={2}
      />
    </group>
  );
};

export function HeroCanvas({ onCreated }: { onCreated: () => void }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px', threshold: 0 }
    );

    const canvas = document.querySelector('canvas');
    if (canvas) observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: isMobile ? 50 : 45 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
      shadows={false}
      dpr={[1, 2]}
      className="fixed inset-0 -z-10"
      onCreated={() => {
        console.log('[Hero] Canvas ready');
        onCreated();
      }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 10, 50]} />
      
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={2}
        color="#ffffff"
      />
      <directionalLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color="#00ff88"
      />

      <HeroScene onCreated={onCreated} isVisible={isVisible} />

      <Html
        as="div"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </Html>
    </Canvas>
  );
}