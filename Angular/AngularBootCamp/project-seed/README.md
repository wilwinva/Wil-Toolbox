

This project uses [node.js](http://nodejs.org/). You will need to install node. 
  
  We will need some global libraries.
  
  * `npm install -g gulp`
  * `npm install -g karma-cli`

With node and these global dependencies installed, run `npm install` from the project directory. This will install the local dependencies the project relies on.

Once npm has installed your dependencies, you can now run the build with the `gulp` command in the project directory. This launches a sequence of tasks and starts a local web server on port 3444 (http://localhost:3444).

Additionally, gulp is now watching the project for changes to files in the source directory.
