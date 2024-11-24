import { createApp, type Directive } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from './router/router'
import directives from './directives'

const app = createApp(App)

components.forEach((component) => {
  if (!component.name) return console.log('UI component does not have a name')
  app.component(component.name, component)
})

directives.forEach((directive: any) => {
  app.directive(directive.name, directive)
})

app
  .use(router)
  .mount('#app')