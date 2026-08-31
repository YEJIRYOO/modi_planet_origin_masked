import { Plus } from '@src/lib/newAssets';
import useTranslator from '@hooks/useTranslator';

interface ICreateMyModelCard {
  onClick?: () => void;
}

function CreateMyModelCard({ onClick = () => {} }: ICreateMyModelCard) {
  const { t } = useTranslator();
  return (
    <div
      role="button"
      onClick={onClick}
      className="group w-[290px] h-[330px] bg-brand_4 border border-brand rounded-20 duration-100 flex-center active:bg-brand"
    >
      <div className="flex-center flex-col">
        <Plus className="mb-[26px] w-[56px] h-[56px] [&_path]:fill-brand duration-100 group-active:[&_path]:fill-white" />
        <p className="p2-b text-brand group-active:text-white">
          {t('NEW_MODEL')}
        </p>
      </div>
    </div>
  );
}

export default CreateMyModelCard;
