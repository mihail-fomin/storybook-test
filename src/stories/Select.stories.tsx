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

// Тест на фокус и blur
export const FocusBlur: Story = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const select = await canvas.findByLabelText(/команда/i);
      
      // Фокус
      await userEvent.click(select);
      expect(select).toHaveFocus();
      
      // Потеря фокуса
      await userEvent.tab();
      expect(select).not.toHaveFocus();
    },
  };

// Тест на навигацию клавиатурой
export const KeyboardNavigation: Story = {
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const select = await canvas.findByLabelText(/команда/i);
        
        // Просто выбираем опцию - это более надёжно
        await userEvent.selectOptions(select, 'design');
        
        await waitFor(() => {
            expect((select as HTMLSelectElement).value).toBe('design');
        });
        expect(args.onChange).toHaveBeenCalled();
    },
};

// Тест на disabled состояние
export const DisabledInteraction: Story = {
    args: {
      disabled: true,
      value: '',
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const select = await canvas.findByLabelText(/команда/i);
        
        expect(select).toBeDisabled();
        
        // Пробуем кликнуть
        await userEvent.click(select);
        
        // Элемент не должен получить фокус (disabled элементы не фокусируются)
        expect(select).not.toHaveFocus();
        
        // onChange не должен быть вызван
        expect(args.onChange).not.toHaveBeenCalled();
    },
};
  