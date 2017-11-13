/**
* @module context
* @summary The Context class is the basic anchor for the most important attributes and methods to customize DOCUMENTS through PortalScripting. 
* @description There is exactly ONE implicit object of the class Context which is named context. The implicit object context is the root object in any script. With the context object you are able to access to the different DOCUMENTS objects like DocFile, Folder etc. Some of the attributes are only available under certain conditions. It depends on the execution context of the PortalScript, whether a certain attribute is accessible or not. For example, context.selectedFiles is available in a folder userdefined action script, but not in a script used as a signal exit. 
* Note: It is not possible to create objects of the class Context, since the context object is always available. 
**/
