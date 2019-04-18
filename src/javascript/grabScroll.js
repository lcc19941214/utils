/**
 * @fileoverview grabScroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragScroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

const $window = window;
const $document = document;
const mousemove = 'mousemove';
const mouseup = 'mouseup';
const mousedown = 'mousedown';
const EventListener = 'EventListener';
const addEventListener = `add${EventListener}`;
const removeEventListener = `remove${EventListener}`;
const noop = () => {};

export function getMatchedParent(elem, queryFn) {
  if (!elem) return null;
  if (queryFn(elem)) return elem;

  let el = elem;
  while (el.parentNode) {
    if (queryFn(el.parentNode)) return el.parentNode;
    el = el.parentNode;
  }
  return null;
}

/**
 * Bind drag scroll events to given elements.
 * Use `data-no-child-drag` to prevent drag children of specific element.
 * @param {Element | Element[]} elems
 * @param {{
 *  onMouseUp: (scroller: HTMLElement) => void,
 *  onMouseMove: (scroller: HTMLElement) => void,
 * }} handlers
 */
export default function grabScroll(elems, handlers) {
  let newScrollX;
  let newScrollY;
  const { onMouseDown = noop, onMouseUp = noop, onMouseMove = noop } = handlers;

  const dragged = [].concat(elems);

  const destroy = () => {
    for (let i = 0; i < dragged.length; i += 1) {
      let el = dragged[i];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      $window[removeEventListener](mouseup, el.mu, 0);
      $window[removeEventListener](mousemove, el.mm, 0);
    }
  };

  const init = () => {
    dragged.forEach((el) => {
      let lastClientX;
      let lastClientY;
      let pushed;
      let scroller;
      const cont = el.container || el;
      const noChildDrag = el.dataset.noChildDrag || el.noChildDrag;

      cont[addEventListener](
        mousedown,
        (cont.md = (e) => {
          if (cont.matchNoDragFn(e.target)) return false;

          if (!noChildDrag || $document.elementFromPoint(e.pageX, e.pageY) === cont) {
            pushed = 1;
            lastClientX = e.clientX;
            lastClientY = e.clientY;

            e.preventDefault();
            onMouseDown();
          }
        }),
        0,
      );

      $window[addEventListener](
        mouseup,
        (cont.mu = () => {
          pushed = 0;
          onMouseUp(scroller);
        }),
        0,
      );

      $window[addEventListener](
        mousemove,
        (cont.mm = (e) => {
          // for optimization purpose
          requestAnimationFrame(() => {
            if (pushed) {
              scroller = el.scroller || el;
              scroller.scrollLeft -= newScrollX = -lastClientX + (lastClientX = e.clientX);
              scroller.scrollTop -= newScrollY = -lastClientY + (lastClientY = e.clientY);
              if (el === $document.body) {
                (scroller = $document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
              onMouseMove(scroller);
            }
          });
        }),
        0,
      );
    });
  };

  init();

  return destroy;
}
