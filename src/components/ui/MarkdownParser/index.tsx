import { useEffect, useRef, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';

import style from './MarkdownParser.module.scss';
import mdr from './markdowner-theme.css?raw';
import { remarkAlignRight } from '../../../markdown/rehype-plugins/send-right';
import { remarkLevelBar } from '../../../markdown/rehype-plugins/level-bar';

import 'typeface-roboto?raw';
import 'typeface-lora?raw';
import { remarkVerticalSpacer } from '../../../markdown/rehype-plugins/vertical-spacer';

interface Props {
    markdown: string;
    css: string;
}

export function MarkdownParser({ markdown, css }: Props) {
    const [sections, setSections] = useState<string[]>([]);

    useEffect(() => {
        const splitSections = markdown.split('|||||');

        const processMarkdown = async (md: string) => {
            try {
                const file = await unified()
                    .use(remarkParse)
                    .use(remarkGfm)
                    .use(remarkAlignRight)
                    .use(remarkLevelBar)
                    .use(remarkVerticalSpacer)
                    .use(remarkRehype)
                    .use(rehypeStringify)
                    .process(md);
                return String(file);
            } catch (error) {
                console.error('Error processing markdown:', error);
                return '';
            }
        };

        const processAllSections = async () => {
            const processedSections = await Promise.all(
                splitSections.map(processMarkdown)
            );
            setSections(processedSections);
        };

        processAllSections();
    }, [markdown]);

    const html = sections
        .map((section) => "<div class='section'>\n" + section + '</div>')
        .join('\n');

    return (
        <div className={classNames(style.preview)}>
            <IFrameSandbox html={html} css={css} />
        </div>
    );
}

interface SandboxProps {
    html: string;
    css: string;
}

const roboto = `
.roboto-thin {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.roboto-light {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.roboto-regular {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.roboto-medium {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.roboto-black {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.roboto-thin-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: italic;
}

.roboto-light-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.roboto-regular-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.roboto-medium-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.roboto-bold-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.roboto-black-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: italic;
}
`;

const lora = `
// <uniquifier>: Use a unique and descriptive class name
// <weight>: Use a value from 400 to 700

.lora-regular {
  font-family: Lora, serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}`;

export const IFrameSandbox = ({ html, css }: SandboxProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const userHtml = `<html><head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">    <style type="text/css">
    ${[lora, roboto, mdr, css].join(
        '\n'
    )}</style></head><body class="paper">${html}</body></html>`;

    useEffect(() => {
        if (iframeRef.current) {
            const iframeDoc =
                iframeRef.current.contentDocument ||
                iframeRef.current.contentWindow?.document;
            if (iframeDoc) {
                iframeDoc.documentElement.innerHTML = userHtml;
            }
        }
    }, [userHtml]);

    return (
        <iframe
            ref={iframeRef}
            sandbox="allow-same-origin"
            style={{ border: 'none', width: '100%', height: '100%' }}
        />
    );
};
