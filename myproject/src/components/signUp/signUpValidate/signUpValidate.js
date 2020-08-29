const validateEmailPattern = (email) => {
  var pattern = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$/;
  return pattern.test(email);
};

const validateEmail = (mail) => {
  const patternEmail = document.querySelector(".pattern-email");
  if (validateEmailPattern(mail)) {
    patternEmail.style.display = "none";
  }
};

const borderEmailDischarge = () => {
  const registerEmail = document.getElementById("registerEmail");
  const repeatEmail = document.querySelector(".repeat-email");
  repeatEmail.style.display = "none";
  registerEmail.style.border = "1px solid #b4b4b4";
};

const borderPasswordDischarge = () => {
  const confirmPasswordBlock = document.querySelector(".confirmPassword-block");
  confirmPasswordBlock.style.border = "1px solid #b4b4b4";
};

const validatePassword = (pass, confirmPass) => {
  const confirmPasswordBlock = document.querySelector(".confirmPassword-block");
  const patternPassword = document.querySelector(".pattern-password");
  if (pass !== "") {
    if (pass === confirmPass) {
      patternPassword.style.display = "none";
      confirmPasswordBlock.style.border = "1px solid #b4b4b4";
    }
  }
};

const signUpValidate = (mail, pass, confirmPass, login, props) => {
  const patternEmail = document.querySelector(".pattern-email");
  const patternPassword = document.querySelector(".pattern-password");
  const confirmPasswordBlock = document.querySelector(".confirmPassword-block");
  if (validateEmailPattern(mail)) {
    if (pass === confirmPass) props.register(mail, pass, login);
    else {
      confirmPasswordBlock.style.border = "1px solid red";
      patternPassword.style.display = "block";
    }
  } else {
    const registerEmail = document.getElementById("registerEmail");
    registerEmail.style.border = "1px solid red";
    patternEmail.style.display = "block";
  }
};

const signUpValidateRepeat = () => {
  const repeatEmail = document.querySelector(".repeat-email");
  const registerEmail = document.getElementById("registerEmail");
  registerEmail.style.border = "1px solid red";
  repeatEmail.style.display = "block";
};

export {
  validateEmail,
  borderEmailDischarge,
  borderPasswordDischarge,
  validatePassword,
  signUpValidate,
  signUpValidateRepeat
};
