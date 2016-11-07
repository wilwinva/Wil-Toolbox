/**
 * Contains project wide Javascript functions
 */
'use strict';

/**
 * custom date sorter for bootstrap-tables
 */
function dateSorter(a, b) {
    a = Date.parse(a);
    b = Date.parse(b);
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}

/**
 * Creates a Bootstrap alert modal
 *  
 * Based on a Bootstrap library, creates an alert box similar to the standard
 * Javascript one.
 *  
 * @param title = text for the header of the modal - REQUIRED
 * @param message = text of the message - REQUIRED
 * @param dialogType = success(green header), warning(orange header), error(red header), default or '' or nothing(white header) - OPTIONAL
 * @param autoClose = seconds until dialog auto closes (5 = 5 seconds, 0 OR nothing will turn auto close off) - OPTIONAL
 */
function bootstrapModal(title, message, dialogType, autoClose){
  var defaultAutoClose = 0;//no auto close
  var dt = typeof(dialogType);
  var ac = typeof(autoClose);
  switch (dt){
    case 'number':
      switch(ac){
        case 'number':
          break;
        case 'undefined':
        case 'string':
          autoClose = dialogType;
          ac = typeof(autoClose);
          break;
        default:
          break;
      }
      dialogType = 'type-default';
      break;
    case 'undefined':
    case 'string':
    default:
      switch (dialogType) {
        case 'success' :
          dialogType = 'type-success';
          break;
        case 'warning' :
          dialogType = 'type-warning';
          break;
        case 'error' :
          dialogType = 'type-danger';
          break;
        default:
          dialogType = 'type-default';
          break;
      }
      break;
  }
  if(ac == 'string' || ac == 'undefined'){
    autoClose = defaultAutoClose;
  }
  autoClose = autoClose*1000;

  var bootstrappedModal = new BootstrapDialog({
    type: dialogType,
    title: title,
    message: message,
    onshown : function(){
      setTimeout(function(){
        if(autoClose > 0) {
          bootstrappedModal.close();
        }
      },autoClose);
    }
  });
  bootstrappedModal.realize();
  $(function() {
    bootstrappedModal.open();
  });
}

/**
 * Sends client-side info back to server to be logged
 * 
 * @param message				
 * @param messageType string	One of: error; info; etc...
 * @param snlId					snl id of active user
 * @param source 				File/function error originated from
 */
function logger(jqXHR, errorThrown, messageType, snlId, source){
	var message = "status=" + jqXHR.status + "; error= " + errorThrown + "; text= " + jqXHR.responseText;
	$.post("./controllers/errorController.php",{message:message, messageType:messageType, snlId:snlId, source:source});
}


/**
 * Creates a popup window.  Carried over from old Techweb
 * 
 * @param url 		url of popup
 * @param winName	title of popup
 * @param opts		popup settings such as size and location
 */
function techweb_popup(url,winName,opts) {
    if ((typeof url == "undefined") || (url.length == 0)) { 
    	return; 
    }
    if (typeof winName == "undefined") { 
    	winName = "popupWin"; 
    }
    if (typeof opts == "undefined") { 
    	opts = "height=650,width=1010,toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes"; 
    }
    if (typeof lookupWin != "undefined") {
       if (!lookupWin.closed) {
          lookupWin.close();
          setTimeout ('lookup()',750);
       }
    }

    lookupWin = window.open(url, winName, opts);

    if (lookupWin != null) {
       if (lookupWin.opener == null) {
          lookupWin.opener = self;
       }
    }
 }


/*
 * Dynamically loads a css or javascript file into the DOM
 */
function loadFile(filename){
  var extension = filename.substr(filename.lastIndexOf('.')+1);

  if (extension=="js"){ //if filename is a external JavaScript file
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (extension=="css"){ //if filename is an external CSS file
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}