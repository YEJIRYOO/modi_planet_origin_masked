interface FullscreenToggleProps {
  isFullscreen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function FullscreenToggle({
  isFullscreen,
  onToggle,
  className,
}: FullscreenToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`hover:opacity-80 transition-opacity ${className ?? ''}`}
    >
      <img
        src={
          isFullscreen
            ? '/assets/course/curriculum/minscreen.svg'
            : '/assets/course/curriculum/fullscreen.svg'
        }
        alt="Fullscreen"
      />
    </button>
  );
}
