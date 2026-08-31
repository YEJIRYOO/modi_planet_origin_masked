import { AiModelCategoryType } from '@services/old/generated/graphql';
import useTranslator from '@hooks/useTranslator';

interface IModelCategoryCard {
  thumbnail: string;
  modelType: AiModelCategoryType;
  onClick: () => void;
  isActive: boolean;
  isPreParing: boolean;
  title: string;
  desc: string;
}

function ModelCategoryCard({
  thumbnail,
  onClick,
  isActive,
  modelType,
  isPreParing,
  desc,
  title,
}: IModelCategoryCard) {
  const handleClick = () => {
    if (isPreParing) return;
    onClick();
  };
  const { t } = useTranslator();

  return (
    <div
      role={isPreParing ? '' : 'button'}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-20 border p-[15px] w-[350px] h-[305px] duration-200 ${
        isActive ? 'bg-brand text-white border-brand' : 'bg-white'
      }`}
    >
      <div className="rounded-10 border flex-center bg-[#EBF3FB] w-[320px] h-[184px] mb-[20px]">
        <img src={thumbnail} alt={modelType} />
      </div>
      <h3 className="p3-b mb-[15px]">{title}</h3>
      <p
        className={`p6-r min-h-[34px] ${
          isActive ? 'text-white' : 'text-font-sub_1'
        }`}
      >
        {desc}
      </p>

      {isPreParing && (
        <div className="absolute inset-0 bg-black/50 flex-center p1-b text-white">
          {t('PREPARING')}
        </div>
      )}
    </div>
  );
}

export default ModelCategoryCard;
