const RenderPosition = {
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
  BEFOREBEGIN: 'beforebegin',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};
