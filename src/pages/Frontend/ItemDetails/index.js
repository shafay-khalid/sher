import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, message, Row, Col, Rate, Select } from 'antd';
import axios from 'axios';
import { HeartOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import bg from "../../../assets/images/bg3.jpg";
import { useAuth } from '../../../context/authContext';

const { Title, Text } = Typography;

const ItemDetails = () => {
    const { state } = useAuth();
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5021/getItem/${id}`);
                setItem(response.data);
                if (response.data.colors.length > 0) {
                    setSelectedColor(response.data.colors[0]); // Set default selected color
                }
            } catch (error) {
                console.error("Error fetching item details:", error);
                message.error("Failed to fetch item details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    const totalPrice = item ? (item.sellingPrice * quantity).toFixed(2) : 0;
    const discountAmount = item ? (item.sellingPrice * (item.discount / 100)).toFixed(2) : 0; // Calculate discount amount
    const discountedPrice = item ? (item.sellingPrice - discountAmount).toFixed(2) : 0; // Calculate discounted price

    const addToCart = async () => {
        if (!item) return;
    
        if (!state.isAuthenticated) {
            message.warning("You need to log in to add items to the cart.");
            navigate('/auth/login');
            return;
        }
    
        const cartData = {
            itemId: item._id,
            quantity,
            totalPrice: discountedPrice, // Store the discounted price
            profit: (item.sellingPrice - item.buyPrice).toFixed(2),
            userId: state.user.uid,
            selectedColor,
            imageUrl: item.imageUrls[currentImageIndex] // Pass the selected image URL
        };
    
        try {
            await axios.post('http://localhost:5021/addToCart', cartData);
            message.success("Item added to cart successfully!");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            message.error("Failed to add item to cart");
        }
    };

    const addToWishlist = async () => {
        if (!item) return;

        if (!state.isAuthenticated) {
            message.warning("You need to log in to add items to the wishlist.");
            navigate('/auth/login');
            return;
        }

        const wishlistData = {
            itemId: item._id,
            userId: state.user.uid
        };

        try {
            await axios.post('http://localhost:5021/addToWishlist', wishlistData);
            message.success("Item added to wishlist successfully!");
        } catch (error) {
            console.error("Error adding item to wishlist:", error);
            message.error("Failed to add item to wishlist");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!item) {
        return <div>Item not found</div>;
    }

    const handleColorChange = (color) => {
        const colorIndex = item.colors.indexOf(color);
        if (colorIndex !== -1) {
            setCurrentImageIndex(colorIndex); // Assuming the images are in the same order as colors
        }
        setSelectedColor(color);
    };

    return (
        <>
            <div style={styles.itemDetailsPage}>
 <Row gutter={16} style={{ width: '100%', maxWidth: '1200px', margin: '80px auto', background: '#fff', padding: '30px', borderRadius: '10px' }}>
                    <Col xs={24} md={12} style={styles.imageContainer}>
                        <LeftOutlined onClick={() => setCurrentImageIndex((currentImageIndex - 1 + item.imageUrls.length) % item.imageUrls.length)} style={{ ...styles.navIcon, left: '10px' }} />
                        <img
                            src={`http://localhost:5021${item.imageUrls[currentImageIndex]}`}
                            alt={item.name}
                            style={styles.itemImage}
                        />
                        <RightOutlined onClick={() => setCurrentImageIndex((currentImageIndex + 1) % item.imageUrls.length)} style={{ ...styles.navIcon, right: '10px' }} />
                    </Col>
                    <Col xs={24} md={12} style={styles.detailsContainer}>
                        <Rate allowHalf defaultValue={4} style={{ fontSize: 20, marginBottom: 10 }} />
                        <Title level={3} style={{ color: '#000' }}>{item.name}</Title>
                        <div style={styles.priceContainer}>
                            <Text style={styles.strikethroughPrice}>RS {totalPrice}</Text>
                            <Text style={styles.discountValue}>   {item.discount}% Off</Text>
                        </div>
                        <Text style={styles.discountedPrice}>Discounted Price: RS {discountedPrice}</Text>

                        <div style={{ margin: '20px 0' }}>
                            <Text strong>Colors:</Text>
                            <Select
                                style={{ width: '200px', marginLeft: '10px' }}
                                onChange={handleColorChange}
                                value={selectedColor}
                            >
                                {item.colors.map((color, index) => (
                                    <Select.Option key={index} value={color}>
                                        {color}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <Text strong>Quantity:</Text>
                            <Select defaultValue={1} style={{ width: 60, marginLeft: 10 }} onChange={setQuantity}>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <Select.Option key={num} value={num}>{num}</Select.Option>
                                ))}
                            </Select>
                        </div>

                        <div style={styles.buttonContainer}>
                            <Button type="default" icon={<HeartOutlined />} className="iconButton" onClick={addToWishlist}>Add to Favorites</Button>
                            <Button type="primary" icon={<ShoppingCartOutlined />} style={{ backgroundColor: '#16a34a' }} className="cartButton" onClick={addToCart}>Add to Cart</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const styles = {
    itemDetailsPage: {
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        overflowY: 'auto',
        width: '100%',
    },
    imageContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    itemImage: {
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px 4px #16a34a',
        transition: 'transform 0.3s ease-in-out',
    },
    navIcon: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '24px',
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: '10px',
        borderRadius: '50%',
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px',
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
    },
    strikethroughPrice: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#ff0000', // Red color for strikethrough
        textDecoration: 'line-through',
        marginRight: '10px',
    },
    discountValue: {
        fontSize: '20px',
        color: '#ff0000', // Red color for discount value
    },
    discountedPrice: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#16a34a', // Green color for discounted price
        marginTop: '10px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '20px',
    },
};

export default ItemDetails;