
function startJourney(){

    // Active Routine Check

    const activeRoutine =
    localStorage.getItem(
        "activeRoutine"
    );

    const allRoutines =
    JSON.parse(

        localStorage.getItem(
            "allRoutines"
        )

    ) || [];

    // No Routine Found

    if(

        !activeRoutine ||

        allRoutines.length === 0

    ){

        window.location.href =
        "analysis.html";

        return;

    }

    // Active Routine Exists

    window.location.href =
    "dashboard.html";

}

// ==========================
// Navbar Shadow
// ==========================

const nav =
document.querySelector(
    "nav"
);

window.addEventListener(

    "scroll",

    ()=>{

        if(
            window.scrollY > 30
        ){

            nav.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";

        }

        else{

            nav.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.05)";

        }

    }

);

// ==========================
// Card Animation
// ==========================

const cards =
document.querySelectorAll(
    ".card"
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(

(entry)=>{

if(
entry.isIntersecting
){

entry.target.style.opacity =
"1";

entry.target.style.transform =
"translateY(0)";

}

}

);

},

{
threshold:0.15
}

);

cards.forEach(

(card)=>{

card.style.opacity =
"0";

card.style.transform =
"translateY(40px)";

card.style.transition =
"all .8s ease";

observer.observe(
card
);

}

);

// ==========================
// Button Animation
// ==========================

const buttons =
document.querySelectorAll(
    "button"
);

buttons.forEach(

(btn)=>{

btn.addEventListener(

"mousedown",

()=>{

btn.style.transform =
"scale(0.97)";

}

);

btn.addEventListener(

"mouseup",

()=>{

btn.style.transform =
"";

}

);

btn.addEventListener(

"mouseleave",

()=>{

btn.style.transform =
"";

}

);

}

);