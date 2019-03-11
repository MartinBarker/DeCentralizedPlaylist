//on popup load
window.onload = function(){
    console.log('window1 fully loaded');
    var startCollection = document.getElementById("beginCollection");
    
    console.log('startCollection element exists ');
    if(startCollection){

        /*
        //check the isCollectionEnabled value and update checkbox accordingly
        chrome.storage.sync.get(["isCollectionEnabled"], function(items){
            console.log("retreiving isCollectionEnabled value:");
            console.log(items);
            if(items=="True"){
                //check the box
                enableCheckbox.checked = true;
            }else if(items=="False"){
                //uncheck box
                enableCheckbox.checked = false;
            }
        });
       
*/
        //listen for if startCollection is clicked
        startCollection.addEventListener("click", function(){
            console.log('startCollection clicked ');

            //sets targetTabID in sync storage
            getTargetTabInfo();        
            
            //initialize songs array
            var listeningDataArr = [[ [], [], [], [] ]];
 
            //create array
            var historyArr = new Array(50);
            for(var i=0;i<=51;i++){
	            historyArr[i]=new Array(4);
            }

            listeningDataArr[1][0] = "song1 title";
            listeningDataArr[1][1] = "song1 listening DateTime ";
            listeningDataArr[1][2] = "song1 source";
            listeningDataArr[1][3] = "song 1 device";

            chrome.storage.sync.set({ "listeningDataArr": listeningDataArr }, function(){ }); 

            //open popout
            var popupWindow = window.open(
                chrome.extension.getURL("popout.html"),
                "exampleName",
                "width=400,height=400"
            );
            
        });
    }

    document.getElementById("sendPostButton").addEventListener("click", function(){
        console.log("sendPostbutton clicked");
        injectJqueryInTab();
        console.log("jquery should be loaded");

        var jsonData2 = {"Username":"martinbarker1",
        "Song1":{"Title":"Norway","Artist":"Beach House","Album":"Teen Dream","DateTime":"2019-3-9 13:17:17","Source":"blackplayer","Device":"androidPhone1"},
        "Song2":{"Title":"Golden Symmetry","Artist":"Von Haze","Album":"Kar Dee Akk Ake","DateTime":"2019-3-10 13:17:17","Source":"spotify","Device":"browser1"}
      };
        makeCorsRequest(jsonData2);

        console.log("end of sendPostbutton being clicked");
    });
}

function getTargetTabInfo(){

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log('popup: tabs = ');
        console.log(tabs);
        
        var tab = tabs[0];
        //console.log("popup tab[0] = ");
        //console.log(tab);
        var title = tab.title;
        var targetTabID = tab.id;
        
        console.log("targetTabID = " + targetTabID );
        console.log("targetTabTitle = " + title);
        //document.getElementById("results").innerText = title;
        chrome.storage.sync.set({ "targetTabID": targetTabID }, function(){ }); 
        
        chrome.storage.sync.get(["targetTabID"], function(items){
            console.log("retreiving targetTabID value:");
            console.log(items);
        });
        
    });
}


function getCurrentTabID(){
    var tabIndex = null;
    chrome.tabs.getSelected(null, function(tab) {
        //console.log("getCurrentTabID() tab: " + tab);
        tabIndex = tab.index;
        console.log("getCurrentTabID() inside rabIndex =  " + tabIndex);
        return tabIndex;
    });
    console.log("getCurrentTabID() outside rabIndex =  " + tabIndex);

    console.log("getCurrentTabID() outside rabIndex =  " + tabIndex);
    console.log("getCurrentTabID() outside rabIndex =  " + tabIndex);
    
}


function injectJqueryInTab(){
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        if(changeInfo && changeInfo.status == "complete"){
            chrome.tabs.executeScript(tabId, {file: "jquery.js"}, function(){
                chrome.tabs.executeScript(tabId, {file: "popup.js"});
            });
        }
    });
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }

// Make the actual CORS request.
function makeCorsRequest(jsonData) {


    var url = 'http://decentralizedplaylist.com/jsonurlposttest.php';
    var xhr = createCORSRequest('POST', url);

    if (!xhr) {
      alert('CORS not supported');
      return;
    }
  
    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      alert('Response from CORS request to ' + url + ': ' + text);
    };
  
    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };

    xhr.send(JSON.stringify(jsonData));
  }













