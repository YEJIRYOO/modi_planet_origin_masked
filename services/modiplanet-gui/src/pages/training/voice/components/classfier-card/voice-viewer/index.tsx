import { Fragment, useState } from 'react';
import ThumbnailVoice from '@src/pages/training/voice/components/classfier-card/voice-viewer/thumbnail-voice';
import { useWaveSurferStore } from '@src/store/zustand/ai/useWavesurferStore';

function VoiceViewer({
  classifierId,
  uploadWay,
  isGridView,
  dataset,
  deleteVoiceUrl,
  updateEditVoiceUrl,
  editableVoiceUrl,
}) {
  const [durations, setDurations] = useState<{ [key: string]: string }>({});
  const { play, stop } = useWaveSurferStore();

  const handleDeleteVoiceUrl = (itemIndex: number) => () =>
    deleteVoiceUrl(itemIndex);

  const handlePlayClick = (classifierId: string, thumbnailId: string) => {
    play(classifierId, thumbnailId);
  };

  const handleStopClick = (thumbnailId: string) => {
    stop(thumbnailId);
  };

  const handleDurationChange = (url: string) => (duration: string) => {
    setDurations((prev) => ({ ...prev, [url]: duration }));
  };

  const handleContainerClick = (url: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (uploadWay === 'file') {
      updateEditVoiceUrl(url);
    } else {
      updateEditVoiceUrl('');
    }
  };

  return (
    <Fragment>
      <div
        className={`overflow-auto custom-grey-scroll ${
          isGridView
            ? `grid grid-cols-2 gap-y-[23px] gap-x-[16px] auto-rows-min pt-[10px] pr-[20px] mr-[-25px] relative ${
                uploadWay === 'file'
                  ? 'top-[-50px] h-[calc(100%+50px)]'
                  : 'top-[-94px] h-[calc(100%+94px)]'
              }`
            : 'flex gap-[16px] flex-nowrap pb-[15px] -mb-[15px] overflow-y-hidden'
        }`}
      >
        {dataset.map((url: string, index: number) => (
          <div key={url} className="relative group w-[70px] h-[70px]">
            <ThumbnailVoice
              classifierId={classifierId}
              url={url}
              isGridView={isGridView}
              deleteVoiceUrl={handleDeleteVoiceUrl(index)}
              durations={durations}
              onDurationChange={handleDurationChange(url)}
              handleContainerClick={handleContainerClick}
              editableVoiceUrl={editableVoiceUrl}
              handleStopClick={handleStopClick}
              handlePlayClick={handlePlayClick}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default VoiceViewer;
