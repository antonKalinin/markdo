const styles = {
    heading1: {left: '# '},
    heading2: {left: '## '},
    heading3: {left: '### '},

    bold: {left: '**', 'right': '**'},
    italic: {left: '_', 'right': '_'},
    quote: {left: '> '},
    link: {left: '[', right: '](url)'},

    taskList: {left: '- [ ]', list: true},
    orderedList: {left: index => `${index}. `, list: true},
    bulletedList: {left: '- ', list: true},
};

const escape = string => string.split('').map(char => `\\${char}`).join('');
const wrapRegExp = (left, right) => new RegExp(`^${left}(.+)${right}$`);
const word = (text, position) => {
    const start = text.slice(0, position).lastIndexOf(' ');
    const end = text.indexOf(' ', position);

    return text.slice(
        start === -1 ? 0 : start,
        end === -1 ? text.length : end
    ).trim();
};

const wordSplit = (text, start, end) => {
    if (start === end) {
        start = text.slice(0, start).lastIndexOf(' ') + 1;
        end = text.indexOf(' ', start);
    }

    return [
        text.slice(0, start === -1 ? 0 : start),
        text.slice(end === -1 ? text.length : end),
    ]
};

const isApplied = (text, {left = '', right = ''} = {}) =>
    wrapRegExp(escape(left), escape(right)).test(text);

const wrap = (text, {left = '', right = ''} = {}) => `${left}${text}${right}`;
const unwrap = (text, {left = '', right = ''} = {}) =>
    wrapRegExp(escape(left), escape(right)).exec(text)[1];

const markitdown = (text, action, {start, end}) => {
    const textPlain = start === end ? word(text, start) : text.slice(start, end);
    const [textBefore, textAfter] = wordSplit(text, start, end);
    const style = styles[action];

    if (!style) {
        return text;
    }

    const textStalized = isApplied(textPlain, style)
        ? unwrap(textPlain, style)
        : wrap(textPlain, style)

    return `${textBefore}${textStalized}${textAfter}`;
};

module.exports = markitdown;
