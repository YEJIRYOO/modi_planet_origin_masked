import { ChangeEvent, Fragment, useRef } from 'react';
import classNames from 'classnames';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import Label from '@components/ui_old/form/label';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectItem, Textarea } from '@nextui-org/react';
import { getOptionsInquiryCategory } from '@lib/constants/select-options';
import { ErrorMessage } from '@hookform/error-message';
import {
  MAX_FILE_SIZE_INQUIRY_ATTACHMENT,
  MAX_LENGTH_INQUIRY_CONTENT,
  MAX_LENGTH_INQUIRY_TITLE,
  VALID_EXTENSION_INQUIRY_ATTACHMENT,
} from '@lib/constants/etc';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import { validateFileSize } from '@lib/utils/utils';
import { FileInput, UserContactType } from '@services/old/generated/graphql';
import ButtonUI from '@components/ui/Button/ButtonUI';
import InputUI from '@components/ui/Input/InputUI';
import FixedHeightButtonUI from '@src/components/ui/Button/FixedHeightButtonUI';

interface ContactFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  fileName?: string;
  onUploadFiles: (files: File[] | FileList) => Promise<undefined | any[]>;
}
export type ContactFormType = {
  name: string;
  description: string;
  type: UserContactType | null;
  files: Array<FileInput>;
};
export default function ContactForm({
  onSubmit,
  isLoading,
  onUploadFiles,
  fileName,
}: ContactFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({
    defaultValues: {
      type: null,
      name: '',
      description: '',
      files: [],
    },
  });
  const { t } = useTranslator();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const onChangeFiles = async (
    event: ChangeEvent<HTMLInputElement>,
    callback: any,
  ) => {
    try {
      const {
        target: { files },
      } = event;

      if (!files) return;
      validateFileSize(files, MAX_FILE_SIZE_INQUIRY_ATTACHMENT);

      const result = await onUploadFiles(files);

      callback(result);
    } catch (err) {
      window.alert(err);
    }
  };

  const onClickAttach = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };
  return (
    <>
      <Fragment>
        <div className="mb-[30px]">
          <h1 className="font-bold text-30 mb-7 sm:text-26">
            {t('INQUIRY_REGISTER')}
          </h1>
        </div>
        <form
          className={classNames(
            'mb-[50px] p-10 rounded-30 bg-white',
            'sm:p-[30px_20px] sm:mb-[30px] sm:rounded-10',
          )}
        >
          {/* 분류 */}
          <InputWrapper className="mb-5 sm:flex-col">
            <Label
              isRequired
              htmlFor="type"
              className="p3-r w-[158px] sm:w-full mt-3"
            >
              {t('CATEGORIES')}
            </Label>
            <div className="select-wrapper w-[200px] sm:w-full">
              <Controller
                name="type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    id="type"
                    placeholder={t('CATEGORIES_SELECT')}
                    selectedKeys={field.value ? [String(field.value)] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0];
                      field.onChange(value);
                    }}
                    classNames={{
                      trigger:
                        'bg-white border border-[#DDDDDD] !shadow-none !ring-0 h-[46px] data-[hover=true]:bg-white',
                    }}
                    aria-label="type"
                  >
                    {getOptionsInquiryCategory().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ message }) => (
                  <p className="text-tiny text-danger text-start pt-[2px]">
                    {t('PLEASE_FILL_REQUIRED')}
                  </p>
                )}
              />
            </div>
          </InputWrapper>
          <InputWrapper className="mb-5 sm:flex-col">
            <Label
              isRequired
              htmlFor="name"
              className="w-[158px] sm:w-full pt-3"
            >
              {t('TITLE')}
            </Label>
            <div className="flex-1 sm:w-full">
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputUI
                    {...field}
                    id="name"
                    maxLength={MAX_LENGTH_INQUIRY_TITLE}
                    placeholder={t('TITLE')}
                    errorMessage={errors.name && t('PLEASE_FILL_REQUIRED')}
                    onClear={() => field.onChange('')}
                    autoComplete="off"
                  />
                )}
              />
            </div>
          </InputWrapper>
          <InputWrapper className="mb-5 sm:flex-col">
            <Label
              isRequired
              htmlFor="description"
              className="w-[158px] sm:w-full pt-3"
            >
              {t('CONTENTS')}
            </Label>
            <div className="flex-1 sm:w-full">
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    maxLength={MAX_LENGTH_INQUIRY_CONTENT}
                    placeholder={t('ENTER_CONTENTS')}
                    minRows={8}
                    errorMessage={
                      errors.description && t('PLEASE_FILL_REQUIRED')
                    }
                    classNames={{
                      inputWrapper:
                        'bg-white border border-[#DDDDDD] !shadow-none !ring-0 data-[hover=true]:bg-white group-data-[focus=true]:bg-white group-data-[focus-visible=true]:!ring-0 group-data-[focus-visible=true]:!ring-offset-0 py-3 sm:py-5',
                      errorMessage: 'text-start',
                    }}
                  />
                )}
              />
            </div>
          </InputWrapper>
          {/* 파일첨부 */}
          <InputWrapper className="mb-5 flex items-center sm:flex-col sm:items-start">
            <Label className="w-[158px] sm:w-full">
              {t('FILE_ATTACHMENT')}
            </Label>
            <div className="flex gap-2 sm:w-full">
              <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <Fragment>
                    <InputUI
                      readOnly
                      className="w-[380px] mr-2 sm:w-full sm:mr-0"
                      placeholder={t('ATTACH_PLEASE')}
                      value={fileName}
                    />

                    <input
                      {...field}
                      ref={inputRef}
                      id="file"
                      type="file"
                      className="hidden"
                      accept={VALID_EXTENSION_INQUIRY_ATTACHMENT}
                      value={undefined}
                      onChange={(event) => {
                        onChangeFiles(event, field.onChange);
                      }}
                    />
                    <FixedHeightButtonUI
                      color="secondary"
                      onPress={onClickAttach}
                    >
                      {t('ATTACHMENT')}
                    </FixedHeightButtonUI>
                  </Fragment>
                )}
              />
            </div>
          </InputWrapper>
          <p className="p5-r ml-[158px] text-font-sub sm:ml-0 sm:mb-10">
            <span className="block mb-2">{t('ATTACHMENT_CONDITION1')}</span>
            <span className="block">{t('ATTACHMENT_CONDITION2')}</span>
          </p>
        </form>

        <div className="text-center flex justify-center">
          <ButtonUI
            size="lg"
            className="px-[48.5px] sm:w-full"
            isDisabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <SpinnerLoader className="h-[50px]" />
            ) : (
              t('INQUIRY_REGISTER')
            )}
          </ButtonUI>
        </div>
      </Fragment>
    </>
  );
}
