import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('вызывает обработчик клика', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Нажми</Button>);

    await user.click(screen.getByRole('button', { name: /нажми/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('отображает состояние загрузки', () => {
    render(
      <Button loading leadingIcon={<span data-testid="icon" />}>
        Сохраняем
      </Button>,
    );

    expect(screen.getByRole('button', { name: /сохраняем/i })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('делает кнопку недоступной при disabled', () => {
    render(
      <Button disabled variant="secondary">
        Недоступно
      </Button>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
});

