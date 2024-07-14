import { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';

import style from './MarkdownParser.module.scss';
import './markdowner-theme.css';
import { remarkAlignRight } from '../../../markdown/rehype-plugins/send-right';
import { remarkLevelBar } from '../../../markdown/rehype-plugins/level-bar';

interface Props {
    markdown: string;
    css: string;
}

export function MarkdownParser({ markdown, css }: Props) {
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const splitColumns = markdown.split('|||||');

        const processMarkdown = async (md: string) => {
            try {
                const file = await unified()
                    .use(remarkParse)
                    .use(remarkGfm)
                    .use(remarkAlignRight)
                    .use(remarkLevelBar)
                    .use(remarkRehype)
                    .use(rehypeStringify)
                    .process(md);
                return String(file);
            } catch (error) {
                console.error('Error processing markdown:', error);
                return '';
            }
        };

        const processAllColumns = async () => {
            const processedColumns = await Promise.all(
                splitColumns.map(processMarkdown)
            );
            setColumns(processedColumns);
        };

        processAllColumns();
    }, [markdown]);
    return (
        // TODO: security issue?
        <div className={style.previewReset}>
            <div className={classNames(style.preview, 'markdowner-theme')}>
                <style type="text/css">{css}</style>
                {columns.map((column, index) => (
                    <div
                        key={index}
                        className={style.column}
                        dangerouslySetInnerHTML={{ __html: column }}
                    />
                ))}
                {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
            </div>
        </div>
    );
}
