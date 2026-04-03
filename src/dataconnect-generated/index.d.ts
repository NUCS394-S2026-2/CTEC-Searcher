import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CourseOffering_Key {
  id: UUIDString;
  __typename?: 'CourseOffering_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface CreateCourseOfferingData {
  courseOffering_insert: CourseOffering_Key;
}

export interface CreateCourseOfferingVariables {
  year: number;
  quarter: string;
  courseId: UUIDString;
  professorId: UUIDString;
  audience: number;
  responsesReceived: number;
  comments: string[];
}

export interface CreateQuestionData {
  question_insert: Question_Key;
}

export interface CreateQuestionVariables {
  courseOfferingId: UUIDString;
  questionText: string;
  responseCount: number;
  distribution: string;
  mean?: number | null;
}

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
        questions: ({
          questionText: string;
          responseCount: number;
          distribution: string;
          mean?: number | null;
        })[];
  } & CourseOffering_Key;
}

export interface GetCourseOfferingVariables {
  id: UUIDString;
}

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

export interface Professor_Key {
  id: UUIDString;
  __typename?: 'Professor_Key';
}

export interface Question_Key {
  id: UUIDString;
  __typename?: 'Question_Key';
}

interface ListCourseOfferingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCourseOfferingsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCourseOfferingsData, undefined>;
  operationName: string;
}
export const listCourseOfferingsRef: ListCourseOfferingsRef;

export function listCourseOfferings(options?: ExecuteQueryOptions): QueryPromise<ListCourseOfferingsData, undefined>;
export function listCourseOfferings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCourseOfferingsData, undefined>;

interface GetCourseOfferingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseOfferingVariables): QueryRef<GetCourseOfferingData, GetCourseOfferingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseOfferingVariables): QueryRef<GetCourseOfferingData, GetCourseOfferingVariables>;
  operationName: string;
}
export const getCourseOfferingRef: GetCourseOfferingRef;

export function getCourseOffering(vars: GetCourseOfferingVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseOfferingData, GetCourseOfferingVariables>;
export function getCourseOffering(dc: DataConnect, vars: GetCourseOfferingVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseOfferingData, GetCourseOfferingVariables>;

interface CreateCourseOfferingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseOfferingVariables): MutationRef<CreateCourseOfferingData, CreateCourseOfferingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCourseOfferingVariables): MutationRef<CreateCourseOfferingData, CreateCourseOfferingVariables>;
  operationName: string;
}
export const createCourseOfferingRef: CreateCourseOfferingRef;

export function createCourseOffering(vars: CreateCourseOfferingVariables): MutationPromise<CreateCourseOfferingData, CreateCourseOfferingVariables>;
export function createCourseOffering(dc: DataConnect, vars: CreateCourseOfferingVariables): MutationPromise<CreateCourseOfferingData, CreateCourseOfferingVariables>;

interface CreateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  operationName: string;
}
export const createQuestionRef: CreateQuestionRef;

export function createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;
export function createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

