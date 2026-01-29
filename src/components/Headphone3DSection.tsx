import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  PresentationControls,
  MeshTransmissionMaterial,
  useGLTF,
  Html
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Stylized 3D Headphone Model built with primitives
const HeadphoneModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const metalMaterial = (
    <meshStandardMaterial 
      color="#1a1a1a" 
      metalness={0.9} 
      roughness={0.2}
    />
  );

  const accentMaterial = (
    <meshStandardMaterial 
      color="#2a2a2a" 
      metalness={0.8} 
      roughness={0.3}
    />
  );

  const cushionMaterial = (
    <meshStandardMaterial 
      color="#0a0a0a" 
      metalness={0.1} 
      roughness={0.9}
    />
  );

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Headband */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.7, 0.06, 16, 32, Math.PI]} />
        {metalMaterial}
      </mesh>
      
      {/* Headband cushion */}
      <mesh position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.65, 0.04, 8, 32, Math.PI]} />
        {cushionMaterial}
      </mesh>

      {/* Left ear cup connector */}
      <mesh position={[-0.7, 0.4, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
        {metalMaterial}
      </mesh>

      {/* Right ear cup connector */}
      <mesh position={[0.7, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
        {metalMaterial}
      </mesh>

      {/* Left ear cup housing */}
      <group position={[-0.85, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.35, 0.38, 0.15, 32]} />
          {metalMaterial}
        </mesh>
        {/* Ear cushion */}
        <mesh position={[0.08, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.28, 0.1, 16, 32]} />
          {cushionMaterial}
        </mesh>
        {/* Driver grille */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.3, 32]} />
          {accentMaterial}
        </mesh>
        {/* Logo accent ring */}
        <mesh position={[-0.085, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.15, 0.18, 32]} />
          <meshStandardMaterial color="#3a3a3a" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Right ear cup housing */}
      <group position={[0.85, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.35, 0.38, 0.15, 32]} />
          {metalMaterial}
        </mesh>
        {/* Ear cushion */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.28, 0.1, 16, 32]} />
          {cushionMaterial}
        </mesh>
        {/* Driver grille */}
        <mesh position={[0.08, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.3, 32]} />
          {accentMaterial}
        </mesh>
        {/* Logo accent ring */}
        <mesh position={[0.085, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <ringGeometry args={[0.15, 0.18, 32]} />
          <meshStandardMaterial color="#3a3a3a" metalness={1} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};

const LoadingFallback = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border border-varg-white/20 rounded-full border-t-varg-white/80 animate-spin" />
      <span className="text-caption">Loading 3D Model...</span>
    </div>
  </Html>
);

export const Headphone3DSection = () => {
  return (
    <section className="relative py-32 bg-varg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-varg-dark to-varg-black opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-caption">Interactive</span>
            <h2 className="text-hero text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Explore Every Angle
            </h2>
            <p className="text-body text-lg md:text-xl max-w-lg mb-8">
              Drag to rotate and explore the precision craftsmanship of the Varg X. 
              Every curve, every material, designed for acoustic perfection.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="glass-card px-6 py-4">
                <p className="text-caption text-xs">Material</p>
                <p className="text-hero text-lg">Titanium Alloy</p>
              </div>
              <div className="glass-card px-6 py-4">
                <p className="text-caption text-xs">Finish</p>
                <p className="text-hero text-lg">Matte Black</p>
              </div>
              <div className="glass-card px-6 py-4">
                <p className="text-caption text-xs">Cushions</p>
                <p className="text-hero text-lg">Memory Foam</p>
              </div>
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Canvas
              camera={{ position: [0, 0, 3], fov: 45 }}
              style={{ background: "transparent" }}
            >
              <Suspense fallback={<LoadingFallback />}>
                <ambientLight intensity={0.3} />
                <spotLight
                  position={[5, 5, 5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={1}
                  castShadow
                />
                <spotLight
                  position={[-5, 5, -5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={0.5}
                />
                <pointLight position={[0, -3, 0]} intensity={0.3} color="#ffffff" />
                
                <PresentationControls
                  global
                  config={{ mass: 2, tension: 500 }}
                  snap={{ mass: 4, tension: 1500 }}
                  rotation={[0.1, 0.2, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                  <Float
                    speed={2}
                    rotationIntensity={0.2}
                    floatIntensity={0.3}
                  >
                    <HeadphoneModel />
                  </Float>
                </PresentationControls>
                
                <Environment preset="city" />
              </Suspense>
            </Canvas>

            {/* Interaction hint */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 15l-6-6m0 6l6-6" strokeLinecap="round" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>Drag to rotate</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Headphone3DSection;
