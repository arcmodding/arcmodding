// =============================================
// ARC MODDING — App Logic
// =============================================

// ---- STATE ----
let balance       = 250.00;
let inventory     = [];
let currentCase   = null;
let currentWin    = null;
let openQty       = 1;
let spinning      = false;
let feedCount     = 0;
let feedDrops     = 0;
let tickerTimeout = null;


// ===== ARC MODDING SAVE SYSTEM =====

const SAVE_KEY="arcmoddingSave";
const CHOICE_KEY="arcmoddingChoice";

function saveGame(){

if(localStorage.getItem(CHOICE_KEY)!=="yes")
return;

localStorage.setItem(

SAVE_KEY,

JSON.stringify({

balance:balance,

inventory:inventory,

expires:
Date.now()+
(7*24*60*60*1000)

})

);

}

function loadGame(){

if(localStorage.getItem(CHOICE_KEY)!=="yes")
return;

const save=
JSON.parse(
localStorage.getItem(
SAVE_KEY
));

if(!save)return;

if(Date.now()>save.expires){

localStorage.removeItem(
SAVE_KEY
);

return;

}

balance=
save.balance||250;

inventory=
save.inventory||[];

}


// KEEP your original DOMContentLoaded
document.addEventListener('DOMContentLoaded',()=>{

if(localStorage.getItem(CHOICE_KEY)==null){

setTimeout(()=>{

const accepted=confirm(

"Arc Modding will keep your inventory and money for 1 week.\n\nOK = Accept\nCancel = Continue without saving"

);

localStorage.setItem(
CHOICE_KEY,
accepted?"yes":"no"
);

if(accepted){

saveGame();

}

},500);

}

loadGame();

generateHeroStats();
renderCases();
seedLiveFeed();
startLiveFeed();
startTicker();
updateBalance();
bindNavTabs();
updateInvBadge();

});
