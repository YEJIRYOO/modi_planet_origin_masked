import { Divider } from '@nextui-org/react';
import { ProjectRunType, ProjectConnectionOrder } from '@services/gen/gen';
import ProjectFilterTabs from './ProjectFilterTabs';
import ProjectSearchInput from './ProjectSearchInput';
import ProjectSortSelector from './ProjectSortSelector';

interface ActionTabProps {
  selectedRunType: ProjectRunType | null;
  searchText: string;
  sortOrder: ProjectConnectionOrder;
  handleRunTypeChange: (runType: ProjectRunType | null) => void;
  handleSearchChange: (text: string) => void;
  handleSortOrderChange: (order: ProjectConnectionOrder) => void;
}

function ActionTab({
  selectedRunType,
  searchText,
  sortOrder,
  handleRunTypeChange,
  handleSearchChange,
  handleSortOrderChange,
}: ActionTabProps) {
  return (
    <div className="flex flex-col w-full">
      <ProjectFilterTabs
        selectedRunType={selectedRunType}
        onRunTypeChange={handleRunTypeChange}
      />
      <Divider className="my-5 sm:my-0" />
      <div className="flex justify-between items-center w-full mt-[2px] sm:mt-[20px]">
        <div className="flex-shrink-0">
          <ProjectSearchInput
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex-shrink-0">
          <ProjectSortSelector
            sortOrder={sortOrder}
            onChange={handleSortOrderChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ActionTab;
