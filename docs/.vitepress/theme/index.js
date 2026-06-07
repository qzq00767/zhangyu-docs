import DefaultTheme from 'vitepress/theme'
import './custom.css'

let particleCleanup = null

// 判断是否为移动端
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 960

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window === 'undefined') return

    // 滚动渐显
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const observeFadeIns = () => {
      document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    }
    setTimeout(observeFadeIns, 100)

    // 路由切换
    if (router) {
      router.onAfterRouteChanged = (to) => {
        setTimeout(observeFadeIns, 100)
        if (!isMobile() && (to === '/' || to === '')) {
          injectParticles()
        } else {
          destroyParticles()
        }
      }
    }

    // 首次加载粒子（仅桌面端）
    if (!isMobile()) {
      setTimeout(() => {
        const hero = document.querySelector('.VPHero')
        if (hero) return injectParticles()
        const mo = new MutationObserver(() => {
          const h = document.querySelector('.VPHero')
          if (h) { mo.disconnect(); injectParticles() }
        })
        mo.observe(document.body, { childList: true, subtree: true })
        setTimeout(() => mo.disconnect(), 5000)
      }, 300)
    }
  }
}

// ============================================
// 粒子动画（仅桌面端）
// ============================================

function injectParticles() {
  const hero = document.querySelector('.VPHero')
  if (!hero || hero.querySelector('.particle-canvas')) return

  hero.style.position = 'relative'

  const canvas = document.createElement('canvas')
  canvas.className = 'particle-canvas'
  canvas.style.cssText =
    'position:absolute;inset:0;z-index:0;pointer-events:none;width:100%;height:100%'
  hero.prepend(canvas)

  particleCleanup = startParticleAnim(canvas)
}

function destroyParticles() {
  if (particleCleanup) { particleCleanup(); particleCleanup = null }
  document.querySelectorAll('.particle-canvas').forEach((c) => c.remove())
}

function startParticleAnim(canvas) {
  const ctx = canvas.getContext('2d')
  let animId, w, h

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    w = canvas.width = rect.width || 1
    h = canvas.height = rect.height || 1
  }
  resize()

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4, vy: Math.random() * 0.2 + 0.06,
    r: Math.random() * 1.4 + 0.4, alpha: Math.random() * 0.4 + 0.12,
    reset() {
      this.x = Math.random() * w; this.y = -8
      this.vx = (Math.random() - 0.5) * 0.4; this.vy = Math.random() * 0.2 + 0.06
    }
  }))

  function draw() {
    if (!canvas.isConnected) { cancelAnimationFrame(animId); return }
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx; p.y += p.vy
      if (p.y > h + 8 || p.x < -8 || p.x > w + 8) p.reset()
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
      ctx.fill()
    }
    for (let i = 0; i < Math.min(particles.length, 20); i++) {
      for (let j = i + 1; j < Math.min(particles.length, 20); j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 100)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
    }
    animId = requestAnimationFrame(draw)
  }
  draw()
  window.addEventListener('resize', resize)
  return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
}
