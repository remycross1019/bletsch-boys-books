Bookstore Inventory Managment Web Application built for a Senior Design Project

Developer Guide
The system is built using the T3 stack. T3 is fullstack, and typesafe, built around the
typescript ecosystem and utilizes 6 different tools:

● Next.js - a framework to build full stack web applications built on top of react.
Helps optimize page rendering and data fetching.

● Tailwind CSS - A utility-first CSS tool that helps build clean and responsive
frontend components.

● Prisma - A framework that allows you to easily query and manipulate your
database through an api built in typescript

● tRPC - a framework that allows you to connect your frontend and backend easily
when both are created through typescript

● Typescript - Allows you to use the flexibility of javascript why strongly enforcing
types.

● NextAuth.js - Flexible and secure authentication that can work with your existing
database to manage users and sessions.

The database that we used is a PostgreSQL database that is hosted on Railway
Steps for Developer:
1. Download the entire codebase
2. run npm install to download all the packages and dependencies
3. Get a google books secret api key and a nextAuth secret key and enter them as
environment variables in the .env file
4. Set up a development database and enter the database url into the .env file
5. Run ‘npx prisma db push’ to populate your database with the schema
6. run ‘npx prisma generate’ to be able to use the database in your environment
7. run ‘npm run dev’ to locally run the website


Deployment Guide
1. Download production source code from GitHub
2. Download latest version of node package manager (npm)
3. Navigate to code folder and run “npm install” in command line interface
4. Decide on a hosting platform for your database. We recommend managing an
SQL database like Postgres via Railway.
5. In command line interface run “npx prisma db push”
6. In command line interface run “npx prisma generate”
7. Decide on a server hosting platform. We recommend Vercel.
8. Get a GoogleBooks API Key
9. For added security create a secret key for authentication
10.When setting up your Vercel database add the following environment variables:

● DATABASE_URL=(the connection URL of your database)

● NEXTAUTH_SECRET=(the secret key you created)

● SECRET_KEY_GOOGLE_API=(your google API key)

11. Follow the last deployment steps on your hosted server site.
