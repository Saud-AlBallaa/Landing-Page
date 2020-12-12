/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

//the current active section, the idea is to points to the current section that the user view
let currentAS;
//number of section tabs in the top (navbar), I will set it as 4
const NOST = 4;

//list(array) of section's elements and thier coneent
const LOS = [];



/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// my navbar geneartor!, create the list of navbar elements
function GNBE() {
  const section_navbar_element_list = [];
// NOST = Number of Section Tabs!
  for (let i =0; i < NOST; i++){
    //to hold the anchor (lE= list of elements)
    const loE = document.createElement("li");

    //to point to the targted section
    const anchorElement = document.createElement("a");
    //build our anchor element conetent
    anchorElement.textContent = `Section ${i+1}`;
    anchorElement.classList.add("menu__link");
    anchorElement.href = `#section${i+1}`;
    // loE= list of elements
    loE.id = `navbar-element-section${i+1}`;

    //append the anchor element, loE = list of elements
    loE.appendChild(anchorElement);

    //here we add them to the list to return them after, loe = List of elements
    section_navbar_element_list.push(loE);
  }
  // one thousand years later lol
  return section_navbar_element_list;
}
// my section content generator!, GSC = Generator Sections Content
function GSC() {
 // NOST = Number of Section Tabs!
  for(let i = 0; i < NOST; i++) {
    // sE= section element
    const sE = document.createElement("section");
    //dE = dev element
    const dE = document.createElement("div");
    //sHE = section header element
    const sHE = document.createElement("h2");
    //pE = parahraph element
    const pE = document.createElement("p");

    // sE= section element
    sE.id = `section${i+1}`;
    //sHE = section header element
    sHE.textContent = `section${i+1}`;
    //dE = dev element
    dE.classList.add("landing__container");
    //pE = parahraph element
    pE.textContent ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //dE = dev element // sHE =section header element
    dE.appendChild(sHE);
    //dE = dev element // pE = parahraph element
    dE.appendChild(pE);
    // sE= section element //dE = dev element
    sE.appendChild(dE);

    LOS.push(sE);
  }
  return LOS;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
//BTNB = build the navbar, I'm so creative
function BTNB() {
  //here we will work with document fragment by fill it sections
  //for better preformance
  //dF= document fragment
  const dF = document.createDocumentFragment();
  // gLOE = Generating list of elements
  const gLOE = GNBE();

  // now we will append all of the section anchor tags
  gLOE.forEach(element => {dF.appendChild(element);
  })

  //now we will get the navbar contanier put in it the wanted sections
  //nbCE = navbar container element
  const nbCE = document.getElementById("navbar__list")

  nbCE.appendChild(dF);

}
//build the sections, bTS= build the sections
function bTS() {
  //dF == document fragment
  const dF = document.createDocumentFragment();

  //call the list of sections and thier contents
  // gLOS = generating list of sections
  const gLOS = GSC();

  // now we will append all the sections in the document fragment
  gLOS.forEach(section => {
    dF.appendChild(section);
  })
  // now we will get thr main section to append all the generated sections
  // sCE = sections container elements
  const sCE = document.getElementById("main-section");
  sCE.appendChild(dF);
}
// Add class 'active' to section when near top of viewport
function onScroll(e){
  //tAS = Tmpoery active section which we will set it as the last element
  // currentAS, defined up as the current active section
  let tAS = currentAS;

  const height= window.pageYOffset || document.documentElement.scrollTop;
  //check if they are active element in the bottom
  for(let i = LOS.length-1; i >= 0; i--) {
    if(LOS[i].offsetTop < height + 400) {
      tAS = LOS[i];
      break;
    }
  }
  // we will save the old one to remove the active class
  //oldAS = old active section
  let oldAS = currentAS;

  // now it will check if the new one its not equal the old one change
  //tAS = tempory active section // currentAS is the current active section
  if (tAS.id !== currentAS.id){
    currentAS= tAS;
    //active the current one and remove it from the old one
    currentAS.classList.add("your-active-class");
    oldAS.classList.remove("your-active-class");

    // to hilight the navbar of the current section
    document.getElementById(`navbar-element-${currentAS.id}`).classList.add("active-navbar");
    document.getElementById(`navbar-element-${oldAS.id}`).classList.remove("active-navbar");

  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', function() {
  //build the navbar
  BTNB();
  //build the sections
  bTS();
  //currentAS = current active sections
  currentAS = document.querySelector("#section1");
  currentAS.classList.add("your-active-class");
  document.querySelector("#navbar-element-section1").classList.add("active-navbar")
})

// Set sections as active
document.addEventListener('scroll', onScroll)
