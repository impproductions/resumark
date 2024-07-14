import { visit } from 'unist-util-visit';
import { Root } from 'mdast';

export const remarkVerticalSpacer = () => {
    return (tree: Root) => {
        visit(tree, 'text', (node) => {
            if (node.value.match(/\[\^[0-9,v]\]/gi)) {
                let spacerLevel = node.value[2];
                if (spacerLevel === 'v') {
                    spacerLevel = 'full';
                }

                if (spacerLevel === '0') {
                    spacerLevel = 'min';
                }

                console.log('Found vertical spacer with level', spacerLevel);
                node.value = '';

                node.data = {
                    hName: 'div',
                    hProperties: {
                        className: 'vertical-spacer-' + spacerLevel,
                    },
                };
            }
        });
    };
};
