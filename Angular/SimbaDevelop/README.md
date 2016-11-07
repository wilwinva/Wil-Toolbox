# Inside

This is the Angularized TechwebLite front end. 

# Table of Contents
1. [Getting the code](#getting-the-code)
1. [Git workflow](#git-workflow)
1. [Installing dependencies](#installing-dependencies)
1. [Development](#development)
1. [Build](#build)
1. [Testing](#testing)
1. [Ngdoc](#ngdoc)

## Getting the code
 
Clone the repository using the SSH clone URL in GitHub. 
If you haven't set up a front-end development environment for SMI before then follow the instructions provided in the wiki: https://snl-wiki.sandia.gov/display/SMIPRG/Front+End+Development+Tools

## Git Workflow 

This project was developed using a modified version of [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/).
Instead of having separate release branches, we decided that we release infrequently enough (and never overlapping) to
create a permanent "release" branch, called, *quality*.  Quality is always treated as the latest release branch.  

The dev server serves the *develop* branch, the qual server serves
the *quality* branch, and the prod server serves tags made on the *master* branch.  
Tagging is done with [semantic versioning](http://semver.org/).

## Installing dependencies

If package.json file is updated then you will need to run:
     `npm install`


If the bower.json file is updated then you will need to run:
     `bower install`
     
If you need to install a new dependency then the rule of thumb is use Bower for front-end packages and npm for developer tools like Yeoman, Grunt, Gulp, JSHint, CoffeeScript, etc.

## Development
We have created Live Templates for PHPStorm to expedite development, see: https://snl-wiki.sandia.gov/display/SMIPRG/PHP+Storm+Live+Templates


## Build 
See https://snl-wiki.sandia.gov/display/SMIPRG/Grunt+Build

 To build run one of the commands below:
   `grunt build`         (will create config.js based on your local smi-api wamp server, minify, and copy files to dist folder)
   `grunt build-dev`     (will create config.js based on the dev smi-api server, minify, and copy files to dist folder)
   `grunt build-qual`    (will create config.js based on the qual smi-api server, minify, and copy files to dist folder)
   `grunt build-prod`    (will create config.js based on the prod smi-api server, minify, and copy files to dist folder)
 
 To test locally from the app directory run:
   `grunt serve`         (will point to your local smi-api wamp server)
   `grunt serve-local`   (will point to your local smi-api wamp server)
   `grunt serve-dev`     (will point to the dev smi-api server)
   `grunt serve-qual`    (will point to the qual smi-api server)
   `grunt serve-prod`    (will point to the prod smi-api server)
   
 To test locally from the dist directory run:
   `grunt serve:dist` 

## Testing 
See https://snl-wiki.sandia.gov/display/SMIPRG/Grunt+Test

 Note if you haven't installed karma you will need to install karma globally:
   `npm install -g karma-cli`
 
 Running `grunt test` will run the e2e and unit tests.
 Running `grunt test:unit` will run the unit tests with karma.
 Running `grunt test:e2e` will run the end to end tests written in protractor running in a browser executed through WebDriver.

## Ngdoc

This project uses Ngdoc for documentation.  Compile the ngdocs with "grunt ngdocs". You can then browse the documentation
by opening "index.html" under the docs directory.
