import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ smallPicture, alt, largeImage }) => {
  const [showModal, setShowModal] = useState(false);
  const onModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <li className={css.galleryItem} onClick={() => setShowModal(true)}>
        <img src={smallPicture} alt={alt} className={css.galleryImg} />
      </li>
      {showModal && (
        <Modal largeImage={largeImage} onModalClose={onModalClose} />
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallPicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
