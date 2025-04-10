    // src/components/CommentList.jsx
    import { useState } from 'react';
    import { Button, Card, Form } from 'react-bootstrap';
    import { updateComment, deleteComment } from '../services/api';

    const CommentList = ({ comments, articleId, refreshComments }) => {
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isStaff') === 'true';
    const token = localStorage.getItem('access');

    const handleEditClick = (comment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditContent('');
    };

    const handleSave = async () => {
        try {
        await updateComment(editingId, { content: editContent }, token);
        refreshComments();
        setEditingId(null);
        } catch (err) {
        console.error('Failed to update comment', err);
        }
    };

    const handleDelete = async (id) => {
        try {
        await deleteComment(id, token);
        refreshComments();
        } catch (err) {
        console.error('Failed to delete comment', err);
        }
    };

    return (
        <div className="mt-4">
        {comments.map((comment) => (
            <Card key={comment.id} className="mb-3">
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                🗣️ {comment.author.username} | {new Date(comment.created_at).toLocaleString()}
                </Card.Subtitle>

                {editingId === comment.id ? (
                <>
                    <Form.Control
                    as="textarea"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="mb-2"
                    />
                    <Button size="sm" variant="success" onClick={handleSave} className="me-2">
                    💾 Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCancel}>
                    ❌ Cancel
                    </Button>
                </>
                ) : (
                <Card.Text>{comment.content}</Card.Text>
                )}

                {(comment.author.username === username || isAdmin) && editingId !== comment.id && (
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditClick(comment)}
                >
                    📝 Edit
                </Button>
                )}

                {(comment.author.username === username || isAdmin) && (
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                    className="ms-2"
                >
                    🗑️ Delete
                </Button>
                )}
            </Card.Body>
            </Card>
        ))}
        </div>
    );
    };

    export default CommentList;
