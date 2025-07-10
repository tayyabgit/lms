import React from "react";

type FilterWrapperProps = {
  children?: React.ReactNode;
  className?: string;
};

function FilterWrapper({ children, className = "" }: FilterWrapperProps) {
  const baseClasses = "mt-2 mb-6";

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
}

export default FilterWrapper;
