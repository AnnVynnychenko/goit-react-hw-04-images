import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

function ImageGallery({ galleryItems }) {
  return (
    <ul className={css.gallery}>
      {galleryItems.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallPicture={webformatURL}
            alt={tags}
            largeImage={largeImageURL}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;
