/**
* @class AccessProfile
* @summary The AccessProfile class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS access profiles by scripting means. 
* @description A SystemUser can be assigned to an AccessProfile. At the filetype it is possible to define several rights depending on the AccessProfile. You can get an AccessProfile object by different methods like Context.findAccessProfile(String ProfileName) or from the AccessProfileIterator. 
**/
/**
* @memberof AccessProfile
* @summary The technical name of the AccessProfile. 
* @member {string} name
* @instance
**/
/**
* @memberof AccessProfile
* @summary Access to the property cache of the AccessProfile. 
* @member {PropertyCache} propCache
* @instance
**/
/**
* @memberof AccessProfile
* @constructor AccessProfile
* @summary With the new method is it possible to create a new AccessProfile. 
* @description If a access profile with the profile name already exist, the method return the existing access profile. 
* @param {string} nameAccessProfile 
* @returns {AccessProfile} The new created AccessProfile object. If the creation fails, the method returns NULL.
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @deprecated since ELC 3.60i / otrisPORTAL 6.0i use Context.createAccessProfile() instead 
* @example
* var newAP = new AccessProfile("supportteam");
* if (!newAP)
*    util.out("Creation of AccessProfile failed.");
**/
/**
* @memberof AccessProfile
* @function addCustomProperty
* @instance
* @summary Creates a new CustomProperty for the AccessProfile. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 5.0
* @see [AccessProfile.setOrAddCustomProperty]{@link AccessProfile#setOrAddCustomProperty} 
* @see [AccessProfile.getCustomProperties]{@link AccessProfile#getCustomProperties} 
* @example
* var office = context.findAccessProfile("office");
* if (!office) throw "office is null";
* 
* var custProp = office.addCustomProperty("favorites", "string", "peachit");
* if (!custProp)
*   util.out(office.getLastError());
**/
/**
* @memberof AccessProfile
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the AccessProfile. 
* @description Note: This function is only for experts. Knowledge about the ELC-database schema is necessary! 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof AccessProfile
* @function getCustomProperties
* @instance
* @summary Get a CustomPropertyIterator with custom properties of the current AccessProfile. 
* @param {string} nameFilter String value defining an optional filter depending on the name 
* @param {string} typeFilter String value defining an optional filter depending on the type 
* @returns {CustomPropertyIterator} CustomPropertyIterator
* @since DOCUMENTS 5.0
* @see [Context.findCustomProperties]{@link Context#findCustomProperties} 
* @see [AccessProfile.setOrAddCustomProperty]{@link AccessProfile#setOrAddCustomProperty} 
* @see [AccessProfile.addCustomProperty]{@link AccessProfile#addCustomProperty} 
* @example
* var office = context.findAccessProfile("office");
* if (!office) throw "office is null";
* 
* var itProp = office.getCustomProperties();
* for (var prop = itProp.first(); prop; prop = itProp.next())
* {
*    util.out(prop.name + ": " + prop.value);
* }
**/
/**
* @memberof AccessProfile
* @function getLastError
* @instance
* @summary If you call a method at an AccessProfile object and an error occurred, you can get the error description with this function. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof AccessProfile
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof AccessProfile
* @function getSystemUsers
* @instance
* @summary Retrieve a list of all SystemUser which are assigned to the current AccessProfile. 
* @returns {SystemUserIterator} SystemUserIterator containing a list of SystemUser
* @since ELC 3.51e / otrisPORTAL 5.1e 
* @example
* var ap = context.findAccessProfile("supportteam");
* if (ap)
* {
*    var itSU = ap.getSystemUsers();
*    for (var su = itSU.first(); su; su = itSU.next())
*       util.out(su.login);
* }
* else
*    util.out("AccessProfile does not exist.");
**/
/**
* @memberof AccessProfile
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the AccessProfile to the desired value. 
* @description Note: This function is only for experts. Knowledge about the ELC-database schema is necessary! 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof AccessProfile
* @function setOrAddCustomProperty
* @instance
* @summary Creates a new CustomProperty or modifies a CustomProperty according the name and type for the AccessProfile. 
* @description This method creates or modifies a unique CustomProperty for the AccessProfile. The combination of the name and the type make the CustomProperty unique for the AccessProfile. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 5.0
* @see [AccessProfile.getCustomProperties]{@link AccessProfile#getCustomProperties} 
* @see [AccessProfile.addCustomProperty]{@link AccessProfile#addCustomProperty} 
* @example
* var office = context.findAccessProfile("office");
* if (!office) throw "office is null";
* 
* var custProp = office.setOrAddCustomProperty("favorites", "string", "peachit");
* if (!custProp)
*   util.out(office.getLastError());
**/
/**
* @interface AccessProfileIterator
* @summary The AccessProfileIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS access profiles by scripting means. 
* @description The objects of this class represent lists of AccessProfile objects and allow to loop through such a list of profiles. The following methods return an AccessProfileIterator: Context.getAccessProfiles(), SystemUser.getAccessProfiles(). 
**/
/**
* @memberof AccessProfileIterator
* @function first
* @instance
* @summary Retrieve the first AccessProfile object in the AccessProfileIterator. 
* @returns {AccessProfile} AccessProfile or null in case of an empty AccessProfileIterator
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof AccessProfileIterator
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof AccessProfileIterator
* @function next
* @instance
* @summary Retrieve the next AccessProfile object in the AccessProfileIterator. 
* @returns {AccessProfile} AccessProfile or null if end of AccessProfileIterator is reached. 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof AccessProfileIterator
* @function size
* @instance
* @summary Get the amount of AccessProfile objects in the AccessProfileIterator. 
* @returns {number} integer value with the amount of AccessProfile objects in the AccessProfileIterator
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @class ArchiveConnection
* @summary The ArchiveConnection class allows low level access to the EAS Interface, EBIS and the EASY ENTERPRISE XML-Server. 
**/
/**
* @memberof ArchiveConnection
* @summary String value containing the version of the archive interface. 
* @member {string} id
* @instance
**/
/**
* @memberof ArchiveConnection
* @function downloadBlob
* @instance
* @summary Download an attachment from the XML-Server. 
* @description With this method you can download an attachment from the EASYWARE ENTERPRISE archive using the XML-Server. The method returns an object of the class ArchiveConnectionBlob. This object allows you to access the attachment. If the method fails the return value is NULL. You can retrieve the error message by executing ArchiveConnection.getLastError(). 
* Note: Method is only available for EE.x using XML-Server 
* @param {string} fileKey String containing the key of the file 
* @param {string} docKey String containing the key of the attachment 
* @returns {ArchiveConnectionBlob} ArchiveConnectionBlob or NULL, if failed 
* @since ELC 3.60h / otrisPORTAL 6.0h
* @example
* var xmlserver = context.getArchiveConnection();
* if (xmlserver)
* {
*    var fileKey = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2"
*    var docKey = "41D3695F2B1E11DD8A9A000C29FACDC2"
*    var path = xmlserver.downloadBlob(fileKey, docKey);
*    if (!res)
*       util.out(xmlserver.getLastError());
*    else
*       util.out(res.localPath)
* }
**/
/**
* @memberof ArchiveConnection
* @function downloadBlobs
* @instance
* @summary Download multiple attachments from the XML-Server. 
* @description This method allows downloading multiple attachments from the EASYWARE ENTERPRISE archive using the XML-Server. The method returns an object of the class ArchiveConnectionBlobIterator. This object allows you to access the attachments. If the method fails the return value is NULL. You can retrieve the error message by executing ArchiveConnection.getLastError(). 
* Note: Method is only available for EE.x using XML-Server 
* @param {string} fileKey String Array containing the keys of the files 
* @param {string} docKey String Array containing the keys of the attachments 
* @returns {ArchiveConnectionBlobIterator} ArchiveConnectionBlobIterator or NULL, if failed 
* @since ELC 3.60h / otrisPORTAL 6.0h
* @example
* var fileKeys = new Array();
* var docKeys = new Array();
* 
* var fileKey1 = "Unit=Default/Instance=Defaul...";
* var docKey1 = "41D3695F2B1E11DD8A9A000C29FACDC2";
* var fileKey2 = "Unit=Default/Instance=Defaul...";
* var docKey2 = "28CDB49ECE1B11DB9FC3000C29FACDC2";
* 
* fileKeys[0] = fileKey1;
* docKeys[0] = docKey1;
* fileKeys[1] = fileKey2;
* docKeys[1] = docKey2;
* 
* var itArchDoc = xmlserver.downloadBlobs(fileKeys, docKeys);
* if (!itArchDoc)
* {
*    util.out(xmlserver.getLastError())
*    return -1;
* }
* 
* for (var archDoc=itArchDoc.first(); archDoc; archDoc=itArchDoc.next())
* {
*    util.out(archDoc.name);
*    util.out(archDoc.localPath);
* }
**/
/**
* @memberof ArchiveConnection
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.60h / otrisPORTAL 6.0h 
**/
/**
* @memberof ArchiveConnection
* @function putBlob
* @instance
* @summary Upload an attachment to the XML-Server. 
* @param {Document} doc 
* @param {string} blobreference 
* @returns {boolean} 
**/
/**
* @memberof ArchiveConnection
* @function queryRawEEx
* @instance
* @summary Sends a query EQL to the EE.x XML-Server and returns the response XML. 
* @description With this method you can send a query EQL to the XML-Server of EASY ENTERPRISE.x If the method succeed the return value is the response-xml, otherwise it returns NULL. If the value is NULL you can retrieve the error message by executing ArchiveConnection.getLastError()
* Note: Method is only available for EE.x using XML-Server 
* @param {string} eql String containing the EQL 
* @param {number} wantedHits Int with the number of currently wanted hits (optional) 
* @param {number} maxHits Int with the max. number of hits, that the ArchiveConnection should respond (optional) 
* @returns {string} String with the response (xml) or NULL in case of any error 
* @since ELC 3.60h / otrisPORTAL 6.0h
* @example
* var xmlserver = context.getArchiveConnection();
* if (xmlserver)
* {
*    var eql = "SELECT @Finance.Type FROM @Finance WHERE isnewestversion(FIBU) ORDER BY FIBU.BUCHUNGSTYP ASC";
*    var res = xmlserver.queryRawEEx(eql);
*    if (!res)
*       util.out(xmlserver.getLastError());
*    else
*       util.out(res);
*  }
**/
/**
* @memberof ArchiveConnection
* @function sendEbisRequest
* @instance
* @summary Sends a request to the EBIS interface and returns the response. 
* @description With this method you can send a GET or a POST request to an EBIS interface. If the request succeeds, the return value is the HTTP-content of the response. Otherwise the function returns an empty String. Call ArchiveConnection.getLastError() subsequently to test for eventual errors. If the interface reports an error, it will be prefixed with "[EBIS] ". 
* Remark: The function is unable to handle a response with binary data. The function does not check the parameters for illegal characters, such as linefeeds in the extraHeaders, for example. 
* Note: Method is only available for EBIS 
* @param {string} resourceIdentifier String containing the REST resource identifier (in other words: the back part of the URL). 
* @param {string} postData A optional String with content data of a HTTP-POST request. If the parameter is missing or empty, the function generates a GET request. 
* @param {string[]} extraHeaders A optional Array of Strings with an even number of elements. The first element of each pair must contain the name, the second one the value of an additional HTTP header element. 
* @returns {string} A String with the response. This may be an XML or plain text. It depends on the request. 
* @since DOCUMENTS 5.0a
* @example
* //
* // Example for GET
* //
* var ebisConn = context.getArchiveConnection("ebisStore1");
* if (ebisConn)
* {
*   var factoryInfo = ebisConn.sendEbisRequest("/factory");
*   var eText = ebisConn.getLastError();
*   if(eText == "")
*     util.out(factoryInfo);
*   else
*     util.out(eText);
* }
* 
* 
* //
* // Example for POST (do a query on EBIS with JSON)
* //
* var req = {};
* req.maxHits = 250;
* req.pageSize = 20;
* req.unformattedResult = true;
* req.includeTextmarkers = true;
* 
* // search sources
* req.sources = ["Unit=Default/Instance=Default/View=Store01"];
* 
* // hitlist fields
* req.fields = [];
* req.fields.push({field: "TITLE", sort: "NONE"})
* req.fields.push({field: "MODIFIED_DATE", sort: "NONE"})
* req.fields.push({field: "_type", sort: "NONE"})
* 
* // search condition: all files of filetype "Simple"
* req.conditions = {};
* req.conditions.type = "set";
* req.conditions.conditions = [{type : "compare", field : "_type", value : "Simple", or : true, not : false}];
* 
* var json = JSON.stringify(req);
* 
* var archiveServer = context.getArchiveServer("ebisStore1");
* var ebisConn = archiveServer.getArchiveConnection();
* 
* var headers = ["Content-Type", "application/json"];
* var res = ebisConn.sendEbisRequest("/search", json, headers);
* util.out(res);
* 
* => EBIS returns query id  { id : "8c31d9352240a1c507d8d5f163e49085", columns : [ ], infos : [ ], executed : false }
**/
/**
* @memberof ArchiveConnection
* @function sendRequest
* @instance
* @summary Sends a request to the ArchiveConnection and returns the response XML. 
* @description With this method you can send a request to the XML-Server of EASY ENTERPRISE. If the method succeeds the return value is the response-xml, otherwise it returns NULL. If the value is NULL you can retrieve the error message by executing ArchiveConnection.getLastError()
* Note: Method is only available for EE.x using XML-Server 
* @param {string} request String containing the request 
* @returns {string} an String with the response (xml) or NULL in case of any error 
* @since ELC 3.60h / otrisPORTAL 6.0h
* @example
* var xmlserver = context.getArchiveConnection();
* if (xmlserver)
* {
*    var req = "<INFO REQUESTID=\"1\"/>";
*    var res = xmlserver.sendRequest(req);
*    if (!res)
*       util.out(xmlserver.getLastError());
*    else
*       util.out(res);
*  }
**/
/**
* @interface ArchiveConnectionBlob
* @summary The ArchiveConnectionBlob class provides access to each single attachment of files in the archive. 
* @description This class holds data like name, extension, size etc. of attachments in the archive. The existance of an object means, that an attachment exists in the archive. If you want to access the attachment (blob) itself in the PortalServer, you have to download the attachment from the archive with the ArchiveConnectionBlob.download() method. Then the attachment will be transferred to the PortalServer machine (localPath). 
* Note: You can not create objects of this class. Objects of this class are available only as return value of other functions, e.g. ArchiveConnection.downloadBlob(String fileKey, String docKey). 
* Note: Class is only available for an ArchiceConnection to a XML-Server 
**/
/**
* @memberof ArchiveConnectionBlob
* @summary Integer containing the filesize of an attachment in the archive. 
* @member {number} bytes
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary String containing the key of the attachment in the archive. 
* @member {string} docKey
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary boolean that indicates whether an attachment of the archive is locally available at the PortalServer. 
* @description If the attachment in the archive is locally available at the PortalServer's file system, this value is true.
* @member {boolean} downloaded
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary String containing the key of the file the attachment belongs to in the archive. 
* @member {string} fileKey
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary String with the local path to the attachment (blob). 
* @description This path is only available if the attribute ArchiveConnectionBlob.downloaded is true
* @member {string} localPath
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary String containing the mime-type of an attachment in the archive. 
* @member {string} mimeType
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary String containing the name of the attachment in the archive. 
* @member {string} name
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @summary String containing the filesize of an attachment in the archive. 
* @member {string} size
* @instance
**/
/**
* @memberof ArchiveConnectionBlob
* @function download
* @instance
* @summary Download the attachment to the PortalServer's machine (localPath) 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.60h / otrisPORTAL 6.0h
* @example
* var archFile = .....
* if (!archFile.downloaded)
* {
*     var res = archFile.download();
*     if (!res)
*        util.out(archFile.getLastError());
*     else
*        util.out(archFile.localPath);
* }
**/
/**
* @memberof ArchiveConnectionBlob
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.60h / otrisPORTAL 6.0h 
**/
/**
* @interface ArchiveConnectionBlobIterator
* @summary The ArchiveConnectionBlobIterator class is an iterator that holds a list of objects of the class ArchiveConnectionBlob. 
* @description You may access ArchiveConnectionBlobIterator objects by the ArchiveConnection.downloadBlobs() method described in the ArchiceConnection chapter. 
* Note: Class is only available for an ArchiceConnection to a XML-Server 
**/
/**
* @memberof ArchiveConnectionBlobIterator
* @function first
* @instance
* @summary Retrieve the first ArchiveConnectionBlob object in the ArchiveConnectionBlobIterator. 
* @returns {ArchiveConnectionBlob} ArchiveConnectionBlob or null in case of an empty ArchiveConnectionBlobIterator
* @since ELC 3.60h / otrisPORTAL 6.0h 
**/
/**
* @memberof ArchiveConnectionBlobIterator
* @function next
* @instance
* @summary Retrieve the next ArchiveConnectionBlob object in the ArchiveConnectionBlobIterator. 
* @returns {ArchiveConnectionBlob} ArchiveConnectionBlob or NULL if end of ArchiveConnectionBlobIterator is reached 
* @since ELC 3.60h / otrisPORTAL 6.0h 
**/
/**
* @memberof ArchiveConnectionBlobIterator
* @function size
* @instance
* @summary Get the amount of ArchiveConnectionBlob objects in the ArchiveConnectionBlobIterator. 
* @returns {number} integer value with the amount of ArchiveConnectionBlob objects in the ArchiveConnectionBlobIterator
* @since ELC 3.60h / otrisPORTAL 6.0h 
**/
/**
* @class ArchiveFileResultset
* @summary The ArchiveFileResultset class supports basic functions to loop through a list of ArchiveFile objects. 
**/
/**
* @memberof ArchiveFileResultset
* @constructor ArchiveFileResultset
* @summary Create a new ArchiveFileResultset object. 
* @description Like in other programming languages you create a new object with the new operator (refer to example below). 
* Note: Important: The resultset may contain less hits than really exist. For EE.i and EE.x the limit of returned hits is the value of the DOCUMENTS property "MaxArchiveHitsFolder". If the property is not set, the limit is the XML-Server's default hit count. For EAS, The limit is either the "MaxArchiveHitsFolder" value or the limit of free research hitlists. The method is the same for dynamic folders and link-registers. 
* @param {string} archiveKey String containing the key of the desired view or archive 
* @param {string} filter String containing an filter criterium; use empty String ('') if you don't want to filter at all 
* @param {string} sortOrder String containing an sort order; use empty String ('') if you don't want to sort at all 
* @param {string} hitlist String containing the hitlist that you want to use (optional fÃ¼r EE.i / mandatory for EE.x 
* @param {boolean} unlimitedHits boolean that indicates if the archive hit limit must be ignored 
* @returns {ArchiveFileResultset} 
* @since ELC 3.60i / otrisPORTAL 6.0i
* @example
* // Example for EE.i:
* var archiveKey = "$(#STANDARD)\\EINRECH";
* archiveKey += "@myeei";            // since Documents 4.0 using multi archive server
* var filter = "Kreditor='ALFKI'";
* var sortOrder = "BelegNr+";
* var hitlist = "STANDARD";
* var myAFRS = new ArchiveFileResultset(archiveKey, filter, sortOrder, hitlist);
* var archFile = null;
* while (true)
* {
*    try
*    {
*       archFile = archFile ? myAFRS.next() : myAFRS.first();
*       if (!archFile) // end of ArchiveFileResultset
*          break;
* 
*       util.out(archFile.getArchiveKey());
*    }
*    catch (err)
*    {
*       util.out("Unable to load archFile: " + err);
*    }
* }
* @example
* // Example for EE.x:
* var archiveKey = "Unit=Default/Instance=Default/View=Scanners";
* archiveKey += "@myeex";            // since Documents 4.0 using multi archive server
* var filter = "Speed=10";
* var sortOrder = "";
* var hitlist = "Default";
* var myAFRS = new ArchiveFileResultset(archiveKey, filter, sortOrder, hitlist);
* @example
* // Example for EAS:
* var archiveKey = "Order";
* archiveKey += "@myeas";            // since Documents 4.0 using multi archive server
* var filter = "company=A*";
* var sortOrder = "company+";
* var myAFRS = new ArchiveFileResultset(archiveKey, filter, sortOrder);
**/
/**
* @memberof ArchiveFileResultset
* @function first
* @instance
* @summary Retrieve the first DocFile object in the ArchiveFileResultset. 
* @returns {DocFile} DocFile, null in case of an empty ArchiveFileResultset, throws an exception on error loading archive file. 
* @since ELC 3.60i / otrisPORTAL 6.0i 
**/
/**
* @memberof ArchiveFileResultset
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.60i / otrisPORTAL 6.0i 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof ArchiveFileResultset
* @function last
* @instance
* @summary Retrieve the last DocFile object in the ArchiveFileResultset. 
* @returns {DocFile} DocFile or null if end of ArchiveFileResultset is reached. 
* @since ELC 3.60j / otrisPORTAL 6.0j 
**/
/**
* @memberof ArchiveFileResultset
* @function next
* @instance
* @summary Retrieve the next DocFile object in the ArchiveFileResultset. 
* @returns {DocFile} DocFile, null if end of ArchiveFileResultset is reached, throws an exception on error loading archive file. 
* @since ELC 3.60i / otrisPORTAL 6.0i 
**/
/**
* @memberof ArchiveFileResultset
* @function size
* @instance
* @summary Get the amount of DocFile objects in the ArchiveFileResultset. 
* @returns {number} integer value with the amount of DocFile objects in the ArchiveFileResultset
* @since ELC 3.60i / otrisPORTAL 6.0i 
**/
/**
* @class ArchiveServer
* @summary The ArchiveServer class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS ArchiveServer by scripting means. 
**/
/**
* @memberof ArchiveServer
* @summary The technical name of the ArchiveServer. 
* @member {string} name
* @instance
**/
/**
* @memberof ArchiveServer
* @function getArchiveConnection
* @instance
* @summary Retrieve the archive connection object for EAS, EBIS or EASY Enterprise XML-Server. 
* @description The ArchiveConnection object can be used for low level call directly on the archive interface. 
* @returns {ArchiveConnection} ArchiveConnection object if successful, NULL in case of any error 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServer
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the ArchiveServer. 
* @description Note: This function is only for experts. Knowledge about the DOCUMENTS-database schema is necessary! 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServer
* @function getLastError
* @instance
* @summary If you call a method at an ArchiveServer object and an error occurred, you can get the error description with this function. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServer
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServer
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the ArchiveServer to the desired value. 
* @description Note: This function is only for experts. Knowledge about the DOCUMENTS-database schema is necessary! 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServer
* @function submitChanges
* @instance
* @summary After changes on the ArchiveServer with scripting methods, it is necessary to submit them to make them immediately valid. 
* @description The settings of the ArchiveServer will be cached in a connection pool to the archive system. The pool does not recognize changes in the ArchiveServer object automatically, therefore it is necessary to call this method after all.
* @returns {void} 
**/
/**
* @class ArchiveServerIterator
* @summary The ArchiveServerIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS ArchiveSerevrby scripting means. 
**/
/**
* @memberof ArchiveServerIterator
* @function first
* @instance
* @summary Retrieve the first ArchiveServer object in the ArchiveServerIterator. 
* @returns {AccessProfile} ArchiveServer or null in case of an empty ArchiveServerIterator
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServerIterator
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServerIterator
* @function next
* @instance
* @summary Retrieve the next ArchiveServer object in the ArchiveServerIterator. 
* @returns {AccessProfile} ArchiveServer or null if end of ArchiveServerIterator is reached. 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof ArchiveServerIterator
* @function size
* @instance
* @summary Get the amount of ArchiveServer objects in the ArchiveServerIterator. 
* @returns {number} integer value with the amount of ArchiveServer objects in the ArchiveServerIterator
* @since DOCUMENTS 5.0a 
**/
/**
* @class ArchivingDescription
* @summary The ArchivingDescription class has been added to the DOCUMENTS PortalScripting API to improve the archiving process of DOCUMENTS files by scripting means. 
* @description For instance this allows to use different target archives for each file as well as to influence the archiving process by the file's contents itself. The ArchivingDescription object can only be used as parameter for the method DocFile.archive(ArchivingDescription)
* Note: By default, archiving with an ArchivingDescription does not include any attachments. To archive some attachments, the script needs to call addRegister() on this object. 
**/
/**
* @memberof ArchivingDescription
* @summary boolean value whether to archive the monitor of the file. 
* @description Like on the filetype in the Portal Client you may decide whether you want to archive the monitor of the file along with the file. If so, the file's monitor will be transformed to a HTML file named monitor.html, and it will be part of the archived file in the desired target archive. 
* @member {boolean} archiveMonitor
* @instance
**/
/**
* @memberof ArchivingDescription
* @summary String containing the name of the archive server in a multi archive server environment. 
* @member {string} archiveServer
* @instance
**/
/**
* @memberof ArchivingDescription
* @summary boolean value whether to archive the status of the file. 
* @description Like on the filetype in the Portal Client you may decide whether you want to archive the status of the file along with the file. If so, the file's status will be transformed to a HTML file named status.html, and it will be part of the archived file in the desired target archive. 
* @member {boolean} archiveStatus
* @instance
**/
/**
* @memberof ArchivingDescription
* @summary String containing the complete address of the target archive for archiving to EE.i. 
* @description You need to define the target archive including the "Storageplace". 
* Note: This value has only to be set if you want to archive to EE.i. If you want to archive to EE.x, you have to set targetView and targetSchema. It is important to know that the target archive String must use the socalled XML-Server syntax. It is as well neccessary to use a double backslash (\\) if you define your target archive as an PortalScript String value, because a single backslash is a special character. 
* @member {string} targetArchive
* @instance
**/
/**
* @memberof ArchivingDescription
* @summary String containing the complete address of the target schema used for archiving to EE.x. 
* @description You need to define the target schema you want to archive into. 
* Note: This value has only to be set if you want to archive to EE.x. 
* @member {string} targetSchema
* @instance
**/
/**
* @memberof ArchivingDescription
* @summary String containing the complete address of the target view used for archiving to EE.x. 
* @description You need to define the target view (write pool) you want to archive into. 
* Note: This value has only to be set if you want to archive to EE.x. 
* @member {string} targetView
* @instance
**/
/**
* @memberof ArchivingDescription
* @summary boolean value whether to use the versioning technique in the archive. 
* @description If the DocFile has already been archived and if you define this attribute to be true, a new version of the archive file will be created otherwise a independent new file in the archive will be created. 
* @member {boolean} versioning
* @instance
**/
/**
* @memberof ArchivingDescription
* @function addRegister
* @instance
* @summary flag an additional (document) register to be archived with the file. 
* @description You may add the technical names of different document registers to an internal list of your ArchivingDescription object. This allows for example to archive only part of your documents of your DocFile. 
* @param {string} registerName String containing the technical name of the register to be archived. Pass "all_docs" to archive all attachments of your DocFile. 
* @returns {void} 
* @since EE.i: ELC 3.51c / otrisPORTAL 5.1c 
* @since EE.x: ELC 3.60a / otrisPORTAL 6a 
* @since EAS: ELC 4 / otrisPORTAL 7
* @example
* var docFile = context.file;
* var ad = new ArchivingDescription();
* ad.targetArchive = "$(#DEMO)\\BELEGE";
* ad.addRegister("Documents");
* ad.addRegister("InternalDocuments");
* docFile.archive(ad);
**/
/**
* @memberof ArchivingDescription
* @constructor ArchivingDescription
* @summary Create a new ArchivingDescription object. 
* @description Like in other programming languages you create a new object with the new operator (refer to example below). 
* @returns {ArchivingDescription} ArchivingDescription which allows to define several conditions for the archiving process of a certain DocFile object 
* @since EE.i: ELC 3.51c / otrisPORTAL 5.1c 
* @since EE.x: ELC 3.60a / otrisPORTAL 6a 
* @since EAS: ELC 4 / otrisPORTAL 7
* @see [DocFile.archive]{@link DocFile#archive} 
* @example
* // Example for EE.i:
* var docFile = context.file;
* if (!docFile)
* {
*    // error handling
* }
* var ad = new ArchivingDescription();
* ad.targetArchive = "$(#DEMO)\\BELEGE";
* ad.archiveServer = "myeei";  // since Documents 4.0 using multi archive server
* // Note: This example does not archive any attachments
* var success = docFile.archive(ad);
* if (!success)
* {
*    util.out(docFile.getLastError());
* }
* @example
* // Example for EE.x:
* var docFile = context.file;
* if (!docFile)
* {
*    // error handling
* }
* var ad = new ArchivingDescription();
* ad.targetView = "Unit=Default/Instance=Default/View=DeliveryNotes";
* ad.targetSchema = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
* ad.archiveServer = "myeex";  // since Documents 4.0 using multi archive server
* ad.archiveMonitor = true;
* // Note: This example does not archive any attachments
* var success = docFile.archive(ad);
* if (!success)
* {
*    util.out(docFile.getLastError());
* }
* @example
* // Example for EAS:
* var docFile = context.file;
* if (!docFile)
* {
*    // error handling
* }
* var ad = new ArchivingDescription();
* ad.archiveServer = "myeas";
* ad.archiveMonitor = true;
* // Note: This example does not archive any attachments
* var success = docFile.archive(ad);
* if (success)
*    util.out(docFile.getArchiveKey());
* else
*    util.out(docFile.getLastError());
**/
/**
* @memberof module:context
* @summary Id of the client / thread which is the execution context of the script. 
* @description This property is helpful to identify the clients at scripts running concurrently (for debugging purposes). 
* Note: This property is readonly.
* @member {string} clientId
* @instance
**/
/**
* @memberof module:context
* @summary Login of the user who has triggered the script execution. 
* @description If the script is running e.g. as action in the workflow the user is the logged in user, who has initiated the action. 
* Note: This property is readonly.
* @member {string} currentUser
* @instance
**/
/**
* @memberof module:context
* @summary Document object representing the current document that the script is executed at. 
* @description Note: This property is readonly. If the script is not executed in a document context then the return value is null. 
* @member {Document} document
* @instance
**/
/**
* @memberof module:context
* @summary Error message text to be returned by the script. 
* @description The error message will be displayed as Javascript alert box in the web client if the script is called in context of a web client. 
* Note: You can get and set this property. 
* @member {string} errorMessage
* @instance
**/
/**
* @memberof module:context
* @summary Event which triggered the script execution. 
* @description According to the context where the portal script has been called this property contains a key name for this event. 
* 
* 
* The following events are available: 
* <ul>
* <li>"afterMail"</li>
* <li>"afterSave"</li>
* <li>"attributeSetter"</li>
* <li>"autoText"</li>
* <li>"condition"</li>
* <li>"custom"</li>
* <li>"fileAction"</li>
* <li>"folderAction"</li>
* <li>"moveTrash"</li>
* <li>"newFile"</li>
* <li>"onAutoLogin"</li>
* <li>"onArchive"</li>
* <li>"onDelete"</li>
* <li>"onDeleteAll"</li>
* <li>"onEdit"</li>
* <li>"onLogin"</li>
* <li>"onSave"</li>
* <li>"test"</li>
* <li>"workflow"</li>
* </ul>
* 
* Note: This property is readonly.
* @member {string} event
* @instance
**/
/**
* @memberof module:context
* @summary DocFile object representing the current file that the script is executed at. 
* @description Note: This property is readonly. If the script is not executed in a file context then the return value is null. 
* @member {DocFile} file
* @instance
**/
/**
* @memberof module:context
* @summary Technical name of the filetype of the file which is the execution context of the script. 
* @description This property contains the technical name of the filetype of the file which is the execution context of the script. 
* Note: This property is readonly. 
* @member {string} fileType
* @instance
**/
/**
* @memberof module:context
* @summary FileResultset with all files of a folder. 
* @description This property allows to retrieve a list of all files of a folder if this script is run as user defined action at the folder. You can then iterate through this list for further use of the distinct files.
* 
* Note: This property is readonly. If there is no file inside the folder you will receive a valid empty FileResultset. 
* @member {FileResultset} folderFiles
* @instance
**/
/**
* @memberof module:context
* @summary Technical name of the folder the script is called from. 
* @description This property contains the technical name of the folder which is the execution context of the script. 
* Note: This property is readonly. 
* @member {string} folderName
* @instance
**/
/**
* @memberof module:context
* @summary Register object representing the current register that the script is executed at. 
* @description Note: This property is readonly. If the script is not executed in a register context then the return value is null. 
* @member {Register} register
* @instance
**/
/**
* @memberof module:context
* @summary Type of the return value that the script returns. 
* @description User defined actions attached to a file or a folder allow to influence the behaviour of the Web-Client. As soon as you define a return type you explicitely have to return a value. 
* 
* 
* The following types of return values are available: 
* <ul>
* <li>"html" - The return value contains html-content. </li>
* <li>"stay" - The continues to display the current file (this is the default behaviour). </li>
* <li>"showFile" - The return value contains the file-id and optional the register-id of a file to be displayed after the script has been executed. Syntax: file-id[&dlcRegisterId=register-id]. </li>
* <li>"showFolder" - The return value contains the folder-id of a folder to be displayed. </li>
* <li>"updateTree" - The return value contains the folder-id of a folder to be displayed. The folder tree will be updated as well. </li>
* <li>"showNewFile" - The return value contains the file-id of a file to be displayed. This file will automatically open in edit mode and will be deleted at cancellation by the user. </li>
* <li>"showEditFile" - The return value contains the file-id of a file to be displayed. This file will automatically open in edit mode. </li>
* <li>"file:filename" - The web user will be asked to download the content of the return value (usually a String variable) to his client computer; The filename filename will be proposed as a default. </li>
* <li>"download:filename" - The web user will be asked to download the blob, that is specified in the return value (server-sided path to the blob), to his client computer; The filename filename will be proposed as a default.</li>
* </ul>
* 
* Note: You may read from and write to this property. 
* @member {string} returnType
* @instance
**/
/**
* @memberof module:context
* @summary Name of the executed script. 
* @description Note: This property is readonly.
* @member {string} scriptName
* @instance
**/
/**
* @memberof module:context
* @summary Iterator with the selected archive files of a folder. 
* @description This property allows to retrieve a list of the selected archive files of a folder if this script is run as user defined action at the folder. You can then iterate through this list for further use of the distinct files.
* 
* Note: This property is readonly. If there is no file selected you will receive a valid empty ArchiveFileResultset. 
* @member {ArchiveFileResultset} selectedArchiveFiles
* @instance
**/
/**
* @memberof module:context
* @summary Array with the keys of the selected archive files of a folder. 
* @description This property allows to retrieve an array with the keys of the selected archive files of a folder if this script is run as user defined action at the folder. 
* Note: This property is readonly. If there is no archive file selected you will receive a valid empty array. 
* @member {string[]} selectedArchiveKeys
* @instance
**/
/**
* @memberof module:context
* @summary DocumentIterator with the selected Documents (attachments) of the current document register. 
* @description This property allows to retrieve a list of all selected Documents of a register if this script is run as user defined action at the register. 
* Note: This property is readonly. If there is no document inside the Register you will receive a valid empty DocumentIterator. 
* @member {DocumentIterator} selectedDocuments
* @instance
**/
/**
* @memberof module:context
* @summary Iterator with the selected files of a folder. 
* @description This property allows to retrieve a list of the selected files of a folder if this script is run as user defined action at the folder. You can then iterate through this list for further use of the distinct files.
* 
* Note: This property is readonly. If there is no file selected you will receive a valid empty FileResultset. 
* @member {FileResultset} selectedFiles
* @instance
**/
/**
* @memberof module:context
* @summary Script source code of the script after including other scripts by the #import rule. 
* @description This property is useful for debugging purposes, if you need to have a look for a certain line of code to find an error, but the script contains other imported sub scripts which mangle the line numbering. 
* Note: This property is readonly.
* @member {string} sourceCode
* @instance
**/
/**
* @memberof module:context
* @summary Id of the locking WorkflowStep for the user for the current file. 
* @description Note: This property is readonly.
* @member {string} workflowActionId
* @instance
**/
/**
* @memberof module:context
* @summary Name of the locking WorkflowStep for the user for the current file. 
* @description Note: This property is readonly.
* @member {string} workflowActionName
* @instance
**/
/**
* @memberof module:context
* @summary Id of the ControlFlow the current file currently passes. 
* @description Note: This property is readonly.
* @member {string} workflowControlFlowId
* @instance
**/
/**
* @memberof module:context
* @summary Name of the ControlFlow the current file currently passes. 
* @description Note: This property is readonly.
* @member {string} workflowControlFlowName
* @instance
**/
/**
* @memberof module:context
* @summary Returns the current workflowstep if the script is run in context of a workflow. 
* @member {string} workflowStep
* @instance
**/
/**
* @memberof module:context
* @function addCustomProperty
* @instance
* @summary Creates a new global custom property. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 5.0
* @see [Context.setOrAddCustomProperty]{@link Context#setOrAddCustomProperty} 
* @see [Context.getCustomProperties]{@link Context#getCustomProperties} 
* @example
* var custProp = context.addCustomProperty("favorites", "string", "peachit");
* if (!custProp)
*   util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function addTimeInterval
* @instance
* @summary Adds a time interval to a Date object. 
* @description Since date manipulation in Javascript is odd sometimes, this useful function allows to conveniently add a given period of time to a given date, e.g. to calculate a due date based upon the current date plus xx days 
* @param {Date} ts Date object to which the period of time should be added 
* @param {number} amount integer value of the period of time to be added 
* @param {string} unit String value representing the time unit of the period of time. You may use one of the following unit values: "minutes""hours""days""weeks"
* @param {boolean} useWorkCalendar true if work calendar should be taken into account, false if not. The work calendar has to be defined at Documents->Settings 
* @returns {Date} Date object with the new date. 
* @since ELC 3.50e / otrisPORTAL 5.0e
* @see [Context.getDatesDiff]{@link Context#getDatesDiff} 
* @example
* var actDate = new Date();  // actDate contains now the current date
* var newDate = context.addTimeInterval(actDate, 14, "days", false);
* util.out(newDate); // should  two weeks in the future
**/
/**
* @memberof module:context
* @function changeScriptUser
* @instance
* @summary Change the user context of the PortalScript. 
* @description In some cases, especially if you make heavy use of access privileges both with files and file fields, it might be neccessary to run a script in a different user context than the user who triggered the script execution. For example, if the current user is not allowed to change any field values, a PortalScript running in this user's context will fail, if it tries to change a field value. In this case it is best practice to switch the user context to some superuser who is allowed to perform the restricted action before that restricted action is executed. You may change the script's user context as often as you need, a change only applies to the instructions following the changeScriptUser() call. 
* @param {string} login String value containing the login name of the user to switch to 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @example
* var currentUserLogin = context.currentUser;
* var success = context.changeScriptUser("schreiber");
* // code runs now in the context of user "schreiber"
* ....
* ....
* // switch back to the original user
* success = context.changeScriptUser(currentUserLogin);
**/
/**
* @memberof module:context
* @function clearEnumvalCache
* @instance
* @summary Clears the cached enumval at the specified PortalScript. 
* @param {string} scriptName String with the name of the PortalScript 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0c HF1
* @example
* var ret = context.clearEnumvalCache("lcmGetAllUser");
* if (!ret)
*    util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function convertDateToString
* @instance
* @summary Convert a Date object representing a date into a String. 
* @description The output String is in the date format of the specified locale. If you leave the locale parameter away the current locale of the script context will be used. 
* @param {Date} dateOrTimeStamp Date/Timestamp object representing the desired date 
* @param {string} locale 
* @returns {string} 
* @since DOCUMENTS 4.0c HF1
* @see [Util.convertDateToString]{@link Util#convertDateToString} 
* @example
* var date1 = new Date(2014, 1, 14);
* util.out(context.convertDateToString(date1, "de"));
* // Output: 14.02.2014
* 
* util.out(context.convertDateToString(date1));
* // Output: depends on the locale of the script context
* 
* var date2 = new Date(2014, 1, 14, 12, 59);
* util.out(context.convertDateToString(date2, "en"));
* // Output: 02/14/2014  12:59
**/
/**
* @memberof module:context
* @function convertNumericToString
* @instance
* @summary Converts a Number into a formatted String. 
* @description The output String may have any format you like. The following parameters defines the format to configure the fromat of the numeric String. 
* @param {number} value Numeric object representing the number 
* @param {string} decimalSep Decimal-Separator as String 
* @param {string} thousandSep Thousend-Separator as String 
* @param {number} precision Precision as number (default=2) 
* @returns {string} String representing the desired number 
* @since ELC 3.60c / otrisPORTAL 6.0c
* @see [Context.convertNumericToString]{@link Context#convertNumericToString} 
* @example
* var numVal = 1000 * Math.PI;
* context.out(context.convertNumericToString(numVal, ",", ".", 2));
* Output: 3.141,59
**/
/**
* @memberof module:context
* @function convertNumericToString
* @instance
* @summary Converts a Number into a formatted String. 
* @description The output String is formatted like the definition in the locale. If the locale is not defined by parameter, the locale of the current user will be used. 
* @param {number} value Numeric object representing the number 
* @param {string} locale Locale as String 
* @param {number} precision 
* @returns {string} String representing the desired number 
* @since ELC 3.60c / otrisPORTAL 6.0c
* @see [Context.convertNumericToString]{@link Context#convertNumericToString} 
* @example
* var numVal = 1000 * Math.PI;
* context.out(context.convertNumericToString(numVal, "en", 2));
* Output: 3,141.59
**/
/**
* @memberof module:context
* @function convertStringToDate
* @instance
* @summary Convert a String representing a date into a Date object. 
* @description The output Date is in the date format of the specified locale. If you omit the locale parameter the current locale of the script context will be used. 
* @param {string} dateOrTimeStamp String representing a date, e.g. "19.09.1974" 
* @param {string} locale 
* @returns {Date} 
* @since DOCUMENTS 5.0a HF2
* @see [Util.convertStringToDate]{@link Util#convertStringToDate} 
* @example
* var dateString = "19.09.1974";
* var birthDay = context.convertStringToDate(dateString, "en");
**/
/**
* @memberof module:context
* @function convertStringToNumeric
* @instance
* @summary Converts a formated String into a number. 
* @description The input String may have any format you like. The following parameters defines the format to configure the format of the numeric String. 
* @param {string} numericValue Formatted numeric String 
* @param {string} decimalSep Decimal-Separator as String 
* @param {string} thousandSep Thousend-Separator as String 
* @returns {number} the numeric number (float) or NULL if fail 
* @since ELC 3.60c / otrisPORTAL 6.0c
* @see [Context.convertStringToNumeric]{@link Context#convertStringToNumeric} 
* @example
* var numString = "1.000,99";
* var floatVal = context.convertStringToNumeric(numString, ",", ".");
**/
/**
* @memberof module:context
* @function convertStringToNumeric
* @instance
* @summary Converts a formated String into a number. 
* @description The input String has to be formatted like the definition in the locale. If the locale is not defined by parameter, the locale of the current user will be used. 
* @param {string} numericValue Formatted numeric String 
* @param {string} locale Locale as String 
* @returns {number} the numeric number (float) or NULL if fail 
* @since ELC 3.60c / otrisPORTAL 6.0c
* @see [Context.convertStringToNumeric]{@link Context#convertStringToNumeric} 
* @example
* var numString = "1,000.99";
* var floatVal = context.convertStringToNumeric(numString, "en");
**/
/**
* @memberof module:context
* @function countPoolFiles
* @instance
* @summary Retrieve the amount of pool files of the specified filetype in the system. 
* @description Note: This function is only for experts. 
* @param {string} fileType the technical name of the desired filetype 
* @returns {number} Integer amount of pool files 
* @since ELC 3.50j / otrisPORTAL 5.0j
* @see [Context.createPoolFile]{@link Context#createPoolFile} 
* @example
* var fileType = "Standard"; // filetype
* var poolSize = context.countPoolFiles(fileType); // amount of pool files
* for (var i = poolSize; i < 3000; i++)
* {
*    context.createPoolFile(fileType);
* }
**/
/**
* @memberof module:context
* @function createAccessProfile
* @instance
* @summary Create a new access profile in the DOCUMENTS environment. 
* @description If the access profile already exist, the method returns an error. 
* @param {string} profileName technical name of the access profile 
* @returns {AccessProfile} AccessProfile object as a representation of the access profile in DOCUMENTS, null in case of any error 
* @since ELC 3.60i / otrisPORTAL 6.0i
* @example
* var office = context.createAccessProfile("office");
* if (!office)
*    util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function createArchiveServer
* @instance
* @summary Create a new ArchiveServer. 
* @description This function creates a new ArchiveServer for the specified archive software on the top level. These types are available: 
* <ul>
* <li>EEI</li>
* <li>EEX_native</li>
* <li>EBIS_store</li>
* <li>NOAH</li>
* <li>None</li>
* </ul>
* 
* @param {string} name The technical name of the ArchiveServer to be created. 
* @param {string} type The desired archive software of the ArchiveServer. 
* @returns {ArchiveServer} New created ArchiveServer object or null if failed. 
* @since DOCUMENTS 5.0a
* @example
* var as = context.createArchiveServer("Invoice2016", "NOAH")   // EDA
* if (as)
*   util.out(as.name);
* else
*   util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function createFellow
* @instance
* @summary Create a new fellow in the DOCUMENTS environment. 
* @description Note: The license type "shared" is only available for pure archive retrieval users. It is not possible to create a shared user with DOCUMENTS access! 
* @param {string} loginName login of the fellow 
* @param {boolean} isDlcUser automatically grant DOCUMENTS access (true/false) 
* @param {string} licenseType optional definition of the license type for that user (allowed values are "named", "concurrent_standard", "concurrent_open" and "shared" (deprecated: "concurrent") 
* @returns {SystemUser} SystemUser object as a representation of the newly created fellow; if the creation fails (e.g. due to a lack of appropriate licenses), the method returns null
* @since ELC 3.60f / otrisPORTAL 6.0f 
* @since DOCUMENTS 4.0d HF3 / DOCUMENTS 5.0 (new licenseType "concurrent_standard", "concurrent_open")
* @see [Context.deleteSystemUser]{@link Context#deleteSystemUser} 
* @example
* var schreiber = context.createFellow("schreiber", true, "named"); // this will create a named user with DOCUMENTS access
**/
/**
* @memberof module:context
* @function createFile
* @instance
* @summary Create a new file of the specified filetype. 
* @description This function creates a new file of the given filetype. Since the script is executed in the context of a particular user, it is mandatory that user possesses sufficient access privileges to create new instances of the desired filetype, otherwise the method will fail. 
* 
* If an error occurs during creation of the file the return value will be null and you can access an error message describing the error with getLastError(). 
* Remark:  DOCUMENTS 5.0c HF1 and newer:  The function directly creates a file for an EAS or EBIS store, if "@server" has been appended to the filetype's name and if appropriate permissions are granted. In this case the returned DocFile must be saved with DocFile.commit() instead of DocFile.sync(). 
* @param {string} fileType Name of the filetype 
* @returns {DocFile} New created file as DocFile object or null if failed. 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since DOCUMENTS 5.0c HF1 (support for EDA/EAS and EBIS stores)
* @example
* var newFile = context.createFile("Standard");
* if (newFile)
*    util.out(newFile.getAutoText("title"));
* else
*    util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function createFolder
* @instance
* @summary Create a new folder of the specified type on the top level. 
* @description This function creates a new folder of the specified type on the top level. There are three types available: 
* <ul>
* <li>public</li>
* <li>dynamicpublic</li>
* <li>onlysubfolder</li>
* </ul>
* 
* @param {string} name The technical name of the folder to be created. 
* @param {string} type The desired type of the folder. 
* @returns {Folder} New created folder as Folder object or null if failed. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("myFolder", "public")
* if (folder)
*   util.out(folder.type);
* else
*   util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function createPoolFile
* @instance
* @summary Create a new pool file of the specified filetype. 
* @description The script must run in the context of a user who has sufficient access privileges to create new files of the specified filetype, otherwise this method will fail. 
* @param {string} fileType the technical name of the desired filetype 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50j / otrisPORTAL 5.0j 
* @see [Context.countPoolFiles]{@link Context#countPoolFiles} 
**/
/**
* @memberof module:context
* @function createSystemUser
* @instance
* @summary Create a new user in the DOCUMENTS environment. 
* @description Note: The license type "shared" is only available for pure archive retrieval users. It is not possible to create a shared user with DOCUMENTS access! 
* @param {string} loginName login of the user 
* @param {boolean} isDlcUser automatically grant DOCUMENTS access (true/false) 
* @param {string} licenseType optional definition of the license type for that user (allowed values are "named", "concurrent" and "shared") 
* @returns {SystemUser} SystemUser object as a representation of the newly created user; if the creation fails (e.g. due to a lack of appropriate licenses), the method returns null
* @since ELC 3.51e / otrisPORTAL 5.1e 
* @since DOCUMENTS 4.0d HF3 / DOCUMENTS 5.0 (new licenseType "concurrent_standard", "concurrent_open")
* @see [Context.deleteSystemUser]{@link Context#deleteSystemUser} 
* @example
* var schreiber = context.createSystemUser("schreiber", true, "concurrent"); // this will create a concurrent user with DOCUMENTS access
**/
/**
* @memberof module:context
* @function deleteAccessProfile
* @instance
* @summary Delete a certain access profile in the DOCUMENTS environment. 
* @param {string} profileName technical name of the access profile 
* @returns {boolean} true in case of successful deletion, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @example
* var profileName = "office"
* var success = context.deleteAccessProfile(profileName);
* if (success)
* {
*    util.out("Deletion of access profile " + profileName + " successful");
* }
**/
/**
* @memberof module:context
* @function deleteFolder
* @instance
* @summary Delete a folder in DOCUMENTS. 
* @param {Folder} folderObj an object of the Class Folder which represents the according folder in DOCUMENTS 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01
* @example
* var itFD = context.getFoldersByName("Invoice");
* var fd = itFD.first();
* if (fd)
* {
*    var success = context.deleteFolder(fd);
* }
**/
/**
* @memberof module:context
* @function deleteSystemUser
* @instance
* @summary Delete a user in the DOCUMENTS environment. 
* @param {string} loginName login of the user 
* @returns {boolean} true if the deletion was successful, false in case of any error 
* @since ELC 3.50e / otrisPORTAL 5.0e
* @see [Context.createSystemUser]{@link Context#createSystemUser} 
* @example
* var login = "schreiber";
* var success = context.deleteSystemUser(login);
* if (success)
* {
*    util.out("Successfully deleted user " + login);
* }
**/
/**
* @memberof module:context
* @function doMaintenance
* @instance
* @summary Calls the specified maintenance operation. 
* @param {string} operationName String with the name of the maintenance operation 
* @returns {string} String with the return message of the of the maintenance operation. 
* @since DOCUMENTS 5.0c HF1
* @example
* var msg = context.doMaintenance("BuildAclCache lcmContract");
* util.out(msg);
**/
/**
* @memberof module:context
* @function extCall
* @instance
* @summary Perform an external command shell call on the Portalserver. 
* @description In the context of a work directory, an external command shell call is executed, usually a batch file. You can decide whether the scripting engine must wait for the external call to complete or whether the script execution continues asynchonously. If the script waits for the external call to complete, this method returns the errorcode of the external call as an integer value. 
* @param {string} workDir String containing a complete directory path which should be used as the working directory 
* @param {string} cmd String containing the full path and filename to the batch file which shall be executed 
* @param {boolean} synced boolean value which defines whether the script must wait for the external call to finish (true) or not (false) 
* @returns {boolean} integer value containing the errorcode (ERRORLEVEL) of the batch call 
* @since ELC 3.51 / otrisPORTAL 5.1
* @example
* // execute testrun.bat in "c:\tmp" and wait for the call to complete
* var errorLevel = context.extCall("c:\\tmp", "c:\\tmp\\testrun.bat", true);
* util.out(errorLevel);
**/
/**
* @memberof module:context
* @function extProcess
* @instance
* @summary Perform an external process call on the Portalserver and returns the exitcode of the external process and the standard output. 
* @description An external process call is executed, e.g. a batch file. The methods returns an array of the size 2. The first array value is the exitcode of the external process. The second array value contains the content that the external process has written to the standard output. 
* @param {string} cmd String containing the full path and filename to the program which shall be executed 
* @returns {Array<any>} an array with the exitcod and the content of the standard output 
* @since ELC 3.60g / otrisPORTAL 6.0g
* @example
* // execute testrun.bat and wait for the call to complete
* var res = context.extProcess("c:\\tmp\\testrun.bat");
* var exitcode = res[0];
* var stdout = res[1];
* util.out(exitcode + ": " + stdout);
**/
/**
* @memberof module:context
* @function findAccessProfile
* @instance
* @summary Find a certain access profile in the DOCUMENTS environment. 
* @param {string} profileName technical name of the access profile 
* @returns {AccessProfile} AccessProfile object as a representation of the access profile in DOCUMENTS, null in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b
* @example
* var office = context.findAccessProfile("office");
**/
/**
* @memberof module:context
* @function findCustomProperties
* @instance
* @summary Searches for CustomProperties. 
* @param {string} filter Optional String value defining the search filter (specification see example) 
* @returns {CustomPropertyIterator} CustomPropertyIterator
* @since DOCUMENTS 5.0 
* @see [Context.getCustomProperties]{@link Context#getCustomProperties} 
* @see [AccessProfile.getCustomProperties]{@link AccessProfile#getCustomProperties} 
* @see [SystemUser.getCustomProperties]{@link SystemUser#getCustomProperties} 
* @example
* // Specification of the filter:
* // ----------------------------
* // Possible filter-columns:
* // name: String - name of the custom property
* // type: String - type of the custom property
* // to_Systemuser:    Integer (oid-low) - connected SystemUser
* // to_AccessProfile: Integer (oid-low) - connected AccessProfile
* // to_DlcFile      : Integer (oid-low) - connected Filetype
* //
* // Operators:
* // &&: AND
* // ||: OR
* 
* var oidUser = context.findSystemUser("schreiber").getOID(true);
* var oidAP1 = context.findAccessProfile("Service").getOID(true);
* var oidAP2 = context.findAccessProfile("Customer").getOID(true);
* var oidFileType = context.getFileTypeOID("ftRecord", true);
* 
* var filter = "name='Prop1'";
* filter += "&& to_Systemuser=" + oidUser;
* filter += "&& (to_AccessProfile=" + oidAP1 + " || to_AccessProfile=" + oidAP2 + ")";
* filter += "&& to_DlcFile =" + oidFileType;
* 
* var it = context.findCustomProperties(filter);
* for (var cp=it.first(); cp; cp=it.next())
* {
*    util.out(cp.value);
* }
**/
/**
* @memberof module:context
* @function findSystemUser
* @instance
* @summary Retrieve a user by his/her login. 
* @description If the user does not exist, then the return value will be null. 
* @param {string} login name of the user 
* @returns {SystemUser} User as SystemUser object 
* @since ELC 3.50b / otrisPORTAL 5.0b
* @see [Context.findSystemUserByAlias]{@link Context#findSystemUserByAlias} [Context.getSystemUsers]{@link Context#getSystemUsers} 
* @example
* var myUser = context.findSystemUser("schreiber");
**/
/**
* @memberof module:context
* @function findSystemUserByAlias
* @instance
* @summary Retrieve a user by an alias name. 
* @description If the alias does not exist or is not connected to a user then the return value will be null. 
* @param {string} alias technical name of the desired alias 
* @returns {SystemUser} User as SystemUser object 
* @since ELC 3.51c / otrisPORTAL 5.1c
* @see [Context.findSystemUser]{@link Context#findSystemUser} [Context.getSystemUsers]{@link Context#getSystemUsers} 
* @example
* var myUser = context.findSystemUserByAlias("CEO");
**/
/**
* @memberof module:context
* @function getAccessProfiles
* @instance
* @summary Get an iterator with all access profiles of in the DOCUMENTS environment. 
* @description Note: This method can only return access profiles which are checkmarked as being visible in DOCUMENTS lists. 
* @param {boolean} includeInvisibleProfiles optional boolean value to define, if access profiles that are not checkmarked as being visible in DOCUMENTS lists should be included 
* @returns {AccessProfileIterator} AccessProfileIterator object with all AccessProfile in DOCUMENTS 
* @since ELC 3.51g / otrisPORTAL 5.1g 
* @since ELC 3.60e / otrisPORTAL 6.0e (new parameter includeInvisibleProfiles)
* @example
* var itAP = context.getAccessProfiles(false);
* for (var ap = itAP.first(); ap; ap = itAP.next())
* {
*    util.out(ap.name);
* }
**/
/**
* @memberof module:context
* @function getArchiveConnection
* @instance
* @summary Get an ArchiveConnection object. 
* @description With this method you can get an ArchiveConnection object. This object offers several methods to use the EAS Interface, EBIS or the EASY ENTERPRISE XML-Server. 
* @param {string} archiveServerName Optional string containing the archive server name; If the archive server is not defined, then the main archive server will be used 
* @returns {ArchiveConnection} ArchiveConnection-Object or NULL, if failed 
* @since DOCUMENTS 5.0a
* @see [ArchiveServer.getArchiveConnection]{@link ArchiveServer#getArchiveConnection} 
* @example
* var xmlserver = context.getArchiveConnection("myeex")
* if (!xmlserver) // failed
*    util.out(context.getLastError());
* else
* {
*    ...
* }
**/
/**
* @memberof module:context
* @function getArchiveFile
* @instance
* @summary Get a file from the archive. 
* @description With this method you can get a file from the archive using the archive key. You need the necessary access rights on the archive side. 
* @param {string} key 
* @returns {DocFile} DocFile or NULL, if failed 
* @since ELC 3.60e / otrisPORTAL 6.0e
* @example
* var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=PRESSE/Document=Waz.4E1D1F7E28C611DD9EE2000C29FACDC2@eex1";
* var file = context.getArchiveFile(key)
* if (!file) // failed
*    util.out(context.getLastError());
* else
* {
*    ...
* }
**/
/**
* @memberof module:context
* @function getArchiveServer
* @instance
* @summary Get an ArchiveServer identified by its name. 
* @param {string} name The technical name of the ArchiveServer. 
* @returns {ArchiveServer} ArchiveServer object or null if failed. 
* @since DOCUMENTS 5.0a
* @example
* var as = context.getArchiveServer("ebis1");
* if (as)
*    util.out(as.name);
**/
/**
* @memberof module:context
* @function getArchiveServers
* @instance
* @summary Get an iterator with all ArchiveServers in the DOCUMENTS environment. 
* @returns {ArchiveServerIterator} 
* @since DOCUMENTS 5.0a
* @example
* var itAS = context.getArchiveServers();
* for (var as = itAS.first(); as; as = itAS.next())
* {
*    util.out(as.name);
* }
**/
/**
* @memberof module:context
* @function getAutoText
* @instance
* @summary Get the String value of a DOCUMENTS autotext. 
* @param {string} autoText the rule to be parsed 
* @returns {string} String containing the parsed value of the autotext 
* @since ELC 3.50e / otrisPORTAL 5.0e
* @example
* util.out(context.getAutoText("currentDate"));
**/
/**
* @memberof module:context
* @function getClientLang
* @instance
* @summary Get the abbreviation of the current user's portal language. 
* @description If you want to return output messages through scripting, taking into account that your users might use different portal languages, this function is useful to gain knowledge about the portal language used by the current user, who is part of the script's runtime context. This function returns the current language as the two letter abbreviation as defined in the principal's settings in the Windows Portal Client (e.g. "de" for German). 
* @returns {string} String containing the abbreviation of the current user's portal language 
* @since ELC 3.51 / otrisPORTAL 5.1
* @see [Context.setClientLang]{@link Context#setClientLang} 
* @example
* util.out(context.getClientLang());
**/
/**
* @memberof module:context
* @function getClientSystemLang
* @instance
* @summary Get the script's execution context portal language index. 
* @returns {number} integer value of the index of the current system language 
* @since ELC 3.51g / otrisPORTAL 5.1g
* @see [Context.getEnumErgValue]{@link Context#getEnumErgValue} 
* @example
* util.out(context.getClientSystemLang());
* var erg = context.setClientSystemLang(0); // first portal language
**/
/**
* @memberof module:context
* @function getClientType
* @instance
* @summary Get the connection info of the client connection. 
* @description You can analyze the connection info to identify e.g. a client thread of the HTML5 Web-Client 
* HTML5-Client:CL[Windows7/Java1.7.0_76],POOL[SingleConnector],INF[SID[ua:docsclient,dca:2.0,docs_cv:5.0]]
* Classic-Client:CL[Windows7/Java1.7.0_76],POOL[SingleConnector]
* SOAP-Client:Documents-SOAP-Proxy(In-Server-Client-Library)onWin32
* 
* @returns {string} 
**/
/**
* @memberof module:context
* @function getCurrentUserAttribute
* @instance
* @summary Get the String value of an attribute of the current user. 
* @param {string} attributeName the technical name of the desired attribute 
* @returns {string} String containing the value of the attribute 
* @since ELC 3.50f / otrisPORTAL 5.0f
* @see [Context.getPrincipalAttribute]{@link Context#getPrincipalAttribute} 
* @example
* util.out(context.getCurrentUserAttribute("particulars.lastName"));
**/
/**
* @memberof module:context
* @function getCustomProperties
* @instance
* @summary Get a CustomPropertyIterator with global custom properties. 
* @param {string} nameFilter String value defining an optional filter depending on the name 
* @param {string} typeFilter String value defining an optional filter depending on the type 
* @returns {CustomPropertyIterator} CustomPropertyIterator
* @since DOCUMENTS 5.0
* @see [Context.findCustomProperties]{@link Context#findCustomProperties} 
* @see [Context.setOrAddCustomProperty]{@link Context#setOrAddCustomProperty} 
* @see [Context.addCustomProperty]{@link Context#addCustomProperty} 
* @example
* var itProp = context.getCustomProperties();
* for (var prop = itProp.first(); prop; prop = itProp.next())
* {
*    util.out(prop.name + ": " + prop.value);
* }
**/
/**
* @memberof module:context
* @function getDatesDiff
* @instance
* @summary Subtract two Date objects to get their difference. 
* @description This function calculates the time difference between two Date objects, for example if you need to know how many days a business trip takes. By default this function takes the work calendar into account if it is configured and enabled for the principal. 
* @param {Date} earlierDate Date object representing the earlier date 
* @param {Date} laterDate Date object representing the later date 
* @param {string} unit optional String value defining the unit, allowed values are "minutes", "hours" and "days" (default) 
* @param {boolean} useWorkCalendar optional boolean to take office hours into account or not (requires enabled and configured work calendar) 
* @returns {number} integer value representing the difference between the two dates 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @example
* var start = util.convertStringToDate("01.04.2006", "dd.mm.yyyy");
* var end = util.convertStringToDate("05.04.2006", "dd.mm.yyyy");
* var duration = context.getDatesDiff(start, end) ;
* util.out("Difference: " + duration); // should be 4
**/
/**
* @memberof module:context
* @function getEnumAutoText
* @instance
* @summary Get an array with the values of an enumeration autotext. 
* @param {string} autoText to be parsed 
* @returns {string[]} Array containing the values for the autotext 
* @since ELC 3.60e / otrisPORTAL 6.0e
* @example
* var values = context.getEnumAutoText("%accessProfile%")
* if (values)
* {
*   for (var i = 0; i < values.length; i++)
*   {
*       util.out(values[i]);
*   }
* }
**/
/**
* @memberof module:context
* @function getEnumErgValue
* @instance
* @summary Get the ergonomic label of a multilanguage enumeration list value. 
* @description Enumeration lists in multilanguage DOCUMENTS installations usually are translated into the different portal languages as well. This results in the effect that only a technical value for an enumeration is stored in the database. So, if you need to display the label which is usually visible instead in the enumeration field through scripting, this function is used to access that ergonomic label. 
* @param {string} fileType String value containing the technical name of the desired filetype 
* @param {string} field String value containing the technical name of the desired enumeration field 
* @param {string} techEnumValue String value containing the desired technical value of the enumeration entry 
* @param {string} locale optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically 
* @returns {string} String containing the ergonomic value of the enumeration value in the appropriate portal language 
* @since ELC 3.51 / otrisPORTAL 5.1
* @see [Context.getEnumErgValue]{@link Context#getEnumErgValue} 
* @example
* util.out(context.getEnumErgValue("Standard", "Priority", "1", "de"));
**/
/**
* @memberof module:context
* @function getEnumValues
* @instance
* @summary Get an array with enumeration list entries. 
* @description In some cases it might be useful not only to access the selected value of an enumeration file field, but the list of all possible field values as well. This function creates an Array of String values (zero-based), and each index is one available value of the enumeration field. If the enumeration field is configured to sort the values alphabetically, this option is respected. 
* @param {string} fileType String value containing the technical name of the desired filetype 
* @param {string} field String value containing the technical name of the desired enumeration field 
* @returns {string} Array containing all possible values of the enumeration field 
* @since ELC 3.51 / otrisPORTAL 5.1
* @see [Context.getEnumErgValue]{@link Context#getEnumErgValue} 
* @example
* var valueList = context.getEnumValues("Standard", "Priority");
* if (valueList.length > 0)
* {
*    for (var i = 0; i < valueList.length; i++)
*    {
*       util.out(valueList[i]);
*    }
* }
**/
/**
* @memberof module:context
* @function getFieldErgName
* @instance
* @summary Get the ergonomic label of a file field. 
* @description In multilanguage DOCUMENTS environments, usually the file fields are translated to the different locales by using the well known ergonomic label hack. The function is useful to output scripting generated information in the appropriate portal language of the web user who triggered the script execution. 
* @param {string} fileType String value containing the technical name of the desired filetype 
* @param {string} field String value containing the technical name of the desired field 
* @param {string} locale optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically 
* @returns {string} String containing the ergonomic description of the file field in the appropriate portal language 
* @since ELC 3.51 / otrisPORTAL 5.1
* @see [Context.getEnumErgValue]{@link Context#getEnumErgValue} 
* @example
* util.out(context.getFieldErgName("Standard", "Prioritaet", "de"));
**/
/**
* @memberof module:context
* @function getFileById
* @instance
* @summary Get the file by its unique file-id. 
* @description If the file does not exist or the user in whose context the script is executed is not allowed to access the file, then the return value will be null. 
* @param {string} idFile Unique id of the file 
* @returns {DocFile} File as DocFile object. 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @see [Context.file]{@link Context#file} 
* @example
* var file = context.getFileById("toastupfi_20070000002081");
* if (file)
*    util.out(file.getAutoText("title"));
* else
*    util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function getFileTypeErgName
* @instance
* @summary Get the ergonomic label of a filetype. 
* @description In multilanguage DOCUMENTS environments, usually the filetypes are translated to the different locales by using the well known ergonomic label hack. The function is useful to output scripting generated information in the appropriate portal language of the web user who triggered the script execution. 
* @param {string} fileType String value containing the technical name of the desired filetype 
* @param {string} locale optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically 
* @returns {string} String containing the ergonomic description of the filetype in the appropriate portal language 
* @since ELC 3.51 / otrisPORTAL 5.1
* @see [Context.getEnumErgValue]{@link Context#getEnumErgValue} 
* @example
* util.out(context.getFileTypeErgName("Standard", "de"));
**/
/**
* @memberof module:context
* @function getFileTypeOID
* @instance
* @summary Returns the object-id of a filetype. 
* @param {string} nameFiletype String value containing the technical name of the filetype.
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id or false if filetype does not exist 
* @since DOCUMENTS 5.0 
**/
/**
* @memberof module:context
* @function getFolderPosition
* @instance
* @summary Retrieve the position of a top level folder in the global context. 
* @description This method can be used to get the position of a top level folder (public, public dynamic or only subfolders folder with no parent) in the global context. 
* @param {Folder} folder Folder object whose position to be retrieved. 
* @returns {number} internal position number of the folder as integer or -1 in case of any error. 
* @since DOCUMENTS 5.0a
* @see [Context.setFolderPosition]{@link Context#setFolderPosition} 
* @example
* var folder = context.getFoldersByName("MyPublicFolder").first();
* var pos = context.getFolderPosition(folder);
* if (pos < 0)
*    throw context.getLastError();
**/
/**
* @memberof module:context
* @function getFoldersByName
* @instance
* @summary Retrieve a list of folders with identical name. 
* @description Different folders might match an identical pattern, e.g. "DE_20*" for each folder like "DE_2004", "DE_2005" and so on. If you need to perform some action with the different folders or their contents, it might be useful to retrieve an iterator (a list) of all these folders to loop through that list. 
* @param {string} folderPattern the name pattern of the desired folder(s) 
* @param {string} type optional parameter, a String value defining the type of folders to look for; allowed values are "public", "dynamicpublic" and "onlysubfolder"
* @returns {FolderIterator} FolderIterator containing a list of all folders matching the specified name pattern 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01
* @example
* var folderIter = context.getFoldersByName("Inv*");
**/
/**
* @memberof module:context
* @function getFromSystemTable
* @instance
* @summary Retrieve the desired entry of the system messages table. 
* @description It might be inconvenient to maintain the different output Strings of localized PortalScripts, if this requires to edit the scripts themselves. This function adds a convenient way to directly access the system messages table which you may maintain in the Windows Portal Client. This enables you to add your own system message table entries in your different portal languages and to directly access them in your scripts. 
* @param {string} identifier String value containing the technical identifer of a certain system message table entry 
* @returns {string} String containing the value of the desired entry in the current user's portal language 
* @since ELC 3.50o / otrisPORTAL 5.0o
* @see [Context.getEnumErgValue]{@link Context#getEnumErgValue} 
* @example
* // requires an entry with that name in your system message table
* util.out(context.getFromSystemTable("myOwnTableEntry"));
**/
/**
* @memberof module:context
* @function getJSObject
* @instance
* @summary Get a JS_Object by object id. 
* @description With this method you can get a JS-Object by the object id. Depending of the class of the object you get a JS-Object of the classes AccessProfile, DocFile, Document, Folder, Register, SystemUser or WorkflowStep
* @param {string} oid String containing the id of the object 
* @returns {object} JS-Object or NULL, if failed 
* @since ELC 3.60c / otrisPORTAL 6.0c
* @example
* var docFile1 = context.file;
* var objectId = docFile1.getOID();
* var docFile2 = context.getJSObject(objectId);
* // docFile1 and docFile2 are both of the class DocFile
* // and reference the same ELC-file object
**/
/**
* @memberof module:context
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @description Note: All classes have their own error functions. Only global errors are available through the context getLastError() method.
* @returns {string} Text of the last error as String 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
* @example
* util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function getPrincipalAttribute
* @instance
* @summary Get the String value of an attribute of the DOCUMENTS principal. 
* @param {string} attributeName the technical name of the desired attribute 
* @returns {string} String containing the value of the attribute 
* @since ELC 3.50f / otrisPORTAL 5.0f
* @see [Context.getCurrentUserAttribute]{@link Context#getCurrentUserAttribute} 
* @example
* util.out(context.getPrincipalAttribute("executive.eMail"));
**/
/**
* @memberof module:context
* @function getProgressBar
* @instance
* @summary Gets the current progress value in % of the progress bar in the Documents-Manager during the PortalScript execution. 
* @returns {number} progress as float (value >= 0 and value <= 100) 
* @since DOCUMENTS 5.0c
* @see [Context.setProgressBarText]{@link Context#setProgressBarText} [Context.setProgressBar]{@link Context#setProgressBar} 
* @example
* context.setProgressBarText("Calculating...");
* context.setProgressBar(0.0);  // set progress bar to 0.0%
* for (var i; i<100; i++) {
*    // do something
*    context.setProgressBar(i);
* }
**/
/**
* @memberof module:context
* @function getQueryParams
* @instance
* @summary Get the actual search parameters within an "OnSearch" or "FillSearchScript" exit. 
* @description Remark: The return value is null, if the calling script is not running as an "OnSearch" or "FillSearchMask" handler. It can also be null, if the script has called changeScriptUser(). In order to access the search parameters, the script needs to restore the original user context. 
* @returns {DocQueryParams} A DocQueryParams object on success, otherwise null. 
* @since DOCUMENTS 4.0c
* @example
* var queryParams = context.getQueryParams();
**/
/**
* @memberof module:context
* @function getRegisterErgName
* @instance
* @summary Get the ergonomic label of a register. 
* @param {string} fileTypeName String value containing the technical name of the desired filetype 
* @param {string} registerName String value containing the technical name of the desired register 
* @param {string} locale optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically 
* @returns {string} String containing the ergonomic description of the register in the appropriate portal language 
* @since DOCUMENTS 4.0d HF1
* @see [Context.getFieldErgName]{@link Context#getFieldErgName} 
* @example
* util.out(context.getRegisterErgName("Standard", "Reg1", "de"));
**/
/**
* @memberof module:context
* @function getServerInstallPath
* @instance
* @summary Create a String containing the installation path of the portal server. 
* @returns {string} String containing the portal server installation path 
* @since ELC 3.60a / otrisPORTAL 6.0a
* @example
* var installDir = context.getServerInstallPath();
* util.out(installDir);
**/
/**
* @memberof module:context
* @function getSystemUser
* @instance
* @summary Get the current user as a SystemUser object. 
* @returns {SystemUser} SystemUser object representing the current user. 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @see [Context.findSystemUser]{@link Context#findSystemUser} [Context.getSystemUsers]{@link Context#getSystemUsers} 
* @example
* var su = context.getSystemUser();
* if (su)
*    util.out(su.login); // output login name of current user
**/
/**
* @memberof module:context
* @function getSystemUsers
* @instance
* @summary Get a list of all users created in the system. 
* @description Note: The method can only return users which are checkmarked as being visible in DOCUMENTS lists. 
* @param {boolean} includeLockedUsers optional defnition, if locked users also should be returned 
* @returns {SystemUserIterator} SystemUserIterator object containing a list of all (visible) users created in the system. 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @since DOCUMENTS 4.0c new optional parameter includeLockedUsers
* @see [Context.findSystemUser]{@link Context#findSystemUser} 
* @example
* var itSU = context.getSystemUsers();
* for (var su = itSU.first(); su; su = itSU.next())
* {
*    util.out(su.login);
* }
**/
/**
* @memberof module:context
* @function getTmpFilePath
* @instance
* @summary Create a String containing a complete path and filename to a temporary file. 
* @description The created file path may be used without any danger of corrupting any important data by accident, because DOCUMENTS assures that there is no such file with the created filename yet. 
* @returns {string} String containing the complete "safe" path and filename 
* @since ELC 3.50n / otrisPORTAL 5.0n
* @example
* var tmpFilePath = context.getTmpFilePath();
* util.out(tmpFilePath);
**/
/**
* @memberof module:context
* @function getXMLServer
* @instance
* @summary Get an ArchiveConnection object. 
* @description With this method you can get an ArchiveConnection object. This object offers several methods to use the EAS Interface, EBIS or the EASY ENTERPRISE XML-Server. 
* @param {string} archiveServerName Optional string containing the archive server name; If the archive server is not defined, then the main archive server will be used 
* @returns {ArchiveConnection} ArchiveConnection-Object or NULL, if failed 
* @since ELC 3.60d / otrisPORTAL 6.0d 
* @since archiveServerName: Documents 4.0 
* @deprecated since DOCUMENTS 5.0a - Use Context.getArchiveConnection(String archiveServerName) instead 
**/
/**
* @memberof module:context
* @function sendTCPStringRequest
* @instance
* @summary Send a String as TCP-Request to a server. 
* @description With this method it is possible to send a String via TCP to a server. The return value of the function is the response of the server. Optional you can define a timeout in ms this function waits for the response of a server 
* @param {string} server String containing the IP address or server host 
* @param {number} port int containing the port on which the server is listening 
* @param {string} request String with the request that should be sent to the server 
* @param {number} responseTimeout int with the timeout for the response in ms. Default value is 3000ms 
* @returns {string} String containing the response and NULL on error 
* @since ELC 3.60b / otrisPORTAL 6.0b
* @example
* var response = context.sendTCPStringRequest("192.168.1.1", "4010", "Hello World", 5000);
* if (!response)
*    util.out(context.getLastError());
* else
*    util.out(response);
**/
/**
* @memberof module:context
* @function setClientLang
* @instance
* @summary Set the abbreviation of the current user's portal language. 
* @description If you want to set the portal language different from the current users language, you can use this method. As parameter you have to use the two letter abbreviation as defined in the principal's settings in the Windows DOCUMENTS Manager (e.g. "de" for German). 
* @param {string} locale String containing the two letter abbreviation for the locale 
* @returns {string} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @see [Context.getClientLang]{@link Context#getClientLang} 
* @example
* context.setClientLang("en"));
**/
/**
* @memberof module:context
* @function setClientSystemLang
* @instance
* @summary Set the script's execution context portal language to the desired language. 
* @param {number} langIndex integer value of the index of the desired system language 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51g / otrisPORTAL 5.1g 
* @deprecated since DOCUMENTS 4.0c use setClientLang(String locale) instead
**/
/**
* @memberof module:context
* @function setFolderPosition
* @instance
* @summary Place a top level folder a at given position in the global context. 
* @description This method can be used to set the position of a top level folder (public, public dynamic or only subfolders folder with no parent) in the global context. 
* @param {Folder} folder Folder object whose position to be set. 
* @param {number} position new internal position number of folder. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0a
* @see [Context.getFolderPosition]{@link Context#getFolderPosition} 
* @example
* // Create a folder B and place it before a folder A
* var folderA = context.getFoldersByName("folderA").first();
* var posA = context.getFolderPosition(folderA);
* 
* var folderB = context.createFolder("folderB", "public");
* if (!context.setFolderPosition(folderB, posA - 1))
*    throw context.getLastError();
**/
/**
* @memberof module:context
* @function setOrAddCustomProperty
* @instance
* @summary Creates or modifies a global custom property according the name and type. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 5.0
* @see [Context.getCustomProperties]{@link Context#getCustomProperties} 
* @see [Context.addCustomProperty]{@link Context#addCustomProperty} 
* @example
* var custProp = context.setOrAddCustomProperty("favorites", "string", "peachit");
* if (!custProp)
*   util.out(context.getLastError());
**/
/**
* @memberof module:context
* @function setPrincipalAttribute
* @instance
* @summary Set an attribute of the DOCUMENTS principal to the desired value. 
* @param {string} attributeName the technical name of the desired attribute 
* @param {string} value the value that should be assigned 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @see [Context.getCurrentUserAttribute]{@link Context#getCurrentUserAttribute} 
* @example
* context.setPrincipalAttribute("executive.eMail", "test@mail.de");
* util.out(context.getPrincipalAttribute("executive.eMail"));
**/
/**
* @memberof module:context
* @function setProgressBar
* @instance
* @summary Sets the progress (%) of the progress bar in the Documents-Manager during the PortalScript execution. 
* @param {number} value Float with in % of the execution (value >= 0 and value <= 100) 
* @returns {void} 
* @since DOCUMENTS 5.0c
* @see [Context.setProgressBarText]{@link Context#setProgressBarText} 
* @example
* context.setProgressBarText("Calculating...");
* context.setProgressBar(0.0);  // set progress bar to 0.0%
* for (var i; i<100; i++) {
*    // do something
*    context.setProgressBar(i);
* }
**/
/**
* @memberof module:context
* @function setProgressBarText
* @instance
* @summary Sets the progress bar text in the Documents-Manager during the PortalScript execution. 
* @param {string} text String with the text to displayed in the progress bar 
* @returns {void} 
* @since DOCUMENTS 5.0c
* @see [Context.setProgressBar]{@link Context#setProgressBar} 
* @example
* context.setProgressBarText("Calculating...");
* context.setProgressBar(0.0);  // set progress bar to 0.0%
* for (var i; i<100; i++) {
*    // do something
*    context.setProgressBar(i);
* }
**/
/**
* @interface ControlFlow
* @summary The ControlFlow class has been added to the DOCUMENTS PortalScripting API to gain full control over a file's workflow by scripting means. 
* @description You may access ControlFlow objects of a certain WorkflowStep by the different methods described in the WorkflowStep chapter. The objects of this class reflect only outgoing control flows of a WorkflowStep object. 
* Note: This class and all of its methods and attributes require a full workflow engine license, it does not work with pure submission lists. 
**/
/**
* @memberof ControlFlow
* @summary String value containing the unique internal ID of the ControlFlow. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} id
* @instance
**/
/**
* @memberof ControlFlow
* @summary String value containing the ergonomic label of the ControlFlow. 
* @description This is usually the label of the according button in the web surface. 
* Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} label
* @instance
**/
/**
* @memberof ControlFlow
* @summary String value containing the technical name of the ControlFlow. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} name
* @instance
**/
/**
* @memberof ControlFlow
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the ControlFlow. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof ControlFlow
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {string} Text of the last error as String 
* @since ELC 3.51e / otrisPORTAL 5.1e 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof ControlFlow
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the ControlFlow to the desired value. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @interface ControlFlowIterator
* @summary The ControlFlowIterator class has been added to the DOCUMENTS PortalScripting API to gain full control over a file's workflow by scripting means. 
* @description You may access ControlFlowIterator objects of a certain WorkflowStep by the different methods described in the WorkflowStep chapter. The objects of this class reflect a list of outgoing control flows of a WorkflowStep object. 
* Note: This class and all of its methods and attributes require a full workflow engine license, it does not work with pure submission lists. 
**/
/**
* @memberof ControlFlowIterator
* @function first
* @instance
* @summary Retrieve the first ControlFlow object in the ControlFlowIterator. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {ControlFlow} ControlFlow or null in case of an empty ControlFlowIterator
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof ControlFlowIterator
* @function next
* @instance
* @summary Retrieve the next ControlFlow object in the ControlFlowIterator. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {ControlFlow} ControlFlow or null if end of ControlFlowIterator is reached. 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof ControlFlowIterator
* @function size
* @instance
* @summary Get the amount of ControlFlow objects in the ControlFlowIterator. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {number} integer value with the amount of ControlFlow objects in the ControlFlowIterator
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @interface CustomProperty
* @summary The CustomProperty class provides access to the user properties. 
* @description The class CustomProperty provides a container where used specific data can be stored. E.g it will be used to store the last search masks. You can save project specific data using this class. The scripting classes SystemUser, AccessProfile and Context have the following access methods available: 
* <ul>
* <li>getCustomProperties() </li>
* <li>addCustomProperty() </li>
* <li>setOrAddCustomProperty() </li>
* </ul>
* 
* In the DOCUMENTS-Manager you can find the CustomProperty on the relation-tab properties at the fellow and user account, access profiles and file types. The global custom properties are listed in Documents > Global properties. A global custom property must not belong to a SystemUser, an AccessProfile, a file type and another custom property. All custom properties are located in Documents > All properties. 
**/
/**
* @memberof CustomProperty
* @summary String containing the name of the CustomProperty. 
* @member {string} name
* @instance
**/
/**
* @memberof CustomProperty
* @summary String containing the type of the CustomProperty. 
* @member {string} type
* @instance
**/
/**
* @memberof CustomProperty
* @summary String containing the value of the CustomProperty. 
* @member {string} value
* @instance
**/
/**
* @memberof CustomProperty
* @function addSubProperty
* @instance
* @summary Creates a new subproperty for the custom property. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 5.0
* @see [CustomProperty.setOrAddSubProperty]{@link CustomProperty#setOrAddSubProperty} 
* @see [CustomProperty.getSubProperties]{@link CustomProperty#getSubProperties} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var custProp = currentUser.setOrAddCustomProperty("superior", "string", "oppen");
* if (!custProp)
*   util.out(currentUser.getLastError());
* else
*   custProp.addSubProperty("Address", "string", "Dortmund");
**/
/**
* @memberof CustomProperty
* @function deleteCustomProperty
* @instance
* @summary Deletes the CustomProperty. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4a 
**/
/**
* @memberof CustomProperty
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the CustomProperty. 
* @description Valid attribute names are name, type and value
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since DOCUMENTS 4a 
**/
/**
* @memberof CustomProperty
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 4a 
**/
/**
* @memberof CustomProperty
* @function getSubProperties
* @instance
* @summary Get a CustomPropertyIterator with subproperties of the custom property. 
* @param {string} nameFilter String value defining an optional filter depending on the name 
* @param {string} typeFilter String value defining an optional filter depending on the type 
* @returns {CustomPropertyIterator} CustomPropertyIterator
* @since DOCUMENTS 5.0
* @see [CustomProperty.setOrAddSubProperty]{@link CustomProperty#setOrAddSubProperty} 
* @see [CustomProperty.addSubProperty]{@link CustomProperty#addSubProperty} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var itProp = currentUser.getCustomProperties();
* for (var prop = itProp.first(); prop; prop = itProp.next())
* {
*    util.out(prop.name + ": " + prop.value);
*    var itSubprop = prop.getSubProperties();
*    for (var subprop = itSubprop.first(); subprop; subprop = itSubprop.next())
*       {
*           util.out("Subproperty name: " + subprop.name + " Value: " + subprop.value);
*       }
* }
**/
/**
* @memberof CustomProperty
* @function setAccessProfile
* @instance
* @summary Connects a custom property to an AccessProfile. 
* @description An empty profile name disconnects the AccessProfile
* @param {string} nameAccessProfile 
* @returns {boolean} 
**/
/**
* @memberof CustomProperty
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the CustomProperty to the desired value. 
* @description Valid attribute names are name, type and value
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4a 
**/
/**
* @memberof CustomProperty
* @function setFiletype
* @instance
* @summary Connects a custom property to a filetype. 
* @param {string} nameFiletype 
* @returns {boolean} 
**/
/**
* @memberof CustomProperty
* @function setOrAddSubProperty
* @instance
* @summary Creates a new subproperty or modifies a subproperty according the name and type for the custom property. 
* @description This method creates or modifies a unique subproperty for the custom property. The combination of the name and the type make the subproperty unique for the custom property. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 5.0
* @see [CustomProperty.getSubProperties]{@link CustomProperty#getSubProperties} 
* @see [CustomProperty.addSubProperty]{@link CustomProperty#addSubProperty} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var custProp = currentUser.setOrAddCustomProperty("superior", "string", "oppen");
* if (!custProp)
*   util.out(currentUser.getLastError());
* else
*   custProp.setOrAddSubProperty("Address", "string", "Dortmund");
**/
/**
* @memberof CustomProperty
* @function setSystemUser
* @instance
* @summary Connects a custom property to a SystemUser. 
* @description An empty login disconnects the SystemUser
* @param {string} login 
* @returns {boolean} 
**/
/**
* @interface CustomPropertyIterator
* @summary The CustomPropertyIterator class is an iterator that holds a list of objects of the class CustomProperty. 
**/
/**
* @memberof CustomPropertyIterator
* @function first
* @instance
* @summary Retrieve the first CustomProperty object in the CustomPropertyIterator. 
* @returns {CustomProperty} CustomProperty or null in case of an empty CustomPropertyIterator
* @since DOCUMENTS 4a 
**/
/**
* @memberof CustomPropertyIterator
* @function next
* @instance
* @summary Retrieve the next CustomProperty object in the CustomPropertyIterator. 
* @returns {CustomProperty} CustomProperty or NULL if end of CustomPropertyIterator is reached 
* @since DOCUMENTS 4a 
**/
/**
* @memberof CustomPropertyIterator
* @function size
* @instance
* @summary Get the amount of CustomProperty objects in the CustomPropertyIterator. 
* @returns {number} integer value with the amount of CustomProperty objects in the CustomPropertyIterator
* @since DOCUMENTS 4a 
**/
/**
* @class DBConnection
* @summary The DBConnection class allows to connect to external databases. 
* @description With the help of the DBResultSet class you can obtain information from these external databases, and it is possible to execute any other SQL statement on the external databases. 
* Note: Important: Please consider the restrictions according the order of reading of the columns of the DBResultSet. Read the example! 
**/
/**
* @memberof DBConnection
* @function close
* @instance
* @summary Close the database connection and free the server ressources. 
* @description Note: It is strongly recommanded to close each DBConnection object you have created, since database connections are so-called expensive ressources and should be used carefully. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DBResultSet.close]{@link DBResultSet#close} 
**/
/**
* @memberof DBConnection
* @constructor DBConnection
* @summary The constructor is neccessary to connect to the external database. 
* @description The resulting DBConnection object may only be used by one single DBResultSet at once, so if you need to open several DBResultSet objects at the same time, you need a separate DBConnection object for each of them. 
* Note: At the usage of ODBC datasources it depends on the ODBC client driver, if the credentials for the connection has to be specified at the DSN configuration, or as parameter in the DBConnection constructor. If you have specified the credentials (user, password) at the DSN configuration (ODBC data source administrator), then leave the user and password away at the DBConnection constructor. 
* @param {string} connType String defining the type of database connection. Allowed values are "odbc" and "oracle"
* @param {string} connString String containing the complete connection String; for ODBC connections this is the datasource name (DSN) 
* @param {string} user optional String containing the login name used to authenticate against the external database 
* @param {string} password optional String containing the (plaintext) password of the user utilized to connect to the database 
* @returns {DBConnection} DBConnection object representing the active database connection or null in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DBResultSet]{@link DBResultSet} 
**/
/**
* @memberof DBConnection
* @constructor DBConnection
* @summary The constructor is neccessary to connect to the currently used DOCUMENTS 5 database. 
* @description The resulting DBConnection object may only be used by one single DBResultSet at once, so if you need to open several DBResultSet objects at the same time, you need a separate DBConnection object for each of them. 
* @returns {DBConnection} 
* @since DOCUMENTS 4.0 
* @see [DBResultSet]{@link DBResultSet} 
**/
/**
* @memberof DBConnection
* @function executeQuery
* @instance
* @summary Execute a SELECT statement and retrieve a DBResultSet containing the result rows found by the statement. 
* @description Note: This instruction should only be used to SELECT on the external database, since the method always tries to create a DBResultSet. If you need to execute different SQL statements, refer to the DBConnection.executeStatement() method. 
* Note: x64/UTF-8 DOCUMENTS version: since DOCUMENTS 4.0a HF2 the method handles the statement as UTF-8-String 
* @param {string} sqlStatement String containing the SELECT statement you want to execute in the database 
* @returns {DBResultSet} DBResultSet containing the result rows generated by the SELECT instruction 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DBConnection.executeStatement]{@link DBConnection#executeStatement} 
**/
/**
* @memberof DBConnection
* @function executeQueryUC
* @instance
* @summary Execute a SELECT statement using a x64/UTF-8 DOCUMENTS and retrieve a DBResultSet containing the result rows found by the statement. 
* @description Note: This instruction should only be used to SELECT on the external database, since the method always tries to create a DBResultSet. If you need to execute different SQL statements, refer to the DBConnection.executeStatement() method. 
* @param {string} sqlStatement String containing the SELECT statement you want to execute in the database 
* @returns {DBResultSet} DBResultSet containing the result rows generated by the SELECT instruction 
* @since DOCUMENTS 4.0 
* @see [DBConnection.executeStatementUC]{@link DBConnection#executeStatementUC} 
* @deprecated since DOCUMENTS 4.0a HF2 use DBConnection.executeQuery() instead 
**/
/**
* @memberof DBConnection
* @function executeStatement
* @instance
* @summary Execute any SQL statement on the external database. 
* @description You can execute any SQL statement, as long as the database driver used for the connection supports the type of instruction. Use this method especially if you want to INSERT or UPDATE or DELETE data rows in tables of the external database. If you need to SELECT table rows, refer to the DBConnection.executeQuery() method. 
* Note: x64/UTF-8 DOCUMENTS version: since DOCUMENTS 4.0a HF2 the method handles the statement as UTF-8-String 
* @param {string} sqlStatement 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DBConnection.executeQuery]{@link DBConnection#executeQuery} 
**/
/**
* @memberof DBConnection
* @function executeStatementUC
* @instance
* @summary Execute any SQL statement using a x64/UTF-8 DOCUMENTS on the external database. 
* @description You can execute any SQL statement, as long as the database driver used for the connection supports the type of instruction. Use this method especially if you want to INSERT or UPDATE or DELETE data rows in tables of the external database. If you need to SELECT table rows, refer to the DBConnection.executeQueryUC() method. 
* @param {string} sqlStatement 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0 
* @see [DBConnection.executeQueryUC]{@link DBConnection#executeQueryUC} 
* @deprecated since DOCUMENTS 4.0a HF2 use DBConnection.executeStatement() instead 
**/
/**
* @memberof DBConnection
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @class DBResultSet
* @summary The DBResultSet class contains a list of resultset rows. 
* @description You need an active DBConnection object to execute an SQL query which is used to create a DBResultSet. 
* Note: Important: Please consider the restrictions according the order of reading of the columns of the DBResultSet. Read the example!
* The following data types for database columns will be supported: 
* <table border=1 cellspacing=0>
* <tr><td>SQL data type</td><td>access method</td></tr>
* <tr><td>SQL_INTEGER</td><td>getInt(), getString()</td></tr>
* <tr><td>SQL_SMALLINT</td><td>getInt(), getString()</td></tr>
* <tr><td>SQL_BIGINT</td><td>getInt(), getString()</td></tr>
* <tr><td>SQL_FLOAT</td><td>getFloat(), getInt(), getString()</td></tr>
* <tr><td>SQL_DECIMAL</td><td>getFloat(), getInt(), getString()</td></tr>
* <tr><td>SQL_NUMERIC</td><td>getFloat(), getInt(), getString()</td></tr>
* <tr><td>SQL_BIT</td><td>getBool(), getString()</td></tr>
* <tr><td>SQL_TIMESTAMP</td><td>getTimestamp(), getString()</td></tr>
* <tr><td>SQL_DATE</td><td>getDate(), getString()</td></tr>
* <tr><td>SQL_GUID</td><td>getString()</td></tr>
* <tr><td>SQL_VARCHAR</td><td>getString()</td></tr>
* <tr><td>SQL_CHAR</td><td>getString()</td></tr>
* <tr><td>all other types</td><td>getString()</td></tr>
* </table>
* 
**/
/**
* @memberof DBResultSet
* @function close
* @instance
* @summary Close the DBResultSet and free the server ressources. 
* @description Note: It is strongly recommanded to close each DBResultSet object you have created, since database connections and resultsets are so-called expensive ressources and should be used carefully. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DBConnection.close]{@link DBConnection#close} 
**/
/**
* @memberof DBResultSet
* @function getBool
* @instance
* @summary Read the indicated column of the current row of the DBResultSet as a boolean value. 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {boolean} boolean value representing the indicated column of the current row 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof DBResultSet
* @function getColName
* @instance
* @summary Function returns the name of a column. 
* @param {number} colNo integer value (zero based) indicating the desired column 
* @returns {string} Column name as String 
* @since DOCUMENTS 5.0 
**/
/**
* @memberof DBResultSet
* @function getDate
* @instance
* @summary Read the indicated column of the current row of the DBResultSet as a Date object. 
* @description Note: The return value will be null if the content of the indicated column cannot be converted to a Date object. 
* Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {Date} Date object representing the indicated column of the current row or NULL if is null-value 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof DBResultSet
* @function getFloat
* @instance
* @summary Read the indicated column of the current row of the DBResultSet as a float value. 
* @description Note: The return value will be NaN if the content of the indicated column cannot be converted to a float value. 
* Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {number} float value representing the indicated column of the current row or NULL if is null-value 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof DBResultSet
* @function getInt
* @instance
* @summary Read the indicated column of the current row of the DBResultSet as an integer value. 
* @description Note: The return value will be NaN if the content of the indicated column cannot be converted to an integer value. 
* Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {number} integer value representing the indicated column of the current row or NULL if is null-value 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof DBResultSet
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof DBResultSet
* @function getNumCols
* @instance
* @summary Function returns the amount of columns of the DBResultSet. 
* @returns {number} Column count as int 
* @since DOCUMENTS 5.0 
**/
/**
* @memberof DBResultSet
* @function getString
* @instance
* @summary Read the indicated column of the current row of the DBResultSet as a String. 
* @description Note: x64/UTF-8 DOCUMENTS version: since DOCUMENTS 4.0a HF2 the method transcode the fetched data to UTF-8 
* Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {string} String representing the indicated column of the current row or NULL if is null-value 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof DBResultSet
* @function getTimestamp
* @instance
* @summary Read the indicated column of the current row of the DBResultSet as a Date object including the time. 
* @description Note: The return value will be null if the content of the indicated column cannot be converted to a Date object. 
* Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {Date} Date object (including time) representing the indicated column of the current row or NULL if is null-value 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof DBResultSet
* @function getUCString
* @instance
* @summary Read the indicated column of the current row of the DBResultSet on a x64/UTF-8 DOCUMENTS as a String. 
* @description Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @param {number} colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
* @returns {string} String representing the indicated column of the current row or NULL if is null-value 
* @since DOCUMENTS 4.0 
* @deprecated since DOCUMENTS 4.0a HF2 use DBResultSet.getString() instead 
**/
/**
* @memberof DBResultSet
* @function next
* @instance
* @summary Move the resultset pointer to the next row of the DBResultSet. 
* @description The method must be called at least once after retrieving a DBResultSet, because the newly created object does not point to the first result row but to BOF (beginning of file). 
* Note: every value of a DBResultSet can only be read one time and in the correct order! 
* @returns {boolean} true if the DBResultSet now points to the next row, false if there is no further result row 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @interface DocFile
* @summary The DocFile class implements the file object of DOCUMENTS. 
* @description You may access a single DocFile with the help of the attribute context.file or by creating a FileResultset. There are no special properties available, but each field of a file is mapped to an according property. You can access the different field values with their technical names.
* 
* For this reason it is mandatory to use programming language friendly technical names, meaning 
* <ul>
* <li>only letters, digits and the underscore "_" are allowed. </li>
* <li>no whitespaces or any special characters are allowed. </li>
* <li>the technical name must not start with a digit. </li>
* <li>only the first 32 characters of the technical name are significant to identify the field.</li>
* </ul>
* 
**/
/**
* @memberof DocFile
* @summary The technical name of a field. 
* @description Each field of a DocFile is mapped to an according property. You can access the field value with the technical name. 
* @member {any} fieldName
* @instance
**/
/**
* @memberof DocFile
* @function abort
* @instance
* @summary Cancel edit mode for a file. 
* @description If you switched a file to edit mode with the startEdit() method and if you want to cancel this (e.g. due to some error that has occurred in the mean time) this function should be used to destroy the scratch copy which has been created by the startEdit() instruction. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @see [DocFile.startEdit]{@link DocFile#startEdit} 
* @example
* var myFile = context.file;
* myFile.startEdit();
* myFile.Field = "value";
* myFile.abort(); // effect: "value" is not applied!
**/
/**
* @memberof DocFile
* @function addDocumentFromFileSystem
* @instance
* @summary Add a file as a new Document from the server's filesystem to a given Register. 
* @description It is possible to parse Autotexts inside the source file to fill the Document with the contents of index fields of a DocFile object. The max. file size for the source file is 512 KB. 
* @param {string} pathDocument String value containing the complete filepath to the source file on the server 
* @param {string} targetRegister String value containing the technical name of the desired Register
* @param {string} targetFileName String value containing the desired filename of the uploaded Document
* @param {boolean} deleteDocumentAtFileSystem optional boolean value to decide whether to delete the source file on the server's filesystem 
* @param {boolean} parseAutoText optional boolean value to decide whether to parse the AutoText values inside the source file. Note: if you want to make use of AutoTexts in this kind of template files, you need to use double percentage signs instead of single ones, e.g. %%Field1%% instead of %Field1%! 
* @param {DocFile} referencFileToParse optional DocFile object to be used to parse the AutoTexts inside the template. If you omit this parameter, the current DocFile object is used as the data source. 
* @returns {Document} Document if successful, null in case of any error 
* @since ELC 3.51f / otrisPORTAL 5.1f 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var f = context.file;
* var success = f.addDocumentFromFileSystem("c:\\temp\\test.rtf", "Documents", "parsedRTFFile.rtf", false, true);
**/
/**
* @memberof DocFile
* @function addPDF
* @instance
* @summary Create a PDF file containing the current DocFile's contents and store it on a given document register. 
* @description The different document types of your documents on your different tabs require the appropriate PDF filter programs to be installed and configured in DOCUMENTS. To successfully add the created PDF file to a register the DocFile needs to be in edit mode (via startEdit() method), and the changes have to be applied via commit(). 
* @param {string} pathCoverXML String containing full path and filename of the template xml file to parse 
* @param {boolean} createCover boolean whether to create a field list or to only take the documents 
* @param {string} pdfFileName String value for the desired file name of the created PDF 
* @param {string} targetRegister String value containing the technical name of the target document register 
* @param {Array<any>} sourceRegisterNames Array with the technical names of the document registers you want to include 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50a / otrisPORTAL 5.0a 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var source = new Array();
* source.push("FirstRegister");
* source.push("SecondRegister");
* 
* var docFile = context.file;
* docFile.startEdit();
* 
* docFile.addPDF("c:\\tmp\\cover.xml",
*    true,
*    "GeneratedPDF.pdf",
*    "MyTargetRegister",
*    source
* );
* docFile.commit();
**/
/**
* @memberof DocFile
* @function archive
* @instance
* @summary Archive the DocFile object. 
* @description The target archive has to be configured in the filetype definition (in the Windows Portal Client) as the default archive. If no default archive is defined, the execution of this operation will fail. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFile = context.file;
* myFile.archive();
**/
/**
* @memberof DocFile
* @function archive
* @instance
* @summary Archive the DocFile object to the desired archive. 
* @description If the target archive key is misspelled or if the target archive does not exist, the operation will fall back to the default archive, as long as it is configured in the filetype definition. So the function will only fail if both the target archive and the default archive are missing. 
* Note: For EE.i: It is important to know that the target archive String must use the socalled XML-Server syntax. The old EAG syntax is not supported. It is as well neccessary to use a double backslash (\\) if you define your target archive as an ECMAScript String value, because a single backslash is a special character. 
* @param {string} archiveKey String value containing the complete archive key for EE.i or schema|view for EE.x of the desired target archive 
* @returns {boolean} true if successful, false in case of any error 
* @since EE.i: ELC 3.51c / otrisPORTAL 5.1c 
* @since EE.x: ELC 3.60a / otrisPORTAL 6.0a 
* @since EAS: Documents 4.0
* @example
* // Example for EE.i:
* var myFile = context.file;
* var targetArchive = "$(#TOASTUP)\\STANDARD";
* targetArchive += "@myeei";  // since Documents 4.0 using multi archive server
* myFile.archive(targetArchive);
* @example
* // Example for EE.x:
* var myFile = context.file;
* var view = "Unit=Default/Instance=Default/View=DeliveryNotes";
* var schema = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
* var target = schema + "|" + view;
* target += "@myeex";  // since Documents 4.0 using multi archive server
* myFile.archive(target);
* @example
* // Example for EAS:
* var myFile = context.file;
* myFile.archive("@myeas");  // using multi archive server
**/
/**
* @memberof DocFile
* @function archive
* @instance
* @summary Archive the DocFile object according to the given ArchivingDescription object. 
* @description This is the most powerful way to archive a file through scripting, since the ArchivingDescription object supports a convenient way to influence which parts of the DocFile should be archived. 
* @param {ArchivingDescription} desc ArchivingDescription object that configures several archiving options 
* @returns {boolean} true if successful, false in case of any error 
* @since EE.i: ELC 3.51c / otrisPORTAL 5.1c 
* @since EE.x: ELC 3.60a / otrisPORTAL 6.0a 
* @since EAS: Documents 4.0
* @see [ArchivingDescription]{@link ArchivingDescription} 
* @example
* // Example for EE.i:
* var myFile = context.file;
* var ad = new ArchivingDescription();
* ad.targetArchive = "$(#TOASTUP)\\STANDARD";
* ad.archiveServer = "myeei";  // since Documents 4.0 using multi archive server
* ad.archiveStatus = true;
* ad.archiveMonitor = true;
* ad.addRegister("all_docs");  // archive all attachments
* var success = myFile.archive(ad);
* if (success)
* {
*    context.returnType = "html";
*    return ("<p>ArchiveFileID: " + myFile.getAttribute("Key") + "<p>");
* }
* @example
* // Example for EE.x:
* var myFile = context.file;
* var ad = new ArchivingDescription();
* ad.targetView = "Unit=Default/Instance=Default/View=DeliveryNotes";
* ad.targetSchema = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
* ad.archiveServer = "myeex";  // since Documents 4.0 using multi archive server
* ad.archiveStatus = true;
* ad.archiveMonitor = true;
* ad.addRegister("all_docs");  // archive all attachments
* var success = myFile.archive(ad);
* if (success)
* {
*    context.returnType = "html";
*    return ("<p>ArchiveFileID: " + myFile.getArchiveKey() + "</p>");
* }
* @example
* // Example for EAS:
* var myFile = context.file;
* var ad = new ArchivingDescription();
* ad.archiveServer = "myeas";  // using multi archive server
* ad.archiveStatus = true;
* ad.archiveMonitor = true;
* ad.addRegister("all_docs");  // archive all attachments
* var success = myFile.archive(ad);
* if (success)
* {
*    context.returnType = "html";
*    return ("<p>ArchiveFileID: " + myFile.getArchiveKey() + "</p>");
* }
**/
/**
* @memberof DocFile
* @function archiveAndDelete
* @instance
* @summary Archive the DocFile object and remove the DOCUMENTS file. 
* @description The target archive has to be configured in the filetype definition (in the Windows Portal Client) as the default archive. It depends on the filetype settings as well, whether Status and Monitor will be archived as well. If no default archive is defined, the execution of this operation will fail. 
* Note: It is strictly forbidden to access the DocFile object after this function has been executed successfully; if you try to access it, your script will fail, because the DocFile does not exist any longer in DOCUMENTS. For the same reason it is strictly forbidden to execute this function in a signal exit PortalScript. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFile = context.file;
* myFile.archiveAndDelete();
**/
/**
* @memberof DocFile
* @function cancelWorkflow
* @instance
* @summary Cancel the current workflow for the file. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51e / otrisPORTAL 5.1e
* @example
* var f = context.file;
* f.cancelWorkflow();
**/
/**
* @memberof DocFile
* @function changeFiletype
* @instance
* @summary Change the filetype of this file. 
* @param {string} nameFiletype String containing the technical name of the filetype. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0e
* @example
* var file = context.file;
* if (!file.changeFiletype("newFiletype"))
*   util.out(file.getLastError());
**/
/**
* @memberof DocFile
* @function checkWorkflowReceiveSignal
* @instance
* @summary Checks the receive signals of the workflow for the DocFile object. 
* @description This method can only be used for a DocFile, that runs in a workflow and the workflow has receive signals. Usually the receive signals of the workflow step will be checked by a periodic job. Use this method to trigger the check of the receive signals for the DocFile. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0a
* @example
* var myFile = context.file;
* var succ = myFile.checkWorkflowReceiveSignal();
* if (!succ)
*    util.out(myFile.getLastError());
**/
/**
* @memberof DocFile
* @function clearFollowUpDate
* @instance
* @summary Clear a followup date for a desired user. 
* @param {SystemUser} pUser SystemUser object of the desired user 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @see [DocFile.setFollowUpDate]{@link DocFile#setFollowUpDate} 
* @example
* var docFile = context.file;
* var su = context.getSystemUser();
* docFile.clearFollowUpDate(su);
**/
/**
* @memberof DocFile
* @function commit
* @instance
* @summary Commit any changes to the DocFile object. 
* @description This method is mandatory to apply changes to a file that has been switched to edit mode with the startEdit() method. It is strictly prohibited to execute the commit() method in a script which is attached to the onSave scripting hook. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @see [DocFile.startEdit]{@link DocFile#startEdit} [DocFile.sync]{@link DocFile#sync} 
* @example
* var myFile = context.file;
* myFile.startEdit();
* myFile.Field = "value";
* myFile.commit();
**/
/**
* @memberof DocFile
* @function connectFolder
* @instance
* @summary Store a reference to the current file in the desired target folder. 
* @description The (public) folder must be a real folder, it must not be a dynamic filter, nor a "only subfolder" object. 
* @param {Folder} fObj Folder object representing the desired target public folder 
* @returns {boolean} true if successful, false in case of any error. 
* @since ELC 3.51h / otrisPORTAL 5.1h
* @see [DocFile.disconnectFolder]{@link DocFile#disconnectFolder} 
* @example
* var f = context.file;
* var fObj = context.getFoldersByName("Invoices").first();
* var success = f.connectFolder(fObj);
**/
/**
* @memberof DocFile
* @function countFields
* @instance
* @summary Count fields with a desired name in the file. 
* @description Note: When this function is called on an EE.x DocFile with an empty field name, the return value may be greater than expected. The DOCUMENTS image of such a file can include EE.x system fields and symbolic fields for other imported scheme attributes (blob content, notice content). 
* @param {string} fieldName String containing the technical name of the fields to be counted. 
* @returns {number} The number of fields als an Integer. 
* @since DOCUMENTS 4.0c HF2
* @example
* var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2@eex1"
* var docFile = context.getArchiveFile(key);
* if (!docFile)
*    throw "archive file does not exist: " + key;
* else
*    util.out(docFile.countFields("fieldName"));
**/
/**
* @memberof DocFile
* @function createMonitorFile
* @instance
* @summary Creates a workflow monitor file in the server's file system. 
* @description This method creates a monitor file in the server's file system with the workflow monitor content of the DocFile. The file will be created as a html-file. 
* Note: This generated file will no be automatically added to the DocFile
* @param {boolean} asPDF boolean parameter that indicates that a pdf-file must be created instead of a html-file 
* @param {string} locale String (de, en,..) in which locale the file must be created (empty locale = log-in locale) 
* @returns {string} String containing the path of the created file 
* @since DOCUMENTS 4.0a HF2 
**/
/**
* @memberof DocFile
* @function createStatusFile
* @instance
* @summary Creates a status file in the server's file system. 
* @description This method creates a status file in the server's file system with the status content of the DocFile. The file will be created as a html-file. 
* Note: This generated file will no be automatically added to the DocFile
* @param {boolean} asPDF boolean parameter that indicates that a pdf-file must ge created instead of a html-file 
* @param {string} locale String (de, en,..) in which locale the file must be created (empty locale = log-in locale) 
* @returns {string} String containing the path of the created file 
* @since DOCUMENTS 4.0a HF2 
**/
/**
* @memberof DocFile
* @function deleteFile
* @instance
* @summary Delete the DocFile object. 
* @description If there's another PortalScript attached to the onDelete scripting hook, it will be executed right before the deletion takes place. 
* Note: It is strictly forbidden to access the DocFile object after this function has been executed successfully; if you try to access it, your script will fail, because the DocFile does not exist any longer in DOCUMENTS. For the same reason it is strictly forbidden to execute this function in a signal exit PortalScript. 
* Note: The parameters moveTrash, movePool are ignored for archive files. The parameter allVersions requires an EAS/EDA file and is ignored otherwise.
* @param {boolean} moveTrash optional boolean parameter to decide whether to move the deleted file to the trash folder 
* @param {boolean} movePool optional boolean parameter to decide whether to move the deleted file's object to the file pool 
* @param {boolean} allVersions optional boolean parameter to delete all versions of an EAS archive file at once. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 (moveTrash parameter since ELC 3.50n / otrisPORTAL 5.0n, movePool parameter since ELC 3.51f / otrisPORTAL 5.1f, allVersions since DOCUMENTS 4.0e) 
* @since DOCUMENTS 4.0a HF1 (available for archive files) 
* @example
* var myFile = context.file;
* myFile.deleteFile(false, true);
**/
/**
* @memberof DocFile
* @function disconnectArchivedFile
* @instance
* @summary Uncouple an active file from the archived version. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0d
* @see [DocFile.archive]{@link DocFile#archive} 
* @example
* var f = context.file;
* var f.archive();
* var success = f.disconnectArchivedFile();
**/
/**
* @memberof DocFile
* @function disconnectFolder
* @instance
* @summary Remove a reference to the current file out of the desired target folder. 
* @description The (public) folder must be a real folder, it must not be a dynamic filter, nor a "only subfolder" object. 
* @param {Folder} fObj Folder object representing the desired target public folder 
* @returns {boolean} true if successful, false in case of any error. 
* @since ELC 3.51h / otrisPORTAL 5.1h
* @see [DocFile.connectFolder]{@link DocFile#connectFolder} 
* @example
* var f = context.file;
* var fObj = context.getFoldersByName("Invoices").first();
* var success = f.disconnectFolder(fObj);
**/
/**
* @memberof DocFile
* @function exportXML
* @instance
* @summary Export the file as an XML file. 
* @param {string} pathXML String containing full path and filename of the desired target xml file 
* @param {boolean} withDocuments boolean value to include the documents. The value must be set to true in case status or monitor information are to be inserted. 
* @param {boolean} withStatus boolean value to include status information. The value must be set to true in order to add the status. Status Information will then be generated into a file which will be added to the documents. Please note that therefore withDocuments must be set to true in order to get Status information. 
* @param {boolean} withMonitor boolean value to include Monitor information. The value must be set to true in order to add the monitor. Monitor Information will then be generated into a file which will be added to the documents. Please note that therefore withDocuments must be set to true in order to get Monitor information.
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50a / otrisPORTAL 5.0a 
* @since ELC 3.60e / otrisPORTAL 6.0e (Option: export of status & monitor)
* @example
* var docFile = context.file;
* docFile.exportXML("c:\\tmp\\myXmlExport.xml", true, false, true);
**/
/**
* @memberof DocFile
* @function forwardFile
* @instance
* @summary Forward file in its workflow via the given control flow. 
* @description This method only works if the file is inside a workflow and inside a workflow action that is accessible by a user of the web interface. Based on that current workflowstep you need to gather the ID of one of the outgoing control flows of that step. The access privileges of the current user who tries to execute the script are taken into account. Forwarding the file will only work if that control flow is designed to forward without query. 
* Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} controlFlowId String containing the technical ID of the outgoing control flow that should be passed 
* @param {string} comment optional String value containing a comment to be automatically added to the file's monitor 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var docFile = context.file;
* var step = docFile.getCurrentStep();
* var flowId = step.firstControlFlow;
* docFile.forwardFile(flowId);
**/
/**
* @memberof DocFile
* @function getAllLockingWorkflowSteps
* @instance
* @summary Get a list of all locking workflow step that currently lock the file. 
* @description The locking workflow steps do not need to be locked by the current user executing the script, this function as well returns all locking steps which refer to different users. 
* Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {WorkflowStepIterator} WorkflowStepIterator object which represents a list of all locking workflow steps for the file 
* @since ELC 3.51e / otrisPORTAL 5.1e
* @see [DocFile.getCurrentWorkflowStep]{@link DocFile#getCurrentWorkflowStep} 
* @example
* var f = context.file;
* var stepIter = f.getAllLockingWorkflowSteps();
* if (stepIter.size() > 0)
*    util.out("File is locked by " + stepIter.size() + " workflow steps");
**/
/**
* @memberof DocFile
* @function getAllWorkflowSteps
* @instance
* @summary Get a list of all workflow step of the file. 
* @description The methd will return all workflow steps, the currently locking and the previous ones. 
* Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {WorkflowStepIterator} WorkflowStepIterator object which represents a list of all workflow steps for the file 
* @since DOCUMENTS 5.0b
* @see [DocFile.getCurrentWorkflowStep]{@link DocFile#getCurrentWorkflowStep} 
* @example
* var f = context.file;
* var stepIter = f.getAllWorkflowSteps();
**/
/**
* @memberof DocFile
* @function getArchiveKey
* @instance
* @summary After archiving of a file this method returns the key of the file in the archive. 
* @description Note: If the file is not archived or archived without versioning or uncoupled from the achived file the key is empty. 
* @param {boolean} withServer optional boolean value to indicate, if the key should include an "@archiveServerName" appendix 
* @returns {string} String containing the key. 
* @since ELC 3.60a / otrisPORTAL 6.0a 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @see [DocFile.archive]{@link DocFile#archive} 
* @example
* var f = context.file;
* if (f.archive())
*    util.out(f.getArchiveKey());
* else
*    util.out(f.getLastError());
**/
/**
* @memberof DocFile
* @function getAsPDF
* @instance
* @summary Create a PDF file containing the current DocFile's contents and returns the path in the file system. 
* @description The different document types of your documents on your different tabs require the appropriate PDF filter programs to be installed and configured in DOCUMENTS. 
* @param {string} nameCoverTemplate String containing the name of the pdf cover template defined at the filetype 
* @param {boolean} createCover boolean whether to create a field list or to only take the documents 
* @param {Array<any>} sourceRegisterNames Array with the technical names of the document registers you want to include 
* @returns {string} String with file path of the pdf, an empty string in case of any error 
* @since DOCUMENTS 4.0b
* @example
* var source = new Array();
* source.push("FirstRegister");
* source.push("SecondRegister");
* 
* var docFile = context.file;
* 
* var pathPdfFile = docFile.getAsPDF("pdfcover", true, source);
* if (pathPdfFile == "")
*    throw docFile.getLastError();
* util.out("Size: " + util.fileSize(pathPdfFile))
**/
/**
* @memberof DocFile
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the file. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var myFile = context.file;
* util.out(myFile.getAttribute("hasInvoicePlugin"));
**/
/**
* @memberof DocFile
* @function getAutoText
* @instance
* @summary Get the String value of a DOCUMENTS autotext. 
* @param {string} autoText the rule to be parsed 
* @returns {string} String containing the parsed value of the autotext 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var myFile = context.file;
* util.out(myFile.getAutoText("fileOwner"));
**/
/**
* @memberof DocFile
* @function getCopy
* @instance
* @summary Duplicate a file. 
* @description This function creates a real 1:1 copy of the current file which may be submitted to its own workflow. 
* @param {string} copyMode optional String that defines how to handle the documents of the originating file.
* There are three different parameter values allowed: "NoDocs" copied DocFile does not contain any documents "ActualVersion" copied DocFile contains only the latest (published) version of each document "AllVersions" copied DocFile contains all versions (both published and locked) of each document 
* @returns {DocFile} DocFile object representing the copied file 
* @since ELC 3.51c / otrisPORTAL 5.1c
* @example
* var docFile = context.file;
* var newFile = docFile.getCopy("AllVersions");
**/
/**
* @memberof DocFile
* @function getCreationDate
* @instance
* @summary Returns the creation date (timestamp) of a DocFile. 
* @returns {Date} Date object, if the date is valid, null for an invalid data. 
* @since DOCUMENTS 5.0c
* @see [DocFile.getCreator]{@link DocFile#getCreator} 
* @see [DocFile.getLastModificationDate]{@link DocFile#getLastModificationDate} 
* @example
* var file = context.file;
* var c_ts = file.getCreationDate();
* if (c_ts)
*    util.out(c_ts);
**/
/**
* @memberof DocFile
* @function getCreator
* @instance
* @summary Returns the SystemUser object or fullname as String of the creator of the DocFile. 
* @param {boolean} asObject optional boolean value, that specifies, if the SystemUser object or the fullname should be returned. 
* @returns {any} asObject=true:SystemUser object or null (if user does not exist anymore) 
* @since DOCUMENTS 5.0c
* @see [DocFile.getLastModifier]{@link DocFile#getLastModifier} 
* @see [DocFile.getCreationDate]{@link DocFile#getCreationDate} 
* @example
* var file = context.file;
* var su = file.getCreator(true);
* if (su)
*    util.out(su.login);
* else
*    util.out(file.getCreator());
**/
/**
* @memberof DocFile
* @function getCurrentWorkflowStep
* @instance
* @summary Get the current workflow step of the current user locking the file. 
* @description The function returns a valid WorkflowStep object if there exists one for the current user. If the current user does not lock the file, the function returns null instead. 
* Note: This function requires a full workflow engine license, it does not work with pure submission lists.
* @returns {WorkflowStep} WorkflowStep object 
* @since ELC 3.51e / otrisPORTAL 5.1e
* @see [DocFile.getFirstLockingWorkflowStep]{@link DocFile#getFirstLockingWorkflowStep} 
* @example
* var f = context.file;
* var step = f.getCurrentWorkflowStep();
* if (!step)
*    step = f.getFirstLockingWorkflowStep();
* // still no workflow steps found? File not in workflow
* if (!step)
*    util.out("File is not in a workflow");
**/
/**
* @memberof DocFile
* @function getEnumAutoText
* @instance
* @summary Get an array with the values of an enumeration autotext. 
* @param {string} autoText to be parsed 
* @returns {Array<any>} Array containing the values for the autotext 
* @since ELC 3.60e / otrisPORTAL 6.0e
* @example
* var values = context.getEnumAutoText("%accessProfile%")
* if (values)
* {
*   for (var i=0; i < values.length; i++)
*   {
*       util.out(values[i]);
*   }
* }
**/
/**
* @memberof DocFile
* @function getFieldAttribute
* @instance
* @summary Get the String value of an attribute of the desired file field. 
* @param {string} fieldName String containing the technical name of the desired field 
* @param {string} attrName String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired field attribute 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var myFile = context.file;
* util.out(myFile.getFieldAttribute("Samplefield", "Value"));
**/
/**
* @memberof DocFile
* @function getFieldAutoText
* @instance
* @summary Returns an AutoText value of a specified field of the DocFile. 
* @description The following AutoTexts are available 
* <ul>
* <li>"[locale]" - field value in the user locale or specified locale. </li>
* <li>"key" - key value (e.g. at refence fields, enumeration fields, etc.). </li>
* <li>"fix" - fix format value (e.g. at numeric fields, date fields, etc.). </li>
* <li>"pos" - order position of the field value at enumeration fields. </li>
* <li>"raw" - database field value. </li>
* <li>"label[.locale]" - label of the field in user locale or specified locale.</li>
* </ul>
* 
* @param {string} fieldName Name of the field as String 
* @param {string} autoText 
* @returns {string} String with the AutoText. 
* @since DOCUMENTS 5.0c
* @example
* var file = context.file;
* util.out(file.getFieldAutoText("erpInvoiceDate"));             // => 31.12.2017
* util.out(file.getFieldAutoText("erpInvoiceDate", "en"));       // => 12/31/2017
* util.out(file.getFieldAutoText("erpInvoiceDate", "fix"));      // => 20171231
* util.out(file.getFieldAutoText("erpInvoiceDate", "label"));    // => Rechnungsdatum
* util.out(file.getFieldAutoText("erpInvoiceDate", "label.en")); // => Invoice date
**/
/**
* @memberof DocFile
* @function getFieldName
* @instance
* @summary Get the technical name of the n-th field of the file. 
* @description This allows generic scripts to be capable of different versions of the same filetype, e.g. if you changed details of the filetype, but there are still older files of the filetype in the system. 
* @param {number} index integer index of the desired field 
* @returns {string} String containing the technical name of the file field, false if index is out of range 
* @since ELC 3.50e / otrisPORTAL 5.0e 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var myFile = context.file;
* var fieldName = "Samplefield";
* var fields = new Array();
* var i = 0;
* // get all field names
* while (myFile.getFieldName(i))
* {
*    fields[i] = myFile.getFieldName(i)
*    i++;
* }
* // check for field existance
* var found = false;
* for (var j = 0; j < fields.length; j++)
* {
*    if (fields[j] == fieldName)
*    {
*       found = true;
*       break;
*    }
* }
**/
/**
* @memberof DocFile
* @function getFieldValue
* @instance
* @summary Get the value of the desired file field. 
* @param {string} fieldName String containing the technical field name can be followed by the desired instance number in form techFieldName[i] for multi-instance fields of an EE.i/EE.x archive file. Note: The index i is zero-based. The specification of field instance is olny available for an EE.i/EE.x archive file, it will be ignored for other files. If the parameter contains no instance information, the first field instance is used. The field instance order is determined by the field order in the file. 
* @returns {any} The field value, its type depends on the field type, such as a Date object returned for a field of type 'Timestamp'. 
* @since DOCUMENTS 4.0c 
* @since DOCUMENTS 4.0c HF2 available for multi-instance fields of an EE.i/EE.x archive file
* @example
* var myFile = context.file;
* util.out(myFile.getFieldValue("Samplefield"));
* 
* // Since DOCUMENTS 4.0c HF2
* var key = "Unit=Default/Instance=Default/Pool=FeldZ/Document=Feldzahlen.86C94C30438011E2B925080027B22D11@eex1";
* var eexFile = context.getArchiveFile(key);
* util.out(eexFile.getFieldValue("multiInstanceField[2]"));
**/
/**
* @memberof DocFile
* @function getFileOwner
* @instance
* @summary Get the file owner of the file. 
* @returns {SystemUser} SystemUser object representing the user who owns the file 
* @since ELC 3.51d / otrisPORTAL 5.1d
* @example
* var docFile = context.file;
* var su = docFile.getFileOwner();
* util.out(su.login);
**/
/**
* @memberof DocFile
* @function getFirstLockingWorkflowStep
* @instance
* @summary Get the first locking workflow step that currently locks the file. 
* @description The first locking workflow step does not need to be locked by the current user executing the script, this function as well returns the first locking step if it is locked by a different user. If no locking step is found at all, the function returns null instead. 
* Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {WorkflowStep} WorkflowStep object 
* @since ELC 3.50e / otrisPORTAL 5.0e
* @see [DocFile.getCurrentWorkflowStep]{@link DocFile#getCurrentWorkflowStep} 
* @example
* var f = context.file;
* var step = f.getCurrentWorkflowStep();
* if (!step)
* {
*    step = f.getFirstLockingWorkflowStep();
* }
* // still no workflow steps found? File not in workflow
* if (!step)
* {
*    util.out("File is not in a workflow");
* }
**/
/**
* @memberof DocFile
* @function getid
* @instance
* @summary Returns the file id of the DocFile. 
* @returns {string} String with the file id. 
* @since DOCUMENTS 5.0c
* @example
* var file = context.file;
* util.out(file.getid());
**/
/**
* @memberof DocFile
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFile = context.file;
* // do something which may go wrong
* if (hasError)
* {
*    util.out(myFile.getLastError());
* }
**/
/**
* @memberof DocFile
* @function getLastModificationDate
* @instance
* @summary Returns the last modification date (timestamp) of a DocFile. 
* @returns {Date} Date object, if the date is valid, null for an invalid data. 
* @since DOCUMENTS 5.0c
* @see [DocFile.getLastModifier]{@link DocFile#getLastModifier} 
* @see [DocFile.getCreationDate]{@link DocFile#getCreationDate} 
* @example
* var file = context.file;
* var c_ts = file.getLastModificationDate();
* if (c_ts)
*    util.out(c_ts);
**/
/**
* @memberof DocFile
* @function getLastModifier
* @instance
* @summary Returns the fullname as String of the last editor of the DocFile. 
* @returns {string} String with the fullname. 
* @since DOCUMENTS 5.0c
* @see [DocFile.getCreator]{@link DocFile#getCreator} 
* @see [DocFile.getLastModificationDate]{@link DocFile#getLastModificationDate} 
* @example
* var file = context.file;
* util.out(file.getLastModifier());
**/
/**
* @memberof DocFile
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof DocFile
* @function getOriginal
* @instance
* @summary Get the orginal file for a scratch copy. 
* @description If you run a scipt on a scratch copy (e.g. a onSave script), you can get the orginal file with this function. 
* @returns {DocFile} DocFile
* @since EAS: Documents 4.0
* @example
* var scratchCopy = context.file;
* var origFile = scratchCopy.getOriginal();
* if (!origFile)
*    util.out(scratchFile.getLastError();
* else
* {
*    if (scratchCopy.FieldA != origFile.FieldA)
*       util.out("Field A changed");
*    else
*       util.out("Field A not changed");
* }
**/
/**
* @memberof DocFile
* @function getReferenceFile
* @instance
* @summary Get the file referred by a reference field in the current file. 
* @description If the current file's filetype is connected to a superior filetype by a reference field, this function allows to easily access the referred file, e.g. if you are in an invoice file and you want to access data of the referring company. 
* @param {string} referenceFileField String value containing the technical name of the file field contianing the definition to the referred filetype 
* @returns {DocFile} DocFile object representing the referred file 
* @since ELC 3.51c / otrisPORTAL 5.1c 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var docFile = context.file;
* var company = docFile.getReferenceFile("crmCompany");
* util.out(company.crmCompanyName);
**/
/**
* @memberof DocFile
* @function getRegisterByName
* @instance
* @description Note: Until version 5.0c this method ignored the access rights of the user to the register. With the optional parameter checkAccessRight this can now be done. For backward compatibility the default value is set to false.
* @param {string} registerName String value containing the technical name of the desired register 
* @param {boolean} checkAccessRight optional boolean value, that indicates if the access rights should be considered. 
* @returns {Register} Register object representing the desired register 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 5.0c (new optional parameter checkAccessRight) 
* @see [DocFile.getRegisters]{@link DocFile#getRegisters} 
* @example
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
**/
/**
* @memberof DocFile
* @function getRegisters
* @instance
* @summary Get an iterator with the registers of the file for the specified type. 
* @description Note: Until version 5.0c this method ignored the access rights of the user to the register. With the optional parameter checkAccessRight this can now be done. For backward compatibility the default value is set to false.
* @param {string} type optional String value to filter for a desired register type. Default type is documents
* Allowed values: documentsfieldslinksarchiveddocumentsexternalcallall (returns all registers independent of the type) 
* @param {boolean} checkAccessRight optional boolean value, that indicates if the access rights should be considered. 
* @returns {RegisterIterator} RegisterIterator with all registers (matching the filter) 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 5.0c (new optional parameter checkAccessRight) 
* @see [RegisterIteratorDocFile.getRegisterByName]{@link RegisterIteratorDocFile#getRegisterByName} 
* @example
* var docFile = context.file;
* var regIter = docFile.getRegisters("documents");
**/
/**
* @memberof DocFile
* @function getTitle
* @instance
* @summary Returns the title of the DocFile. 
* @description Note: the special locale raw returns the title in all locales
* @param {string} locale 
* @returns {string} String with the title. 
* @since DOCUMENTS 5.0c 
* @example
* var file = context.file;
* util.out(file.getTitle("en"));
**/
/**
* @memberof DocFile
* @function getUserStatus
* @instance
* @summary Get the status of the file for a desired user. 
* @param {string} login String containing the login name of the desired user 
* @returns {string} String with the status. Possible values: standardnewfromFollowuptoForwardforInfotaskworkflowCanceledbackFromDistributionconsultation
* @since DOCUMENTS 4.0c HF1
* @see [DocFile.setUserStatus]{@link DocFile#setUserStatus} 
* @example
* var docFile = context.file;
* util.out(docFile.getUserStatus("schreiber"));
**/
/**
* @memberof DocFile
* @function hasField
* @instance
* @summary Gather information whether the current file has the field with the desired name. 
* @param {string} fieldName String containing the technical name of the field. 
* @returns {boolean} true if the file has the field, false if not 
* @since DOCUMENTS 4.0d
* @example
* var file = context.file;
* if (file.hasField("address"))
*   util.out(file.address);
**/
/**
* @memberof DocFile
* @function insertStatusEntry
* @instance
* @summary Add an entry to the status tab of the file. 
* @description This function is especially useful in connection with PortalScripts being used as decision guards in workflows, because this allows to comment and describe the decisions taken by the scripts. This increases transparency concerning the life cycle of a file in DOCUMENTS. 
* @param {string} action String containing a brief description 
* @param {string} comment optional String containing a descriptive comment to be added to the status entry 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @example
* var docFile = context.file;
* docFile.insertStatusEntry("Executed Guard Script","all conditions met");
**/
/**
* @memberof DocFile
* @function isArchiveFile
* @instance
* @summary Gather information whether the current file is an archive file. 
* @returns {boolean} true if is an archive file, false if not 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2"
* var docFile = context.getArchiveFile(key);
* if (docFile)
*   util.out(docFile.isArchiveFile());
**/
/**
* @memberof DocFile
* @function isDeletedFile
* @instance
* @summary Gather information whether the current file is a deleted file of a trash folder. 
* @returns {boolean} true if is a deleted file, false if not 
* @since ELC 3.60e / otrisPORTAL 6.0e
* @example
* ...
* var trashFolder = user.getPrivateFolder("trash");
* if (trashFolder)
* {
*    var it = trashFolder.getFiles();
*    for (var file = it.first(); file; file = it.next())
*    {
*        if (file.isDeletedFile())
*           util.out("ok");
*        else
*           util.out("Error: Found undeleted file in trash folder!");
*    }
* }
**/
/**
* @memberof DocFile
* @function isNewFile
* @instance
* @summary Gather information whether the current file is a new file. 
* @returns {boolean} true if new file, false if not 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01
* @example
* var docFile = context.file;
* util.out(docFile.isNewFile());
**/
/**
* @memberof DocFile
* @function reactivate
* @instance
* @summary Reactivate an archive file to a file of the correspondending filetype. 
* @returns {boolean} true if successful, false if not - get error message with getLastError()
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2@eex1"
* var docFile = context.getArchiveFile(key);
* if (!docFile)
*    throw "archive file does not exist: " + key;
* if (!docFile.reactivate())
*    throw "Reactivation failed: " + docFile.getLastError();
* 
* docFile.startWorkflow....
**/
/**
* @memberof DocFile
* @function sendFileAdHoc
* @instance
* @summary Send the DocFile directly. 
* @param {Array<any>} receivers Array with the names of the users or groups to which to send the DocFile. You need to specify at least one recipient. 
* @param {string} sendMode String containing the send type. The following values are available: sequential - one after the other parallel_info - concurrently for information 
* @param {string} task String specifying the task for the recipients of the DocFile
* @param {boolean} backWhenFinished boolean indicating whether the DocFile should be returned to the own user account after the cycle. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0
* @example
* var docFile = context.createFile("Filetype1");
* var success = docFile.sendFileAdHoc(["user2", "user3"], "parallel_info", "test task", true);
* if (!success)
*   util.out(docFile.getLastError());
**/
/**
* @memberof DocFile
* @function sendMail
* @instance
* @summary Send the file as email to somebody. 
* @description You must define an email template in the Windows Portal Client at the filetype of your DocFile object. This template may contain autotexts that can be parsed and replaced with their appropriate field values. 
* @param {string} from String value containing the sender's email address 
* @param {string} templateName String value containing the technical name of the email template. This must be defined on the email templates tab of the filetype. 
* @param {string} to String value containing the email address of the recipient 
* @param {string} cc Optional String value for an additional recipient ("cc" means "carbon copy") 
* @param {boolean} addDocs optional boolean value whether to include the documents of the file 
* @param {string} bcc Optional String value for the email addresses of blind carbon-copy recipients (remaining invisible to other recipients). 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 4.0d new parameter bcc
* @example
* var docFile = context.file;
* docFile.sendMail("schreiber@toastup.de", "MyMailTemplate",
*    "oppen@toastup.de", "", true
* );
**/
/**
* @memberof DocFile
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the file to the desired value. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var myFile = context.file;
* myFile.setAttribute("hasInvoicePlugin", "true");
**/
/**
* @memberof DocFile
* @function setFieldAttribute
* @instance
* @summary Set the value of an attribute of the desired file field. 
* @param {string} fieldName String containing the technical name of the desired field 
* @param {string} attrName String containing the name of the desired attribute 
* @param {string} value String value containing the desired field attribute value 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var myFile = context.file;
* myFile.setFieldAttribute("Samplefield", "Value", "1");
* myFile.sync();
**/
/**
* @memberof DocFile
* @function setFieldValue
* @instance
* @summary Set the value of the desired file field. 
* @param {string} fieldName String containing the technical field name can be followed by the desired instance number in form techFieldName[i] for multi-instance fields of an EE.i/EE.x archive file. Note: The index i is zero-based. The specification of field instance is olny available for an EE.i/EE.x archive file, it will be ignored for other files. If the parameter contains no instance information, the first field instance is used. The field instance order is determined by the field order in the file. 
* @param {any} value The desired field value of the proper type according to the field type, e.g. a Date object as value of a field of type 'Timestamp'. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c 
* @since DOCUMENTS 4.0c HF2 available for multi-instance fields of an EE.i/EE.x archive file
* @example
* var myFile = context.file;
* myFile.setFieldValue("NumericField", 3.14);
* myFile.setFieldValue("TimestampField", new Date());
* myFile.setFieldValue("BoolField", true);
* myFile.setFieldValue("StringField", "Hello");
* myFile.sync();
* 
* // Since DOCUMENTS 4.0c HF2
* var key = "Unit=Default/Instance=Default/Pool=FeldZ/Document=Feldzahlen.86C94C30438011E2B925080027B22D11@eex1";
* var eexFile = context.getArchiveFile(key);
* eexFile.startEdit();
* eexFile.setFieldValue("multiInstanceField[2]", "Hello");
* eexFile.commit();
**/
/**
* @memberof DocFile
* @function setFileOwner
* @instance
* @summary Set the file owner of the file to the desired user. 
* @param {SystemUser} owner SystemUser object representing the desired new file owner 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51d / otrisPORTAL 5.1d
* @example
* var docFile = context.file;
* var su = context.getSystemUser();
* docFile.setFileOwner(su);
**/
/**
* @memberof DocFile
* @function setFollowUpDate
* @instance
* @summary Set a followup date for a desired user. 
* @param {SystemUser} pUser SystemUser object of the desired user 
* @param {Date} followUpDate Date object representing the desired followup date 
* @param {string} comment optional String value containing a comment that is displayed as a task as soon as the followup is triggered 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @see [DocFile.clearFollowUpDate]{@link DocFile#clearFollowUpDate} 
* @example
* var docFile = context.file;
* var su = context.getSystemUser();
* var followup = util.convertStringToDate("31.12.2008", "dd.mm.yyyy");
* docFile.setFollowUpDate(su, followup, "Silvester");
**/
/**
* @memberof DocFile
* @function setUserRead
* @instance
* @summary Mark the file as read or unread for the desired user. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} login String containing the login name of the desired user 
* @param {boolean} fileRead boolean whether the file should be markes as read (true) or unread (false) 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b
* @example
* var docFile = context.file;
* docFile.setUserRead("schreiber", true);
**/
/**
* @memberof DocFile
* @function setUserStatus
* @instance
* @summary Set the status of the file for a desired user to a desired value. 
* @description The file icon in the list view and file view depends on this status. 
* @param {string} login String containing the login name of the desired user 
* @param {string} status String value containing the desired status
* Allowed values: standardnewfromFollowuptoForwardforInfotaskworkflowCanceledbackFromDistributionconsultation
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @since DOCUMENTS 4.0c (status values extended)
* @see [DocFile.getUserStatus]{@link DocFile#getUserStatus} 
* @example
* var docFile = context.file;
* docFile.setUserStatus("schreiber", "new");
**/
/**
* @memberof DocFile
* @function startEdit
* @instance
* @summary Switch a DocFile to edit mode. 
* @description Switching a file to edit mode with this function has the same effect as the "Edit" button in the web surface of DOCUMENTS. This means, a scratch copy of the file is created, and any changes you apply to the file are temporarily stored in the scratch copy - until you commit() your changes back to the original file. There are a few scripting event hooks which disallow the use of this function at all costs: 
* <ul>
* <li>onEdit hook - the system has already created the scratch copy. </li>
* <li>onCreate hook - a newly created file is always automatically in edit mode.</li>
* </ul>
* 
* You should avoid using this function in scripts that are executed inside a workflow (signal exits, decisions etc.). 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @see [DocFile.abort]{@link DocFile#abort} 
* @example
* var myFile = context.file;
* myFile.startEdit();
* myFile.Field = "value";
* myFile.commit(); // apply changes
**/
/**
* @memberof DocFile
* @function startWorkflow
* @instance
* @summary Start a workflow for the DocFile object. 
* @param {string} workflowName String containing the technical name and optional the version number of the workflow. The format of the workflowName is technicalName[-version]. If you don't specify the version of the workflow, the workflow with the highest workflow version number will be used. If you want to start a specific version you have to use technicalName-version e.g. (Invoice-2) as workflowName. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFile = context.file;
* myFile.startWorkflow("Invoice");  // starts the latest version of the workflow "Invoice"
* myFile.startWorkflow("Invoice-2"); // starts the version 2 of the workflow "Invoice"
**/
/**
* @memberof DocFile
* @function sync
* @instance
* @summary Synchronize any changes to the DocFile object back to the real file. 
* @description If you want to apply changes to file fields through a script that is executed as a signal exit inside a workflow, you should rather prefer sync() than the startEdit() / commit() instruction pair. 
* Note: If there's a scratch copy of the file in the system (e.g. by some user through the web surface), committing the changes in the scratch copy results in the effect that your synced changes are lost. So be careful with the usage of this operation. 
* @param {boolean} checkHistoryFields optional boolean parameter has to be set to true, if the file contains history fields, that are modified 
* @param {boolean} notifyHitlistChange optional boolean parameter indicates the web client to refresh the current hitlist 
* @param {boolean} updateRefFields optional boolean parameter indicates to update reference fields if using the property UpdateByRefFields 
* @param {boolean} updateModifiedDate optional boolean parameter indicates to update the modification date of the file 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 (checkHistoryFields parameter since ELC 3.60i / otrisPORTAL 6.0i) 
* @since DOCUMENTS 5.0a (new parameter updateRefFields) 
* @since DOCUMENTS 5.0a HF2 (new parameter updateModifiedDate)
* @see [DocFile.startEdit]{@link DocFile#startEdit} 
* @example
* var myFile = context.file;
* myFile.Field = "value";
* myFile.sync();
**/
/**
* @memberof DocFile
* @function undeleteFile
* @instance
* @summary Relive a deleted file. 
* @description Sets the status active to a file and redraws it from the trash folder. Deleted files are not searchable by a FileResultSet. You can only retrieve deleted files by iterating throw the trash-folder of the users 
* @returns {boolean} true if successful, false if not 
* @since ELC 3.60e / otrisPORTAL 6.0e
* @example
* ...
* var trashFolder = user.getPrivateFolder("trash");
* if (trashFolder)
* {
*    var it = trashFolder.getFiles();
*    for (var file = it.first(); file; file = it.next())
*    {
* if (file.isDeletedFile())
*       {
*     file.undeleteFile();
*          // now e.g. search a private folder and add the file...
*       }
*    }
* }
**/
/**
* @interface DocHit
* @summary The DocHit class presents the hit object collected by a HitResultset. 
* @description Objects of this class cannot be created directly. You may access a single DocHit by creating a HitResultset, which provides functions to retrieve its hit entries. 
**/
/**
* @memberof DocHit
* @summary Field value, addressed by a known column name. 
* @description Each field in a DocHit is mapped to an according property. You can read the value on the basis of the column name. 
* Remark: Overwriting values in a DocHit is not allowed. Each attempt will raise an exception. To read dates and numbers in DOCUMENTS' storage format, see getTechValueByName(). 
* @member {any} columnName
* @instance
**/
/**
* @memberof DocHit
* @function getArchiveFile
* @instance
* @summary Get a file from the archive associated to the archive hit. 
* @description You need the necessary access rights on the archive side. 
* Remark: This function creates a complete DOCUMENTS image of the archived file, except for the content of attachments. This is a time-consuming workstep. If a script calls this function for each hit in the set, it will not run any faster than a script, which uses a conventional ArchiveFileResultset instead of this class. 
* @returns {DocFile} DocFile or NULL, if failed. 
* @since DOCUMENTS 4.0b 
* @see [getFile]{@link getFile} 
**/
/**
* @memberof DocHit
* @function getArchiveKey
* @instance
* @summary Retrieve the key of the associated archive file object. 
* @param {boolean} withServer optional boolean value to indicate, if the key should include an "@archiveServerName" appendix 
* @returns {string} The archive file's key as a String, but an empty String, if the hit does not refer to an archive file. 
* @since DOCUMENTS 4.0b 
* @see [getFileId]{@link getFileId} 
**/
/**
* @memberof DocHit
* @function getBlobInfo
* @instance
* @summary Function to get the blob info of the hit as xml. 
* @returns {string} String with xml content 
* @since DOCUMENTS 5.0c 
**/
/**
* @memberof DocHit
* @function getFile
* @instance
* @summary Get the file associated to the hit. 
* @description If the file does not exist or the user in whose context the script is executed is not allowed to access the file, then the return value will be NULL. 
* @returns {DocFile} DocFile or NULL, if failed. 
* @since DOCUMENTS 4.0b 
* @see [getArchiveFile]{@link getArchiveFile} 
**/
/**
* @memberof DocHit
* @function getFileId
* @instance
* @summary Get the file id of the associated file object. 
* @returns {string} The file id as String, if the associated file is an active file, but an empty String otherwise. 
* @since DOCUMENTS 4.0b 
* @see [getArchiveKey]{@link getArchiveKey} 
**/
/**
* @memberof DocHit
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof DocHit
* @function getLocalValue
* @instance
* @summary Get the local value of an available column. 
* @param {number} colIndex The zero-based index of the column. 
* @returns {string} The local value of the given column as String. 
* @since DOCUMENTS 4.0b 
* @see [getLocalValueByName]{@link getLocalValueByName} 
**/
/**
* @memberof DocHit
* @function getLocalValueByName
* @instance
* @summary Get the local value of an available column. 
* @description Note: Accesing a column by its index is a bit faster than by its name. 
* @param {string} colName The name of the column. 
* @returns {string} The local value of the given column as String. 
* @since DOCUMENTS 4.0b 
* @see [getLocalValue]{@link getLocalValue} 
**/
/**
* @memberof DocHit
* @function getSchema
* @instance
* @summary Get a schema identifier of the archive hit. 
* @description Remark: For EE.i, the value is an archive identifier in the XML-Server's notation. For EDA it is just the name of a filetype. All values come with an "@Servername" appendix. 
* @returns {string} The schema identifier as a String. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof DocHit
* @function getTechValue
* @instance
* @summary Get the technical value of an available column. 
* @description Remark: The function returns dates, timestamps and numbers in DOCUMENTS' storage format. (In the DOCUMENTS Manager see menu 'Documents/Settings', dialog page 'Locale/format', group 'Format settings'.) If you prefer JavaScript numbers and dates, simply use the object like an array: myDocHit[colIndex]. 
* @param {number} colIndex The zero-based index of the column. 
* @returns {string} The technical value of the given column as a String. 
* @since DOCUMENTS 4.0b 
* @see [getTechValueByName]{@link getTechValueByName} 
**/
/**
* @memberof DocHit
* @function getTechValueByName
* @instance
* @summary Get the technical value of an available column. 
* @description Note: Accessing a column by its index is a bit faster than by its name. 
* Remark: The function returns dates, timestamps and numbers in DOCUMENTS' storage format. (In the DOCUMENTS Manager see menu 'Documents/Settings', dialog page 'Locale/format', group 'Format settings'.) If you prefer JavaScript numbers and dates, you can simply read the columns as a property DocHit.columnName. 
* @param {string} colName The name of the column. 
* @returns {string} The technical value of the given column as String. 
* @since DOCUMENTS 4.0b 
* @see [getTechValue,DocHit.columnName]{@link getTechValue,DocHit#columnName} 
**/
/**
* @memberof DocHit
* @function isArchiveHit
* @instance
* @summary Function to test whether the associated file is an archive file. 
* @returns {boolean} true, if the associated file is an archive file, false otherwise. 
* @since DOCUMENTS 4.0b 
**/
/**
* @interface DocQueryParams
* @summary This class encapsulates the basic parameters of a Documents search request. 
* @description Only the script-exits "OnSearch" and "FillSearchMask" provide access to such an object. See also Context.getQueryParams().
**/
/**
 * @memberof DocQueryParams
 * @typedef requestTypeConstants
 * @enum
 * @description These constants are equally available in each instance of DocQueryParams and in the constructor object. 
 * @instance 
 * @property {number} DIRECT Integer code for the requestType "direct fultext search".  
 * @property {number} EXTENDED Integer code for the requestType "extended search".  
 * @property {number} FOLDER_S Integer code for the requestType "static folder".  In the current release, this type can occur only, if the Documents setting "search field in folder" is enabled. 
 * @property {number} FOLDER_D Integer code for the requestType "dynamic folder".  Listing the contents of such a folder already triggers a search request. 
 * @property {number} REGISTER Integer code for the requestType "link register".  
 * @property {number} REFERENCE Integer code for the request type "reference field destination selection".  This request type originates from the web dialog, which opens, when a user is editing a file and presses a reference fields select button. 
 * @property {number} API Integer code for the requestType "API search".  (Archive-)FileResultsets, HitResultSets and the SOAP report functions belong to this category. 
 * @property {number} FILING_PLAN Integer code for the requestType "filing plan node".  
 * @property {number} QUICK_VIEW Integer code for the requestType "quick view".  Quick view URLs with just an id-Parameter do not trigger a search. 
 * @property {number} SCRIPT_TREE Integer code for the request type "script controlled hit tree generation".  This is a special feature, where a script in the web server process sends a seach request and immediately generates a hit tree from the results. The tabular list is not displayed in this case. 
 */
