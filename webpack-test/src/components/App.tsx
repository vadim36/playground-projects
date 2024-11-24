import React from "react"

declare const __PLATFORM__: 'desktop' | 'mobile'

export default function App() {
  return <div>
    platform={__PLATFORM__}
    Hello world!
  </div>
}