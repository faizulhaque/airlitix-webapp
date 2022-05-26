
//Main Elements
let homeBtn = document.getElementById('home-btn')
let toggleDiv = document.getElementById('toggle-div')
let toggleHandle = document.getElementById('toggle-handle')
let greenhouses = document.getElementsByClassName("main-greenhouse-div");
let office = document.getElementById('office')
let step1 = document.getElementById("step-1");
let step2 = document.getElementById("step-2");
let step3 = document.getElementById("step-3");
let bgOverlay = document.getElementById("bg-gradient");
let mainContentSection = document.getElementById("main-content");

//Different Views
let allGreenhousesView = document.getElementById("all-greenhouses-view");
let greenhouse1View = document.getElementById("greenhouse-1-view");
let greenhouse2View = document.getElementById("greenhouse-2-view");
let greenhouse3View = document.getElementById("greenhouse-3-view");
let greenhouse4View = document.getElementById("greenhouse-4-view");
let greenhouse5View = document.getElementById("greenhouse-5-view");
let outcomeViews = document.getElementsByClassName("outcome-view");
let outcomeViewHome = document.getElementById("outcome-view-home");

//Greenhouse commands view
let bayCalculationDivs = document.getElementsByClassName("bay-calculation-div")
let keypadBtns = document.getElementsByClassName("keypad-btn");
let bayBtns = document.getElementsByClassName("bay-div");
let stoplightTriggers = document.getElementsByClassName("stoplight-trigger");
let stoplightDivs = document.getElementsByClassName("stoplight-div");
let stoplightBtns = document.getElementsByClassName("status-select");
let resetBtns = document.getElementsByClassName("reset-btn");
let confirmBtns = document.getElementsByClassName("confirm-btn");
let cancelBtns = document.getElementsByClassName("cancel-btn");

//Hamburger and Menus
let hamburgerMain = document.getElementById("hamburger-main");
let hamburgerMenus = document.getElementsByClassName("hamburger-menu");
let menuContainers = document.getElementsByClassName("menu-container");
let menuContainerMain = document.getElementById("menu-container-main");
let userMenus = document.getElementsByClassName("user-menu");
let adminMenus = document.getElementsByClassName("admin-menu");
let userOperationBtns = document.getElementsByClassName("user-operation-div");
let adminOperationBtns = document.getElementsByClassName("admin-operation-div");
let adminOperationBtnContainers = document.getElementsByClassName("admin-operation-buttons");
let buildingOperationBtns = document.getElementsByClassName("admin-operation-div-main");

//Bay Icons
let waterIcons = document.getElementsByClassName('bay-icon-container-water')
let mapIcons = document.getElementsByClassName('bay-icon-container-map')
let wifiIcons = document.getElementsByClassName('bay-icon-container-wifi')
let systemIcons = document.getElementsByClassName('bay-icon-container-system')

//Outcome Views
let homeLogDisplay = document.getElementById('home-log-display')
let logData = document.getElementById("log-data");
let statusData = document.getElementById("status-data");
let ghOutcomeNum = document.getElementById("gh-outcome-num");
let bayOutcomeNum = document.getElementById("bay-outcome-num");
let actionOutcome = document.getElementById("action-outcome");

//Outcome Views Home
let ghOutcomeNumHome = document.getElementById("gh-outcome-num-home");
let actionOutcomeHome = document.getElementById("gh-action-home");
let gearDivs = document.getElementsByClassName("gear-div");
let propagationDivs = document.getElementsByClassName("stop-propagation-div");
let logDataHome = document.getElementById('log-data-home')
let statusDataHome = document.getElementById('status-data-home')

//Variables and Booleans
let home = true;
let adminMode = false;
let currentGreenhouse;
let currentBay;
let buildingSelected = false;
let currentBuilding = '';


//Home Button Functionality
function checkForHome(){
    if(home) {
        homeBtn.style.display = 'none'
    } else {
        homeBtn.style.display = 'block'
    }
}

