import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app correctly', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});

