/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise 
 * @param {function} asyncTransformer 
 */
function flatMapPromise(promise, asyncTransformer){
  return new Promise((resolve, reject) => {
    promise
      .then(/* IMPLEMENT ME! */);
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess){
  return firstPromise.then(/* IMPLEMENT ME! */);
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById){
  return function getUserByIdWithOrganization(userId){
    /* IMPLEMENT ME! */
  };
}

/**
 * 
 * EXERCISE 4
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
*/
function makeGetUserAndOrganizationById(getUserById, getOrganizationById){
  /**
   * @param {string} userId
   * @param {string} organizationId
   */
  return function getUserByIdWithOrganization(userId, organizationId){
    /* IMPLEMENT ME! */
  };
}

/**
 * 
 * EXERCISE 5
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUsersByIdWithOrganizations(getUserById, getOrganizationById){
  /**
   * @param {Array<string>} userIds
   */
  return function getUserByIdWithOrganization(userIds){
    /* IMPLEMENT ME! */
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
  makeGetUserAndOrganizationById,
  makeGetUsersByIdWithOrganizations,
};