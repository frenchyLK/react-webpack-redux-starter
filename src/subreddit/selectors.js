import { createSelector } from 'reselect';
import { selectPosts } from 'reddit-api-redux/selectors';

const selectRedditName = (_, props) => props.match.params.srName

export const selectCurrentPosts = createSelector(
  [selectPosts, selectRedditName],
  (posts, redditName) => posts.get(redditName)
)
