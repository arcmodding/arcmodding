const OWNER_USER = "owner";
const OWNER_PASS = "charliekirk8";

let user = JSON.parse(localStorage.getItem("vaultUser")) || {
    loggedIn: false,
    owner: false,
    money: 250,
    inventory: []
};

function saveUser() {
    localStorage.setItem("vaultUser", JSON.stringify(user));
}

function ownerLogin() {
    const username = prompt("Username:");
    const password = prompt("Password:");

    if (username === OWNER_USER && password === OWNER_PASS) {
        user.loggedIn = true;
        user.owner = true;
        saveUser();

        alert("Owner login successful");

        showAdminPanel();
    } else {
        alert("Wrong login");
    }
}

function showAdminPanel() {
    if (!user.owner) return;

    const panel = document.createElement("div");

    panel.style = `
      position:fixed;
      top:20px;
      right:20px;
      background:#111;
      color:white;
      padding:20px;
      border:1px solid orange;
      z-index:99999;
      border-radius:10px;
    `;

    panel.innerHTML = `
      <h3>OWNER PANEL</h3>

      <button onclick="giveMoney()">Give $1,000,000</button>
      <br><br>

      <button onclick="unlockEverything()">Unlock All Items</button>
    `;

    document.body.appendChild(panel);
}

function giveMoney() {
    user.money += 1000000;
    saveUser();

    alert("Money added");
}

function unlockEverything() {
    user.inventory = [
        "Gold Rush",
        "Blue Wave",
        "Mystic Vault",
        "Lucky Clover",
        "Dragon's Hoard",
        "Shadow Case"
    ];

    saveUser();

    alert("All items unlocked");
}

if(user.owner){
   showAdminPanel();
}
