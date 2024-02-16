import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Page from './page';
import { AuthContext } from '../contexts/authContext';

jest.mock('axios');

const mockContextValue = {
  user: {
    id: 1,
    name: 'John Doe',
    email: '',
  },
  token: '',
  login: jest.fn(),
  logout: jest.fn(),
};

describe('Page', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <Page />
      </AuthContext.Provider>,
    );
  });

  it('should render successfully', () => {
    const pageElement = screen.getByText('Login to your account');
    expect(pageElement).toBeInTheDocument();
  });

  it('should update email state on input change', () => {
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password state on input change', () => {
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('should fire login function on form submit', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signinButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    //@ts-ignore
    axios.post.mockResolvedValueOnce({
      data: { user: mockContextValue.user, token: mockContextValue.token },
    });

    fireEvent.click(signinButton);

    await waitFor(() => {
      expect(mockContextValue.login).toHaveBeenCalledTimes(1);
    });
  });

  it('should display error message on invalid email or password', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signinButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    //@ts-ignore
    axios.post.mockRejectedValueOnce({ response: { status: 401 } });

    fireEvent.click(signinButton);

    await waitFor(() => {
      expect(
        screen.getAllByText('Invalid email or password')[0],
      ).toBeInTheDocument();
    });
  });
});
