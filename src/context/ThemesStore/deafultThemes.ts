import { hash } from '../../lib/crypto';
import themeDefault from '../../assets/themes/default.css?raw';
import themeBasicBitch from '../../assets/themes/basic-bitch.css?raw';
import themeRetro from '../../assets/themes/retro.css?raw';
import themeClassy1Col from '../../assets/themes/classy-1-col.css?raw';
import { ThemeDefinition } from './types';

export const defaultThemes: ThemeDefinition[] = [
    {
        id: '02da34c6-4aff-53ba-afc5-24d97d838bda',
        name: 'Default',
        css: themeDefault,
        tags: ['default', 'simple', 'clean', 'minimal', 'modern'],
        lastUpdated: '2024-07-14T18:34:28Z',
        lastSeen: '2024-07-14T18:34:28Z',
        hash: hash(themeDefault + 'Default'),
    },
    {
        id: '9708d78a-0069-51f6-9b44-ddbdef2ac8e5',
        name: 'Basic Bitch',
        css: themeBasicBitch,
        tags: ['default', 'simple', 'clean', 'minimal', 'modern'],
        lastUpdated: '2024-07-14T18:34:28Z',
        lastSeen: '2024-07-14T18:34:28Z',
        hash: hash(themeBasicBitch + 'Basic Bitch'),
    },
    {
        id: 'cc851910-2a75-509f-8241-e808fa84c1dd',
        name: 'Retro',
        css: themeRetro,
        tags: ['default', 'simple', 'clean', 'minimal', 'modern'],
        lastUpdated: '2024-07-14T18:34:28Z',
        lastSeen: '2024-07-14T18:34:28Z',
        hash: hash(themeRetro + 'Retro'),
    },
    {
        id: '7fb4d3d0-7a89-525e-b196-df844e85df44',
        name: 'Classy',
        css: themeClassy1Col,
        tags: ['default', 'simple', 'clean', 'minimal', 'modern'],
        lastUpdated: '2024-07-14T18:34:28Z',
        lastSeen: '2024-07-14T18:34:28Z',
        hash: hash(themeClassy1Col + 'Classy'),
    },
];
