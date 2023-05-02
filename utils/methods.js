export const isValidObject = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export const updateError = (error, stateUpdated) => {
  stateUpdated(error);
  setTimeout(() => {
    stateUpdated("");
  }, 2500);
};

export const isValidEmail = (value) => {
  const regx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regx.test(value);
};
