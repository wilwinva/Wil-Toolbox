# VACT Client

This is the web client for the Angularized VACT.

## Getting the code

Clone the repository using the SSH clone URL in GitHub. If you haven't set up a front-end development environment for SMI before then follow the instructions provided in the wiki: https://snl-wiki.sandia.gov/display/SMIPRG/Front+End+Development+Tools


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

 To build run the command below:
   `grunt build-[env]` where [env] is dev, qual, or prod

 To test locally from the app directory hitting the local ATL server run:
   `grunt serve-local`

 To test locally from the app directory hitting the [env] ATL server run:
   `grunt serve-[env]` where [env] is dev, qual, or prod

## Testing
See https://snl-wiki.sandia.gov/display/SMIPRG/Grunt+Test

 Note if you haven't installed karma you will need to install karma globally:
   `npm install -g karma-cli`

 Running `grunt test` will run the e2e and unit tests.
 Running `grunt test:unit` will run the unit tests with karma.
 Running `grunt test:e2e` will run the end to end tests written in protractor running in a browser executed through WebDriver.
