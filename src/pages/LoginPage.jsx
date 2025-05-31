import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../services/api'; // Import fungsi login dari api.js

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await apiLogin({ email, password });
      if (userData && userData.token) { // Asumsi backend mengembalikan token
        localStorage.setItem('authToken', userData.token);
        // Arahkan ke halaman home atau dashboard setelah login berhasil
        navigate('/');
      }
      // SweetAlert sukses sudah dihandle di dalam apiLogin
    } catch (error) {
      // SweetAlert error sudah dihandle di dalam apiLogin
      console.error("Login failed:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={4}>
          <Card className="retro-card p-4">
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>LOGIN</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="retro-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="retro-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 retro-button">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;