import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

const HANDLE_COLOR = 'rgba(255, 69, 71, 1)';

const createTriangle = (isTop: boolean): HTMLElement => {
  const triangle = document.createElement('div');
  triangle.style.position = 'absolute';
  triangle.style.width = '12px';
  triangle.style.height = '12px';
  triangle.style.backgroundColor = HANDLE_COLOR;
  triangle.style.left = '-5px';
  triangle.style.pointerEvents = 'none';

  if (isTop) {
    triangle.style.top = '-3px';
    triangle.style.clipPath = 'polygon(0% 0%, 100% 0%, 50% 100%)';
  } else {
    triangle.style.bottom = '-3px';
    triangle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
  }

  return triangle;
};

const applyHandleStyle = (regionElement: HTMLElement) => {
  const handles = regionElement.querySelectorAll('[part*="region-handle"]');
  handles.forEach((handle: Element) => {
    const el = handle as HTMLElement;
    el.style.width = '2px';
    el.style.border = 'none';
    el.style.borderLeft = 'none';
    el.style.borderRight = 'none';
    el.style.backgroundColor = HANDLE_COLOR;
    el.style.borderRadius = '0';
    el.style.overflow = 'visible';

    el.appendChild(createTriangle(true));
    el.appendChild(createTriangle(false));
  });
};

export const createRegion = (wavesurferInstance, setUpdatedRegion) => {
  const wsRegions = wavesurferInstance.registerPlugin(RegionsPlugin.create());

  wavesurferInstance.on('decode', () => {
    wsRegions.addRegion({
      start: 0,
      end: wavesurferInstance.getDuration(),
      color: 'rgb(255,177,163,0.1)',
      id: 'area',
      drag: true,
      resize: true,
    });
  });

  wsRegions.on('region-created', (region) => {
    setUpdatedRegion(region);

    if (region.element) {
      applyHandleStyle(region.element);
    }
  });

  wsRegions.on('region-updated', (region) => {
    setUpdatedRegion(region);
  });
};
