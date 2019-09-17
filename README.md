# jsdoc-tsd

## Installation
You can install this module from npm:
```
$> npm install @otris/jsdoc-tsd
```

## Usage
To use this module, simply specify this project as the template for your jsdoc output. To use this template from the command line, run
```
$> jsdoc -t node_modules/@otris/jsdoc-tsd -r .
```

You can also add this template to your JSON configuration file:
```
{
    "opts": {
        "template": "./node_modules/@otris/jsdoc-tsd"
    }
}
```

## Output directory / file
To determine the output directory and / or the output file name you can pass the path or the file name to the cmd call as follow:
```
$> jsdoc -d <target-dir>/<filename>.d.ts
```

**Important: If you want to change the file name of the result file your path has to end with the file ending ```d.ts```**

## Options
* **ignoreScopes** Array with scope names which should not be parsed. Possible values
```
[
    "global",
    "inner",
    "instance",
    "static"
]
```
* **latestVersion** If this option is passed, the since tag will be evaluated. Only elements which has the same or a smaller version will be emitted
* **versionComparator** String representation of a function to determine if an element should be emitted or not. This function can be used if the version informations for the ```@since``` annotation is not a valid semantic versioning tag. If the function is set and the ```@since``` tag is a valid semver tag, the comparator function will be used anyway.   
The function has to have the following signature:
```
/**
 * Determines if the tagged version is less or equal the latest version
 * @param {string} taggedVersion The value of the @since tag
 * @param {string} [latestVersion] The configured value, if passed
 * @returns {boolean} true, if the item should be emitted, otherwise false
 */
function versionComparator(taggedVersion, latestVersion) {

}
```
Alternatively you can pass a path to a javascript file which exports the comparator function like
```
module.exports = function(taggedVersion, latestVersion) {
    // do what you need to
}
```
* **ignoreSinceTag [=false]** Indicates wether to skip since tag check or not
* **logItemsSkippedBySince [=true]** Logs every item which is ignored by the since tag
* **skipUndocumented [=true]** Ignores undocumented items

## Supported Tags
* @enum
* @function (implicitly)
* @callback
* @method
* @memberof
* @namespace
* @typedef
* @class
* @classdesc
* @member
* @ignore
* @interface
* @since
* @module (function and variable declarations)
* @private (not completed yet)
* @const / @constant
* @this
* @hideconstructor
* @extends

## Supported typscript tags
* @template Note: You can write here any value you want, there will be no validation

## Ignored Tags
* @file

## Note
This jsdoc template was developed for my needs. There will be some updates in the future, but I don't know when.

Pull requests are welcome. But please test your changes.

This project is inspired by [jsdoc2tsd](https://github.com/englercj/tsd-jsdoc)
