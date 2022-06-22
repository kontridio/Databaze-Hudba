import React from 'react';
import './Footer.css';


export const Footer = () => {
    let year = new Date().getFullYear();

    return (
        <footer className=' mt-4 p-5 text-center'>
            <p className='copyright'>&copy; {year} - Ročníkový projekt IT2 - autor: <b>Tom a Fíla</b></p>
        </footer>
    );
};