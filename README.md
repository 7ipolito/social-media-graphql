# Social Media GraphQl
<img src="https://github.com/user-attachments/assets/6237ca28-5cf1-41f9-a6fd-215d75eebd41" width="200px"/>

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/Abo1zu?referralCode=alphasec)

Welcome to social-media-graphql repository 🤳🏼

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)
  
## Introduction

This social network was created by me, Allan Hipolito, you can easily create your account using google or github. In the first version you are able to like and create text-only posts and you can change your name and username or even delete your account
## Technologies Used
![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![Node.js Badge](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Nest](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![GraphQL Badge](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=fff&style=for-the-badge)
![Apollo Client](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![NextUI Badge](https://img.shields.io/badge/NextUI-000?logo=nextui&logoColor=fff&style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![FramerMotion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Clerk Badge](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=fff&style=for-the-badge)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge)
![Mongoose Badge](https://img.shields.io/badge/Mongoose-F04D35?logo=mongoosedotws&logoColor=fff&style=for-the-badge)
![Jest Badge](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge)
### Frontend
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **Next.js**: A React framework for building server-rendered applications and static sites, providing optimized performance and development experience.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **Apollo Client**: A powerful state management library for interacting with GraphQL APIs and managing local data in a React application.
- **NextUI**: A modern React UI library offering customizable and pre-designed components for quick and efficient development.
- **Framer Motion**: A library for creating advanced animations and transitions in React with a simple and declarative API.
- **Clerk**: A comprehensive authentication and user management solution for modern web applications.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.


### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **NestJS**: A progressive Node.js framework for building scalable and maintainable server-side applications.
- **GraphQL**: A query language and runtime that simplifies API development with strongly typed schemas.
- **PrismaORM**: Prisma ORM is an open-source next-generation ORM.
- **MongoDB**: A NoSQL database designed for high performance, scalability, and flexibility.
- **Mongoose**: An ODM for MongoDB, providing schema-based solutions for modeling application data.
- **Jest**: A testing framework designed for creating unit and integration tests with simplicity and speed.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Installation


Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/7ipolito/social-media-graphql.git
   ```

2. **Navigate to the repository**:

   ```bash
   cd social-media-graphql
   ```

3. **Install the dependencies**:

   - For install both dependecies run:
   
   ```bash
   npm install
   ```

   - To inicialize prisma run:
   
   ```bash
   cd backend && npx run prisma generate
   ```


## Running the Application

- **To run the frontend**:

  ```bash
  npm run start-frontend
  ```

  This starts the React application on `http://localhost:5173` (or another available port).

- **To run the backend**:

  ```bash
  npm run start-backend
  ```

  This initializes the Express server, typically on `http://localhost:3000`.

- **To run both simultaneously**:

  ```bash
  npm run start
  ```

  This will invoke `concurrently` to start both the front and back ends.

Ensure that the frontend and backend are configured to run on separate ports to avoid conflicts.

## Conclusion
This project provided me with a lot of knowledge about using Clerk, sparked my creativity, and gave me the opportunity to improve my coding style in a much more efficient way compared to the past.

---
