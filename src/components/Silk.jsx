import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
  float pattern = 0.6 + 0.4 * sin(5.0 * (tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset) + sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`

function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ]
}

function SilkPlane({ uniforms }) {
  const ref = useRef(null)
  const { viewport, invalidate } = useThree()

  useLayoutEffect(() => {
    if (ref.current) ref.current.scale.set(viewport.width, viewport.height, 1)
  }, [viewport])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.material.uniforms.uTime.value += 0.1 * delta
    invalidate()
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  )
}

/**
 * Animated silk backdrop recovered from the shipped bundle (`K_`).
 */
export default function Silk({
  speed = 5,
  scale = 1,
  color = '#C9843A',
  noiseIntensity = 1.5,
  rotation = 0,
}) {
  const container = useRef(null)
  const [visible, setVisible] = useState(true)

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new THREE.Vector3(...hexToRgb(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    // The bundle initialises these once and updates them in the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    uniforms.uSpeed.value = speed
    uniforms.uScale.value = scale
    uniforms.uNoiseIntensity.value = noiseIntensity
    uniforms.uColor.value.set(...hexToRgb(color))
    uniforms.uRotation.value = rotation
  }, [speed, scale, noiseIntensity, color, rotation, uniforms])

  useEffect(() => {
    if (!container.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(container.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={container} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.25]}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <SilkPlane uniforms={uniforms} />
      </Canvas>
    </div>
  )
}
