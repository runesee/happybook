import { render, screen } from '@testing-library/react';
import LoginPage from '../Pages/LoginPage';

test('Check if login page renders', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Innlogging/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check if login page has a login button', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Logg inn/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if login page has password texfield', () => {
  render(<LoginPage />);
  const linkElement = screen.getByLabelText(/Passord/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if login page has username texfield', () => {
    render(<LoginPage />);
    const linkElement = screen.getByLabelText(/Brukernavn/i);
    expect(linkElement).toBeInTheDocument();
  });


