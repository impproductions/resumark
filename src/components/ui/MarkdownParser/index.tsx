import { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import style from './MarkdownParser.module.scss';
import classNames from 'classnames';

interface Props {
    markdown: string;
    css: string;
}

export function MarkdownParser({ markdown, css }: Props) {
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
        // TODO: security issue?
        <div className={style.previewReset}>
            <div className={classNames(style.preview, 'markdowner-theme')}>
                <style type="text/css">{css}</style>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}
