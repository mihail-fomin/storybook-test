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

