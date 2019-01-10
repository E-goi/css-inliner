import { StyleMap, toObject } from './style';

interface InlineElementStyle {
  element: HTMLElement;
  preserve_style: (string | number)[];
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
          preserve_style: style && toObject(style).map(style => style && style.attr || null) || []
        };

        elements.push(element);
      }

      item.style.forEach(style => {
        if (style && element.preserve_style.indexOf(style.attr) === -1) {
          el.style[style.attr] = style.value;
        }
      });
    });
  });
}

