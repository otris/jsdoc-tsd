
/**
 * @namespace myModule_Namespace1
 * @memberof myModule
 */
var myModule_Namespace1 = (function () {

	/**
	 * Stupid enum member
	 * @enum {string}
	 * @memberof myModule.myModule_Namespace1
	 */
	var myStupidEnum = {
		/** Stupid enum value 1 */
		VAL1: "VAL1",

		/** Stupid enum value 2 */
		VAL2: "VAL2"
	};

	/**
	 * Executes some fancy commands
	 * @param {string|object} param1 Some string parameter
	 * @param {string[]} param2 Some string array
	 * @param {DocFile} param3 fgfg
	 * @returns {object} a fancy object
	 * @memberof myModule.myModule_Namespace1
	 */
	function function1(param1, param2, param3) {

	}

	return {
		function1: function1,
		myStupidEnum
	};

})();
