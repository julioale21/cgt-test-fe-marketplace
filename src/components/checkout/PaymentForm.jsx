import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { CreditCard, ShoppingBag } from '@mui/icons-material';

const CARD_REGEX = /^[0-9]{16}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const CVV_REGEX = /^[0-9]{3,4}$/;

const PaymentForm = ({ onSubmit, finalTotal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      email: '',
      address: '',
      city: ''
    }
  });

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1.2,
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
          Payment Details
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'center' }}>
            <CreditCard color="primary" />
            <Typography variant="subtitle1">Card Information</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Holder Name"
                {...register('cardName', {
                  required: 'Card holder name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters'
                  }
                })}
                error={!!errors.cardName}
                helperText={errors.cardName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                {...register('cardNumber', {
                  required: 'Card number is required',
                  pattern: {
                    value: CARD_REGEX,
                    message: 'Please enter a valid 16-digit card number'
                  }
                })}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                inputProps={{ maxLength: 16 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                {...register('expiryDate', {
                  required: 'Expiry date is required',
                  pattern: {
                    value: EXPIRY_REGEX,
                    message: 'Please use MM/YY format'
                  }
                })}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
                {...register('cvv', {
                  required: 'CVV is required',
                  pattern: {
                    value: CVV_REGEX,
                    message: 'CVV must be 3 or 4 digits'
                  }
                })}
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'center' }}>
            <ShoppingBag color="primary" />
            <Typography variant="subtitle1">Billing Address</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                {...register('address', {
                  required: 'Address is required',
                  minLength: {
                    value: 5,
                    message: 'Address must be at least 5 characters'
                  }
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                {...register('city', {
                  required: 'City is required'
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
          </Grid>
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Pay ${finalTotal.toFixed(2)}
        </Button>
      </form>
    </Paper>
  );
};

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  finalTotal: PropTypes.number.isRequired
};

export { PaymentForm };
