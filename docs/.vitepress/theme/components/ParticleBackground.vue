<template>
  <canvas ref="canvas" class="particle-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx, particles, animId, w, h

class Particle {
  constructor() {
    this.reset()
    this.y = Math.random() * h
  }
  reset() {
    this.x = Math.random() * w
    this.y = -10
    this.vx = (Math.random() - 0.5) * 0.6
    this.vy = Math.random() * 0.3 + 0.1
    this.r = Math.random() * 1.8 + 0.6
    this.alpha = Math.random() * 0.5 + 0.2
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.y > h + 10 || this.x < -10 || this.x > w + 10) this.reset()
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`
    ctx.fill()
  }
}

const init = () => {
  const el = canvas.value
  if (!el) return
  ctx = el.getContext('2d')
  resize()
  particles = Array.from({ length: 55 }, () => new Particle())
  draw()
}

const resize = () => {
  const el = canvas.value
  if (!el) return
  w = el.parentElement.offsetWidth
  h = el.parentElement.offsetHeight
  el.width = w
  el.height = h
}

const draw = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()

    // 连线近邻粒子
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 100)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
  animId = requestAnimationFrame(draw)
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
