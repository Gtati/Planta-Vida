import React, { useState } from 'react';
import './ContactForm.css';
import emailjs from 'emailjs-com';

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
    const userID = 'E_Dr3O58R3_9tc-xS';

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
        console.log('Correo enviado con éxito:', response.status, response.text);
        alert('Tu mensaje ha sido enviado con éxito');
      }, (error) => {
        console.error('Error al enviar el correo:', error);
        alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
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
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Asunto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
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
