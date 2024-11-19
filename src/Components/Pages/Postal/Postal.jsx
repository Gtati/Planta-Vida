import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./Postal.css";
import Swal from "sweetalert2";
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
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de generar la postal.",
        confirmButtonText: "Entendido",
      });
      return;
    }
  
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Postal Personalizada", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Dedicatoria: ${formData.name}`, 20, 40);
    pdf.text(`Mensaje: ${formData.message}`, 20, 50);
  
    if (formData.image) {
      pdf.addImage(formData.image, "JPEG", 20, 60, 50, 50);
    }
  
    pdf.save("postal.pdf");
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
