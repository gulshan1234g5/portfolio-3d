'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  Html, 
  Environment, 
  ContactShadows,
  useGLTF,
  Float,
  Stars,
} from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const Hero3DScene = () => {
  const { camera, gl, size } = useThree();
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Create procedural geometry for the centerpiece
  const geometry = new THREE.IcosahedronGeometry(2.5, 8);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x0a0a0a,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transmission: 0.3,
    thickness: 0.5,
    ior: 1.5,
    envMapIntensity: 1.5,
  });

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 8 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    sizes[i] = Math.random() * 0.5 + 0.1;

    const color = new THREE.Color();
    color.setHSL(0.45 + Math.random() * 0.1, 1, 0.5 + Math.random() * 0.3);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    velocities[i * 3] = (Math.random() - 0.5) * 0.002;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!loaded) return;
    timeRef.current += delta;

    // Smooth mouse following
    targetRef.current.x = lerp(targetRef.current.x, mouseRef.current.x * 0.5, 0.05);
    targetRef.current.y = lerp(targetRef.current.y, mouseRef.current.y * 0.5, 0.05);

    // Main object rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetRef.current.y * 0.3, 0.02);
      groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRef.current.x * 0.5, 0.02);
      groupRef.current.rotation.z = Math.sin(timeRef.current * 0.2) * 0.05;
    }

    // Particles animation
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += delta * 0.01;

      const positions = particlesRef.current.geometry.attributes.position.array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Boundary check
        const distance = Math.sqrt(
          positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2
        );
        if (distance > 20) {
          const radius = 8 + Math.random() * 8;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = radius * Math.cos(phi);
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Camera subtle movement
    if (!reducedMotion) {
      camera.position.x = lerp(camera.position.x, targetRef.current.x * 0.3, 0.02);
      camera.position.y = lerp(camera.position.y, targetRef.current.y * 0.3, 0.02);
    }
  });

  if (!loaded) {
    setTimeout(() => setLoaded(true), 100);
  }

  return (
    <group ref={groupRef}>
      {/* Environment lighting */}
      <Environment
        background={false}
        files={[
          '/environments/px.png', '/environments/nx.png',
          '/environments/py.png', '/environments/ny.png',
          '/environments/pz.png', '/environments/nz.png',
        ]}
        path="/environments/"
        preset="city"
      />
      
      {/* Subtle ambient occlusion ground */}
      <ContactShadows
        opacity={0.15}
        scale={15}
        blur={2}
        color="#00ff88"
      />

      {/* Main centerpiece - Procedural geometric form */}
      <mesh
        geometry={geometry}
        material={material}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          attach="material"
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
          ior={1.5}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Wireframe overlay for extra detail */}
      <mesh
        geometry={geometry}
        material={{
          type: 'wireframe',
          color: '#00ff88',
          transparent: true,
          opacity: 0.05,
          wireframeLinewidth: 1,
        }}
      />

      {/* Inner glow core */}
      <mesh
        geometry={new THREE.SphereGeometry(1.2, 32, 32)}
        material={{
          type: 'meshBasicMaterial',
          color: '#00ff88',
          transparent: true,
          opacity: 0.08,
          side: THREE.BackSide,
        }}
      />

      {/* Floating particles */}
      <points
        ref={particlesRef}
        geometry={particlesGeometry}
        material={particlesMaterial}
      />

      {/* Outer ring structure */}
      <group>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            geometry={new THREE.RingGeometry(5 + i * 1.5, 5.1 + i * 1.5, 64)}
            material={{
              type: 'meshBasicMaterial',
              color: '#00ff88',
              transparent: true,
              opacity: 0.03,
              side: THREE.DoubleSide,
            }}
            rotation={{ x: -Math.PI / 2, y: i * 0.5 }}
            position={{ y: -3.5 }}
          />
        ))}
      </group>

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

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      shadows={true}
      dpr={[1, 1.5]}
      className="fixed inset-0 -z-10"
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 10, 50]} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-normalBias={0.02}
        shadow-bias={-0.001}
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

      <Hero3DScene />
      
      {/* Floating geometric accents */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial
            color="#00ff88"
            metalness={0.9}
            roughness={0.1}
            transmission={0.5}
            envMapIntensity={1}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} position={[-8, 5, -5]}>
        <mesh>
          <tetrahedronGeometry args={[0.4, 0]} />
          <meshPhysicalMaterial
            color="#00d4ff"
            metalness={0.9}
            roughness={0.1}
            transmission={0.5}
            envMapIntensity={1}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4} position={[8, -5, -5]}>
        <mesh>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshPhysicalMaterial
            color="#ff6b35"
            metalness={0.8}
            roughness={0.2}
            transmission={0.3}
            envMapIntensity={1}
          />
        </mesh>
      </Float>

      {/* Subtle stars */}
      <Stars radius={100} depth={50} count={2000} saturation={0} factor={4} color="#00ff88" opacity={0.1} />
    </Canvas>
  );
}