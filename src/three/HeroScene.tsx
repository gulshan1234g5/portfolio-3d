'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const Hero3DScene = ({ onCreated }: { onCreated: () => void }) => {
  const { camera, gl, size } = useThree();
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // All refs declared once at the top
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Create procedural geometry for the centerpiece - SINGLE DECLARATION
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.5, 8), []);
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transmission: 0.3,
    thickness: 0.5,
    ior: 1.5,
    envMapIntensity: 1.5,
  }), []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Smooth mouse following
    targetRef.current.x = lerp(targetRef.current.x, mouseRef.current.x * 0.5, 0.05);
    targetRef.current.y = lerp(targetRef.current.y, mouseRef.current.y * 0.5, 0.05);

    // Main object rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetRef.current.y * 0.3, 0.02);
      groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRef.current.x * 0.5, 0.02);
      groupRef.current.rotation.z = Math.sin(timeRef.current * 0.2) * 0.05;
    }

    // Camera subtle movement
    if (!reducedMotion) {
      camera.position.x = lerp(camera.position.x, targetRef.current.x * 0.3, 0.02);
      camera.position.y = lerp(camera.position.y, targetRef.current.y * 0.3, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main centerpiece - Simple procedural geometric form */}
      <mesh
        geometry={new THREE.IcosahedronGeometry(2.5, 8)}
        material={new THREE.MeshStandardMaterial({
          color: 0x0a0a0a,
          metalness: 0.8,
          roughness: 0.2,
        })}
      />

      {/* Subtle rim light */}
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

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function HeroCanvas({ onCreated }: { onCreated: () => void }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

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
      dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      className="fixed inset-0 -z-10"
      onCreated={() => {
        console.log('[Hero] WebGL canvas created successfully');
        // The callback is called after the canvas is created and first render
      }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 10, 50]} />
      
      {/* Lighting setup - minimal */}
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
      <pointLight
        color="#00ff88"
        intensity={20}
        distance={30}
        decay={2}
        position={[0, 5, 10]}
      />
      <pointLight
        color="#00d4ff"
        intensity={10}
        distance={30}
        decay={2}
        position={[-10, -5, -5]}
      />

      {/* Simple rotating icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial
          color="#00ff88"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Subtle stars */}
      <Stars radius={100} depth={50} count={200} saturation={0} factor={4} color="#00ff88" opacity={0.1} />
    </Canvas>
  );
}