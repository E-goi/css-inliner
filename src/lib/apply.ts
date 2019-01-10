import { StyleMap, toObject } from './style';

interface InlineElementStyle {
  element: HTMLElement;
  important: (string | number)[];
  preserve: (string | number)[];
}

export const apply = (doc: HTMLElement, styles: StyleMap[]): void => {
  const elements: InlineElementStyle[] = [];

  return styles.forEach(item => {
    doc.querySelectorAll(item.selector).forEach((el: HTMLElement) => {
      let element = elements.find(item => item.element === el);
      if (!element) {
        const style = el.getAttribute('style');
        element = {
          element: el,
          important: [],
          preserve: style && toObject(style).map(style => style && style.attr || null) || []
        };

        elements.push(element);
      }

      item.style.forEach(style => {
        if (style && element.preserve.indexOf(style.attr) === -1) {
          // validate if style is !important
          const isImportant = style.value.toString().indexOf('!important') !== -1;

          if (element.important.indexOf(style.attr) !== -1 && !isImportant) {
            return;
          }

          if (isImportant) {
              element.important.push(style.attr);
          }

          el.style[style.attr] = style.value.toString().replace('!important', '');
        }
      });
    });
  });
}

