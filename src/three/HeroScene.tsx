'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const HeroScene = ({ onCreated }: { onCreated: () => void }) => {
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
      <mesh>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial
          color="#00ff88"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

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

      <HeroScene onCreated={onCreated} />

      <Stars radius={100} depth={50} count={100} saturation={0} factor={4} color="#00ff88" opacity={0.1} />
    </Canvas>
  );
}