/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise
 * @param {thunk} action
 * 
 */
function waitForPromise(promise, action){
  /* IMPLEMENT ME */
  // In its most general form, the then function takes two arguments. The first argument is a function
  // that will be run when the promise is fulfilled, the second argument is a function that will be run
  // when the promise is rejected. These two functions are our CALLBACK functions. (Tom likes to call
  // them transformation functions). You can also call then with only a single functions passed as
  // argument, that will be run when the promise fulfills.

  // Also important to note is that then returns another promise, whose FULFILLEMENT value is the 
  // return value of the first or second argument of then, depending on which of the two was run.

  // To recap, the pseudocode of class Promise looks loosely something like (in a mix of regular Java
  // syntax and JavaScript syntax):
  /*
  class Promise {
    // A promise is in one of three states, and if it is in the fulfilled state it has a value, and
    // if it is in the rejected state it has an error message / value
    private string state = "PENDING" // It starts in the PENDING state, and can evolve to either the
                                     // FULFILLED or REJECTED state
    private var fulfilledValue = null // or undefined in JavaScript!
    private var rejectedReason = null // or undefined in JavaScript!

    constructor(initFn) {
      let promise = ...
      let resolve = (val) => { ... let state = "FULFILLED" ...}
      let reject = (err) => { ... let state = "REJECTED" ...}
      initFn(resolve, reject)
      return promise;
    }

    resolve(value) {
      // I don't know if it's actually implemented with the constructor, but the result should be the same!
      return new Promise((resolvePromise, rejectPromise) => {
        resolvePromise(value);
      })
    }

    reject(value) {
      return new Promise((resolvePromise, rejectPromise) => {
        rejectPromise(value);
      })
    }

    then(fulfilledCallback, rejectedCallBack) {
      while (this.state == "PENDING") {
        ; // The method blocks
      }
      if (this.state == "FULFILLED") {
        fulfilledCallback(this.fulfilledValue); // We call the callback for the fulfilled case with the value of the promise
      }
      if (this.state == "REJECTED") {
        rejectedCallback(this.rejectedReason); // We call the callback for the rejected case with the error message of the promise
      }
    }

    then(fulfilledCallback) {
      while (this.state == "PENDING") {
        ; // The method blocks
      }
      if (this.state == "FULFILLED") {
        fulfilledCallback(this.fulfilledValue); // We call the callback for the fulfilled case with the value of the promise
      }
    }

    // I have written this and the previous method without considering possible chaining of promises!
    catch(rejectedCallback) {
      while (this.state == "PENDING") {
        ; // The method blocks
      }
      if (this.state == "REJECTED") {
        rejectedCallback(this.rejectedReason); // We call the callback for the rejected case with the error message of the promise
      }
    }

  }
  */

  // Don't just write action after the arrow, that does nothing. You must call action on the value
  // of the fulfilled promise.
  promise.then((value) => action(value));
}
/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} promise 
 * @param {consumer} consumer 
 * @param {handler} handler 
 */
function consumePromise(promise, consumer, handler){
  /* IMPLEMENT ME! */
  // Here, we just call then with two arguments:
  promise.then((value) => {consumer(value)}, (value) => {handler(value)});

  // This also works. Since we're not chaining promises here, this solution is equivalent to the
  // previous one!
  //promise.then((value) => {consumer(value)}).catch(value => {handler(value)});
}

/**
 * @callback thunk
 * @returns {void}
 */
module.exports = {
  waitForPromise,
  consumePromise,
};