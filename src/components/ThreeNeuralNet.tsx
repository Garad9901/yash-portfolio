'use client';
/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary';

// ---------------------------------------------------------
// 2D Space Particle Fallback
// ---------------------------------------------------------
function Static2DSpaceGrid({ capCount = 40 }: { capCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; alpha: number }[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const items = Array.from({ length: capCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 + i * 0.1,
      y: Math.random() * 100 + i * 0.1,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
    }));
    setStars(items);
  }, [capCount, shouldReduceMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-transparent select-none">
      <svg className="w-full h-full opacity-40">
        {/* Draw orbit lines */}
        <circle cx="50%" cy="50%" r="150" stroke="#ff7a00" strokeWidth="0.5" fill="none" strokeDasharray="4 8" className="opacity-30" />
        <circle cx="50%" cy="50%" r="280" stroke="#00d9ff" strokeWidth="0.5" fill="none" strokeDasharray="3 6" className="opacity-20" />
        {/* Draw stars */}
        {stars.map((s) => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill={s.id % 4 === 0 ? '#ff7a00' : '#ffffff'}
            style={{ opacity: s.alpha }}
          />
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// 3D Space Scene Components
// ---------------------------------------------------------
function SpaceScene3D() {
  const groupRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);

  const starCount = 350;

  // Generate random stars
  const { starPositions, starColors } = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      // Stars in a sphere shell
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color scheme: mostly white, some orange, some blue
      const randColor = Math.random();
      if (randColor < 0.15) {
        colors[i * 3] = 1.0; // Orange (#ff7a00)
        colors[i * 3 + 1] = 0.48;
        colors[i * 3 + 2] = 0.0;
      } else if (randColor < 0.3) {
        colors[i * 3] = 0.0; // Electric Blue (#00d9ff)
        colors[i * 3 + 1] = 0.85;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 0.9; // White
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1.0;
      }
    }
    return { starPositions: pos, starColors: colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Base slow orbital drift + highly responsive mouse rotation (no dead zones)
      const driftX = Math.sin(time * 0.12) * 0.06;
      const driftY = Math.cos(time * 0.12) * 0.04;
      const targetX = state.pointer.x * 1.8 + driftX;
      const targetY = state.pointer.y * 1.2 + driftY;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.22;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.22;
    }

    if (planetGroupRef.current) {
      // Base floating animation + fast translation on mouse drag
      const floatX = Math.sin(time * 0.2) * 0.08;
      const floatY = Math.cos(time * 0.18) * 0.08;
      const targetPlanetX = 2.0 + state.pointer.x * 2.6 + floatX;
      const targetPlanetY = 0.8 + state.pointer.y * 1.8 + floatY;
      planetGroupRef.current.position.x += (targetPlanetX - planetGroupRef.current.position.x) * 0.25;
      planetGroupRef.current.position.y += (targetPlanetY - planetGroupRef.current.position.y) * 0.25;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.05;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = -time * 0.03;
    }

    // Satellite rotation orbit around planet
    if (satelliteRef.current) {
      const radius = 2.8;
      satelliteRef.current.position.x = Math.cos(time * 0.2) * radius;
      satelliteRef.current.position.z = Math.sin(time * 0.2) * radius;
      satelliteRef.current.position.y = Math.sin(time * 0.1) * 0.5;
      satelliteRef.current.rotation.x = time * 0.2;
      satelliteRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Background Starfield points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Planet system sub-group positioned at [2, 0.8, -2] initially */}
      <group ref={planetGroupRef} position={[2, 0.8, -2]}>
        {/* 2. Central Wireframe Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial 
            wireframe 
            color="#ff7a00" 
            transparent 
            opacity={0.18} 
          />
        </mesh>

        {/* 3. Wireframe Ring surrounding planet */}
        <mesh ref={ringsRef} rotation={[1.2, 0.4, 0]}>
          <torusGeometry args={[1.5, 0.02, 4, 32]} />
          <meshBasicMaterial 
            wireframe 
            color="#00d9ff" 
            transparent 
            opacity={0.25} 
          />
        </mesh>

        {/* 4. Orbit lines */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.8, 2.81, 64]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.06} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 5. Orbital Satellite */}
        <mesh ref={satelliteRef}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial 
            wireframe 
            color="#ffffff" 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      </group>
    </group>
  );
}

// ---------------------------------------------------------
// Main Canvas Assembly
// ---------------------------------------------------------
export default function ThreeNeuralNet() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use 2D space background if user prefers reduced motion or WebGL not available
  if (shouldReduceMotion) {
    return <Static2DSpaceGrid capCount={30} />;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-transparent select-none pointer-events-none z-0">
      <ErrorBoundary fallback={<Static2DSpaceGrid capCount={35} />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#050505']} />
          <SpaceScene3D />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
