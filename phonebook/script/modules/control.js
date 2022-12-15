import * as storage from './serviceStorage.js';
import {renderContacts} from './render.js';
import {createRow} from './createElements.js';
import hoverRow from './decorator.js';

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      const contact = e.target.closest('.contact');
      storage.removeStorage(contact.querySelector('a').textContent);
      contact.remove();
    }
  });
};

export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const formControl = (form, list, logo, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    storage.setStorage('contacts', newContact);
    const newTr = list.querySelector('tr:last-child');
    hoverRow([newTr], logo);
    form.reset();
    closeModal();
  });
};

export const sortByField = (field, list, logo) => {
  const sortedData = storage.getStorage('contacts');

  sortedData.sort((c1, c2) => (c1[field] > c2[field] ? 1 : -1));

  localStorage.setItem('contacts', JSON.stringify([...sortedData]));

  list.innerHTML = '';
  const allRow = renderContacts(list, storage.getStorage('contacts'));
  hoverRow(allRow, logo);
};

export const tableControl = (tableHead, list, logo) => {
  tableHead.addEventListener('click', e => {
    const header = e.target.closest('th').textContent;

    if (header === 'Имя') {
      sortByField('name', list, logo);
    } else if (header === 'Фамилия') {
      sortByField('surname', list, logo);
    }
  });
};
