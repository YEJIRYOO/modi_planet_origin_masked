import { Close } from '@src/lib/newAssets';

interface IThumbnailImage {
  url: string;
  isGridView: boolean;
  deleteImageUrl: () => void;
}

function ThumbnailImage({ url, isGridView, deleteImageUrl }: IThumbnailImage) {
  const onClickDelete = (e) => {
    e.stopPropagation();
    deleteImageUrl();
  };

  return (
    <div
      className={`w-[70px] h-[70px] relative flex-[0_0_auto] ${
        isGridView ? 'mr-[28px]' : ''
      }`}
    >
      <img
        className="object-cover rounded-16 w-[70px] h-[70px] border border-form-border bg-white"
        src={url}
        alt="imagess"
      />

      {isGridView && (
        <button
          onClick={onClickDelete}
          className="absolute -top-[7px] -right-[11px] w-[24px] h-[24px] rounded-full border flex-center bg-white"
        >
          <Close className="w-[15px] h-[15px] [&_path]:stroke-black" />
        </button>
      )}
    </div>
  );
}

export default ThumbnailImage;
