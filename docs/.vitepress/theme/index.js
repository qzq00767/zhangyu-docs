import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ParticleBackground from './components/ParticleBackground.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h('div', { style: 'display:none' }), // 隐藏默认 hero 图片位
    })
  },
  enhanceApp({ app, router }) {
    // 滚动渐显
    if (typeof window !== 'undefined') {
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

      const observe = () => {
        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
      }

      if (router) {
        router.onAfterRouteChanged = () => {
          setTimeout(observe, 100)
        }
      }

      setTimeout(observe, 100)

      // 向 VPHero 注入粒子 canvas
      const injectParticles = () => {
        const hero = document.querySelector('.VPHero')
        if (hero && !hero.querySelector('.particle-canvas')) {
          const canvas = document.createElement('canvas')
          canvas.className = 'particle-canvas'
          canvas.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;width:100%;height:100%'
          hero.style.position = 'relative'
          hero.style.overflow = 'hidden'
          hero.prepend(canvas)
          startParticleAnim(canvas)
        }
      }

      setTimeout(injectParticles, 200)
      if (router) {
        const orig = router.onAfterRouteChanged
        router.onAfterRouteChanged = () => {
          if (orig) orig()
          setTimeout(injectParticles, 300)
        }
      }
    }
  }
}

// 粒子动画引擎（独立于 Vue，纯 Canvas）
function startParticleAnim(canvas) {
  const ctx = canvas.getContext('2d')
  let w, h, animId

  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect()
    w = canvas.width = rect.width
    h = canvas.height = rect.height
  }
  resize()

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: Math.random() * 0.25 + 0.08,
    r: Math.random() * 1.6 + 0.5,
    alpha: Math.random() * 0.45 + 0.15,
    reset() {
      this.x = Math.random() * w
      this.y = -10
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = Math.random() * 0.25 + 0.08
    }
  }))

  function draw() {
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      if (p.y > h + 10 || p.x < -10 || p.x > w + 10) p.reset()

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x
        const dy = p.y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 110) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 110)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    animId = requestAnimationFrame(draw)
  }

  draw()

  // resize 监听
  const onResize = () => { resize() }
  window.addEventListener('resize', onResize)

  // 清理（路由切换时）
  const clean = () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', onResize)
  }
  canvas._cleanParticles = clean
}
