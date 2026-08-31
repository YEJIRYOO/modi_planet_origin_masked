import { useNavigate } from 'react-router-dom';

import ContactList from './ContactList';

import useTranslator from '@hooks/useTranslator';
import { useContactConnection } from '@services/api';
import ButtonUI from '@components/ui/Button/ButtonUI';

export function ContactContainer() {
  const navigate = useNavigate();
  const { t } = useTranslator();

  const { contactList, error, loading } = useContactConnection({
    first: 100,
    offset: 0,
  });

  const onCreateClick = () => {
    navigate('/contact/create');
  };

  return (
    <>
      <div className="mb-[30px]">
        <h1 className="mb-7 h4-b">{t('INQUIRY_HISTORY')}</h1>
      </div>
      <div>
        <div className="overflow-x-auto mb-8 custom-scroll sm:mb-[30px]">
          <ContactList
            contactList={contactList}
            isLoading={loading}
            isError={error}
          />
        </div>
        <div className="flex-center sm:w-full">
          <ButtonUI
            size="lg"
            className="px-[48.5px] sm:w-full"
            onClick={onCreateClick}
          >
            {t('INQUIRY_REGISTER')}
          </ButtonUI>
        </div>
      </div>
    </>
  );
}

export default ContactContainer;
