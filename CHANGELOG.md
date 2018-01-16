## Changelog

# v0.8.6
New features in this release:
 - You can ignore private members by default by adding the property "ignorePrivateMembers"
   to the jsconfig.json

# v0.8.3
Bugfixes:
 - Not all supported items were added to their parent member

# v0.8.0
New features in this release:
 - You can outsource the since tag comparator function to an external file and pass that file instead of the string representation of the function
 - Constructors and functions can now be overloaded
 - Added support for the ```@classdesc``` tag

Bugfixes:
 - Module members will be exported by default, if the private-tag is not set
 - If the since-tag contains a two-digit number, the comparison was wrong. Now we use the module ```node-version-compare``` for the comparison
 - If an item was omitted because of the since tag, the members were be added still to the global namespace (if it doesn't failed). Now, the members of an omitted element will be omitted too

# v0.7.0
New features in this release:
 - Support for modules (only function and variable declarations)
 - Option to ignore specific scopes (see (README)[README.md])
 - Option to filter the output with the @since-Tag (see (README)[README.md])
 - Support for type parameters (parameters with properties)

Bugfixes:
 - Items, which were annotated with @ignore were not ignored
 - Fixed some log messages in error cases
 - Type ```function``` will no be mapped to ```Function```

### v0.6.0
New features in this release:
 - Support for multiple parameter types
 - The following tags are now supported
   - @ignore
   - @interface
 - Declaration and parameter flags are now fully supported (public, private, protected...)
 - You can pass the output path to jsdoc by passing the parameter "-d" to the cmd call
   (the usage is described in the [README](README.md#Output-directory-/-file))

Bugfixes:
 - The emitting of the results could abort with an uncaught exception. We now catch all uncaught
   exceptions and write the error to the console
 - Tags with multiple lines in the jsdoc description were not correctly parsed

Other changes:
 - Function return values, parameters etc. which have multiple types will now be resolved to union
   types

### v0.5.0
New features in this release:
 - For classes the constructor will be added now
 - Support for optional properties / parameters

### v0.4.0
New features in this release:
 - The template supports now the tag @class for generating class definitions
 - The template supports now the tag @member for class members, enum members etc.

Bugfixes:
 - Changed the log message for trying to add members to an unsupported member. Before, the log message
   was mistakenly 'Missing top level declaration 'XXX' for member 'XXX' ...'. 
