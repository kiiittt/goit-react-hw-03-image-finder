import css from '../styles.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';


class ImageGallery extends Component {
  galleryRef = React.createRef();

  scrollToNewItems() {
    if (this.galleryRef && this.galleryRef.current) {
      this.galleryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { images, onOpenModal } = this.props;

    return (
      <>
        <ImageGallery ref={this.galleryRef} className={css.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onOpenModal={onOpenModal}
              className={css.ImageGalleryItem}
            />
          ))}
        </ImageGallery>
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};


export const fetchImages = async (query, page) => {
  const API_KEY = '34734922-71a756c5ae22b2ca14df3cfaf';
  const perPage = 12;
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    throw new Error(error.message);
  }
};