/**
* @memberof DocQueryParams
* @summary The number of filled in search fields in the query (read-only). 
* @description This is in other words the number of conditions in the query. 
* Note: Attaching a default value to a search field does not fill it in this context. Default values are being stored separately from concrete search values, for technical reasons. 
* @member {number} filledSearchFieldCount
* @instance
**/
/**
* @memberof DocQueryParams
* @summary The type (or trigger) of the search request (read-only). 
* @description See the enumeration constants in this class. If Documents encounters a request, which it cannot categorize exactly, it will return the nearest match with respect to the server's internal interfaces. 
* @member {number} requestType
* @instance
**/
/**
* @memberof DocQueryParams
* @summary The number of declared search fields in the query (read-only). 
* @description This count may include fields from a search mask, which have not been filled in. 
* @member {number} searchFieldCount
* @instance
**/
/**
* @memberof DocQueryParams
* @summary The (technical) name of the selected search mask, if available (read only). 
* @description Remark: The value is an empty string, if the query has been prepared without a search mask or with an anonymous mask (controlled by "show in search mask" checkboxes). 
* Search mask names are unique with regard to a single searchable resource. As soon as multiple resources are involved, the names are often ambiguous, because each resource may supply a search mask with the same name. 
* To obtain a better identifier, the script may combine the mask's name and the resId of the first selected resource. 
* However, even this identifier is not always unique. If a user has selected multiple EE.x views and the DOCUMENTS property "UseMainArchives" is undefined or zero, the query does not specify a main resource. DOCUMENTS then passes the RetrievalSource objects with random order. In this case the script cannot distinguish search masks with equal names. 
* @member {string} searchMaskName
* @instance
**/
/**
* @memberof DocQueryParams
* @summary The number of searchable resources involved in the query (read-only). 
* @member {number} sourceCount
* @instance
**/
/**
* @memberof DocQueryParams
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DocQueryParams
* @function getSearchField
* @instance
* @summary Get a descriptive object of one of the search fields (conditions), which are declared in the query. 
* @description Remark: If the request has been prepared with any kind of searck mask in the background, all available fields of that mask appear in the internal list, not only those, which the user has filled in. The skipEmpty flag provides a simple opportunity to examine only effective search conditions. 
*  Internally generated conditions (for example ACL-filters) cannot be returned by this function. 
* Attaching a default value to a field does not modify its "empty" state in terms of this function. 
* @param {number} index The index of the desired search field. The valid range is 0 to (filledSearchFieldCount - 1), if the flag skipEmpty is set. Otherwise the range is 0 to (searchFieldCount - 1). 
* @param {boolean} skipEmpty An optional boolean to treat all empty search fields as non-existing. By default all fields can be examined. 
* @returns {RetrievalField} A RetrievalField object, which contains a search field name, an operator and (sometimes) a value expression. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DocQueryParams
* @function getSource
* @instance
* @summary Get a descriptive object of one selected search resource. 
* @param {number} index The integer index of the resource in the internal list. Range: 0 to (sourceCount - 1) 
* @returns {RetrievalSource} A RetrievalSource object on success, otherwise null. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DocQueryParams
* @function removeSource
* @instance
* @summary Remove a search resource from the query. 
* @description Note: The access to this function is restricted. Only the "OnSearchScript" can effectively use it. 
* Remark: The id can be read from the property RetrievalSource.resId. Valid index values range from 1 to (sourceCount - 1). The resource at index 0 cannot be removed (see the class details). After a succesful call, the sourceCount and the index of each subsequent resource in the list are decreased by one. 
*  The method does not perform type-checking on the refSource parameter. It interprets a value like "12345" always as an index, even when this value has been passed as a string. 
* @param {any} refSource Either the current integer index or the id of the resource. 
* @returns {boolean} A boolean value, which indicates a succesful call. 
* @since DOCUMENTS 4.0c 
**/
/**
* @interface Document
* @summary The Document class has been added to the DOCUMENTS PortalScripting API to gain full access to the documents stored on registers of a DOCUMENTS file by scripting means. 
**/
/**
* @memberof Document
* @summary The file size of the Document object. 
* @member {string} bytes
* @instance
**/
/**
* @memberof Document
* @summary Info, if the blob is encrypted in the repository. 
* @member {boolean} encrypted
* @instance
**/
/**
* @memberof Document
* @summary The extension of the Document object. 
* @member {string} extension
* @instance
**/
/**
* @memberof Document
* @summary The complete filename (name plus extension) of the Document object. 
* @member {string} fullname
* @instance
**/
/**
* @memberof Document
* @summary The name (without extension) of the Document object. 
* @member {string} name
* @instance
**/
/**
* @memberof Document
* @summary The file size of the Document object. 
* @member {string} size
* @instance
**/
/**
* @memberof Document
* @function deleteDocument
* @instance
* @summary Delete the Document object. 
* @description With the necessary rights you can delete a document of the file. Do this only on scratch copies (startEdit, commit) 
* Note: It is strictly forbidden to access the Document object after this function has been executed successfully; if you try to access it, your script will fail, because the Document does not exist any longer in DOCUMENTS. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.60b / otrisPORTAL 6.0b 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* // Deletion of the first document of the register "docs"
* var myFile = context.file;
* if (!myFile)
* {
*    util.out("missing file");
*    return -1;
* }
* 
* var myReg = myFile.getRegisterByName("docs");
* if (!myReg)
* {
*    util.out("missing >docs< register");
*    return -1;
* }
* 
* var firstDoc = myReg.getDocuments().first();
* if (!firstDoc)
* {
*    return 0; // Nothing to do
* }
* 
* if (!myFile.startEdit())
* {
*    util.out("Unable to create scratch copy: " + myFile.getLastError());
*    return -1;
* }
* 
* if (!firstDoc.deleteDocument())
* {
*    util.out(firstDoc.getLastError());
*    myFile.abort();
*    return -1;
* }
* 
* if (!myFile.commit())
* {
*    util.out("commit failed: " + myFile.getLastError());
*    myFile.abort();
*   return -1;
* }
* return 0;
**/
/**
* @memberof Document
* @function downloadDocument
* @instance
* @summary Download the Document to the server's filesystem for further use. 
* @param {string} filePath Optional string specifying where the downloaded Document to be stored. 
* Note: A file path containing special characters can be modified due to the encoding problem. The modified file path will be returned. 
* @param {string} version Optional string value specifying which version of this Document to be downloaded (e.g. "2.0"). The default value is the active version. 
* Note: This parameter is ignored for an archive document. 
* @returns {string} String containing full path and file name of the downloaded Document, an empty string in case of any error. 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 4.0 (new parameter filePath) 
* @since DOCUMENTS 4.0d (new parameter version)
* @example
* // Example 1
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
* var docIter = reg.getDocuments();
* if (docIter && docIter.size() > 0)
* {
*    var doc = docIter.first();
*    var docPath = doc.downloadDocument();
*    var txtFile = new File(docPath, "r+t");
*    if (txtFile.ok())
*    {
*       var stringVar = txtFile.readLine(); // read the first line
*       txtFile.close();
*    }
* }
* @example
* // Example 2
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
* var docIter = reg.getDocuments();
* if (docIter && docIter.size() > 0)
* {
*    var doc = docIter.first();
*    var docPath = "C:\\tmp\\test.txt";
*    docPath = doc.downloadDocument(docPath, "2.0"); // since DOCUMENTS 4.0d
*    if (docPath == "")
*     util.out(doc.getLastError());
* }
**/
/**
* @memberof Document
* @function getAsPDF
* @instance
* @summary Create a PDF file containing the current Document's contents and return the path in the file system. 
* @description The different document types of your documents require the appropriate PDF filter programs to be installed and configured in DOCUMENTS. 
* @returns {string} String with file path of the PDF, an empty string in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Doc1");
* var docIt = reg.getDocuments();
* for (doc = docIt.first(); doc; doc = docIt.next())
* {
*   var pathPdfFile = doc.getAsPDF();
*   if (pathPdfFile == "")
*       util.out(doc.getLastError());
*   else
*    util.out("File path: " + pathPdfFile);
* }
**/
/**
* @memberof Document
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the Document. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof Document
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof Document
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof Document
* @function moveToRegister
* @instance
* @summary Move the Document to another document Register of the file. 
* @description With the necessary rights you can move the Document to another document Register of the file. 
* Note: This operation is not available for a Document located in an archive file. 
* @param {Register} regObj The Register this Document will be moved to. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var file = context.file;
* if (!file.isArchiveFile())
* {
*    var regDoc1 = file.getRegisterByName("Doc1");
*    var regDoc2 = file.getRegisterByName("Doc2");
*    var docIt = regDoc2.getDocuments();
*    for (var doc = docIt.first(); doc; doc = docIt.next())
*    {
*       if (!doc.moveToRegister(regDoc1))
*           util.out(doc.getLastError());
*    }
* }
**/
/**
* @memberof Document
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the Document to the desired value. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof Document
* @function uploadDocument
* @instance
* @summary Upload a file stored on the server's filesystem for replacing or versioning this Document. 
* @description Note: After successful upload of the Document the source file on the server's directory structure is removed! 
* @param {string} sourceFilePath String containing the path of the desired file to be uploaded. 
* Note: Backslashes contained in the filepath must be quoted with a leading backslash, since the backslash is a special char in ECMAScript! 
* @param {boolean} versioning Optional flag: true for versioning the Document and false for replacing it. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
* var docIter = reg.getDocuments();
* if (docIter && docIter.size() > 0)
* {
*    var doc = docIter.first();
*    if (!doc.uploadDocument("c:\\tmp\\test.txt", true))
*       util.out(doc.getLastError());
* }
**/
/**
* @interface DocumentIterator
* @summary The DocumentIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the documents stored on registers of a DOCUMENTS file by scripting means. 
**/
/**
* @memberof DocumentIterator
* @function first
* @instance
* @summary Retrieve the first Document object in the DocumentIterator. 
* @returns {Document} Document or null in case of an empty DocumentIterator
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof DocumentIterator
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof DocumentIterator
* @function next
* @instance
* @summary Retrieve the next Document object in the DocumentIterator. 
* @returns {Document} Document or null if end of DocumentIterator is reached. 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof DocumentIterator
* @function size
* @instance
* @summary Get the amount of Document objects in the DocumentIterator. 
* @returns {number} integer value with the amount of Document objects in the DocumentIterator
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @interface DOMAttr
* @summary This class models a single attribute of a DOMElement. 
**/
/**
* @memberof DOMAttr
* @summary The name of the attribute. 
* @description This property is readonly. 
* @member {string} name
* @instance
**/
/**
* @memberof DOMAttr
* @summary A flag to test, whether the attribute's value has been explicitly specified. 
* @description The flag is true, if the value was explicitly contained in a parsed document. The flag is also true, if the script has set the property "value" of this DOMAttr object. The flag is false, if the value came from a default value declared in a DTD. The flag is readonly. 
* @member {boolean} specified
* @instance
**/
/**
* @memberof DOMAttr
* @summary The value of the attribute as a string. 
* @description Character and general entity references are replaced with their values. 
* @member {string} value
* @instance
**/
/**
* @interface DOMCharacterData
* @summary DOMCharacterData represents text-like nodes in the DOM tree. 
**/
/**
* @memberof DOMCharacterData
* @summary The text data in the node. 
* @member {string} data
* @instance
**/
/**
* @memberof DOMCharacterData
* @summary The text length in the node. 
* @description This property is readonly. 
* @member {number} length
* @instance
**/
/**
* @memberof DOMCharacterData
* @function appendData
* @instance
* @summary Append some string to the text. 
* @param {string} arg The string to append. 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMCharacterData
* @function deleteData
* @instance
* @summary Delete a section of the text. 
* @param {number} offset The zero-based position of the first character to delete. 
* @param {number} count The number of characters to delete. 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMCharacterData
* @function insertData
* @instance
* @summary Insert some string into the text. 
* @param {number} offset A zero-based position. On return, the inserted string will begin here. 
* @param {string} arg The string to insert. 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMCharacterData
* @function replaceData
* @instance
* @summary Replace a section of the text with a new string. 
* @param {number} offset The zero-based position of the first character to be replaced. 
* @param {number} count The number of characters to replace. 
* @param {string} arg The string replacing the old one. 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMCharacterData
* @function splitText
* @instance
* @summary Split a text node into two. 
* @description The new node becomes the next sibling of this node in the tree, and it has got the same nodeType. 
* Note: Future releases of the API may expose this method only in a new subclass DOMText. See also the W3C conformity remarks in the class description. If a script calls this method on a "Comment" node. it will trigger a JavaScript error, because "Comment" is not derived from "Text" in the standard API. 
* @param {number} offset The zero-based index of the character, which will become the first character of the new node. 
* @returns {DOMCharacterData} The new text node. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMCharacterData
* @function substringData
* @instance
* @summary Extract a substring of the node's text. 
* @param {number} offset The zero-based index of the first character to extract. 
* @param {number} count The number of characters to extract. 
* @returns {string} The requested substring. 
* @since DOCUMENTS 4.0c 
**/
/**
* @class DOMDocument
* @summary The DOMDocument is the root of a DOM tree. 
* @description The constructor of this class always creates an empty document structure. Use the class DOMParser to obtain the structure of an existing XML. To create any new child nodes, a script must call the appropriate create method of the DOMDocument. It is not possible to create child nodes standalone.
**/
/**
* @memberof DOMDocument
* @summary The node, which represents the outermost structure element of the document. 
* @description This property is readonly. 
* Remark: Unlike written in older versions of this document, the documentElement is not necessarily the first child of the DOMDocument. A DocumentType node, for example, may precede it in the list of direct children. 
* @member {DOMElement} documentElement
* @instance
**/
/**
* @memberof DOMDocument
* @function createAttribute
* @instance
* @summary Create a new atttribute within this document. 
* @param {string} name The name of the attribute. 
* @returns {DOMAttr} A new DOMAttr object, which may initially appear anywhere or nowhere in the DOM tree. 
* @since DOCUMENTS 4.0c 
* @see [DOMElement.setAttributeNodetoplacethenodewithinthetree.]{@link DOMElement#setAttributeNodetoplacethenodewithinthetree#} 
**/
/**
* @memberof DOMDocument
* @function createCDATASection
* @instance
* @summary Create a new CDATA section within this document. 
* @description Remarks about W3C conformity
* 
*  The W3C specifies the return type as "CDATASection". Considering code size (and work) the actual implementation omits a class CDATASection and presents the only additional member (splitText(), inherited from "Text") directly in the second level base class. Scripts can examine DOMNode.nodeType to distinguish different types of character data, if necessary. 
* @param {string} data The data for the node 
* @returns {DOMCharacterData} A new DOMCharacterData object, which may initially appear anywhere or nowhere in the DOM tree. 
* @since DOCUMENTS 4.0c 
* @see [DOMNode.appendChildtoplacethenodewithinthetree.]{@link DOMNode#appendChildtoplacethenodewithinthetree#} 
**/
/**
* @memberof DOMDocument
* @function createComment
* @instance
* @summary Create a new comment node within this document. 
* @description Remarks about W3C conformity
* 
*  The W3C specifies the return type as "Comment". Considering code size (and work) the actual implementation omits a class DOMComment, which would not get any more members apart from the inherited ones. Scripts can examine DOMNode.nodeType to distinguish different types of character data, if necessary. 
* @param {string} data The data for the node 
* @returns {DOMCharacterData} A new DOMCharacterData object, which may initially appear anywhere or nowhere in the DOM tree. 
* @since DOCUMENTS 4.0c 
* @see [DOMNode.appendChildtoplacethenodewithinthetree.]{@link DOMNode#appendChildtoplacethenodewithinthetree#} 
**/
/**
* @memberof DOMDocument
* @function createElement
* @instance
* @summary Create a new DOMElement within this document. 
* @param {string} tagName The name of the element. 
* @returns {DOMElement} A new DOMElement, which may initially appear anywhere or nowhere in the DOM tree. 
* @since DOCUMENTS 4.0c 
* @see [DOMNode.appendChildtoplacetheelementwithinthetree.]{@link DOMNode#appendChildtoplacetheelementwithinthetree#} 
**/
/**
* @memberof DOMDocument
* @function createTextNode
* @instance
* @summary Create a new text node within this document. 
* @description Remarks about W3C conformity
* 
*  The W3C specifies the return type as "Text". Considering code size (and work) the actual implementation omits a class DOMText and presents the only additional member (splitText()) directly in the base class. Scripts can examine DOMNode.nodeType to distinguish different types of character data, if necessary. 
* @param {string} data The data for the node 
* @returns {DOMCharacterData} A new DOMCharacterData object, which may initially appear anywhere or nowhere in the DOM tree. 
* @since DOCUMENTS 4.0c 
* @see [DOMNode.appendChildtoplacethenodewithinthetree.]{@link DOMNode#appendChildtoplacethenodewithinthetree#} 
**/
/**
* @memberof DOMDocument
* @constructor DOMDocument
* @summary Create a new empty XML document structure. 
* @param {string} rootElementName A qualified name for the document element. 
* @returns {any} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMDocument
* @function getElementsByTagName
* @instance
* @summary List all DOMElements in the document with a certain tag name. 
* @description The order of the elements in the returned list corresponds to a preorder traversal of the DOM tree. 
* @param {string} tagName The name to match on. The special value "*" matches all tags. 
* @returns {DOMNodeList} A dynamic list of the found elements. 
* @since DOCUMENTS 4.0c 
* @see [DOMNodeList.]{@link DOMNodeList#} 
**/
/**
* @interface DOMElement
* @summary An object of this class represents a HTML or XML element in the DOM. 
**/
/**
* @memberof DOMElement
* @summary The name of the element. 
* @description This property is readonly. 
* @member {string} tagName
* @instance
**/
/**
* @memberof DOMElement
* @function getAttribute
* @instance
* @summary Get the string value of an attribute of this element. 
* @param {string} name The name of the attribute 
* @returns {string} The atrribute's value or the empty string, if the attribute is not specified and has not got a default value. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMElement
* @function getAttributeNode
* @instance
* @summary Get an attribute of this element. 
* @param {string} name The attribute's name 
* @returns {DOMAttr} The object, which represents the attribute in the DOM. If no attribute of the given name exists, the value is null. 
**/
/**
* @memberof DOMElement
* @function getElementsByTagName
* @instance
* @summary List all DOMElements in the subtree with a certain tag name. 
* @description The order of the elements in the returned list corresponds to a preorder traversal of the DOM tree. 
* @param {string} tagName The name to match on. The special value "*" matches all tags. 
* @returns {DOMNodeList} A dynamic list of the found elements. 
* @since DOCUMENTS 4.0c 
* @see [DOMNodeList.]{@link DOMNodeList#} 
**/
/**
* @memberof DOMElement
* @function removeAttribute
* @instance
* @summary Remove an attribute from this element by name. 
* @param {string} name The attribute's name 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMElement
* @function removeAttributeNode
* @instance
* @summary Remove an attribute node from this element. 
* @param {DOMAttr} oldAttr The attribute object to remove 
* @returns {DOMAttr} The removed attribute node. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMElement
* @function setAttribute
* @instance
* @summary Set an attribute of this element by string. 
* @description If an attribute of the given name exists, the method only updates its value. Otherwise it creates the attribute. 
* @param {string} name The attribute's name 
* @param {string} value The new value of the attribute 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMElement
* @function setAttributeNode
* @instance
* @summary Attach an attribute node to this element. 
* @param {DOMAttr} newAttr The DOMAttr object, which defines the attribute to add or replace. 
* @returns {DOMAttr} The formerly attached DOMAttr, if the call has replaced an attribute with the same name. Otherwise the method returns null. 
* @since DOCUMENTS 4.0c 
**/
/**
* @interface DOMException
* @summary Many of the DOM API functions throw a DOMException, when an error has occurred. 
* @description Remarks about W3C conformity
* 
*  The class implements the DOMException exception type with the error codes specified in DOM level 2. 
**/
/**
 * @memberof DOMException
 * @typedef Errorcodeconstants
 * @enum
 * @description All these constants are also available as properties of the constructor.DOCUMENTS 4.0c 
 * @instance 
 * @property {number} INDEX_SIZE_ERR The index or size is negative, or greater than the allowed value.  
 * @property {number} DOMSTRING_SIZE_ERR The specified range of text does not fit into a DOMString.  
 * @property {number} HIERARCHY_REQUEST_ERR Any node is inserted somewhere it doesn't belong.  
 * @property {number} WRONG_DOCUMENT_ERR A node is used in a different document than the one that created it.  
 * @property {number} INVALID_CHARACTER_ERR An invalid or illegal character is specified, such as in a name.  
 * @property {number} NO_DATA_ALLOWED_ERR Data is specified for a node which does not support data.  
 * @property {number} NO_MODIFICATION_ALLOWED_ERR An attempt is made to modify an object where modifications are not allowed.  
 * @property {number} NOT_FOUND_ERR An attempt is made to reference a node in a context where it does not exist.  
 * @property {number} NOT_SUPPORTED_ERR The implementation does not support the requested type of object or operation.  
 * @property {number} INUSE_ATTRIBUTE_ERR An attempt is made to add an attribute that is already in use elsewhere.  
 * @property {number} INVALID_STATE_ERR An attempt is made to use an object that is not, or is no longer, usable.  
 * @property {number} SYNTAX_ERR An invalid or illegal string is specified.  
 * @property {number} INVALID_MODIFICATION_ERR An attempt is made to modify the type of the underlying object.  
 * @property {number} NAMESPACE_ERR An attempt is made to create or change an object in a way which is incorrect with regard to namespaces.  
 * @property {number} INVALID_ACCESS_ERR A parameter or an operation is not supported by the underlying object.  
 * @property {number} VALIDATION_ERR A call to a method such as insertBefore or removeChild would make the Node invalid with respect to "partial validity", this exception would be raised and the operation would not be done.  
 */
