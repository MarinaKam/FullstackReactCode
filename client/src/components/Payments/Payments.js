import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from '@material-ui/core';
import { mdiCreditCardPlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { SvgIcon } from '../SvgIcon';

export const Payments = () => {
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      currency='USD'
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      token={token => console.log(token)}
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
