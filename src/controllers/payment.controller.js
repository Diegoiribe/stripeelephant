import Stripe from 'stripe'
import { STRIPE_PRIVATE_KEY } from '../config.js'

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

export const createSession = async (req, res) => {
  try {
    const { amount, name, img, chase } = req.body // Se espera que el cliente no envíe el ID del método de pago directamente

    // Define las opciones de envío
    const shippingOptions = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 20000,
            currency: 'mxn'
          },
          display_name: 'Envios Nacionales',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5
            },
            maximum: {
              unit: 'business_day',
              value: 7
            }
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 100000,
            currency: 'mxn'
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1
            },
            maximum: {
              unit: 'business_day',
              value: 3
            }
          }
        }
      }
    ]

    // Crear un objeto metadata con la información de "chase"
    const metadata = {
      chase: chase ? 'yes' : 'no'
    }

    // Crea la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['MX']
      },
      shipping_options: shippingOptions,
      line_items: [
        {
          price_data: {
            currency: 'MXN',
            product_data: {
              name: name,
              images: [img]
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      metadata: metadata,
      success_url: `https://www.elephantarchives.com/success`,
      cancel_url: `https://www.elephantarchives.com/cancel`
    })

    console.log(session)
    res.send({ sessionId: session.id, sessionUrl: session.url }) // Envía el ID y la URL de la sesión para su uso en el cliente
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
