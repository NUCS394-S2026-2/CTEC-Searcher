const {
  listCourseOfferingsRef,
  getCourseOfferingRef,
  createCourseOfferingRef,
  createQuestionRef,
  connectorConfig,
} = require('../index.cjs.js');
const { validateArgs, CallerSdkTypeEnum } = require('firebase/data-connect');
const {
  useDataConnectQuery,
  useDataConnectMutation,
  validateReactArgs,
} = require('@tanstack-query-firebase/react/data-connect');

exports.useListCourseOfferings = function useListCourseOfferings(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts } = validateReactArgs(
    connectorConfig,
    dcOrOptions,
    options,
  );
  const ref = listCourseOfferingsRef(dcInstance);
  return useDataConnectQuery(ref, inputOpts, CallerSdkTypeEnum.GeneratedReact);
};

exports.useGetCourseOffering = function useGetCourseOffering(
  dcOrVars,
  varsOrOptions,
  options,
) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateReactArgs(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  const ref = getCourseOfferingRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, inputOpts, CallerSdkTypeEnum.GeneratedReact);
};
exports.useCreateCourseOffering = function useCreateCourseOffering(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(
    connectorConfig,
    dcOrOptions,
    options,
  );
  function refFactory(vars) {
    return createCourseOfferingRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
};

exports.useCreateQuestion = function useCreateQuestion(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(
    connectorConfig,
    dcOrOptions,
    options,
  );
  function refFactory(vars) {
    return createQuestionRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
};
