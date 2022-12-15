export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

export const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = phone => {
  const data = getStorage('contacts');
  data.splice(data.findIndex(contact => contact.phone === phone), 1);
  localStorage.setItem('contacts', JSON.stringify(data));
};
