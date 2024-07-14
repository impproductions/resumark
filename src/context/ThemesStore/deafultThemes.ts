import { hash } from '../../lib/crypto';
import defaultCss from './default-user-theme.css?raw';
import { ThemeDefinition } from './types';

export const defaultThemes: ThemeDefinition[] = [
    {
        id: '02da34c6-4aff-53ba-afc5-24d97d838bda',
        name: 'Default',
        css: defaultCss,
        tags: ['default', 'simple', 'clean', 'minimal', 'modern'],
        lastUpdated: '2024-07-14T18:34:28Z',
        lastSeen: '2024-07-14T18:34:28Z',
        hash: hash(defaultCss),
    },
];
