export const checkValidateData = (name, email, password, isSignIn) => {
  const isNameValid = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(name);
  const isEmailValid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
    email
  );
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
    password
  );
  if (!isSignIn) {
    if (!isNameValid) return "Name is not valid";
  }

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
