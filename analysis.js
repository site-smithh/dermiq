

function createRoutine(){

    // --------------------------
    // Skin Type
    // --------------------------

    const skin =
    document.querySelector(
        'input[name="skin"]:checked'
    );

    if(!skin){

        alert(
            "Please select your skin type!"
        );

        return;

    }

    // --------------------------
    // Problems
    // --------------------------

    const checkedProblems =
    document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    let problems = [];

    checkedProblems.forEach(

    (item)=>{

        problems.push(
            item.value
        );

    }

    );

    // --------------------------
    // Age
    // --------------------------

    const age =
    document.getElementById(
        "age"
    ).value;

   

    // --------------------------
    // Load Previous Routines
    // --------------------------

    let allRoutines =

    JSON.parse(

        localStorage.getItem(
            "allRoutines"
        )

    ) || [];

    // --------------------------
    // Create New Routine
    // --------------------------

    const newRoutine = {

        id:
        Date.now(),
        name:
"Routine " +
(
allRoutines.length + 1
),

        date:
        new Date()
        .toLocaleDateString(
            "en-IN"
        ),

        skinType:
        skin.value,

        problems:
        problems,

        age:
        age,

        

        checks:[],

        water:0,

        journeyStart:

        new Date()
        .toISOString()
        .split("T")[0]

    };

    // --------------------------
    // Save
    // --------------------------

    allRoutines.push(
        newRoutine
    );

    localStorage.setItem(

        "allRoutines",

        JSON.stringify(
            allRoutines
        )

    );

    // --------------------------
    // Active Routine
    // --------------------------

    localStorage.setItem(

        "activeRoutine",

        newRoutine.id

    );

    window.location.href =
    "dashboard.html";

}
