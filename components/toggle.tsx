"use client"
import { motion } from "framer-motion"

type ToggleProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  const handleToggle = () => {
    onChange(!checked)
  }

  return (
    <div className="flex items-center justify-between">
      <label className="text-lg font-medium text-pink-800">{label}</label>
      <button
        type="button"
        className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
          checked ? "bg-pink-500" : "bg-gray-200"
        }`}
        onClick={handleToggle}
      >
        <span className="sr-only">Toggle {label}</span>
        <motion.span
          className="inline-block h-8 w-8 transform rounded-full bg-white shadow-lg"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ x: checked ? 44 : 4 }}
        />

        {/* Decorative elements */}
        <span className="absolute inset-0 flex items-center justify-around pointer-events-none">
          <span className={`text-xs ${checked ? "text-white" : "text-transparent"}`}>✨</span>
          <span className={`text-xs ${checked ? "text-white" : "text-transparent"}`}>🎉</span>
        </span>
      </button>
    </div>
  )
}
