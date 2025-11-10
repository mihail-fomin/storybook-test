import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

const OPTIONS = [
  { label: '🟢 Готово', value: 'done' },
  { label: '🟡 В работе', value: 'in-progress' },
  { label: '⚪️ Запланировано', value: 'planned' },
];

describe('Select', () => {
  it('показывает placeholder пока не выбрано значение', () => {
    render(
      <Select label="Статус" placeholder="Выберите статус" options={OPTIONS} defaultValue="" />,
    );

    const select = screen.getByLabelText(/статус/i);
    expect(select).toHaveDisplayValue('Выберите статус');
  });

  it('вызывает onChange при изменении значения', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select label="Статус" placeholder="Выберите статус" options={OPTIONS} onChange={handleChange} />,
    );

    const select = screen.getByLabelText(/статус/i);

    await user.selectOptions(select, 'done');

    expect(handleChange).toHaveBeenCalled();
    expect(select).toHaveValue('done');
  });
});

