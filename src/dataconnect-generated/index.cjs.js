const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'team-yellow-minimal-initial-version',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const listCourseOfferingsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCourseOfferings');
}
listCourseOfferingsRef.operationName = 'ListCourseOfferings';
exports.listCourseOfferingsRef = listCourseOfferingsRef;

exports.listCourseOfferings = function listCourseOfferings(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCourseOfferingsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCourseOfferingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseOffering', inputVars);
}
getCourseOfferingRef.operationName = 'GetCourseOffering';
exports.getCourseOfferingRef = getCourseOfferingRef;

exports.getCourseOffering = function getCourseOffering(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseOfferingRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createCourseOfferingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCourseOffering', inputVars);
}
createCourseOfferingRef.operationName = 'CreateCourseOffering';
exports.createCourseOfferingRef = createCourseOfferingRef;

exports.createCourseOffering = function createCourseOffering(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCourseOfferingRef(dcInstance, inputVars));
}
;

const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';
exports.createQuestionRef = createQuestionRef;

exports.createQuestion = function createQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createQuestionRef(dcInstance, inputVars));
}
;
