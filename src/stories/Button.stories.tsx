import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../components/Button/Button';
import { IconSend } from './icons/IconSend';

const meta: Meta<typeof Button> = {
  title: 'Foundation/Button',
  component: Button,
  args: {
    children: 'Отправить',
    variant: 'primary',
    size: 'md',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Назад',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Подробнее',
  },
};

export const WithIcon: Story = {
  args: {
    leadingIcon: <IconSend />,
    children: 'Отправить',
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    children: 'Сохранение...',
  },
};

export const Interaction: Story = {
  args: {
    children: 'Нажми меня',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: args.children as string });

    await userEvent.tab();
    expect(button).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

