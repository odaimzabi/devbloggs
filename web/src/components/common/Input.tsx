import React from "react";
import classNames from "../../utils/classnames";

type Props = {
  name?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  dataTestid?: string;
  ariaInvalid?: "false" | "true";
};
const initialClassName =
  "rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base";

const Input = React.forwardRef(
  (
    { ariaInvalid, dataTestid, name, className, type, ...props }: Props,
    _ref
  ) => {
    return (
      <input
        name={name}
        type={type}
        className={classNames(initialClassName, className as string)}
        {...props}
        data-testid={dataTestid}
        aria-invalid={ariaInvalid}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
