import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CustomCheckbox } from '../components/CustomCheckbox/CustomCheckbox';
import { IconSparkles } from './icons/IconSparkles';

const meta: Meta<typeof CustomCheckbox> = {
  title: 'Foundation/CustomCheckbox',
  component: CustomCheckbox,
  args: {
    label: 'Получать дайджест',
    description: 'Присылаем только полезные материалы раз в неделю.',
    onChange: fn(),
  },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof CustomCheckbox>;

export const Playground: Story = {};

export const WithCustomIndicator: Story = {
  args: {
    indicator: <IconSparkles />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    description: 'Настройка недоступна в текущем тарифе.',
  },
};

export const Interaction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const accessibleName =
      typeof args.label === 'string'
        ? new RegExp(args.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        : /.+/;
    const checkbox = await canvas.findByRole('checkbox', { name: accessibleName });

    await userEvent.click(checkbox);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
    expect(args.onChange).toHaveBeenCalled();
  },
};

