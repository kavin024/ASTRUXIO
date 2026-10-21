import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { isMobileViewport } from '../hooks/useScrollProgress'
import { asset } from '../lib/asset'

function useHeroPose(progress, mobile) {
  return (value, mobileView) => {
    const scaleFactor = mobileView ? 0.65 : 1

    if (value < 0.1) {
      return { x: 0, y: 0.6, z: 0, scale: 0.7 * scaleFactor }
    }
    if (value < 0.25) {
      return {
        x: 0,
        y: 0.6 - 2.4 * ((value - 0.1) / 0.15),
        z: 0,
        scale: 0.7 * scaleFactor,
      }
    }
    if (value < 0.45) {
      return {
        x: 0,
        y: -1.8 - 1.4 * ((value - 0.25) / 0.2),
        z: 0,
        scale: 0.6 * scaleFactor,
      }
    }
    return {
      x: 0,
      y: -3.2 - 5 * Math.min((value - 0.45) / 0.55, 1),
      z: 0,
      scale: 0.5 * scaleFactor,
    }
  }
}

function HeroSculpture({ progressRef }) {
  const group = useRef(null)
  const sphere = useRef(null)
  const glow = useRef(null)
  const glowOuter = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const ringC = useRef(null)
  const beams = useRef(null)
  const points = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const started = useRef(false)
  const mobile = useRef(isMobileViewport())

  useEffect(() => {
    const onResize = () => {
      mobile.current = isMobileViewport()
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const particles = useMemo(() => {
    const positions = new Float32Array(360)
    for (let i = 0; i < 120; i++) {
      const theta = Math.acos(2 * Math.random() - 1)
      const phi = Math.random() * Math.PI * 2
      const radius = 1.8 + Math.random() * 0.8
      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
      positions[i * 3 + 2] = radius * Math.cos(theta)
    }
    return { positions, count: 120 }
  }, [])

  useEffect(() => {
    if (isMobileViewport()) return
    const onMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const poseFor = useHeroPose()

  useFrame((state, delta) => {
    if (!group.current) return

    const progress = progressRef.current
    const pose = poseFor(progress, mobile.current)
    const time = state.clock.elapsedTime

    if (!started.current) {
      group.current.scale.set(0.01, 0.01, 0.01)
      started.current = true
    }

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.03
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.03

    const offsetX = smoothMouse.current.x * 0.3
    const offsetY = smoothMouse.current.y * 0.15
    const speed = 0.05 * 60 * delta

    group.current.position.x += (pose.x + offsetX - group.current.position.x) * speed
    group.current.position.y += (pose.y + offsetY - group.current.position.y) * speed
    group.current.position.z += (pose.z - group.current.position.z) * speed

    group.current.scale.x += (pose.scale - group.current.scale.x) * speed
    group.current.scale.y += (pose.scale - group.current.scale.y) * speed
    group.current.scale.z += (pose.scale - group.current.scale.z) * speed

    group.current.rotation.x = Math.sin(time * 0.15) * 0.1 + smoothMouse.current.y * 0.1
    group.current.rotation.z = Math.cos(time * 0.12) * 0.06 - smoothMouse.current.x * 0.05

    if (sphere.current) {
      const pulse = 1 + Math.sin(time * 1.5) * 0.025
      sphere.current.scale.set(pulse, pulse, pulse)
      sphere.current.rotation.y = time * 0.1
    }

    if (glow.current) {
      glow.current.material.opacity = 0.12 + Math.sin(time * 2) * 0.08
      const pulse = 1.05 + Math.sin(time * 2) * 0.03
      glow.current.scale.set(pulse, pulse, pulse)
    }

    if (glowOuter.current) {
      glowOuter.current.material.opacity = 0.04 + Math.sin(time * 1.2 + 1) * 0.03
      const pulse = 1.3 + Math.sin(time * 0.8) * 0.08
      glowOuter.current.scale.set(pulse, pulse, pulse)
    }

    if (ringA.current) {
      ringA.current.rotation.z = time * (0.2 + Math.sin(time * 0.2) * 0.05)
      ringA.current.rotation.x = Math.sin(time * 0.5) * 0.08
    }
    if (ringB.current) {
      ringB.current.rotation.x = time * (0.15 + Math.sin(time * 0.15) * 0.04)
      ringB.current.rotation.z = Math.sin(time * 0.25 + 1) * 0.04
    }
    if (ringC.current) {
      ringC.current.rotation.y = time * (0.25 + Math.sin(time * 0.2) * 0.06)
      ringC.current.rotation.x = Math.cos(time * 0.2 + 2) * 0.03
    }

    if (beams.current) {
      beams.current.rotation.y = time * 0.08
      const children = beams.current.children
      for (let i = 0; i < children.length; i++) {
        const material = children[i].material
        const cycle = (time * 2 + i * 1.5) % 6
        material.opacity = cycle < 1 ? Math.sin(cycle * Math.PI) * 0.7 : 0
      }
    }

    if (points.current) {
      points.current.rotation.y = time * 0.05
      points.current.material.opacity = 0.3 + Math.sin(time * 1.5) * 0.15
    }
  })

  return (
    <group ref={group}>
      <mesh ref={sphere}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#C9843A"
          metalness={0.9}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2.5}
          reflectivity={1}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.805, 0.008, 16, 128]} />
        <meshStandardMaterial color="#C9843A" emissive="#C9843A" emissiveIntensity={5} />
      </mesh>

      <mesh>
        <torusGeometry args={[0.805, 0.005, 16, 128]} />
        <meshStandardMaterial color="#E8A85A" emissive="#E8A85A" emissiveIntensity={4} />
      </mesh>

      <mesh ref={glow}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#C9843A"
          transparent
          opacity={0.12}
          side={1}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={glowOuter}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color="#E8A85A"
          transparent
          opacity={0.05}
          side={1}
          depthWrite={false}
        />
      </mesh>

      <pointLight color="#C9843A" intensity={4} distance={6} decay={2} />

      <group ref={beams}>
        {[0, 1, 2, 3].map((index) => (
          <mesh key={`beam-${index}`} rotation={[0, (Math.PI / 2) * index, 0]}>
            <boxGeometry args={[0.01, 0.01, 2]} />
            <meshBasicMaterial color="#4F46E5" transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
      </group>

      <group ref={ringA}>
        <mesh>
          <torusGeometry args={[1.4, 0.035, 32, 128]} />
          <meshPhysicalMaterial
            color="#DDD4C5"
            metalness={0.85}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={4}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[1.4, 0.012, 8, 128]} />
          <meshStandardMaterial color="#C9843A" emissive="#C9843A" emissiveIntensity={6} />
        </mesh>
        {[0, 1, 2, 3].map((index) => (
          <mesh
            key={index}
            position={[
              Math.cos((index * Math.PI) / 2) * 1.4,
              Math.sin((index * Math.PI) / 2) * 1.4,
              0,
            ]}
          >
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#E8A85A" emissive="#E8A85A" emissiveIntensity={4} />
          </mesh>
        ))}
      </group>

      <group ref={ringB}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.7, 0.03, 32, 128]} />
          <meshPhysicalMaterial
            color="#DDD4C5"
            metalness={0.85}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={4}
          />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.7, 0.01, 8, 128]} />
          <meshStandardMaterial color="#E8A85A" emissive="#E8A85A" emissiveIntensity={5} />
        </mesh>
        {[0, 1, 2, 3].map((index) => (
          <mesh
            key={index}
            position={[0, Math.cos((index * Math.PI) / 2) * 1.7, Math.sin((index * Math.PI) / 2) * 1.7]}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#C9843A" emissive="#C9843A" emissiveIntensity={4} />
          </mesh>
        ))}
      </group>

      <group ref={ringC}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.025, 32, 128]} />
          <meshPhysicalMaterial
            color="#DDD4C5"
            metalness={0.85}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={4}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.008, 8, 128]} />
          <meshStandardMaterial color="#B09880" emissive="#B09880" emissiveIntensity={4} />
        </mesh>
        {[0, 1, 2, 3].map((index) => (
          <mesh
            key={index}
            position={[Math.cos((index * Math.PI) / 2) * 2, 0, Math.sin((index * Math.PI) / 2) * 2]}
          >
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#C9843A" emissive="#C9843A" emissiveIntensity={4} />
          </mesh>
        ))}
      </group>

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
            count={particles.count}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#C9843A"
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={2}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function HeroScene({ progressRef }) {
  const mobile = isMobileViewport()
  const wrapRef = useRef(null)
  const [rendering, setRendering] = useState(true)

  // The hero canvas used to keep rendering at 60fps for the entire page, even
  // after the hero scrolled away. Pausing it off-screen gives scrolling the
  // whole frame budget back.
  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setRendering(entry.isIntersecting),
      { rootMargin: '200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="three-canvas-wrap">
      <Canvas
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        frameloop={rendering ? 'always' : 'never'}
        camera={{ position: [0, 0, mobile ? 3.8 : 4.5], fov: 40 }}
        gl={{
          antialias: !mobile,
          alpha: true,
          toneMapping: 4,
          toneMappingExposure: 1.2,
          powerPreference: 'high-performance',
        }}
        dpr={[1, mobile ? 1 : 1.25]}
      >
        <directionalLight position={[8, 8, 6]} intensity={3.5} color="#FFF0D8" />
        <directionalLight position={[-6, 4, -4]} intensity={1.8} color="#FFD49A" />
        <directionalLight position={[0, -4, -8]} intensity={0.8} color="#F5EDE0" />
        <ambientLight intensity={0.8} color="#F2EDE4" />
        <Environment files={asset('hdri/studio_small_03_1k.hdr')} />
        <Suspense fallback={null}>
          <HeroSculpture progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
