
window.onload = function(){
    console.log('popout fully loaded');
    //keep track of which tab you are activated on 
    //get tab info
          
      
    chrome.storage.sync.get(["targetTabID"], function(items){
      console.log("retreiving targetTabID value:");
      var targetTabID = items
      console.log(targetTabID);

      chrome.tabs.query({currentWindow: false, active : false},function(tabArray){
        console.log("tabArray = ");
        console.log(tabArray);
        //get tab with targetTabID
        //store string title 
      });

    });
  
            
}
    










