import styles from '../styles/imageHolder.module.scss';

// takes in image, alternative text, width and height
const ImageHolder = ({ src, alt = 'Image', width = 'auto', height = 'auto' }) => {
    const imageHolderStyle = { width, height };

    return (
        <div className={styles.imageHolder} style={imageHolderStyle}>
            <img src={src} alt={alt} className={styles.image} />
        </div>
    );
};

export default ImageHolder;
