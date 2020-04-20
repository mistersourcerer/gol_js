describe('binding events for showing different implementations', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="toggle gol-something">
        <button id='test-show' class="btext show">show</button>
        <button id='test-hide' class="btext hide">hide</button>
      </div>

      <div class="toggle gol-anotherone">
        <button id='test-show-another' class="btext show">show</button>
        <button id='test-hide-another' class="btext hide">hide</button>
      </div>

      <div class="implementations">
        <div class="impl-type gol-something">
          <div class="controls">
            <button id="start" class="btext">start</button>
            <button id="pause" class="btext">pause</button>
            <button id="stop" class="btext">finish</button>
          </div>
        </div>

        <div class="impl-type gol-anotherone">
          <div class="controls">
            <button id="start" class="btext">start</button>
            <button id="pause" class="btext">pause</button>
            <button id="stop" class="btext">finish</button>
          </div>
        </div>
      </div>
    `

    require('index')
  })

  it('hide all alternative implementations when loading', () => {
    const impl = document.querySelector('.implementations .impl-type.gol-something')

    expect(impl.style.display).toBe('none')
  })

  it('add the click envent to show implementation', () => {
    const impl = document.querySelector('.implementations .impl-type.gol-something')

    const show = document.getElementById('test-show')
    show.click()

    expect(impl.style.display).toBe('block')
  })

  it('add the click event to hide implementation', () => {
    const impl = document.querySelector('.implementations .impl-type.gol-something')

    const show = document.getElementById('test-hide')
    show.click()

    expect(impl.style.display).toBe('none')
  })

  it('ensure hide button is not visible at first', () => {
    const hideButtons = Array.from(document.querySelectorAll('.toggle .hide'))
    expect(hideButtons.every(btn => btn.style.display === 'none')).toBe(true)
  })

  describe('when toggling implementations', () => {
    it('hides the current "visible" implementation before showing the new one', () => {
      const current = document.querySelector('.implementations .impl-type.gol-something')
      const show = document.getElementById('test-show')
      show.click()

      const another = document.querySelector('.implementations .impl-type.gol-anotherone')
      const showAnother = document.getElementById('test-show-another')
      showAnother.click()

      expect(current.style.display).toBe('none')
      expect(another.style.display).toBe('block')

      // ensure previous show button is visible again
      expect(show.style.display).toBe('block')
    })

    it('changes the visible toggling button accordingly', () => {
      const show = document.getElementById('test-show')
      const hide = document.getElementById('test-hide')

      show.click()
      expect(show.style.display).toBe('none')
      expect(hide.style.display).toBe('block')

      hide.click()
      expect(show.style.display).toBe('block')
      expect(hide.style.display).toBe('none')
    })
  })
})
