import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";

function MarketOrb() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.8}>
      <group ref={group}>
        <mesh rotation={[0.2, 0.1, 0.35]}>
          <torusGeometry args={[1.55, 0.018, 12, 120]} />
          <meshStandardMaterial color="#52d8a1" emissive="#188b63" emissiveIntensity={0.35} />
        </mesh>
        <mesh rotation={[1.1, 0.2, -0.25]}>
          <torusGeometry args={[1.18, 0.012, 12, 100]} />
          <meshStandardMaterial color="#78aee9" emissive="#387ed1" emissiveIntensity={0.25} />
        </mesh>
        {[[-1.25, 0.35, 0.2], [-0.4, 0.9, 0.5], [0.45, 0.55, -0.3], [1.15, -0.15, 0.15], [0.2, -1.05, 0.4]].map(
          ([x, y, z], index) => (
            <mesh key={index} position={[x, y, z]}>
              <sphereGeometry args={[index === 3 ? 0.11 : 0.07, 20, 20]} />
              <meshStandardMaterial
                color={index % 2 ? "#52d8a1" : "#ffffff"}
                emissive={index % 2 ? "#188b63" : "#387ed1"}
                emissiveIntensity={0.5}
              />
            </mesh>
          )
        )}
      </group>
    </Float>
  );
}

function ParticleField() {
  const points = useRef();
  const positions = useMemo(() => {
    const value = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      value[index * 3] = (Math.random() - 0.5) * 8;
      value[index * 3 + 1] = (Math.random() - 0.5) * 5;
      value[index * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return value;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.025;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9bd6c1" size={0.025} sizeAttenuation transparent opacity={0.65} />
    </points>
  );
}

function HeroScene() {
  return (
    <div className="finora-hero-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 42 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[4, 4, 5]} intensity={18} color="#dffbf2" />
        <pointLight position={[-4, -2, 3]} intensity={10} color="#79aaf1" />
        <ParticleField />
        <MarketOrb />
      </Canvas>
    </div>
  );
}

export default HeroScene;
