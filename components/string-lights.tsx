"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Light = {
  id: number
  color: string
  delay: number
}

const colors = ["bg-yellow-300", "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-purple-400", "bg-red-400"]

export function StringLights() {
  const [lights, setLights] = useState<Light[]>([])

  useEffect(() => {
    // Create lights for the border
    const count = 40 // Number of lights
    const newLights = Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: i * 0.05, // Sequential delay for twinkling effect
    }))

    setLights(newLights)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-x-0 top-0 flex justify-around">
        {lights.slice(0, 10).map((light) => (
          <LightBulb key={light.id} light={light} />
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 flex flex-col justify-around">
        {lights.slice(10, 20).map((light) => (
          <LightBulb key={light.id} light={light} />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-around">
        {lights.slice(20, 30).map((light) => (
          <LightBulb key={light.id} light={light} />
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 flex flex-col justify-around">
        {lights.slice(30, 40).map((light) => (
          <LightBulb key={light.id} light={light} />
        ))}
      </div>
    </div>
  )
}

function LightBulb({ light }: { light: Light }) {
  return (
    <motion.div
      className={`w-4 h-4 rounded-full ${light.color}`}
      initial={{ opacity: 0.3, boxShadow: "0 0 0px currentColor" }}
      animate={{
        opacity: [0.3, 1, 0.3],
        boxShadow: ["0 0 2px currentColor", "0 0 10px currentColor", "0 0 2px currentColor"],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 2,
        delay: light.delay,
      }}
    />
  )
}
