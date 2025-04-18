"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Balloon = {
  id: number
  x: number
  size: number
  color: string
  duration: number
  delay: number
}

const colors = [
  "text-pink-500",
  "text-pink-400",
  "text-red-400",
  "text-yellow-400",
  "text-blue-400",
  "text-purple-400",
  "text-green-400",
]

export function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    // Create initial balloons
    const initialBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (0-100%)
      size: Math.random() * 30 + 30, // random size (30-60px)
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 20, // random animation duration (20-30s)
      delay: Math.random() * 5, // random delay (0-5s)
    }))

    setBalloons(initialBalloons)

    // Add new balloons periodically
    const interval = setInterval(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 30 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 10 + 20,
          delay: 0,
        },
      ])

      // Remove old balloons to prevent too many elements
      if (balloons.length > 20) {
        setBalloons((prev) => prev.slice(1))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [balloons.length])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className={`absolute bottom-0 ${balloon.color}`}
          style={{
            left: `${balloon.x}%`,
            fontSize: balloon.size,
          }}
          initial={{ y: "100vh" }}
          animate={{
            y: "-100vh",
            // Keep x position fixed with just a very subtle sway
            x: [`calc(${balloon.x}% - 5px)`, `calc(${balloon.x}% + 5px)`, `calc(${balloon.x}% - 5px)`],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            ease: "linear",
            x: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            },
          }}
        >
          🎈
        </motion.div>
      ))}
    </div>
  )
}
