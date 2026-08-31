import { useRef } from 'react';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { ModalBody } from '@nextui-org/react';
import useTranslator from '@src/components/hooks/useTranslator';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  courseName?: string;
  certificateImage?: string;
  certificateDate?: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  userName = 'User Name',
  courseName = '과정명',
  certificateImage,
  certificateDate,
}: CertificateModalProps) {
  const { t } = useTranslator();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, {
          cacheBust: true,
          pixelRatio: 3,
          style: {
            boxShadow: 'none',
          },
        });
        saveAs(dataUrl, `${t('CERT')}_${courseName}.png`);
      } catch (err) {
        console.error('Failed to save image', err);
      }
    }
  };

  return (
    <CModalOneButton
      isOpen={isOpen}
      onClose={onClose}
      title={t('CONGRATS_MSG_COMPLETED')}
      okLabel={t('SAVE_IMAGE')}
      onClickOk={handleSaveImage}
      size="sm"
      innerLayout="left"
    >
      <ModalBody className="p-0 flex justify-center items-center py-[40px]">
        <div
          ref={certificateRef}
          className="relative w-[500px] h-[354px] bg-white flex-shrink-0"
          style={{
            backgroundImage: "url('/assets/course/curriculum/certificate.svg')",
            backgroundSize: '100% 100%',
            boxShadow: '0px 4px 12px 0px #28282840',
          }}
        >
          {/* User Name */}
          <div className="absolute top-[126px] left-[130px] right-[10px] flex flex-col items-center">
            <div className="relative inline-block mb-1">
              <span className="text-[40px] font-extrabold text-[#333333]">
                {userName}
              </span>
              <div className="absolute left-0 right-0 bottom-1 h-[1px] bg-[#FFB1A3]" />
            </div>
          </div>

          {/* 메세지 */}
          <div className="absolute top-[200px] left-[130px] right-[10px] text-center px-8">
            <p className="text-[12px] whitespace-pre-line">
              {t('CERT_MSG', { COURSENAME: courseName })}
            </p>
          </div>

          {/* 하단 정보 */}
          <div className="absolute bottom-[40px] left-[130px] right-[10px] text-center">
            <p className="text-[12px]">
              {certificateDate
                ? dayjs(certificateDate).format(t('DATE_FORMAT'))
                : ''}
            </p>
            <p className="text-[12px] font-bold">{t('LUXROBO_CEO')}</p>
          </div>
        </div>
      </ModalBody>
    </CModalOneButton>
  );
}
