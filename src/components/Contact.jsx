import React from 'react';

const Contact = () => {
  return (
    <section id="contact-section" className="contact-section">
      <div className="container">
        <h2>Let's get connected</h2>
        <div className="contact-content">
          <div className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="E-mail" />
            <textarea placeholder="Message"></textarea>
            <button>Send message</button>
          </div>
          <div className="social-media">
            <h3>Our social media</h3>
            <a href="#">LinkedIn</a>
            <a href="mailto:hello@rerter.com">hello@rerter.com</a>
            <a href="#">Schedule a call</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;