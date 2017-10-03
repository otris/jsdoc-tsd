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

## Supported Tags
* @enum
* @function (implicitly)
* @memberof
* @namespace
* @typedef

## Ignored Tags
* @file

## Note
This jsdoc template was developed for my needs. There will be some updates in the future, but I don't know when.

Pull requests are welcome. But please test your changes.

This project is inspired by [jsdoc2tsd](https://github.com/englercj/tsd-jsdoc)