# UMass Bookshare

UMass Bookshare is an online marketplace for students to buy, rent, sell, or share books. This web application connects students with others who have the books they want, right on their campus. This allows for greater convenience and more flexibility compared to other alternatives.

The current version of UMass Bookshare can be used at http://umassbookshare.com:3000/

This version supports creating a new account and login (currently does not check for validations as it only does a query on the passed username and password). 

Create Account: 

Navigate from home screen by clicking the link "Create an Account". Enter user information into fields and click Create Account at the bottom of the form. A profile page will display with the information you just provided. You can redirect back to the home screen by clicking "UMass Bookshare" in the navigation bar to the top-left of the website. Currently only "UMass Bookshare" and "profile" link properly. 

Login:

From the home screen, enter a username and password and by pressing the "Sign In" button there will be a search on the database and the correlating user information will be displayed on the profile page. (username and password need to be exact to obtain the correct user information you want)

##Instructions for installation

Note:  If you are on an ubuntu system setup can be run via running ./install.sh in the UMass-Bookshare folder.  THi will setup the database, node and any other necessary libraries

### Setting up database:

Install Postgres and Git. Note: On a Mac, you will need [Homebrew] (http://brew.sh). Replace apt-get with brew.  Run these from terminal.

    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install git

Navigate to the folder where you want to install UMass-Bookshare and run:

    git clone https://github.com/UMass-Bookshare/UMass-Bookshare.git

Create a role for UMass-Books and create the database, run the following commands:

    sudo -u postgres psql postgres
    
    Inside the psql shell enter the command to create a role for our server's db connection:
    
        CREATE USER postgres WITH SUPERUSER PASSWORD 'password';
    
    If the above command does not work, enter the following command:
    
        ALTER USER postgres WITH PASSWORD 'password';
    
        Type ctrl-D to exit posql

Back in the command prompt, type the following to create the database and import the tables:

    sudo -u postgres createdb UMass-Books
    
    sudo -u postgres psql UMass-Books < UMass-Bookshare/bookapp/schema/ProjectSchema.sql


### Setting up Node.js and Dependencies:

Install [Node.js] (http://nodejs.org) .

On Ubuntu to install nodejs and npm instructions can be found here:  https://rtcamp.com/tutorials/nodejs/node-js-npm-install-ubuntu/

To install dependencies, navigate to the <code>UMass-Bookshare/bookapp</code> directory and run:

<code>sudo npm install</code>

### Running the App:

To run the app, execute the following command from the <code>bookapp</code> directory:

<code>npm start</code>

In the browser, type <code>localhost:3000</code> in address bar.

### Unit Testing
Unit testing should be performed before every commit to ensure no major functionality has been broken.
We use [Mocha] (http://mochajs.org/) to organize and run our applications test suite.  
To run the test suite, navigate to UMass-Bookshare/bookapp and run:
<code>mocha</code> 

To add additional testing, add test code to **UMass-Bookshare/bookapp/test/test.js*
We use the mocha extensions [should.js] (https://github.com/Automattic/expect.js) and [expect.js] (https://github.com/tj/should.js)

### Bug Tracking

We are using the Issues section of GitHub to track bugs and monitor their status. We can assign certain bugs to team members. Also, we will utilize tags in order to distinguish what kind of issue it is or if someone needs assistance. To file a bug, go to <strong>Issues</strong> and then click <strong>New Issue</strong>.
