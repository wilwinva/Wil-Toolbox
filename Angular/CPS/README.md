# common PL Repository

> NOTE: You must be added to a team that has access to the Common and pattenLibraryDev repos, or you won’t be able to push.

# About Pattern Library Dev Repository and the Common Repository
The Pattern Library Dev repository houses the structure or HTML for displaying the Common patterns.  The Common repository contains the Styles (CSS) and function (JS).  Use the Common repository to update the CSS (SASS) and JS 
# Installation and Setup

### MAC apache
##### Setting up Sites folder
- install apache through homebrew 
- setup apache to run from Sites folder 

### Windows Apache
 - install wamp
 - be sure you clone your repositories into the www folder, or the webroot folder so it can be served locally


## MAC Setup
 - set proxies in bash_profile
	Add these lines to ~/.bash_profile for CA

		export HTTP_PROXY=http://wwwproxy.ca.sandia.gov:80
		export HTTPS_PROXY=http://wwwproxy.ca.sandia.gov:80
		export http_proxy=http://wwwproxy.ca.sandia.gov:80
		export https_proxy=http://wwwproxy.ca.sandia.gov:80
		
	Add these lines to ~/.bash_profile for NM
	
		export HTTP_PROXY=http://wwwproxy.sandia.gov:80
		export HTTPS_PROXY=http://wwwproxy.sandia.gov:80
		export http_proxy=http://wwwproxy.sandia.gov:80
		export https_proxy=http://wwwproxy.sandia.gov:80
		
 - source the bash profile by running

		source ~/.bash_profile
 - set proxies in .curlrc file
	Add this to your ~/.curlrc file for CA

		proxy=http://wwwproxy.ca.sandia.gov:80
	Add this to your ~/.curlrc file for NM
	
		proxy=http://wwwproxy.sandia.gov:80	
 - set proxies in npm in CA

		npm config set proxy http://wwwproxy.ca.sandia.gov:80
		npm config set https-proxy http://wwwproxy.ca.sandia.gov:80
		npm config set strict-ssl false
    
 - set proxies in npm in NM

		npm config set proxy http://wwwproxy.sandia.gov:80
		npm config set https-proxy http://wwwproxy.sandia.gov:80
		npm config set strict-ssl false
		
 - install homebrew
	run this script referenced from http://brew.sh/

		/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”

 - install node using homebrew
	`brew install node`
 - install grunt CLI - global
	`npm install -g grunt-cli`
 - clone the common repo into your Sites folder
	`git clone git@github2.sandia.gov:corporate-web-team/common.git`
 - clone the pattern library repo into your Sites folder
	`git clone https://github2.sandia.gov/corporate-web-team/pattenLibraryDev`
 - cd into each cloned repo, run 
   - `npm install` (if one pulls back error, you might have to run it as sudo)
   
- on the common repo in a new terminal window
  - `cd ~/Sites/common/` - to get to your common folder
  - `grunt` - compiles sass and concatenates JS (This should be in in it’s own terminal window as it continues to run and compile as you edit SASS files)



## Windows Setup
 > if you have issues with long file names
   - click the button to open the terminal from sourcetree `git config core.longpaths true`
   - try cloning the repo again by adding a working copy
    - it should show a bunch of staged files, so you need to rebase to pull it again

 - install node from website using installer
   - https://nodejs.org/en/
 - clone the patternLibraryDev repo through sourcetree
 - set proxies in bash_profile
	Add these lines to ~/.bash_profile for CA

		export HTTP_PROXY=http://wwwproxy.ca.sandia.gov:80
		export HTTPS_PROXY=http://wwwproxy.ca.sandia.gov:80
		export http_proxy=http://wwwproxy.ca.sandia.gov:80
		export https_proxy=http://wwwproxy.ca.sandia.gov:80
		
	Add these lines to ~/.bash_profile for NM
	
		export HTTP_PROXY=http://wwwproxy.sandia.gov:80
		export HTTPS_PROXY=http://wwwproxy.sandia.gov:80
		export http_proxy=http://wwwproxy.sandia.gov:80
		export https_proxy=http://wwwproxy.sandia.gov:80
		
 - source the bash profile by running
	`source ~/.bash_profile
 - set proxies in .curlrc file
	Add this to your ~/.curlrc file for CA

		proxy=http://wwwproxy.ca.sandia.gov:80
	Add this to your ~/.curlrc file for NM
	
		proxy=http://wwwproxy.sandia.gov:80	
 - set proxies in npm in CA

		npm config set proxy http://wwwproxy.ca.sandia.gov:80
		npm config set https-proxy http://wwwproxy.ca.sandia.gov:80
		npm config set strict-ssl false
    
 - set proxies in npm in NM

		npm config set proxy http://wwwproxy.sandia.gov:80
		npm config set https-proxy http://wwwproxy.sandia.gov:80
		npm config set strict-ssl false
    
 - open terminal and run the following to install grunt-cli

		npm install -g grunt-cli
    
 - run the nom installer to bring down the dependancies

		npm install



