    // src/pages/EditArticle.jsx
    import { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { fetchArticleById, updateArticle } from '../services/api';
    import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    Spinner,
    } from 'react-bootstrap';

    const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access');

    const [form, setForm] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadArticle = async () => {
        try {
            const res = await fetchArticleById(id);
            setForm({ title: res.data.title, content: res.data.content });
        } catch {
            setError('Failed to load article.');
        } finally {
            setLoading(false);
        }
        };
        loadArticle();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await updateArticle(id, form, token);
        navigate('/admin/articles');
        } catch {
        setError('Failed to update article.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '600px' }} className="p-4 shadow">
            <h3 className="text-center mb-4">✏️ Edit Article</h3>
            {loading ? (
            <Spinner animation="border" />
            ) : error ? (
            <Alert variant="danger">{error}</Alert>
            ) : (
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    placeholder="Article title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    placeholder="Article content"
                    value={form.content}
                    onChange={handleChange}
                    required
                />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                Save Changes
                </Button>
            </Form>
            )}
        </Card>
        </Container>
    );
    };

    export default EditArticle;
