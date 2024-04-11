import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../features/images/imagesSlice';

const ImagesGrid = () => {
  const dispatch = useDispatch();
  const { images, category, loading, error } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages(category));
  }, [category, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {images.map((image) => (
        <div key={image.id}>{/* Display image */}</div>
      ))}
    </div>
  );
};

export default ImagesGrid;
