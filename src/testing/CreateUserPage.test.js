import { render, screen } from '@testing-library/react';
import CreateUserPage from '../Pages/CreateUserPage';

test('Check if create user page renders', () => {
  render(<CreateUserPage />);
  const linkElement = screen.getByText(/Opprett bruker/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check if create user page has a submit button', () => {
  render(<CreateUserPage />);
  const linkElement = screen.getByText('Opprett');
  expect(linkElement).toBeInTheDocument();
});

test('check if create user page has password texfield', () => {
  render(<CreateUserPage />);
  const linkElement = screen.getByLabelText(/Passord/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if create user page has confirm password texfield', () => {
    render(<CreateUserPage />);
    const linkElement = screen.getByLabelText(/Bekreft passord/i);
    expect(linkElement).toBeInTheDocument();
  });

test('check if create user page has username texfield', () => {
    render(<CreateUserPage />);
    const linkElement = screen.getByLabelText(/Brukernavn/i);
    expect(linkElement).toBeInTheDocument();
  });
