"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Heart = {
  id: number
  x: number
  size: number
  duration: number
  delay: number
}

export function Hearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (0-100%)
      size: Math.random() * 20 + 10, // random size (10-30px)
      duration: Math.random() * 10 + 15, // random animation duration (15-25s)
      delay: Math.random() * 5, // random delay (0-5s)
    }))

    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 15,
          delay: 0,
        },
      ])

      // Remove old hearts to prevent too many elements
      if (hearts.length > 30) {
        setHearts((prev) => prev.slice(1))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [hearts.length])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-pink-300 opacity-70"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
          }}
          initial={{ y: "100vh" }}
          animate={{
            y: "-100vh",
            x: heart.x + "%", // Keep x position fixed
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
