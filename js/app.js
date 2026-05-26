// ===== ARC MODDING SAVE SYSTEM =====

const SAVE_KEY = "arcmoddingSave";
const CHOICE_KEY = "arcmoddingChoice";

function saveGame() {

  if(localStorage.getItem(CHOICE_KEY)!=="yes")
    return;

  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({

      balance: balance,

      inventory: inventory,

      expires:
      Date.now() + (7*24*60*60*1000)

    })
  );

}

function loadGame(){

  if(localStorage.getItem(CHOICE_KEY)!=="yes")
    return;

  const save =
  JSON.parse(
    localStorage.getItem(
      SAVE_KEY
    )
  );

  if(!save)
    return;

  if(Date.now()>save.expires){

    localStorage.removeItem(
      SAVE_KEY
    );

    return;

  }

  balance =
  save.balance || 250;

  inventory =
  save.inventory || [];

}
