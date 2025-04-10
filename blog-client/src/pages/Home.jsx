    import { useEffect, useState } from 'react';
    import { fetchArticles, fetchComments, postComment, updateComment, deleteComment } from '../services/api'; // הוסף את updateComment
    import {
    Container,
    Card,
    Button,
    Form,
    Alert,
    Spinner,
    Collapse,
    } from 'react-bootstrap';

    const Home = () => {
    const [articles, setArticles] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const token = localStorage.getItem('access');

    useEffect(() => {
        const load = async () => {
        const res = await fetchArticles();
        setArticles(res.data);
        };
        load();
    }, []);

    const loadComments = async (articleId) => {
        if (selectedId === articleId) {
        setSelectedId(null); // toggle off
        return;
        }

        setLoadingComments(true);
        setSelectedId(articleId);
        const res = await fetchComments(articleId);
        setComments(res.data);
        setLoadingComments(false);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!token) {
        setError('You must be logged in to comment.');
        return;
        }

        if (!newComment.trim()) {
        setError('Comment cannot be empty.');
        return;
        }

        try {
        await postComment({ article: selectedId, content: newComment }, token);
        setNewComment('');
        setError('');
        loadComments(selectedId);
        } catch (err) {
        setError('Failed to post comment.');
        }
    };

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editContent.trim()) {
        setError('Comment cannot be empty.');
        return;
        }

        try {
        await updateComment(editingCommentId, { content: editContent }, token);
        setEditingCommentId(null);
        setEditContent('');
        loadComments(selectedId);
        } catch (err) {
        setError('Failed to edit comment.');
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditContent('');
    };

    const handleDelete = async (commentId) => {
        try {
        await deleteComment(commentId, token);
        loadComments(selectedId); // Refresh comments after deletion
        } catch (err) {
        setError('Failed to delete comment.');
        }
    };

    return (
        <Container>
        <h2 className="mb-4">
            <i className="bi bi-journals me-2"></i>Latest Articles
        </h2>

        {articles.length === 0 && (
            <Alert variant="info">No articles yet. Be the first to write one!</Alert>
        )}

        {articles.map((article) => (
            <Card className="mb-4 shadow-sm" key={article.id}>
            <Card.Body>
                <Card.Title>
                <i className="bi bi-pencil-fill me-2"></i>
                {article.title}
                </Card.Title>
                <Card.Text>{article.content}</Card.Text>
                <small className="text-muted">
                <i className="bi bi-person-circle me-1"></i>
                {article.author.username}
                </small>
                <div className="mt-3">
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => loadComments(article.id)}
                >
                    {selectedId === article.id ? 'Hide Comments' : 'View Comments'}
                </Button>
                </div>
            </Card.Body>

            <Collapse in={selectedId === article.id}>
                <div className="px-4 pb-4">
                {loadingComments ? (
                    <Spinner animation="border" />
                ) : (
                    <>
                    <h6 className="mt-3 mb-2">
                        <i className="bi bi-chat-dots me-2"></i>Comments
                    </h6>
                    {comments.length === 0 ? (
                        <p className="text-muted">No comments yet.</p>
                    ) : (
                        comments.map((comment) => (
                        <div key={comment.id} className="mb-3 border-bottom pb-2">
                            {editingCommentId === comment.id ? (
                            <>
                                <Form.Control
                                as="textarea"
                                rows={2}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                />
                                <Button
                                variant="success"
                                size="sm"
                                onClick={handleSaveEdit}
                                className="me-2"
                                >
                                💾 Save
                                </Button>
                                <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleCancelEdit}
                                >
                                ❌ Cancel
                                </Button>
                            </>
                            ) : (
                            <>
                                <p className="mb-1">{comment.content}</p>
                                <small className="text-muted">
                                <i className="bi bi-person-fill me-1"></i>
                                {comment.author.username}
                                </small>
                                {(comment.author.username === localStorage.getItem('username') ||
                                localStorage.getItem('isStaff') === 'true') && (
                                <div className="mt-2">
                                    <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEditClick(comment)}
                                    >
                                    📝 Edit
                                    </Button>
                                    <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(comment.id)}
                                    className="ms-2"
                                    >
                                    🗑️ Delete
                                    </Button>
                                </div>
                                )}
                            </>
                            )}
                        </div>
                        ))
                    )}

                    {token && (
                        <Form onSubmit={handleSubmitComment}>
                        <Form.Group className="mb-2">
                            <Form.Control
                            as="textarea"
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            />
                        </Form.Group>
                        <Button type="submit" variant="success" size="sm">
                            <i className="bi bi-send-fill me-1"></i>Post Comment
                        </Button>
                        </Form>
                    )}

                    {error && (
                        <Alert variant="danger" className="mt-2">
                        {error}
                        </Alert>
                    )}
                    </>
                )}
                </div>
            </Collapse>
            </Card>
        ))}
        </Container>
    );
    };

    export default Home;
