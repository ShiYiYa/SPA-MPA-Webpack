import { jq } from '../lib/jq'
jq()

;(function about() {
  const a = document.createElement('a')
  a.href = 'index.html'
  a.innerText = "i'm about!"
  document.body.appendChild(a)
  console.log("i'm about！")
})()
