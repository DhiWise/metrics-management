import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      ...restProps
    },
    ref
  ) => {
    return (
      <div className={`${wrapClassName}   `}>
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          className={className}
          type={type}
          name={name}
          placeholder={placeholder}
          {...restProps}
        />
        {!!suffix && suffix}
        {!!errors && <ErrorMessage errors={errors} />}
      </div>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.array,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};
Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  errors: [],
  label: "",
  prefix: null,
  suffix: null,
};

export { Input };
