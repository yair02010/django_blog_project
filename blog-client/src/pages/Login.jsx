    // src/pages/Login.jsx
    import { useState } from 'react';
    import { loginUser } from '../services/api';
    import { useNavigate } from 'react-router-dom';
    import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    } from 'react-bootstrap';

    const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await loginUser(form);
        localStorage.setItem('access', res.data.access);

        const tokenParts = res.data.access.split('.')[1];
        const payload = JSON.parse(atob(tokenParts));
        localStorage.setItem('username', payload.username);
        localStorage.setItem('isStaff', payload.is_staff); // ✅ שמור את is_staff

        navigate('/');
        } catch {
        setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
            <h3 className="text-center mb-4">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><i className="bi bi-person-fill me-1"></i>Username</Form.Label>
                <Form.Control
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={form.username}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><i className="bi bi-lock-fill me-1"></i>Password</Form.Label>
                <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
                value={form.password}
                required
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
                <i className="bi bi-arrow-right-circle me-1"></i>Login
            </Button>
            </Form>
        </Card>
        </Container>
    );
    };

    export default Login;