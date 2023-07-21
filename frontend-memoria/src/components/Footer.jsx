import React from 'react';
import { FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} made by -{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/narayaurrutia/"
        >
          Nicolás Araya Urrutia
        </a>
      </small>
    </footer>
  );
}

export default Footer;
