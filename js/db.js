//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const bugData = [
   { id: "01", name: "gopal",desc: "gopal@tutorialspoint.com",dt:"20/09/2017 06:30 PM" },
   { id: "02", name: "prasad",desc: "prasad@tutorialspoint.com",dt:"20/09/2017 06:30 PM" }
];

var db;
//var request = window.indexedDB.open("newDatabase", 1);
debugger;

var request = window.indexedDB.open("bugtrackerdb", 1);

request.onerror = function(event) {
   console.log("error: DB not created");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: "+ db.name + " created.");
};

request.onupgradeneeded = function(event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore("bugcreated", {keyPath: "id"});
   
   for (var i in bugData) {
      objectStore.add(bugData[i]);
   }
}

function readData(readKey) {
   var _readkey = readKey;
   var transaction = db.transaction(["bugcreated"]);
   var objectStore = transaction.objectStore("bugcreated");
   //var request = objectStore.get("01");
   var request = objectStore.get(_readkey);
   
   request.onerror = function(event) {

      console.log("Unable to retrieve daa from database!");
   };
   
   request.onsuccess = function(event) {
      // Do something with the request.result!
      if(request.result) {
         console.log("Name: " + request.result.name + ", desc: " + request.result.desc + ", date: " + request.result.dt);
      }
      
      else {
         console.log(_readkey + " couldn't be found in your database!");
      }
   };
}

function readAllData() {
   var objectStore = db.transaction("bugcreated").objectStore("bugcreated");
   
   objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      
      if (cursor) {
         console.log("Name for id " + cursor.key + " is " + cursor.value.name + ", desc: " + cursor.value.desc + ", date: " + cursor.value.dt);
         cursor.continue();
      }
      
      else {
         console.log("No more entries!");
      }
   };
}

function addNewData(data) {
   var _data = data;
   var request = db.transaction(["bugcreated"], "readwrite")
   .objectStore("bugcreated")
   .add(_data);
   //.add({ id: "03", name: "Kenny", desc: "Hey Kenny", dt: "25/09/2017" });
   
   request.onsuccess = function(event) {
      console.log(_data + " has been added to your database.");
   };
   
   request.onerror = function(event) {
      console.log("Unable to add data"+ _data +" is aready exist in your database! ");
   }
}

function removeOldData(key) {
   var _deletekey = key;
   var request = db.transaction(["bugcreated"], "readwrite")
   .objectStore("bugcreated")
   .delete(_deletekey);
   //.delete("03");
   
   request.onsuccess = function(event) {
      console.log(_deletekey + " has been removed from your database.");
   };
}

function findLength(){

   var tbllength = 0;

   var objectStore = db.transaction("bugcreated").objectStore("bugcreated");
   
   var countRequest  = objectStore.count();

   countRequest.onsuccess = function(){
      tbllength = countRequest.result;
   }
   

   return(tbllength);
}

function findLastInsertedId(){

   var lastInsertedId = 0;
   var _lastkey = findLength();

   var transaction = db.transaction(["bugcreated"]);
   var objectStore = transaction.objectStore("bugcreated");

   var request = objectStore.get(_lastkey);
   
   request.onerror = function(event) {

      console.log("Unable to retrieve data from database!");
   };
   
   request.onsuccess = function(event) {
      // Do something with the request.result!
      if(request.result) {
         
         lastInsertedId = request.result.id;
      }
      
      else {
         console.log(_readkey + " couldn't be found in your database!");
      }
   };

   return(lastInsertedId);

}


/*app function*/
function createNewIssue(strdata){
   debugger;
   strdata["id"] = findLastInsertedId();
   addNewData(strdata);
}