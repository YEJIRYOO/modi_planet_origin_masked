import React, { useEffect, useRef, useState } from 'react';

interface CameraSelectionPopoverProps {
  children: React.ReactNode;
  cameraInfos: MediaDeviceInfo[];
  activeCameraId: string;
  onSelectCamera: (deviceId: string) => void | Promise<void>;
}

function CameraSelectionPopover({
  children,
  cameraInfos,
  activeCameraId,
  onSelectCamera,
}: CameraSelectionPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (cameraInfos.length === 0) {
      setIsOpen(false);
    }
  }, [cameraInfos.length]);

  const toggleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (cameraInfos.length === 0) return;

    setIsOpen((prev) => !prev);
  };

  const handleSelectCamera = async (
    event: React.MouseEvent<HTMLButtonElement>,
    deviceId: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await onSelectCamera(deviceId);
    setIsOpen(false);
  };

  const CameraMenuList = () => (
    <ul className="w-[220px] max-w-[calc(100vw-32px)] max-h-[220px] overflow-y-auto rounded-[12px] bg-white shadow-lg py-[8px] px-[8px]">
      {cameraInfos.map(({ label, deviceId }, index) => {
        const isActive = activeCameraId === deviceId;
        return (
          <li key={deviceId}>
            <button
              type="button"
              title={label || `Camera ${index + 1}`}
              onClick={(event) => {
                handleSelectCamera(event, deviceId).catch((error) => {
                  console.error('@@select camera popover err', error);
                });
              }}
              className={`w-full min-h-[40px] p-[10px_12px] rounded-[8px] flex items-center text-left duration-200 cursor-pointer ${
                isActive ? 'bg-form-form text-font-sub' : 'text-font-sub'
              }`}
            >
              <span className="truncate">{label || `Camera ${index + 1}`}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div ref={popoverRef} className="relative inline-flex">
      <div role="button" className="inline-flex" onClick={toggleOpen}>
        {children}
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-50">
          <CameraMenuList />
        </div>
      )}
    </div>
  );
}

export default CameraSelectionPopover;
