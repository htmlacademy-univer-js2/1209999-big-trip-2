import AbstractView from '../framework/view/abstract-view.js';
import {menuTemplate} from '../templates/menu-template.js';

class MenuView extends AbstractView {
  get template() {
    return menuTemplate;
  }
}

export default MenuView;
