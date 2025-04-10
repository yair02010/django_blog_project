    // src/pages/AdminArticles.jsx
    import { useEffect, useState } from 'react';
    import { fetchArticles, deleteArticle } from '../services/api';
    import { Link } from 'react-router-dom';
    import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';

    const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('access');

    useEffect(() => {
        const loadArticles = async () => {
        try {
            const res = await fetchArticles();
            setArticles(res.data);
        } catch {
            setError('Failed to load articles.');
        } finally {
            setLoading(false);
        }
        };
        loadArticles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        try {
        await deleteArticle(id, token);
        setArticles(articles.filter((a) => a.id !== id));
        } catch {
        setError('Failed to delete article.');
        }
    };

    return (
        <Container className="mt-4">
        <h2>Manage Articles</h2>
        {loading ? (
            <Spinner animation="border" />
        ) : error ? (
            <Alert variant="danger">{error}</Alert>
        ) : (
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article) => (
                <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.author.username}</td>
                    <td>{new Date(article.created_at).toLocaleString()}</td>
                    <td>
                    <Link to={`/admin/articles/${article.id}/edit`} className="btn btn-sm btn-warning me-2">
                        ✏️ Edit
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(article.id)}>
                        🗑️ Delete
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        )}
        </Container>
    );
    };

    export default AdminArticles;