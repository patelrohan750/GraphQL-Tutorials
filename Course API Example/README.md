# Course API GraphQL Tutorial
## GraphQL

## Features
- Role Based Authentication(Student and creator) using jwt
- Hash The Student and Creator password
- Register Student and creator
- Role Based Login (student and creator)
- creator can create a course
- student can anroll that course
- count the How many students have anrolled the course
- enum type(stack)
- dynamic relations between creator and courses
- another dynamic relations between student and courses



## Installation
create .env file
```sh
JWT_SECRECT_KEY_CREATOR='YOUR_SECRECT_KEY'
JWT_SECRECT_KEY_STUDENT='YOUR_SECRECT_KEY'
```
```sh
cd Course API Example
npm install
npm run dev
```

## Dependencies



| dependencies | NPM |
| ------ | ------ |
| apollo-server-express | https://www.npmjs.com/package/apollo-server-express |
| express | https://www.npmjs.com/package/express |
| graphql | https://www.npmjs.com/package/graphql |
| mongoose | https://www.npmjs.com/package/mongoose |
| dotenv | https://www.npmjs.com/package/dotenv |
| bcryptjs | https://www.npmjs.com/package/bcryptjs |
| jsonwebtoken | https://www.npmjs.com/package/jsonwebtoken |


