import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Select } from '../components/Select/Select';

const OPTIONS = [
  { label: 'Продуктовая команда', value: 'product' },
  { label: 'Дизайн', value: 'design' },
  { label: 'Разработка', value: 'engineering' },
  { label: 'Маркетинг', value: 'marketing' },
];

const meta: Meta<typeof Select> = {
  title: 'Foundation/Select',
  component: Select,
  args: {
    label: 'Продуктовая команда',
    placeholder: 'Выберите команду',
    options: OPTIONS,
    onChange: fn(),
  },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const DisabledOption: Story = {
  args: {
    options: OPTIONS.map((option) =>
      option.value === 'marketing' ? { ...option, disabled: true } : option,
    ),
    helperText: 'Маркетинг временно недоступен.',
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    errorText: 'Выберите хотя бы одно направление.',
  },
};

export const Interaction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const labelQuery =
      typeof args.label === 'string' && args.label.length > 0
        ? new RegExp(args.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        : /команда/i;
    const select = await canvas.findByLabelText(labelQuery);

    await userEvent.selectOptions(select, 'design');

    await waitFor(() => {
      expect((select as HTMLSelectElement).value).toBe('design');
    });
    expect(args.onChange).toHaveBeenCalled();
  },
};

