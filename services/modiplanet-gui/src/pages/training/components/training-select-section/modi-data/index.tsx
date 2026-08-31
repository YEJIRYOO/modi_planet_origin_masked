import React, { useState, useEffect, useMemo } from 'react';
import { useModiDataConnection } from '@src/services/api/modi/useModiDataConnection';
import ActionCard from './ActionCard';
import DataCard from './data-card';
import { useCreateModidata } from '@src/services/api/modi/useCreateModiData';
import { useCreateModidataList } from '@src/services/api/modi/useCreateModiDataList';
import { useDeleteModidataList } from '@src/services/api/modi/useDeleteModiDataList';
import { Error, File } from '@src/lib/newAssets';
import {
  MODI_DATA_RECORD_SEND,
  MODI_DATA_RECORD_REQUEST,
  MODI_DATA_RECORD_CANCEL,
} from '@src/lib/constants/etc';
import { functionOptions } from '@src/lib/constants/select-options';
import useTranslator from '@src/components/hooks/useTranslator';
import { Errorhandler } from '@src/lib/utils/error';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import PostMessageReceiver from '@src/lib/utils/PostMessageReceiver';
import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import CModalTwoButton from '@src/components/ui/Modal/CModalTwoButton';
import { useDisclosure } from '@nextui-org/react';
import { CustomPagination } from '@src/components/ui_old/pagination/pagination';
import { downloadZipFromContent } from './downloadZip';
import { getUniqueFileName, renameUtil } from './fileNamingUtils';
import { LocaleHandler } from '@src/lib/utils/locale';
import {
  ModiData as ModiDataType,
  ModiRecordedData,
} from '@src/lib/types/modi-data';
import {
  OrderDirectionType,
  ModiDataConnectionOrderByFieldType,
} from '@services/gen/gen';

