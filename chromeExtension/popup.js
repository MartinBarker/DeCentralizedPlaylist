//once popup window is fully loaded
window.onload = function(){
    //initialize and store stopCollecting variable
    chrome.storage.sync.set({ "stopCollecting": "False" }, function(){ }); 
    
    var startCollection = document.getElementById("beginCollection");
    if(startCollection){ //startCollection element exists

        //listen for if startCollection is clicked
        startCollection.addEventListener("click", function(){

            //initialize and store historyArr variable
            var historyArr = [];
            historyArr[0] = 'martinbarker1'; //username
            //var song1 = ["song1demo DateTime", "song1demo Title"];
            //historyArr[1] = song1;
            chrome.storage.sync.set({ "historyArr": historyArr }, function(){ }); 


            //confirm that historyArr was stored
            /*
            chrome.storage.sync.get(["historyArr"], function(items){
                console.log("historyArr value:");
                console.log(items);
            });
            */

            //sets targetTabID in sync storage
            storeTargetTabInfo();        
        
            //confirm that targetTabID is stored 
            /*
            chrome.storage.sync.get(["targetTabID"], function(items){
                console.log("after calling storeTargetTabInfo, targetTabID value:");
                console.log(items);
            });
            */

            //open popout
            var popupWindow = window.open(
                chrome.extension.getURL("popout.html"),
                "exampleName",
                "width=400,height=400"
            );
            
        });
    }

    /*
    //listener for if sendPostButton is clicked
    document.getElementById("sendPostButton").addEventListener("click", function(){
        console.log("sendPostbutton clicked");

        //inject jquery in tab to confirm it is loaded
        injectJqueryInTab();
        //console.log("jquery should be loaded");

        //demo jsonData
        var jsonData2 = {"Username":"martinbarker1",
        "Song1":{"Title":"Norway","Artist":"Beach House","Album":"Teen Dream","DateTime":"2019-3-9 13:17:17","Source":"blackplayer","Device":"androidPhone1"},
        "Song2":{"Title":"Golden Symmetry","Artist":"Von Haze","Album":"Kar Dee Akk Ake","DateTime":"2019-3-10 13:17:17","Source":"spotify","Device":"browser1"}
        };

        //make http post request with jsonData
        //makeCorsRequest(jsonData2);

        console.log("end of sendPostbutton being clicked");
    });
    */
}

function storeTargetTabInfo(){

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //console.log('popup: tabs = ');
        //console.log(tabs);
        
        var tab = tabs[0];
        //console.log("popup tab[0] = ");
        //console.log(tab);
        var title = tab.title;
        var targetTabID = tab.id;
        
        console.log("storeTargetTabInfo() targetTabID = " + targetTabID );
        console.log("targetTabTitle = " + title);
        //document.getElementById("results").innerText = title;
        chrome.storage.sync.set({ "targetTabID": targetTabID }, function(){ }); 
        
        chrome.storage.sync.get(["targetTabID"], function(items){
            console.log("retreiving stored targetTabID value:");
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













