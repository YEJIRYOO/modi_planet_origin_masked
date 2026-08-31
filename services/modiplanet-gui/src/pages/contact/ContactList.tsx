import ContactItem from './ContactItem';

import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import { ContactListModel } from '@services/client-model/contact';

interface ContactListProps {
  contactList: ContactListModel | null;
  isLoading: boolean;
  isError: any;
}

export default function ContactList({
  contactList,
  isError,
  isLoading,
}: ContactListProps) {
  const { t } = useTranslator();

  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] flex-center">
        <SpinnerLoader className="w-[100px] h-[100px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-30 font-bold text-center my-[50px] sm:text-20 sm:my-5">
        {t('NO_INQUIRY_HISTORY')}
      </div>
    );
  }

  return (
    <div className="min-w-[600px] pb-2 border-t border-[#37383b] min-h-[300px]">
      {contactList &&
        contactList.map((contact, index) => (
          <ContactItem key={index} index={index + 1} contact={contact} />
        ))}

      {contactList && contactList.length === 0 && (
        <div className="text-30 font-bold text-center my-[50px] sm:text-20 sm:my-5">
          {t('NO_INQUIRY_HISTORY')}
        </div>
      )}
    </div>
  );
}
