import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, refresh } from '../redux/userSlice';

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user.userData).length === 0) {
      refresh(dispatch);
    }
  }, []);

  const handleLogout = () => {
    logout(dispatch);
    navigate('/login');
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Home
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <div className='d-flex ms-auto me-3'>
            {/* Add ms-auto class */}
            {Object.keys(user.userData).length !== 0 ? (
              <>
                <div className='me-3'>Hello, {user.userData.username}!</div>

                <Nav.Link
                  className='me-3'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className='me-3' as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link className='me-3' as={Link} to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
