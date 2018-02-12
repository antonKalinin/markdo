const markitdown = require('./index');

const line = 'Think of RxJS as Lodash for events.';
const lines = `Creating Observables
Subscribing to Observables
Executing the Observable`


describe('Empty line', () => {
    test('Apply heading to empty line', () => {
        expect(markitdown('', 'heading1', {start: 3, end: 3}))
            .toBe('# ');
    });

    test('Apply bold to empty line', () => {
        expect(markitdown('', 'bold', {start: 3, end: 3}))
            .toBe('****');
    });

    test('Apply italic to empty line', () => {
        expect(markitdown('', 'italic', {start: 3, end: 3}))
            .toBe('__');
    });

    test('Apply quote to empty line', () => {
        expect(markitdown('', 'quote', {start: 3, end: 3}))
            .toBe('> ');
    });

    test('Apply link to empty line', () => {
        expect(markitdown('', 'link', {start: 3, end: 3}))
            .toBe('[](url)');
    });
});

describe('Single cursor position', () => {
    test('Apply bold to the first word, cursor before the word', () => {
        expect(markitdown(line, 'bold', {start: 0, end: 0}))
            .toBe('**Think** of RxJS as Lodash for events.');
    });

    test('Apply bold to the first word, cursor in the middle of the word', () => {
        expect(markitdown(line, 'bold', {start: 3, end: 3}))
            .toBe('**Think** of RxJS as Lodash for events.');
    });

    test('Apply bold to the first word, cursor after the word', () => {
        expect(markitdown(line, 'bold', {start: 5, end: 5}))
            .toBe('**Think** of RxJS as Lodash for events.');
    });

    test('Apply bold to the third word, cursor before the word', () => {
        expect(markitdown(line, 'bold', {start: 9, end: 9}))
            .toBe('Think of **RxJS** as Lodash for events.');
    });

    test('Apply bold to the third word, cursor in the middle of the word', () => {
        expect(markitdown(line, 'bold', {start: 10, end: 10}))
            .toBe('Think of **RxJS** as Lodash for events.');
    });

    test('Apply bold to the third word, cursor after the word', () => {
        expect(markitdown(line, 'bold', {start: 13, end: 13}))
            .toBe('Think of **RxJS** as Lodash for events.');
    });
});

describe('Selection of the text', () => {
    test('Apply italic to selection of the first word in single line of text', () => {
        expect(markitdown(line, 'italic', {start: 0, end: 5}))
            .toBe('_Think_ of RxJS as Lodash for events.');
    });

    test('Apply italic to selection of three words in single line of text', () => {
        expect(markitdown(line, 'italic', {start: 9, end: 23}))
            .toBe('Think of _RxJS as Lodash_ for events.');
    });

    test('Apply italic to selection of two lines of text', () => {
        expect(markitdown(lines, 'italic', {start: 0, end: 47}))
            .toBe(`_Creating Observables
Subscribing to Observables_
Executing the Observable`);
    });
});

test('Apply unknown style', () => {
    expect(markitdown(line, 'avada-kedavra', {start: 0, end: 5}))
        .toBe('Think of RxJS as Lodash for events.');
});