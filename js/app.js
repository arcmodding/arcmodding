let balance = 250.00;
let inventory = [];

// ===== ARC MODDING SAVE SYSTEM =====

const SAVE_KEY = "arcmoddingSave";
const CHOICE_KEY = "arcmoddingChoice";

// Save game
function saveGame() {

 if(localStorage.getItem(CHOICE_KEY)!=="yes")
 return;

 const data = {

   balance: balance,

   inventory: inventory,

   expires:
   Date.now() +
   (7*24*60*60*1000)

 };

 localStorage.setItem(
   SAVE_KEY,
   JSON.stringify(data)
 );

}


// Load game
function loadGame(){

 if(
 localStorage.getItem(
 CHOICE_KEY
 )!=="yes"
 ) return;


 const saveData=
 JSON.parse(
 localStorage.getItem(
 SAVE_KEY
 ));


 if(!saveData)
 return;


 if(
 Date.now() >
 saveData.expires
 ){

 localStorage.removeItem(
 SAVE_KEY
 );

 return;

 }

 balance=
 saveData.balance || 250;

 inventory=
 saveData.inventory || [];

}


// Run when page opens
document.addEventListener(
"DOMContentLoaded",
()=>{

if(
localStorage.getItem(
CHOICE_KEY
)==null
){

setTimeout(()=>{

const accepted=
confirm(

"Arc Modding will keep your inventory and money for 1 week.\n\nOK = Accept\nCancel = Continue without saving"

);

localStorage.setItem(

CHOICE_KEY,

accepted
?
"yes"
:
"no"

);

if(accepted){

saveGame();

}

},500);

}

loadGame();

updateBalance();

updateInvBadge();

});
