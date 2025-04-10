    import { Navbar, Nav, Container, Button } from 'react-bootstrap';
    import { Link, useNavigate } from 'react-router-dom';

    const Header = () => {
    const token = localStorage.getItem('access');
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isStaff') === 'true';
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
            <Navbar.Brand as={Link} to="/">
            📰 Blog
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">🏠 Home</Nav.Link>
                {token && (
                <Nav.Link as={Link} to="/new">✍️ New Article</Nav.Link>
                )}
                {isAdmin && (
                <Nav.Link as={Link} to="/admin/articles">🛡️ Admin</Nav.Link>
                )}
            </Nav>
            <Nav>
                {token ? (
                <>
                    <Navbar.Text className="me-3">
                    <i className="bi bi-person-circle me-1"></i>
                    {username}
                    </Navbar.Text>
                    <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    🔓 Logout
                    </Button>
                </>
                ) : (
                <>
                    <Nav.Link as={Link} to="/login">🔐 Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">📝 Register</Nav.Link>
                </>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    };

    export default Header;
