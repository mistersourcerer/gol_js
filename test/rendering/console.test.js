import csl from 'rendering/console';

describe('render', () => {
  const consoleMock = {};

  beforeEach(() => {
    consoleMock['clear'] = jest.fn();
    consoleMock['log'] = jest.fn();
  });

  it('clears the console', () => {
    csl.render([[true], [true]], {output: consoleMock});

    expect(consoleMock.clear.mock.calls.length).toBe(1);
  });

  it('represents the live cells with "O" by default', () => {
    csl.render([[true], [true]], {output: consoleMock});

    expect(consoleMock.log.mock.calls).toEqual([
      ['****'],
      ['|| O*'],
      ['|| O#'],
      ['****']
    ]);
  });

  it('allows overriding string representation of live cell', () => {
    csl.render([[true], [true]], {output: consoleMock, live: 'XPTO'});

    expect(consoleMock.log.mock.calls).toEqual([
      ['*******'],
      ['|| XPTO*'],
      ['|| XPTO#'],
      ['*******']
    ]);
  });
});
