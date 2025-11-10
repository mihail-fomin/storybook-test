import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CustomCheckbox } from './CustomCheckbox';

describe('CustomCheckbox', () => {
  it('переключает состояние по клику', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <CustomCheckbox
        id="terms"
        label="Согласен"
        description="Принять условия"
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /согласен/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('отключает взаимодействие при disabled', async () => {
    const user = userEvent.setup();
    render(
      <CustomCheckbox
        id="locked"
        label="Недоступно"
        description="Только для чтения"
        disabled
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /недоступно/i });
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

