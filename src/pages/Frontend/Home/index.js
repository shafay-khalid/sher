import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bg from "../../../assets/images/bg3.jpg"; // Ensure this path is correct
import hm from "../../../assets/images/hm.jpg"; // Store image
import hm2 from "../../../assets/images/hm2.jpg"; // Store image 2
import hm3 from "../../../assets/images/hm3.jpg"; // Store image 3
import clutches from "../../../assets/images/clutches.png";
import shoulderbags from "../../../assets/images/shoulderbags.png";
import handbags from "../../../assets/images/hansbags.png";
import totebags from "../../../assets/images/totebags.png";
import pouch from "../../../assets/images/pouch.png";
import crossbody from "../../../assets/images/crossbody.png";
import fannypacks from "../../../assets/images/fannypacks.png";
import backpacks from "../../../assets/images/backpacks.png";
import eveningbags from "../../../assets/images/eveningbags.png";
import axios from 'axios'; // Import axios for fetching items

// Store images for the main display
const images = [
    { src: hm, alt: "Store Item 1" },
    { src: hm2, alt: "Store Item 2" },
    { src: hm3, alt: "Store Item 3" },
];

// Category images for the scrolling section
const categoryImages = [
    { src: clutches, alt: "Category 1", name: "Clutches", link: "/category/clutches" },
    { src: shoulderbags, alt: "Category 3", name: "Shoulder bags", link: "/category/shoulderbags" },
    { src: eveningbags, alt: "Category 3", name: "Evening bags", link: "/category/eveningbags" },
    { src: totebags, alt: "Category 3", name: "Tote bags", link: "/category/totebags" },
    { src: pouch, alt: "Category 3", name: "Pouch", link: "/category/pouch" },
    { src: handbags, alt: "Category 2", name: "Hand bags", link: "/category/handbags" },
    { src: crossbody, alt: "Category 2", name: "Cross Body bags", link: "/category/crossbody" },
    { src: fannypacks, alt: "Category 2", name: "Fanny Packs", link: "/category/fannypacks" },
    { src: backpacks, alt: "Category 2", name: "Back Packs", link: "/category/backpacks" },
];

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [items, setItems] = useState([]); // State to hold items

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    useEffect(() => {
        // Fetch items from the backend
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5021/getItems'); // Adjust the endpoint as needed
                setItems(response.data); // Assuming the response contains an array of items
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    // Sort items by showingNumber in ascending order
    const sortedItems = items.sort((a, b) => a.showingNumber - b.showingNumber);

    return (
        <div style={styles.homepage}>
            <div style={styles.imageContainer}>
                <img
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    style={styles.storeImage}
                />
                {/* <div style={styles.saleBanner}>
                    <h2 style={styles.bannerText}>50% Off on Selected Items!</h2>
                </div> */}
            </div>
            {/* Horizontal Scrolling Section for Categories */}
            <h2 style={styles.categoriesHeading}>Categories</h2>
            <div className='scrollSection' style={styles.scrollSection}>
                {categoryImages.map((category, index) => (
                    <div key={index} style={styles.scrollItem}>
                        <Link to={category.link} style={styles.categoryLink}>
                            <div style={styles.imageWrapper}>
                                <img src={category.src} alt={category.alt} style={styles.scrollImage} />
                            </div>
                            <h3 style={styles.categoryName}>{category.name}</h3> {/* Category Name */}
                        </Link>
                    </div>
                ))}
            </div>

            {/* New Section for All Items */}
            <h2 style={styles.categoriesHeading}>All Items</h2>
            <div className='scrollSection' style={styles.scrollSection}>
                {sortedItems.map((item) => (
                    <div key={item._id} style={styles.scrollItem}>
                        <Link to={`/item/${item._id}`}>
                            <div style={styles.imageWrapper}>
                                <img
                                    src={`http://localhost:5021${item.imageUrls[0]}`}
                                    alt={item.name}
                                    style={styles.scrollImage}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.src = `http://localhost:5021${item.imageUrls[1]}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.src = `http://localhost:5021${item.imageUrls[0]}`;
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    homepage: {
        position: 'relative',
        minHeight: '100vh', // Ensure content can expand
        backgroundImage: `url(${bg})`, // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Allow content to flow naturally
        overflowY: 'auto', // Enable scrolling when needed
        paddingBottom: '20px', // Add space at bottom for scrolling
    },
    imageContainer: {
        marginTop: "100px",
        position: 'relative',
        width: '90%', // Full width
        height: '500px', // Set a specific height for the image container
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Hide overflow
    },
    storeImage: {
        width: '100%', // Full width
        height: '100%', // Full height
        objectFit: 'cover', // Cover the area
        borderRadius: '8px', // Rounded corners for images
    },
    saleBanner: {
        position: 'absolute',
        bottom: '10%', // Position the banner at the bottom
        left: '50%',
        transform: 'translateX(-50%)', // Center the banner
        backgroundColor: '#ffcc00', // Yellow background for the banner
        padding: '10px 20px', // Padding for the banner
        borderRadius: '5px', // Rounded corners
    },
    bannerText: {
        fontSize: '20px', // Font size for the banner text
        fontWeight: 'bold', // Bold text
        color: '#000', // Black text color
    },
    categoriesHeading: {
        margin: '10px 0', // Space above and below the heading
        fontSize: '32px', // Font size for the categories heading
        textAlign: 'center', // Center the heading
        color: "white",
    },
    scrollSection: {
        display: 'flex',
        overflowX: 'auto', // Allow horizontal scrolling
        padding: '10px', // Padding for the scroll section
        width: '100%', // Full width
        backgroundColor: 'transparent', // Slightly transparent background
    },
    scrollItem: {
        minWidth: '300px', // Minimum width for each item
        margin: '0 10px', // Space between items
        borderRadius: '8px', // Rounded corners
        overflow: 'hidden', // Hide overflow
        textAlign: 'center', // Center text
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: '300px', // Maintain aspect ratio
        overflow: 'hidden', // Hide overflow
    },
    scrollImage: {
        width: '100%', // Full width of the item
        height: '100%', // Maintain aspect ratio
        borderRadius: '8px', // Rounded corners for images
        objectFit: "cover",
        transition: 'transform 0.3s ease', // Smooth transition for hover effect
    },
    categoryLink: {
        textDecoration: 'none', // Remove underline
        color: 'white', // Set text color to white
    },
    categoryName: {
        marginTop: '5px', // Space above the category name
        fontSize: '18px', // Font size for the category name
        color: 'white', // White color for the category name
    },
};

export default HomePage;