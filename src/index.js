import * as storage from './script/serviceStorage';
import {renderPhoneBook, renderContacts} from './script/render';
import {modalControl, deleteControl,
  formControl, tableControl} from './script/control';
import hoverRow from './script/decorator';

import './index.html';
import './scss/index.scss';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      tableHead,
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, storage.getStorage('contacts'));

    hoverRow(allRow, logo);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    deleteControl(btnDel, list);
    formControl(form, list, logo, closeModal);
    tableControl(tableHead, list, logo);
  };

  window.phoneBookInit = init;
}

document.addEventListener('DOMContentLoaded', () => {
  phoneBookInit('#app', 'Нелли');
});
