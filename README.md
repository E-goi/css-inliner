# css-inliner
Inline your css 100% in the browser and with no dependencies

## Install

To install the package, you can use npm or yarn:

```bash
  yarn add @egoi/css-inliner
```

## Usage

Import the package on your code

```typscript
import { cssInliner } from '@egoi/css-inliner';
```

Use the main function ```cssInliner``` to inject the style on the elements.

```javascript
cssInliner(
  document.querySelector('html').innerHTML,
  {
    properties: {
      width: true,
      border: true,
      cellpadding: true,
      cellspacing: true
    }
  }
).then(formatted => {
  console.log(formatted);
});
```

## Configuration

The second parameter of ```cssInliner``` is a configuration object.

### Basic configuration

| Configuration | Type | Default | Description |
| -----------   | ---  | ---     | --------    |
| url           | string | empty | url to replace on relative path ```src``` and ```href``` |
| preserveMediaQueries | boolean | true | define if preserver or not @media queries |
| apply | ApplyTags | - | tags to get the styles |
| properties | ApplyProperties | - | apply style to some attributes |
| remove | RemoveTags | - | remove tags after set the css inline |

### ApplyTags configuration

| Configuration | Type | Default | Description |
| -----------   | ---  | ---     | --------    |
| style | boolean | true | apply style tags |
| link | boolean | true | apply content from link tags |

### ApplyProperties configuration

| Configuration | Type | Default | Description |
| -----------   | ---  | ---     | --------    | 
| width | boolean | false | apply width style to width property |
| border | boolean | false | apply border style to table border property |
| cellpadding | boolean | false | apply td padding style to table cellpadding property |
| cellspacing | boolean | false | apply border-spacing style to table cellspacing property |

### RemoveTags configuration

| Configuration | Type | Default | Description |
| -----------   | ---  | ---     | --------    |
| style | boolean | true | remove style tags |
| link | boolean | true | remove link tags |
| script | boolean | true | remove script tags |