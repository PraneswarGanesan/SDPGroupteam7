import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { TextField, Button, Typography } from '@mui/material';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-us">
      <Navbar />
      <div className="contact">
      <div className="contact-content">
        <div className="contact-info">
          <Typography variant="h4" className="contact-heading">
            Get in Touch
          </Typography>
          <Typography variant="body1" className="contact-description">
            If you have any questions or need support, feel free to reach out to us using the contact form below. We look forward to hearing from you!
          </Typography>
          <form className="contact-form">
            <label htmlFor="name">Name:</label>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <label htmlFor="email">Email:</label>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <label htmlFor="message">Message:</label>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              multiline

            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="contact-button"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Contact;
