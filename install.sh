#!/bin/bash
echo Installation will begin in this directory
pwd
echo Do you wish to install in another directory [y,n]?
read CHANGE
if [ "$CHANGE" == 'y' ] || [ "$CHANGE" == 'Y' ]; then
        echo "Specify an absolute path of where you want to install"
        read INPATH
        cd $INPATH
fi
echo Installing dependencies, you may need to provide admin rights.
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo apt-get install postgresql-client
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install git
sudo apt-get install nodejs-legacy

git clone https://github.com/UMass-Bookshare/UMass-Bookshare.git

echo Set up a postgres database [see install notes if you arent sure how] and enter your configuration here:
echo Database:
read DB
echo user:
read USER
echo pass:
read PASS

echo "var exports = module.exports = {};" >> ./UMass-Bookshare/bookapp/node_modules/server.conf
echo "exports.db = \"$DB\";" >> ./UMass-Bookshare/bookapp/node_modules/server.conf
echo "exports.user = \"$USER\";" >> ./UMass-Bookshare/bookapp/node_modules/server.conf
echo "exports.pass = \"$PASS\";" >> ./UMass-Bookshare/bookapp/node_modules/server.conf

echo Enter your postgres server password when prompted
psql -U $USER -d "$DB" --file="./UMass-Bookshare/bookapp/schema/ProjectSchema.sql"

cd ./UMass-Bookshare/bookapp
sudo apt-get install nodejs-legacy
npm install

echo Installation complete, change directories to UMass-Bookshare/bookapps/ and start the server with "npm start"
echo Common errors:
echo    npm start fails with error code 127:
echo            nodejs-legacy failed to install, run \"sudo apt-get install nodejs-legacy\"
echo    npm start fails with error code 3/8:
echo            Some module failed to install, run \"npm install\" in UMass-Bookshare/bookapp/
