import ModiDataUploader from '@src/pages/training/components/training-select-section/modi-data/ActionCard/ModiDataUploader';
import ModiDataFilterSelector from './ModiDataFilterSelector';

interface ActionCardProps {
  refetch: () => void;
  selectedModule: string | null;
  selectedFunction: string | null;
  handleModuleChange: (key: string) => void;
  handleFunctionChange: (key: string) => void;
}

function ActionCard({
  refetch,
  selectedModule,
  selectedFunction,
  handleModuleChange,
  handleFunctionChange,
}: ActionCardProps) {
  return (
    <>
      <div className="flex justify-between min-w-[700px] mb-5">
        <ModiDataFilterSelector
          selectedModule={selectedModule}
          selectedFunction={selectedFunction}
          handleModuleChange={handleModuleChange}
          handleFunctionChange={handleFunctionChange}
        />

        <ModiDataUploader refetch={refetch} />
      </div>
    </>
  );
}

export default ActionCard;