/**
* @memberof DOMException
* @readonly
* @summary An error code. 
* @description See the error constants in this class. 
* @member {number} code
* @instance
**/
/**
* @memberof DOMException
* @readonly
* @summary An error message. 
* @member {string} message
* @instance
**/
/**
* @interface DOMNamedNodeMap
* @summary A DOMNamedNodeMap is a kind of index for a set of DOMNodes, in which each node has got a unique name. 
* @description The attributes of a DOMElement are organized in a DOMNamedNodeMap. See DOMElement.attributes. The attached nodes can be accessed either by the name or by an integer index. When using an index, the output order of the nodes is not determined. Objects of this class cannot be created directly.
**/
/**
* @memberof DOMNamedNodeMap
* @summary The number of nodes in the map. 
* @description This property is readonly. 
* @member {number} length
* @instance
**/
/**
* @memberof DOMNamedNodeMap
* @function getNamedItem
* @instance
* @summary Get a node from the map by its unique name. 
* @param {string} name The name. 
* @returns {DOMNode} The node, respectively null, if no node with the name is in the map. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNamedNodeMap
* @function item
* @instance
* @summary Get the a node from the map at a certain position. 
* @description This is useful only to iterate over all nodes in the map. 
* Remark: It is also possible to access the nodes using square brackets, as if the object would be an array. 
* @param {number} index the zero based index of the element. 
* @returns {DOMNode} The requested DOMNode Object. If the index is invalid, the method returns null. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNamedNodeMap
* @function removeNamedItem
* @instance
* @summary Remove a node from the map. 
* @param {string} name The unique node name. 
* @returns {DOMNode} The removed node. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNamedNodeMap
* @function setNamedItem
* @instance
* @summary Add a node to the map or replace an existing one. 
* @param {DOMNode} arg The node to add. The name for indexing is the value of the attribute DOMNode.nodeName, 
* @returns {DOMNode} If a node with the same name has already been added, the method removes that node and returns it. Otherwise it returns null. 
* @since DOCUMENTS 4.0c 
**/
/**
* @interface DOMNode
* @summary DOMNode is the base class of all tree elements in a DOMDocument. 
* @description DOMNodes cannot be created with new. Different create methods of DOMDocument can be used to create different types of nodes. 
* Note: Accessing any node may generate a JavaScript error, when the owning document has been deleted or "garbage collected". See the negative example at class DOMDocument.Remarks about W3C conformity
* 
*  The class covers the Node interface of DOM level 1. The underlying native library already supports at least level 2. 
**/
/**
 * @memberof DOMNode
 * @typedef NodeTypeConstants
 * @enum
 * @description These constants build an enumeration of the possible values of the property nodeType. The constants are also properties of the constructor, so it is possible to read them in the style DOMNode.ELEMENT_NODE. 
 * @instance 
 * @property {number} ELEMENT_NODE Constant for the nodeType "Element". The actual subclass is DOMElement.  
 * @property {number} ATTRIBUTE_NODE Constant for the nodeType "Attr". The actual subclass is DOMAttr.  
 * @property {number} TEXT_NODE Constant for the nodeType "Text". The actual subclass is DOMCharacterData, differing from the standard.  
 * @property {number} CDATA_SECTION_NODE Constant for the nodeType "CDATASection". The actual subclass is DOMCharacterData, differing from the standard.  
 * @property {number} ENTITY_REFERENCE_NODE Constant for the nodeType "EntityReference". The actual implementation does not provide a subclass for this type.  
 * @property {number} ENTITY_NODE Constant for the nodeType "Entity". The actual implementation does not provide a subclass for this type.  
 * @property {number} PROCESSING_INSTRUCTION_NODE Constant for the nodeType "ProcessingInstruction". The actual implementation does not provide a subclass for this type.  
 * @property {number} COMMENT_NODE Constant for the nodeType "Comment". The actual subclass is DOMCharacterData, differing from the standard.  
 * @property {number} DOCUMENT_NODE Constant for the nodeType "Document". The actual subclass is DOMDocument.  
 * @property {number} DOCUMENT_TYPE_NODE Constant for the nodeType "DocumentType". The actual implementation does not provide a subclass for this type.  
 * @property {number} DOCUMENT_FRAGMENT_NODE Constant for the nodeType "DocumentFragment". The actual implementation does not provide a subclass for this type.  
 * @property {number} NOTATION_NODE Constant for the nodeType "Notation". The actual implementation does not provide a subclass for this type.  
 */
