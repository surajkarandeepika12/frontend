import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axiosMock from 'axios-mock-adapter';
import axios from 'axios';
import Register from '../Register';

const mockAxios = new axiosMock(axios);

describe('Signup Component', () => {
  it('renders the signup form', () => {
    render(<Signup />);
    const nameInput = screen.getByLabelText('Full Name');
    const phoneInput = screen.getByLabelText('phonenumber');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('sends a signup request when the form is submitted', async () => {
    // const responseData = { message: 'User your registration is successful' };
    mockAxios.onPost('http://localhost:8082/api/users/signup').reply(200);
    render(<Signup />);
    const nameInput = screen.getByLabelText('Full Name');
    const phoneInput = screen.getByLabelText('phonenumber');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ name: 'Test User', phone: '1234567890', email: 'test@example.com', password: 'testpassword' }));
      expect(mockAxios.history.post[0].headers['Content-Type']).toEqual('application/json');
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Phone number is invalid')).not.toBeInTheDocument();
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  it('displays validation error messages when form fields are empty', async () => {
    render(<Register />);
    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).toBeInTheDocument();
      expect(screen.queryByText('Phone number is invalid')).toBeInTheDocument();
      expect(screen.queryByText('Email is required')).toBeInTheDocument();
    });
  });
});