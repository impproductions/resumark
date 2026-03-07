import { describe, it, expect } from 'vitest';
import { remarkAlignRight } from './send-right';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

async function process(md: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkAlignRight)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md);
    return String(result);
}

describe('remarkAlignRight', () => {
    it('adds send-right class when last text node starts with ->', async () => {
        // The plugin checks lastChild.value.startsWith('->')
        // Emphasis immediately followed by -> produces a text node starting with ->
        const html = await process('*Hello*->World');
        expect(html).toContain('send-right');
    });

    it('adds space-between class for <-> marker', async () => {
        const html = await process('Left <-> Right');
        expect(html).toContain('space-between');
    });

    it('does not modify paragraphs without markers', async () => {
        const html = await process('Just a normal paragraph');
        expect(html).not.toContain('send-right');
        expect(html).not.toContain('space-between');
    });
});
