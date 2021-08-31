/* solution to copy to clipboard found in:
https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript */

const shareButtonHandle = (type, id) => {
  const text = `http://localhost:3000/${type}/${id}`;
  navigator.clipboard.writeText(text).then(() => {
    console.log('Async: Copying to clipboard was successful!');
  }, (err) => {
    console.log('Async: Could not copy text: ', err);
  });
};

export default shareButtonHandle;
