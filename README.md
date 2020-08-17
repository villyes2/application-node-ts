# application-node-ts
New Application
# CRUD Starter API

Start a CRUD API quickly using Node, Express & Postgres.

Serves four requests (get, post, put, delete) from one page with a separate function for each.

All code can be edited and replaced to fit the needs of the project being built.

**Dependencies**

We use **express** to serve the API, **body-parser** to parse responses, **postgres** for the database, **knex** as the query engine, **dotenv** to protect environment variables, **helmut** to add proper headers, **cors** to prevent/allow XSS, **morgan** as our logger, and **nodemon** as a dev dependency to watch for changes.

All dependencies are included in the cloned project.

## Instructions

**1. Clone the repo**

```
git clone https://github.com/villyes2/application-node-ts.git
```

**2. CD into the project**

```
cd application-node-ts
```

**3. Install dependencies**

```
npm install
```

**4. Start Postgres**

```
brew services start postgresql
```

**Note:** You can use Postgres or MYSQL. We are using Postgres. If you would like to use MYSQL instead of Postgres you will need to `npm uninstall pg` and `npm install mysql`. Then edit the above command to start MYSQL started on your computer.

**5. Create a database**

Change the database name to whatever you would like to name the database. Be sure to also change the database name in server.js to whatever you name the database.

```
createdb TESTDATA
```

**6. Create a database table**

Open pSequel and run the following command. Change the table name to whatever you would like to name the table.

```
CREATE TABLE testtable1 (
 id serial PRIMARY KEY,
 first VARCHAR(100),
 last VARCHAR(100),
 email text UNIQUE NOT NULL,
 phone VARCHAR(100),
 location VARCHAR(100),
 hobby VARCHAR(100),
 added TIMESTAMP NOT NULL
);
```



