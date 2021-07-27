# GraphQL - PostrgeSQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**PostgreSQL**](https://www.postgresql.org/): Open source relational database

## Contents

- [Getting Started](#getting-started)
- [Using the GraphQL API](#using-the-graphql-api)

## Getting started

### 1. Download the repo and install dependencies

Download this repo and switch to the proper branch:

```
git clone https://github.com/luishporras/web3-server
git checkout graphql-server
```

Install npm dependencies:

```
cd graphql-server
npm install
```

### 2. Create and seed the database

First create the db to connect to and then create a .env file to add the connection to the db. More info in the [Prisma Docs: Database connectors, PostreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql), as an example:
```
DATABASE_URL="postgresql://username:passwordlocalhost:5432/dbadge?schema=public"
```

Run the following command to create your PostgreSQL database file. This also creates the `Badge` table that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed --preview-feature
```

You can see the data in your db with Prisma studio:

```
npx prisma studio
```
Navigate to [http://localhost:5555](http://localhost:5555) in your browser to explore the data stored in your db and see the different tables created.

### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).


## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all published badges

```graphql
query {
  allBadges {
    id
    issuerName
    recipientName
    area
    issueDate
  }
}
```

<details><summary><strong>See more API operations</strong></summary>

### Retrieve a badge by id

```graphql
{
  badgesById(
    id: 3
  ) {
    id
    issuerName
    recipientName
  }
}
```


### Create a new badge

```graphql
mutation {
  addBadge(data: { id: 10, issuerName: "Ivan Illich", recipientName: "Gustavo Esteva", area: "Conviventiality" }) {
    id
    area
  }
}
```



</details>

## Next steps

- Check out the [GraphQL docs](https://graphql.org/learn/) & [Prisma docs](https://www.prisma.io/docs)
- Create issues and ask questions on [GitHub](https://github.com/luishporras/web3-server/)
