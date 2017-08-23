const REDDIT_API_URL = 'https://www.reddit.com';

const request = ({ endpoint }) => {
  return fetch(`${REDDIT_API_URL}/${endpoint}`);
}

export const fetchTopSubrredits = () => {
  return fetch('api/trending_subreddits.json');
}

export const fetchPosts = ({ type = 'top', name }) => {
  if(!name) {
    return Promise.reject('Cannot fetch posts; no name provided');
  }

  return request(`/r/${name}/${type}.json`)
    .then(res => res.data.children);
}
