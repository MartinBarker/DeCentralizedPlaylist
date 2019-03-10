
window.onload = function(){
    //console.log('window fully loaded');
    var enableCheckbox = document.getElementById("checkbox");
    
    console.log('checkbox element exists ');
    if(enableCheckbox){
        enableCheckbox.addEventListener("change", function(){
            console.log('checkbox element is checked ');

            //keep track of which tab you are activated on 

            //get tab info
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                console.log('inside chrome.tabs.query, tabs = ');
                console.log(tabs);
                var tab = tabs[0];
                console.log("tab[0] = ");
                console.log(tab);
                var title = tab.title;
            
                console.log("title: " + title);
                
                document.getElementById("results").innerText = title;
                    
            });
            
            var popupWindow = window.open(
                chrome.extension.getURL("normal_popup.html"),
                "exampleName",
                "width=400,height=400"
            );
            
            
        });
    }
}




  /*
  manifest:
  "permissions": ["tabs"],
  */


