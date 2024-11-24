import type { Directive } from "vue";

export default <Directive>{
  mounted(element: HTMLElement) {
    element.focus()
  },
  name: 'focus'
}