'use client'

import { colors } from "@/lib/theme/tokens"
import { Float } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

type OrbitNode = {
  r: number
  speed: number
  phi: number
  size: number
  hue: "amber" | "cyan"
}

type OrbitalNetworkConfig = {
  // Node configuration
  nodeCount?: number
  nodeMinSize?: number
  nodeMaxSize?: number
  nodeMinRadius?: number
  nodeMaxRadius?: number
  nodeMinSpeed?: number
  nodeMaxSpeed?: number
  nodeAmberRatio?: number // 0-1, probability of amber vs cyan
  nodeOpacity?: number
  nodePrimaryColor?: string // Color for primary nodes (default: cyan)
  nodeSecondaryColor?: string // Color for secondary nodes (default: amber)
  
  // Ring configuration
  rings?: Array<{
    radius: number
    color: string
    opacity: number
  }>
  
  // Animation configuration
  floatSpeed?: number
  floatRotationIntensity?: number
  floatIntensity?: number
  
  // Camera configuration
  cameraZoom?: number
  ellipseRatio?: number // 0-1, controls vertical compression
  
  // Position and scale
  scale?: number // Overall scale multiplier (1 = default size)
  offsetX?: number // Horizontal offset in viewport units (-1 to 1)
  offsetY?: number // Vertical offset in viewport units (-1 to 1)
  
  // Performance
  sphereSegments?: number
  ringPoints?: number
}

type OrbitsProps = {
  config: Required<OrbitalNetworkConfig>
  reduceMotion?: boolean
}

function Orbits({ config, reduceMotion = false }: OrbitsProps) {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo<OrbitNode[]>(() => {
    return Array.from({ length: config.nodeCount }).map(() => ({
      r: THREE.MathUtils.lerp(config.nodeMinRadius, config.nodeMaxRadius, Math.random()),
      speed: reduceMotion ? 0 : THREE.MathUtils.lerp(config.nodeMinSpeed, config.nodeMaxSpeed, Math.random()),
      phi: Math.random() * Math.PI * 2,
      size: THREE.MathUtils.lerp(config.nodeMinSize, config.nodeMaxSize, Math.random()),
      hue: Math.random() > config.nodeAmberRatio ? "amber" : "cyan",
    }))
  }, [config, reduceMotion])

  useFrame((_, dt) => {
    if (reduceMotion) return
    nodes.forEach((node) => {
      node.phi += node.speed * dt
    })

    if (!group.current) return
    group.current.children.forEach((mesh: THREE.Object3D, index: number) => {
      const node = nodes[index]
      if (!node) return
      mesh.position.set(
        Math.cos(node.phi) * node.r,
        Math.sin(node.phi) * node.r * config.ellipseRatio,
        0,
      )
    })
  })

  return (
    <group ref={group}>
      {nodes.map((node, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(node.phi) * node.r,
            Math.sin(node.phi) * node.r * config.ellipseRatio,
            0,
          ]}
        >
          <sphereGeometry args={[node.size, config.sphereSegments, config.sphereSegments]} />
          <meshBasicMaterial
            color={node.hue === "cyan" ? config.nodePrimaryColor : config.nodeSecondaryColor}
            transparent
            opacity={config.nodeOpacity}
          />
        </mesh>
      ))}
    </group>
  )
}

type RingsProps = {
  config: Required<OrbitalNetworkConfig>
}

function Rings({ config }: RingsProps) {
  const rings = useMemo(() => {
    return config.rings.map((ring) => {
      const points = Array.from({ length: config.ringPoints }).map((_, index) => {
        const theta = (index / config.ringPoints) * Math.PI * 2
        return new THREE.Vector3(
          Math.cos(theta) * ring.radius,
          Math.sin(theta) * ring.radius * config.ellipseRatio,
          0,
        )
      })

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: ring.color,
        transparent: true,
        opacity: ring.opacity,
      })

      return { geometry, material, radius: ring.radius }
    })
  }, [config])

  return (
    <group>
      {rings.map((ring) => (
        <primitive key={ring.radius} object={new THREE.Line(ring.geometry, ring.material)} />
      ))}
    </group>
  )
}

const DEFAULT_CONFIG: Required<OrbitalNetworkConfig> = {
  // Node configuration
  nodeCount: 72,
  nodeMinSize: 0.015,
  nodeMaxSize: 0.06,
  nodeMinRadius: 1.5,
  nodeMaxRadius: 5.5,
  nodeMinSpeed: 0.02,
  nodeMaxSpeed: 0.08,
  nodeAmberRatio: 0.25, // 25% amber, 75% cyan
  nodeOpacity: 0.85,
  nodePrimaryColor: colors.accentCyan,
  nodeSecondaryColor: colors.accentAmber,
  
  // Ring configuration
  rings: [
    { radius: 2, color: colors.accentCyan, opacity: 0.15 },
    { radius: 3.2, color: colors.accentAmber, opacity: 0.12 },
    { radius: 4.6, color: colors.accentCyan, opacity: 0.15 },
    { radius: 5.8, color: colors.accentAmber, opacity: 0.12 },
  ],
  
  // Animation configuration
  floatSpeed: 0.6,
  floatRotationIntensity: 0.1,
  floatIntensity: 0.4,
  
  // Camera configuration
  cameraZoom: 100,
  ellipseRatio: 0.5, // Makes orbits elliptical
  
  // Position and scale
  scale: 1,
  offsetX: 0, // 0 = center, 1 = right edge, -1 = left edge
  offsetY: 0, // 0 = center, 1 = top edge, -1 = bottom edge
  
  // Performance
  sphereSegments: 16,
  ringPoints: 256,
}

type OrbitalNetworkProps = {
  config?: Partial<OrbitalNetworkConfig>
  className?: string
}

export default function OrbitalNetwork({ 
  config: userConfig, 
  className = "absolute inset-0 pointer-events-none" 
}: OrbitalNetworkProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const config = useMemo<Required<OrbitalNetworkConfig>>(() => ({
    ...DEFAULT_CONFIG,
    ...userConfig,
    rings: userConfig?.rings ?? DEFAULT_CONFIG.rings,
  }), [userConfig])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setIsReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return (
    <div aria-hidden className={className}>
      <Canvas orthographic camera={{ zoom: config.cameraZoom, position: [0, 0, 10] }}>
        <Float
          speed={isReducedMotion ? 0 : config.floatSpeed}
          rotationIntensity={isReducedMotion ? 0 : config.floatRotationIntensity}
          floatIntensity={isReducedMotion ? 0 : config.floatIntensity}
        >
          <group 
            scale={config.scale}
            position={[config.offsetX * 5, config.offsetY * 5, 0]}
          >
            <Rings config={config} />
            <Orbits config={config} reduceMotion={isReducedMotion} />
          </group>
        </Float>
      </Canvas>
    </div>
  )
}
