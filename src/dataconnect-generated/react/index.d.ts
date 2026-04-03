import {
  ListCourseOfferingsData,
  GetCourseOfferingData,
  GetCourseOfferingVariables,
  CreateCourseOfferingData,
  CreateCourseOfferingVariables,
  CreateQuestionData,
  CreateQuestionVariables,
} from '../';
import {
  UseDataConnectQueryResult,
  useDataConnectQueryOptions,
  UseDataConnectMutationResult,
  useDataConnectMutationOptions,
} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';

export function useListCourseOfferings(
  options?: useDataConnectQueryOptions<ListCourseOfferingsData>,
): UseDataConnectQueryResult<ListCourseOfferingsData, undefined>;
export function useListCourseOfferings(
  dc: DataConnect,
  options?: useDataConnectQueryOptions<ListCourseOfferingsData>,
): UseDataConnectQueryResult<ListCourseOfferingsData, undefined>;

export function useGetCourseOffering(
  vars: GetCourseOfferingVariables,
  options?: useDataConnectQueryOptions<GetCourseOfferingData>,
): UseDataConnectQueryResult<GetCourseOfferingData, GetCourseOfferingVariables>;
export function useGetCourseOffering(
  dc: DataConnect,
  vars: GetCourseOfferingVariables,
  options?: useDataConnectQueryOptions<GetCourseOfferingData>,
): UseDataConnectQueryResult<GetCourseOfferingData, GetCourseOfferingVariables>;

export function useCreateCourseOffering(
  options?: useDataConnectMutationOptions<
    CreateCourseOfferingData,
    FirebaseError,
    CreateCourseOfferingVariables
  >,
): UseDataConnectMutationResult<CreateCourseOfferingData, CreateCourseOfferingVariables>;
export function useCreateCourseOffering(
  dc: DataConnect,
  options?: useDataConnectMutationOptions<
    CreateCourseOfferingData,
    FirebaseError,
    CreateCourseOfferingVariables
  >,
): UseDataConnectMutationResult<CreateCourseOfferingData, CreateCourseOfferingVariables>;

export function useCreateQuestion(
  options?: useDataConnectMutationOptions<
    CreateQuestionData,
    FirebaseError,
    CreateQuestionVariables
  >,
): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
export function useCreateQuestion(
  dc: DataConnect,
  options?: useDataConnectMutationOptions<
    CreateQuestionData,
    FirebaseError,
    CreateQuestionVariables
  >,
): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
