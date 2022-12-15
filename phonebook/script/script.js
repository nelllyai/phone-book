import * as storage from './modules/serviceStorage.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import {modalControl, deleteControl,
  formControl, tableControl} from './modules/control.js';
import hoverRow from './modules/decorator.js';

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
