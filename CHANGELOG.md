## Changelog

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
