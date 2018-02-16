const styles = {
    heading1: {left: '# '},
    heading2: {left: '## '},
    heading3: {left: '### '},

    bold: {left: '**', 'right': '**'},
    italic: {left: '_', 'right': '_'},
    link: {left: '[', right: '](url)'},
    quote: {left: '> ', list: true},

    taskList: {left: '- [ ] ', list: true},
    orderedList: {left: (index = 0) => `${index + 1}. `, list: true},
    bulletedList: {left: '- ', list: true},
};

const value = (value, arg) => typeof value === 'function' ? value(arg) : value;
const escape = string => string.split('').map(char => `\\${char}`).join('');
const wrapRegExp = (left, right) => new RegExp(`^${left}(.+)${right}$`);
const word = (text, position) => {
    const start = text.slice(0, position).lastIndexOf(' ');
    const end = position + text.slice(position).search(/\s|\n/);

    return text.slice(
        start === -1 ? 0 : start,
        end === -1 ? text.length : end
    ).trim();
};

const wordSplit = (text, start, end) => {
    if (start === end) {
        start = text.slice(0, start).lastIndexOf(' ') + 1;
        const lastMarker = text.slice(start).search(/\s|\n/);

        if (lastMarker !== -1) {
            end = start + lastMarker;
        }
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

const prepareStyle = ({left, right}, arg) => ({
    left: value(left, arg),
    right: value(right, arg),
});

const stylize = (text, style) => isApplied(text, style)
    ? unwrap(text, style)
    : wrap(text, style);

const markitdown = (text, action, {start, end}) => {
    const textPlain = start === end ? word(text, start) : text.slice(start, end);
    const [textBefore, textAfter] = wordSplit(text, start, end);
    const style = styles[action];

    if (!style) {
        return text;
    }

    const textPlainArray = style.list && textPlain.split('\n').length > 1
        ? textPlain.split('\n')
        : [textPlain];

    let textStalized = textPlainArray
        .map((text, index) => stylize(text, prepareStyle(style, index)))
        .join('\n')

    if (style.list) {
        if (textBefore && !textBefore.endsWith('\n\n')) {
            textStalized = '\n' + textStalized;
        }

        if (textAfter && !textAfter.startsWith('\n\n')) {
            textStalized = textStalized + '\n';
        }
    }

    return `${textBefore}${textStalized}${textAfter}`;
};

// список должен быть обрамлен пустыми строками (если это не перавая строка, или если уже не обрамлен)

module.exports = markitdown;
