import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ContactContainer from './ContactContainer';
import { useFirebaseEvent } from '@components/provider/firebase-provider';
import { useUser } from '@services/api';
import { RoleTypeEnum } from '@src/services/client-model/user';

export function ContactPage() {
  const { viewInquiryPageLog } = useFirebaseEvent();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.roleType === RoleTypeEnum.GUEST) {
      navigate('/my-project', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    viewInquiryPageLog();
  }, []);

  if (user?.roleType === RoleTypeEnum.GUEST) {
    return null;
  }

  return <ContactContainer />;
}

export default ContactPage;