/**
* @memberof DOMNode
* @summary A map of DOM attributes. If this node is not a DOMElement, the value is null. The property is readonly. 
* @member {DOMNamedNodeMap} attributes
* @instance
**/
/**
* @memberof DOMNode
* @summary A list of all children of this node. The property is readonly. 
* @member {DOMNodeList} childNodes
* @instance
**/
/**
* @memberof DOMNode
* @summary The first child node, otherwise null. The property is readonly. 
* @member {DOMNode} firstChild
* @instance
**/
/**
* @memberof DOMNode
* @summary The last child node, otherwise null. The property is readonly. 
* @member {DOMNode} lastChild
* @instance
**/
/**
* @memberof DOMNode
* @summary The next sibling node, otherwise null. The property is readonly. 
* @member {DOMNode} nextSibling
* @instance
**/
/**
* @memberof DOMNode
* @summary The name of this node. The property is readonly. 
* @member {string} nodeName
* @instance
**/
/**
* @memberof DOMNode
* @summary The type or subclass of a this node, encoded as an integer. The property is readonly. 
* @member {number} nodeType
* @instance
**/
/**
* @memberof DOMNode
* @summary The value of the node, which depends on the type. 
* @description For several node types, the value is constantly an empty string. See also the W3C documentation in the internet. 
* @member {string} nodeValue
* @instance
**/
/**
* @memberof DOMNode
* @summary The document, which owns this node. The property is readonly. 
* @member {DOMDocument} ownerDocument
* @instance
**/
/**
* @memberof DOMNode
* @summary The parent node or null. The property is readonly. 
* @member {DOMNode} parentNode
* @instance
**/
/**
* @memberof DOMNode
* @summary The previous sibling node, otherwise null. The property is readonly. 
* @member {DOMNode} previousSibling
* @instance
**/
/**
* @memberof DOMNode
* @function appendChild
* @instance
* @summary Append a new node to the list of child nodes. 
* @param {DOMNode} newChild The DOMNode to append. 
* @returns {DOMNode} The node added. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function cloneNode
* @instance
* @summary Create a duplicate of this node. 
* @description Remark: The returned node initially has not got a parent. 
* @param {boolean} deep true to clone also the whole subtree, false to clone only the node (including the attributes, if it is a DOMElement). 
* @returns {DOMNode} The copy. The actual type equals the type of this. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function hasAttributes
* @instance
* @summary Test, whether a node has got any associated attributes. 
* @returns {boolean} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function hasChildNodes
* @instance
* @summary Test, whether a node has got any associated child nodes. 
* @returns {boolean} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function insertBefore
* @instance
* @summary Insert a new node into the list of child nodes. 
* @param {DOMNode} newChild The DOMNode to insert. 
* @param {DOMNode} refChild An existing DOMNode, which already is a child of this, and which shall become the next sibling of newChild. 
* @returns {DOMNode} The node inserted. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function normalize
* @instance
* @summary Normalize the node ans its subtree. 
* @description This method restructures a DOMDocument (or a subtree of it) as if the document was written to a string and reparsed from it. Subsequent "Text" nodes without any interjacent markup are combined into one node, for example. 
* @returns {void} 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function removeChild
* @instance
* @summary Remove a node from the list of child nodes. 
* @param {DOMNode} oldChild The child DOMNode being removed. 
* @returns {DOMNode} The node removed. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMNode
* @function replaceChild
* @instance
* @summary Replace a node in the list of child nodes. 
* @param {DOMNode} newChild The DOMNode to insert. 
* @param {DOMNode} oldChild The child DOMNode being replaced. 
* @returns {DOMNode} The node replaced. 
* @since DOCUMENTS 4.0c 
**/
/**
* @interface DOMNodeList
* @summary A dynamic, ordered list of DOMNodes. 
* @description These lists always reflect the actual state of the DOM tree, which can differ from that state, when the list has been created. Getting the nodes from the list works with an integer index in square brackets, as if the list object would be an Array. DOMNodeLists cannot be created directly. Some methods or properties of DOMNode and its subclasses can create them.
**/
/**
* @memberof DOMNodeList
* @summary The actual number of nodes in the list. 
* @member {number} length
* @instance
**/
/**
* @memberof DOMNodeList
* @function item
* @instance
* @summary Returns the element at a certain position. 
* @description This is just the same as using the square brackets on the object. 
* @param {number} index The zero-based position of the requested element 
* @returns {DOMNode} The DOMNode at the requested index. In the case of an invalid index the return value is null. 
* @since DOCUMENTS 4.0c 
**/
/**
* @class DOMParser
* @summary This class provides basic methods to parse or synthesize XML documents using the Document Object Model (DOM). 
**/
/**
 * @memberof DOMParser
 * @typedef ErrorConstants
 * @enum
 * @description In contrast to many other methods of the DOM API, the parse() method does not forward exceptions of the native parser to the calling script. It rather stores the error text in a buffer, which the script can read with getLastError(). The return value signals the type of the exception, which equals one of these constants. The constants are also properties of the constructor, so it is possible to read them in the style DOMParser.ErrCatDOM . 
 * @instance 
 * @property {number} ErrCatNone This constant with the value zero indicates "no error".  
 * @property {number} ErrCatEnv This constant represents errors detected by interface code outside the native parser.  
 * @property {number} ErrCatXML This constant represents a caught exception of the type "XMLException".  
 * @property {number} ErrCatSAX This constant represents a caught exception of the type "SAXException".  
 * @property {number} ErrCatDOM This constant represents a caught exception of the type "DOMException".  
 */
