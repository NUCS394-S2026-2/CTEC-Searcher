# Generated TypeScript README

This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

**\*NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.\*

# Table of Contents

- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [_Connecting to the local Emulator_](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [_ListCourseOfferings_](#listcourseofferings)
  - [_GetCourseOffering_](#getcourseoffering)
- [**Mutations**](#mutations)
  - [_CreateCourseOffering_](#createcourseoffering)
  - [_CreateQuestion_](#createquestion)

# Accessing the connector

A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator

By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:

- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:

- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListCourseOfferings

You can execute the `ListCourseOfferings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):

```typescript
listCourseOfferings(options?: ExecuteQueryOptions): QueryPromise<ListCourseOfferingsData, undefined>;

interface ListCourseOfferingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCourseOfferingsData, undefined>;
}
export const listCourseOfferingsRef: ListCourseOfferingsRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.

```typescript
listCourseOfferings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCourseOfferingsData, undefined>;

interface ListCourseOfferingsRef {
  ...
  (dc: DataConnect): QueryRef<ListCourseOfferingsData, undefined>;
}
export const listCourseOfferingsRef: ListCourseOfferingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCourseOfferingsRef:

```typescript
const name = listCourseOfferingsRef.operationName;
console.log(name);
```

### Variables

The `ListCourseOfferings` query has no variables.

### Return Type

Recall that executing the `ListCourseOfferings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCourseOfferingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCourseOfferingsData {
  courseOfferings: ({
    id: UUIDString;
    year: number;
    quarter: string;
    audience: number;
    responsesReceived: number;
    comments: string[];
    course: {
      id: UUIDString;
      department: string;
      courseNumber: string;
      courseName: string;
      sections: string[];
    } & Course_Key;
    professor: {
      id: UUIDString;
      firstName: string;
      lastName: string;
    } & Professor_Key;
    questions: ({
      id: UUIDString;
      questionText: string;
      responseCount: number;
      distribution: string;
      mean?: number | null;
    } & Question_Key)[];
  } & CourseOffering_Key)[];
}
```

### Using `ListCourseOfferings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCourseOfferings } from '@dataconnect/generated';

// Call the `listCourseOfferings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCourseOfferings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCourseOfferings(dataConnect);

console.log(data.courseOfferings);

// Or, you can use the `Promise` API.
listCourseOfferings().then((response) => {
  const data = response.data;
  console.log(data.courseOfferings);
});
```

### Using `ListCourseOfferings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCourseOfferingsRef } from '@dataconnect/generated';

// Call the `listCourseOfferingsRef()` function to get a reference to the query.
const ref = listCourseOfferingsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCourseOfferingsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseOfferings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseOfferings);
});
```

## GetCourseOffering

You can execute the `GetCourseOffering` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):

```typescript
getCourseOffering(vars: GetCourseOfferingVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseOfferingData, GetCourseOfferingVariables>;

interface GetCourseOfferingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseOfferingVariables): QueryRef<GetCourseOfferingData, GetCourseOfferingVariables>;
}
export const getCourseOfferingRef: GetCourseOfferingRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.

```typescript
getCourseOffering(dc: DataConnect, vars: GetCourseOfferingVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseOfferingData, GetCourseOfferingVariables>;

interface GetCourseOfferingRef {
  ...
  (dc: DataConnect, vars: GetCourseOfferingVariables): QueryRef<GetCourseOfferingData, GetCourseOfferingVariables>;
}
export const getCourseOfferingRef: GetCourseOfferingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseOfferingRef:

```typescript
const name = getCourseOfferingRef.operationName;
console.log(name);
```

### Variables

The `GetCourseOffering` query requires an argument of type `GetCourseOfferingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseOfferingVariables {
  id: UUIDString;
}
```

### Return Type

Recall that executing the `GetCourseOffering` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseOfferingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseOfferingData {
  courseOffering?: {
    id: UUIDString;
    year: number;
    quarter: string;
    audience: number;
    responsesReceived: number;
    comments: string[];
    course: {
      department: string;
      courseNumber: string;
      courseName: string;
      sections: string[];
    };
    professor: {
      firstName: string;
      lastName: string;
    };
    questions: {
      questionText: string;
      responseCount: number;
      distribution: string;
      mean?: number | null;
    }[];
  } & CourseOffering_Key;
}
```

### Using `GetCourseOffering`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseOffering, GetCourseOfferingVariables } from '@dataconnect/generated';

// The `GetCourseOffering` query requires an argument of type `GetCourseOfferingVariables`:
const getCourseOfferingVars: GetCourseOfferingVariables = {
  id: ...,
};

