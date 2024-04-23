import parseInseeCode from "../helper/parseInseeCode.js";

/**
 * Validation des codes insee
 * @param {String} value 
 */
var isCodeInsee = function(value){
    var inseeParts = parseInseeCode(value);
    return true;
};

export default isCodeInsee;