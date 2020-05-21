describe('binding events for showing different implementations', () => {
  const _Gol = window.Gol

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
            <button class="btext start">start</button>
            <button class="btext pause">pause</button>
            <button class="btext stop">stop</button>
          </div>
        </div>

        <div class="impl-type gol-anotherone">
          <div class="controls">
            <button class="btext start">start</button>
            <button class="btext pause">pause</button>
            <button class="btext stop">stop</button>
          </div>
        </div>
      </div>
    `
    window.Gol = {
      start: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn()
    }

    require('index')
  })

  afterAll(() => { window.Gol = _Gol })

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

  it('binds the control functions for all implementations', () => {
    const impl = document.querySelector('.impl-type.gol-something')

    const start = impl.querySelector('.controls .start')
    start.click()
    expect(window.Gol.start.mock.calls.length).toBe(1)

    const pause = impl.querySelector('.controls .pause')
    pause.click()
    expect(window.Gol.pause.mock.calls.length).toBe(1)

    const stop = impl.querySelector('.controls .stop')
    stop.click()
    expect(window.Gol.stop.mock.calls.length).toBe(1)

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
