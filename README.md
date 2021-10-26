# SMS Service

## Tech stack

- Node JS
- Typescript
- Express JS
- Google Kubernetes Engine
- GitLab CI

## Prerequired

- Node JS
- YARN
- GIT

## Install

### Clone project

```shell
git clone REPO URI
cd sms
git checkout develop
```

### Install dependency packages

```shell
yarn
```

### Export environment variables

Necessary variables is wrote on `.env.sample`. In a simple way, you create `.env` as same as `.env.sample`. Then you run scripts such as `yarn run dev` to export variable to environment and run project.

## Start in development

### Generate Prisma Client

> You have to run `npx prisma generate` or `npx prisma migrate dev` at first time.

In project, we use [Prisma](https://www.prisma.io/) as a DB ORM. You will change DB schema by make changes to Prima schema file `prisma/schema.prisma`.

Whenever you make changes to your Prisma schema in the future, you manually need to invoke prisma generate in order to accomodate the changes in your Prisma Client API.

```shell
npx prisma generate
```

After changed prisma schema, you will use [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/) to update the tables in database.

> Note: generate is called under the hood by default, after running prisma migrate dev.

```shell
// migrate db
npx prisma migrate dev --name 'add user table'
```

```shell
yarn run dev
```

## Build & Run

### On local

In production, you could translate source code from `typescript` to `javascript`. It increment performance on runtime.

```shell
yarn run build
```

Then run project by command

```shell
// within export .env
yarn start
```

or

```shell
// without export .env
yarn run start:prod
```

### On Google Kubernetes Engine

1. Build image
2. Deploy in GKE
