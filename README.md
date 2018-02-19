# markdo
Very tiny (100 LOC) markdown formatter

## Instalation

```bash
npm install --save markdo
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
import markdo from 'markdo';

/**
 * markdo(text: string, style: string, cursorPosition: {start: number, end: number});
 */
const line = 'Think of RxJS as Lodash for events.';
console.log(markdo(line, 'bulletedList', {start: 13, end: 13}));

/*
Think of 

- RxJS

 as Lodash for events.
*/

// you can specify selection of the text as range
console.log(markdo(line, 'bold', {start: 9, end: 13}));

// Think of **RxJS** as Lodash for events.
```

## License
  [MIT](LICENSE)

