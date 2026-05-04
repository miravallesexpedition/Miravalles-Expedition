import crypto from 'crypto'

export const paymentService = {
  // Crear orden de pago en PayPal
  async createPaymentOrder(booking) {
    try {
      const accessToken = await this.getAccessToken()
      
      const response = await fetch('https://api.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: booking.total_price.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: booking.total_price.toString()
                  }
                }
              },
              items: [
                {
                  name: booking.tour_name,
                  quantity: booking.participants_count.toString(),
                  unit_amount: {
                    currency_code: 'USD',
                    value: (booking.total_price / booking.participants_count).toString()
                  },
                  description: `Tour date: ${booking.tour_date}`
                }
              ],
              reference_id: booking.id,
              custom_id: booking.id,
              description: `Miravalles Expedition - ${booking.tour_name}`
            }
          ],
          application_context: {
            brand_name: 'Miravalles Expedition',
            user_action: 'PAY_NOW',
            shipping_preference: 'NO_SHIPPING',
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pago-exitoso`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pago-cancelado`
          }
        })
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('PayPal error:', error)
        throw new Error('Error creating PayPal order')
      }

      const order = await response.json()
      return order
    } catch (error) {
      console.error('Error creating payment order:', error)
      throw error
    }
  },

  // Capturar orden de pago
  async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken()
      
      const response = await fetch(
        `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      if (!response.ok) {
        const error = await response.json()
        console.error('PayPal capture error:', error)
        throw new Error('Error capturing payment')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error capturing payment:', error)
      throw error
    }
  },

  // Obtener token de acceso
  async getAccessToken() {
    try {
      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
      const secretKey = process.env.PAYPAL_SECRET_KEY

      const auth = Buffer.from(`${clientId}:${secretKey}`).toString('base64')

      const response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })

      if (!response.ok) {
        throw new Error('Failed to get PayPal access token')
      }

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Error getting PayPal access token:', error)
      throw error
    }
  }
}
