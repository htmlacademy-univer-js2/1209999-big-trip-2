import FilterList from './view/filterList';
import SortList from './view/sortList';
import TripInfo from './view/tripInfo';
import EventList from './view/eventList';
import { render, RenderPosition } from './framework/render';
import RenderList from './view/renderList';
import errorTemplate from './view/errorTemplate';
import { generatePoints } from './mock/point';

const infosContent = generatePoints(Math.floor(Math.random() * 10));

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

if (infosContent.length !== 0) {
  render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
  render(new SortList(), sortContainerElem, RenderPosition.AFTERBEGIN);

  //общий список ul
  render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);
  const contentList = new RenderList(infosContent);
  contentList.init();
} else {
  render(new errorTemplate(), sortContainerElem, RenderPosition.BEFOREEND);
}
render(
  new FilterList(infosContent),
  filterContainerElem,
  RenderPosition.BEFOREEND
);