/**
* @memberof DOMParser
* @constructor DOMParser
* @summary The constructor actually takes no arguments. 
* @returns {any} 
**/
/**
* @memberof DOMParser
* @function getDocument
* @instance
* @summary This returns the root of the DOM tree after a successful call of parse(), otherwise null. 
* @returns {DOMDocument} 
**/
/**
* @memberof DOMParser
* @function getLastError
* @instance
* @summary This returns the text of the last occurred error. 
* @returns {string} 
**/
/**
* @memberof DOMParser
* @function parse
* @instance
* @summary Parse an XML document, either from a String or from a local file. 
* @description Remark: On success, call getDocument() to access the DOM tree. On error use getLastError() to obtain an error text. 
*  The encapsulated native DOM library supports the following character encodings: ASCII, UTF-8, UTF-16, UCS4, EBCDIC code pages IBM037, IBM1047 and IBM1140, ISO-8859-1 (aka Latin1) and Windows-1252. (no guarantee)
* @param {string} xml Either the XML itself or the path and file name of a local file 
* @param {boolean} fromFile true to parse a local file, otherwise false. 
* @returns {number} An integer, which describes an error category. See ErrCatNone and further constants. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof DOMParser
* @function write
* @instance
* @summary Build an XML document from a DOM tree. 
* @description Note: Saving to a local file is not supported on all platforms. If a script tries it while the version of the native DOM library is too old, the method just throws a JavaScript error. 
* Remark: To obtain an error message use getLastError(). When the message is just "NULL pointer", the native DOM library may have failed to open the output file for writing. When the method writes to a string, the encoding is always the server application's internal encoding. 
*  The encapsulated native DOM library supports the following character encodings: ASCII, UTF-8, UTF-16, UCS4, EBCDIC code pages IBM037, IBM1047 and IBM1140, ISO-8859-1 (aka Latin1) and Windows-1252. (no guarantee)
* @param {DOMNode} node The root node to build the document from. Though the interface accepts any DOMNode, only a DOMDocument should be passed. Otherwise the output may be a fragment which is not a valid XML. 
* @param {string} path Optional path and filename to save the XML in the local file system. 
* @param {string} encoding Optional encoding specification for the file. Only used when path is also specified. 
* @param {boolean} prettyPrint Optional boolean value. 
* @returns {any} The return type depends on the parameters. After saving to a local file, the method returns a boolean value, which indicates the success of the operation. Otherwise the return value is a String with the XML itself, or an empty string after an error. 
* @since DOCUMENTS 4.0c 
* @since Parameter prettyPrint since DOCUMENTS 5.0b HF3 
**/
/**
* @interface E4X
* @description Use DOMParser instead. 
**/
/**
* @class Email
* @summary The Email class allows to create and send an email. 
* @description All the email settings for the principal (such as SMTP server and authentication) are used when sending an email. 
**/
/**
* @memberof Email
* @function addAttachment
* @instance
* @summary Add an attachment to the email. 
* @param {any} attachment Document object or string value containing the attachment name of the Email. 
* @param {string} sourceFilePath Optional string value containing the path of the file to be attached and stored on the server's filesystem in case the first parameter is a string specifying the attachment name. You may only delete this file after calling the function send(). 
* Note: This Parameter is ignored in case the first parameter is a Document object.
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var mail = new Email("receiver@domain.de", "sender@domain.de", "Test", "This is a test.");
* if (!mail.addAttachment("log.txt", "C:\\tmp\\changelog.txt"))
*   util.out(mail.getLastError());
**/
/**
* @memberof Email
* @constructor Email
* @summary Create a new instance of the Email class. 
* @description In case of multiple recipients for the parameters to, cc or bcc, the individual email addresses are to be separated by a comma (,). It is not allowed to send an email without any primary recipients specified by the parameter to. To send a HTML email the body must begin with the <HTML> tag. Emails in following cases are stored in the folder Administration > Sent eMails in the DOCUMENTS Manager: 
* <ul>
* <li>They are to be sent in the future (specified by sendingTime); </li>
* <li>Sending them failed; </li>
* <li>The parameter deleteAfterSending is set to false.</li>
* </ul>
* 
* @param {string} to String value containing the email addresses of primary recipients. 
* @param {string} from Optional string value containing the sender's email address. If no sender is specified, the default sender for the principal is used. 
* @param {string} subject Optional string value containing the subject of the email. 
* @param {string} body Optional string value containing the content of the email. 
* @param {string} cc Optional string value containing the email addresses of carbon-copy recipients (appearing in the header of the email). 
* @param {string} bcc Optional string value containing the email addresses of blind carbon-copy recipients (remaining invisible to other recipients). 
* @param {Date} sendingTime Optional Date object specifying when the email is to be sent. If sending time is not specified, the email will be sent immediately by calling send(). 
* @param {boolean} deleteAfterSending Optional flag indicating whether the email is to be deleted after successful sending. The default value is true.
* @returns {Email} 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function getLastError
* @instance
* @summary Get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function send
* @instance
* @summary Send the email to recipients. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var mail = new Email("receiver@domain.de");
* mail.setSubject("Test");
* mail.setBody("This is a test mail.");
* if (!mail.send())
*   util.out(mail.getLastError());
**/
/**
* @memberof Email
* @function setBCC
* @instance
* @summary Set blind carbon-copy recipients of the email. 
* @param {string} bcc String containing the email addresses of blind carbon-copy recipients. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function setBody
* @instance
* @summary Set the content of the email. 
* @param {string} body String containing the content of the email. 
* Note: To send a HTML email the body must begin with the <HTML> tag. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var mail = new Email("receiver@domain.de");
* mail.setSubject("Test");
* mail.setBody("<HTML>This is a &#x3c;HTML&#x3e; mail.");
* if (!mail.send())
*   util.out(mail.getLastError());
**/
/**
* @memberof Email
* @function setCC
* @instance
* @summary Set carbon-copy recipients of the email. 
* @param {string} cc String containing the email addresses of carbon-copy recipients. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function setDeleteAfterSending
* @instance
* @summary Decide on whether the email is to be deleted after successful sending. 
* @param {boolean} deleteAfterSending boolean value indicating whether the email is to be deleted after successful sending. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function setFrom
* @instance
* @summary Set the sender's email address. 
* @param {string} from String containing the sender's email address. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function setSendingTime
* @instance
* @summary Set sending time of the email. 
* @param {Date} sendingTime Date object representing the sending time. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var mail = new Email("receiver@domain.de", "sender@domain.de", "Test", "This is a test.");
* var actDate = new Date();
* var newDate = context.addTimeInterval(actDate, 2, "days", false);
* mail.setSendingTime(newDate);
**/
/**
* @memberof Email
* @function setSubject
* @instance
* @summary Set the subject of the email. 
* @param {string} subject String containing the desired subject of the email. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof Email
* @function setTo
* @instance
* @summary Set the primary recipients of the email. 
* @param {string} to String containing the email addresses of primary recipients. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d 
**/
/**
* @class File
* @summary The File class allows full access to files stored on the Portal Server's filesystem. 
**/
/**
* @memberof File
* @function close
* @instance
* @summary Close the file handle. 
* @description Note: Since file handles are so-called expensive ressources it is strongly recommanded to close each file handle you prior created in your scripts as soon as possible. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [File.File]{@link File#File} 
**/
/**
* @memberof File
* @function eof
* @instance
* @summary Report whether the file pointer points to EOF (end of file). 
* @returns {boolean} true if EOF, false if not 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof File
* @function error
* @instance
* @summary Retrieve the error message of the last file access error as String. 
* @description The error message (as long there is one) and its language depend on the operating system used on the Portal Server's machine. If there is no error, the method returns null. 
* @returns {string} String with the content of the last file access error message, null in case of no error 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof File
* @constructor File
* @summary The constructor has the purpose to open a file handle to the desired file. 
* @description Once created, you cannot change the access mode of the file handle. If you need to change the access mode, you would have to close the file and reopen it. 
* Note: File handles are so-called expensive ressources, thus it is strongly recommanded to close them as soon as possible. Refer to File.close() for further information. 
* @param {string} pathFileName String value containing the complete path and filename of the desired file 
* @param {string} mode String representing the access mode for the file handle. Allowed values are: r read mode r+ read mode plus write access; if the file does not yet exist, an error is raised w write mode; if the file already exists, it will be completely overwritten w+ write mode plus read access; if the file already exists, it will be completely overwritten a write mode with append; if the file does not yet exist, it is created, otherwise the data you write to the file will be appended a+ write mode with append plus read access; if the file does not yet exist, it is created, otherwise the data you write to the file will be appended t open the file in text mode (ASCII 127) b open the file in binary mode 
* @returns {File} File object representing a handle to a file on the server's filesystem 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [File.close]{@link File#close} 
* @example
* // Text-Sample
* var fso = new File("c:\\tmp\\test.txt", "w+t");
* if (!fso.ok())
*    throw fso.error();
* var int_val = 65;
* fso.write("Hello world: ", int_val);
* fso.close();
* // result: test.txt: Hello world: 65
* 
* // Binary-Sample
* var fso = new File("c:\\tmp\\test.txt", "w+b");
* if (!fso.ok())
*    throw fso.error();
* var int_val = 65;
* fso.write("Hello world: ", int_val);
* fso.close();
* // result: test.txt: Hello world: A
* 
* // Binary-Sample with Byte-Array
* var fso = new File("c:\\tmp\\test.txt", "w+b");
* if (!fso.ok())
*    throw fso.error();
* var byteArr = [];
* byteArr.push(72);
* byteArr.push(101);
* byteArr.push(108);
* byteArr.push(108);
* byteArr.push(111);
* byteArr.push(0);  // 0-Byte
* byteArr.push(87);
* byteArr.push(111);
* byteArr.push(114);
* byteArr.push(108);
* byteArr.push(100);
* fso.write(byteArr);
* fso.close();
* // result: test.txt: Hello{0-Byte}World
**/
/**
* @memberof File
* @function ok
* @instance
* @summary Report whether an error occurred while accessing the file handle. 
* @returns {boolean} true if no error occurred, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof File
* @function read
* @instance
* @summary Retrieve a block of data from the file, containing a maximum of charsNo byte. 
* @description After the method has been performed, the data pointer of the file handle is moved right after the block which has been read. This might as well trigger the EOF flag, if the end of file has been reached. 
* @param {number} charsNo integer value indicating how many characters (resp. byte in binary mode) should be read 
* @returns {string} String containing up to charsNo characters/byte of data of the file. 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof File
* @function readLine
* @instance
* @summary Retrieve one line of data from the file. 
* @description This method requires to have the file opened in text mode to work flawlessly, because the end of line is recognized by the linefeed character. After the readLine() method has been performed, the data pointer of the file handle is moved to the beginning of the next line of data. 
* @returns {string} String containing one line of data of the file. 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof File
* @function write
* @instance
* @summary Write binary data to the file. 
* @description This requires to have the file handle opened with write access (meaning modes r+, w/w+, a/a+) and binary mode b. 
* @param {number[]} byteArray Array of integers containing any data you want to write to the file 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0 
* @see [File.close]{@link File#close} 
* @example
* // Binary-Sample with Byte-Array
* var fso = new File("c:\\tmp\\test.txt", "w+b");
* if (!fso.ok())
*    throw fso.error();
* var byteArr = [];
* byteArr.push(72);
* byteArr.push(101);
* byteArr.push(108);
* byteArr.push(108);
* byteArr.push(111);
* byteArr.push(0);  // 0-Byte
* byteArr.push(87);
* byteArr.push(111);
* byteArr.push(114);
* byteArr.push(108);
* byteArr.push(100);
* fso.write(byteArr);
* fso.close();
* // result: test.txt: Hello{0-Byte}World
**/
/**
* @memberof File
* @function write
* @instance
* @summary Write data to the file. 
* @description This requires to have the file handle opened with write access (meaning modes r+, w/w+, a/a+). You may concatenate as many strings as you want. 
* @param {string} a String containing any data you want to write to the file 
* @param {string} b String containing any data you want to write to the file 
* @param {...any} string 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @memberof File
* @function writeBuffer
* @instance
* @summary Write data to the file. 
* @description This requires to have the file handle opened with write access (meaning modes r+, w/w+, a/a+). 
* @param {string} data String containing any data you want to write to the file. 
* @param {number} charsNo integer value indicating how many characters should be written. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50 / otrisPORTAL 5.0 
**/
/**
* @class FileResultset
* @summary The FileResultset class supports basic functions to loop through a list of DocFile objects. 
* @description You can manually create a FileResultset as well as access the (selected) files of a (public) Folder. 
**/
/**
* @memberof FileResultset
* @constructor FileResultset
* @summary Create a new FileResultset object. 
* @description Like in other programming languages you create a new object with the new operator (refer to example below). 
* Note: Details for the filter expression you find in section Using filter expressions with FileResultSets
* Note: Further samples are in FileResultset filter examples
* @param {string} fileType String containing the technical name of the desired filetype 
* @param {string} filter String containing an optional filter criterium; use empty String ('') if you don't want to filter at all 
* @param {string} sortOrder String containing an optional sort order; use empty String ('') if you don't want to sort at all 
* @returns {FileResultset} FileResultset representing a list of all matching DocFile objects in the system 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var fileType = "Standard";
* var filter = "";
* var sortOrder = "";
* var myFRS = new FileResultset(fileType, filter, sortOrder);
**/
/**
* @memberof FileResultset
* @function first
* @instance
* @summary Retrieve the first DocFile object in the FileResultset. 
* @returns {DocFile} DocFile or null in case of an empty FileResultset
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFRS = new FileResultset("Standard", "", "");
* var myFile = myFRS.first();
**/
/**
* @memberof FileResultset
* @function getIds
* @instance
* @summary Returns an array with all file ids in the FileResultset. 
* @returns {string[]} Array of String with file ids of the FileResultset
* @since DOCUMENTS 5.0c
* @example
* var myFRS = new FileResultset("Standard", "", "");
* util.out(myFRS.getIds());
**/
/**
* @memberof FileResultset
* @function last
* @instance
* @summary Retrieve the last DocFile object in the FileResultset. 
* @returns {DocFile} DocFile or null if end of FileResultset is reached. 
* @since ELC 3.60j / otrisPORTAL 6.0j 
**/
/**
* @memberof FileResultset
* @function next
* @instance
* @summary Retrieve the next DocFile object in the FileResultset. 
* @returns {DocFile} DocFile or null if end of FileResultset is reached. 
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFRS = new FileResultset("Standard", "", "");
* for (var myFile = myFRS.first(); myFile; myFile = myFRS.next())
* {
*    // do something with each DocFile object
* }
**/
/**
* @memberof FileResultset
* @function size
* @instance
* @summary Get the amount of DocFile objects in the FileResultset. 
* @returns {number} integer value with the amount of DocFile objects in the FileResultset
* @since ELC 3.50 / otrisPORTAL 5.0
* @example
* var myFRS = new FileResultset("Standard", "", "");
* util.out(myFRS.size());
**/
/**
* @interface Folder
* @summary The Folder class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS folders by scripting means. 
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'Archive' is available for the folder. 
* @member {boolean} allowArchive
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'Copy to' is available for the folder. 
* @member {boolean} allowCopyTo
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'PDF creation (Print)' is available for the folder. 
* @member {boolean} allowCreatePDF
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'Delete' is available for the folder. 
* @member {boolean} allowDelete
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'Export' is available for the folder. 
* @member {boolean} allowExport
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'Forward' is available for the folder. 
* @member {boolean} allowForward
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the action 'Store in' is available for the folder. 
* @member {boolean} allowMoveTo
* @instance
**/
/**
* @memberof Folder
* @summary The comparator for the first filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} comparator1
* @instance
**/
/**
* @memberof Folder
* @summary The comparator for the second filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} comparator2
* @instance
**/
/**
* @memberof Folder
* @summary The comparator for the third filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} comparator3
* @instance
**/
/**
* @memberof Folder
* @summary The expression of the filter of the folder. 
* @description Note: This property is only available if the Folder represents a dynamic folder and the filter style 'Extended' is used. 
* @member {string} filterExpression
* @instance
**/
/**
* @memberof Folder
* @summary The field to use for the first filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} filterfieldname1
* @instance
**/
/**
* @memberof Folder
* @summary The field to use for the second filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} filterfieldname2
* @instance
**/
/**
* @memberof Folder
* @summary The field to use for the third filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} filterfieldname3
* @instance
**/
/**
* @memberof Folder
* @summary The filter style of the folder. 
* @description There are two filter styles available: 
* <ul>
* <li>Standard</li>
* <li>Extended</li>
* </ul>
* 
* @member {string} filterStyle
* @instance
**/
/**
* @memberof Folder
* @summary The icon to use in the folder tree. 
* @member {string} icon
* @instance
**/
/**
* @memberof Folder
* @summary The internal id of the Folder object. 
* @member {string} id
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the folder is invisible to the users. 
* @description Note: This property is not operative if the folder is not released. 
* @member {boolean} invisible
* @instance
**/
/**
* @memberof Folder
* @summary The entire label defined for the Folder object. 
* @member {string} label
* @instance
**/
/**
* @memberof Folder
* @summary The technical name of the Folder object. 
* @member {string} name
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies whether the folder is available to the users. 
* @member {boolean} released
* @instance
**/
/**
* @memberof Folder
* @summary The column used to sort the entries in the folder. 
* @description The following sort columns are available: 
* <ul>
* <li>Title</li>
* <li>LastModifiedAt</li>
* <li>LastEditor</li>
* <li>CreateAt</li>
* <li>Owner</li>
* <li>CustomField</li>
* </ul>
* 
* @member {string} sortColumn
* @instance
**/
/**
* @memberof Folder
* @summary This property specifies the sort order of the entries in the folder. 
* @member {boolean} sortDescending
* @instance
**/
/**
* @memberof Folder
* @summary The technical name of the custom field used to sort the entries in the folder. 
* @description Note: This field is only available if the Folder.sortColumn is set to 'CustomField'. 
* @member {string} sortFieldName
* @instance
**/
/**
* @memberof Folder
* @summary The type of the Folder object. 
* @member {string} type
* @instance
**/
/**
* @memberof Folder
* @summary The desired field value to use for the first filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} value1
* @instance
**/
/**
* @memberof Folder
* @summary The desired field value to use for the second filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} value2
* @instance
**/
/**
* @memberof Folder
* @summary The desired field value to use for the third filter of the Folder object. 
* @description Note: This attribute only exists if the Folder represents a dynamic folder 
* @member {string} value3
* @instance
**/
/**
* @memberof Folder
* @function addAccessProfile
* @instance
* @summary Add a folder access right for the user group defined by an access profile to the folder. 
* @param {string} accessProfileName The technical name of the access profile. 
* @param {boolean} allowInsertFiles Flag indicating whether inserting files into the folder is allowed. 
* @param {boolean} allowRemoveFiles Flag indicating whether removing files from the folder is allowed. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "public");
* var success = folder.addAccessProfile("AccessProfile1", true, false);
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function addFile
* @instance
* @summary Store a reference to a desired DocFile object in the current Folder. 
* @description Note: This only works in case the Folder is a real public Folder. The Folder must not represent a dynamic folder, since a dynamic folder is sort of a hardcoded search, not a "real" folder. 
* @param {DocFile} docFile DocFile object which shall be available in the given Folder
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51h / otrisPORTAL 5.1h 
**/
/**
* @memberof Folder
* @function addFilterEDAServer
* @instance
* @summary Add an EDA server to the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} serverName The technical name of the desired EDA server. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var success = folder.addFilterEDAServer("eas1");
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function addFilterEEiArchive
* @instance
* @summary Add an EE.i archive to the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} archiveKey The key of the desired EE.i archive. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var archiveKey = "$(#STANDARD)\\REGTEST@eei1";
* var success = folder.addFilterEEiArchive(archiveKey);
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function addFilterEExView
* @instance
* @summary Add an EE.x view to the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} viewKey The key of the desired EE.x view. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var viewKey = "Unit=Default/Instance=Default/View=REGTEST";
* var success = folder.addFilterEExView(viewKey);
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function addFilterFileType
* @instance
* @summary Add a file type to the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} fileType The technical name of the desired file type. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var success = folder.addFilterFileType("Filetype1");
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function addSystemUser
* @instance
* @summary Add a folder access right for a system user to the folder. 
* @param {string} loginName The login name of the system user. 
* @param {boolean} allowInsertFiles Flag indicating whether inserting files into the folder is allowed. 
* @param {boolean} allowRemoveFiles Flag indicating whether removing files from the folder is allowed. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "public");
* var success = folder.addSystemUser("user1", true, false);
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function addToOutbar
* @instance
* @summary Add the folder to an outbar. 
* @param {string} outbarName The technical name of the outbar. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0d HF2
* @example
* var folder = context.createFolder("testFolder", "public");
* var success = folder.addToOutbar("testOutbar");
* if (!success)
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function copyFolder
* @instance
* @summary The current Folder object is duplicated to create a new Folder object. 
* @description The new Folder object is placed at the same hierarchical stage as the Folder used as its source object. After the duplication of the Folder you can change all its public attributes, e.g. to modify the filter definition of a dynamic public folder. 
* @param {boolean} includeSubFolders boolean whether to duplicate any subfolders contained in the source folder as well 
* @param {boolean} copyRights boolean whether to assign the same access privileges as those assigned to the source Folder
* @param {boolean} copyActions boolean whether to duplicate any userdefined actions attached to the source folder as well 
* @returns {Folder} Folder object generated by the function call 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
**/
/**
* @memberof Folder
* @function createSubFolder
* @instance
* @summary Create a new subfolder of the specified folder type. 
* @description Note: There are three possible types available: publicdynamicpubliconlysubfolder
* @param {string} name The technical name of the subfolder to be created. 
* @param {string} type The desired type of the subfolder. 
* @returns {Folder} New created subfolder as Folder object or null if failed. 
* @since DOCUMENTS 4.0c
* @see [Context.createFolder]{@link Context#createFolder} 
* @example
* var parentFolder = context.createFolder("parentFolder", "public");
* if (parentFolder)
* {
*   var subFolder = parentFolder.createSubFolder("subFolder", "dynamicpublic");
*   if (subFolder)
*       util.out(subFolder.type);
*   else
*       util.out(parentFolder.getLastError());
* }
**/
/**
* @memberof Folder
* @function deleteFolder
* @instance
* @summary Delete the folder in DOCUMENTS. 
* @description Note: All subfolders are also deleted recursively. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @see [Context.deleteFolder]{@link Context#deleteFolder} 
* @example
* var folder = context.createFolder("testFolder", "onlysubfolder");
* if (folder)
* {
*   var success = folder.deleteFolder();
*   if (success)
*   {
*       var itFolder = context.getFoldersByName("testFolder", "onlysubfolder");
*       util.out(itFolder.size() == 0);
*   }
*  }
**/
/**
* @memberof Folder
* @function getActionByName
* @instance
* @summary Retrieve a user-defined action of the Folder. 
* @param {string} actionName String value containing the desired action name. 
* @returns {UserAction} UserAction object representing the user-defined action. 
* @since DOCUMENTS 4.0d
* @example
* var it = context.getFoldersByName("testFolder");
* var folder = it.first();
* if (folder)
* {
*   var action = folder.getActionByName("testAction");
*   if (action)
*   {
*       action.type = "PortalScript";
*       action.setPortalScript("testScript");
*   }
*   else
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the Folder. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.51b / otrisPORTAL 5.1b 
**/
/**
* @memberof Folder
* @function getFiles
* @instance
* @summary Retrieve a FileResultset of all the DocFile objects stored in the Folder. 
* @description Note: It does not matter whether the Folder is a real public folder or a dynamic folder. 
* @returns {FileResultset} FileResultset containing a list of all DocFile objects stored in the Folder
* @since ELC 3.51b / otrisPORTAL 5.1b 
**/
/**
* @memberof Folder
* @function getFilterFileTypes
* @instance
* @summary Retrieve the filter file types of the folder. 
* @returns {Array<any>} Array of strings containing the technical names of the file types. 
* @since DOCUMENTS 5.0a HF2
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var success = folder.addFilterFileType("Filetype1");
* if (!success)
*   util.out(folder.getLastError());
* 
* var fileTypes = folder.getFilterFileTypes();
* if (fileTypes)
* {
*   for (var i=0; i < fileTypes.length; i++)
*   {
*     util.out(fileTypes[i]);
*   }
* }
* else
*   util.out(folder.getLastError());
**/
/**
* @memberof Folder
* @function getHitResultset
* @instance
* @summary Create a HitResultset, which summarizes all DocFiles in the folder. 
* @description This function executes an empty (=unfiltered) search in the folder. It creates a HitResultset, which summarizes all the Folder's files. The Resultset contains the same columns as the folder's default web view. 
* Note: The function operates on dynamic and on static folders, but not on the special folders "tasks" and "resubmision". 
* Remark: Reading from a lean HitResultset with only a few columns can be faster than reading from a FileResultset. Sometimes this effect outweighs the time-related costs of a search. If the folder addresses an archive, the time needed to create temporary DocFiles can be saved with this function. On a failed search request the function does not throw errors. To detect this kind of errors scripts should read the returned object's properties lastErrorCode and lastError. 
* @returns {HitResultset} A HitResultset, which contains column headers and a list of DocHit objects. 
* @since DOCUMENTS 5.0c 
* @see [getFiles]{@link getFiles} 
**/
/**
* @memberof Folder
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof Folder
* @function getLocaleLabel
* @instance
* @summary Get the ergonomic label of the Folder. 
* @param {string} locale Optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically. 
* @returns {string} String containing the ergonomic label of the Folder in the appropriate portal language. 
* @since DOCUMENTS 4.0b HF2 
**/
/**
* @memberof Folder
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof Folder
* @function getPosition
* @instance
* @summary Retrieve the position of a subfolder within the subfolder list. 
* @param {Folder} subFolder Folder object whose position to be retrieved. 
* @returns {number} The zero-based position of the subfolder as integer or -1 in case of any error. 
* @since DOCUMENTS 4.0c
* @see [Folder.setPosition]{@link Folder#setPosition} 
* @example
* var parentFolder = context.createFolder("parentFolder", "public");
* if (parentFolder)
* {
*   var subFolder1 = parentFolder.createSubFolder("subFolder1", "dynamicpublic");
*   var subFolder2 = parentFolder.createSubFolder("subFolder2", "onlysubfolder");
*   if (subFolder1 && subFolder2)
*   {
*       var pos = parentFolder.getPosition(subFolder2);
*       util.out(pos == 1);
*   }
* }
**/
/**
* @memberof Folder
* @function getSubFolders
* @instance
* @summary Retrieve a FolderIterator containing all Folder objects which represent subfolders of the given Folder. 
* @returns {FolderIterator} FolderIterator with all subfolders one hierarchical level below the given Folder
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
**/
/**
* @memberof Folder
* @function hasFiles
* @instance
* @summary Retrieve information whether the Folder is empty or not. 
* @returns {boolean} true if DocFile objects available inside the Folder, false in case the Folder is empty 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
**/
/**
* @memberof Folder
* @function removeAccessProfile
* @instance
* @summary Remove all folder access rights of the user group defined by an access profile from the folder. 
* @param {string} accessProfileName The technical name of the access profile. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "public");
* var success = folder.addAccessProfile("AccessProfile1", true, false);
* if (success)
* {
*   success = folder.removeAccessProfile("AccessProfile1");
*   if (!success)
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function removeFile
* @instance
* @summary Remove the reference to a desired DocFile object out of the current Folder. 
* @description Note: This only works in case the Folder is a real public Folder. The Folder must not represent a dynamic folder, since a dynamic folder is sort of a hardcoded search, not a "real" folder. 
* @param {DocFile} docFile DocFile object which shall be removed from the given Folder
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51h / otrisPORTAL 5.1h 
**/
/**
* @memberof Folder
* @function removeFilterEDAServer
* @instance
* @summary Remove an EDA server from the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} serverName The technical name of the desired EDA server. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var success = folder.addFilterEDAServer("eas1");
* if (success)
* {
*   success = folder.removeFilterEDAServer("eas1");
*   if (!success)
*     util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function removeFilterEEiArchive
* @instance
* @summary Remove an EE.i archive from the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} archiveKey The key of the desired EE.i archive. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var archiveKey = "$(#STANDARD)\\REGTEST@eei1";
* var success = folder.addFilterEEiArchive(archiveKey);
* if (success)
* {
*   success = folder.removeFilterEEiArchive(archiveKey);
*   if (!success)
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function removeFilterEExView
* @instance
* @summary Remove an EE.x view from the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} viewKey The key of the desired EE.x view. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var viewKey = "Unit=Default/Instance=Default/View=REGTEST";
* var success = folder.addFilterEExView(viewKey);
* if (success)
* {
*   success = folder.removeFilterEExView(viewKey);
*   if (!success)
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function removeFilterFileType
* @instance
* @summary Remove a file type from the filter of the folder. 
* @description Note: This function is only available for a Folder of type 'dynamicpublic'. 
* @param {string} fileType The technical name of the desired file type. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "dynamicpublic");
* var success = folder.addFilterFileType("Filetype1");
* if (success)
* {
*   success = folder.removeFilterFileType("Filetype1");
*   if (!success)
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function removeFromOutbar
* @instance
* @summary Remove the folder from an outbar. 
* @param {string} outbarName The technical name of the outbar. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0d HF2
* @example
* var itFolder = context.getFoldersByName("testFolder", "public");
* var folder = itFolder.first();
* if (folder)
* {
*   var success = folder.removeFromOutbar("testOutbar");
*   if (!success)
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function removeSystemUser
* @instance
* @summary Remove all folder access rights of a system user from the folder. 
* @param {string} loginName The login name of the system user. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "public");
* var success = folder.addSystemUser("user1", true, false);
* if (success)
* {
*   success = folder.removeSystemUser("user1");
*   if (!success)
*       util.out(folder.getLastError());
* }
**/
/**
* @memberof Folder
* @function setAllowedActionScript
* @instance
* @summary Set the script containing the allowed user-defined actions. 
* @param {string} scriptName The name of the desired script; use empty string ('') if you want to remove the associated action script. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var folder = context.createFolder("testFolder", "public");
* var success = folder.setAllowedActionScript("testScript");
* if (!success)
*   util.out(folder.getLastError());
* 
* // We can remove the action script as follows:
* success = folder.setAllowedActionScript('');
**/
/**
* @memberof Folder
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the Folder to the desired value. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b 
**/
/**
* @memberof Folder
* @function setParentFolder
* @instance
* @summary Set the parent folder of the current folder. 
* @param {Folder} parentFolder optional Folder object being the parent folder of the current folder. If no parent folder is defined, the current folder will be moved to the top level. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var parentFolder = context.createFolder("parentFolder", "public");
* if (parentFolder)
* {
*   var subFolder = context.createFolder("subFolder", "dynamicpublic");
*   if (subFolder)
*   {
*       var success = subFolder.setParentFolder(parentFolder);
*       if (!success)
*           util.out(subFolder.getLastError());
* 
*       // We can move subFolder to the top level as follows:
*       success = subFolder.setParentFolder();
*   }
* }
**/
/**
* @memberof Folder
* @function setPosition
* @instance
* @summary Place a subfolder at the given position in the subfolder list. 
* @description Note: 0 at the beginning and -1 at the end. 
* @param {Folder} subFolder Folder object to be placed at the given position. 
* @param {number} position The 0-based position for the subfolder. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @see [Folder.getPosition]{@link Folder#getPosition} 
* @example
* var parentFolder = context.createFolder("parentFolder", "public");
* if (parentFolder)
* {
*   var subFolder1 = parentFolder.createSubFolder("subFolder1", "dynamicpublic");
*   var subFolder2 = parentFolder.createSubFolder("subFolder2", "onlysubfolder");
*   if (subFolder1 && subFolder2)
*   {
*       var pos = parentFolder.getPosition(subFolder2);
*       util.out(pos == 1);
*       parentFolder.setPosition(subFolder1, -1);
*       pos = parentFolder.getPosition(subFolder2);
*       util.out(pos == 0);
*   }
* }
**/
/**
* @interface FolderIterator
* @summary The FolderIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS folders by scripting means. 
**/
/**
* @memberof FolderIterator
* @function first
* @instance
* @summary Retrieve the first Folder object in the FolderIterator. 
* @returns {Folder} Folder or null in case of an empty FolderIterator
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
**/
/**
* @memberof FolderIterator
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof FolderIterator
* @function next
* @instance
* @summary Retrieve the next Folder object in the FolderIterator. 
* @returns {Folder} Folder or null if end of FolderIterator is reached. 
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
**/
/**
* @memberof FolderIterator
* @function size
* @instance
* @summary Get the amount of Folder objects in the FolderIterator. 
* @returns {number} integer value with the amount of Folder objects in the FolderIterator
* @since ELC 3.50l01 / otrisPORTAL 5.0l01 
**/
/**
* @class HitResultset
* @summary The HitResultset class allows comprehensive search operations in Documents and in connected archives. 
* @description While the constructor of this class launches a search operation, the created object stores the results and exposes them as a list of DocHit objects. Compared with the classes FileResultset and ArchiveFileResultset this class has got the following characteristics.
* <ul>
* <li>Several filetypes and archives can be searched at one time.</li>
* <li>Extracting archive hits from a HitResultSet does not make DOCUMENTS create a temporary DocFile for each hit. This can save a lot of time.</li>
* <li>Objects of this class may allocate large amounts of memory, because they sustain a complete hit list instead of a lean id-list. To save memory, scripts should prefer hit lists with as few columns as possible.</li>
* </ul>
* 
**/
/**
* @memberof HitResultset
* @function dispose
* @instance
* @summary Free most of the memory of the HitResultset. 
* @description This function explicitly frees the memory used by the object. The Resultset itself becomes empty. All extracted DocHit objects become invalid and must no longer be used. Long-running scripts should use this function instead of waiting for the garbage collector to clean up. 
* @returns {any} The function does not return a value. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof HitResultset
* @function fetchedSize
* @instance
* @summary Get the number of already loaded hits in the set. 
* @description Remark: If the object has been created with a non-zero page size, this value is often smaller than the total amount of hits. 
* @returns {number} integer value with the number of hits, which can actually be read from the resultset. 
* @since DOCUMENTS 4.0b 
* @see [size]{@link size} 
**/
/**
* @memberof HitResultset
* @function fetchNextPage
* @instance
* @summary Load the next page of hits into the Resultset. 
* @description If the object has been created with a non-zero page size, each call of this function appends another page of hits to the resultset until all hits are loaded. 
* @returns {boolean} The value indicates, if any more hits have been loaded. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof HitResultset
* @function first
* @instance
* @summary Retrieve the first DocHit in the HitResultset. 
* @returns {DocHit} DocHit object, null in case of an empty HitResultset
* @since DOCUMENTS 4.0b 
* @see [next]{@link next} 
**/
/**
* @memberof HitResultset
* @function getAt
* @instance
* @summary Retrieve the DocHit object at a given position in the HitResultset. 
* @description Remark: Valid positions range from 0 to fetchedSize()-1. 
* @param {number} pos Integer position of the hit, beginning with 0 
* @returns {DocHit} DocHit object or null if the position is out of bounds. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof HitResultset
* @function getColumnCount
* @instance
* @summary Get the number of available columns in the set of hits. 
* @returns {number} The number of columns as an Integer. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof HitResultset
* @function getColumnIndex
* @instance
* @summary Find the index of a column with a defined name. 
* @description Remark: The function tests for a technical column name prior to a localized name. 
* @param {string} colName The name of the column. 
* @returns {number} The zero-based index of the column or a -1, which indicates an unknown column name. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof HitResultset
* @function getColumnNames
* @instance
* @summary List the names of all columns in the set of hits. 
* @description Remark: If the resultset is bases on an EE.i hitlist, the function usually returns field numbers instead of technical names, because column descriptions of an EE.i hitlist only consist of the field number and a label. The label would not be a reliable identifier of the column.
* Columns, which correspond to a DocFile attribute may be given a special constant name instead of the name in an archive's scheme. "TITLE" on EE.x and "110" on EE.i may be presented as "DlcFile_Title", for example. 
* @param {boolean} local A boolean option to read the localized names instead of the technical names. 
* @returns {Array<any>} Array of strings with the column names. 
* @since DOCUMENTS 4.0b 
**/
/**
* @memberof HitResultset
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 4.0b 
* @see [getLastErrorCode]{@link getLastErrorCode} 
**/
/**
* @memberof HitResultset
* @function getLastErrorCode
* @instance
* @summary Function to get a numeric code of the last error, that occurred. 
* @description Remark: The value 0 means "no error". Positive values indicate warnings or minor errors, while negative values indicate serious errors. After a serious error no hits should be processed. After a minor error, the resultset may be unsorted or truncated, but the contained data is still valid. 
* @returns {number} Integer error code. 
* @since DOCUMENTS 4.0b 
* @see [getLastError]{@link getLastError} 
**/
/**
* @memberof HitResultset
* @constructor HitResultset
* @summary Perform a search and create a new HitResultset object. 
* @description Remark: On a failed search request the constructor does not throw errors. To detect this kind of errors scripts should read the object's properties lastErrorCode and lastError.Resource identifiers: 
* @param {any} searchResources The list of resources to search through. The resource identifiers may be passed either as an array of strings or as an ordinary string with one identifier per line of text. Please read the remarks section about restrictions. 
* @param {string} filter A filter expression. Pass an empty string, if no filter ist required. 
* @param {string} sortOrder A sort expression. Pass an empty string, if no sorting is required. 
* @param {any} hitlist The technical name of a hitlist or an array of field names, which specifies the available columns in the resultset. If the parameter is left empty, Documents tries to choose a hitlist automatically. Details follow in the remarks section. Note: If this parameter is an array of field names, a search in EE.i or EE.x is not allowed and the field names must not contain commas (,). 
* @param {number} pageSize This is a memory-saving and performance-tuning option. If the parameter is zero, Documents will load all available hits at once. If the parameter is a positive value, Documents will initially load only the requested number of hits as a first page. In order to access each further page, a call to fetchNextPage() is necessary. A negative pageSize value will be replaced by the current user's "hits per page" preference setting. 
* @param {boolean} unlimitedHits A boolean that indicates, if the general hit limitations on filetypes and archives must be ignored. A wasteful use of this option may cause issues with the system performance or situations with low free memory. 
* @param {boolean} fullColumnLength A boolean that indicates, if the general hit column length limitations must be ignored. The default column length is 50 characters (if not a different value is defined by the property Documents-Settings: MaxHitfieldLength). If a field value exeeds this size, the first 50 characters will be displayed followed by '...'. If the parameter fullColumnLength is set to true, no truncation will be done. 
* @param {boolean} withBlobInfo A boolean that indicates, if the HitResultset should contain blob-information that can be fetched with DocHit.getBlobInfo()
* @returns {HitResultset} 
**/
/**
* @memberof HitResultset
* @function next
* @instance
* @summary Retrieve the next DocHit in the HitResultset. 
* @description Remark: Calls of getAt() do not affect the internal cursor of next(). 
* @returns {DocHit} DocHit object, null if either the end of the resultset or the end of the loaded pages is reached. 
* @since DOCUMENTS 4.0b 
* @see [first]{@link first} 
**/
/**
* @memberof HitResultset
* @function size
* @instance
* @summary Get the total amount of hits in the set. 
* @description Remark: If the object has been created with a non-zero page size, this value is often greater than the amount of already accessible hits. 
* @returns {number} integer value with the total amount of hits. The value -1 may be returned to indicate, that the search continues in the background, and the final number is not yet known. 
* @since DOCUMENTS 4.0b 
* @see [fetchedSize]{@link fetchedSize} 
**/
/**
* @interface PropertyCache
* @summary The PropertyCache class is a util class that allows it to store / cache data over the end of the run time of a script. 
* @description There is exactly one global implicit object of the class PropertyCache which is named propCache. At the SystemUser and the AccessProfile are also PropertyCache objects (SystemUser.propCache, AccessProfile.propCache). 
* <ul>
* <li>You can define named members (properties) at this object to store the data: propCache.Name1 = one_value;propCache.Name2 = another_value;</li>
* <li>The stored data can be integer, boolean, string or array values </li>
* <li>There is no limit (except the memory of the OS) in the amount of properties or in the length of an array </li>
* <li>Every principal has it's own propCache object </li>
* </ul>
* 
* Note: It is not possible to create objects of the class PropertyCache, since the propCache object is always available.
**/
/**
* @memberof PropertyCache
* @function hasProperty
* @instance
* @summary Function to check if a named property exists in the PropertyCache. 
* @param {string} name 
* @returns {boolean} true if the property exists, false if not 
* @since DOCUMENTS 4.0 
**/
/**
* @memberof PropertyCache
* @function removeProperty
* @instance
* @summary Function to delete a named property exists in the PropertyCache. 
* @param {string} name 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0 
**/
/**
* @interface Register
* @summary The Register class has been added to the DOCUMENTS PortalScripting API to gain full access to the registers of a DOCUMENTS file by scripting means. 
**/
/**
* @memberof Register
* @summary The ergonomic label of the Register object. 
* @description Note: This property is readonly and cannot be overwritten. 
* @member {string} label
* @instance
**/
/**
* @memberof Register
* @summary The technical name of the Register object. 
* @description Note: This property is readonly and cannot be overwritten. 
* @member {string} name
* @instance
**/
/**
* @memberof Register
* @summary The type of the Register object. 
* @description The possible values of the type attribute are listed below: 
* <ul>
* <li>documents</li>
* <li>fields</li>
* <li>links</li>
* <li>archiveddocuments</li>
* <li>externalcall</li>
* </ul>
* 
* Note: This property is readonly and cannot be overwritten. 
* @member {string} type
* @instance
**/
/**
* @memberof Register
* @function deleteDocument
* @instance
* @summary Delete a Document at the Register. 
* @description With the necessary access rights the user can delete a Document at the Register. 
* @param {Document} doc Document to delete 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.60d / otrisPORTAL 6.0d
* @example
* // deleting all documents at a register
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
* if (reg)
* {
*    var docs = reg.getDocuments();
*    for (var doc = docs.first(); doc; doc = docs.next())
*       reg.deleteDocument(doc);
* }
**/
/**
* @memberof Register
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the Register. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof Register
* @function getDocuments
* @instance
* @summary Retrieve a list of all Documents stored on the given Register. 
* @description This method is available for documents registers only. You cannot use it with different types of Register objects. 
* @returns {DocumentIterator} DocumentIterator containing the Document objects stored on the Register
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
* var docIter = reg.getDocuments();
* for (var doc = docIter.first(); doc; doc = docIter.next())
* {
*    util.out(doc.Fullname);
* }
**/
/**
* @memberof Register
* @function getFiles
* @instance
* @summary Retrieve a FileResultset of all DocFile objects linked to the register. 
* @returns {FileResultset} FileResultset containing a list of all DocFile objects linked to the register. 
* @since DOCUMENTS 4.0b
* @example
* var docFile = context.file;
* var reg = docFile.getRegisterByName("LinksReg");
* if (reg)
* {
*    var myFRS = reg.getFiles();
*    for (var file = myFRS.first(); file; file = myFRS.next())
*       util.out(file.getAutoText("title"));
* }
**/
/**
* @memberof Register
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof Register
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof Register
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the Register to the desired value. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof Register
* @function uploadDocument
* @instance
* @summary Upload a new Document stored on the server's filesystem to the Register. 
* @description The filePath parameter must contain not only the directory path but the filename as well. Otherwise the server will take the first file to be found in the given filePath. The registerFileName parameter has the purpose to allow to rename the Document already while uploading it. 
* Note: After successful upload of the Document the source file on the server's directory structure is removed! 
* @param {string} filePath String containing the filePath and filename of the desired file to be uploaded. Note: Backslashes contained in the filepath must be quoted with a leading backslash, since the backslash is a special char in ECMAScript! 
* @param {string} registerFileName String containing the desired target filename of the Document on the Register
* @returns {Document} Document if successful, null in case of any error 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
* @example
* var docFile = context.file;
* var reg = docFile.getRegisterByName("Documents");
* var newDoc = reg.uploadDocument("c:\\tmp\\sourcefile.rtf", "Filename_on_Register.rtf");
* if (!newDoc)
*    util.out("Error while uploading the file! " + reg.getLastError());
* else
*    util.out(newDoc.Name);
**/
/**
* @interface RegisterIterator
* @summary The RegisterIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the registers of a DOCUMENTS file by scripting means. 
**/
/**
* @memberof RegisterIterator
* @function first
* @instance
* @summary Retrieve the first Register object in the RegisterIterator. 
* @returns {Register} Register or null in case of an empty RegisterIterator
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof RegisterIterator
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof RegisterIterator
* @function next
* @instance
* @summary Retrieve the next Register object in the RegisterIterator. 
* @returns {Register} Register or null if end of RegisterIterator is reached. 
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @memberof RegisterIterator
* @function size
* @instance
* @summary Get the amount of Register objects in the RegisterIterator. 
* @returns {number} integer value with the amount of Register objects in the RegisterIterator
* @since ELC 3.50n / otrisPORTAL 5.0n 
* @since ELC 3.60i / otrisPORTAL 6.0i available for archive files 
**/
/**
* @interface RetrievalField
* @summary This class represents one search field or one conditon within a DOCUMENTS search request. 
**/
/**
 * @memberof RetrievalField
 * @typedef fieldTypes
 * @enum
 * @description These constants are equally available in each instance of RetrievalField and in the constructor object. 
 * @instance 
 * @property {number} FT_STRING Integer code for the field type "String" (single line)  
 * @property {number} FT_TEXT Integer code for the field type "Text" (multiple lines)  
 * @property {number} FT_BOOL Integer code for the field type "boolean".  
 * @property {number} FT_DATE Integer code for the field type "Date".  
 * @property {number} FT_ENUM Integer code for the field type "Enumeration" (not extensible)  
 * @property {number} FT_NUMERIC Integer code for the field type "Numeric".  
 * @property {number} FT_REFERENCE Integer code for the field type "File reference".  
 * @property {number} FT_HISTORY Integer code for the field type "History".  
 * @property {number} FT_DOUBLE_LIST Integer code for the field type "Double select list".  
 * @property {number} FT_CHECKBOX Integer code for the field type "Checkbox".  
 * @property {number} FT_SEPARATOR Integer code for the field type "Horizontal seperator" (actually ignored by the retrieval system)  
 * @property {number} FT_USER_DEFINED Integer code for the field type "User defeined".  
 * @property {number} FT_TEXT_FIXED_FONT Integer code for the field type "Text (fixed font)".  
 * @property {number} FT_E_MAIL Integer code for the field type "E-mail address".  
 * @property {number} FT_URL Integer code for the field type "URL".  
 * @property {number} FT_TIMESTAMP Integer code for the field type "Time stamp".  
 * @property {number} FT_FILING_PLAN Integer code for the field type "Filing plan".  
 * @property {number} FT_HTML Integer code for the field type "HTML".  
 * @property {number} FT_FILING_STRUCTURE Reserved constant for a possible future use.  
 * @property {number} FT_GADGET Integer code for the field type "Gadget" (actually ignored by the retrieval system)  
 * @property {number} FT_UNDEFINED Integer code for fields with an unspecified data type.  This constant has been added for completeness. Fields in this state should never appear in the retrieval system. 
 */
