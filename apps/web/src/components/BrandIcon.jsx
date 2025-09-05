import React from "react";

export default function BrandIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2L22 12L12 22L2 12Z" fill="#3B82F6" />
    </svg>
  );
}
