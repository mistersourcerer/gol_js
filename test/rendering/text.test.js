import text from 'rendering/text';

describe('render', () => {
  const deviceMock = {};

  beforeEach(() => {
    deviceMock['clear'] = jest.fn();
    deviceMock['push'] = jest.fn();
  });

  it('clears the console', () => {
    text.render([[true], [true]], {device: deviceMock});

    expect(deviceMock.clear.mock.calls.length).toBe(1);
  });

  it('represents the live cells with "O" by default', () => {
    text.render([[true], [true]], {device: deviceMock});

    expect(deviceMock.push.mock.calls).toEqual([
      ['****'],
      ['|| O*'],
      ['|| O#'],
      ['****']
    ]);
  });

  it('allows overriding string representation of live cell', () => {
    text.render([[true], [true]], {device: deviceMock, alive: 'XPTO'});

    expect(deviceMock.push.mock.calls).toEqual([
      ['*******'],
      ['|| XPTO*'],
      ['|| XPTO#'],
      ['*******']
    ]);
  });
});

describe('devices', () => {
  describe('console', () => {
    let _console = console;
    let mock;
    let device = text.devices.console();

    beforeEach(() => {
      console = {
        clear: jest.fn(),
        log: jest.fn(),
      };
    });

    afterAll(() => console = _console);

    test('push(): calls clear on console', () => {
      device.push('lol');

      expect(console.log.mock.calls.length).toBe(1);
      expect(console.log.mock.calls[0][0]).toEqual('lol');
    });

    test('clear(): calls clear on console', () => {
      device.clear();

      expect(console.clear.mock.calls.length).toBe(1);
    });
  });

  describe('memory', () => {
    let device = text.devices.memory();

    test('push(): add a string to "current" array in memory', () => {
      device.push('lol');
      device.push('bbq');

      expect(device.mem.length).toBe(1);
      expect(device.mem[0].length).toBe(2);
      expect(device.mem[0][0]).toEqual('lol');
      expect(device.mem[0][1]).toEqual('bbq');
    });

    test('clear(): creates a new array in memory', () => {
      device.push('lol');
      device.push('bbq');
      device.clear();
      device.push('wow')

      expect(device.mem.length).toBe(2);
      expect(device.mem[1].length).toBe(1);
      expect(device.mem[1][0]).toEqual('wow');
    });
  });
});
