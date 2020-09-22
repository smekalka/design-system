const copyToClipboard = (text) => new Promise((resolve, reject) => {
  if (typeof text !== 'string') reject(Error('Type Error: argument should be a string.'));

  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');

    textArea.value = text;

    textArea.style.width = '0';
    textArea.style.height = '0';
    textArea.style.overflow = 'hidden';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      resolve(text);
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  navigator.clipboard.writeText(text).then(
    () => resolve(text),
    (err) => reject(err),
  );
});

export default copyToClipboard;
