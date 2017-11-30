# jsdoc-tsd
## Warning
This project is currently in development.

## Installation
You can install this module from npm:
```
$> npm install jsdoc-tsd
```

## Usage
To use this module, simply specify this project as the template for your jsdoc output. To use this template from the command line, run
```
$> jsdoc -t node_modules/jsdoc-tsd -r .
```

You can also add this template to your JSON configuration file:
```
{
    "opts": {
        "template": "./node_modules/jsdoc-tsd"
    }
}
```

## Output directory / file
To determine the output directory and / or the output file name you can pass the path or the file name to the cmd call as follow:
```
$> jsdoc -d <target-dir>/<filename>.d.ts
```

**Important: If you want to change the file name of the result file your path has to end with the file ending ```d.ts```**

## Supported Tags
* @enum
* @function (implicitly)
* @method
* @memberof
* @namespace
* @typedef
* @class
* @member
* @ignore

## Ignored Tags
* @file

## Note
This jsdoc template was developed for my needs. There will be some updates in the future, but I don't know when.

Pull requests are welcome. But please test your changes.

This project is inspired by [jsdoc2tsd](https://github.com/englercj/tsd-jsdoc)
