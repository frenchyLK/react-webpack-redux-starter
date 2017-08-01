export const createStandardActions = (actionName) => {
  return {
    [actionName]: actionName,
    [`${actionName}_SUCCESS`]: `${actionName}_SUCCESS`,
    [`${actionName}_ERROR`]: `${actionName}_ERROR`
  }
};
