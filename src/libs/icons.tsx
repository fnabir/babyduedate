import React from "react";

type ChevronRightIconProps = React.SVGProps<SVGSVGElement>;

export const ChevronRightIcon = ({
  className,
  ...props
}: ChevronRightIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
