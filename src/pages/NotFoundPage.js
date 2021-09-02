import React from 'react';
import '../styles/notFoundPage.css';

export default function NotFoundPage() {
  const adam = 'https://c.tenor.com/PrG5t-8U398AAAAC/adam-driver-screaming.gif';
  return (
    <section className="not-found-page">
      <h1>
        Page Not Found
      </h1>
      <div>

        <img className="adam-driver" src={ adam } alt="adam" />
      </div>
    </section>
  );
}
