import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';

import useTranslator from '@hooks/useTranslator';
import useLinkValidation from '@hooks/useLinkValidation';
import { useUser } from '@services/api';
import { useProjectCreateLimit } from './hooks/useProjectCreateLimit';
import {
  ProjectRunType,
  OrderDirectionType,
  ProjectConnectionOrder,
  ProjectConnectionField,
  ProjectCreateType,
  ProjectUpdateType,
} from '@services/gen/gen';
import { useProjectConnection } from '@services/api/project/useProjectConnection';
import { useDeleteProject } from '@src/services/api/project/useDeleteProject';
import { useUpdateProject } from '@src/services/api/project/useUpdateProject';
import { useCreateProject } from '@src/services/api/project/useCreateProject';
import { CustomPagination } from '@src/components/ui_old/pagination/pagination';
import { Error } from '@src/lib/newAssets';
import ActionTab from './ActionTab';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import ProjectUploader from './ActionTab/ProjectUploader';
import MaxLimitExceedModal from './MaxLimitExceedModal';
import { useDisclosure, Tooltip } from '@nextui-org/react';
import TooltipUI from '@src/components/ui/Tooltip/TooltipUI';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';

export function MyProjectContainer() {
  const { t } = useTranslator();
  const { onClickNewProject, onClickProject, warningModalProps } =
    useLinkValidation();
  const { user, loading: userLoading } = useUser();
  const { deleteProject } = useDeleteProject();
  const { updateProject } = useUpdateProject();
  const { createProject } = useCreateProject();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const {
    isOpen: isManyCreationsModalOpen,
    onOpen: onManyCreationsModalOpen,
    onClose: onManyCreationsModalClose,
  } = useDisclosure();

  const {
    isOpen: isMaxLimitModalOpen,
    onOpen: onMaxLimitModalOpen,
    onClose: onMaxLimitModalClose,
  } = useDisclosure();

  const { canCreate, recordCreate } = useProjectCreateLimit();

  const [pageNumber, setPageNumber] = useState<number>(0);
  const itemsPerPage = 100;
  const [selectedRunType, setSelectedRunType] = useState<ProjectRunType | null>(
    null,
  );
  const [searchText, setSearchText] = useState<string>('');
  const [displaySearchText, setDisplaySearchText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<ProjectConnectionOrder>({
    field: ProjectConnectionField.UpdatedAt,
    direction: OrderDirectionType.Desc,
  });

  const debouncedSetSearchText = useCallback(
    debounce((text: string) => {
      setSearchText(text);
    }, 1000),
    [],
  );

  const {
    projectList,
    totalCount,
    loading: dataLoading,
    refetch,
  } = useProjectConnection({
    runType: selectedRunType || undefined,
    filter: searchText || undefined,
    first: itemsPerPage,
    offset: pageNumber,
    orderBy: sortOrder,
    skip: !user?.id,
  });
  const [dataList, setDataList] = useState(projectList);

  useEffect(() => {
    if (projectList) {
      setDataList(projectList);
    }
  }, [projectList]);

  useEffect(() => {
    setPageNumber(0);
  }, [selectedRunType, searchText, sortOrder]);

  const handleRunTypeChange = (runType: ProjectRunType | null) => {
    setSelectedRunType(runType);
  };

  const handleSearchChange = (text: string) => {
    setDisplaySearchText(text);
    debouncedSetSearchText(text);
  };

  const handleSortOrderChange = (order: ProjectConnectionOrder) => {
    setSortOrder(order);
  };

  const handleRefetchWithReset = () => {
    setSelectedRunType(null);
    setSearchText('');
    setDisplaySearchText('');
    setSortOrder({
      field: ProjectConnectionField.UpdatedAt,
      direction: OrderDirectionType.Desc,
    });
    setPageNumber(0);
    refetch();
  };

  const filteredDataList = useMemo(() => {
    return dataList;
  }, [dataList]);

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject({
        id,
        onCompleted: () => {
          refetch();
        },
        onError: (error) => {
          console.error('Error deleting project:', error);
        },
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleRenameProject = async (id: string, title: string) => {
    try {
      await updateProject({
        id,
        title,
        updateType: ProjectUpdateType.Rename,
        onCompleted: () => {
          setDataList((prev) => {
            const value = prev.map((p) => {
              if (p?.id === id) {
                return {
                  ...p,
                  title: title,
                };
              }
              return p;
            });
            return value;
          });
        },
        onError: (error) => {
          console.error('Error updating project:', error);
        },
      });
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const onPageSelect = (page: number) => {
    setPageNumber(page - 1);
  };

  const onCreateClick = () => {
    onCreateModalOpen();
  };

  const handleCreateProject = async (
    projectType: ProjectRunType,
    projectName: string,
  ) => {
    if (!canCreate()) {
      onManyCreationsModalOpen();
      onCreateModalClose();
      return;
    }

    try {
      await createProject({
        title: projectName,
        runType: projectType,
        jsonData: '',
        createType: ProjectCreateType.Normal,
        onCompleted: (data) => {
          recordCreate();
          const projectId = data?.createProject?.id;
          if (projectId) {
            onClickNewProject(projectId, projectType);
          }
          refetch();
        },
        onError: (error) => {
          const errorCode = error?.graphQLErrors?.[0]?.extensions?.code;
          if (errorCode === 40012) {
            onMaxLimitModalOpen();
            onCreateModalClose();
          }
          console.error('Error creating project:', error);
        },
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (userLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img
          src="/assets/loading/spinner-loading.gif"
          alt="Loading..."
          className="w-16 h-16"
        />
      </div>
    );
  }

  const displayTotalCount = totalCount || 0;
  const isLoading = dataLoading;

  const isSearching = searchText && dataLoading;
  const hasNoSearchResults =
    searchText && filteredDataList.length === 0 && !dataLoading;

  const shouldShowNewProject =
    !isSearching && !hasNoSearchResults && !searchText && pageNumber === 0;

  return (
    <>
      <div className="sm:min-w-[350px] flex flex-col min-h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center mb-7">
          <div className="flex gap-2 items-center">
            <h1 className="h4-b">{t('MY_PROJECTS')}</h1>

            <TooltipUI
              showArrow={true}
              placement="top-start"
              crossOffset={-9}
              closeDelay={0}
              content={
                <div className="px-1 py-2">
                  <p className="p6-sb text-font-sub">
                    {t('MY_PROJECT_TOOLTIP1')}
                  </p>
                  <p className="p6-sb text-font-sub">
                    {t('MY_PROJECT_TOOLTIP2')}
                  </p>
                </div>
              }
            >
              <div className="w-[14px] h-[14px] relative group cursor-pointer">
                <img
                  src="/assets/mypage/info.svg"
                  alt="info"
                  className="w-[14px] h-[14px] absolute group-hover:hidden"
                />
                <img
                  src="/assets/mypage/info-active.svg"
                  alt="info active"
                  className="w-[14px] h-[14px] absolute hidden group-hover:block"
                />
              </div>
            </TooltipUI>
          </div>
          <ProjectUploader refetch={handleRefetchWithReset} />
        </div>

        <ActionTab
          selectedRunType={selectedRunType}
          searchText={displaySearchText}
          sortOrder={sortOrder}
          handleRunTypeChange={handleRunTypeChange}
          handleSearchChange={handleSearchChange}
          handleSortOrderChange={handleSortOrderChange}
        />

        <div
          className={`flex pt-[24px] sm:pt-[40px] rounded-[20px] flex-1 ${
            isSearching || isLoading || hasNoSearchResults
              ? 'items-center justify-center'
              : 'flex-wrap gap-x-[21.33px] sm:gap-x-[24px] gap-y-[40px] sm:gap-y-[24px] content-start'
          }`}
        >
          {isSearching || isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src="/assets/loading/spinner-loading.gif"
                alt="Loading..."
                className="w-16 h-16"
              />
            </div>
          ) : hasNoSearchResults ? (
            <div className="flex flex-col items-center justify-center">
              <Error />
              <div className="p3-b text-font-main mt-4">{t('NO_RESULT')}</div>
            </div>
          ) : (
            <>
              {shouldShowNewProject && (
                <div
                  className="flex flex-col w-[220px] sm:w-[163px] cursor-pointer group"
                  onClick={onCreateClick}
                >
                  <div className="w-full h-[224px] rounded-20 p-5 bg-white flex flex-col items-center justify-center border-1 border group-hover:border-brand group-active:bg-brand_3">
                    <div className="w-8 h-8 relative">
                      <img
                        src="/assets/mypage/plus.svg"
                        alt="add"
                        className="w-8 h-8 absolute group-hover:hidden"
                      />
                      <img
                        src="/assets/mypage/plus-active.svg"
                        alt="add active"
                        className="w-8 h-8 absolute hidden group-hover:block"
                      />
                    </div>
                    <div className="mt-3 w-full flex justify-center">
                      <div className="p5-sb text-font-main group-hover:text-brand">
                        {t('NEW_PROJECT')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {filteredDataList.length === 0 && !searchText ? (
                <></>
              ) : (
                filteredDataList.map(
                  (data) =>
                    data && (
                      <ProjectCard
                        key={data.id}
                        data={data}
                        deleteProject={handleDeleteProject}
                        renameProject={handleRenameProject}
                        refetch={refetch}
                        onClickProject={onClickProject}
                      />
                    ),
                )
              )}
            </>
          )}
        </div>

        {!isLoading && filteredDataList.length > 0 && (
          <div className="w-full flex justify-center pt-10 mt-auto">
            <CustomPagination
              activePage={pageNumber + 1}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={displayTotalCount}
              pageRangeDisplayed={5}
              onChange={onPageSelect}
            />
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        onConfirm={handleCreateProject}
      />

      {isManyCreationsModalOpen && (
        <CModalOneButton
          isOpen={isManyCreationsModalOpen}
          onClose={onManyCreationsModalClose}
          onClickOk={onManyCreationsModalClose}
        >
          <div className="whitespace-pre-wrap pt-1 pb-[60px]">
            {t('MANY_CREATIONS')}
          </div>
        </CModalOneButton>
      )}

      <MaxLimitExceedModal
        isOpen={isMaxLimitModalOpen}
        onClose={onMaxLimitModalClose}
      />
      <OnlyPCWarningModal {...warningModalProps} />
    </>
  );
}

export default MyProjectContainer;
