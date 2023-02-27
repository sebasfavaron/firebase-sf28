import { useFrame } from "@react-three/fiber";
import type { Ref } from "react";
import { useRef } from "react";
import { Color, Vector3 } from "three";

function Particle({ position }: { position: Vector3 }) {
  const mesh = useRef<THREE.Mesh>();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.y -= 0.1;
      if (mesh.current.position.y < -10) {
        mesh.current.position.y = 10;
      }
    }
  });

  return (
    <mesh ref={mesh as Ref<THREE.Mesh>} position={position}>
      <circleBufferGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={new Color("white")} />
    </mesh>
  );
}

export function ParticleSystem({ count }: { count: number }) {
  const positions: Vector3[] = [];

  for (let i = 0; i < count; i++) {
    positions.push(
      new Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 10,
        (Math.random() - 0.5) * 20
      )
    );
  }

  return (
    <>
      {positions.map((position, index) => (
        <Particle key={index} position={position} />
      ))}
    </>
  );
}
