
//once popout window is fully loaded
window.onload = function () {

  //listen for if button is clicked: then 
  document.getElementById("stopCollectingData").addEventListener("click", function () {
    //if you click stopCollection button
    console.log("stop collecting pressed");
    chrome.storage.sync.set({ "stopCollecting": "True" }, function () { });
  });
  /*
  //get value of Stop Collecting 
  var stopCollecting = 'initNull';
  chrome.storage.sync.get(["stopCollecting"], function(items){
    stopCollecting = items['stopCollecting'];
    console.log("in func, stopCollecting = "+ stopCollecting);
  });
  console.log("outside func, stopCollecting = "+ stopCollecting);
  */

  updateCurrentTabInfo();
  //get current tab title, store in array, send to html view
  

  /*
  //listen for if button is clicked: then update example display text
  document.getElementById('manualyUpdateTabDisplay').addEventListener("click", function(){
    console.log("manually update butotn pressed");
    updateCurrentTabInfo();
  });
*/

  //if any tab is changed (title or url)
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
    //console.log("changeInfo = ", changeInfo)
    //console.log("changeInfo.toString = ", changeInfo.toString())
    console.log("changeInfo['title'] = ", changeInfo['title'])


    //retreive stored targetTabID
    chrome.storage.sync.get(["targetTabID"], function (items) {
      var targetTabID = items['targetTabID']
      
      //if change which occured to tab (tabID) is target tab
      if(tabId == targetTabID){ 
        
        updateCurrentTabInfo();

        chrome.storage.sync.get(["historyArr"], function(items){
          //get history array
          arr = items['historyArr'];
          
          //get last element 
          //check if element we are going to add has same title as previous element 

          //get targetTabID again
          chrome.storage.sync.get(["targetTabID"], function (items) {
            var targetTabID = items['targetTabID']
            //get array of all tabs on all windows
            chrome.tabs.query({}, function (tabArray) {
              var targetTabObject = null;
              //search through all tabs
              for (var i = 0; i < tabArray.length; i++) {
                //find tab with same ID as targetTabID
                if (tabArray[i].id.toString() == targetTabID) {
                  targetTabObject = tabArray[i];
                  if(changeInfo['title'] != null && changeInfo['title'] != "YouTube"){
                    //console.log("title was changed !!");
                    var targetTabTitle = targetTabObject.title;
                    var timeDate = "z"; //"2019-3-9 13:17:17";
                    
                    var d = new Date();
                    finalDate = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
                    console.log(finalDate);
                    timeDate = finalDate;

                    var newSong = [targetTabTitle, timeDate];
                    arr.push(newSong);
                    chrome.storage.sync.set({ "historyArr": arr }, function(){ }); 
                    updateHistoryDisplay(arr);
                  }else{
                    console.log("title was not changed");
                  }

                }
              }
            });

          });

        });


      }else{
        console.log("tab change was NOT made to target tab")
      }
    });


  });


    //listener for if sendPostButton is clicked
    document.getElementById("sendPostButton").addEventListener("click", function(){
      console.log("sendPostbutton clicked");

      //inject jquery in tab to confirm it is loaded
      injectJqueryInTab();
      //console.log("jquery should be loaded");

      //get listening history from storage
      chrome.storage.sync.get(["historyArr"], function(items){
        arr = items['historyArr'];

        var jsonData = formatArrAsJson(arr);
        console.log("json formatted ready to be sent = ")
        console.log(jsonData)

        makeCorsRequest(jsonData);
      });

      //demo jsonData
      /*
      var jsonData2 = {"Username":"martinbarker1",
      "Song1":{"Title":"Norway","Artist":"Beach House","Album":"Teen Dream","DateTime":"2019-3-9 13:17:17","Source":"blackplayer","Device":"androidPhone1"},
      "Song2":{"Title":"Golden Symmetry","Artist":"Von Haze","Album":"Kar Dee Akk Ake","DateTime":"2019-3-10 13:17:17","Source":"spotify","Device":"browser1"}
      };
*/

      //make http post request with jsonData
      //makeCorsRequest(jsonData2);

      ///clear historyArr, set historyArr to new cleared version
      //clear history display

      console.log("end of sendPostbutton being clicked");
  });


}

function formatArrAsJson(arr){
  //console.log("historyArr = ")
  //console.log(arr)
  var jd = {"Username":arr[0]};
  for (var z = 0; z < arr.length-1; z++) {
    //var jdSongInside = {"Title":arr[z+1][0],"Artist":null,"Album":null,"DateTime":arr[z+1][1],"Source":"Chrome","Device":"desktop"};
    var jdSongInside = {"Title":arr[z+1][0],"Artist":null,"Album":null,"DateTime":arr[z+1][1],"Source":"Chrome","Device":"desktop"};

    var num = (z+1)
    var songNum = "Song"+num.toString();

    console.log("songNum = ")
    console.log(songNum)
    
    jd = {...jd, [songNum]:jdSongInside};
    
  }

  for(var j = 1; j < arr.length; j++){
    //console.log("dynamicSetKey, jd[SongNum] = ")
    //console.log(jd["SongNum"])
  }

  return jd;
}

function updateHistoryDisplay(arr){
  console.log("printing arr neatly")
  console.log(arr)
  var neatPrint = "<br>";
  for (var x = 1; x < arr.length; x++) {
    neatPrint = neatPrint + arr[x][1] + " : " + arr[x][0] + " <br> <br> "
  }

  //document.getElementById("results").innerText = arr;
  document.getElementById("results").innerHTML = neatPrint;


}

function updateCurrentTabInfo(){
    //get stored value of target tab ID
    chrome.storage.sync.get(["targetTabID"], function (items) {
      console.log("retreiving targetTabID value:");
      var targetTabID = items['targetTabID']
      console.log("targetTabID = " + targetTabID);
      getTargetTabTitle(targetTabID)
    });
}

function getTargetTabTitle(targetTabID) {
  //get array of all tabs
  chrome.tabs.query({}, function (tabArray) {
    var targetTabObject = null;
    //iterate through each tab in tabArray
    for (var i = 0; i < tabArray.length; i++) {
      //find tab with same ID as targetTabID
      if (tabArray[i].id.toString() == targetTabID) {
        //get object for targetTab
        targetTabObject = tabArray[i];
        //console.log("target tab object found = ");
        //console.log(targetTabObject);
        var targetTabTitle = targetTabObject.title;
        console.log("targetTabTitle = " + targetTabTitle);
        document.getElementById("currentTargetTabTitle").innerText = targetTabTitle;
      }
    }
  });

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











