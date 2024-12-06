import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import { CartContext } from '../../Layouts/CartContext/CartContext';
import { BonoContext } from '../../Layouts/BonoContext/BonoContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { removeBono } = useContext(CartContext); // Extraer removeBono del contexto del carrito
  const { selectedBono, setSelectedBono } = useContext(BonoContext); // Obtener selectedBono desde BonoContext
  const navigate = useNavigate(); // Hook para redirección
  const [preferenceId, setPreferenceId] = useState(null); // Estado para Mercado Pago

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago('APP_USR-0d87c446-9881-4c1d-a5d5-4dcd956613d9', {
      locale: 'es-CO',
      advancedFraudPrevention: true,
      debug: true,
    });
  }, []);

  // Redirigir si no hay bono seleccionado
  useEffect(() => {
    if (!selectedBono) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'Por favor, selecciona un bono antes de acceder al carrito.',
        icon: 'info',
      }).then(() => {
        navigate('/#nuestros-planes');
      });
    }
  }, [selectedBono, navigate]);

  const createPreference = async () => {
    try {
      const response = await axios.post('http://localhost:8080/create_preference', {
        title: selectedBono, // Usa el bono seleccionado como título
        quantity: 1,
        price: 100000, // Precio fijo, ajustable según lógica
      });

      console.log('Respuesta del backend:', response.data);
      const { id } = response.data;

      if (!id) {
        throw new Error("No se recibió un 'id' válido para la preferencia");
      }
      return id;
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      return null;
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id); // Asignar ID para mostrar el widget de Mercado Pago
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo procesar tu compra. Intenta nuevamente.',
        icon: 'error',
      });
    }
  };

  const handleFinalizePurchase = () => {
    Swal.fire({
      title: '¡Compra finalizada!',
      text: 'Gracias por tu compra. Pronto recibirás un correo de confirmación.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      setSelectedBono(null); // Limpiar el bono seleccionado
      removeBono(); // Limpiar el carrito
      navigate('/create-buyer'); // Redirigir a la página principal
    });
  };

  const handlePaypalApprove = (details) => {
    Swal.fire({
      title: '¡Compra finalizada con PayPal!',
      text: `Gracias por tu compra, ${details.payer.name.given_name}.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      setSelectedBono(null);
      removeBono();
      navigate('/');
    });
  };

  const paypalOptions = {
    "client-id": "AXGUk436HqGM91z5d4Y2SDFTlhQ8LXkhcZp1YvNfE_TkjTxJU-WIx-aZlGB2LIdqO04JCO0qY0yQHs5b",
    currency: "USD",
    intent: "capture",
  };

  return (
    <>
      <Navbar />
      <div className="contentShopping">
        <div className="shopping-cart-content">
          {selectedBono ? (
            <>
              <p>Bono seleccionado: {selectedBono}</p>

              <button onClick={handleBuy} className="purchase-bono">
                Comprar
              </button>

              {preferenceId && (
                <>
                  <Wallet
                    initialization={{ preferenceId }}
                    customization={{
                      paymentMethods: {
                        ticket: false,
                        atm: false,
                      },
                    }}
                  />
                  <button onClick={handleFinalizePurchase} className="finalize-purchase">
                    Finalizar compra
                  </button>
                </>
              )}
              <div className="paypal-section">
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    style={{
                      layout: "horizontal", // horizontal o vertical
                      color: "silver", // colores disponibles: blue, gold, silver, white, black
                      shape: "pill", // opciones: pill o rect
                      label: "pay", // opciones: paypal, pay, buy, donate
                      tagline: false, // mostrar o esconder la etiqueta inferior
                      height: 50, // altura del botón (en píxeles)
                    }}
                    className='custom-paypal-button'
                    createOrder={(data, actions) =>
                      actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "22.51", // Monto en USD
                            },
                          },
                        ],
                      })
                    }
                    onApprove={(data, actions) =>
                      actions.order.capture().then(handlePaypalApprove)
                    }
                  />
                </PayPalScriptProvider>
              </div>

              <button onClick={() => {
                setSelectedBono(null); // Limpiar bono seleccionado
                removeBono(); // Limpiar carrito
              }} className="delete-bono">
                Eliminar Bono
              </button>

            </>
          ) : (
            <p>No has seleccionado ningún bono aún.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