/**
* @memberof RetrievalField
* @summary The comparison operator / relational operator as a String. 
* @description For a list of valid operators see the page: Using filter expressions with FileResultSets. 
* Note: The access to this property is restricted. Only the "OnSearchScript" can effectively modify it. Modifying the operator is risky, since it can produce unexpected results from the user's point of view. 
* @member {string} compOp
* @instance
**/
/**
* @memberof RetrievalField
* @summary The actual default value of the field (read-only). 
* @description Remark: Actually only the "FillSearchMask" exit can attach default values (see setDefault()). There might exist another method in a future version. To improve upward compatibility a "FillSearchMask" script may check for external default values, and leave them unmodified. 
* @member {string} defaultValue
* @instance
**/
/**
* @memberof RetrievalField
* @summary The UI write protection state of the defautValue (read-only) 
* @member {boolean} defValWriteProt
* @instance
**/
/**
* @memberof RetrievalField
* @summary The localized label of the field. Maybe an empty String. 
* @description Remark: If the field has not got a label, DOCUMENTS falls back to the technical name. So there is no need to specify a label always. A few reserved internal fields, which are usualli never displayed on a search mask or a hit list, also come along without any label. An example is the special field "Search_EEIFileNr", which DOCUMENTS uses internally to implement a version listing for an ENTERPRISE.i file. 
* @member {string} label
* @instance
**/
/**
* @memberof RetrievalField
* @summary The name of the look-up field (read-only). 
* @member {string} name
* @instance
**/
/**
* @memberof RetrievalField
* @summary The field type coded as an integer (read-only). 
* @description See the enumeration constants in this class. 
* @member {number} type
* @instance
**/
/**
* @memberof RetrievalField
* @summary The value sought after. If the operator is "~", it can be a composed value expression. 
* @description Note: The access to this property is restricted. Only the "OnSearchScript" can effectively modify it. Modifying the value is risky, because it can produce unexpected results from the user's point of view. Within a "FillSearchMask" exit this property contains always an empty string. 
* @member {string} valueExpr
* @instance
**/
/**
* @memberof RetrievalField
* @function setDefault
* @instance
* @summary Place a default value in a search field. 
* @description A "FillSearchMask" script-exit can call this function to place default values in an extended search formular. Calls from other scripts will rather deposit a "LastError" message in the superior DocQueryParams object. 
* Note: The DocumentsServer only forwards these parameters to the client application. If a special client implementation will ignore them, the server would not enforce the defaults, because such a behaviour would confuse users. 
*  Calling this function does not modify the "empty" state in terms of DocQueryParams.getSearchField(). 
* @param {string} value The initial text in the search field. Dates and numbers must be formatted with the current user's locale settings. 
* @param {boolean} writeProtect Indicates, if the user interface shall write-protect the field. 
* @returns {any} No return value. 
* @since DOCUMENTS 4.0d 
**/
/**
* @interface RetrievalSource
* @summary This class describes a searchable resource in the DOCUMENTS retrieval system. 
**/
/**
 * @memberof RetrievalSource
 * @typedef searchableResource
 * @enum
 * @description These constants are equally available in each instance of RetrievalSource and in the constructor object. Resource macroes can only occur in the "FillSearchMask" exit. Within an "OnSearch" exit they have already been replaced by their single components. 
 * @instance 
 * @property {number} ST_DLC_FILETYPE Integer code of the source type "DOCUMENTS file type".  
 * @property {number} ST_EEI_ARCHIVE Integer code of the source type "EASY ENTERPRISE.i archive".  
 * @property {number} ST_EEX_VIEW Integer code of the source type "EASY ENTERPRISE.x view".  
 * @property {number} ST_EEX_USERVIEW Integer code of the source type "EASY ENTERPRISE.x user specific view".  
 * @property {number} ST_EAS_FILETYPE Integer code of the source type "DOCUMENTS file type within an EAS/EDA store".  
 * @property {number} MST_EAS_SERVER Integer code of the macro source type "EAS server" (Apply selected file types also to the identified EDA-store)  
 * @property {number} MST_EAS_ONLY Integer code of the macro source type "EAS only" (Remove standard file type sources after MST_EAS_SERVER macro expansion)  A "FillSearchMask" script can usually find a source of this type, when the user has deselected the "actual processes" checkbox. This source has not got any parameters. If there are user accounts in the system, for which the checkbox does not show up, the script code should not interpret this source type at all. 
 */
