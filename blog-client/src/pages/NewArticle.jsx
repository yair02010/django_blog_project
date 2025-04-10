    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import api from '../services/api';
    import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    } from 'react-bootstrap';

    const NewArticle = () => {
    const [form, setForm] = useState({ title: '', content: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('access');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.content.trim()) {
        setError('Title and content are required.');
        return;
        }

        try {
        await api.post('articles/', form, {
            headers: { Authorization: `Bearer ${token}` },
        });
        navigate('/');
        } catch {
        setError('Failed to create article.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '600px' }} className="p-4 shadow">
            <h3 className="text-center mb-4">
            <i className="bi bi-pencil-square me-2"></i>New Article
            </h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><i className="bi bi-type me-1"></i>Title</Form.Label>
                <Form.Control
                name="title"
                placeholder="Enter a title"
                value={form.title}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><i className="bi bi-card-text me-1"></i>Content</Form.Label>
                <Form.Control
                as="textarea"
                name="content"
                placeholder="Write your article here..."
                rows={6}
                value={form.content}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
                <i className="bi bi-upload me-1"></i>Publish Article
            </Button>
            </Form>
        </Card>
        </Container>
    );
    };

    export default NewArticle;
