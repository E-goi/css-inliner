import { Configuration, mergeConfigurations } from './config';
import { find } from './find';
import { remove } from './remove';
import { apply } from './apply';

/**
 *
 */
export function cssInliner(content: string, options: Configuration = {} as Configuration): Promise<string> {
  const config = mergeConfigurations(options);

  return new Promise((resolve, reject) => {
    const html = document.createElement('html');
    html.innerHTML = content;

    find(html, config.apply).then(styles => {
      if (styles) {
        remove(html, config.remove);

        apply(html, styles);
        resolve(html.outerHTML);
      }
    });
  });
}
