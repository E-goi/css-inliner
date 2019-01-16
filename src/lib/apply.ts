import { StyleMap, toObject, clearValue } from './style';
import { APPLY_TABLE_PROPERTIES, APPLY_WIDTH_PROPERTY, getTableProperties, getUrl } from './config';
import { getPropertyValue } from './properties';

interface InlineElementStyle {
  element: HTMLElement;
  important: (string | number)[];
  preserve: (string | number)[];
  attributes: string[];
}

/**
 *
 */
export const apply = (doc: HTMLElement, styles: StyleMap[]) => {
  const elements: InlineElementStyle[] = [];

  styles.forEach(item => {
    doc.querySelectorAll(item.selector).forEach((el: HTMLElement) => {
      let element = elements.find(item => item.element === el);
      if (!element) {
        const style = el.getAttribute('style');
        element = {
          element: el,
          important: [],
          attributes: Object.keys(el.attributes).map(key => el.attributes[key].nodeName), 
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
          if (
            APPLY_WIDTH_PROPERTY &&
            el['width'] &&
            !element.attributes.find(attr => attr === 'width')
          ) {
            el.setAttribute('width', clearValue(el.style['width']));
          }
        }
      });
    });
  });

  if (APPLY_TABLE_PROPERTIES) {
    doc.querySelectorAll('table').forEach((table: HTMLTableElement) => 
      getTableProperties().forEach(prop => 
        table.setAttribute(prop, getPropertyValue(table, prop))
      ) 
    );
  }
}

/**
 *
 */
export const relative = (doc: HTMLElement, url: string) => {
  doc.querySelectorAll('[href],[src]').forEach((el: HTMLElement) => {
    const attr = el.hasAttribute('href') ? 'href' : 'src';
    const link = el.getAttribute(attr);
    // validate if the link is relative
    if (
      link.indexOf('/') === 0 &&
      link.indexOf('/', 1) !== 1
    ) {
      el.setAttribute(attr, getUrl(link));
    }
  });
}
