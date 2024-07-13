import { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import style from './MarkdownParser.module.scss';

interface Props {
    markdown: string;
}

export function MarkdownParser({ markdown }: Props) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        const processMarkdown = async () => {
            try {
                const file = await unified()
                    .use(remarkParse)
                    .use(remarkRehype)
                    .use(rehypeStringify)
                    .process(markdown);
                setHtml(String(file));
            } catch (error) {
                console.error('Error processing markdown:', error);
            }
        };

        processMarkdown();
    }, [markdown]);

    return (
        <div className={style.previewReset}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}
