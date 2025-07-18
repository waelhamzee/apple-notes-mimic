import * as React from "react";

const NoteLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Main note rectangle */}
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="6"
      ry="6"
      fill="#FFFBEB"
      stroke="#D1C29B"
      strokeWidth="2"
    />
    {/* Folded corner */}
    <path
      d="M 40 8 L 56 8 L 56 24 Z"
      fill="#FCD34D"
      stroke="#D1C29B"
      strokeWidth="2"
    />
    {/* Lines for text */}
    <line x1="20" y1="28" x2="44" y2="28" stroke="#C9B458" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="36" x2="44" y2="36" stroke="#C9B458" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="44" x2="36" y2="44" stroke="#C9B458" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default NoteLogo; 