import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axiosMock from 'axios-mock-adapter';
import axios from 'axios';
import Login from '../Login';

const mockAxios = new axiosMock(axios);

describe('Login Component', () => {
  it('renders the login form', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /Log In/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('sends a login request when the form is submitted', async () => {
    const responseData = { access_token: 'jwt' };
    mockAxios.onPost('http://localhost:8089/authenticate').reply(200, responseData);
    render(<Login />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: 'user2@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ email: 'user2@gmail.com', password: '123' }));
      expect(mockAxios.history.post[0].headers.Authorization).toEqual('Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMkBnbWFpbC5jb20iLCJleHAiOjE2Nzk1OTc2ODAsImlhdCI6MTY3OTU5NTg4MH0.j7ABdDDj6JiFoPbNbFlncNzyR01-ueVOC-qlCMLunGE');
      expect(localStorage.getItem('access_token')).toEqual('jwt');
    });
  });
});

