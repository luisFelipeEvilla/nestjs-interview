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
    const pageElement = screen.getByTestId('enterprise-table');
    expect(pageElement).toBeInTheDocument();
  });

  it('should render enterprise columns', () => {
    const idColumn = screen.getByTestId('id-column');
    const nameColumn = screen.getByTestId('name-column');
    const emailColumn = screen.getByTestId('email-column');
    const roleColumn = screen.getByTestId('role-column');
    const enterpriseNameColumn = screen.getByTestId('enterprise-name-column');
    const actionsColumn = screen.getByTestId('actions-column');

    expect(idColumn).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(roleColumn).toBeInTheDocument();
    expect(enterpriseNameColumn).toBeInTheDocument();
    expect(actionsColumn).toBeInTheDocument();
  });

  it('should render employees add Employee Button', () => {
    const addEmployeeButton = screen.getByText('Add User');

    expect(addEmployeeButton).toBeInTheDocument();
  });

  it('should fetch employees on mount with correspoding auth token', async () => {
    //@ts-ignore
    axios.get.mockResolvedValueOnce({
      data: [],
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/user', {
        headers: {
          Authorization: `Bearer ${mockContextValue.token}`,
        },
      });
    });
  });
});
