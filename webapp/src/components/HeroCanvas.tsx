'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function FloatingPlatform() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) * 0.3;
    group.current.position.y = Math.sin(t) * 0.15;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[3, 3.2, 0.35, 64]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.3}
          metalness={0.6}
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
        />
      </mesh>

      <Float floatIntensity={1.2} rotationIntensity={0.2}>
        <group>
          <mesh position={[-1.5, 0.2, 0.8]} rotation={[0.2, 0.4, 0.1]}>
            <boxGeometry args={[1.6, 1, 0.18]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.4} roughness={0.2} />
          </mesh>

          <mesh position={[1.2, 0.6, -0.6]} rotation={[-0.3, -0.8, 0.2]}>
            <boxGeometry args={[1.8, 1.2, 0.2]} />
            <meshStandardMaterial color="#f97316" metalness={0.35} roughness={0.25} />
          </mesh>

          <mesh position={[0.2, 1.4, 0]}>
            <torusKnotGeometry args={[0.5, 0.2, 120, 16]} />
            <meshStandardMaterial
              color="#f8fafc"
              metalness={0.8}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>

          <mesh position={[0.3, 0.15, 1.4]} rotation={[0.4, 0.2, -0.2]}>
            <boxGeometry args={[1.1, 1.6, 0.18]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.4} />
          </mesh>

          <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[1.8, 1.95, 42]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function SparkParticles() {
  const count = 1200;
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = 6 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5;
      arr[i] = Math.cos(angle) * r;
      arr[i + 1] = y;
      arr[i + 2] = Math.sin(angle) * r;
    }
    return arr;
  });

  const material = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.85,
    });
    return m;
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export function HeroCanvas() {
  return (
    <div className="h-full min-h-[480px] w-full overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950/80">
      <Suspense fallback={<div className="h-full w-full animate-pulse bg-slate-900" />}>
        <Canvas shadows dpr={[1, 1.5]}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 12, 24]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 6, 6]} intensity={1.5} castShadow />
          <spotLight position={[-6, 7, -4]} angle={0.7} penumbra={0.6} intensity={1} />
          <SparkParticles />
          <FloatingPlatform />
          <Environment preset="city" />
          <PerspectiveCamera makeDefault position={[0, 3.2, 9]} fov={32} />
        </Canvas>
      </Suspense>
    </div>
  );
}
