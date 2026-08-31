const ClearIcon = ({ isVisible, color = 'currentColor' }) => (
  <span
    role="button"
    data-slot="clear-button"
    className={`appearance-none select-none cursor-pointer rounded-full outline-none transition-opacity motion-reduce:transition-none ${
      isVisible ? 'opacity-70' : 'hidden opacity-0'
    } hover:opacity-100 active:opacity-70 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 text-large`}
  >
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path
        d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
        fill={color}
      ></path>
    </svg>
  </span>
);

export default ClearIcon;
