import { Canvas } from "@react-three/fiber";
import { type NextPage } from "next";
import Head from "next/head";
import NoSSR from "../components/NoSSR";
import { ParticleSystem } from "../components/ParticleSystem";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ThreeJS</title>
      </Head>
      <div className="h-screen w-full">
        <Canvas className="">
          <ambientLight intensity={0.1} />
          <directionalLight color="blue" position={[0, 0, 5]} />
          <pointLight position={[10, 10, 10]} />
          <NoSSR>
            <ParticleSystem count={300} />
          </NoSSR>
        </Canvas>
      </div>
    </>
  );
};

export default Home;
