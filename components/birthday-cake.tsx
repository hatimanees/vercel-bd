"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function BirthdayCake() {
  return (
    <motion.div
      className="relative w-64 h-64 flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src="/images/cat-cake.png"
        alt="Birthday Cake with Cat Design"
        width={250}
        height={250}
        className="rounded-full shadow-lg"
      />
    </motion.div>
  )
}
