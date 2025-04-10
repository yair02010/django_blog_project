    import { useState } from 'react';
    import { registerUser } from '../services/api';
    import { useNavigate } from 'react-router-dom';
    import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    } from 'react-bootstrap';

    const Register = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!form.username.trim() || !form.password.trim()) {
        setError('All fields are required.');
        return;
        }

        try {
        await registerUser(form);
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
        setError('Registration failed. Try a different username.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
            <h3 className="text-center mb-4">
            <i className="bi bi-person-plus-fill me-2"></i>Register
            </h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><i className="bi bi-person-fill me-1"></i>Username</Form.Label>
                <Form.Control
                name="username"
                placeholder="Choose a username"
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
                placeholder="Choose a password"
                onChange={handleChange}
                value={form.password}
                required
                />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100">
                <i className="bi bi-check-circle-fill me-1"></i>Register
            </Button>
            </Form>
        </Card>
        </Container>
    );
    };

    export default Register;
