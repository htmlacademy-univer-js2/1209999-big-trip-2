import AbstractView from '../framework/view/abstract-view.js';
import {errorTemplate} from '../templates/error-template.js';

class ErrorView extends AbstractView {
  get template() {
    return errorTemplate;
  }
}

export default ErrorView;
