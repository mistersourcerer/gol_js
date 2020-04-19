import { start, stop, pause } from './ticker'
import './console'

window.golControls = { stop: stop, start: start, pause: pause }
const implTypeRegepx = /gol-*/
let currentImpl

const implTypeFromElement = (el) => {
  // anyway of destructuring the array here?
  for (const entry of el.classList.entries()) {
    const klass = entry[1]
    if (klass.match(implTypeRegepx)) {
      return klass
    }
  }

  return null
}

const implFromToggleBtn = (button) => {
  return implTypeFromElement(button)
}

const toggle = (event) => {
  let buttonToShow

  const el = event.toElement
  el.style.display = 'none'
  if (el.classList.contains('show')) {
    buttonToShow = '.hide'
    currentImpl = document.getElementById(implFromToggleBtn(el))
    currentImpl.style.display = 'block'
  } else {
    buttonToShow = '.show'
    currentImpl.style.display = 'none'
    currentImpl = null
  }

  document.querySelector(`.toggle ${buttonToShow}`).style.display = 'block'
}

const config = () => {
  if (document.readyState !== 'complete') {
    return
  }

  const buttonsSelector = document.querySelectorAll('.toggle button')

  // add the gol-* class to the buttons under it.
  document.querySelectorAll('.toggle').forEach((toggle) => {
    const implType = implTypeFromElement(toggle)
    if (implType) {
      buttonsSelector.forEach(btn => btn.classList.add(implType))
    }
  })

  document.querySelectorAll('.toggle button.hide')
    .forEach((el) => { el.style.display = 'none' })

  buttonsSelector.forEach(btn => btn.addEventListener('click', toggle))
}

document.onreadystatechange = config
