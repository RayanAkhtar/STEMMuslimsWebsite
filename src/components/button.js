import styles from "../styles/button.module.scss";
import Link from "next/link";

// takes in text, the function u want when its clicked OR the link, the theme, and the width
// theme is either primary (default) or secondary
const Button = ({
  label = "Button",
  onClick = () => {},
  href = null,
  theme = "primary",
  width = "clamp(300px, 20vw, 400px)",
}) => {
  const buttonStyle = {
    width: width, // || 'auto',
  };

  // if an href is provided, Link to that
  if (href) {
    return (
      <Link href={href} passHref>
        <button
          className={`${styles.button} ${styles[theme]}`}
          style={buttonStyle}
        >
          {label}
        </button>
      </Link>
    );
  }

  // otherwise, do something else
  return (
    <button
      className={`${styles.button} ${styles[theme]}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {label}
    </button>
  );
};

export default Button;
