import { visit } from 'unist-util-visit';
import { Root } from 'mdast';

export const remarkAlignRight = () => {
    return (tree: Root) => {
        visit(tree, 'paragraph', (node) => {
            if (node.children.length > 0) {
                const lastChild = node.children[node.children.length - 1];
                if (
                    lastChild.type === 'text' &&
                    lastChild.value.startsWith('->')
                ) {
                    lastChild.value = lastChild.value.slice(2);
                    node.data = { hProperties: { className: 'align-right' } };
                }
            }
        });

        visit(tree, 'text', (node, _, parent) => {
            if (node.value.includes('<->')) {
                node.value = node.value.replace('<->', '').trim();
                if (parent && parent.type === 'paragraph') {
                    parent.data = {
                        hProperties: { className: 'space-between' },
                    };
                }
            }
        });
    };
};
