"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type ConfettiPiece = {
  id: number
  x: number
  color: string
  size: number
  rotation: number
  duration: number
  delay: number
}

const colors = [
  "bg-pink-400",
  "bg-pink-300",
  "bg-yellow-300",
  "bg-blue-300",
  "bg-purple-300",
  "bg-green-300",
  "bg-red-300",
]

export function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Create initial confetti
    const initialConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (0-100%)
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4, // random size (4-12px)
      rotation: Math.random() * 360, // random initial rotation
      duration: Math.random() * 3 + 2, // random animation duration (2-5s)
      delay: Math.random() * 5, // random delay (0-5s)
    }))

    setConfetti(initialConfetti)

    // Add new confetti periodically
    const interval = setInterval(() => {
      setConfetti((prev) => [
        ...prev.slice(-80), // Keep only the last 80 pieces
        ...Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360,
          duration: Math.random() * 3 + 2,
          delay: 0,
        })),
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute bottom-0 ${piece.color}`}
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size,
            rotate: `${piece.rotation}deg`,
          }}
          initial={{ y: "-20vh", opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 1, 0],
            rotate: `${piece.rotation + 360 * 2}deg`,
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
