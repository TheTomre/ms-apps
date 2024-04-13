import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCategory,
    nextPage,
    prevPage,
    fetchImages,
} from "./redux/imagesSlice";
import NavButton from "./components/NavButton";
import Modal from "react-modal";
import { InfinitySpin } from "react-loader-spinner";
import "./App.css";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f4f4f4",
        borderRadius: "4px",
        padding: "20px",
        width: "80%",
        maxWidth: "500px",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

Modal.setAppElement("#root");

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const { images, loading, error, category, currentPage } = useSelector(
        (state) => state.images
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch, category, currentPage]);

    const openCategoryModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const handleCategoryChange = (event) => {
        event.preventDefault();
        const category = event.target.elements.category.value;
        dispatch(setCategory(category));
        closeModal();
    };

    return (
        <div className="App">
            <NavButton
                label="Change Category"
                onClick={openCategoryModal}
                style={{ backgroundColor: "#5dbea3", width: "20vw" }}
            />
            <div className="button-container">
                <NavButton label="Prev" onClick={() => dispatch(prevPage())} />
                <NavButton label="Next" onClick={() => dispatch(nextPage())} />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Select Category"
            >
                <h2>Select Category</h2>
                <form onSubmit={handleCategoryChange} className="category-form">
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        className="category-input"
                    />
                    <button type="submit" className="category-submit">
                        Submit
                    </button>
                </form>
            </Modal>

            {selectedImage && (
                <Modal
                    isOpen={!!selectedImage}
                    onRequestClose={() => setSelectedImage(null)}
                    style={customStyles}
                    contentLabel="Image Details"
                >
                    <h2>Image Details</h2>
                    <div>Views: {selectedImage.views}</div>
                    <div>Downloads: {selectedImage.downloads}</div>
                    <div>Collection: {selectedImage.collections}</div>
                    <div>Likes: {selectedImage.likes}</div>
                </Modal>
            )}

            <div className="image-grid">
                {loading && (
                    <InfinitySpin
                        color="#00BFFF"
                        height={1000}
                        width={1000}
                        timeout={3000}
                    />
                )}
                {error && <p>Error: {error}</p>}
                {!loading &&
                    !error &&
                    images.map((image) => (
                        <img
                            key={image.id}
                            src={image.previewURL}
                            alt={image.tags}
                            className="image-item"
                            onClick={() => openImageModal(image)}
                        />
                    ))}
            </div>
        </div>
    );
}

export default App;
