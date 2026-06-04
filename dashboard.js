const allRoutines =
JSON.parse(
localStorage.getItem(
"allRoutines"
)
) || [];

const activeId =
Number(
localStorage.getItem(
"activeRoutine"
)
);

const data =
allRoutines.find(
item =>
item.id === activeId
);

if(!data){

alert(
"No active routine found!"
);

window.location.href =
"analysis.html";

}

// ==========================
// Elements
// ==========================
const streak =
document.getElementById(
"streak"
);


const todayDate =
document.getElementById(
"todayDate"
);

const journeyDay =
document.getElementById(
"journeyDay"
);

const skinType =
document.getElementById(
"skinType"
);

const concerns =
document.getElementById(
"concerns"
);



const morningRoutine =
document.getElementById(
"morningRoutine"
);

const nightRoutine =
document.getElementById(
"nightRoutine"
);

const waterCount =
document.getElementById(
"waterCount"
);

const progressBar =
document.getElementById(
"progressBar"
);

const progressText =
document.getElementById(
"progressText"
);

const routineLibrary =
document.getElementById(
"routineLibrary"
);

// ==========================
// Date
// ==========================

todayDate.innerHTML =
new Date()
.toLocaleDateString(
"en-IN",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);

// ==========================
// Journey Day
// ==========================

const start =
new Date(
data.journeyStart
);

const diff =
Math.floor(

(
new Date() -
start

)

/

(1000*60*60*24)

)

+ 1;

journeyDay.innerHTML =
"🌱 Day " +
diff;

// ==========================
// Daily Streak
// ==========================

if(
!data.streak
){

data.streak = 1;

}

if(
!data.lastVisit
){

data.lastVisit =
new Date()
.toISOString()
.split("T")[0];

}

const todayString =
new Date()
.toISOString()
.split("T")[0];

const last =
new Date(
data.lastVisit
);

const current =
new Date(
todayString
);

const daysDiff =
Math.floor(

(
current - last
)

/

(1000*60*60*24)

);

if(
daysDiff === 1
){

data.streak++;

data.lastVisit =
todayString;

saveRoutine();

}

else if(
daysDiff > 1
){

data.streak = 1;

data.lastVisit =
todayString;

saveRoutine();

}

streak.innerHTML =

"🔥 " +

data.streak +

" Day Streak";

// ==========================
// Profile
// ==========================

skinType.innerHTML =
"🌿 Skin Type : " +
data.skinType;

concerns.innerHTML =
"⚡ Concerns : " +
data.problems.join(
", "
);



// ==========================
// Routine Builder
// ==========================

let morning = [

"Gentle Cleanser",

"Moisturizer",

"SPF 50 Sunscreen"

];

let night = [

"Gentle Cleanser"

];

if(

data.problems.includes(
"Acne"
)

){

night.push(
"Niacinamide Serum"
);

}

if(

data.problems.includes(
"Pigmentation"
)

){

morning.push(
"Vitamin C Serum"
);

}

if(

data.problems.includes(
"Blackheads"
)

){

night.push(
"BHA Exfoliant"
);

}

// ==========================
// Save Routine
// ==========================

if(
!data.checks
){

data.checks =
[];

}

if(
!data.water
){

data.water =
0;

}

let checkIndex =
0;

function saveRoutine(){

const index =

allRoutines.findIndex(

item =>

item.id ===
data.id

);

allRoutines[
index
] =
data;

localStorage.setItem(

"allRoutines",

JSON.stringify(
allRoutines
)

);

}

// ==========================
// Create Tasks
// ==========================

function createTask(

text,

parent

){

const label =
document.createElement(
"label"
);

const check =
document.createElement(
"input"
);

check.type =
"checkbox";

const current =
checkIndex;

check.checked =

data.checks[
current
]

||

false;

check.addEventListener(

"change",

()=>{

data.checks[
current
] =
check.checked;

saveRoutine();

updateProgress();

}

);

label.appendChild(
check
);

label.append(
text
);

parent.appendChild(
label
);

checkIndex++;

}

morning.forEach(

item=>{

createTask(

item,

morningRoutine

);

}

);

night.forEach(

item=>{

createTask(

item,

nightRoutine

);

}

);

// ==========================
// Water
// ==========================

waterCount.innerHTML =

data.water +

" / 8 Glasses";

function addWater(){

if(
data.water < 8
){

data.water++;

waterCount.innerHTML =

data.water +

" / 8 Glasses";

saveRoutine();

updateProgress();

}

}

// ==========================
// Progress
// ==========================

const totalTasks =

morning.length +

night.length +

8;

function updateProgress(){

const checked =

document.querySelectorAll(

'input[type="checkbox"]:checked'

).length;

const completed =

checked +

data.water;

const percent =

Math.floor(

(

completed

/

totalTasks

)

*100

);

progressBar.style.width =

percent +

"%";

progressText.innerHTML =

percent +

"% Completed";

}

updateProgress();



function switchRoutine(
id
){

localStorage.setItem(

"activeRoutine",

id

);

location.reload();

}

function renameRoutine(id){

    const newName =
    prompt(
    "Enter routine name:"
    );

    if(

    newName === null ||

    newName.trim() === ""

    ){

        return;

    }

    const index =

    allRoutines.findIndex(

    item =>

    item.id === id

    );

    allRoutines[
    index
    ].name =
    newName;

    localStorage.setItem(

    "allRoutines",

    JSON.stringify(
    allRoutines
    )

    );

    location.reload();

}


// ==========================
// Delete Routine
// ==========================

function deleteRoutine(
id
){

const ok =
confirm(

"Delete this routine permanently?"

);

if(
!ok
){

return;

}

const updated =
allRoutines.filter(

item =>

item.id !== id

);

localStorage.setItem(

"allRoutines",

JSON.stringify(
updated
)

);

// No routine left

if(
updated.length === 0
){

localStorage.removeItem(
"activeRoutine"
);

window.location.href =
"analysis.html";

return;

}

// Current routine deleted

if(
activeId === id
){

localStorage.setItem(

"activeRoutine",

updated[0].id

);

}

location.reload();

}

// ==========================
// Routine Library
// ==========================

function loadRoutineLibrary(){

routineLibrary.innerHTML =
"";

allRoutines.forEach(

(item)=>{

const div =
document.createElement(
"div"
);

div.className =
"routine-item";

const current =
item.id === activeId;

div.innerHTML =

`

<h3>

🌿 ${item.name}

</h3>

<p>

⚡ ${item.problems.join(", ")}

</p>

<p>

📅 ${item.date}

</p>

<div
style="
display:flex;
gap:10px;
margin-top:12px;
">


<button

class="${
current
?
"current-btn"
:
""
}"

onclick="switchRoutine(${item.id})"

>

${
current
?
"Current"
:
"Continue"
}

</button>

<button

style="
background:
linear-gradient(
135deg,
#f39c12,
#e67e22
);
"

onclick="renameRoutine(${item.id})"

>

✏️ Rename

</button>

<button

onclick="deleteRoutine(${item.id})"

style="
background:
linear-gradient(
135deg,
#ff6b6b,
#e63946
);
"

>

🗑 Delete

</button>



</div>

`;

routineLibrary.appendChild(
div
);

}

);

}

// ==========================
// Initial Load
// ==========================

loadRoutineLibrary();