function ModiData({ setIsDimmed }) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const itemsPerPage = 50;
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const {
    modiDataConnection,
    loading: dataLoading,
    refetch,
  } = useModiDataConnection({
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
  const {
    isOpen: isDeleteSelectedModalOpen,
    onOpen: onDeleteSelectedModalOpen,
    onClose: onDeleteSelectedModalClose,
  } = useDisclosure();
  const [dataList, setDataList] = useState<ModiDataType[]>(
    modiDataConnection || [],
  );
  const [dragActive, setDragActive] = useState(false);
  const { createModiData } = useCreateModidata();
  const { createModiDataList } = useCreateModidataList();
  const { deleteModiDataList } = useDeleteModidataList();
  const { t, i18n } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();
  const postMessageReceiver = PostMessageReceiver.getInstance();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const locale = LocaleHandler.getLocale(i18n.language);

  useEffect(() => {
    if (modiDataConnection) {
      setDataList(modiDataConnection);
    }
  }, [modiDataConnection, pageNumber]);

  useEffect(() => {
    setPageNumber(0);
    setSelectedIds([]);
  }, [selectedModule, selectedFunction]);

  useEffect(() => {
    const handleModiDataRecordRequest = () => {
      if (dataList.length < 100) {
        postMessageSender.sendModiDataRecordResponse({ isRecording: true });
        setIsDimmed(true);
      } else {
        postMessageSender.sendModiDataRecordResponse({
          isRecording: false,
          alertMessage: 'MAX_MODI_DATA_COUNT',
        });
      }
    };

    const handleModiDataRecordSend = async (data: ModiRecordedData) => {
      try {
        const jsonData = {
          data: JSON.stringify(data),
          functionType: data.function,
          moduleType: data.name,
        };

        const newName = getUniqueFileName(data.function, locale, fileNameList);

        await createModiData({
          data: jsonData.data,
          functionType: jsonData.functionType,
          moduleType: jsonData.moduleType,
          name: newName,
          onCompleted: (data) => {
            console.log('Mutation 완료:', data);
            setTimeout(() => {
              refetch();
            }, 50);
          },
        });
      } catch (error) {
        console.error('Error creating Modi data:', error);
      }
    };

    const handleModiDataRecordCancel = () => {
      postMessageSender.sendModiDataRecordResponse({ isRecording: false });
      setIsDimmed(false);
    };

    postMessageReceiver.on(
      MODI_DATA_RECORD_REQUEST,
      handleModiDataRecordRequest,
    );
    postMessageReceiver.on(MODI_DATA_RECORD_SEND, handleModiDataRecordSend);
    postMessageReceiver.on(MODI_DATA_RECORD_CANCEL, handleModiDataRecordCancel);

    return () => {
      postMessageReceiver.off(
        MODI_DATA_RECORD_REQUEST,
        handleModiDataRecordRequest,
      );
      postMessageReceiver.off(MODI_DATA_RECORD_SEND, handleModiDataRecordSend);
      postMessageReceiver.off(
        MODI_DATA_RECORD_CANCEL,
        handleModiDataRecordCancel,
      );
    };
  }, [dataList, createModiData, refetch]);

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

  const fileNameList = dataList.map((item) => item.name).sort();
  const existingNames = dataList.map((item) => item.name);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files) {
      await processFiles(Array.from(files));
      setTimeout(refetch, 100);
    }
  };

  const processFiles = async (files: File[]) => {
    const dataList = await Promise.all(
      files.map(async (file) => {
        const fileContent = await file.text();
        const jsonData = JSON.parse(fileContent);
        const { name: moduleType, function: functionType } = jsonData;
        let fileName = file.name.replace(/\.modi$/, '');

        return {
          data: fileContent,
          functionType,
          moduleType,
          name: fileName,
        };
      }),
    );

    await createModiDataList({
      dataList,
      onCompleted: (data) => {
        console.log('Mutation 완료:', data);
      },
      onError: (error) => {
        const err = new Errorhandler(error);
        err.getCodes().forEach((e) => {
          if (e === 2000) {
            postMessageSender.sendModiDataRecordResponse({
              alertMessage: 'MAX_MODI_DATA_COUNT',
            });
          }
        });
        console.error('Mutation 에러:', error);
      },
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDragEnd = () => {
    setDragActive(false);
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

  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(filteredDataList.length / itemsPerPage) - 1,
    );
    if (pageNumber > maxPage) {
      setPageNumber(maxPage);
    }
  }, [filteredDataList.length, itemsPerPage]);

  const deleteModiData = () => {
    setTimeout(() => {
      refetch();
    }, 50);
  };

  const renameModiData = (id: string, name: string) => {
    setDataList((prev) => {
      const value = prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            name: name,
          };
        }
        return p;
      });
      return value;
    });
  };

  const onPageSelect = (page: number) => {
    setPageNumber(page - 1);
  };

  const onSelect = (id: string) => {
    let newSelectedIds;
    if (selectedIds.includes(id)) {
      newSelectedIds = selectedIds.filter((e) => e !== id);
    } else {
      newSelectedIds = [...selectedIds, id];
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

  const handleDeleteSelectedConfirm = async () => {
    try {
      await deleteModiDataList({
        ids: selectedIds,
        onCompleted: () => {
          deleteModiData();
        },
        onError: (error) => {
          console.error(`Error deleting Modi data`, error);
        },
      });

      setSelectedIds([]);
      setTimeout(() => {
        refetch();
      }, 50);
      onDeleteSelectedModalClose();
    } catch (error) {
      console.error('Error deleting selected Modi data:', error);
    }
  };

  const handleDownloadSelected = () => {
    const filesToDownload: { name: string; content: string }[] = [];

    selectedIds.forEach((id) => {
      const selectedData = dataList.find((data) => data.id === id);
      if (selectedData) {
        let uniqueName = selectedData.name;
        while (filesToDownload.some((file) => file.name === uniqueName)) {
          uniqueName = renameUtil(uniqueName);
        }
        const json = JSON.stringify(selectedData.data);
        filesToDownload.push({ name: uniqueName, content: json });
      }
    });

    const finalFilesToDownload = filesToDownload.map((file) => ({
      name: `${file.name}.modi`,
      content: file.content,
    }));

    downloadZipFromContent(finalFilesToDownload, 'modi_data.zip');
  };

  return (
    <div className="flex flex-col h-[calc(100%-104px)]">
      <ActionCard
        refetch={refetch}
        selectedModule={selectedModule}
        selectedFunction={selectedFunction}
        handleModuleChange={handleModuleChange}
        handleFunctionChange={handleFunctionChange}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
        className={`flex flex-1 flex-col bg-form-form px-[24px] pt-[24px] rounded-[20px] overflow-hidden ${
          dragActive ? 'border-dashed border-4 border-form-gray' : ''
        }`}
      >
        {dataLoading ? (
          <div className="flex-1 flex items-center justify-center"></div>
        ) : dragActive ? (
          <div className="flex-1 flex items-center justify-center">
            <File />
          </div>
        ) : filteredDataList.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Error />
            <div className="p3-b text-font-main mt-4 mb-[24px]">
              {t('NO_DATA')}
            </div>
            <div className="p5-r">{t('PRESS_RECORD_DESC')}</div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-[16px] flex-shrink-0">
              <div className="flex items-center">
                <CheckboxUI
                  className="mr-[24px]"
                  isSelected={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                >
                  <p className="p5-r">{t('SELECT_ALL')}</p>
                </CheckboxUI>
                <ButtonUI
                  size="sm"
                  color="default"
                  onClick={onDeleteSelectedModalOpen}
                  disabled={selectedIds.length === 0}
                  isDisabled={selectedIds.length === 0}
                  className="mr-[16px]"
                >
                  {t('DELETE_SELECTION')}
                </ButtonUI>
                <ButtonUI
                  size="sm"
                  color="default"
                  onClick={handleDownloadSelected}
                  disabled={selectedIds.length === 0}
                  isDisabled={selectedIds.length === 0}
                >
                  {t('DOWNLOAD_SELECTION')}
                </ButtonUI>
              </div>
              <div className="p5-r">{filteredDataList.length} / 100</div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="flex flex-wrap gap-[16px] pb-[16px]">
                {pagedDataList.map((data, index) => (
                  <DataCard
                    key={data.id}
                    data={data}
                    deleteModiData={deleteModiData}
                    renameModiData={renameModiData}
                    onSelect={() => onSelect(data.id)}
                    isSelected={selectedIds.includes(data.id)}
                    existingNames={existingNames}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-[13px] pb-6 flex-shrink-0">
              <CustomPagination
                activePage={pageNumber + 1}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={filteredDataList.length}
                pageRangeDisplayed={2}
                onChange={onPageSelect}
              />
            </div>
          </>
        )}
      </div>

      <CModalTwoButton
        isOpen={isDeleteSelectedModalOpen}
        hideCloseButton
        onClickCancel={onDeleteSelectedModalClose}
        onClickOk={handleDeleteSelectedConfirm}
        okLabel={t('YES')}
        cancelLabel={t('NO')}
      >
        <div className="mb-[60px] p3-m">{t('DELETE_SELECTION_GUIDE')}</div>
      </CModalTwoButton>
    </div>
  );
}

export default ModiData;
