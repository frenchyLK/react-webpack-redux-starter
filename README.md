# react-webpack-redux-starter

Personal starter kit for React, Webpack2 and Redux starter kit.
Nothing is guaranteed to work, nothing is guaranteed to be maintained.

## How do I start using this?
git clone --depth=1 https://github.com/john-benson/react-webpack-redux-starter.git your-project-name

## What do I Start With?
By default, this package comes with the following packages:

1. **react / react-dom**; used for the rendering of the application / definition of components

2. **redux / react-redux**; used for storing / managing state and connecting it to your react components

3. **immutable / immutable-prop-types / react-immutable-render-mixin**; used for managing your  data without having to worry about mutations. the additional libraries deal with the changes that immutable brings into the application

4. **react-router / react-router-redux**; used to manage routing and handle updates to routes. react-router-redux connects this information into your redux state store for easy access.

5.  **normalizr / reslect**; used to simplify interactions with "nested" data and redux. see their docs for more information.

6.  **redux-actions**; used to remove boiler plate code when defining actions and handling those actions; also helps standardize your action definitions.

7. **i18next / react-i18n**; i18n helpers for react. currently, only setup for dead-simple internationalization.

## What does the Webpack Config produce?

With no changes to the application; you can expect the following files when running a build:

1. **main.*hash*.js / main.*hash*.js.map**; the "meat of the application"; everything that the entry point and it's dependencies include. Bundle is of size: 10.8Kb

2. **vendor.*hash*.js / vendor.*hash*.js.map**; all the files that are included through node_modules. These are seperated as they make up the bulk of the application and should not change often. Bundle is of size: 595Kb

4. **x.*hash*.js / x.*hash*.js.map**; a "split" bundle off of main. bundle sizes vary.

## Scripts
This package comes with the following scripts to begin:

1. **npm run start**: Run the webpack-dev-server with hot-reloading. Uses src/index.jsx as the entry point. Webserver launches at https://localhost:8080.

2. **npm run build**: Builds the application using minifcation, tree shaking and bundle splitting. This would be used to produce your "production build". Assets are output to the /build folder

3. **npm run storybook**: Runs the @kadira/storybook package. This lets you see your "stories" and interact with them. Useful for rapid prototyping of components. Webserver launches at http://localhost:9001.

4. **npm run stats**: Runs the webpack-bundle-analyzer which starts a local webserver that details the contents of your package bundle. Useful in finding "problem" dependencies. Webserver launches at http://localhost:8888.

5. **npm run serve:prod**: Runs the build command and than a simple http-server serving the build folder. Used to verify that nothing "wonky" happend during a build and that all assets are properly being copied / packaged. Should be run before issuing a PR. Webserver launches at http://localhost:8080.

6. **npm run test**: Runs the karma test suite. This will create the /coverage folder with lcov coverage reports. Coverage, by default, is only run against src/.

7. **npm run test:watch**: Same as 6; except test will continue to run.

## Dependencies

| npm package name | Licence      | Explanation                                                                     |
|------------------|--------------|---------------------------------------------------------------------------------|
| react            | BSD-3-Clause | The React web framework. Responsible for managing application structure.        |
| redux            | MIT          | A Flux implementation. Responsible for storing data and re-rendering React apps |
| react-redux      | MIT          | Hooks between React and Redux                                                   |
| immutable        | BSD-3-Clause | An immutable data structure implementation for JS                               |
| react-dom        | BSD-3-Clause | Responsible for taking React apps and turning them into browser DOM.            |
| redux-immutable  | BSD-3-Clause | Allows the use of immutable objects at the root redux reducers.                 |
| react-immutable-proptypes | MIT | Handles proptypes for immutable data |
| react-autobind | MIT | Helper to bind context in react components |
| redux-saga | MIT | Handles "async" actions in redux. |
| redux-actions | MIT | Helpers for creating and handling actions for redux |
| reselect | MIT | Helpers for manipulating data stores efficently |
| normalizr | MIT | Handles normalization (flattening) of deeply nested JSON. |
| redux-normalizr-middleware | MIT | Handles "normalization" of data passing through redux |
| i18next | MIT | Handles internationalization |
| i18next-xhr-backend | MIT | Handles importing translations at run time |
| react-i18next | MIT | Handles linking i18next to react components |
| regenerator-runtime | BSD-2-Clause | Handles polyfilling generators |

## Development Dependencies

