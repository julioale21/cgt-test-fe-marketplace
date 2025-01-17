import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaymentForm } from '../../components';


describe('PaymentForm', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
    finalTotal: 99.99
  };

  const validFormData = {
    cardName: 'John Doe',
    cardNumber: '4111111111111111',
    expiryDate: '12/25',
    cvv: '123',
    email: 'john@example.com',
    address: '123 Main St',
    city: 'New York'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = render(<PaymentForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render payment form with correct title and sections', () => {
    render(<PaymentForm {...defaultProps} />);
    expect(screen.getByText('Payment Details')).toBeInTheDocument();
    expect(screen.getByText('Card Information')).toBeInTheDocument();
    expect(screen.getByText('Billing Address')).toBeInTheDocument();
  });

  it('should render submit button with correct total amount', () => {
    render(<PaymentForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /pay \$99.99/i })).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    render(<PaymentForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/card holder name/i), validFormData.cardName);
    await userEvent.type(screen.getByLabelText(/card number/i), validFormData.cardNumber);
    await userEvent.type(screen.getByLabelText(/expiry date/i), validFormData.expiryDate);
    await userEvent.type(screen.getByLabelText(/cvv/i), validFormData.cvv);
    await userEvent.type(screen.getByLabelText(/email/i), validFormData.email);
    await userEvent.type(screen.getByLabelText(/address/i), validFormData.address);
    await userEvent.type(screen.getByLabelText(/city/i), validFormData.city);

    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining(validFormData),
        expect.anything()
      );
    });
  });

  it('should show validation errors for empty required fields', async () => {
    render(<PaymentForm {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(screen.getByText(/card holder name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/card number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/expiry date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/cvv is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/city is required/i)).toBeInTheDocument();
    });
  });

  it('should show all field-specific validation errors', async () => {
    render(<PaymentForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/card holder name/i), 'Jo');
    await userEvent.type(screen.getByLabelText(/card number/i), '1234');
    await userEvent.type(screen.getByLabelText(/expiry date/i), '13/25');
    await userEvent.type(screen.getByLabelText(/cvv/i), '12');
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/address/i), '123');

    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid 16-digit card number/i)).toBeInTheDocument();
      expect(screen.getByText(/please use MM\/YY format/i)).toBeInTheDocument();
      expect(screen.getByText(/cvv must be 3 or 4 digits/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/address must be at least 5 characters/i)).toBeInTheDocument();
    });
  });

  it('should clear validation errors when valid data is entered', async () => {
    render(<PaymentForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/card number/i), '1234');
    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid 16-digit card number/i)).toBeInTheDocument();
    });

    await userEvent.clear(screen.getByLabelText(/card number/i));
    await userEvent.type(screen.getByLabelText(/card number/i), validFormData.cardNumber);

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter a valid 16-digit card number/i)
      ).not.toBeInTheDocument();
    });
  });
});
