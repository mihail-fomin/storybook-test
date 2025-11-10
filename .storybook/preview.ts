import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'padded',
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#f8fafc' },
        { name: 'contrast', value: '#0f172a' },
        { name: 'brand', value: '#1d4ed8' },
      ],
    },
    options: {
      storySort: {
        order: ['Foundation', ['Button', 'TextInput', 'Select', 'CustomCheckbox'], 'Docs'],
      },
    },
    a11y: {
      manual: false,
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;