// Call the `getCourseOffering()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseOffering(getCourseOfferingVars);
// Variables can be defined inline as well.
const { data } = await getCourseOffering({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseOffering(dataConnect, getCourseOfferingVars);

console.log(data.courseOffering);

// Or, you can use the `Promise` API.
getCourseOffering(getCourseOfferingVars).then((response) => {
  const data = response.data;
  console.log(data.courseOffering);
});
```

### Using `GetCourseOffering`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseOfferingRef, GetCourseOfferingVariables } from '@dataconnect/generated';

// The `GetCourseOffering` query requires an argument of type `GetCourseOfferingVariables`:
const getCourseOfferingVars: GetCourseOfferingVariables = {
  id: ...,
};

// Call the `getCourseOfferingRef()` function to get a reference to the query.
const ref = getCourseOfferingRef(getCourseOfferingVars);
// Variables can be defined inline as well.
const ref = getCourseOfferingRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseOfferingRef(dataConnect, getCourseOfferingVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseOffering);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseOffering);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:

- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:

- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateCourseOffering

You can execute the `CreateCourseOffering` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):

```typescript
createCourseOffering(vars: CreateCourseOfferingVariables): MutationPromise<CreateCourseOfferingData, CreateCourseOfferingVariables>;

interface CreateCourseOfferingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseOfferingVariables): MutationRef<CreateCourseOfferingData, CreateCourseOfferingVariables>;
}
export const createCourseOfferingRef: CreateCourseOfferingRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.

```typescript
createCourseOffering(dc: DataConnect, vars: CreateCourseOfferingVariables): MutationPromise<CreateCourseOfferingData, CreateCourseOfferingVariables>;

interface CreateCourseOfferingRef {
  ...
  (dc: DataConnect, vars: CreateCourseOfferingVariables): MutationRef<CreateCourseOfferingData, CreateCourseOfferingVariables>;
}
export const createCourseOfferingRef: CreateCourseOfferingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCourseOfferingRef:

```typescript
const name = createCourseOfferingRef.operationName;
console.log(name);
```

### Variables

The `CreateCourseOffering` mutation requires an argument of type `CreateCourseOfferingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCourseOfferingVariables {
  year: number;
  quarter: string;
  courseId: UUIDString;
  professorId: UUIDString;
  audience: number;
  responsesReceived: number;
  comments: string[];
}
```

### Return Type

Recall that executing the `CreateCourseOffering` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCourseOfferingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCourseOfferingData {
  courseOffering_insert: CourseOffering_Key;
}
```

### Using `CreateCourseOffering`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCourseOffering, CreateCourseOfferingVariables } from '@dataconnect/generated';

// The `CreateCourseOffering` mutation requires an argument of type `CreateCourseOfferingVariables`:
const createCourseOfferingVars: CreateCourseOfferingVariables = {
  year: ...,
  quarter: ...,
  courseId: ...,
  professorId: ...,
  audience: ...,
  responsesReceived: ...,
  comments: ...,
};

// Call the `createCourseOffering()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCourseOffering(createCourseOfferingVars);
// Variables can be defined inline as well.
const { data } = await createCourseOffering({ year: ..., quarter: ..., courseId: ..., professorId: ..., audience: ..., responsesReceived: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCourseOffering(dataConnect, createCourseOfferingVars);

console.log(data.courseOffering_insert);

// Or, you can use the `Promise` API.
createCourseOffering(createCourseOfferingVars).then((response) => {
  const data = response.data;
  console.log(data.courseOffering_insert);
});
```

### Using `CreateCourseOffering`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCourseOfferingRef, CreateCourseOfferingVariables } from '@dataconnect/generated';

// The `CreateCourseOffering` mutation requires an argument of type `CreateCourseOfferingVariables`:
const createCourseOfferingVars: CreateCourseOfferingVariables = {
  year: ...,
  quarter: ...,
  courseId: ...,
  professorId: ...,
  audience: ...,
  responsesReceived: ...,
  comments: ...,
};

// Call the `createCourseOfferingRef()` function to get a reference to the mutation.
const ref = createCourseOfferingRef(createCourseOfferingVars);
// Variables can be defined inline as well.
const ref = createCourseOfferingRef({ year: ..., quarter: ..., courseId: ..., professorId: ..., audience: ..., responsesReceived: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCourseOfferingRef(dataConnect, createCourseOfferingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseOffering_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseOffering_insert);
});
```

## CreateQuestion

You can execute the `CreateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):

```typescript
createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.

```typescript
createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionRef:

```typescript
const name = createQuestionRef.operationName;
console.log(name);
```

### Variables

The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionVariables {
  courseOfferingId: UUIDString;
  questionText: string;
  responseCount: number;
  distribution: string;
  mean?: number | null;
}
```

### Return Type

Recall that executing the `CreateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionData {
  question_insert: Question_Key;
}
```

### Using `CreateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestion, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  courseOfferingId: ...,
  questionText: ...,
  responseCount: ...,
  distribution: ...,
  mean: ..., // optional
};

// Call the `createQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestion(createQuestionVars);
// Variables can be defined inline as well.
const { data } = await createQuestion({ courseOfferingId: ..., questionText: ..., responseCount: ..., distribution: ..., mean: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestion(dataConnect, createQuestionVars);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
createQuestion(createQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

### Using `CreateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionRef, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  courseOfferingId: ...,
  questionText: ...,
  responseCount: ...,
  distribution: ...,
  mean: ..., // optional
};

// Call the `createQuestionRef()` function to get a reference to the mutation.
const ref = createQuestionRef(createQuestionVars);
// Variables can be defined inline as well.
const ref = createQuestionRef({ courseOfferingId: ..., questionText: ..., responseCount: ..., distribution: ..., mean: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionRef(dataConnect, createQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```
