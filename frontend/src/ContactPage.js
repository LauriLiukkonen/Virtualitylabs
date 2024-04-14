import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { EnvelopeFill, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';
import backgroundImage from './images/ota_yhteyttä.jpg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //const baseUrl = "http://localhost:3001";
  //const baseUrl = "https://virtualitylabs-server.vercel.app";
  const baseUrl = "https://virtualitylabs-server.vercel.app";

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/sendEmail`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  // Style for larger icons
  const iconStyle = { fontSize: '2rem', display: 'block', margin: '0 auto', color: '#69A9FF' };

  // Style for larger text
  const textStyle = { fontSize: '1.25rem', display: 'block'};

  // Hero style
  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`, // Replace with your actual image URL
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    position: 'relative',
    overlay: 'rgba(0, 0, 0, 0.5)' // Dark overlay
  };

  // Overlay style
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a dark overlay
    zIndex: 1,
  };

  return (
    <div>
      <div style={heroStyle}>
        <div style={overlayStyle}></div> {/* Dark overlay for better text visibility */}
        <h1 style={{ position: 'relative', zIndex: 2 }}>Ota yhteyttä</h1>
        
      </div>
      <Container>
        <Row className="align-items-start mt-5"> {/* Added top margin for spacing */}
          <Col xs={12} md={6} className="text-center mb-3">
            <h1>Yhteystietomme</h1>
            
            <br></br>
            
            <TelephoneFill style={iconStyle} />
            <span style={textStyle}>+358 40 966 0104</span>
            <br></br>
            <EnvelopeFill style={iconStyle} />
            <span style={textStyle}>service.virtualitylabs@gmail.com</span>
            <br></br>
            <GeoAltFill style={iconStyle} />
            <span style={textStyle}>Kuopio, Suomi</span>
          </Col>
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nimi</Form.Label>
                <Form.Control type="text" placeholder="Syötä nimi" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control type="email" placeholder="Syötä sähköposti" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Puhelinnumero</Form.Label>
                <Form.Control type="tel" placeholder="Syötä puhelinnumero" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>Viestisi</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Kirjoita viestisi" name="message" value={formData.message} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type='submit'>
                Lähetä
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactPage;
