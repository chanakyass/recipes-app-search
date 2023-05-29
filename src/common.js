/**
 * Returns the sum of a and b
 * @returns {Array} Sum of a and b or an array that contains a, b and the sum of a and b.
 */

const findDeepPropValueInObj = (propNameLL, obj) => {
  let resVal = obj;
  for (let i = 0; i < propNameLL.length; i++) {
    const propName = propNameLL[i];
    if (Array.isArray(resVal)) {
      resVal = resVal.map(arrayVal => arrayVal[propName]);
    }
    else if (resVal?.hasOwnProperty(propName)) {
      resVal = resVal[propName];
    } else {
      resVal = undefined;
      break;
    }
  }
  return resVal;
}

/**
 * Returns the sum of a and b
 * @returns {Array} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
 export const findItemsInArrayWithGivenPropValues = (propName, searchArray, arrayToSearch) => {
    if (!searchArray) {
      return arrayToSearch;
    }

    let searchArrayUpdated;
    let searchForString = false;
    if (searchArray.some(arrVal => (typeof arrVal === 'string'))) {
      searchArrayUpdated = searchArray.map(arrVal => arrVal.toLowerCase());
      searchForString = true;
    }
    else {
      searchArrayUpdated = searchArray;
    }
    
    let propNameLL;
    if (propName.includes('.')) {
      propNameLL = propName.split('.')
    }
    return arrayToSearch.filter((item) => {
      const propValue = propName.includes('.') ? findDeepPropValueInObj(propNameLL, item) : item[propName];
      if (Array.isArray(propValue)) {
        return propValue.some((someVal) => searchArray.includes(searchForString ? someVal.toLowerCase() : someVal));
      }
      return searchArrayUpdated.includes(searchForString ? propValue.toLowerCase() : propValue);
    });
  };