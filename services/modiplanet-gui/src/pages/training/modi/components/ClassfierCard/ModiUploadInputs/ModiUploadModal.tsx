import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Upload } from '@src/lib/newAssets';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import DataCard from './DataCard';
import { useModiDataConnection } from '@src/services/api/modi/useModiDataConnection';
import { functionOptions } from '@src/lib/constants/select-options';
import { useFileUploader } from '../../../hooks/useFileUploader';
import useTranslator from '@hooks/useTranslator';
import { Error } from '@src/lib/newAssets';
import ModiDataFilterSelector from '@src/pages/training/components/training-select-section/modi-data/ActionCard/ModiDataFilterSelector';
import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import { CustomPagination } from '@src/components/ui_old/pagination/pagination';
import {
  OrderDirectionType,
  ModiDataConnectionOrderByFieldType,
} from '@services/gen/gen';
import { ModiRecordedData } from '@src/lib/types/modi-data';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface ModiUploadModalProps {
  onClose: () => void;
  addModiData?: (data: ModiRecordedData[]) => void;
  onFileChange?: (data: ModiRecordedData) => void;
  multiUpload?: boolean;
}

const ModiUploadModal = ({
  onClose,
  addModiData,
  onFileChange,
  multiUpload = false,
}: ModiUploadModalProps) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const itemsPerPage = 50;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { modiDataConnection, loading } = useModiDataConnection({
    first: 0,
    offset: 0,
    orderBy: {
      direction: OrderDirectionType.Desc,
      field: ModiDataConnectionOrderByFieldType.CreatedAt,
    },
    where: {
      functionType: null,
      moduleType: null,
    },
  });
  const [dataList, setDataList] = useState(modiDataConnection || []);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { t } = useTranslator();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const { handleFileChange } = useFileUploader({
    onInvalidFile: onInvalidFileModalOpen,
  });

  useEffect(() => {
    if (!loading && modiDataConnection) {
      setDataList(modiDataConnection);
    }
  }, [modiDataConnection, pageNumber]);

  useEffect(() => {
    setPageNumber(0);
    setSelectedIds([]);
  }, [selectedModule, selectedFunction]);

  const handleModuleChange = (key: string) => {
    setSelectedModule(key);
    if (key) {
      if (
        selectedFunction &&
        !functionOptions[key].some((func) => func.value === selectedFunction)
      ) {
        setSelectedFunction(null);
      }
    } else {
      setSelectedFunction(null);
    }
  };

  const handleFunctionChange = (key: string) => {
    setSelectedFunction(key);
    if (key) {
      const moduleType = Object.keys(functionOptions).find((module) =>
        functionOptions[module].some((func) => func.value === key),
      );
      setSelectedModule(moduleType || null);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (addModiData) {
      handleFileChange(event, addModiData, onClose);
    } else if (onFileChange) {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsedData = JSON.parse(reader.result as string);
            onFileChange(parsedData);
            onClose();
          } catch (error) {
            console.error('파일 처리 에러:', error);
          }
        };
        reader.readAsText(file);
      }
    }
  };

  const addChartData = () => {
    const list = selectedIds
      .map((id) => {
        const data = dataList.find((item) => item.id === id);
        return data ? data.data : null;
      })
      .filter((data): data is ModiRecordedData => data !== null);

    if (addModiData) {
      addModiData(list);
    }

    if (onFileChange && selectedIds.length > 0) {
      const selectedData = dataList.find(
        (item) => item.id === selectedIds[selectedIds.length - 1],
      )?.data;
      if (selectedData) {
        onFileChange(selectedData);
        onClose();
        return;
      }
    }

    onClose();
  };

  const filteredDataList = useMemo(() => {
    if (selectedModule && selectedFunction) {
      return dataList.filter(
        (data) =>
          data.moduleType === selectedModule &&
          data.functionType === selectedFunction,
      );
    } else if (selectedModule) {
      return dataList.filter((data) => data.moduleType === selectedModule);
    } else if (selectedFunction) {
      return dataList.filter((data) => data.functionType === selectedFunction);
    } else {
      return dataList;
    }
  }, [selectedModule, selectedFunction, dataList]);

  const pagedDataList = useMemo(() => {
    const startIndex = pageNumber * itemsPerPage;
    return filteredDataList.slice(startIndex, startIndex + itemsPerPage);
  }, [pageNumber, filteredDataList]);

  const onSelect = (id: string) => {
    let newSelectedIds;

    if (multiUpload) {
      if (selectedIds.includes(id)) {
        newSelectedIds = selectedIds.filter((e) => e !== id);
      } else {
        newSelectedIds = [...selectedIds, id];
      }
    } else {
      if (selectedIds.includes(id)) {
        newSelectedIds = [];
      } else {
        newSelectedIds = [id];
      }
    }

    setSelectedIds(newSelectedIds);
  };

  const allSelected =
    selectedIds.length > 0 && selectedIds.length === filteredDataList.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredDataList.map((data) => data.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <>
      <CModalOneButton
        isOpen={true}
        onClose={onClose}
        onClickOk={addChartData}
        okLabel={t('ADD')}
        size="lg"
        buttonWidth="md"
        innerLayout="left"
        isDismissable={false}
        isDisabled={selectedIds.length === 0}
      >
        <div className="w-[976px]">
          <div className="h5-b mt-[28px]">{t('LOAD_MODI_DATA')}</div>
          <div className="mt-[20px] mb-5">
            <div className="flex justify-between mb-5">
              <div className="flex space-x-4">
                <ModiDataFilterSelector
                  selectedModule={selectedModule}
                  selectedFunction={selectedFunction}
                  handleModuleChange={handleModuleChange}
                  handleFunctionChange={handleFunctionChange}
                />
              </div>

              <ButtonUI
                color="secondary"
                onClick={handleUploadClick}
                className="w-[109px] p-0 flex items-center justify-center"
              >
                <Upload className="w-[20px] h-[20px] [&_path]:stroke-white" />
                <p className="p5-sb">{t('UPLOADING')}</p>
              </ButtonUI>
            </div>
            <div className="h-[399px] bg-form-form rounded-[10px] overflow-y-auto p-[16px]">
              <div className="w-full flex">
                {multiUpload && filteredDataList.length > 0 && (
                  <div>
                    <CheckboxUI
                      isSelected={allSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    >
                      <p className="p6-r text-font-sub_1 text-nowrap">
                        {t('SELECT_ALL')}
                      </p>
                    </CheckboxUI>
                  </div>
                )}

                <div className="w-full flex justify-end p5-r mb-[14px]">
                  {filteredDataList.length} / 100
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center h-[230px]"></div>
              ) : filteredDataList.length > 0 ? (
                <div className="flex justify-center">
                  <div className="grid grid-cols-4 gap-[16px] w-full">
                    {pagedDataList.map((data) => (
                      <DataCard
                        key={data.id}
                        data={data}
                        onSelect={() => onSelect(data.id)}
                        isSelected={selectedIds.includes(data.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[230px]">
                  <Error className="mb-[12px]" />
                  <p className="p5-r text-font-sub_1">{t('NO_DATA')}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mb-4 z-[10]">
            <CustomPagination
              activePage={pageNumber + 1}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={Math.max(filteredDataList.length, 1)}
              pageRangeDisplayed={2}
              onChange={(page) => setPageNumber(page - 1)}
            />
          </div>
        </div>
      </CModalOneButton>
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".modi"
        multiple={multiUpload}
      />
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </>
  );
};

export default ModiUploadModal;
