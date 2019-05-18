# Staff Management Backend
This is staff management application backend. It is written using nodejs, express and postgresql.

# Requirements
1. Ubuntu 18.04.1 x64
2. Node.js 12.2.0 
3. Postgresql 10.7

# Server Details
1. Server is running on port 5000.
2. Setup postgresql connection at config/db.js.
3. Run nodejs server and the database will be updated automatically

# Server Setup

1. Install the latest version of nodejs
```
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt install -y nodejs
```
2. Verify version of nodejs and npm
```
$ nodejs -v
v12.2.0
$ npm -v
6.9.0
```
3. Install postgresql
```
$ sudo apt install postgresql postgresql-contrib
```
4. Create new role
```
$ sudo adduser api
$ sudo -i -u postgres
$ createuser --interactive
$ # Follow on screen instructions
$ createdb staffmanagement
$ exit
$ sudo -i -u api
$ psql -d staffmanagement
```
5. Download applications
```
$ cd /opt/
$ git clone https://github.com/jimtsikos/staff-management-frontend.git
$ cd staff-management-frontend
$ sudo npm install
$ git clone https://github.com/jimtsikos/staff-management-backend.git
$ cd staff-management-backend
$ sudo npm install
```
6. Setup forever
```
$ sudo npm install forever -g
$ cd staff-management-backend
$ sudo nano server/server.js
$ # Add your frontend server at corsOptions
$ sudo nano config/db.js
$ # Add database connection data
$ forever start --spinSleepTime 10000 server/server.js
$ cd staff-management-frontend
$ vim src/store/actions/apiUrls.js
$ # Change API URL with your server
$ sudo npm start
```