| npm package name                | Licence     | Explanation                                                                                                                                        |
|---------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| @kadira/storybook               | MIT          | Responsible for rendering and managing demos of individual components                                                                              |
| @kadira/storybook-addon-knobs   | MIT          | Adds the ability to change elements on components rendered                                                                                         |
| @kadira/storybook-addon-options | MIT          | Allows the customization of storybook UI elements such as the dock                                                                                 |
| babel-core                      | MIT          | Responsible for converting ES6/7 to ES5                                                                                                            |
| babel-loader                    | MIT          | Hooks for Webpack to communicate with babel-core                                                                                                   |
| babel-preset-es2015             | MIT          | Responsible for transpiling ES2015 JS to ES5                                                                                                       |
| babel-preset-react              | MIT          | Responsible for transpiling JSX to JS                                                                                                              |
| babel-preset-stage-0            | MIT          | Responsible for transpiling ES7 features to ES5                                                                                                    |
| chai                            | MIT          | Assertion library for karma                                                                                                                        |
| chai-enzyme                     | MIT          | Simplifies interactions with enzyme for testing React components                                                                                   |
| clean-webpack-plugin            | MIT          | Handles deleting build folders / temporary resources                                                                                               |
| css-loader                      | MIT          | Loads CSS files and handles inject at runtime                                                                                                      |
| enzyme                          | MIT          | Simplifies testing React components                                                                                                                |
| extract-text-webpack-plugin     | MIT          | Handles converting injection scripts from scss-loader, css-loader and  style-loader and handles creation of .css files                             |
| file-loader                     | MIT          | Handles converting a file import into a path; also handles optimization and  minification of general files.                                        |
| html-webpack-plugin             | MIT          | Handles generation of HTML files that will inject paths to files generated by webpack                                                              |
| html-webpack-template           | MIT          | Simple templates for html-webpack-plugin to use                                                                                                    |
| json-loader                     | MIT          | Handles loading of JSON files                                                                                                                      |
| karma                           | MIT          | Handles test execution and reporting                                                                                                               |
| karma-chai                      | MIT          | Hooks between karma and chai                                                                                                                       |
| karma-chrome-launcher           | MIT          | Handles the launching of Chrome by Karma                                                                                                           |
| karma-mocha                     | MIT          | Handles hooks between karma and mocha                                                                                                              |
| karma-mocha-reporter            | MIT          | Handles reporting of test results by mocha                                                                                                         |
| karma-phantomjs-launcher        | MIT          | Handles the launching of the PhantomJS browser.                                                                                                    |
| karma-sourcemap-loader          | MIT          | Handles loading and managing source maps for JS.                                                                                                   |
| karma-webpack                   | MIT          | Handles hooks between karma and webpack                                                                                                            |
| lite-server                     | MIT          | Launches a minimalistic webserver for running the generated source from webpack                                                                    |
| mocha                           | MIT          | Handles management and organziation of unit tests in JS.                                                                                           |
| node-sass                       | MIT          | Handles converting SASS files into CSS files.                                                                                                      |
| phantomjs-prebuilt              | Apache 2.0   | Handles downloading and storage of the PhantomJS web-browser. NOTE: this will either download a binary from a remote source OR compile from source |
| react-addons-test-utils         | BSD-3-Clause | Adds helper functions for react tests. Primarily used by Enzyme                                                                                    |
| sass-loader                     | MIT          | Handles loading of SASS files into webpack                                                                                                         |
| style-loader                    | MIT          | Handles loading "style" files into webpack (SASS, CSS, LESS, etc)                                                                                  |
| webpack                         | MIT          | Handles bundling, minification, mapping, bundling and linking of any asset type.                                                                   |
| webpack-bundle-analyzer         | MIT          | Analyzes resources produced by Webpack and creates an interactive interface for analysis                                                           |
| webpack-dev-server              | MIT          | Handles calling webpack and hosting of assets for local development                                                                                |
| webpack-merge                   | MIT          | Handles merging multiple webpack configuration files                                                                                               |
| istanbul-instrumenter-loader               | MIT          | Handles calculating coverage |
| karma-coverage | WTFPL | Responsible for generating coverage reports for Karma |
| karma-coverage-istanbul-reporter | MIT | Handles linking istanbul with karma to produce coverage reports |
| eslint | MIT | Handles verifying code-quality standards |
| eslint-loader | MIT | Handles linking ESLint with Webpack |
| eslint-plugin-mocha | MIT | Handles ESLint rules with Mocha |
| eslint-plugin-react | MIT | Handles ESLint rules with JSX files |
