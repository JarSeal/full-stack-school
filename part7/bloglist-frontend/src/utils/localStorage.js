let localStorageAvailable = false;

const initLocalStorage = () => {
  if(lsTest()) {
    localStorageAvailable = true;
  }
};

const getItem = (key, defaultValue) => {
  // defaultValue is returned (if provided) if local storage is not available or the key is not found
  if(!localStorageAvailable) return defaultValue || null;
  if(checkIfItemExists(key)) {
    return window.localStorage.getItem(key);
  } else {
    return defaultValue || null;
  }
};

const checkIfItemExists = (key) => {
  if(!localStorageAvailable) return false;
  return Object.prototype.hasOwnProperty.call(window.localStorage, key);
};

const setItem = (key, value) => {
  if(!localStorageAvailable) return false;
  window.localStorage.setItem(key, value);
  return true;
};

const removeItem = (key) => {
  if(!localStorageAvailable) return false;
  if(checkIfItemExists(key)) {
    window.localStorage.removeItem(key);
  }
  return true;
};

const lsTest = () => {
  const test = 'testLSAvailability';
  try {
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
};

export default { initLocalStorage, getItem, setItem, removeItem };