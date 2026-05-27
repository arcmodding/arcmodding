// =============================================
// ARC MODDING OWNER SYSTEM
// =============================================

const OWNER_USER="arc";
const OWNER_PASS="arcandamharetuff";

function createLoginBox(){

if(document.getElementById("arc-login"))
return;

const box=document.createElement("div");

box.id="arc-login";

box.innerHTML=`

<div style="
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
background:#121212;
padding:25px;
border-radius:18px;
border:2px solid #3b82f6;
z-index:999999;
width:300px;
color:white;
text-align:center;
box-shadow:0 0 40px rgba(59,130,246,.4);
">

<h2>Arc Modding</h2>

<div style="opacity:.7;margin-bottom:15px">
Owner Login
</div>

<input
id="owner-user"
placeholder="Username"
style="
width:100%;
padding:10px;
margin-bottom:10px;
border-radius:8px;
border:none;
"
>

<input
id="owner-pass"
type="password"
placeholder="Password"
style="
width:100%;
padding:10px;
margin-bottom:15px;
border-radius:8px;
border:none;
"
>

<button
onclick="loginOwner()"
style="
width:100%;
padding:12px;
background:#2563eb;
border:none;
border-radius:8px;
color:white;
cursor:pointer;
">

Login

</button>

<br><br>

<button
onclick="closeLogin()"
style="
width:100%;
padding:12px;
background:#222;
border:none;
border-radius:8px;
color:white;
cursor:pointer;
">

Close

</button>

</div>
`;

document.body.appendChild(box);

}

function closeLogin(){

document
.getElementById(
"arc-login"
)
?.remove();

}

function loginOwner(){

const u=
document.getElementById(
"owner-user"
).value;

const p=
document.getElementById(
"owner-pass"
).value;

if(
u===OWNER_USER &&
p===OWNER_PASS
){

localStorage.setItem(
"arcmoddingOwner",
"yes"
);

closeLogin();

showOwnerPanel();

toast(
"Owner Login Success",
"success"
);

}else{

toast(
"Wrong Login",
"error"
);

}

}

function showOwnerPanel(){

if(
document.getElementById(
"ownerpanel"
)
)return;

const panel=
document.createElement("div");

panel.id=
"ownerpanel";

panel.innerHTML=`

<div style="
position:fixed;
right:20px;
top:90px;
background:#111;
padding:15px;
border-radius:15px;
border:2px solid #3b82f6;
z-index:999999;
color:white;
width:260px;
max-height:80vh;
overflow:auto;
">

<h2>ARC OWNER</h2>

<button onclick="ownerMoney()">
Give $1,000,000
</button>

<br><br>

<button onclick="ownerMoney10()">
Give $10,000,000
</button>

<br><br>

<button onclick="unlockAll()">
Unlock All Items
</button>

<br><br>

<button onclick="clearInventory()">
Clear Inventory
</button>

<br><br>

<button onclick="maxBalance()">
MAX MONEY
</button>

<br><br>

<button onclick="addLegendary()">
Add Legendary
</button>

<br><br>

<button onclick="open100Cases()">
Open 100 Cases
</button>

<br><br>

<button onclick="forceSave()">
Force Save
</button>

<br><br>

<button onclick="closeOwnerPanel()">
Close Panel
</button>

</div>

`;

document.body.appendChild(panel);

}

function ownerMoney(){

balance+=1000000;

saveGame();

updateBalance();

toast(
"$1,000,000 added",
"gold"
);

}

function ownerMoney10(){

balance+=10000000;

saveGame();

updateBalance();

toast(
"$10,000,000 added",
"gold"
);

}

function maxBalance(){

balance=999999999;

saveGame();

updateBalance();

toast(
"MAX MONEY",
"gold"
);

}

function clearInventory(){

inventory=[];

saveGame();

updateInvBadge();

renderInventory();

toast(
"Inventory cleared",
"error"
);

}

function unlockAll(){

ALL_ITEMS.forEach(item=>{

inventory.push({

...item,

uid:
Date.now()+
Math.random()

});

});

saveGame();

updateInvBadge();

renderInventory();

toast(
"Unlocked all",
"success"
);

}

function addLegendary(){

ALL_ITEMS
.filter(
x=>x.rarity==="legendary"
)
.forEach(item=>{

inventory.push({

...item,

uid:
Date.now()+
Math.random()

});

});

saveGame();

updateInvBadge();

renderInventory();

}

function open100Cases(){

for(let i=0;i<100;i++){

const item=
ALL_ITEMS[
Math.floor(
Math.random()*
ALL_ITEMS.length
)
];

inventory.push({

...item,

uid:
Date.now()+
Math.random()

});

}

saveGame();

updateInvBadge();

renderInventory();

toast(
"100 cases opened",
"success"
);

}

function forceSave(){

saveGame();

toast(
"Saved",
"success"
);

}

function closeOwnerPanel(){

document
.getElementById(
"ownerpanel"
)
?.remove();

}

document.addEventListener(
"DOMContentLoaded",
()=>{

const btn=
document.createElement(
"button"
);

btn.innerText=
"👑 Owner";

btn.style=`
position:fixed;
top:15px;
right:15px;
padding:10px 16px;
background:#2563eb;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
z-index:999999;
font-weight:bold;
`;

btn.onclick=()=>{

if(
localStorage.getItem(
"arcmoddingOwner"
)==="yes"
){

showOwnerPanel();

}else{

createLoginBox();

}

};

document.body.appendChild(btn);

});
