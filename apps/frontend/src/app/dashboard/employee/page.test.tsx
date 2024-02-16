import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Page from './page';
import { AuthContext } from '../../contexts/authContext';
import { mockEmployees } from '../../auth/mock/employee';

jest.mock('axios');

const mockContextValue = {
  user: {
    id: 1,
    name: 'John Doe',
    email: '',
  },
  token: 'asaksjkada',
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
    const pageElement = screen.getByTestId('employee-table');
    expect(pageElement).toBeInTheDocument();
  });

  it('should render employees columns', () => {
    const nameColumn = screen.getByTestId('name-column');
    const emailColumn = screen.getByTestId('email-column');
    const paymentTypeColumn = screen.getByTestId('payment-type-column');
    const paymentRateColumn = screen.getByTestId('payment-rate-column');
    const actionsColumn = screen.getByTestId('actions-column');

    expect(nameColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(paymentTypeColumn).toBeInTheDocument();
    expect(paymentRateColumn).toBeInTheDocument();
    expect(actionsColumn).toBeInTheDocument();
  });

  it('should render employees add Employee Button', () => {
    const addEmployeeButton = screen.getByText('Add Employee');

    expect(addEmployeeButton).toBeInTheDocument();
  });

  it('should fetch employees on mount with correspoding auth token', async () => {
    //@ts-ignore
    axios.get.mockResolvedValueOnce({
      data: mockEmployees,
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/employee', {
        headers: {
          Authorization: `Bearer ${mockContextValue.token}`,
        },
      });
    });
  });
});
