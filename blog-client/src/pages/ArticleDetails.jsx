    // src/pages/ArticleDetails.jsx
    import { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import { fetchArticleById, fetchComments, postComment } from '../services/api';
    import CommentList from '../components/CommentList';
    import {
    Container,
    Card,
    Spinner,
    Alert,
    Form,
    Button,
    } from 'react-bootstrap';

    const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('access');

    const loadArticle = async () => {
        try {
        const res = await fetchArticleById(id);
        setArticle(res.data);
        } catch {
        setError('Failed to load article.');
        }
    };

    const loadComments = async () => {
        try {
        const res = await fetchComments(id);
        setComments(res.data);
        } catch {
        setError('Failed to load comments.');
        }
    };

    useEffect(() => {
        const init = async () => {
        setLoading(true);
        await loadArticle();
        await loadComments();
        setLoading(false);
        };
        init();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
        await postComment({ content: newComment, article: id }, token);
        setNewComment('');
        await loadComments();
        } catch {
        setError('Failed to post comment.');
        }
    };

    return (
        <Container className="py-4">
        {loading ? (
            <Spinner animation="border" />
        ) : error ? (
            <Alert variant="danger">{error}</Alert>
        ) : (
            <>
            <Card className="mb-4">
                <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    By {article.author.username} | {new Date(article.created_at).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>{article.content}</Card.Text>
                </Card.Body>
            </Card>

            {token && (
                <Form onSubmit={handleCommentSubmit} className="mb-4">
                <Form.Group>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2">
                    💬 Post Comment
                </Button>
                </Form>
            )}

            <CommentList
                comments={comments}
                articleId={id}
                refreshComments={loadComments}
            />
            </>
        )}
        </Container>
    );
    };

    export default ArticleDetails;
