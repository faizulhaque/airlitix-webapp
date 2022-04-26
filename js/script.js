
//Main Elements
let homeBtn = document.getElementById('home-btn')
let toggleDiv = document.getElementById('toggle-div')
let toggleHandle = document.getElementById('toggle-handle')
let greenhouses = document.getElementsByClassName("main-greenhouse-div");
let step1 = document.getElementById("step-1");
let step2 = document.getElementById("step-2");
let step3 = document.getElementById("step-3");
let bgOverlay = document.getElementById("bg-gradient");

//Different Views
let allGreenhousesView = document.getElementById("all-greenhouses-view");
let greenhouse1View = document.getElementById("greenhouse-1-view");
let greenhouse2View = document.getElementById("greenhouse-2-view");
let greenhouse3View = document.getElementById("greenhouse-3-view");
let greenhouse4View = document.getElementById("greenhouse-4-view");
let greenhouse5View = document.getElementById("greenhouse-5-view");
let outcomeView = document.getElementById("outcome-view");

//Greenhouse commands view
let calculationTexts = document.getElementsByClassName("calculation-text");
let resultTexts = document.getElementsByClassName("result-text");
let bayCalculationDivs = document.getElementsByClassName("bay-calculation-div")
let keypadBtns = document.getElementsByClassName("keypad-btn");
let bayBtns = document.getElementsByClassName("bay-div");
let resetBtns = document.getElementsByClassName("reset-btn");
let confirmBtns = document.getElementsByClassName("confirm-btn");
let cancelBtns = document.getElementsByClassName("cancel-btn");

//Hamburger and Menus
let hamburgerMenus = document.getElementsByClassName("hamburger-menu");
let menuContainer = document.getElementsByClassName("menu-container");
let userMenus = document.getElementsByClassName("user-menu");
let adminMenus = document.getElementsByClassName("admin-menu");
let userOperationBtns = document.getElementsByClassName("user-operation-div");
let adminOperationBtns = document.getElementsByClassName("admin-operation-div");
let sideBars = document.getElementsByClassName("admin-menu");
let adminOperationBtnContainers = document.getElementsByClassName("admin-operation-buttons");

//Outcome View
let logData = document.getElementById("log-data");
let statusData = document.getElementById("status-data");
let ghOutcomeNum = document.getElementById("gh-outcome-num");
let bayOutcomeNum = document.getElementById("bay-outcome-num");
let backBtn = document.getElementById('back-btn')

//General
let home = true;
let adminMode = false;
let currentGreenhouse;
let currentBay;


//Home Button Functionality
function checkForHome(){
    console.log('function ran 2')
    if(home) {
        homeBtn.style.display = 'none'
    } else {
        homeBtn.style.display = 'block'
    }
}

homeBtn.addEventListener('click', () => {
	for (const btn of bayBtns) {
  	btn.classList.remove('selected')
  }
  step1.click()
})

//User/Admin Toggle
toggleDiv.addEventListener('click', () => {
  toggleDiv.classList.toggle('admin');
  adminMode = !adminMode;
  handleAdminMode();
})

function handleAdminMode(){
	bgOverlay.classList.toggle('admin')
	if(adminMode){
  	step3.style.display = 'flex'
  	for (const menu of userMenus){
    	menu.style.display = 'none'
    }
    for (const menu of adminMenus){
    	menu.style.display = 'block'
    }
    for (const menu of menuContainer){
      menu.style.backgroundColor = '#274690'
    }
  } else {
    step3.style.display = 'none'
    for (const menu of userMenus){
    	menu.style.display = 'block'
    }
    for (const menu of adminMenus){
    	menu.style.display = 'none'
    }
    for (const menu of menuContainer){
      menu.style.backgroundColor = '#27402b'
    }
  }
}

//Bay Button Click Functionality
for (const btn of bayBtns) {
  btn.addEventListener('click', function() {
  	for(const btn of bayBtns) {
    	btn.classList.remove("selected");
    }
    step1.style.opacity = '50%'
    step2.style.opacity = '100%'
    btn.classList.toggle("selected");
    currentBay = btn.id.slice(-1)
    handleResetBtn();
    let calculator = btn.parentNode.parentNode.nextElementSibling;
    calculator.style.display = 'flex';	
    for(const resultText of resultTexts){
    	resultText.display = 'none';
        resultText.innerHTML = ''
    }
  });
}

//Only display reset buttons if a bay is selected
function handleResetBtn(){
  if(currentBay != ''){
    for(const btn of resetBtns){
      btn.style.display = 'block'
    }
    } else {
      for(const btn of resetBtns){
        btn.style.display = 'none'
      }
    }
}

//Keypad Button Functionality
for (const btn of keypadBtns) {
  btn.addEventListener('click', function() {
  	 let resultText = btn.parentNode.parentNode.getElementsByClassName('result-text')[0]
     resultText.style.display = 'block'
     resultText.innerText = 'Calculation results will appear here'
  });
}

