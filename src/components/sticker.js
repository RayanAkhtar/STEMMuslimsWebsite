import styles from '../styles/sticker.module.scss';


const Sticker = ({ text = "Default Text", size = '100px' }) => {
    const stickerStyle = {
        width: size,
        height: size,
    };

    return (
        <div className={styles.sticker} style={stickerStyle}>
            <span className={styles.stickerText}>{text}</span>
        </div>
    );
};

export default Sticker;
