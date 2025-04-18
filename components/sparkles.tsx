"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion } from "framer-motion"

type Sparkle = {
  id: string
  size: number
  color: string
  style: {
    top: string
    left: string
    zIndex: number
  }
}

type SparklesProps = {
  children: ReactNode
  big?: boolean
}

export function Sparkles({ children, big = false }: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const colors = ["#FFD700", "#FFC0CB", "#FFFFFF"]

  const generateSparkle = (): Sparkle => {
    return {
      id: Math.random().toString(36).substring(2),
      size: big ? Math.random() * 10 + 10 : Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        zIndex: 2,
      },
    }
  }

  useEffect(() => {
    const sparkleCount = big ? 20 : 10

    // Create initial sparkles
    const initialSparkles = Array.from({ length: sparkleCount }, () => generateSparkle())
    setSparkles(initialSparkles)

    // Add new sparkles periodically
    const interval = setInterval(() => {
      setSparkles((prev) => [...prev.slice(1), generateSparkle()])
    }, 500)

    return () => clearInterval(interval)
  }, [big])

  return (
    <div className="relative inline-block">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={sparkle.style}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.div>
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
