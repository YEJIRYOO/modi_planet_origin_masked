import { ProjectConnectionQuery } from '@services/gen/gen';

export type ProjectList = ProjectConnectionQuery['projectConnection']['nodes'];
