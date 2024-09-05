import React from 'react'
import './Information.css'
import { TfiLocationPin } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { LuMails } from "react-icons/lu";

export const Information = () => {
  return (
    <div className='information'>
        <div className='items'>
        <div className='info'>
        <TfiLocationPin className='icon'/>
        <h2>Dirección</h2>
        <p> Cra. 14 #23 - 15, Armenia, Quindío</p>
        </div>
        <div className='info'>
        <FiPhone className='icon'/>
        <h2>Teléfono</h2>
        <p>3183499804</p>
        </div>
        <div className='info'>
        <LuMails  className='icon'/>
        <h2>Correo Electrónico</h2>
        <p>plantavida@camaraarmenia.org.co</p>
        </div>
        </div>
</div>
)
}