import { describe, it, expect } from 'vitest';
import { remarkLevelBar } from './level-bar';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

async function process(md: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkLevelBar)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md);
    return String(result);
}

describe('remarkLevelBar', () => {
    it('renders a level bar with the correct number of filled circles', async () => {
        const html = await process('{+3} TypeScript');
        expect(html).toContain('level-bar-container');
        expect(html).toContain('bi-circle-fill');
        expect(html).toContain('bi-circle');
        expect(html).toContain('TypeScript');
    });

    it('renders 5 filled circles for {+5}', async () => {
        const html = await process('{+5} Expert');
        const filled = (html.match(/bi-circle-fill/g) || []).length;
        expect(filled).toBe(5);
    });

    it('renders 0 filled circles for {+0}', async () => {
        const html = await process('{+0} Beginner');
        expect(html).not.toContain('bi-circle-fill');
    });

    it('does not transform text without the {+n} prefix', async () => {
        const html = await process('Regular text');
        expect(html).not.toContain('level-bar-container');
    });
});
