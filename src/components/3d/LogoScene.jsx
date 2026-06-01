import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { getProject, types } from '@theatre/core'
import { projectState } from '../../theatre/projectState'
import * as THREE from 'three'

const project = getProject('FORGE3D Logo', { state: projectState })
const sheet = project.sheet('LogoAnimation')

function ParticleBurst({ active }) {
  const ref = useRef()
  const count = 200
  const { positions, targets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const tgt = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3]=(Math.random()-0.5)*14; pos[i*3+1]=(Math.random()-0.5)*8; pos[i*3+2]=(Math.random()-0.5)*8
      tgt[i*3]=(Math.random()-0.5)*0.5; tgt[i*3+1]=(Math.random()-0.5)*0.5; tgt[i*3+2]=(Math.random()-0.5)*0.5
    }
    return { positions: pos, targets: tgt }
  }, [])
  const progress = useRef(0)
  useFrame((_, delta) => {
    if (!ref.current) return
    if (active) progress.current = Math.min(1, progress.current + delta * 0.8)
    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      pos.array[i*3]   = positions[i*3]   + (targets[i*3]   - positions[i*3])   * progress.current
      pos.array[i*3+1] = positions[i*3+1] + (targets[i*3+1] - positions[i*3+1]) * progress.current
      pos.array[i*3+2] = positions[i*3+2] + (targets[i*3+2] - positions[i*3+2]) * progress.current
    }
    pos.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} /></bufferGeometry>
      <pointsMaterial size={0.05} color="#6C63FF" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function OrbitalRing({ radius, speed, color, tilt }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) { ref.current.rotation.y = clock.getElapsedTime()*speed; ref.current.rotation.x = tilt }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 16, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.8} />
    </mesh>
  )
}

function TheatreLogoMesh({ visible }) {
  const meshRef = useRef()
  const lightRef = useRef()
  useEffect(() => {
    if (!visible) return
    const logoObj = sheet.object('LogoMesh', {
      position: types.compound({ x: types.number(0,{range:[-5,5]}), y: types.number(0,{range:[-3,3]}), z: types.number(0,{range:[-5,5]}) }),
      rotation: types.compound({ x: types.number(0,{range:[-Math.PI,Math.PI]}), y: types.number(0,{range:[-Math.PI,Math.PI]}), z: types.number(0,{range:[-Math.PI,Math.PI]}) }),
      scale: types.compound({ x: types.number(0,{range:[0,3]}), y: types.number(0,{range:[0,3]}), z: types.number(0,{range:[0,3]}) }),
      emissiveIntensity: types.number(0.3,{range:[0,3]}),
    })
    const lightObj = sheet.object('PointLight', {
      intensity: types.number(2,{range:[0,10]}), colorR: types.number(0.42,{range:[0,1]}), colorG: types.number(0.38,{range:[0,1]}), colorB: types.number(1,{range:[0,1]}),
    })
    const unsubLogo = logoObj.onValuesChange((v) => {
      if (!meshRef.current) return
      meshRef.current.position.set(v.position.x,v.position.y,v.position.z)
      meshRef.current.rotation.set(v.rotation.x,v.rotation.y,v.rotation.z)
      meshRef.current.scale.set(v.scale.x,v.scale.y,v.scale.z)
      if (meshRef.current.material) meshRef.current.material.emissiveIntensity = v.emissiveIntensity
    })
    const unsubLight = lightObj.onValuesChange((v) => {
      if (!lightRef.current) return
      lightRef.current.intensity = v.intensity
      lightRef.current.color.setRGB(v.colorR,v.colorG,v.colorB)
    })
    sheet.sequence.play({ iterationCount:1, range:[0,6] })
    return () => { unsubLogo(); unsubLight() }
  }, [visible])
  if (!visible) return null
  return (
    <>
      <pointLight ref={lightRef} position={[0,0,3]} intensity={2} color="#6C63FF" />
      <group ref={meshRef} scale={[0,0,0]}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.3} metalness={0.7} roughness={0.1} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.22, 1]} />
          <meshBasicMaterial color="#A09BFF" wireframe transparent opacity={0.3} />
        </mesh>
        <Sparkles count={40} scale={3} size={2} speed={0.5} color="#6C63FF" />
      </group>
    </>
  )
}

function Scene() {
  const [phase, setPhase] = useState('particles')
  const [showLogo, setShowLogo] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(()=>setPhase('converge'),500)
    const t2 = setTimeout(()=>{setShowLogo(true);setPhase('logo')},2000)
    return ()=>[t1,t2].forEach(clearTimeout)
  }, [])
  return (
    <>
      <color attach="background" args={['#F5F3FF']} />
      <ambientLight intensity={2} />
      <pointLight position={[5,5,5]} intensity={1} color="#FF6584" />
      <pointLight position={[-5,-3,-5]} intensity={0.5} color="#43E8D8" />
      <ParticleBurst active={phase==='converge'||phase==='logo'} />
      <OrbitalRing radius={2.2} speed={0.5}  color="#6C63FF" tilt={0.3}  />
      <OrbitalRing radius={3.0} speed={-0.3} color="#FF6584" tilt={-0.5} />
      <OrbitalRing radius={3.8} speed={0.2}  color="#43E8D8" tilt={1.0}  />
      <TheatreLogoMesh visible={showLogo} />
      <Environment preset="studio" />
      <EffectComposer>
        <Bloom luminanceThreshold={0.85} intensity={0.5} />
      </EffectComposer>
    </>
  )
}

export default function LogoScene() {
  return (
    <Canvas camera={{position:[0,0,8],fov:50}} style={{height:'100vh'}}>
      <Scene />
    </Canvas>
  )
}
