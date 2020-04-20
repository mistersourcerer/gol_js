import './console'

let currentShowing = null
const implNameRegepx = /gol-*/

const implNameFromElement = (el) => {
  // anyway of destructuring the array here?
  for (const entry of el.classList.entries()) {
    const klass = entry[1]
    if (klass.match(implNameRegepx)) {
      return klass
    }
  }

  return null
}

const hideCurrent = () => {
  currentShowing.style.display = 'none'
  const currentImplName = implNameFromElement(currentShowing)
  document.querySelector(`.toggle .${currentImplName}.show`).style.display = 'block'
  document.querySelector(`.toggle .${currentImplName}.hide`).style.display = 'none'
}

const toggleImpl = (event) => {
  const button = event.target
  button.style.display = 'none'
  const isShow = button.classList.contains('show')
  const implName = implNameFromElement(button)
  const impl = document.querySelector(`.impl-type.${implName}`)
  const showBtn = document.querySelector(`.toggle .${implName}.show`)
  const hideBtn = document.querySelector(`.toggle .${implName}.hide`)

  if (isShow) {
    if (currentShowing !== null) hideCurrent()
    impl.style.display = 'block'
    hideBtn.style.display = 'block'
    currentShowing = impl
  } else {
    impl.style.display = 'none'
    showBtn.style.display = 'block'
    currentShowing = null
  }
}

const hideAlternativeImplementations = () => {
  document
    .querySelectorAll('.implementations .impl-type')
    .forEach((impl) => {
      impl.style.display = 'none'
    })
}

const displayOnlyShowButtons = () => {
  Array
    .from(document.querySelectorAll('.toggle .hide'))
    .forEach(btn => { btn.style.display = 'none' })
}

const bindTogglesForImplementations = () => {
  document.querySelectorAll('.toggle').forEach((toggle) => {
    const implName = implNameFromElement(toggle)
    const btns = [toggle.querySelector('.show'), toggle.querySelector('.hide')]
    btns.forEach((btn) => {
      btn.classList.add(implName)
      btn.addEventListener('click', toggleImpl)
    })
  })
}

// this is exclusively for test
// since readystatechange seem to not be called by JSDOM (jest...)
// TODO: find where am I wrong here and fix this UGLY ASS mess
let loaded = false

const config = () => {
  if (document.readyState !== 'complete') return
  loaded = true

  hideAlternativeImplementations()
  displayOnlyShowButtons()
  bindTogglesForImplementations()
}

document.onreadystatechange = config

// this is exclusively for test
// since readystatechange seem to not be called by JSDOM (jest...)
// TODO: find where am I wrong here and fix this UGLY ASS mess
if (!loaded) config()