//Clicking Step 1
step1.addEventListener("click", () => {
    step1.style.opacity = '100%';
    step2.style.opacity = '50%';
    step3.style.opacity = '50%';
	resetFields()          
 })

 //Function to reset all fields back to initial state
 function resetFields(){
     home = true;
     checkForHome();
 	         for (let i = 0; i < resultTexts.length; i++){
    		      resultTexts[i].innerText = '';
              resultTexts[i].style.display = 'none'
   				 } 
           for (let i = 0; i < bayCalculationDivs.length; i++){
    		      bayCalculationDivs[i].style.display = 'none';
   				 } 
           for (const btn of bayBtns) {
    		      btn.classList.remove("selected");
    				}
           for (const bar of sideBars) {
              bar.style.height = '0'
            }
           for (const menu of adminMenus) {
              menu.display = 'none';
            }
            for (const menu of userMenus) {
              menu.display = 'none';
            }

              currentGreenhouse = '';
			        currentBay = '';
              handleResetBtn();
              allGreenhousesView.style.display = 'flex';
              greenhouse1View.style.display = 'none';
              greenhouse2View.style.display = 'none';
              greenhouse3View.style.display = 'none';
              greenhouse4View.style.display = 'none';
              greenhouse5View.style.display = 'none';
              outcomeView.style.display = 'none';
 }

//Display selected Greenhouse, hide the others
for (let i = 0; i < greenhouses.length; i++) {
    greenhouses[i].addEventListener("click", () => {
        home = false;
        checkForHome();
    	if(greenhouses[i].id === "gh1"){
          currentGreenhouse = 1;    
          allGreenhousesView.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
          outcomeView.style.display = 'none';
        	greenhouse1View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh2"){
          currentGreenhouse = 2;    
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
          outcomeView.style.display = 'none';
        	greenhouse2View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh3"){
          currentGreenhouse = 3;    
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
          outcomeView.style.display = 'none';
        	greenhouse3View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh4"){
          currentGreenhouse = 4;    
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
          outcomeView.style.display = 'none';
        	greenhouse4View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh5"){
          currentGreenhouse = 5; 
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
          outcomeView.style.display = 'none';
        	greenhouse5View.style.display = 'flex';
        }
    });
}
//Display Popup to confirm a greenhouse reset
for(const resetBtn of resetBtns){
	resetBtn.addEventListener('click', () => {
  	let overlay = resetBtn.parentNode.parentNode.querySelector('.overlay-confirmation')
    overlay.style.display = 'flex';
  })
}

//Confirm a greenhouse reset
for(const confirmBtn of confirmBtns){
	confirmBtn.addEventListener('click', () => {
  	let overlay = confirmBtn.parentNode.parentNode.parentNode;
    overlay.style.display = 'none';
  	//Remove any background status colors from bays
    let bayDivs = overlay.parentNode.getElementsByClassName('bay-div');
    for(const bayDiv of bayDivs){
    	bayDiv.classList.remove('success')
      bayDiv.classList.remove('selected')
      bayDiv.classList.remove('error')
    }
    //Remove checked opacity from all icons
    let bayIcons = overlay.parentNode.getElementsByClassName('bay-icon');
    for(const bayIcon of bayIcons){
    	bayIcon.classList.remove('checked')
    }
    //Hide calculator
    let calculator = overlay.parentNode.getElementsByClassName('bay-calculation-div')[0];
  	calculator.style.display = 'none'
    //Clear currently selected and hide reset Button
    currentBay = ''
    handleResetBtn()
  })
}

//Cancel a greenhouse reset
for(const cancelBtn of cancelBtns){
	cancelBtn.addEventListener('click', () => {
  	let overlay = cancelBtn.parentNode.parentNode.parentNode;
    overlay.style.display = 'none';
  })
}

//Behavior for clicking an operation button in admin mode
for(const btn of adminOperationBtns){
	btn.addEventListener('click', () => {
  //If they have already selected a bay to run a test on:
  if(currentBay){
    step2.style.opacity = '50%';
    step3.style.opacity = '100%';
    greenhouse1View.style.display = 'none';
    greenhouse2View.style.display = 'none';
    greenhouse3View.style.display = 'none';
    greenhouse4View.style.display = 'none';
    greenhouse5View.style.display = 'none';
    outcomeView.style.display = 'flex'
    ghOutcomeNum.textContent = currentGreenhouse;
    bayOutcomeNum.textContent = currentBay;    
  }  else {
  	alert('Select a bay')
  }
  })
}

//Behavior for clicking an operation button in user mode
for(const btn of userOperationBtns){
	btn.addEventListener('click', () => {
  //If they have already selected a bay to run a test on:
  if(currentBay){
    step2.style.opacity = '50%';
    step3.style.opacity = '100%';
    greenhouse1View.style.display = 'none';
    greenhouse2View.style.display = 'none';
    greenhouse3View.style.display = 'none';
    greenhouse4View.style.display = 'none';
    greenhouse5View.style.display = 'none';
    outcomeView.style.display = 'flex'
    ghOutcomeNum.textContent = currentGreenhouse;
    bayOutcomeNum.textContent = currentBay;    
  }  else {
  	alert('Select a bay')
  }
  })
}

//Back button functionality
backBtn.addEventListener('click', () => {
	outcomeView.style.display = 'none'
  step2.style.opacity = '100%';
  step3.style.opacity = '50%';
	if(currentGreenhouse === 1){
      greenhouse1View.style.display = 'flex';
  } else if (currentGreenhouse === 2){
      greenhouse2View.style.display = 'flex';
  } else if (currentGreenhouse === 3){
      greenhouse3View.style.display = 'flex';
  } else if (currentGreenhouse === 4){
      greenhouse4View.style.display = 'flex';
  } else if (currentGreenhouse === 5){
      greenhouse5View.style.display = 'flex';
  }
})
