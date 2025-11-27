"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const AnimatedBackground = () => {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          currentTheme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
        }`}
      />

      {mounted && (
        <>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float-delayed" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-300 dark:from-amber-600 dark:to-orange-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float-slow" />
          </div>

          <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] dark:opacity-[0.08]" />
        </>
      )}
    </div>
  )
}
