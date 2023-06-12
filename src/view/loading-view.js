import AbstractView from '../framework/view/abstract-view.js';
import {loadingTemplate} from '../templates/loading-template.js';

class LoadingView extends AbstractView {
  get template() {
    return loadingTemplate;
  }
}

export default LoadingView;
