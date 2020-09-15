import React from 'react';
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { mdiCreditCardPlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { createToken } from '../../store/auth/operations';
import { SvgIcon } from '../SvgIcon';

export const Payments = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleCreateToken = (token) => {
    dispatch(createToken(token, enqueueSnackbar));
  };

  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      currency='USD'
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      token={handleCreateToken}
    >
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<SvgIcon><Icon path={mdiCreditCardPlusOutline} /></SvgIcon>}
      >
        Add credits
      </Button>
    </StripeCheckout>
  );
};
