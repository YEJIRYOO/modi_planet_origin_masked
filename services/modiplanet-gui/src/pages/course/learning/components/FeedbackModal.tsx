import React, { useState } from 'react';
import CModalTwoButton from '@components/ui/Modal/CModalTwoButton';
import { ModalBody, Select, SelectItem, Textarea } from '@nextui-org/react';
import InputUI from '@components/ui/Input/InputUI';
import useTranslator from '@hooks/useTranslator';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  lessonName: string;
  onSendFeedback: (feedback: {
    category: string;
    description: string;
  }) => void | Promise<void>;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  courseName,
  lessonName,
  onSendFeedback,
}: FeedbackModalProps) {
  const { t } = useTranslator();
  const [category, setCategory] = useState<string>('SERVICE_ERROR');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    setIsSubmitting(true);
    try {
      await onSendFeedback({ category, description });
      onClose();
      setCategory('SERVICE_ERROR');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { key: 'SERVICE_ERROR', label: t('SERVICE_ERROR') },
    { key: 'CONTENT_ERROR', label: t('CONTENT_ERROR') },
    { key: 'OTHER_OPINION', label: t('OTHER_FEEDBACK') },
  ];

  return (
    <CModalTwoButton
      isOpen={isOpen}
      onClose={onClose}
      title={t('SEND_FEEDBACK')}
      okLabel={t('SEND_FEEDBACK')}
      onClickOk={handleSend}
      cancelLabel={t('CANCEL')}
      onClickCancel={onClose}
      size="sm"
      innerLayout="left"
      isDisabledOk={isSubmitting || !description.trim()}
      isDisabledCancel={isSubmitting}
    >
      <ModalBody className="p-0 gap-0 mb-[40px]">
        <div className="flex flex-col mb-[20px]">
          <span className="p3-r text-font-sub mb-[10px]">{courseName}</span>
          <InputUI value={`${lessonName}`} readOnly isClearable={false} />
        </div>

        <Select
          items={categories}
          selectedKeys={[category]}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string;
            setCategory(val);
          }}
          disallowEmptySelection
          classNames={{
            trigger:
              'bg-white border border-[#DDDDDD] shadow-none w-[180px] h-[46px] mb-[12px]',
          }}
          aria-label="feedback-category"
        >
          {(cat) => (
            <SelectItem key={cat.key} value={cat.key}>
              {cat.label}
            </SelectItem>
          )}
        </Select>

        <Textarea
          placeholder={t('LESSON_FEEDBACK')}
          value={description}
          onValueChange={setDescription}
          minRows={8}
          classNames={{
            inputWrapper:
              'bg-white border border-[#DDDDDD] !shadow-none !ring-0 data-[hover=true]:bg-white group-data-[focus=true]:bg-white group-data-[focus-visible=true]:!ring-0 group-data-[focus-visible=true]:!ring-offset-0 py-[14px]',
            errorMessage: 'text-start',
          }}
        />
      </ModalBody>
    </CModalTwoButton>
  );
}
