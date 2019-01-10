/**
 *
 */
export interface StyleMap {
  selector: string;
  style: StyleAttr[];
}

interface StyleAttr {
  attr: string;
  value: string | number 
};

/**
 *
 */
export const toObject = (style: string): StyleAttr[] => {
  if (style) {
    return style.split(';')
      .map(style => {
        const entry = style.split(':');
        if (entry.length === 2) {
          return { attr: entry[0], value: entry[1].trim() } as StyleAttr;
        }
      })
      .filter(style => style);
  }
}
