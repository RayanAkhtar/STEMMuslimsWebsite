import styles from "../styles/button.module.scss";
import Link from "next/link";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string | null;
  theme?: "primary" | "secondary" | "tertiary";
  width?: string;
}

const Button = ({
  label = "Button",
  onClick = () => {},
  href = null,
  theme = "primary",
  width = "clamp(200px, 15vw, 280px)",
}: ButtonProps) => {
  const buttonStyle = {
    width: width,
  };

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