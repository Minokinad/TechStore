const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={`btn btn--${variant}`}>
      {children}
    </button>
  );
};
export default Button;