//Home button click - hide all selected state stylings
homeBtn.addEventListener('click', () => {
	for (const btn of bayBtns) {
  	btn.classList.remove('selected')
  	btn.classList.remove('outline')
  }
  for (const arrow of stoplightTriggers){
    arrow.style.display = 'none'
  }
  for (const div of stoplightDivs){
    div.style.display = 'none'
  }
  for (const div of bayCalculationDivs){
    div.style.display = 'none'
  }
  for (const div of outcomeViews){
    div.style.display = 'none'
  }
  handleOperationMenuIfOpen()
  
  handleAdminMode(); 
  home = true;
  checkForHome();
  currentGreenhouse = '';
  currentBay = '';
  handleResetBtn();
  allGreenhousesView.style.display = 'flex';
  greenhouse1View.style.display = 'none';
  greenhouse2View.style.display = 'none';
  greenhouse3View.style.display = 'none';
  greenhouse4View.style.display = 'none';
  greenhouse5View.style.display = 'none';
})

//Close operation menu if it's still open when the user clicks to go home
function handleOperationMenuIfOpen(){
  let greenhouseViews = Array.from(mainContentSection.children);
  let currentGreenhouseDisplayed = null;
  //Figure out which greenhouse the user is currently on
  for (let i = 0; i < greenhouseViews.length; i++){
   let greenhouse = greenhouseViews[i];
   let compStyles = window.getComputedStyle(greenhouse);
    if (compStyles.getPropertyValue('display') == 'flex'){
       currentGreenhouseDisplayed = greenhouseViews[i];
    }
  }

  //target the hamburger menu to close it if it's open
  let hamburgerMenu = currentGreenhouseDisplayed.getElementsByClassName('hamburger-menu')[0]
  let menuContainer = currentGreenhouseDisplayed.getElementsByClassName('menu-container')[0]

  if(menuContainer.style.height == '100%'){
    hamburgerMenu.click()
  }

}

//User/Admin Toggle
toggleDiv.addEventListener('click', () => {
	bgOverlay.classList.toggle('admin')
  toggleDiv.classList.toggle('admin');
  adminMode = !adminMode;
  handleAdminMode()
  handleHomeMenuIfOpen()
})

function handleAdminMode(){
	if(adminMode){
    hamburgerMain.style.display = 'block'
  	step3.style.display = 'flex'
  	for (const menu of userMenus){
    	menu.style.display = 'none'
    }
    for (const menu of adminMenus){
    	menu.style.display = 'block'
    }
    for (const menu of menuContainers){
      menu.style.backgroundColor = 'rgb(39, 70, 144)'
    }
    for (const menu of outcomeViews){
      menu.style.display = 'flex'
    }
    for (const div of propagationDivs){
      div.style.display = 'block'
    }
    for (const gear of gearDivs){
      gear.style.display = 'block'
    }
    outcomeViewHome.style.display = 'flex'

  } else {
    hamburgerMain.style.display = 'none'
    step3.style.display = 'none'
    for (const menu of userMenus){
    	menu.style.display = 'block'
    }
    for (const menu of adminMenus){
    	menu.style.display = 'none'
    }
    for (const menu of menuContainers){
      menu.style.backgroundColor = 'rgb(39, 64, 43)'
    }
    for (const menu of outcomeViews){
      menu.style.display = 'none'
    }
    for (const div of propagationDivs){
      div.style.display = 'none'
    }
    for (const gear of gearDivs){
      gear.style.display = 'none'
    }
    outcomeViewHome.style.display = 'none'
  }
}

function handleHomeMenuIfOpen(){
  if(menuContainerMain.style.height == '100%'){
    hamburgerMain.click()
  }
}

//Bay Button Click Functionality
for (const btn of bayBtns) {
  btn.addEventListener('click', function() {
  	for(const btn of bayBtns) {
    	btn.classList.remove("selected")
    	btn.classList.remove("outline")
    }
    //hide all of the selected arrows when you click on a new bay
    for(const trigger of stoplightTriggers){
      trigger.style.display = 'none'
    }
    //hide all of the stoplight divs when you click on a new bay
    for(const div of stoplightDivs){
      div.style.display = 'none'
    }

    //If the clicked bay has already been assigned a status color, outline it instead
    if(btn.classList.contains('error') || btn.classList.contains('in-progress') || btn.classList.contains('success')){
      btn.classList.add('outline')
    }

    step1.style.opacity = '50%'
    step2.style.opacity = '100%'

    //Toggle the selected class on this bay, hide or show the stoplight arrow trigger
    btn.classList.toggle("selected");
    let selectedArrow = btn.getElementsByClassName('stoplight-trigger')[0]
    if(selectedArrow.style.display == 'block'){
      selectedArrow.style.display = 'none'
    } else if (selectedArrow.style.display == 'none'){
      selectedArrow.style.display = 'block'
    }
    
    currentBay = btn.id.slice(-1)
    handleResetBtn();
    let calculator = btn.parentNode.parentNode.nextElementSibling;
    calculator.style.display = 'flex';	
  });
}

