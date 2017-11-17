import { createRoutine } from 'utils';
import * as schemas from './schemas';

export const fetchSubReddits = createRoutine('FETCH_SUB_REDDITS');

export const fetchPosts = createRoutine({
  name: 'FETCH_POSTS', metaCreator: { schema: schemas.posts }
});
