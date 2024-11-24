import type { Directive, DirectiveBinding } from "vue";

export default <Directive>{
  mounted(element: Element, binding: DirectiveBinding) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        binding.value()
      }
    }, { rootMargin: '0px', threshold: 1.0 })
    observer.observe(element)
  },
  name: 'intersection'
}