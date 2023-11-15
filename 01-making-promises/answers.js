

// 007: WAT HET EXAMEN BETREFT: De vragen op het examen zullen eerder oefeningen zijn, geen theorievragen a priori.
// Als je de moeite hebt gedaan om heel deze oefenzitting te maken, dan ben je heel goed voorbereid voor een
// mogelijke JavaScript vraag op het examen!


// Note to self: definitely read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise,
// it's very useful! Also look at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises!


/**
 * 
 * EXERCISE 1
 * 
 * @returns {Promise<3>}
 */
function makePromiseResolveWith3(){
  /* IMPLEMENT ME! */
  // A promise always starts in the pending state. As soon as the promise becomes
  // fulfilled or rejected, the then method of that promise, if any, is immediately
  // ran, and the corresponding callback function for either the fulfilled state or
  // the rejected state is run. A fulfilled promise has a value, a rejected promise
  // has an error message.
  // The method Promise.resolve creates a promise that immediately resolves, i.e. fulfills.
  // Thus, if you run this code snippet:
  /*
  myPromise = Promise.resolve(5)
  myPromise.then((value) => {console.log(value)}, (errorMessage) => {console.log(errorMessage)})
  */
  // The value of the promise, i.e. 5, is immediately printed, with no delay. The then function
  // is indeed immediately run, since Promise.resolve returns a promise that immediately
  // fulfills!

  // (By the way, you are not required to end lines with semicolons, but it's considered good
  // practice)
  return Promise.resolve(3);
}

/**
 * 
 * EXERCISE 2
 * 
 * @returns {Promise<,"Boo!">}
 */
function makePromiseRejectWithBoo(){
  /* IMPLEMENT ME! */
  // A rejected promise always has an error message, here "Boo!". Promise.reject creates a
  // promise that is immediately rejected, thus the following code snippet also immediately
  // prints "ERROR":
  /*
  myPromise = Promise.reject("ERROR")
  myPromise.then((value) => {console.log(value)}, (errorMessage) => {console.log(errorMessage)})
  */

  return Promise.reject("Boo!");
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {boolean} itShouldResolve - Whether the promise should resolve or reject
 * @returns {Promise<undefined, undefined>}
 */

function makePromiseWithConstructor(itShouldResolve){
  // We won't often use the Promise constructor. What it does is that it creates a 
  // new Promise object, that takes one function as argument, that takes two functions
  // as argument, and the newly created Promise object immediately runs the function you passed
  // as argument.
  // Tom typed the pseudocode of this Promise constructor on my computer:
  /*
  class Promise {
    constructor(initFn) {
      let promise = ...
      let resolve = (val) => { ... }
      let reject = (err) => { ... }
      initFn(resolve, reject)
      return promise;
    }
  }
  */
  // This constructor creates a new promise object internally. Then, it creates the two functions that
  // it will pass as arguments to initFn (initFn is the function you gave as argument to the Promise
  // constructor!). The two functions passed to initFn are thus always the same, and created by
  // the Promise class itself. When they're run, they also modify the state of the promise object
  // to either fulfilled or rejected. initFn is actually run, and finally the promise object is returned.

  // Thus, the resolve function resolves the promise immediately, and the reject function rejects
  // the promise immediately. Again, we can try this out with the then method. Consider this code
  // snippet:
  /*
  function makePromiseWithConstructor(itShouldResolve) {
	return new Promise((resolve, reject) => {
      if (itShouldResolve) {
        resolve("FULFILLED");
      }
      else {
        reject("REJECTED");
      }
    })  
  }
  myPromise = makePromiseWithConstructor(true);
  myPromise.then((fulfillMessage) => {console.log(fulfillMessage)},
                (rejectMessage) => {console.log(rejectMessage)});
  */
  // The then method is again run immediately. With method makePromiseWithConstructor, we make a
  // Promise that immediately fulfills or resolves, depending on the argument you pass to it!

  return new Promise((resolve, reject) => {
    /* IMPLEMENT ME! */
    /* If itShouldResolve is true, call resolve */
    /* If itShouldResolve is false, call reject */
    if (itShouldResolve) {
      // Do NOT do Promise.resolve(undefinded). That is a static method of the Promise
      // class that creates a new Promise object and immediately resolves it. That is NOT
      // what we want here, we want to run the resolve function passed as argument to the 
      // function passed as argument to the new Promise object. The value that we resolve
      // with doesn't matter, it can be undefined. We thus create a Promise object with value undefined.
      resolve(undefined);
    }
    else {
      // Idem.
      reject(undefined);
    }
  });
}

/**
 * 
 * EXERCISE 4
 *
 * @param {any} value 
 * @param {number} delayInMs 
 * @return {Promise<any>} - A promise that will resolve with the value after delayInMs milliseconds
 */
function makeDelayPromise(value, delayInMs){
  /* IMPLEMENT ME! */
  /* Return a promise that resolves with the value after delayInMs */

  // We do the same as in the previous exercise, except that our promise always fulfills, never rejects,
  // and that it only fulfills/resolves after a delay of delayInMs milliseconds. To do this, we use the 
  // setTimeout method, that executes its first argument after the delay specified by its second argument.
  // Thus here, the then method only runs after delayInMs, because the returned promise by the function is
  // only fulfilled after delayInMs. Consider this code snippet:
  /*
  function makeDelayPromise(value, delayInMs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {resolve(value)}, delayInMs);
    })
  }
  myPromise = makeDelayPromise("FULFILLED", 10000);
  myPromise.then((fulfillMessage => {console.log(fulfillMessage)}));
  */
  // Here, the then method only prints "FULFILLED" after ten seconds!

  return new Promise((resolve, reject) => {
    // The first argument of setTimeout must be a function, not just resolve(value)!
    setTimeout(() => resolve(value), delayInMs);
  })
  
  // This doesn't work:
  /*
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }, delayInMs);
  */
  // It doesn't work because then a function call like makeDelayPromise("FULFILLED", 1000)
  // returns "undefined", because the promise is only created one second after this function
  // call!!!

  // This doesn't work, again because you use the static function Promise.resolve instead of the 
  // internal one of the Promise constructor!
  /*
  setTimeout(function() {
    //your code to be executed after 1 second
    return Promise.resolve(value);
  }, delayInMs);
  */

}

module.exports = {
  makePromiseResolveWith3,
  makePromiseRejectWithBoo,
  makePromiseWithConstructor,
  makeDelayPromise,
};