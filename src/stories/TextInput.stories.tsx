import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TextInput } from '../components/TextInput/TextInput';
import { IconSearch } from './icons/IconSearch';

const meta: Meta<typeof TextInput> = {
  title: 'Foundation/TextInput',
  component: TextInput,
  args: {
    label: 'Поиск',
    placeholder: 'Введите запрос',
    onChange: fn(),
  },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    chromatic: {
      modes: {
        mobile: {
          viewport: 'mobile',
        },
        tablet: {
          viewport: 'tablet',
        },
        desktop: {
          viewport: 'desktop',
        },
        desktopLarge: {
          viewport: 'desktopLarge',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Playground: Story = {};

export const WithHelper: Story = {
  args: {
    helperText: 'Поддерживается поиск по коду и названию.',
  },
};

export const WithAffixes: Story = {
  args: {
    prefix: <IconSearch />,
    suffix: '⌘K',
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    errorText: 'Укажите хотя бы 3 символа.',
  },
};

export const Interaction: Story = {
  args: {
    label: 'Email',
    placeholder: 'design@your-company.com',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByLabelText(args.label as string);

    await userEvent.type(input, 'design-system');
    expect((input as HTMLInputElement).value).toBe('design-system');
    expect(args.onChange).toHaveBeenCalledTimes('design-system'.length);
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    label: 'Маленький размер',
    placeholder: 'Small input',
    helperText: 'Компактный размер для плотных интерфейсов',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    label: 'Средний размер',
    placeholder: 'Medium input (по умолчанию)',
    helperText: 'Стандартный размер для большинства случаев',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    label: 'Большой размер',
    placeholder: 'Large input',
    helperText: 'Увеличенный размер для лучшей видимости',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TextInput
        size="sm"
        label="Маленький (Small)"
        placeholder="Компактный ввод"
        helperText="min-height: 2.5rem, font-size: 0.925rem"
      />
      <TextInput
        size="md"
        label="Средний (Medium)"
        placeholder="Стандартный ввод"
        helperText="min-height: 3rem, font-size: 1rem"
      />
      <TextInput
        size="lg"
        label="Большой (Large)"
        placeholder="Увеличенный ввод"
        helperText="min-height: 3.5rem, font-size: 1.125rem"
      />
    </div>
  ),
};

