import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  return (
    <button className={`${className}    common-button `} {...restProps}>
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};
Button.defaultProps = {
  className: "",
  leftIcon: null,
  rightIcon: null,
};

export { Button };
