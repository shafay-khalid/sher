import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/authContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaCartPlus, FaHeart, FaBox } from 'react-icons/fa';
import logo from '../../assets/images/logo2.png'; // Import your logo image

export default function CustomNavbar() {
    const { state } = useAuth();
    const navigate = useNavigate();

    const doSignOut = () => {
        return auth.signOut();
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header>
            <Navbar
                expand="lg"
                style={{
                    background: 'linear-gradient(135deg, #000000, #16a34a)', // Black to dark green gradient
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '1px 0',
                    boxShadow: scrolled ? '0 2px 15px rgba(0, 0, 0, 0.08)' : 'none'
                }}
            >
                <Container style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.3s ease',
                            padding: '3px 15px',
                            borderRadius: '8px',
                            background: 'transparent',
                            marginRight: 'auto' // Align to the left
                        }}
                    >
                        <img
                            src={logo} // Use the logo image
                            alt="Logo"
                            style={{
                                marginRight: '12px',
                                width: '70px', // Set the desired width
                                height: '70px', // Set the desired height
                            }}
                        />
                        <span
                            style={{
                                 color: '#22c55e',
                                background: 'linear-gradient(45deg, #16a34a, #22c55e)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Sharki
                        </span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ justifyContent: 'center', flexGrow: 1 }}>
                            <Nav.Link as={Link} to="/" style={{ color: '#ffffff', transition: 'color 0.3s ease, font-size 0.3s ease' }} 
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#e0e0e0'; // Change color on hover
                                    e.currentTarget.style.fontSize = '18px'; // Increase font size on hover
                                }} 
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#ffffff'; // Reset color
                                    e.currentTarget.style.fontSize = '16px'; // Reset font size
                                }}>
                                <FaHome /> Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" style={{ color: '#ffffff', transition: 'color 0.3s ease, font-size 0.3s ease' }} 
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#e0e0e0'; // Change color on hover
                                    e.currentTarget.style.fontSize = '18px'; // Increase font size on hover
                                }} 
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#ffffff'; // Reset color
                                    e.currentTarget.style.fontSize = '16px'; // Reset font size
                                }}>
                                <FaCartPlus /> Cart
                            </Nav.Link>
                            <Nav.Link as={Link} to="/wishlist" style={{ color: '#ffffff', transition: 'color 0.3s ease, font-size 0.3s ease' }} 
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#e0e0e0'; // Change color on hover
                                    e.currentTarget.style.fontSize = '18px'; // Increase font size on hover
                                }} 
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#ffffff'; // Reset color
                                    e.currentTarget.style.fontSize = '16px'; // Reset font size
                                }}>
                                <FaHeart /> WishList
                            </Nav.Link>
                            <Nav.Link as={Link} to="/orders" style={{ color: '#ffffff', transition: 'color 0.3s ease, font-size 0.3s ease' }} 
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#e0e0e0'; // Change color on hover
                                    e.currentTarget.style.fontSize = '18px'; // Increase font size on hover
                                }} 
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#ffffff'; // Reset color
                                    e.currentTarget.style.fontSize = '16px'; // Reset font size
                                }}>
                                <FaBox /> My Orders
                            </Nav.Link>
                        </Nav>

                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                            {state.isAuthenticated ? (
                                <button
                                    onClick={() => {
                                        doSignOut().then(() => {
                                            navigate('/auth/login');
                                        });
                                    }}
                                    className='btn btn-light mx-1' style={{ backgroundColor: 'transparent', border: '1px solid #ffffff', color: '#ffffff', transition: 'background-color 0.3s, color 0.3s, transform 0.3s' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#dc3545'; // Change background on hover
                                        e.currentTarget.style.color = '#ffffff'; // Change text color on hover
                                        e.currentTarget.style.transform = 'scale(1.05)'; // Slightly zoom in
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent'; // Reset background
                                        e.currentTarget.style.color = '#ffffff'; // Reset text color
                                        e.currentTarget.style.transform = 'scale(1)'; // Reset zoom
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button className='btn btn-light mx-1' style={{ backgroundColor: 'transparent', border: '1px solid #ffffff', color: '#ffffff', transition: 'background-color 0.3s, color 0.3s, transform 0.3s' }}>
                                        <Link className='text-sm text-decoration-none' to={'/auth/login'} 
                                            style={{ color: '#ffffff', transition: 'color 0.3s ease, font-size 0.3s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#e0e0e0'; // Change color on hover
                                                e.currentTarget.style.fontSize = '18px'; // Increase font size on hover
                                            }} 
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#ffffff'; // Reset color
                                                e.currentTarget.style.fontSize = '16px'; // Reset font size
                                            }}>
                                            Login
                                        </Link>
                                    </button>
                                    <button className='btn btn-light mx-1' style={{ backgroundColor: 'transparent', border: '1px solid #ffffff', color: '#ffffff', transition: 'background-color 0.3s, color 0.3s, transform 0.3s' }}>
                                        <Link className='text-sm text-decoration-none' to={'/auth/register'} 
                                            style={{ color: '#ffffff', transition: 'color 0.3s ease, font-size 0.3s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#e0e0e0'; // Change color on hover
                                                e.currentTarget.style.fontSize = '18px'; // Increase font size on hover
                                            }} 
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#ffffff'; // Reset color
                                                e.currentTarget.style.fontSize = '16px'; // Reset font size
                                            }}>
                                            Register New Account
                                        </Link>
                                    </button>
                                </>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}