/**
* @memberof RetrievalSource
* @summary A identifier of the resource. 
* @description For conventional file type resources the identifier equals the technical name of the file type. Archive related identifiers consist of a software dependent key or name plus an "@serverName" appendix. 
* Note: Modifications of this property won't be forwarded to the retrieval system. 
* @member {string} resId
* @instance
**/
/**
* @memberof RetrievalSource
* @summary For archive resources: the technical name of the archive server. Otherwise empty. 
* @description Note: Modifications of this property won't be forwarded to the retrieval system. 
* @member {string} server
* @instance
**/
/**
* @memberof RetrievalSource
* @summary The resource type encoded as an integer. See the enumeration constants in this class. 
* @description Note: Modifications of this property won't be forwarded to the retrieval system. 
* @member {number} type
* @instance
**/
/**
* @class ScriptCall
* @summary This class allows asynchronous calling a script from another script. 
* @description You should deliberate whether a script call can be waitable or not. Only waitable script calls can be managed e.g. waiting for a script call to finish or checking whether a call is still running. 
**/
/**
* @memberof ScriptCall
* @function addParameter
* @instance
* @summary Add a parameter to the called script. 
* @param {string} name String value containing the parameter name. 
* @param {string} value String value containing the parameter value. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 5.0
* @example
* var call = new ScriptCall("schreiber", "testScript", false);
* call.addParameter("testParam", "testValue");
**/
/**
* @memberof ScriptCall
* @function getLastError
* @instance
* @summary Get the description of the last error that occurred. 
* @returns {string} Text of the last error as String
* @example
* var call = new ScriptCall("schreiber", "testScript", true);
* if (!call.launch())
*   util.out(call.getLastError());
**/
/**
* @memberof ScriptCall
* @function getReturnValue
* @instance
* @summary Get the return value of the called script. 
* @description Note: This function is only available for a waitable ScriptCall. 
* @returns {string} The return value as String if the waitable ScriptCall was successfully completed, otherwise the string "Undefined". 
* @since DOCUMENTS 5.0
* @example
* var call = new ScriptCall("schreiber", "testScript", true);
* if (call.launch())
* {
*   if (call.waitForFinish())
*       util.out(call.getReturnValue());
* }
**/
/**
* @memberof ScriptCall
* @function isRunning
* @instance
* @summary Check whether the script call is running. 
* @description Note: This function is only available for a waitable script call. 
* @returns {boolean} true if the script call is running, otherwise false
* @since DOCUMENTS 4.0d
* @example
* var call = new ScriptCall("schreiber", "testScript", true);
* if (call.launch())
* {
*   if (call.isRunning())
*   {
*       // do something
*   }
* }
**/
/**
* @memberof ScriptCall
* @function launch
* @instance
* @summary Launch the script call. 
* @description In case of successful launch the script will be executed in an own context. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var call = new ScriptCall("schreiber", "testScript", true);
* if (!call.launch())
*   util.out(call.getLastError());
**/
/**
* @memberof ScriptCall
* @constructor ScriptCall
* @summary Create a new ScriptCall object. 
* @description The following properties of the execution context of the called script are carried over from the execution context of the script where this ScriptCall object is created: 
* <ul>
* <li>file </li>
* <li>register </li>
* <li>document </li>
* <li>event </li>
* </ul>
* 
* You can change these context properties with the available set-methods. 
* @param {any} systemUser The system user who triggers execution of the called script and can be specified as follows: String containing the login name of the system user. SystemUser object representing the system user. 
* @param {string} scriptName String with the name of the called script. 
* @param {boolean} waitable boolean flag indicating whether this script call is waitable.
* @returns {ScriptCall} 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof ScriptCall
* @function setDocFile
* @instance
* @summary Set the execution context file of the called script. 
* @param {DocFile} docFile DocFile object representing the desired execution context file. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @see [Context.file]{@link Context#file} 
* @example
* var user = context.findSystemUser("schreiber");
* var call = new ScriptCall(user, "testScript", true);
* var file = context.getFileById("peachit_fi20120000000016");
* if (file)
*   call.setDocFile(file);
**/
/**
* @memberof ScriptCall
* @function setDocument
* @instance
* @summary Set the execution context document of the called script. 
* @param {Document} doc Document object representing the desired execution context document. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @see [Context.document]{@link Context#document} 
* @example
* var call = new ScriptCall("schreiber", "testScript", false);
* var file = context.getFileById("peachit_fi20120000000016");
* if (file)
* {
*    var reg = file.getRegisterByName("Doc1");
*   if (reg)
*   {
*       var it = reg.getDocuments();
*       if (it.size() > 0)
*           call.setDocument(it.first());
* }
* }
**/
/**
* @memberof ScriptCall
* @function setEvent
* @instance
* @summary Set the execution context event of the called script. 
* @param {string} scriptEvent String value containing the desired script event of the execution context. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @see [Context.event]{@link Context#event} 
* @example
* var call = new ScriptCall("schreiber", "testScript", false);
* call.setEvent("onArchive");
**/
/**
* @memberof ScriptCall
* @function setRegister
* @instance
* @summary Set the execution context register of the called script. 
* @param {Register} register Register object representing the desired execution context register. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @see [Context.register]{@link Context#register} 
* @example
* var call = new ScriptCall("schreiber", "testScript", false);
* var file = context.getFileById("peachit_fi20120000000016");
* if (file)
* {
*   var reg = file.getRegisterByName("Doc1");
*    call.setRegister(reg);
*   }
**/
/**
* @memberof ScriptCall
* @function waitForFinish
* @instance
* @summary Wait for the script call to finish. 
* @description Note: This function is only available for a waitable script call. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var call = new ScriptCall("schreiber", "testScript", true);
* if (call.launch())
* {
*   if (call.waitForFinish())
*   {
*       // do something
*   }
*   else
*       util.out(call.getLastError());
* }
**/
/**
* @interface SystemUser
* @summary The SystemUser class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS users by scripting means. 
* @description There are several functions implemented in different classes to retrieve a SystemUser object. 
**/
/**
* @memberof SystemUser
* @summary Annotations right flag in the access mask. 
* @description Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} ANNOTATIONS
* @instance
**/
/**
* @memberof SystemUser
* @summary Archive right flag in the access mask. 
* @description The bit that specifies the right to archive files. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} ARCHIVE
* @instance
**/
/**
* @memberof SystemUser
* @summary Change filetype right flag in the access mask. 
* @description The bit that specifies the right to change the filetype of a file. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} CHANGE_TYPE
* @instance
**/
/**
* @memberof SystemUser
* @summary Change workflow right flag in the access mask. 
* @description The bit that specifies the right to change a workflow assigned to a file. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} CHANGE_WORKFLOW
* @instance
**/
/**
* @memberof SystemUser
* @summary Copy right flag in the access mask. 
* @description The bit that specifies the right to copy files to a personal or public folder. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} COPY
* @instance
**/
/**
* @memberof SystemUser
* @summary Create right flag in the access mask. 
* @description The bit that specifies the right to create new files. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} CREATE
* @instance
**/
/**
* @memberof SystemUser
* @summary Create workflow right flag in the access mask. 
* @description Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} CREATE_WORKFLOW
* @instance
**/
/**
* @memberof SystemUser
* @summary String value containing the email address of the SystemUser. 
* @member {string} email
* @instance
**/
/**
* @memberof SystemUser
* @summary String value containing the first name of the SystemUser. 
* @member {string} firstName
* @instance
**/
/**
* @memberof SystemUser
* @summary String value containing the last name of the SystemUser. 
* @member {string} lastName
* @instance
**/
/**
* @memberof SystemUser
* @summary String value containing the unique login name of the SystemUser. 
* @member {string} login
* @instance
**/
/**
* @memberof SystemUser
* @summary Mail right flag in the access mask. 
* @description The bit that specifies the right to send files via an e-mail system. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} MAIL
* @instance
**/
/**
* @memberof SystemUser
* @summary Move right flag in the access mask. 
* @description The bit that specifies the right to move files to a personal or public folder. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} MOVE
* @instance
**/
/**
* @memberof SystemUser
* @summary Create PDF right flag in the access mask. 
* @description The bit that specifies the right to create a PDF of a file. 
* Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} PDF
* @instance
**/
/**
* @memberof SystemUser
* @summary Access to the property cache of the SystemUser. 
* @description 
* varuser=context.getSystemUser();
* if(!user.propCache.hasProperty("Contacts"))
* {
* util.out("Creatingcache");
* user.propCache.Contacts=["Peter","Paul","Marry"];
* }
* 
* @member {PropertyCache} propCache
* @instance
**/
/**
* @memberof SystemUser
* @summary Read right flag in the access mask. 
* @description The bit that specifies the right to see files. 
* Note: the access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} READ
* @instance
**/
/**
* @memberof SystemUser
* @summary Remove right flag in the access mask. 
* @description The bit that specifies the right to delete files. 
* Note: the access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} REMOVE
* @instance
**/
/**
* @memberof SystemUser
* @summary Start workflow flag in the access mask. 
* @description Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} START_WORKFLOW
* @instance
**/
/**
* @memberof SystemUser
* @summary Versioning right flag in the access mask. 
* @description Note: The access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} VERSION
* @instance
**/
/**
* @memberof SystemUser
* @summary Write right flag in the access mask. 
* @description The bit that specifies the right for changing index fields or documents in files. 
* Note: the access mask is returned by SystemUser.getAccess(DocFile)
* @member {number} WRITE
* @instance
**/
/**
* @memberof SystemUser
* @function addCustomProperty
* @instance
* @summary Creates a new CustomProperty for the user. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 4a
* @see [SystemUser.setOrAddCustomProperty]{@link SystemUser#setOrAddCustomProperty} 
* @see [SystemUser.getCustomProperties]{@link SystemUser#getCustomProperties} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var custProp = currentUser.addCustomProperty("favorites", "string", "peachit");
* if (!custProp)
*   util.out(currentUser.getLastError());
**/
/**
* @memberof SystemUser
* @function addFileTypeAgent
* @instance
* @summary Create file type agents for the user. 
* @param {any} fileTypes The desired file types may be passed as follows: String containing the technical name of the desired file type; Array of strings containing the technical names of the desired file types; String constant "*" indicating all file types. 
* @param {Array<any>} loginNames Array of strings containing the login names of the agents. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var loginNames = new Array();
* loginNames.push("user1");
* loginNames.push("user2");
* if (!currentUser.addFileTypeAgent("testFileType", loginNames))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function addFileTypeAgentScript
* @instance
* @summary Create file type agents for the user, whereby the agents are specified by the desired script. 
* @param {any} fileTypes The desired file types may be passed as follows: String containing the technical name of the desired file type; Array of strings containing the technical names of the desired file types; String constant "*" indicating all file types. 
* @param {string} scriptName String containing the name of the script specifying the file type agents. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* if (!currentUser.addFileTypeAgentScript("*", "testScript"))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function addToAccessProfile
* @instance
* @summary Make the SystemUser a member of the desired AccessProfile. 
* @param {AccessProfile} ap AccessProfile the user should be a member of 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b for PartnerAccounts 
* @since DOCUMENTS 4.0b HF1 for Fellows 
**/
/**
* @memberof SystemUser
* @function checkPassword
* @instance
* @summary Evaluate if the password is correct. 
* @param {string} passwd String value containing the plain password 
* @returns {boolean} true if correct, otherwise false
* @since ELC 3.60d / otrisPORTAL 6.0d 
**/
/**
* @memberof SystemUser
* @function delegateFilesOfAbsentUser
* @instance
* @summary Move the files from the inbox of an absent user to his agent. 
* @description If a Systemuser is set to absent, then all new files are redirected to his agent. The currently existing files (that came into the inbox before the was absent) can be moved to the agent with this method. If the user is not absent this method returns an error. 
* @returns {boolean} true if succeeded, otherwise false - an error message describing the error with getLastError(). 
* @since ELC 3.60g / otrisPORTAL 6.0g
* @see [booleansetAbsent]{@link booleansetAbsent} [booleansetAbsentMail]{@link booleansetAbsentMail} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* if (!currentUser.delegateFilesOfAbsentUser())
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function getAccess
* @instance
* @summary Retrieve an access mask whose bits correspond to the user's access rights supported by the given DocFile or filetype. 
* @description Note: There is a constant for any right flag in the access mask (e.g. SystemUser.READ specifies the read right). 
* @param {DocFile} docFile DocFile object to which the access rights should be retrieved. 
* @returns {number} 32-bit value whose bits correspond to the user's access rights. 
* @since DOCUMENTS 5.0a HF2
* @see [e.g.SystemUser.READ]{@link e#g#SystemUser#READ} 
* @example
* var docFile = context.file;
* var currentUser = context.getSystemUser();
* if (!currentUser)
*     throw "currentUser is NULL";
* var accessMask = currentUser.getAccess(docFile);
* if(SystemUser.READ & accessMask)
*     util.out("The user " + currentUser.login + " has read access!");
**/
/**
* @memberof SystemUser
* @function getAccessProfiles
* @instance
* @summary Retrieve an AccessProfileIterator representing a list of all AccessProfiles the user is a member of. 
* @returns {AccessProfileIterator} AccessProfileIterator containing a list of all AccessProfiles which are assigned to the user; null in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUser
* @function getAgents
* @instance
* @summary Get a SystemUserIterator with the agents of the user. 
* @description This method returns a SystemUserIterator with the agents of the user, if the user is absent. 
* @returns {SystemUserIterator} SystemUserIterator
* @since ELC 3.60g / otrisPORTAL 6.0g
* @see [booleansetAbsent]{@link booleansetAbsent} [booleansetAbsentMail]{@link booleansetAbsentMail} [booleandelegateFilesOfAbsentUser]{@link booleandelegateFilesOfAbsentUser} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var itSU = currentUser.getAgents();
* for (var su = itSU.first(); su; su = itSU.next())
* {
*    util.out(su.login);
* }
**/
/**
* @memberof SystemUser
* @function getAllFolders
* @instance
* @summary Retrieve a list of private and public Folders of the Systemuser. 
* @returns {FolderIterator} FolderIterator containing a list of the folders. 
* @since DOCUMENTS 5.0c
* @see [SystemUser.getAllFolders]{@link SystemUser#getAllFolders} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser)
*   throw "currentUser is null";
* 
* var folderIter = currentUser.getAllFolders();
**/
/**
* @memberof SystemUser
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the SystemUser. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUser
* @function getBackDelegatedFiles
* @instance
* @summary Get back the delegated files. 
* @description If the user is not present this method returns an error. 
* @param {boolean} removeFromAgentInbox Optional boolean indicating whether the files are removed from agent inbox after getting back by the user. If this parameter is not specified, the value from the user settings in the absent dialog on the web is used. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0d
* @see [booleansetAbsent]{@link booleansetAbsent} [booleandelegateFilesOfAbsentUser]{@link booleandelegateFilesOfAbsentUser} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* if (!currentUser.getBackDelegatedFiles(true))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function getCustomProperties
* @instance
* @summary Get a CustomPropertyIterator with all CustomProperty of the user. 
* @description This method returns a CustomPropertyIterator with the CustomProperty of the user. 
* @param {string} nameFilter String value defining an optional filter depending on the name 
* @param {string} typeFilter String value defining an optional filter depending on the type 
* @returns {CustomPropertyIterator} CustomPropertyIterator
* @since DOCUMENTS 4a
* @see [Context.findCustomProperties]{@link Context#findCustomProperties} 
* @see [SystemUser.setOrAddCustomProperty]{@link SystemUser#setOrAddCustomProperty} 
* @see [SystemUser.addCustomProperty]{@link SystemUser#addCustomProperty} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var itProp = currentUser.getCustomProperties();
* for (var prop = itProp.first(); prop; prop = itProp.next())
* {
*    util.out(prop.name +  prop.value);
* }
**/
/**
* @memberof SystemUser
* @function getIndividualFolders
* @instance
* @summary Retrieve a list of individual Folders of the Systemuser. 
* @returns {FolderIterator} FolderIterator containing a list of all individual folders. 
* @since DOCUMENTS 4.0d
* @see [SystemUser.getPrivateFolder]{@link SystemUser#getPrivateFolder} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser)
*   throw "currentUser is null";
* 
* var folderIter = currentUser.getIndividualFolders();
**/
/**
* @memberof SystemUser
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof SystemUser
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof SystemUser
* @function getPrivateFolder
* @instance
* @summary Try to retrieve a particular private Folder of the Systemuser. 
* @description In addition to the public folders you may define in DOCUMENTS, each DOCUMENTS user has a set of private folders. You might need to access a particular private folder to access its contents, for example. 
* @param {string} folderType String value defining the kind of private folder you want to access.
*You may choose between "individual" individual folder Note: This function returns only the first individual folder on the top level. Using SystemUser.getIndividualFolders() to retrieve all individual folders. "favorites" favorites folder "inbox" the user's inbox "sent" the user's sent folder "sendingfinished" user's folder containing files which finished their workflow "inwork" folder containing the files the SystemUser created himself "resubmission" folder containing files with a resubmission defined for the SystemUser"trash" folder containing files the user has deleted "tasks" folder containing all files the user has a task to perform to "lastused" folder containing the files the SystemUser accessed latest, sorted in descending chronological order "introuble" folder containing files which ran into some workflow error. This folder is only available for editors and only if it has been added manually by the administrator. 
* @returns {Folder} Folder object representing the desired folder, null in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b
* @see [SystemUser.getIndividualFolders]{@link SystemUser#getIndividualFolders} 
**/
/**
* @memberof SystemUser
* @function getSuperior
* @instance
* @summary Get the SystemUser object representing the superior of the user. 
* @returns {SystemUser} SystemUser object representing the superior or null if no superior available 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUser
* @function getUserdefinedInboxFolders
* @instance
* @summary Retrieve a list of userdefined inbox Folders of the Systemuser. 
* @returns {FolderIterator} FolderIterator containing a list of all userdefined inbox folders. 
* @since DOCUMENTS 4.0d
* @see [SystemUser.getPrivateFolder]{@link SystemUser#getPrivateFolder} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser)
*   throw "currentUser is null";
* 
* var folderIter = currentUser.getUserdefinedInboxFolders();
**/
/**
* @memberof SystemUser
* @function hasAccessProfile
* @instance
* @summary Retrieve information whether the SystemUser is a member of a particular AccessProfile which is identified by its technical name. 
* @param {string} profileName String value containing the technical name of an AccessProfile
* @returns {boolean} true if the SystemUser is a member of the desired profile, otherwise false
* @since ELC 3.50e / otrisPORTAL 5.0e 
**/
/**
* @memberof SystemUser
* @function invalidateAccessProfileCache
* @instance
* @summary Invalidates the server sided cache of the access profiles for the SystemUser. 
* @returns {boolean} true if successful, otherwise false
* @since DOCUMENTS 4.0 (HF1) 
**/
/**
* @memberof SystemUser
* @function listAgentFileTypes
* @instance
* @summary Retrieve a list of file types for them an agent exists. 
* @returns {Array<any>} Array of strings containing the technical names of the file types. 
* If the flag 'all filetypes' for a file type agent is set, the array contains only the string "*". 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var fileTypes = currentUser.listAgentFileTypes();
* if (fileTypes)
* {
*    for (var i=0; i < fileTypes.length; i++)
*    {
*       util.out(fileTypes[i]);
*     }
* }
* else
*    util.out("Error: " + currentUser.getLastError());
**/
/**
* @memberof SystemUser
* @function listFileTypeAgents
* @instance
* @summary Retrieve a list of all agents for the desired file type of the user. 
* @param {string} fileType String containing the technical name of the file type. 
* @returns {Array<any>} Array of strings containing login names of all agents for the desired file type. 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var loginNames = currentUser.listFileTypeAgents("testFileType");
* if (loginNames)
* {
*    for (var i=0; i < loginNames.length; i++)
*    {
*       util.out(loginNames[i]);
*     }
* }
* else
*    util.out("Error: " + currentUser.getLastError());
**/
/**
* @memberof SystemUser
* @function notifyFileReturnedFromSending
* @instance
* @summary Define whether to notify the user by e-mail of files returned from sending. 
* @param {boolean} notifying boolean indicating whether files returned from sending are to be notified to the user. The default value is true. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* if (!currentUser.notifyFileReturnedFromSending(true))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function notifyNewFileInInbox
* @instance
* @summary Define whether to notify the user by e-mail of new files in inbox. 
* @param {boolean} notifying boolean indicating whether new files in inbox are to be notified to the user. The default value is true. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* if (!currentUser.notifyNewFileInInbox(true))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function removeFileTypeAgent
* @instance
* @summary Remove file type agents from the user. 
* @param {any} fileTypes The desired file types may be passed as follows: String containing the technical name of the desired file type; Array of strings containing the technical names of the desired file types; String constant "*" indicating all file types. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 5.0a
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var fileTypes = new Array();
* fileTypes.push("Filetype1");
* fileTypes.push("Filetype2");
* if (!currentUser.removeFileTypeAgent(fileTypes))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function removeFromAccessProfile
* @instance
* @summary Clear the SystemUser's membership in the given AccessProfile. 
* @param {AccessProfile} ap 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b for PartnerAccounts 
* @since DOCUMENTS 4.0b HF1 for Fellows 
**/
/**
* @memberof SystemUser
* @function resetSuperior
* @instance
* @summary Clear the user's relation to a superior. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUser
* @function setAbsent
* @instance
* @summary Set a Systemuser absent or present. 
* @description If a Systemuser is on holiday with this function it is possible to set the user absent. After his return you can set him present. You can also define one or more agents for the absent user. The agent will get new files for the absent user in substitution. With the agent list you set the agents for the user (you overwrite the existing agents!). With an empty agent list you remove all agents. 
* @param {boolean} absent boolean true, if the user should be set absent, false, if the user is present 
* @param {boolean} filesDueAbsenceToInfo boolean set to true, if the user should get the files due absence to info in his inbox 
* @param {string[]} agents Array with the login-names of the agents 
* @param {boolean} removeFromAgentInbox Optional boolean indicating whether the files are removed from agent inbox after getting back by the user. If this parameter is not specified, the value from the user settings in the absent dialog on the web is used. 
* @param {Date} from Optional Date object specifying when the absence begins. 
* @param {Date} until Optional Date object specifying when the absence ends. 
* @returns {boolean} true if correct, otherwise false an error message describing the error with getLastError(). 
* @since ELC 3.60g / otrisPORTAL 6.0g 
* @since DOCUMENTS 4.0d (Option: removeFromAgentInbox) 
* @since DOCUMENTS 5.0a (Option: from and until)
* @see [booleansetAbsentMail]{@link booleansetAbsentMail} [booleandelegateFilesOfAbsentUser]{@link booleandelegateFilesOfAbsentUser} [booleangetBackDelegatedFiles]{@link booleangetBackDelegatedFiles} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* // set user absent
* var agents = new Array();
* agents.push("oppen");
* agents.push("buch");
* var from = new Date();
* var until = context.addTimeInterval(from, 3, "days", false);
* if (!currentUser.setAbsent(true, false, agents, true, from, until))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
* 
* 
* // set user present
* if (!currentUser.setAbsent(false))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function setAbsentMail
* @instance
* @summary Define if an absence mail for the absent user will be sent to the sender of the file. 
* @description If a Systemuser is absent and get a file in the inbox, an absence mail to the sender of this file can be send. 
* @param {boolean} sendMail boolean true, if an absent mail should be sent, otherwise false
* @param {string} message String with an additional e-mail message from the absent user 
* @returns {boolean} true if succeeded, otherwise false - an error message describing the error with getLastError(). 
* @since ELC 3.60g / otrisPORTAL 6.0g
* @see [booleansetAbsent]{@link booleansetAbsent} [booleandelegateFilesOfAbsentUser]{@link booleandelegateFilesOfAbsentUser} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* if (!currentUser.setAbsentMail(true, "I will be back on 12/31 2009"))
*    util.out("Error: " + currentUser.getLastError());
* else
*    util.out("OK.");
**/
/**
* @memberof SystemUser
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the SystemUser to the desired value. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUser
* @function setOrAddCustomProperty
* @instance
* @summary Creates a new CustomProperty or modifies a CustomProperty according the name and type for the user. 
* @description This method creates or modifies a unique CustomProperty for the user. The combination of the name and the type make the CustomProperty unique for the user. 
* @param {string} name String value defining the name 
* @param {string} type String value defining the type 
* @param {string} value String value defining the value 
* @returns {CustomProperty} CustomProperty
* @since DOCUMENTS 4a
* @see [SystemUser.getCustomProperties]{@link SystemUser#getCustomProperties} 
* @see [SystemUser.addCustomProperty]{@link SystemUser#addCustomProperty} 
* @example
* var currentUser = context.getSystemUser();
* if (!currentUser) throw "currentUser is NULL";
* 
* var custProp = currentUser.setOrAddCustomProperty("superior", "string", "oppen");
* if (!custProp)
*   util.out(currentUser.getLastError());
**/
/**
* @memberof SystemUser
* @function setPassword
* @instance
* @summary Set the password of the user represented by the SystemUser object to the desired new value. 
* @param {string} newPwd String containing the plaintext new password 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUser
* @function setSuperior
* @instance
* @summary Set the SystemUser object representing the superior of the user to the desired object. 
* @param {SystemUser} sup Systemuser object representing the new superior of the user 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @interface SystemUserIterator
* @summary The SystemUserIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS users by scripting means. 
* @description The objects of this class represent lists of Systemuser objects and allow to loop through such a list of users. 
**/
/**
* @memberof SystemUserIterator
* @function first
* @instance
* @summary Retrieve the first SystemUser object in the SystemUserIterator. 
* @returns {SystemUser} SystemUser or null in case of an empty SystemUserIterator
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUserIterator
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50b / otrisPORTAL 5.0b 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof SystemUserIterator
* @function next
* @instance
* @summary Retrieve the next SystemUser object in the SystemUserIterator. 
* @returns {SystemUser} SystemUser or null if end of SystemUserIterator is reached. 
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @memberof SystemUserIterator
* @function size
* @instance
* @summary Get the amount of SystemUser objects in the SystemUserIterator. 
* @returns {number} integer value with the amount of SystemUser objects in the SystemUserIterator
* @since ELC 3.50b / otrisPORTAL 5.0b 
**/
/**
* @class UserAction
* @summary The UserAction class represents the user-defined action of DOCUMENTS. 
**/
/**
* @memberof UserAction
* @summary The entire label defined for the UserAction object. 
* @member {string} label
* @instance
**/
/**
* @memberof UserAction
* @summary The technical name of the UserAction object. 
* @member {string} name
* @instance
**/
/**
* @memberof UserAction
* @summary The scope of the UserAction object. 
* @member {string} scope
* @instance
**/
/**
* @memberof UserAction
* @summary The type of the UserAction object. 
* @member {string} type
* @instance
**/
/**
* @memberof UserAction
* @summary The widget identifier of the UserAction object. 
* @member {string} widget
* @instance
**/
/**
* @memberof UserAction
* @function addToFolder
* @instance
* @summary Add the user action to a Folder. 
* @param {Folder} folder Folder object representing the desired Folder. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var it = context.getFoldersByName("testFolder");
* var folder = it.first();
* if (folder)
* {
*   var action = new UserAction("testAction");
*   if (action)
*   {
*       if (!action.addToFolder(folder))
*           util.out(action.getLastError());
*   }
* }
**/
/**
* @memberof UserAction
* @function getLastError
* @instance
* @summary Get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since DOCUMENTS 4.0d 
**/
/**
* @memberof UserAction
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with the object-id or an empty string in case the user action has not yet been added to a proper parent object. 
* @since DOCUMENTS 4.0d 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof UserAction
* @function getPosition
* @instance
* @summary Retrieve the position of the user action within the user-defined action list of the parent object. 
* @returns {number} The zero-based position of the user action as integer or -1 in case of any error. 
* @since DOCUMENTS 4.0d
* @example
* var it = context.getFoldersByName("testFolder");
* var folder = it.first();
* if (folder)
* {
*   var action = folder.getActionByName("testAction");
*   if (action)
*       util.out(action.getPosition());
* }
**/
/**
* @memberof UserAction
* @function remove
* @instance
* @summary Remove the user action from the parent object. 
* @description Note: If the user action has not yet been added to a proper parent object, this function does nothing. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var it = context.getFoldersByName("testFolder");
* var folder = it.first();
* if (folder)
* {
*   var action = folder.getActionByName("testAction");
*   if (action)
*       action.remove();
* }
**/
/**
* @memberof UserAction
* @function setContext
* @instance
* @summary Set the context for a user action of type JSP. 
* @description Note: This function is only available for a user action of type JSP. 
* @param {string} context String containing the desired context. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var action = new UserAction("testAction");
* action.type = "JSP";
* if (!action.setContext("myContext"))
*   util.out(action.getLastError());
**/
/**
* @memberof UserAction
* @function setCreateDefaultWorkflow
* @instance
* @summary Set the flag whether to create the default workflow for a user action of type NewFile. 
* @description Note: This function is only available for a user action of type NewFile. 
* @param {boolean} createDefaultWorkflow Flag indicating whether to create the default workflow for a new file. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var action = new UserAction("testAction");
* if (!action.setCreateDefaultWorkflow(false))
*   util.out(action.getLastError());
**/
/**
* @memberof UserAction
* @function setFileTypeForNewFile
* @instance
* @summary Set the file type for a user action of type NewFile. 
* @description Note: This function is only available for a user action of type NewFile. 
* @param {string} fileType The technical name of the desired file type; use empty string ('') if you want to remove the associated file type. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var action = new UserAction("testAction");
* if (!action.setFileTypeForNewFile("Filetype1"))
*   util.out(action.getLastError());
* 
* // You can remove the file type as follows:
* action.setFileTypeForNewFile('');
**/
/**
* @memberof UserAction
* @function setPortalScript
* @instance
* @summary Set the portal script for a user action of type PortalScript. 
* @description Note: This function is only available for a user action of type PortalScript. 
* @param {string} scriptName The name of the desired portal script; use empty string ('') if you want to remove the associated script. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var action = new UserAction("testAction");
* action.type = "PortalScript";
* if (!action.setPortalScript("testScript"))
*   util.out(action.getLastError());
* 
* // You can remove the script as follows:
* action.setPortalScript('');
**/
/**
* @memberof UserAction
* @function setPosition
* @instance
* @summary Place the user action at the given position in the user-defined action list of the parent object. 
* @description Note: 0 at the beginning and -1 at the end. 
* @param {number} position The 0-based position for the user action. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0d
* @example
* var it = context.getFoldersByName("testFolder");
* var folder = it.first();
* if (folder)
* {
*   var action = folder.getActionByName("testAction");
*   if (action)
*       action.setPosition(-1);
* }
**/
/**
* @memberof UserAction
* @constructor UserAction
* @summary Create a new instance of the UserAction class. 
* @param {string} name String value containing the desired user action name. 
* @param {string} label String value containing the desired user action label. 
* @param {string} widget String value containing the desired user action widget. 
* @param {string} type String value containing the desired user action type. 
* @param {string} scope String value containting the desired user action scope. 
* @returns {UserAction} 
* @since DOCUMENTS 4.0d
* @see [UserAction.widget,UserAction.type,UserAction.scope]{@link UserAction#widget,UserAction#type,UserAction#scope} 
* @example
* var action = new UserAction("testAction", "de:Aktion;en:Action", "DropdownList", "PortalScript", "ProcessesOnly");
**/
/**
* @memberof module:util
* @summary Build version number of the PortalServer. 
* @member {number} buildNo
* @instance
**/
/**
* @memberof module:util
* @summary Database using by the PortalServer. 
* @description The following databases are supported by the PortalServer: 
* <ul>
* <li>oracle</li>
* <li>mysql</li>
* <li>mssql</li>
* </ul>
* 
* Note: This property is readonly. 
* @member {string} DB
* @instance
**/
/**
* @memberof module:util
* @summary Memory model of the PortalServer. 
* @member {string} memoryModel
* @instance
**/
/**
* @memberof module:util
* @summary Main version number of the PortalServer. 
* @description This property allows to retrieve the version number of the PortalServer to customize your PortalScripts in dependence of the used PortalServer. For example: 
* <ul>
* <li>otrisPORTAL 5.1 / ELC 3.51 returns 5100 </li>
* <li>otrisPORTAL 6.0 / ELC 3.60 returns 6000 </li>
* <li>DOCUMENTS 4.0 returns 7000</li>
* </ul>
* 
* Note: This property is readonly. 
* @member {number} version
* @instance
**/
/**
* @memberof module:util
* @function base64Decode
* @instance
* @summary Decodes a base64 string and returns a string or byte-array. 
* @param {string} value String to decode 
* @param {boolean} returnArray boolean as an optional parameter to define if the return value must be a byte-array or string (default) 
* @returns {any} decoded string or byte-array 
* @since DOCUMENTS 4.0c HF1
* @example
* var b64Str = util.base64Encode("Hello World");
* util.out(b64Str);   // SGVsbG8gV29ybGQ=
* 
* var str = util.base64Decode(b64Str);
* util.out(str);      // Hello World
* 
* var byteArr = util.base64Decode(b64Str, true);
* util.out(byteArr);  // 72,101,108,108,111,32,87,111,114,108,100
* 
* b64Str = util.base64Encode(byteArr);
* util.out(b64Str);   // SGVsbG8gV29ybGQ=
**/
/**
* @memberof module:util
* @function base64Encode
* @instance
* @summary Encodes a byte-array or string to base64 and returns the base 64 string. 
* @param {any} value String or byte-array to encode 
* @param {boolean} returnArray boolean as an optional parameter to define if the return value must be a byte-array or string (default) 
* @returns {string} base64 encoded string 
* @since DOCUMENTS 4.0c HF1
* @example
* var b64Str = util.base64Encode("Hello World");
* util.out(b64Str);   // SGVsbG8gV29ybGQ=
* 
* var str = util.base64Decode(b64Str);
* util.out(str);      // Hello World
* 
* var byteArr = util.base64Decode(b64Str, true);
* util.out(byteArr);  // 72,101,108,108,111,32,87,111,114,108,100
* 
* b64Str = util.base64Encode(byteArr);
* util.out(b64Str);   // SGVsbG8gV29ybGQ=
**/
/**
* @memberof module:util
* @function beep
* @instance
* @summary Plays a beep sound at the PortalServer's system. 
* @description For testing purposes a beep sound can be played at the server 
* @param {number} frequency int with the frequency in hertz 
* @param {number} duration int with the length of the sound in milliseconds (ms) 
* @returns {void} 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @example
* util.beep(1250, 3000);
**/
/**
* @memberof module:util
* @function concatPDF
* @instance
* @summary Concatenate the given PDFs together into one PDF. 
* @param {Array<any>} pdfFilePaths Array containing the file paths of PDFs to be concatenated. 
* @param {boolean} deleteSinglePdfs Optional boolean value to decide whether to delete the single PDFs on the server's filesystem after concatenating. 
* @returns {string} String with file path of the PDF, an empty string in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var arr = ["C:\\temp\\number1.pdf", "C:\\temp\\number2.pdf"];
* var filePath = util.concatPDF(arr, false);
* util.out("PDF file path: " + filePath);
**/
/**
* @memberof module:util
* @function convertBlobToPDF
* @instance
* @summary Convert a file to a PDF file and return the path in the file system. 
* @description The different file types require the appropriate PDF filter programs to be installed and configured in DOCUMENTS. 
* @param {string} sourceFilePath String containing the path of the file to be converted. 
* @returns {string} String with file path of the PDF, an empty string in case of any error. 
* @since DOCUMENTS 4.0d HF3
* @example
* var pathPdfFile = util.convertBlobToPDF("C:\\tmp\\testFile.doc");
* util.out(pathPdfFile);
**/
/**
* @memberof module:util
* @function convertDateToString
* @instance
* @summary Convert a Date object representing a date into a String. 
* @description The output String may have any format you like. The second parameter defines the format to configure which part of the date String should match the according properties of the Date object. 
* @param {Date} timeStamp Date object representing the desired date 
* @param {string} format String defining the date format of the output String, e.g. "dd.mm.yyyy".
* The possible format parts are: dd = two digit day mm = two digit month yy = two digit year yyyy = four digit year HH = two digit hour (24 hour format) MM = two digit minute SS = two digit second
*Special formats: @date = @yyyymmdd (locale independant format for filter in a FileResultset, HitResultset) @timestamp = @yyyymmddHHMMSS (locale independant format for filter in a FileResultset, HitResultset) 
* @returns {string} String representing the desired date 
* @since ELC 3.50e / otrisPORTAL 5.0e 
* @since DOCUMENTS 5.0a (new: Special formats @date and @timestamp)
* @see [Util.convertStringToDate]{@link Util#convertStringToDate} 
* @see [Context.convertDateToString]{@link Context#convertDateToString} 
* @example
* var format = "dd.mm.yyyy HH:MM";
* var now = new Date();
* util.out(util.convertDateToString(now, format));
**/
/**
* @memberof module:util
* @function convertStringToDate
* @instance
* @summary Convert a String representing a date into a Date object. 
* @description The String may contain a date or timestamp in any date format you like. The second parameter defines the format to configure which part of the date String should match the according properties of the Date object. 
* @param {string} dateOrTimeStamp String representing a date, e.g. "19.09.1974" 
* @param {string} format String defining the date format of the input String, e.g. "dd.mm.yyyy".
* The possible format parts are: dd = two digit day mm = two digit month yy = two digit year yyyy = four digit year HH = two digit hour (24 hour format) MM = two digit minute SS = two digit second
*Special formats: @date = @yyyymmdd (locale independant format for filter in a FileResultset, HitResultset) @timestamp = @yyyymmddHHMMSS (locale independant format for filter in a FileResultset, HitResultset) 
* @returns {Date} Date object representing the desired date 
* @since ELC 3.50e / otrisPORTAL 5.0e 
* @since DOCUMENTS 5.0a (new: Special formats @date and @timestamp)
* @see [Util.convertDateToString]{@link Util#convertDateToString} 
* @example
* var format = "dd.mm.yyyy HH:MM";
* var dateString = "19.09.1974";
* var birthDay = util.convertStringToDate(dateString, format);
**/
/**
* @memberof module:util
* @function cryptPassword
* @instance
* @summary Encrypt a plain password into an MD5 hash. 
* @param {string} pwPlain String containing the plain password 
* @returns {string} String containing the encrypted password 
* @since ELC 3.50o / otrisPORTAL 5.0o
* @example
* var cryptPW = util.cryptPassword("Hello World");
* util.out(cryptPW);
**/
/**
* @memberof module:util
* @function decodeUrlCompatible
* @instance
* @summary Decode URL parameter from DOCUMENTS Urls. 
* @param {string} encodedParam String containing the encoded URL param 
* @returns {string} String with decoded URL param. 
* @since DOCUMENTS 5.0a 
* @see [Util.encodeUrlCompatible]{@link Util#encodeUrlCompatible} 
* @example
* // URL with an archive key
* var encUrl = "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn?
*               pri=easyhr&lang=de#fi_96:3020/
*               id_{ehrmEmployeeDocument$EAstore2$HMUnit$DNDefault$CPInstance$DNDefault$CPPool$DNAdaptive
*               $CPPool$DNAdaptive02$CPDocument$DNADAPTIVE$CO060C8A9C3A1811E6B75A000C29E0A93B}
*               /ri_FileCover/di_easyhrdc0000000000000497";
* 
* var decUrl = util.decodeUrlCompatible(encUrl);
* 
* decUrl == "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn
*            ?pri=easyhr&lang=de#fi_96:3020/
*            id_{ehrmEmployeeDocument@store2|Unit=Default/Instance=Default/Pool=Adaptive/Pool=
*            Adaptive02/Document=ADAPTIVE.060C8A9C3A1811E6B75A000C29E0A93B}
*            /ri_FileCover/di_easyhrdc0000000000000497";
**/
/**
* @memberof module:util
* @function decryptString
* @instance
* @summary Decrypts a String value hat was encrypted with the method Util.encryptString(String input)
* @param {string} input The string that will be decrypted 
* @returns {string} String decrypted value 
* @since DOCUMENTS 5.0b
* @see [Util.encryptString]{@link Util#encryptString} 
* @example
* var text = "I'm a secret password";
* 
* var encryptedText = util.encryptString(text);
* util.out(encryptedText);  // NABPIGCGBHEBBOMECMJHDBHIIHOCDNOMODEILCABDKOLJBMFBKDDOFDABNAMCLJC
* 
* var decryptedText = util.decryptString(encryptedText);
* util.out(decryptedText);  // I'm a secret password
**/
/**
* @memberof module:util
* @function deleteFile
* @instance
* @summary Delete a file (file system object) at the PortalServer's system. 
* @description This functions provides a simple delete method for files on the server's file system. 
* @param {string} filePath String with the file path 
* @returns {string} empty String if successful, the error message in case of any error 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @example
* var errMsg = util.deleteFile("c:\\Test.log");
* if (errMsg.length > 0)
*     util.out(errMsg);
* else
*     util.out("Ok.");
**/
/**
* @memberof module:util
* @function encodeUrlCompatible
* @instance
* @summary Encode URL parameter for DOCUMENTS Urls. 
* @description Some parameters in DOCUMENTS urls must be encoded. E.g. the archive keys can contain invalid characters like / etc. 
* @param {string} param String containing the value to encode 
* @returns {string} String with encoded value. 
* @since DOCUMENTS 5.0a 
* @see [Util.decodeUrlCompatible]{@link Util#decodeUrlCompatible} 
* @example
* // URL with an archive key
* var url = "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn?
*            pri=easyhr&lang=de#fi_96:3020/
*            id_{ehrmEmployeeDocument@store2|Unit=Default/Instance=Default/Pool=Adaptive/Pool=
*            Adaptive02/Document=ADAPTIVE.060C8A9C3A1811E6B75A000C29E0A93B}
*            /ri_FileCover/di_easyhrdc0000000000000497";
* 
* // The archive key is the value between  id_{   }
* // "ehrmEmployeeDocument@store2|Unit=Default/Instance=Default/Pool=
* //  Adaptive/Pool=Adaptive02/Document=ADAPTIVE.060C8A9C3A1811E6B75A000C29E0A93B"
* // this key must be encoded
* 
* var encUrl = encodeURL(url);
* encUrl == "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn?
*            pri=easyhr&lang=de#fi_96:3020/
*            id_{ehrmEmployeeDocument$EAstore2$HMUnit$DNDefault$CPInstance$DNDefault$CPPool$DNAdaptive
*            $CPPool$DNAdaptive02$CPDocument$DNADAPTIVE$CO060C8A9C3A1811E6B75A000C29E0A93B}
*            /ri_FileCover/di_easyhrdc0000000000000497";
* 
* function encodeURL(url)
* {
*    // RegEx to split the url in it's parts
*    var reg = /(.*id_{)(.*)(}.*)/
*    if (!completeURL.match(reg))
*       throw "unable to encode";
*    var part1 = RegExp.$1;
*    var partKey = RegExp.$2;
*    var part3 = RegExp.$3;
*    return encoded = part1 + util.encodeUrlCompatible(partKey) + part3;
* }
**/
/**
* @memberof module:util
* @function encryptString
* @instance
* @summary Encrypts a String value with the AES 256 CBC algorithm for symmetric encryption/decryption. 
* @description The length of the input String is limited to 1024 bytes. The encrypted value depends on the principal name. Usage is e.g. storing of passwords in the database for authorization against 3rd party web services. 
* @param {string} input The string that will be encrypted 
* @returns {string} String encrypted value 
* @since DOCUMENTS 5.0b
* @see [Util.decryptString]{@link Util#decryptString} 
* @example
* var text = "I'm a secret password";
* 
* var encryptedText = util.encryptString(text);
* util.out(encryptedText);  // NABPIGCGBHEBBOMECMJHDBHIIHOCDNOMODEILCABDKOLJBMFBKDDOFDABNAMCLJC
* 
* var decryptedText = util.decryptString(encryptedText);
* util.out(decryptedText);  // I'm a secret password
**/
/**
* @memberof module:util
* @function fileCopy
* @instance
* @summary Copy a file (file system object) at the PortalServer's system. 
* @description This functions provides a simple copy method for files on the server's file system. 
* @param {string} sourceFilePath String with the source file path 
* @param {string} targetFilePath String with the target file path 
* @returns {string} empty String if successful, the error message in case of any error 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @see [Util.fileMove]{@link Util#fileMove} 
* @example
* var errMsg = util.fileCopy("c:\\Test.log", "d:\\Test.log");
* if (errMsg.length > 0)
*     util.out(errMsg);
* else
*     util.out("Ok.");
**/
/**
* @memberof module:util
* @function fileMove
* @instance
* @summary Move a file (file system object) at the PortalServer's system from a source file path to the target file path. 
* @description This functions provides a simple move method for files on the server's file system. 
* @param {string} sourceFilePath String with the source file path 
* @param {string} targetFilePath String with the target file path 
* @returns {string} empty String if successful, the error message in case of any error 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @see [Util.fileCopy]{@link Util#fileCopy} 
* @example
* var errMsg = util.fileMove("c:\\Test.log", "d:\\Test.log");
* if (errMsg.length > 0)
*     util.out(errMsg);
* else
*     util.out("Ok.");
**/
/**
* @memberof module:util
* @function fileSize
* @instance
* @summary Retrieve the filesize of a file (file system object) at the PortalServer's system. 
* @description This functions returns the filesize of a file. 
* @param {string} filePath String with the file path 
* @returns {number} Int with file size if successful, the value -1 in case of any error 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @example
* var size = util.fileSize("c:\\Test.log");
* if (size < 0)
*     util.out("File does not exist.");
* else
*     util.out(size);
**/
/**
* @memberof module:util
* @function generateChecksum
* @instance
* @summary Creates a MD5 checksum for the String value. 
* @param {string} input The string for that the checksum will be generated 
* @returns {string} String with the checksum 
* @since DOCUMENTS 4.0c
* @example
* var text = "I'm some type of text";
* var md5 = util.generateChecksum(text);
* if (md5 != "a77c16d60b9939295c0af4c7242b6c02")
*    util.out("wrong md5!");
**/
/**
* @memberof module:util
* @function getDir
* @instance
* @summary Retrieving files and subdirectories of a specified directory. 
* @description This function retrieve the content (files, subdirectories) of a specified directory of the PortalServer's file system. It expected two empty Arrays, which the function fill with the filenames and subdirectory names. The names will not contain the full path, only the name itself. This function will not work recursively. 
* @param {string} dirname String containing the name of the wanted directory 
* @param {Array<any>} files Empty array for the filenames 
* @param {Array<any>} subDirs Empty array for the subdirectory names 
* @returns {string} empty String if successful, the error message in case of any error 
* @since ELC 3.60e / otrisPORTAL 6.0e
* @example
* var files = new Array();
* var dirs = new Array();
* util.getDir("c:\\Test", files, dirs);
* 
* var i=0;
* for (i=0; i < files.length; i++)
*    util.out(files[i])
* 
* for (i=0; i < dirs.length; i++)
*    util.out(dirs[i])
**/
/**
* @memberof module:util
* @function getEnvironment
* @instance
* @summary Reads an environment variable of the PortalServer's system. 
* @description With this function an environment variable in the server's context can be read. 
* @param {string} variableName String with the name of the variable 
* @returns {string} Environment value as String 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @example
* util.out(util.getEnvironment("HOME"));
**/
/**
* @memberof module:util
* @function getFileContentAsString
* @instance
* @summary Get the content of a file at the PortalServer's system as string in base64 format. 
* @param {string} filePath String with the file path. 
* @returns {string} String containing the file content in base64 format. 
* @since DOCUMENTS 4.0c 
**/
/**
* @memberof module:util
* @function getQuoted
* @instance
* @summary Returns the input string enclosed in either double or single quotation marks. 
* @param {string} input 
* @returns {string} 
**/
/**
* @memberof module:util
* @function getSourceLineInfo
* @instance
* @summary Retrieve the scriptName with the current line no of this methed. 
* @description This functions returns the scriptName and line no for debugging or logging purposes 
* @returns {string} String with the scriptName and line no 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof module:util
* @function getTmpPath
* @instance
* @summary Get the path to the temporary directory on the Portalserver. 
* @returns {string} String containing the complete path to the temporary directory 
* @since ELC 3.51 / otrisPORTAL 5.1
* @example
* util.out(util.getTmpPath());
**/
/**
* @memberof module:util
* @function getUniqueId
* @instance
* @summary Get a unique id from the system. 
* @description The length of the id is 40 characters and the id contains only the characters 'a' to 'z'. This unique id can e.g. be used for file names etc. 
* @returns {string} String containing the unique id 
* @since ELC 3.60 / otrisPORTAL 6.0
* @example
* var uniqueId = util.getUniqueId();
* util.out(uniqueId);
**/
/**
* @memberof module:util
* @function getUsedPrivateBytes
* @instance
* @summary Returns the current usage of private bytes memory of the documensserver process. 
* @returns {number} integer value with the used memory in KBytes
* @since DOCUMENTS 5.0b 
**/
/**
* @memberof module:util
* @function hmac
* @instance
* @summary Generates a hash-based message authentication code (hmac) of a message string using a secret key. 
* @description These hash functions are supported: 
* <ul>
* <li>"sha1"</li>
* <li>"sha224"</li>
* <li>"sha256"</li>
* <li>"sha384"</li>
* <li>"sha512"</li>
* <li>"md4"</li>
* <li>"md5"</li>
* </ul>
* 
* @param {string} hashfunction Name of the hash function. 
* @param {string} key Secret key. 
* @param {string} message Message string to be hashed. 
* @param {boolean} rawOutput Optional flag: 
* If set to true, the function outputs the raw binary representation of the hmac. 
* If set to false, the function outputs the hexadecimal representation of the hmac. 
* The default value is false. 
* @returns {string} String containing the hash-based message authentication code (hmac) of the message (see rawOutput for representation).
* @since DOCUMENTS 5.0a HF2
* @example
* var key = "MySecretKey";
* var msg = "Hello world!";
* var hmac = util.hmac("sha1", key, msg);
* util.out(hmac);
**/
/**
* @memberof module:util
* @function isEncryptedBlob
* @instance
* @summary Checks, if the current blob is encrypted (Repository encryption) or not. 
* @param {string} blobFilePath String containing the path of the file to be checked. 
* @returns {boolean} boolean value that indicates if the blob is encrypted. 
* @since DOCUMENTS 4.0d HF3 
**/
/**
* @memberof module:util
* @function length_u
* @instance
* @summary Returns the number of characters of a UTF-8 string. 
* @description You can use this function in a x64 / UTF-8 server to count the characters in a UTF-8 string. 
* Note: for use in x64 / UTF-8 versions
* @param {string} value UTF-8 String of which the number of characters will be counted 
* @returns {number} Integer with the length in characters 
* @since DOCUMENTS 4.0a HF1 
* @example
* var text = "KÃ¶ln is a german city";
* util.out(text.length);          // => 22 bytes
* util.out(util.length_u(text));  // => 21 characters
**/
/**
* @memberof module:util
* @function log
* @instance
* @summary Log a String to the DOCUMENTS server window. 
* @description Same as util.out() with additional debugging information (script name and line number) You may output whatever information you want. This function is useful especially for debugging purposes. Be aware that you should run the Portalserver as an application if you want to make use of the out() function, otherwise the output is stored in the Windows Eventlog instead. 
* @param {string} output String you want to output to the Portalserver Window 
* @returns {any} 
* @since ELC 3.50e / otrisPORTAL 5.0e
* @example
* util.log("Hello World");
**/
/**
* @memberof module:util
* @function makeFullDir
* @instance
* @summary Creates a directory with subdirectories at the PortalServer's file system. 
* @description This functions provides a simple method for directory creation on the file system. 
* @param {string} dirPath String with the directory path 
* @returns {string} empty String if successful, the error message in case of any error 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @example
* var errMsg = util.makeFullDir("c:\\log\\ELC");
* if (errMsg.length > 0)
*     util.out(errMsg);
* else
*     util.out("Ok.");
**/
/**
* @memberof module:util
* @function makeHTML
* @instance
* @summary Masks all HTML-elements of a String. 
* @description This function masks the following characters for HTML output: 
* <table border=1 cellspacing=0>
* <tr><td>></td><td>&gt; </td></tr>
* <tr><td><</td><td>&lt; </td></tr>
* <tr><td>\n</td><td><br> </td></tr>
* <tr><td>&</td><td>&amp; </td></tr>
* <tr><td>"</td><td>&quot; </td></tr>
* </table>
* 
* If the String is in UTF-8 Format, all UTF-8 characters will be replaced with the according HTML entities. 
* @param {string} val String to be masked 
* @param {boolean} isUTF8 boolean flag, if the val is in UTF-8 format 
* @returns {string} HTML-String 
* @since ELC 3.60e / otrisPORTAL 6.0e 
**/
/**
* @memberof module:util
* @function out
* @instance
* @summary Output a String to the Portalserver window. 
* @description You may output whatever information you want. This function is useful especially for debugging purposes. Be aware that you should run the Portalserver as an application if you want to make use of the out() function, otherwise the output is stored in the Windows Eventlog instead. 
* @param {string} output String you want to output to the Portalserver Window 
* @returns {any} 
* @since ELC 3.50e / otrisPORTAL 5.0e
* @example
* util.out("Hello World");
**/
/**
* @memberof module:util
* @function searchInArray
* @instance
* @summary Search for a String in an Array. 
* @description This functions provides a simple search method for Arrays to find the position of a string in an array. 
* @param {Array<any>} theArray Array in that the String will be searched 
* @param {string} searchedString String that will be searched 
* @param {number} occurence Integer that define the wanted position at a multi-occurence of the String in the Array 
* @returns {number} Integer with the position of the String in the array, -1 in case of the String isn't found 
* @since ELC 3.60e / otrisPORTAL 6.0e 
* @example
* enumval[0] = "This";
* enumval[1] = "is";
* enumval[2] = "a";
* enumval[3] = "sample";
* var pos = util.searchInArray(enumval, "is");
* util.out(pos);  // should be the value 1
**/
/**
* @memberof module:util
* @function sha256
* @instance
* @summary Generates the SHA256 hash of any string. 
* @param {string} message Message string to be hashed. 
* @returns {string} SHA256 hash of the message. 
* @since DOCUMENTS 5.0a HF2 
**/
/**
* @memberof module:util
* @function sleep
* @instance
* @summary Let the PortalScript sleep for a defined duration. 
* @param {number} duration Integer containing the duration in milliseconds 
* @returns {void} 
* @since DOCUMENTS 5.0a 
**/
/**
* @memberof module:util
* @function substr_u
* @instance
* @summary Returns a substring of a UTF-8 string. 
* @description You can use this function in a x64 / UTF-8 server to get a substring of a UTF-8 string. 
* Note: for use in x64 / UTF-8 versions
* @param {string} value UTF-8 String of which the substring is wanted 
* @param {number} startIndex int with the 0-based start index of the substring 
* @param {number} length int with the length in characters of the substring 
* @returns {string} UTF-8 String with the wanted substring 
* @since DOCUMENTS 4.0a HF1 
* @example
* var text = "KÃ¶ln is a german city";
* util.out(util.substr_u(text, 0, 4));   // => KÃ¶ln
* util.out(util.substr_u(text, 5));      // => is a german city
* // but
* util.out(text.substr(0, 4));      // => KÃ¶l
**/
/**
* @memberof module:util
* @function transcode
* @instance
* @summary Transcode a String from encoding a to encoding b. 
* @param {string} nameSourceEncoding 
* @param {string} text 
* @param {string} nameTargetEncoding 
* @returns {string} 
**/
/**
* @memberof module:util
* @function unlinkFile
* @instance
* @summary Delete a physical file on the server's file system. 
* @param {string} filePath String containing the full path and filename to the desired physical file 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51 / otrisPORTAL 5.1
* @example
* var success = util.unlinkFile("c:\\tmp\\tempfile.txt");
**/
/**
* @interface WorkflowStep
* @summary The WorkflowStep class allows access to the according object type of DOCUMENTS. 
* @description You may access WorkflowStep objects by the different methods described in the DocFile chapter. 
* Note: This class and all of its methods and attributes require a full workflow engine license, it does not work with pure submission lists. 
**/
/**
* @memberof WorkflowStep
* @summary String value containing the locking user group of the WorkflowStep. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} executiveGroup
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the type of recipient of the WorkflowStep. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} executiveType
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the locking user of the WorkflowStep. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} executiveUser
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the unique internal ID of the first outgoing ControlFlow. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} firstControlFlow
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the unique internal ID of the WorkflowStep. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} id
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the technical name of the WorkflowStep. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} name
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the status of the WorkflowStep. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} status
* @instance
**/
/**
* @memberof WorkflowStep
* @summary String value containing the unique internal ID of the Workflow template. 
* @description Note: This property requires a full workflow engine license, it does not work with pure submission lists. The property is readonly. 
* @member {string} templateId
* @instance
**/
/**
* @memberof WorkflowStep
* @function forwardFile
* @instance
* @summary Forward the file to its next WorkflowStep. 
* @description This requires the internal ID (as a String value) of the ControlFlow you want the file to pass through. The optional comment parameter will be stored as a comment in the file's monitor. 
* Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* The current user's permissions are not checked when using this function! 
* @param {string} controlFlowId String value containing the internal ID of the ControlFlow you want to pass through. 
* @param {string} comment optional String value containing your desired comment for the file's monitor. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50e / otrisPORTAL 5.0e 
**/
/**
* @memberof WorkflowStep
* @function getAttribute
* @instance
* @summary Get the String value of an attribute of the WorkflowStep. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} attribute String containing the name of the desired attribute 
* @returns {string} String containing the value of the desired attribute 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof WorkflowStep
* @function getControlFlows
* @instance
* @summary Retrieve an iterator representing a list of all outgoing ControlFlows of the WorkflowStep. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {ControlFlowIterator} ControlFlowIterator containing the outgoing ControlFlows of the current WorkflowStep object. 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof WorkflowStep
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @returns {string} Text of the last error as String 
* @since ELC 3.50 / otrisPORTAL 5.0 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof WorkflowStep
* @function getOID
* @instance
* @summary Returns the object-id. 
* @param {boolean} oidLow Optional flag: 
* If true only the id of the filetype object (m_oid) will be returned. 
* If false the id of the filetype object will be returned together with the id of the corresponding class in the form class-id:m_oid. 
* The default value is false. 
* @returns {string} String with object-id 
* @since ELC 3.60c / otrisPORTAL 6.0c 
* @since DOCUMENTS 5.0 (new parameter oidLow) 
**/
/**
* @memberof WorkflowStep
* @function getWorkflowName
* @instance
* @summary Retrieve the name of the workflow, the WorkflowStep belongs to. 
* @description Note: This function is only available for workflows, but not submission lists. 
* @returns {string} String containing the workflow name 
* @since ELC 3.60d / otrisPORTAL 6.0d 
* @see [WorkflowStep.getWorkflowVersion]{@link WorkflowStep#getWorkflowVersion} 
**/
/**
* @memberof WorkflowStep
* @function getWorkflowProperty
* @instance
* @summary Retrieve a property value of the workflow action, the WorkflowStep belongs to. 
* @description Note: This function is only available for workflows, but not submission lists. 
* @param {string} propertyName String containing the name of the desired property 
* @returns {string} String containing the property value 
* @since DOCUMENTS 4.0a 
**/
/**
* @memberof WorkflowStep
* @function getWorkflowVersion
* @instance
* @summary Retrieve the version number of the workflow, the WorkflowStep belongs to. 
* @description Note: This function is only available for workflows, but not submission lists. 
* @returns {string} String containing the workflow version number 
* @since ELC 3.60d / otrisPORTAL 6.0d 
* @see [WorkflowStep.getWorkflowName]{@link WorkflowStep#getWorkflowName} 
**/
/**
* @memberof WorkflowStep
* @function setAttribute
* @instance
* @summary Set the String value of an attribute of the WorkflowStep to the desired value. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} attribute String containing the name of the desired attribute 
* @param {string} value String containing the desired value of the attribute 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof WorkflowStep
* @function setNewExecutiveGroup
* @instance
* @summary Reassign the current WorkflowStep object to the given user group. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} accessProfileName String containing the technical name of the access profile. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0c
* @example
* var f = context.file;
* var step = f.getCurrentWorkflowStep();
* if (!step)
*   step = f.getFirstLockingWorkflowStep();
* if (!step)
*   util.out("File is not in a workflow.");
* 
* if (!step.setNewExecutiveGroup("AccessProfile1"))
*   util.out(step.getLastError());
**/
/**
* @memberof WorkflowStep
* @function setNewExecutiveUser
* @instance
* @summary Reassigns the current WorkflowStep object to the given user. 
* @description Note: This function requires a full workflow engine license, it does not work with pure submission lists. 
* @param {string} loginUser String containing the login name of the desired user. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.50e / otrisPORTAL 5.0e 
**/
/**
* @interface WorkflowStepIterator
* @summary The WorkflowStepIterator class has been added to the DOCUMENTS PortalScripting API to gain full control over a file's workflow by scripting means. 
* @description You may access WorkflowStepIterator objects by the getAllLockingWorkflowSteps() method described in the DocFile chapter. 
* Note: This class and all of its methods and attributes require a full workflow engine license, it does not work with pure submission lists. 
**/
/**
* @memberof WorkflowStepIterator
* @function first
* @instance
* @summary Retrieve the first WorkflowStep object in the WorkflowStepIterator. 
* @returns {WorkflowStep} WorkflowStep or null in case of an empty WorkflowStepIterator
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof WorkflowStepIterator
* @function next
* @instance
* @summary Retrieve the next WorkflowStep object in the WorkflowStepIterator. 
* @returns {WorkflowStep} WorkflowStep or null if end of WorkflowStepIterator is reached. 
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @memberof WorkflowStepIterator
* @function size
* @instance
* @summary Get the amount of WorkflowStep objects in the WorkflowStepIterator. 
* @returns {number} integer value with the amount of WorkflowStep objects in the WorkflowStepIterator
* @since ELC 3.51e / otrisPORTAL 5.1e 
**/
/**
* @class XMLExport
* @summary The XMLExport class allows to export DOCUMENTS elements as an XML file by scripting means. 
* @description The exported XML structure may then, for example, be used for further manipulation by an external ERP environment. The following elements can be exported: 
* <ul>
* <li>DocFile</li>
* <li>PortalScript </li>
* <li>Filetype </li>
* <li>Folder</li>
* <li>Workflow </li>
* <li>Distribution List </li>
* <li>Editor (Fellow) </li>
* <li>AccessProfile</li>
* <li>Alias </li>
* <li>Filing Plan </li>
* <li>Outbar </li>
* <li>DocumentsSettings </li>
* </ul>
* 
* The XML files may also be reimported into another (or the same) Portal environment by the Docimport application for DocFile objects and by the XML-import of DOCUMENTS Manager for the remaining elements, respectively. 
**/
/**
* @memberof XMLExport
* @function addAccessProfile
* @instance
* @summary Add the desired access profile to the XMLExport. 
* @param {any} accessProfile The desired access profile to be added to the XML output and specified as follows: String containing the technical name of the access profile AccessProfile object 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var path = "C:\\temp\\expAccessProfile.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addAccessProfile("AccessProfile1");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addAlias
* @instance
* @summary Add the desired alias to the XMLExport. 
* @param {string} aliasName String value containing the technical name of the alias to be added to the XML output. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var xmlExp = new XMLExport("C:\\temp\\expAlias.xml", false);
* var success = xmlExp.addAlias("alias1");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addDistributionList
* @instance
* @summary Add the desired distribution list to the XMLExport. 
* @param {string} distributionListName String containing the name of the distribution list to be added to the XML output. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var path = "C:\\temp\\expDistributionList.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addDistributionList("DistributionList1");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addDocumentsSettings
* @instance
* @summary Add the DOCUMENTS settings data to the XMLExport. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0e 
**/
/**
* @memberof XMLExport
* @function addFellow
* @instance
* @summary Add the desired editor (fellow) to the XMLExport. 
* @param {any} editor The editor to be added to the XML output and specified as follows: String containing the login name of the editor. SystemUser object representing the editor. 
* @param {boolean} includePrivateFolders boolean value indicating whether to export the private folders of the fellow 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c 
* @since DOCUMENTS 4.0c HF2 (new parameter includePrivateFolders)
* @example
* var path = "C:\\temp\\expFellow.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addFellow("editor1");
* if (success)
*  xmlExp.saveXML();
* else
*  util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addFile
* @instance
* @summary Add the desired DocFile object to the XMLExport. 
* @param {DocFile} docFile An object of the DocFile class which should be added to the XML output 
* @param {any} exportCondition Optional export conditions specified as follows: boolean value indicating whether the file id should be exported as update key. XMLExportDescription object defining serveral conditions for the exporting process of the DocFile object. 
*The default value is true. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b 
* @example
* var path = "C:\\temp\\expDocFile.xml";
* var xmlExp = new XMLExport(path, true);
* var success = xmlExp.addFile(context.file);
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addFileType
* @instance
* @summary Add the desired file type to the XMLExport. 
* @description The XML output is able to update the same file type (Update-XML). 
* @param {string} fileTypeName The technical name of the file type to be added to the XML output. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c 
* @example
* var path = "C:\\temp\\expFileType.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addFileType("Filetype1");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addFilingPlan
* @instance
* @summary Add the desired filing plan to the XMLExport. 
* @description The XML output is able to update the same filing plan (Update-XML). 
* @param {string} filingPlanName String containing the technical name of the filing plan to be added to the XML output. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var path = "C:\\temp\\expFilingPlan.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addFilingPlan("myFilingPlan");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addFolder
* @instance
* @summary Add the desired Folder object to the XMLExport. 
* @description This function is able to add the folder structure or the files in the folder to the XMLExport. 
* @param {Folder} folder The Folder object to be added to the XML output. 
* @param {boolean} exportStructure boolean value indicating whether to export the folder structure or the files in the folder, on which the current user has read rights. If you want to export the files in the folder, an XMLExport instance being able to export DocFile should be used. 
* @param {any} exportCondition The export conditions can be specified as follows: boolean value indicating whether the file id should be exported as update key in case of exporting files in the folder; indicating whether the subfolders should be exported in case of exporting the folder structure. XMLExportDescription object defining serveral conditions for the exporting process of the files in the folder. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var xmlExpFiles = new XMLExport("C:\\temp\\expFolderFiles.xml", true); // for exporting the files in the folder
* var xmlExpStructure = new XMLExport("C:\\temp\\expFolderStructure.xml", false); // for exporting the folder structure
* var it = context.getFoldersByName("myFolder", "dynamicpublic");
* var folder = it.first();
* if (folder)
* {
*   var success = xmlExpFiles.addFolder(folder, false); // add the files in the folder to the XML output
*   if (success)
*       xmlExpFiles.saveXML();
* 
*   success = xmlExpStructure.addFolder(folder, true, true); // add the folder structure to the XML output
*   if (success)
*       xmlExpStructure.saveXML();
* }
**/
/**
* @memberof XMLExport
* @function addNumberRange
* @instance
* @summary Add the desired number range alias to the XMLExport. 
* @param {string} name String value containing the technical name of the number range to be added to the XML output. 
* @param {boolean} withCounter boolean value indicating whether to export the actual counter value of the number range 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d HF1 
**/
/**
* @memberof XMLExport
* @function addOutbar
* @instance
* @summary Add the desired outbar to the XMLExport. 
* @param {string} outbarName String value containing the technical name of the outbar to be added to the XML output. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d
* @example
* var xmlExp = new XMLExport("C:\\temp\\expOutbar.xml", false);
* var success = xmlExp.addOutbar("outbar1");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addPartnerAccount
* @instance
* @summary Add the desired user account (not fellow) to the XMLExport. 
* @param {any} userAccount The user account to be added to the XML output and specified as follows: String containing the login name of the user account. SystemUser object representing the user account. 
* @param {boolean} includePrivateFolders boolean value indicating whether to export the private folders of the user account 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 5.0 HF2
* @example
* var path = "C:\\temp\\expUserAccount.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addPartnerAccount("login1");
* if (success)
*  xmlExp.saveXML();
* else
*  util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addPortalScript
* @instance
* @summary Add all PortalScripts with the desired name pattern to the XMLExport. 
* @description Note: The XML files exported in DOCUMENTS 5.0 format are incompatible with DOCUMENTS 4.0. 
* @param {string} namePattern The name pattern of the PortalScripts to be added to the XML output. 
* @param {string} format Optional String value defining the desired export format. The following formats are available: 4.0 (DOCUMENTS 4.0) 5.0 (DOCUMENTS 5.0) 
*The default value is "5.0". 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c 
* @since DOCUMENTS 5.0 HF1 (default format is 5.0) 
* @example
* var path = "C:\\temp\\expPortalScript.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addPortalScript("test*", "4.0");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addPortalScriptCall
* @instance
* @summary Defines a PortalScript, that will be executed after the XML-import. 
* @description This method does not export the content of a PortalScript (see XMLExport.addPortalScript()), but executes a PortalScript at the end of the XML-Import of the whole xml file. 
* @param {string} nameScript The name of the PortalScript, that should be executed. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 5.0c HF1 
* @example
* var path = "C:\\temp\\expPortalScript.xml";
* var xmlExp = new XMLExport(path, false);
* ...
* var success = xmlExp.addPortalScriptCall("updateSolution");
* ...
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addPortalScriptsFromCategory
* @instance
* @summary Add all PortalScripts belonging to the desired category to the XMLExport. 
* @description Note: The XML files exported in DOCUMENTS 5.0 format are incompatible with DOCUMENTS 4.0. 
* @param {string} nameCategory The category name of the PortalScripts to be added to the XML output. 
* @param {string} format Optional String value defining the desired export format. The following formats are available: 4.0 (DOCUMENTS 4.0) 4.0 (DOCUMENTS 5.0) 
*The default value is "5.0". 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0d HF1 
* @since DOCUMENTS 5.0 HF1 (default format is 5.0) 
* @example
* var path = "C:\\temp\\expPortalScript.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addPortalScriptsFromCategory("testScripts", "5.0");
* if (success)
*    xmlExp.saveXML();
* else
*    util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addSystemUser
* @instance
* @summary Add the desired SystemUser (user account or fellow) to the XMLExport. 
* @param {any} systemUser The SystemUser to be added to the XML output and specified as follows: String containing the login name of the SystemUser. SystemUser object representing the user account. 
* @param {boolean} includePrivateFolders boolean value indicating whether to export the private folders of the SystemUser
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 5.0 HF2
* @example
* var path = "C:\\temp\\expSystemUser.xml";
* var xmlExp = new XMLExport(path, false);
* var success = xmlExp.addSystemUser("login1");
* if (success)
*  xmlExp.saveXML();
* else
*  util.out(xmlExp.getLastError());
**/
/**
* @memberof XMLExport
* @function addWorkflow
* @instance
* @summary Add the desired workflow to the XMLExport. 
* @param {string} workflowName String containing the technical name and optional the version number of the workflow to be added to the XML output. The format of the workflowName is technicalName[-version]. If you don't specify the version of the workflow, the workflow with the highest workflow version number will be used. If you want to add a specific version, you have to use technicalName-version e.g. "Invoice-2" as workflowName. 
* @returns {boolean} true if successful, false in case of any error 
* @since DOCUMENTS 4.0c
* @example
* var path = "C:\\temp\\expWorkflow.xml";
* var xmlExp = new XMLExport(path, false);
* xmlExp.addWorkflow("Invoice"); // add the latest version of the workflow "Invoice"
* xmlExp.addWorkflow("Invoice-2"); // add the version 2 of the workflow "Invoice"
* xmlExp.saveXML();
**/
/**
* @memberof XMLExport
* @function clearXML
* @instance
* @summary Remove all references to DocFile objects from the XMLExport object. 
* @description After the execution of this method the XMLExport object is in the same state as right after its construction. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b 
**/
/**
* @memberof XMLExport
* @function getLastError
* @instance
* @summary Function to get the description of the last error that occurred. 
* @returns {string} Text of the last error as String 
* @since ELC 3.51b / otrisPORTAL 5.1b 
* @see [DocFile.getLastError]{@link DocFile#getLastError} 
**/
/**
* @memberof XMLExport
* @function getXML
* @instance
* @summary Retrieve the XML structure of the DocFile objects already added to the XMLExport. 
* @description The XML structure is returned as a String, so it is possible to further manipulate it (e.g. with the E4X scripting extension (not discussed in this documentation) before outputting it to its final destination. 
* @returns {string} String containing the complete XMl structure of the XMLExport
* @since ELC 3.51b / otrisPORTAL 5.1b 
**/
/**
* @memberof XMLExport
* @function saveXML
* @instance
* @summary Performs the final save process of the XML structure. 
* @description Not earlier than when executing this instruction the XML file is created in the target file path. 
* @returns {boolean} true if successful, false in case of any error 
* @since ELC 3.51b / otrisPORTAL 5.1b 
**/
/**
* @memberof XMLExport
* @constructor XMLExport
* @summary Create a new instance of the XMLExport class. 
* @description The constructor is neccessary to initialize the XMLExport object with some basic settings. The pathFileName parameter is mandatory, the path must be an existing directory structure, and the target file should not yet exist in that directory structure. 
* @param {string} pathFileName String containing full path and file name of the desired target output XML file 
* @param {boolean} exportDocFile Optional boolean value: true indicating that the created XMLExport instance is only able to export DocFile objects; false indicating the created XMLExport instance is able to export the following elements: PortalScript Filetype FolderWorkflow Distribution List Editor (Fellow) AccessProfileAlias Filing Plan Outbar DocumentsSettings 
*The default value is true. 
* @returns {XMLExport} XMLExport object, preinitialised to the desired target output path 
* @since ELC 3.51b / otrisPORTAL 5.1b 
* @since DOCUMENTS 4.0c (new parameter exportDocFile) 
**/
/**
* @class XMLExportDescription
* @summary The XMLExportDescription class has been added to the DOCUMENTS PortalScripting API to improve the XML Export process of DOCUMENTS files by scripting means. 
* @description For instance this allows to use different target archives for each file as well as to influence the archiving process by the file's contents itself. The XMLExportDescription object can only be used as parameter for the method XMLExport.addFile(XMLExportDescription) 
**/
/**
* @memberof XMLExportDescription
* @summary boolean value whether export the create timestamp of the file. 
* @member {boolean} exportCreatedAt
* @instance
**/
/**
* @memberof XMLExportDescription
* @summary boolean value whether export the id of the file. 
* @member {boolean} exportFileId
* @instance
**/
/**
* @memberof XMLExportDescription
* @summary boolean value whether export the timestamp of the last modification of the file. 
* @member {boolean} exportLastModifiedAt
* @instance
**/
/**
* @memberof XMLExportDescription
* @summary boolean value whether export the name of the last editor of the file. 
* @member {boolean} exportLastModifiedBy
* @instance
**/
/**
* @memberof XMLExportDescription
* @summary boolean value whether export the name of the owner of the file. 
* @member {boolean} exportOwner
* @instance
**/
/**
* @memberof XMLExportDescription
* @constructor XMLExportDescription
* @summary Create a new XMLExportDescription object. 
* @description Like in other programming languages you create a new object with the new operator (refer to example below). 
* @returns {XMLExportDescription} XMLExportDescription which allows to define several conditions for the archiving process of a certain DocFile object 
* @since DOCUMENTS 4.0c
* @see [XMLExport.addFile]{@link XMLExport#addFile} 
* @example
* var docFile = context.file;
* if (!docFile)
* {
*    // error handling
* }
* 
* var desc = new XMLExportDescription();
* desc.exportFileId = true;
* desc.exportOwner = true;
* desc.exportLastModifiedBy = true;
* desc.exportCreatedAt = true;
* desc.exportLastModifiedAt = true;
* 
* // create a new XMLExport
* var xml = new XMLExport("c:\\tmp\\" + docFile.getAutoText("id") + ".xml");
* xml.addFile(docFile, desc); // add the current file to the export
* xml.saveXML(); // perform the export operation
**/
/**
* @class XMLHTTPRequest
* @summary The XMLHTTPRequest class represents a HTTP request. 
* @description Though the name of this class traditionally refers to XML, it can be used to transfer arbitrary strings or binary data. The interface is based on the definition of the class IXMLHTTPRequest from MSXML. To send a HTTP request the following steps are needed: 
* <ul>
* <li>Creating an instance of this class. </li>
* <li>Initializing the request via open(). Possibly also adding header data by means of addRequestHeader(). </li>
* <li>Sending the request via send(). </li>
* <li>In case of asynchronous request checking for completion of the request operation via XMLHTTPRequest.readyState. </li>
* <li>Evaluating the result via e.g. XMLHTTPRequest.status, XMLHTTPRequest.response and getAllResponseHeaders().</li>
* </ul>
* 
**/
/**
* @memberof XMLHTTPRequest
* @summary Flag indicating whether asynchronous requests are possible on the used plattform. 
* @description Note: This property is readonly. 
* @member {boolean} canAsync
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary Flag indicating whether the implementation on the used plattform allows the direct specifying of a proxy server. 
* @description Note: This property is readonly. 
* @member {boolean} canProxy
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The constant 4 for XMLHTTPRequest.readyState. 
* @member {number} COMPLETED
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary Optional File size indicator for sending pure sequential files. 
* @description When uploading files, the send() function usually detects the file size and forwards it to lower APIs. This is helpful in most cases, because old simple HTTP servers do not support the transfer mode "chunked". Web services may reject uploads without an announced content-length, too. 
* 
* However, the auto-detection will fail, if a given file is not rewindable (a named pipe, for instance). To avoid errors this property should be set before sending such a special file. After the transmission the property should be either set to "-1" or deleted. 
* 
* The value is interpreted in the following way.
* <ul>
* <li>Values > 0 specify a precise file size in bytes.</li>
* <li>The value -1 has the same effect as leaving the property undefined (enable auto-detection).</li>
* <li>The value -2 disables file size detection and enforces a chunked transfer.</li>
* </ul>
* 
* @member {number} FileSizeHint
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The constant 3 for XMLHTTPRequest.readyState. 
* @member {number} INTERACTIVE
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The constant 1 for XMLHTTPRequest.readyState. 
* @member {number} NOTSENT
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The current state of the asynchronous request. 
* @description The following states are available: 
* <ul>
* <li>XMLHTTPRequest.UNINITIALIZED = 0 : the method open() has not been called. </li>
* <li>XMLHTTPRequest.NOTSENT = 1: the object has been initialized, but not sent yet. </li>
* <li>XMLHTTPRequest.SENT = 2 : the object has been sent. No data is available yet. </li>
* <li>XMLHTTPRequest.INTERACTIVE = 3: the request is partially completed. This means that some data has been received. </li>
* <li>XMLHTTPRequest.COMPLETED = 4: the request is completed. All the data are available now.</li>
* </ul>
* 
* Note: This property is readonly. 
* @member {number} readyState
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The response received from the HTTP server or null if no response is received. 
* @description Note: This property is readonly. Starting with DOCUMENTS 5.0c its data type is influenced by the optional property responseType. The default type is String. For requests with an attached responseFile this value can be truncated after a few kBytes. 
* @member {any} response
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary An optional writable file for streaming a large response. 
* @description To achieve an efficient download scripts can create a writable File an attach it to the request. The complete response will then be written into this file. The value of the response property, however, will be truncated after the first few kBytes.
* @member {File} responseFile
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary Preferred output format of the response property (optional). 
* @description By default, the object expects text responses and stores them in a String. If the application expects binary data, it may request an ArrayBuffer by setting this property to "arraybuffer". 
* Note: On new objects this property is undefined. ArrayBuffer responses are created only once after each request. If a script changes the received buffer, the response property will reflect these changes until a new request starts.
* @member {string} responseType
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The constant 2 for XMLHTTPRequest.readyState. 
* @member {number} SENT
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The HTTP status code of the request. 
* @description Note: This property is readonly. 
* @member {number} status
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The HTTP status text of the request. 
* @description Note: This property is readonly. 
* @member {string} statusText
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @summary The constant 0 for XMLHTTPRequest.readyState. 
* @description In this state the method open() has not been called.
* @member {number} UNINITIALIZED
* @instance
**/
/**
* @memberof XMLHTTPRequest
* @function abort
* @instance
* @summary Abort an asynchronous request if it already has been sent. 
* @returns {boolean} true if successful, false in case of any error. 
* @since DOCUMENTS 4.0
* @example
* var xmlHttp = new XMLHTTPRequest();
* var async = true;
* var url = "http://localhost:11001/";
* xmlHttp.open("POST", url, async);
* xmlHttp.send(content);
* if (timeout)
*    xmlHttp.abort();
**/
/**
* @memberof XMLHTTPRequest
* @function addRequestHeader
* @instance
* @summary Add a HTTP header to the request to be sent. 
* @description Note: The request must be initialized via open() before. 
* @param {string} name String specifying the header name. 
* @param {string} value String specifying the header value. 
* @returns {boolean} true if the header was added successfully, false in case of any error. 
* @since DOCUMENTS 4.0
* @example
* var xmlHttp = new XMLHTTPRequest();
* var async = true;
* var url = "http://localhost:11001/";
* xmlHttp.open("POST", url, async);
* xmlHttp.addRequestHeader("Content-Type", "text/xml");
* xmlHttp.send(c);
**/
/**
* @memberof XMLHTTPRequest
* @function getAllResponseHeaders
* @instance
* @summary Get all response headers as a string. 
* @returns {string} 
**/
/**
* @memberof XMLHTTPRequest
* @function getResponseHeader
* @instance
* @summary Get the value of the specified response header. 
* @param {string} name String specifying the response header name. 
* @returns {string} String with the value of the response header, an empty string in case of any error. 
* @since DOCUMENTS 4.0
* @example
* var xmlHttp = new XMLHTTPRequest();
* var async = false;
* var url = "http://localhost:11001/";
* xmlHttp.open("POST", url, async);
* if (xmlHttp.send(content))
*    util.out(xmlHttp.getResponseHeader("Content-Type"));
**/
/**
* @memberof XMLHTTPRequest
* @function open
* @instance
* @summary Initialize a HTTP request. 
* @param {string} method String specifying the used HTTP method. The following methods are available: GET: Sending a GET request, for example, for querying a HTML file. PUT: Sending data to the HTTP server. The data must be passed in the send() call. The URI represents the name under which the data should be stored. Under this name, the data are then normally retrievable. POST: Sending data to the HTTP server. The data must be passed in the send() call. The URI represents the name of the consumer of the data. 
* @param {string} url String containing the URL for this request. 
* @param {boolean} async Optional flag indicating whether to handle the request asynchronously. In this case the operation send() returns immediately, in other word, it will not be waiting until a response is received. Asynchronous sending is only possible, when XMLHTTPRequest.canAsync returns true. If asynchronous sending is not possible, this flag will be ignored. For an asynchronous request you can use XMLHTTPRequest.readyState to get the current state of the request. 
* @param {string} user Optional user name must be specified only if the HTTP server requires authentication. 
* @param {string} passwd Optional password must also be specified only if the HTTP server requires authentication. 
* @returns {boolean} true if the request was successfully initialized, false in case of any error. 
* @since DOCUMENTS 4.0
* @see [XMLHTTPRequest.send,XMLHTTPRequest.canAsync]{@link XMLHTTPRequest#send,XMLHTTPRequest#canAsync} 
* @example
* var xmlHttp = new XMLHTTPRequest();
* var async = false;
* var url = "http://localhost:11001/";
* xmlHttp.open("GET", url + "?wsdl", async);
**/
/**
* @memberof XMLHTTPRequest
* @function send
* @instance
* @summary Send the request to the HTTP server. 
* @description The request must be prepared via open() before.
* @param {string} content 
* @returns {boolean} 
**/
/**
* @memberof XMLHTTPRequest
* @constructor XMLHTTPRequest
* @summary Create a new XMLHTTPRequest object. 
* @description Note: On some plattforms, no proxy can be specified here. Instead, the global settings of the system will be used. 
* @param {string} proxy Optional string value specifying the hostname of the proxy server being resolvable by the nameserver. If this parameter is not specified, the proxy server specified in the registry will be possibly used. E.g. the proxy server specified in Internet Explorer is used in the registry. 
* @param {number} proxyPort Optional number of the port on which the proxy accepts requests. 
* @param {string} proxyUser Optional string value specifying the desired login name for the proxy 
* @param {string} proxyPasswd Optional string value specifying the password for logging in to the proxy 
* @returns {XMLHTTPRequest} 
* @since DOCUMENTS 4.0 
* @see [XMLHTTPRequest.canProxy]{@link XMLHTTPRequest#canProxy} 
**/
