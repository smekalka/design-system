import { copyToClipboard } from '../src/utils';

describe('copyToClipboard', () => {
  it('should throw error if wrong argument is provided', () => {
    expect(copyToClipboard(12)).rejects.toMatch('Type Error: argument should be a string.');
    expect(copyToClipboard(null)).rejects.toMatch('Type Error: argument should be a string.');
    expect(copyToClipboard([])).rejects.toMatch('Type Error: argument should be a string.');
    expect(copyToClipboard(undefined)).rejects.toMatch('Type Error: argument should be a string.');
    expect(copyToClipboard({})).rejects.toMatch('Type Error: argument should be a string.');
  });

  it('should copy provided text to clipboard', () => {
    const textToCopy = 'test';

    const testFunction = jest.fn();

    document.execCommand = testFunction;

    copyToClipboard(textToCopy);

    expect(testFunction).toBeCalledWith('copy');
  });

  it('should use clipboard API if it provided in browser', () => {
    const textToCopy = 'test';

    const testFunction = jest.fn(() => Promise.resolve());

    navigator.clipboard = {
      writeText: testFunction,
    };

    copyToClipboard(textToCopy);

    expect(testFunction).toBeCalledWith(textToCopy);
  });
});
