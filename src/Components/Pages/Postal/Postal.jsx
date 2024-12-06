import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./Postal.css";
import LogoNegro from "../../../assets/imagenes/logoPlantaVidaVerde.webp";


import { FaHome } from "react-icons/fa";
import Logo from "../../../assets/imagenes/logoPlantaVidaBlanco.png";

const PostalCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    if (!formData.name || !formData.message || !formData.image) {
      alert("Por favor, completa todos los campos antes de generar la postal.");
      return;
    }
  
    const pdf = new jsPDF();
  
    // Fondo blanco para la postal, con un borde sutil
    pdf.setFillColor(255, 255, 255); // Blanco
    pdf.rect(5, 5, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10, "F");
    pdf.setDrawColor(200, 200, 200); // Borde gris suave
    pdf.rect(5, 5, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10);
  
    // Logo en la parte superior centrado
    const logo = new Image();
    logo.src = LogoNegro;
    logo.onload = () => {
      pdf.addImage(logo, "PNG", (pdf.internal.pageSize.getWidth() - 50) / 2, 15, 50, 30); // Logo centrado y de tamaño ajustado
  
      // Título de la postal
      pdf.setFontSize(28);
      pdf.setTextColor(50, 50, 50); // Gris oscuro
      pdf.text("Postal Planta Vida", pdf.internal.pageSize.getWidth() / 2, 60, { align: "center" });
  
      // Espaciado entre el título y el contenido
      pdf.setFontSize(12);
      pdf.text("", pdf.internal.pageSize.getWidth() / 2, 80); // Espacio vacío
  
      // Dedicatoria
      pdf.setFontSize(18);
      pdf.setTextColor(30, 30, 30); // Gris oscuro
      pdf.text("Dedicatoria:", 20, 100);
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0); // Negro
      pdf.text(formData.name, 20, 115);
  
      // Mensaje
      pdf.setFontSize(18);
      pdf.setTextColor(30, 30, 30); // Gris oscuro
      pdf.text("Mensaje:", 20, 135);
      pdf.setFontSize(14);
      pdf.setTextColor(60, 60, 60); // Gris medio
      pdf.text(formData.message, 20, 150, { maxWidth: 170 });
  
      // Imagen cargada por el usuario (solo si existe)
      if (formData.image) {
        pdf.addImage(formData.image, "JPEG", (pdf.internal.pageSize.getWidth() - 80) / 2, 170, 80, 80); // Imagen centrada
      }
  
      // Espacio vacío antes del pie de página
      pdf.setFontSize(12);
      pdf.text("", 105, 250); // Espacio vacío
  
      // Pie de página con agradecimiento
      pdf.setFontSize(10);
      pdf.setTextColor(90, 90, 90); // Gris claro
      pdf.text("Gracias por ser parte de Planta Vida", pdf.internal.pageSize.getWidth() / 2, 280, { align: "center" });
  
      // Guardar el PDF
      pdf.save("postal.pdf");
    };
  };
  
  

  return (
    <div className="postal-creator-container">
      <form className="postal-form">
        {/* Encabezado del formulario */}
        <div className="postal-header">
          <img src={Logo} alt="Logo Planta Vida" className="logo-postal" />
          <Link to="/" className="home-icon">
            <FaHome />
          </Link>
        </div>
        <h1 className="title-postal">Crea tu Postal</h1>
        <div className="form-group">
          <label htmlFor="name">Dedicatoria: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Escribe tu dedicatoria"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Escribe tu mensaje"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Subir imagen:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <button type="button" onClick={generatePDF} className="btn-submit">
          Generar PDF
        </button>
      </form>
    </div>
  );
};

export default PostalCreator;
