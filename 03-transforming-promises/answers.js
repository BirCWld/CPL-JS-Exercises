/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */
function mapPromise(promise, transformer){
  // Basically one of the points that this exercise tries to make, is that we don't just want to call then for
  // its side effects, but we also want to do something with the new promise returned by then.

  // THIS FUNCTION IS BASICALLY JUST THEN => See exercise 2!
  // then thus returns a new promise that rejects if the promise it was run on rejected or there was an error
  // while executing the callback function for the fulfilled case, and it returns a new promise that resolves if
  // the promise it was run on resolved, and as value the result of the callback function for the fulfilled case!
  // Consider these code snippets:
  /*
  myPromise = Promise.resolve(5);
  newPromise = myPromise.then((value) => {return value * value});
  newPromise.then((value) => {console.log(value)})
  */
  // In the code above, myPromise.then returns a new promise that resolves, since myPromise resolved too and the
  // function given to then didn't throw any errors. The value of the new promise newPromise is indeed the result
  // of calling the argument function of then on the value of myPromise!
  // Now consider this code:
  /*
  myPromise = Promise.reject("Oh no, an error!");
  newPromise = myPromise.then((value) => {return value * value}, (error) => {return error});
  newPromise.then((value) => {console.log(value)}, (error) => {console.log(error)});
  */
  // In the code above, the promise myPromise rejects with error message "Oh no, an error!". Thus, the then function
  // runs the callback function for the rejected case. The result of the then is a new promise newPromise, that will
  // also reject with the same error message as the promise that the then was run on, i.e. myPromise!
  return new Promise((resolve, reject) => {
    /* IMPLEMENT ME!! */
    // To determine whether the new promise we create must resolve or reject, we must look at whether the given
    // promise resolves or rejects.
    // If the given promise resolves ...:
    promise.then((resolveValue) => {
      // ..., we try to transform its value ...:
      try {
        // If you want to assign a local variable, you must use "let", otherwise you define a global variable!
        // Remark: it is not good practice to declare variables without keyword. It works, but it isn't good
        // practice. There are three keywords: var, const en let. Never use var, it is very outdated. Use const
        // whenever you don't need to change the value / binding of the variable, use let otherwise.
        const transformedValue = transformer(resolveValue);
        // ..., and if that succeeded, we resolve the newly created promise immediately with the new, transformed
        // value:
        resolve(transformedValue);
      }
      // ..., and if the transformer gives an error ...: 
      catch(transformerError) {
        // ..., we immediately reject the newly created promise with the error message:
        reject(transformerError);
      }
    },
    // If the given promise rejects ...:
    (errorReason) => {
      // ..., the newly created promise also rejects immediately:
      reject(errorReason);
    })
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise){
  // Here we use then instead of mapPromise!
  return numberPromise
    /* IMPLEMENT ME! */
    .then((resolveValue) => {
      // You can check the type of a variable with "typeof":
      if (typeof resolveValue === "number") {
        // If the promise numberPromise resolves, and this first callback is run, and parameter resolveValue
        // is a number, we return its square. In this case, then will return a new promise that also resolves,
        // but with as value the square of the value of numberPromise!
        return resolveValue ** 2;
      }
      // isNaN is a boolean function whose argument can be both a number or a string! To check if something
      // is a number, you can simply negate the result of isNaN! Putting a + in front of a numeric string
      // is an easy way to convert it to a number! More information about all of this can be found at:
      // https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
      if (typeof resolveValue === "string" && !isNaN(resolveValue)) {
        // If the promise numberPromise resolves, and this first callback is run, and parameter resolveValue
        // is a numeric string, we return its square. In this case, then will return a new promise that also resolves,
        // but with as value the square of the string value of numberPromise!
        return (+resolveValue) ** 2;
      }
      if (typeof resolveValue == "string" && isNaN(resolveValue)) {
        
        // The most convenient way to make sure that the promise returned by then is rejected, is to throw an error
        // message / string. Then, even though the promise numberPromise resolves, the promise returned by the then
        // will be rejected! It's error value / reason will be the string below. 

        // THUS, IF A PROMISE IS FULFILLED, IT IS STILL POSSIBLE THAT THE NEXT PROMISE IN THE CHAIN WOULD BE REJECTED!
        throw `Cannot convert '${resolveValue}' to a number!`;

        // This will throw an error, not just a string. In this case, the promise returned by then will also be rejected,
        // but that promise will have as error value the Error object defined below, NOT the string, and thus Tom's 
        // test code will fail!
        // throw new Error(`Cannot convert '${resolveValue}' to a number!`);
        
        // With this code, the promise returned by then will also be rejected, but again its error value won't be the
        // required string, but a new Promise object, which is quite odd!
        // return Promise.reject("OH NO")
      }
    },
    (errorReason) => {
      // In case the current promise rejects, the next one will too, with the same error message, so here, we again
      // use throw! "return errorReason" does NOT work!
      throw errorReason;
    });
}

/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(promise){
  return squarePromise(promise)
    .catch(/* IMPLEMENT ME! */);
}

/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
function switcheroo(promise){
  return promise.then(/* IMPLEMENT ME */);
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};