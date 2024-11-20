import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./Postal.css";
import LogoVerde from "../../../assets/imagenes/logoPlantaVidaVerde.webp"


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
  
    // Fondo verde claro
    pdf.setFillColor(204, 255, 204); // Verde claro
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), "F");
  
    // Agregar el logo como encabezado
    const logo = new Image();
    logo.src = LogoVerde; // Asegúrate de que `Logo` esté importado
    logo.onload = () => {
      pdf.addImage(logo, "PNG", 85, 10, 40, 20); // Posición y tamaño del logo
  
      // Encabezado
      pdf.setFontSize(22);
      pdf.setTextColor(0, 102, 51); // Verde oscuro
      pdf.text("Postal Planta Vida", 105, 40, { align: "center" });
  
      // Subtítulos
      pdf.setFontSize(14);
      pdf.text("Dedicatoria", 20, 60);
      pdf.text("Mensaje", 20, 90);
  
      // Contenido
      pdf.setFontSize(12);
      pdf.setTextColor(34, 34, 34); // Gris oscuro
      pdf.text(formData.name, 20, 70);
      pdf.text(formData.message, 20, 100, { maxWidth: 170 });
  
      // Imagen cargada por el usuario
      if (formData.image) {
        pdf.addImage(formData.image, "JPEG", 70, 120, 70, 70); // Tamaño ajustado
      }
  
      // Pie de página
      pdf.setFontSize(10);
      pdf.setTextColor(0, 51, 25); // Verde más oscuro
      pdf.text("Gracias por ser parte de Planta Vida", 105, 280, { align: "center" });
  
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
