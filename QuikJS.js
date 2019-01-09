
// FORM_Start

function setLookupValue(formcontext, fieldName, id, name, entityType) {
    if (fieldName != null && fieldName != null && id != null && name != null && entityType != null) {
        formcontext.getAttribute(fieldName).setValue([{ id: id, name: name, entityType: entityType }]);
    }
    else {
        console.log("LazyJS_Error in Method: setLookupValue | " + "Required arguments missing. Check the documentation");
    }
}

function getLookUpValue(formcontext, fieldName, mode) {
    if (formcontext != null && fieldName != null) {
        switch (mode) {
            case 1:
                return formcontext.data.entity.attributes.get(fieldName).getValue()[0].id;

            case 2:
                return formcontext.data.entity.attributes.get(fieldName).getValue()[0].name;

            case 3:
                return formcontext.data.entity.attributes.get(fieldName).getValue()[0].logicalname;

            default:
                return formcontext.data.entity.attributes.get(fieldName).getValue()[0];
        }
    }
    else {
        console.log(argumentMissing());
    }
}


// FORM_End


// EasyJSOperation
function argumentMissing() {
    return "LazyJS_Error in Method: " + arguments.callee.name + " | " + "Required arguments missing. Check the documentation";
}
function catchBlockError(e) {
    return "LazyJS_Error in Method: " + arguments.callee.name + " | " + (e.message || e.description);
}

function setReqHeader(req) {
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    return req;
}
//EasyJSOperation

// CRUD_Start
function getRecordById(scehmaName, recordId, query) {
    if (scehmaName != null || recordId != null || query != null) {
        try {
            Xrm.WebApi.retrieveRecord(scehmaName, recordId, query).then(
                function success(result) {
                    return result;
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
        catch (e) {
            console.log(catchBlockError(e));
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function getRecords(scehmaName, query) {
    if (scehmaName != null || query != null) {
        try {
            Xrm.WebApi.retrieveMultipleRecords(scehmaName, query).then(
                function success(result) {
                    return result.entities;
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
        catch (e) {
            catchBlockError();
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function setRecord(scehmaName, recordId, dataOb) {
    if (scehmaName != null && recordId != null && dataOb != null) {
        try {
            Xrm.WebApi.updateRecord(scehmaName, recordId, dataOb).then(
                function success(result) {
                    return true;
                },
                function (error) {
                    console.log(catchBlockError(error));
                    return false;
                }
            );
        }
        catch (e) {
            catchBlockError(e);
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function createRecord(scehmaName, data) {
    if (scehmaName != null && data != null) {
        try {
            Xrm.WebApi.createRecord(scehmaName, data).then(
                function success(result) {
                    return result.id;
                },
                function (error) {
                    console.log(catchBlockError(error));
                }
            );
        }
        catch (e) {
            console.log(catchBlockError(e));
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function deleteRecord(scehmaName, recordId) {
    if (scehmaName != null && recordId != null) {
        Xrm.WebApi.deleteRecord(scehmaName, recordId).then(
            function success(result) {
                return true;
            },
            function (error) {
                console.log(catchBlockError(error));
                return false;
            }
        );
    }
    else {
        console.log(argumentMissing());
    }
}

function getRecordById_Sync(scehmaName, recordId, attributesQ) {
    if (scehmaName != null && recordId != null && attributesQ != null) {
        try {
            var data = null;
            var req = new XMLHttpRequest();
            req = setReqHeader(req);
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + scehmaName + "(" + recordId + ")?$" + attributes, false);
            req.onreadystatechange = function () {
                if (this.readyState == 4) {
                    req.onreadystatechange = null;
                    if (this.status == 200) {
                        data = JSON.parse(this.response);
                    }
                    else {
                        var error = JSON.parse(this.response).error;
                        alert(error.message);
                    }
                }
            };
            req.send();
            return data;
        }
        catch (e) {
            catchBlockError(e);
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function setRecord_Sync(entity_object, scehmaName, recordId) {
    if (entity_object != null && recordId != null && scehmaName != null) {
        try {
            var req = new XMLHttpRequest();
            req = setReqHeader(req);
            req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + scehmaName + "(" + recordId + ")", false);
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204) {
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send(JSON.stringify(entity_object));
        }
        catch (e) {
            catchBlockError(e);
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function createRecord_Sync(scehmaName, entity_object) {
    if (scehmaName != null && entity_object != null) {
        try {
            var req = new XMLHttpRequest();
            req = setReqHeader(req);
            req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + scehmaName, false);
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204) {
                        var uri = this.getResponseHeader("OData-EntityId");
                        var regExp = /\(([^)]+)\)/;
                        var matches = regExp.exec(uri);
                        var newEntityId = matches[1];
                        return newEntityId;
                    } else {
                        return false;
                    }
                }
            };
            req.send(JSON.stringify(entity_object));
        }
        catch (e) {
            console.log(catchBlockError(e));
        }
    }
    else {
        console.log(argumentMissing());
    }
}

function deleteRecord_Sync(scehmaName, recordId) {
    if (scehmaName != null && recordId != null) {
        try {
            var req = new XMLHttpRequest();
            req = setReqHeader(req);
            req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + scehmaName + "(" + recordId + ")", false);
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204 || this.status === 1223) {
                        return true;
                    } else {
                        return false
                    }
                }
            };
            req.send();
        }
        catch (e) {
            console.log(catchBlockError(e));
        }
    }
    else {
        console.log(argumentMissing());
    }
}
// CRUD_End


