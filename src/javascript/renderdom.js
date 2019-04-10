let domNode = {
  tagName: 'ul',
  props: { class: 'list' },
  children: [
    {
      tagName: 'li',
      children: ['toutiao']
    },
    {
      tagName: 'li',
      children: ['douyin']
    }
  ]
};

function setAttr(elem, attrs) {
  if (!attrs) return;
  Object.entries(attrs).forEach(([attr, value]) => {
    elem.setAttribute(attr, value);
  });
}

function renderElement(node) {
  if (typeof node === 'string') return document.createTextNode(node);

  const { tagName, props, children } = node;
  const elem = document.createElement(tagName);
  setAttr(elem);
  if (children && children.length) {
    children.forEach(child => {
      const childElem = renderElement(child);
      elem.appendChild(childElem);
    });
  }
  return elem;
}

function render(portal) {
  const element = this.renderElement(portal);
  return element;
}
