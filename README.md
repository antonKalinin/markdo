# to-md
Very tiny (100 LOC) markdown formatter

## Instalation

```bash
npm install --save to-md
```

## Supported styles
- `# Header 1 (heading1)`
- `## Heading 2 (heading2)`
- `### Heading 3 (heading3)`
- `**Bold** (bold)`
- `_Italic_ (italic)`
- `[link](url) (link)`
- `> Quote (quote)`
- `- Bullted list (bulletedList)`
- `1. Ordered list (orderedList)`
- `[ ] Task list (taskList)`

## Usage

```js
import toMd from 'to-md';

const line = 'Think of RxJS as Lodash for events.';
const formattedLine = toMd(line, 'bulletedList', {start: 13, end: 13});

/*
formattedLine:

Think of 

- RxJS

 as Lodash for events.
*/
```

## License
  [MIT](LICENSE)

