import { describe, it, expect } from 'vitest';
import { remarkVerticalSpacer } from './vertical-spacer';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

async function process(md: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkVerticalSpacer)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md);
    return String(result);
}

describe('remarkVerticalSpacer', () => {
    it('renders a numbered spacer class', async () => {
        const html = await process('[^3]');
        expect(html).toContain('vertical-spacer-3');
    });

    it('renders "full" spacer for [^v]', async () => {
        const html = await process('[^v]');
        expect(html).toContain('vertical-spacer-full');
    });

    it('renders "min" spacer for [^0]', async () => {
        const html = await process('[^0]');
        expect(html).toContain('vertical-spacer-min');
    });

    it('does not transform regular text', async () => {
        const html = await process('No spacer here');
        expect(html).not.toContain('vertical-spacer');
    });
});
