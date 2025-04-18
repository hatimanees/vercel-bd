"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hearts } from "@/components/hearts"
import { Sparkles } from "@/components/sparkles"
import { Confetti } from "@/components/confetti"
import { Balloons } from "@/components/balloons"
import { StringLights } from "@/components/string-lights"
import { BirthdayCake } from "@/components/birthday-cake"
import { Toggle } from "@/components/toggle"
import { useSound } from "use-sound"

export default function BirthdayCelebration() {
  // State for different views
  const [currentView, setCurrentView] = useState<"initial" | "prompt" | "no" | "yes" | "final">("initial")

  // State for toggles
  const [lights, setLights] = useState(false)
  const [decorations, setDecorations] = useState(false)
  const [cake, setCake] = useState(false)

  // State for audio
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  // Sound effects
  const [playToggleSound] = useSound("/sounds/toggle-click.mp3", { volume: 0.5 })
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound("/sounds/background-melody.mp3", {
    volume: 0.3,
    loop: true,
  })

  // Show prompt after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView("prompt")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Check if all toggles are on
  useEffect(() => {
    if (lights && decorations && cake) {
      // Play background music when all toggles are on
      if (!isMusicPlaying) {
        playBackgroundMusic()
        setIsMusicPlaying(true)
      }

      // Show final view after a short delay
      const timer = setTimeout(() => {
        setCurrentView("final")
      }, 1000)

      return () => clearTimeout(timer)
    } else if (isMusicPlaying) {
      stopBackgroundMusic()
      setIsMusicPlaying(false)
    }
  }, [lights, decorations, cake, isMusicPlaying, playBackgroundMusic, stopBackgroundMusic])

  // Handle toggle changes
  const handleToggle = (type: "lights" | "decorations" | "cake", value: boolean) => {
    playToggleSound()

    switch (type) {
      case "lights":
        setLights(value)
        break
      case "decorations":
        setDecorations(value)
        break
      case "cake":
        setCake(value)
        break
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 to-pink-100">
      {/* Hearts animation (always visible) */}
      <Hearts />

      {/* String lights (when toggled) */}
      {lights && <StringLights />}

      {/* Decorations (when toggled) */}
      {decorations && (
        <>
          <Confetti />
          <Balloons />
        </>
      )}

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center px-4">
        <AnimatePresence mode="wait">
          {/* Initial view */}
          {currentView === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Sparkles>
                <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4 font-serif">
                  It&apos;s Your Special Day Yeyey!
                </h1>
              </Sparkles>
            </motion.div>
          )}

          {/* Prompt view */}
          {currentView === "prompt" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-8 font-serif">
                It&apos;s Your Special Day Yeyey!
              </h1>
              <p className="text-xl text-pink-700 mb-8">Do you wanna see what I made?</p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1], transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 } }}
                  onClick={() => setCurrentView("yes")}
                  className="px-6 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 transition-colors"
                >
                  Yes!
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView("no")}
                  className="px-6 py-3 bg-white text-pink-500 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors border border-pink-300"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* No path */}
          {currentView === "no" && (
            <motion.div
              key="no"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-900 p-10 rounded-lg shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-6 font-serif">Katti</h2>
              </div>
            </motion.div>
          )}

          {/* Yes path */}
          {currentView === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mb-8 font-serif">
                Let&apos;s Get This Party Started!
              </h2>

              <div className="space-y-6 w-full max-w-xs">
                <Toggle label="Lights" checked={lights} onChange={(value) => handleToggle("lights", value)} />
                <Toggle
                  label="Decorations"
                  checked={decorations}
                  onChange={(value) => handleToggle("decorations", value)}
                />
                <Toggle label="Cake" checked={cake} onChange={(value) => handleToggle("cake", value)} />
              </div>

              {/* Cake (when toggled) */}
              {cake && (
                <div className="mt-8">
                  <BirthdayCake />
                </div>
              )}
            </motion.div>
          )}

          {/* Final reveal */}
          {currentView === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Sparkles big>
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    textShadow: ["0 0 0px #ffd700", "0 0 20px #ffd700", "0 0 0px #ffd700"],
                  }}
                  transition={{
                    duration: 2,
                    textShadow: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    },
                  }}
                  className="text-5xl md:text-6xl font-bold text-pink-800 mb-4 font-serif"
                >
                  Happy Birthday Gudia
                </motion.h1>
              </Sparkles>

              {cake && (
                <div className="mt-8">
                  <BirthdayCake />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
