// PayPalIntegration.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const initialOptions = {
    clientId: 'AR4ZKzp16FxDcpoBbwDkYLiC49-uNhcpOB8DAHuXqeOhecJARucFmfeHgGc-IJ4Di5ifUnoLvL3RoytK', // Thay thế bằng Client ID của bạn
    currency: 'USD',
};

const PayPalIntegration = ({ amount, onSuccess, onError }) => {
    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
            
                createOrder={(data, actions) => {
                    console.log('Amount to be charged in USD: ', amount);
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value: amount,
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    return actions.order.capture().then(async (details) => {
                        console.log('Transaction completed by ', details.payer.name.given_name);
                        // Xử lý giao dịch thành công
                        if (onSuccess) onSuccess(details);
                    });
                }}
                onError={(err) => {
                    console.error('PayPal Checkout onError', err);
                    if (onError) onError(err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalIntegration;
