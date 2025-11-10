import { useState } from 'react';
import {
  Button,
  CustomCheckbox,
  Select,
  TextInput,
  type SelectOption,
} from './components';
import './App.css';

const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'Россия', value: 'ru' },
  { label: 'Казахстан', value: 'kz' },
  { label: 'Беларусь', value: 'by' },
  { label: 'Армения', value: 'am', disabled: true },
];

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [accepted, setAccepted] = useState(false);
  const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1 className="app-shell__title">Design System Demo</h1>
        <p className="app-shell__subtitle">
          Мини-форма, демонстрирующая компоненты кнопки, поля ввода, выпадающего
          списка и кастомного чекбокса.
        </p>
      </header>

      <form className="app-form" onSubmit={(event) => event.preventDefault()}>
        <TextInput
          label="Электронная почта"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          helperText="Используйте корпоративный адрес."
          error={!isEmailValid}
          errorText="Введите корректный email."
          required
        />

        <Select
          label="Страна"
          placeholder="Выберите страну"
          options={COUNTRY_OPTIONS}
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          helperText="Доступные варианты можно расширить в самом компоненте."
        />

        <CustomCheckbox
          id="terms"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          label="Я согласен с условиями"
          description="Необходимо принять условия перед отправкой формы."
          required
        />

        <div className="app-actions">
          <Button type="submit" variant="primary" disabled={!accepted || !isEmailValid}>
            Отправить
          </Button>
          <Button variant="ghost" onClick={() => window.alert('Пример вторичного действия')}>
            Дополнительно
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
