import { onMounted, onBeforeUnmount } from 'vue'

export function useGsapScrollAnimation(selector, options) {
  let ctx;

  onMounted(() => {
    const gsap = window.gsap
    const ScrollTrigger = gsap?.ScrollTrigger

    if (!gsap || !ScrollTrigger) return

    ctx = gsap.context(() => {
        console.log(selector);
      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        ...options,
      })
    })
  })

  onBeforeUnmount(() => {
    ctx?.revert()
  })
}
