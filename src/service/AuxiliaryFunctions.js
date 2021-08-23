const emailChecker = (emailValue) => /\S+@\S+.\S+com/.test(emailValue);

export default emailChecker;
