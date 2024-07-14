import { visit } from 'unist-util-visit';
import { Root } from 'mdast';

export const remarkLevelBar = () => {
    return (tree: Root) => {
        visit(tree, 'text', (node) => {
            // TODO allow escaping
            const matches = node.value.match(/^\{\+[0-5]{1}\}/);
            if (matches) {
                node.value = node.value.replace(matches[0], '').trim();
                const stars = parseInt(matches[0].slice(2));
                const emptyStars = 5 - stars;

                node.data = {
                    ...(node.data || {}),
                    hName: 'div',
                    hProperties: {
                        className: 'level-bar-container',
                    },
                    hChildren: [
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: 'level-text',
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: node.value,
                                },
                            ],
                        },
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: 'level-bar',
                            },
                            children: [
                                ...new Array(stars).fill({
                                    type: 'element',
                                    tagName: 'i',
                                    properties: {
                                        className: 'bi bi-circle-fill',
                                    },
                                    children: [],
                                }),
                                ...new Array(emptyStars).fill({
                                    type: 'element',
                                    tagName: 'i',
                                    properties: {
                                        className: 'bi bi-circle',
                                    },
                                    children: [],
                                }),
                            ],
                        },
                    ],
                };
            }
        });
    };
};
