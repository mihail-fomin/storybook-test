import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('рендерит label и helperText', () => {
    render(
      <TextInput
        label="Email"
        helperText="Мы не рассылаем спам."
        placeholder="you@example.com"
      />,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/мы не рассылаем спам/i)).toBeVisible();
  });

  it('отображает сообщение об ошибке', () => {
    render(<TextInput label="Имя" error errorText="Обязательное поле" />);

    expect(screen.getByText(/обязательное поле/i)).toBeVisible();
    expect(screen.getByLabelText(/имя/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('проксирует изменение значения', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TextInput label="Комментарий" onChange={handleChange} />);

    const input = screen.getByLabelText(/комментарий/i);
    await user.type(input, 'feedback');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('feedback');
  });
});

