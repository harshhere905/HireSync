import "../../style/Button.scss";

const Button = ({ text, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className="custom-btn"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
     
export default Button;