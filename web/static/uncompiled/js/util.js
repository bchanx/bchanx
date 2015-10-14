/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

/**
 * Check if obj is a string.
 */
function isString(obj) {
  return typeof obj === 'string';
}

/**
 * Check if obj is an {object}.
 */
function isObject(obj) {
  return !!obj && obj.constructor === Object;
}

/**
 * Check if obj is an [array].
 */
function isArray(obj) {
  return !!obj && obj.constructor === Array;
}

/**
 * Check if obj is a function().
 */
function isFunction(obj) {
  return !!obj && typeof obj === 'function';
}

/**
 * Check if obj is /regex/.
 */
function isRegex(obj) {
  return !!obj && obj.constructor === RegExp;
}

/**
 * Check if obj is an empty {object}.
 */
function isEmpty(obj) {
  for (var prop in obj) if (obj.hasOwnProperty(prop)) return false;
  return true;
}

/**
 * Merge all properties from {arguments} to {obj} if it's not yet defined.
 */
function extend(obj /* arg1, arg2.. */) {
  for (var i = 1, arg; arg = arguments[i]; i++) for (var a in arg) if (obj[a] === undefined) obj[a] = arg[a];
  return obj;
}

/**
 * Traverse [keys] in {object} to lookup a value, or null if nothing found.
 */
function lookup(obj, keys) {
  var result = obj;
  for (var k in keys) {
    if (!result.hasOwnProperty(keys[k])) return null;
    result = result[keys[k]];
  }
  return (result === obj) ? null : result;
}