//Display or hide Stoplight Buttons on Arrow Click
for (const arrow of stoplightTriggers){
  arrow.addEventListener('click', (e) => {
    e.stopPropagation()
    let stoplight = arrow.parentNode.getElementsByClassName('stoplight-div')[0]
    console.log(stoplight)
    if(stoplight.style.display == 'none'){
      stoplight.style.display = 'flex'
    } else if (stoplight.style.display == 'flex')
      stoplight.style.display = 'none'
  })
}

//Stoplight Status Buttons
for(const btn of stoplightBtns){
  btn.addEventListener('click', () => {
    let bayDiv = btn.parentNode.parentNode
    if(btn.classList.contains('error')){
      bayDiv.classList.remove('selected')
      bayDiv.classList.remove('success')
      bayDiv.classList.remove('in-progress')
      bayDiv.classList.add('error')
    }
    if(btn.classList.contains("in-progress")){
      bayDiv.classList.remove('selected')
      bayDiv.classList.remove('success')
      bayDiv.classList.remove('error')
      bayDiv.classList.add('in-progress')
    }
    if(btn.classList.contains('success')){
      bayDiv.classList.remove('selected')
      bayDiv.classList.remove('error')
      bayDiv.classList.remove('in-progress')
      bayDiv.classList.add('success')
    }
  })
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

  	 let panelScreen = btn.parentNode.parentNode.getElementsByClassName('panel-screen')[0];
     let gridMenus = Array.from(panelScreen.children);
     let currentGridDisplayed = null;
     //Figure out which screen the user is currently on
     for (let i = 0; i < gridMenus.length; i++){
      let screen = gridMenus[i];
      let compStyles = window.getComputedStyle(screen);
       if (compStyles.getPropertyValue('display') == 'grid'){
          currentGridDisplayed = gridMenus[i];
       }
     }
     //Figure out where to direct the next screen to
     currentGridDisplayed.style.display = 'none';
     gridMenus[1].style.display = 'grid'

     //Return to main menu if button is "E"
     console.log(btn.firstElementChild.innerHTML)
     if(btn.firstElementChild.innerHTML == 'E'){
       for(const menu of gridMenus){
        menu.style.display = 'none'
       } 
       gridMenus[0].style.display = 'grid'
     }
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
           for (let i = 0; i < bayCalculationDivs.length; i++){
    		      bayCalculationDivs[i].style.display = 'none';
   				 } 
           for (const btn of bayBtns) {
    		      btn.classList.remove("selected")
              btn.classList.remove("outline")
              btn.classList.remove("error")
              btn.classList.remove("in-progress")
              btn.classList.remove("success")
    				}
            // for (const menu of menuContainers) {
            //   menu.style.backgroundColor = 'transparent'
            // }
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
        handleHomeMenuIfOpen()
        home = false;
        checkForHome();
        handleAdminMode();
    	if(greenhouses[i].id === "gh1"){
          currentGreenhouse = 1;    
          allGreenhousesView.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse1View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh2"){
          currentGreenhouse = 2;    
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse2View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh3"){
          currentGreenhouse = 3;    
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse3View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh4"){
          currentGreenhouse = 4;    
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse4View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh5"){
          currentGreenhouse = 5; 
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
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
      bayDiv.classList.remove('in-progress')
    }
    //Remove selected arrows
    for(const arrow of stoplightTriggers){
      arrow.style.display = 'none'
    }
    for (const div of stoplightDivs){
      div.style.display = 'none'
    }
    for (const div of outcomeViews){
      div.style.display = 'none'
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

// //Behavior for clicking an operation button for debugging/diagnostics on Home Page
// for(const btn of adminOperationBtns){
// 	btn.addEventListener('click', () => {
//   let outcomeDiv = btn.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('outcome-view')[0]
//   let action = btn.lastElementChild.innerHTML;
//   //If they have already selected a bay to run a test on:
//   if(currentBay){
//     step2.style.opacity = '50%';
//     step3.style.opacity = '100%';
//     ghOutcomeNum.textContent = currentGreenhouse;
//     bayOutcomeNum.textContent = currentBay;    
//     actionOutcome.textContent = action;
//   }  else {
//   	alert('Select a bay')
//   }
//   })
// }

//Behavior for clicking an operation button in admin mode
for(const btn of adminOperationBtns){
	btn.addEventListener('click', () => {
  let action = btn.lastElementChild.innerHTML;
  //If they have already selected a bay to run a test on:
  if(currentBay){
    step2.style.opacity = '50%';
    step3.style.opacity = '100%';
    ghOutcomeNum.textContent = currentGreenhouse;
    bayOutcomeNum.textContent = currentBay;
    actionOutcome.textContent = action;
  }  else {
  	alert('Select a bay')
  }
  })
}

//Behavior for clicking an operation button in user mode
for(const btn of userOperationBtns){
	btn.addEventListener('click', () => {
  let outcomeDiv = btn.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('outcome-view')[0]
  let action = btn.lastElementChild.innerHTML;
  //If they have already selected a bay to run a test on:
  if(currentBay){
    step2.style.opacity = '50%';
    step3.style.opacity = '100%';
    outcomeDiv.style.display = 'flex'
    ghOutcomeNum.textContent = currentGreenhouse;
    bayOutcomeNum.textContent = currentBay;    
    actionOutcome.textContent = action;
  }  else {
  	alert('Select a bay')
  }
  })
}

// Bay Icons Color Changing
for(const icon of waterIcons){
  icon.addEventListener('click', () => {
    if(!icon.classList.includes('in-progress') && !icon.classList.includes('success') && !icon.classList.includes('error')){
      icon.classList.add('in-progress')
    } else if(icon.classList.contains('in-progress') || icon.classList.contains('success')){
      icon.classList.remove('in-progress')
      icon.classList.remove('success')
      icon.classList.add('error')
    } else if (icon.classList.contains('in-progress') || icon.classList.contains('error')){
      icon.classList.remove('in-progress')
      icon.classList.remove('error')
      icon.classList.add('success')
    } else if (icon.classList.contains('success') || icon.classList.contains('error')){
      icon.classList.remove('success')
      icon.classList.remove('error')
      icon.classList.add('in-progress')
    }
  })
}

//Homepage Office Operation Buttons 
office.addEventListener('click', () => {
  buildingSelected = !buildingSelected
  currentBuilding = 'Office'
})

for(const gear of gearDivs){
  gear.addEventListener('click', () => {
    for(const gear of gearDivs){
      gear.classList.remove('selected')
    }
    if(!gear.classList.contains('selected')){
      gear.classList.add('selected')
      buildingSelected = 'true'
      currentBuilding = gear.parentNode.lastElementChild.firstElementChild.innerHTML;
      ghOutcomeNumHome.textContent = currentBuilding;
    } else {
      gear.classList.remove('selected')
      buildingSelected = 'false'
      currentBuilding = ''
    }
  })
}

for(const btn of buildingOperationBtns){
  btn.addEventListener('click', () => {
    if(buildingSelected){
      let action = btn.lastElementChild.innerHTML;
      actionOutcomeHome.textContent = action;
      logDataHome.textContent = 'Log data appears here.';
      statusDataHome.textContent = 'Status data appears here.';
    } else {
      alert('Please select a building target')
    }
  })
}



//Back button functionality
// backBtn.addEventListener('click', () => {
// 	outcomeView.style.display = 'none'
//   step2.style.opacity = '100%';
//   step3.style.opacity = '50%';
// 	if(currentGreenhouse === 1){
//       greenhouse1View.style.display = 'flex';
//   } else if (currentGreenhouse === 2){
//       greenhouse2View.style.display = 'flex';
//   } else if (currentGreenhouse === 3){
//       greenhouse3View.style.display = 'flex';
//   } else if (currentGreenhouse === 4){
//       greenhouse4View.style.display = 'flex';
//   } else if (currentGreenhouse === 5){
//       greenhouse5View.style.display = 'flex';
//   }
// })
