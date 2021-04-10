import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
// import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51IeZUrAlIld8Ix8NE2vbX4K6mDGBdl3H9e3Wop4nlvN6lES8SC6lQRmfAXCuro8M5SkCfDNmkzhGVaiJyjlAlj6q00unLeFVM8');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;