import React, {useState} from 'react'
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements'
import StripeWalletElementStyled from './styled'

class StripeWalletElement extends React.Component {
    constructor(props) {
        super(props)

        // For full documentation of the available paymentRequest options, see:
        // https://stripe.com/docs/stripe.js#the-payment-request-object
        const paymentRequest = props.stripe.paymentRequest({
            country: 'BE',
            currency: 'eur',
            total: {
                label: 'Demo total',
                amount: 1000
            }
        })

        paymentRequest.on('token', ({complete, token, ...data}) => {
            console.log('Received Stripe token: ', token)
            console.log('Received customer information: ', data)
            complete('success')
        })

        paymentRequest.canMakePayment().then(result => {
            this.setState({canMakePayment: !!result})
        })

        this.state = {
            canMakePayment: false,
            paymentRequest
        }
    }

    render() {
        return this.state.canMakePayment ? (
            <StripeWalletElementStyled>
                <PaymentRequestButtonElement
                    paymentRequest={this.state.paymentRequest}
                    className="PaymentRequestButton"
                    style={{
                        // For more details on how to style the Payment Request Button, see:
                        // https://stripe.com/docs/elements/payment-request-button#styling-the-element
                        paymentRequestButton: {
                            theme: 'light',
                            height: '64px'
                        }
                    }}
                />
            </StripeWalletElementStyled>
        ) : null
    }
}
export default injectStripe(StripeWalletElement)
