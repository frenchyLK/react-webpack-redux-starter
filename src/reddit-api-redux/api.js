const REDDIT_API_URL = 'https://www.reddit.com';

const request = ({ endpoint }) => {
  return fetch(`${REDDIT_API_URL}/${endpoint}`)
    .then(res => res.json());
}

export const fetchTopSubrredits = () => {
  return request({ endpoint: 'api/trending_subreddits.json' })
    .then(res => res.subreddit_names);
}

export const fetchRedditPosts = ({ type = 'top', name }) => {
  if(!name) {
    return Promise.reject('Cannot fetch posts; no name provided');
  }

  return request({ endpoint: `/r/${name}/${type}.json` })
    .then(res => ({ subreddit: name, posts: res.data.children.map(c => c.data) }));
}
