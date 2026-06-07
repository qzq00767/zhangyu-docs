import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
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

      // 首次加载
      setTimeout(observe, 100)
    }
  }
}
