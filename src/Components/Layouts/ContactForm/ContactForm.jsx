import React, { useState } from 'react';
import './ContactForm.css';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parámetros de EmailJS (reemplaza con tus propios valores)
    const serviceID = 'service_dltxr9j';
    const templateID = 'template_mnxxejk';
    const userID = 'fEcD5F3XzT_XZ1j-1';

    // Datos que se envían al correo (las variables deben coincidir con las de la plantilla en EmailJS)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    // Enviar el correo electrónico a través de EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tu mensaje se envió correctamente.',
          confirmButtonText: 'Ok'
        });
      }, (error) => {
        console.error('Error al enviar el correo:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al enviar el correo. Intenta nuevamente.',
          confirmButtonText: 'Ok'
        });
      });

    // Reiniciar los datos del formulario
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='form'>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contacto</h2>
        <div className="form-grp">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Nombre'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Correo Electronico'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="subject">Asunto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder='Asunto'
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
