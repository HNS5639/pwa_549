export const GetLocalStorage = (key) => {
  const result = localStorage.getItem(key);

  if (!result) {
    return null;
  }

  return result;
};

export const SetLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};