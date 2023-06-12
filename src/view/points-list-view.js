import AbstractView from '../framework/view/abstract-view.js';
import {pointsListTemplate} from '../templates/points-list-template.js';

class PointsListView extends AbstractView {
  get template() {
    return pointsListTemplate;
  }
}

export default PointsListView;
