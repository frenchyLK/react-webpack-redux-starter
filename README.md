## Getting Started

#### How to fork this project
1. `git clone --depth=1 https://bitbucket.org/bluespurs/react-starter-kit.git your-project-name`
2. You'll likely want to remove the "examples" from this project; that includes:
 - `src/post`
 - `src/dashboard`
 - `src/subreddit`
 - `src/reddit-api-redux`
 - `src/demo-field`
 - `src/app/index.jsx` lines 18, 19
3. You'll also want to update the metadata files; which include:
 - `package.json` lines 2, 4, 19
 - `favicon.ico`
 - `webpack-config/common.js` line 61
