'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress animation - slower increment for longer duration
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Slower increment for more gradual progress
        return prev + 0.5 // Will take ~6 seconds to reach 100%
      })
    }, 30)

    // Extended redirect delay (6 seconds)
    const redirectTimeout = setTimeout(() => {
      setLoading(false)
      const user = sessionStorage.getItem("user")
      if (user) {
        router.push("/home")
      } else {
        router.push("/login")
      }
    }, 6000) // Increased to 6 seconds

    return () => {
      clearTimeout(redirectTimeout)
      clearInterval(progressInterval)
    }
  }, [router])

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 z-50">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: { type: "spring", damping: 8, stiffness: 100, duration: 1.5 },
          opacity: { duration: 0.5 },
        }}
      >
        {/* Logo container with glow effect */}
        <div className="relative mb-8">
          <motion.div
            className="absolute inset-0 bg-purple-500/30 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src="https://ik.imagekit.io/j9wgmlnwk/image(12).png"
            alt="EspeonX Logo"
            className="relative w-48 h-48 drop-shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Title with gradient text */}
        <motion.h2
          className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          EspeonX
        </motion.h2>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          
          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Loading text */}
          <motion.p
            className="text-white/60 text-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading{".".repeat(Math.floor(progress / 25) + 1)}
          </motion.p>

          {/* Progress percentage */}
          <motion.p
            className="text-white/40 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}