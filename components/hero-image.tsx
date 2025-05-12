"use client"

import { useEffect, useRef } from "react"

export default function HeroImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 400

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#4C2A85")
    gradient.addColorStop(1, "#9333EA")

    // Animation variables
    const particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []
    const particleCount = 30

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Draw credit card
    const drawCard = () => {
      // Card body
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(100, 100, 300, 180, 16)
      ctx.fill()
      ctx.stroke()

      // Card chip
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.roundRect(130, 150, 40, 30, 4)
      ctx.fill()

      // Card details
      ctx.fillStyle = "#333333"
      ctx.font = "16px Arial"
      ctx.fillText("**** **** **** 4242", 130, 210)

      ctx.font = "12px Arial"
      ctx.fillText("VALID THRU: 12/25", 130, 240)

      ctx.font = "14px Arial"
      ctx.fillText("JOHN DOE", 250, 240)

      // Card logo
      ctx.fillStyle = "#4C2A85"
      ctx.beginPath()
      ctx.arc(350, 130, 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#9333EA"
      ctx.beginPath()
      ctx.arc(330, 130, 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Arial"
      ctx.fillText("ZenPay", 320, 134)
    }

    // Draw recurring payment symbol
    const drawRecurringSymbol = () => {
      ctx.strokeStyle = "#4C2A85"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(250, 320, 30, 0, Math.PI * 1.5)
      ctx.stroke()

      // Arrow
      ctx.fillStyle = "#4C2A85"
      ctx.beginPath()
      ctx.moveTo(250, 290)
      ctx.lineTo(260, 300)
      ctx.lineTo(240, 300)
      ctx.closePath()
      ctx.fill()
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#f8f9fa"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(76, 42, 133, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Move particles
        particle.y -= particle.speed

        // Reset particles that go off screen
        if (particle.y < -particle.radius) {
          particle.y = canvas.height + particle.radius
          particle.x = Math.random() * canvas.width
        }
      })

      // Draw card and symbol
      drawCard()
      drawRecurringSymbol()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[500px] h-auto rounded-lg shadow-lg"
      aria-label="Animated illustration of a credit card with recurring payment symbol"
    />
  )
}
