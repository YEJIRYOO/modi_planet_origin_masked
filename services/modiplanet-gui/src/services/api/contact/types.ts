import { ContactConnectionQuery } from '@services/gen/gen';

export type ContactList = ContactConnectionQuery['contactConnection']['nodes'];
