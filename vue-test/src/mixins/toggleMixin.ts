export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      (this as any).$emit('update:show', false)
    }
  }
}