//Main Elements
let homeBtn = document.getElementById('home-btn')
let resetBtn = document.getElementById('main-reset-div')
let toggleDiv = document.getElementById('toggle-div')
let toggleHandle = document.getElementById('toggle-handle')
let greenhouses = document.getElementsByClassName("main-greenhouse-div");
let office = document.getElementById('office')
let bgOverlay = document.getElementById("bg-gradient");
let mainContentSection = document.getElementById("main-content");
let resetConfirmationOverlay = document.getElementById('reset-confirmation-overlay')

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
let mainActionDivs = document.getElementsByClassName("main-action-div")
let keypadBtns = document.getElementsByClassName("keypad-btn");
let bayBtns = document.getElementsByClassName("bay-div");
let adminToggleEyes = document.getElementsByClassName('main-eye-toggle')
let stoplightTriggers = document.getElementsByClassName("stoplight-trigger");
let stoplightDivs = document.getElementsByClassName("stoplight-div");
let stoplightBtns = document.getElementsByClassName("status-select");

//Hamburger and Menus
let hamburgerMain = document.getElementById("hamburger-main");
let hamburgerMenus = document.getElementsByClassName("hamburger-menu");
let menuContainers = document.getElementsByClassName("menu-container");
let menuContainerMain = document.getElementById("menu-container-main");
let userMenus = document.getElementsByClassName("user-menu");
let adminMenus = document.getElementsByClassName("admin-menu");

//Home
let buildingOperationBtns = document.getElementsByClassName("admin-operation-div-main");
let buildingOperationIcons = document.getElementsByClassName("operation-btn-home");
let homeOperationTexts = document.getElementsByClassName('home-operation-text')

//Bay Icons
let bayContainers = document.getElementsByClassName('bay-container')
let waterIcons = document.getElementsByClassName('bay-icon-container-water')
let mapIcons = document.getElementsByClassName('bay-icon-container-map')
let wifiIcons = document.getElementsByClassName('bay-icon-container-wifi')
let systemIcons = document.getElementsByClassName('bay-icon-container-system')
let disableEyes = document.getElementsByClassName('eye')
let operationsIcons = document.getElementsByClassName('operation-icon')

//User Menu Operation Buttons
let userWaterBtns = document.getElementsByClassName('user-water')
let userMappingBtns = document.getElementsByClassName('user-mapping')

//Admin Menu Operation Buttons
let adminWaterBtns = document.getElementsByClassName('admin-water')
let adminMappingBtns = document.getElementsByClassName('admin-mapping')
let adminWifiBtns = document.getElementsByClassName('admin-wifi')
let adminWifiConfigBtns = document.getElementsByClassName('admin-wifi-config')
let adminMpuBtns = document.getElementsByClassName('admin-mpu')
let adminMpuConfigBtns = document.getElementsByClassName('admin-mpu-config')

//Middle Category Views
let waterViews = document.getElementsByClassName('water-panel-container')
let mappingViews = document.getElementsByClassName('mapping-container')
let wifiViews = document.getElementsByClassName('wifi-container')
let wifiConfigViews = document.getElementsByClassName('wifi-config-container')
let mpuStatusViews = document.getElementsByClassName('mpu-status-container')
let mpuConfigViews = document.getElementsByClassName('mpu-config-container')

//Outcome Views
let logData = document.getElementById("log-data");
let statusData = document.getElementById("status-data");
let ghOutcomeNums = document.getElementsByClassName('gh-outcome-num')
let bayOutcomeNums = document.getElementsByClassName('bay-outcome-num')
let actionOutcomes = document.getElementsByClassName('action-outcome')
let outcomeHeaders = document.getElementsByClassName('outcome-header')

//Outcome Views Home
let ghOutcomeNumHome = document.getElementById("gh-outcome-num-home");
let actionOutcomeHome = document.getElementById("gh-action-home");
let gearDivs = document.getElementsByClassName("gear-div");
let propagationDivs = document.getElementsByClassName("stop-propagation-div");
let logDataHome = document.getElementById('log-data-home')
let statusDataHome = document.getElementById('status-data-home')
let homeActionDivs = document.getElementsByClassName('home-action-display')
let waterActionHome = document.getElementById('water-action-home')
let mappingActionHome = document.getElementById('mapping-action-home')
let wifiStatusActionHome = document.getElementById('wifi-status-action-home')
let wifiConfigActionHome = document.getElementById('wifi-config-action-home')
let mpuStatusActionHome = document.getElementById('mpu-status-action-home')
let mpuConfigActionHome = document.getElementById('mpu-config-action-home')

//Variables and Booleans
let home = true;
let adminMode = false;
let currentGreenhouse;
let currentBay;
let buildingSelected = false;
let currentBuilding = '';
let currentGear;
let currentAction = '';

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
  for (const div of mainActionDivs){
    div.style.display = 'none'
  }
  for (const div of outcomeViews){
    div.style.display = 'none'
  }
  //Set color of operation icons back to base state
  for (const icon of operationsIcons){
    icon.classList.remove('active')
  }
  for (const icon of buildingOperationIcons){
    icon.classList.remove('active')
  }
  for (const text of homeOperationTexts){
    text.style.color = 'white'
  }
  handleOperationMenuIfOpen()
  handleAdminMode(); 
  home = true;
  checkForHome();
  currentGreenhouse = '';
  currentBay = '';
  currentAction = ''
  hideEyeballs();
  resetAdminEyeballs()
  handleResetBtn();
  allGreenhousesView.style.display = 'flex';
  greenhouse1View.style.display = 'none';
  greenhouse2View.style.display = 'none';
  greenhouse3View.style.display = 'none';
  greenhouse4View.style.display = 'none';
  greenhouse5View.style.display = 'none';
  //Clear the current Action text field
  for (const text of actionOutcomes){
    text.textContent = currentAction;
  }
  //Hide Outcome Headers
  for(const header of outcomeHeaders){
    header.style.display = 'none'
  }
      //Hide all action Divs
      for(const div of waterViews){
        div.style.display = 'none'
      }
      for(const div of mappingViews){
        div.style.display = 'none'
      }
      for(const div of wifiViews){
        div.style.display = 'none'
      }
      for(const div of wifiConfigViews){
        div.style.display = 'none'
      }
      for(const div of mpuStatusViews){
        div.style.display = 'none'
      }
      for(const div of mpuConfigViews){
        div.style.display = 'none'
      }
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
  hideEyeballs()
  resetAdminEyeballs()
  handleAdminMode()
  handleHomeMenuIfOpen()
})

function handleAdminMode(){
	if(adminMode){
    hamburgerMain.style.display = 'block'
    for (const eye of adminToggleEyes){
      eye.style.display = 'block'
    }
  	for (const menu of userMenus){
    	menu.style.display = 'none'
    }
    for (const menu of adminMenus){
    	menu.style.display = 'block'
    }
    for (const menu of menuContainers){
      menu.style.backgroundColor = 'rgb(39, 70, 144)'
    }
    // Invisible div to cover the home page greenhouses so you can't click them in admin mode
    for (const div of propagationDivs){
      div.style.display = 'block'
    }
    for (const gear of gearDivs){
      gear.style.display = 'block'
    }
    // display the wifi and system bay icons in admin mode
    for (icon of wifiIcons){
      icon.style.display = 'block'
    }
    for (icon of systemIcons){
      icon.style.display = 'block'
    }
  } else {
    hamburgerMain.style.display = 'none'
    for (const eye of adminToggleEyes){
      eye.style.display = 'none'
    }
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
    for(const div of homeActionDivs){
      div.style.display = 'none'
    }
    for (icon of wifiIcons){
      icon.style.display = 'none'
    }
    for (icon of systemIcons){
      icon.style.display = 'none'
    }
  }
}

function hideEyeballs(){
  for(const eye of disableEyes){
    eye.style.display = 'none'
  }
}
function resetAdminEyeballs(){
  for(const eye of adminToggleEyes){
    eye.classList.remove('not-visible')
    eye.classList.add('visible')
  }
}

function handleHomeMenuIfOpen(){
  if(menuContainerMain.style.height == '100%'){
    hamburgerMain.click()
  }
}

function colorInUserIconToo(){
  if(currentAction != ''){
    if(currentAction == 'Water'){
      for (const icon of userWaterBtns){
        icon.firstElementChild.classList.add('active')
        icon.lastElementChild.style.color = '#41EB5C'
      }
    } else if (currentAction == 'Mapping'){
      for (const icon of userMappingBtns){
        icon.firstElementChild.classList.add('active')
        icon.lastElementChild.style.color = '#41EB5C'
      }
    }
  }
}

function colorInAdminIconToo(){
  if(currentAction != ''){
  if(currentAction == 'Water'){
    for (const icon of adminWaterBtns){
      icon.firstElementChild.classList.add('active')
      icon.lastElementChild.style.color = '#41EB5C'
    }
  } else if (currentAction == 'Mapping'){
    for (const icon of adminMappingBtns){
      icon.firstElementChild.classList.add('active')
      icon.lastElementChild.style.color = '#41EB5C'
    }
  }
}
}

//Bay Button Click Functionality
for (const btn of bayBtns) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation()
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

    //Toggle the selected class on this bay if it's not disabled, hide or show the stoplight arrow trigger
    let selectedArrow = btn.getElementsByClassName('stoplight-trigger')[0]
    btn.classList.toggle("selected");

    if(selectedArrow.style.display == 'block'){
      selectedArrow.style.display = 'none'
    } else if (selectedArrow.style.display == 'none'){
      selectedArrow.style.display = 'block'
    }
 
    currentBay = btn.id.slice(-2)

    //Change the text of the outcome divs to indicate what they clicked on
    for(const header of outcomeHeaders){
      header.style.display = 'flex'
    }
    for (const text of ghOutcomeNums){
      text.textContent = currentGreenhouse;   
    }
    for (const text of bayOutcomeNums){
      text.textContent = currentBay;  
    }
    // for (const text of actionOutcomes){
    //   text.textContent = action;
    // }
    handleResetBtn();
  });
}

//Display or hide Stoplight Buttons on Arrow Click
for (const arrow of stoplightTriggers){
  arrow.addEventListener('click', (e) => {
    e.stopPropagation()
    let stoplight = arrow.parentNode.getElementsByClassName('stoplight-div')[0]
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

//Ability to toggle all the eyeballs in Admin Mode
for(const eye of adminToggleEyes){
  eye.addEventListener('click', () => {
    if(eye.classList.contains('visible')){
      eye.classList.remove('visible')
      eye.classList.add('not-visible')
      for(const eye of disableEyes){
        eye.style.display = 'block'
      }
    } else {
      eye.classList.remove('not-visible')
      eye.classList.add('visible')
      for(const eye of disableEyes){
        eye.style.display = 'none'
      }
    }
  })
}

// //Disbaled a bay when the eyeball is clicked
for(const eye of disableEyes){
  eye.addEventListener('click', () => {
    let bayDiv = eye.parentElement.firstElementChild
    let disableOverlay = bayDiv.getElementsByClassName('disable-overlay')[0]
    if(!bayDiv.classList.contains('disabled')){
      bayDiv.classList.remove('selected')
      bayDiv.classList.add('disabled')
      disableOverlay.style.display = 'block'
      bayDiv.style.pointerEvents = 'none'
      eye.classList.remove('not-visible')
      eye.classList.add('visible')
    } else {
      bayDiv.classList.remove('disabled')
      disableOverlay.style.display = 'none'
      bayDiv.style.pointerEvents = 'auto'
      eye.classList.remove('visible')
      eye.classList.add('not-visible')
    }
  })
}

//Only display reset buttons if a bay is selected
function handleResetBtn(){
  if(currentBay != ''){
    resetBtn.style.display = 'block'
    } else {
      resetBtn.style.display = 'none'
    }
}

//Keypad Button Functionality
// for (const btn of keypadBtns) {
//   btn.addEventListener('click', function() {

//   	 let panelScreen = btn.parentNode.parentNode.getElementsByClassName('panel-screen')[0];
//      let gridMenus = Array.from(panelScreen.children);
//      let currentGridDisplayed = null;
//      //Figure out which screen the user is currently on
//      for (let i = 0; i < gridMenus.length; i++){
//       let screen = gridMenus[i];
//       let compStyles = window.getComputedStyle(screen);
//        if (compStyles.getPropertyValue('display') == 'grid'){
//           currentGridDisplayed = gridMenus[i];
//        }
//      }
//      //Figure out where to direct the next screen to
//      currentGridDisplayed.style.display = 'none';
//      gridMenus[1].style.display = 'grid'

//      //Return to main menu if button is "E"
//      console.log(btn.firstElementChild.innerHTML)
//      if(btn.firstElementChild.innerHTML == 'E'){
//        for(const menu of gridMenus){
//         menu.style.display = 'none'
//        } 
//        gridMenus[0].style.display = 'grid'
//      }
//   });
// }

 //Function to reset all fields back to initial state
 function resetFields(){
     home = true;
     checkForHome();
           for (let i = 0; i < mainActionDivs.length; i++){
    		      mainActionDivs[i].style.display = 'none';
   				 } 
           for (const btn of bayBtns) {
    		      btn.classList.remove("selected")
              btn.classList.remove("outline")
              btn.classList.remove("error")
              btn.classList.remove("in-progress")
              btn.classList.remove("success")
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
        handleHomeMenuIfOpen()
        home = false;
        checkForHome();
        handleAdminMode();
    	if(greenhouses[i].id === "gh1"){
          currentGreenhouse = 1;   
          selectBayByDefault() 
          allGreenhousesView.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse1View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh2"){
          currentGreenhouse = 2;    
          selectBayByDefault() 
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse2View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh3"){
          currentGreenhouse = 3;   
          selectBayByDefault()  
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse3View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh4"){
          currentGreenhouse = 4;   
          selectBayByDefault()  
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse5View.style.display = 'none';
        	greenhouse4View.style.display = 'flex';
        } else if (greenhouses[i].id === "gh5"){
          currentGreenhouse = 5; 
          selectBayByDefault() 
          allGreenhousesView.style.display = 'none';
        	greenhouse1View.style.display = 'none';
        	greenhouse2View.style.display = 'none';
        	greenhouse3View.style.display = 'none';
        	greenhouse4View.style.display = 'none';
        	greenhouse5View.style.display = 'flex';
        }
    });
}

//Select a bay by default to avoid an alert yelling at the user
function selectBayByDefault(){
  for(let i = 0; i < bayContainers.length; i++){
    console.log(currentGreenhouse)
    let targetBayContainer = bayContainers[currentGreenhouse - 1]
    console.log(targetBayContainer)
    let bays = targetBayContainer.getElementsByClassName('bay');
    for(const bay of bays){
      if(!bay.firstElementChild.classList.contains('disabled')){
        bay.firstElementChild.click()
        currentBay = bay.firstElementChild.id.slice(-2)
        console.log(currentBay)
        return
      }
    }
  }
} 


//Display Popup to confirm a reset
	resetBtn.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'flex';
  })
//Confirm a hard reset
 let resetConfirmBtn = document.getElementById('reset-confirm-btn')
	resetConfirmBtn.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
  	//Remove any background status colors from bays
    for(const bayDiv of bayBtns){
    	bayDiv.classList.remove('success')
      bayDiv.classList.remove('selected')
      bayDiv.classList.remove('error')
      bayDiv.classList.remove('in-progress')
    }
    //Remove any bay icon status colors 
    for(const icon of waterIcons){
    	icon.classList.remove('success')
      icon.classList.remove('in-progress')
      icon.classList.remove('error')
    }
    for(const icon of mapIcons){
    	icon.classList.remove('success')
      icon.classList.remove('in-progress')
      icon.classList.remove('error')
    }
    for(const icon of wifiIcons){
    	icon.classList.remove('success')
      icon.classList.remove('in-progress')
      icon.classList.remove('error')
    }
    for(const icon of systemIcons){
    	icon.classList.remove('success')
      icon.classList.remove('in-progress')
      icon.classList.remove('error')
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
    // let bayIcons = overlay.parentNode.getElementsByClassName('bay-icon');
    // for(const bayIcon of bayIcons){
    // 	bayIcon.classList.remove('checked')
    // }
    hideEyeballs()
    resetAdminEyeballs()
    //Hide main action divs
    for(const div of mainActionDivs){
      div.style.display = 'none'
    }
    //Clear currently selected and hide reset Button
    currentBay = ''
    currentAction = ''
    handleResetBtn()
    //Remove Selected Operation Icon Coloring
    for (const icon of operationsIcons){
      icon.classList.remove('active')
    }
    for (const icon of buildingOperationIcons){
      icon.classList.remove('active')
    }
    for (const text of homeOperationTexts){
      text.style.color = 'white'
    }
    //Hide outcome headers
    for(const header of outcomeHeaders){
      header.style.display = 'none'
    }
    for (const text of actionOutcomes){
      text.textContent = '';
    }
    //Hide all action Divs
    for(const div of waterViews){
      div.style.display = 'none'
    }
    for(const div of mappingViews){
      div.style.display = 'none'
    }
    for(const div of wifiViews){
      div.style.display = 'none'
    }
    for(const div of wifiConfigViews){
      div.style.display = 'none'
    }
    for(const div of mpuStatusViews){
      div.style.display = 'none'
    }
    for(const div of mpuConfigViews){
      div.style.display = 'none'
    }
    for(const gear of gearDivs){
      gear.classList.remove('selected')
    }
    for(const div of homeActionDivs){
      div.style.display = 'none'
    }
    outcomeViewHome.style.display = 'none'
    //Navigate back to home
    homeBtn.click()
  })


//Cancel a hard reset
let resetCancelBtn = document.getElementById('reset-cancel-btn')
	resetCancelBtn.addEventListener('click', () => {
  	resetConfirmationOverlay.style.display = 'none'
  })

//Behavior for clicking an operation button in admin mode
for(const btn of adminWaterBtns){
  btn.addEventListener('click', () => {
    handleAdminOperationBtn(btn)
  })
}
for(const btn of adminMappingBtns){
  btn.addEventListener('click', () => {
    handleAdminOperationBtn(btn)
  })
}
for(const btn of adminWifiBtns){
  btn.addEventListener('click', () => {
    handleAdminOperationBtn(btn)
  })
}
for(const btn of adminWifiConfigBtns){
  btn.addEventListener('click', () => {
    handleAdminOperationBtn(btn)
  })
}
for(const btn of adminMpuBtns){
  btn.addEventListener('click', () => {
    handleAdminOperationBtn(btn)
  })
}
for(const btn of adminMpuConfigBtns){
  btn.addEventListener('click', () => {
    handleAdminOperationBtn(btn)
  })
}

function handleAdminOperationBtn(btn){
  let action = btn.lastElementChild.innerHTML
  currentAction = action;
  let actionCategory = btn.className
  //If they have already selected a bay to run a test on:
  if(currentBay){
  //If the icon hasn't been clicked yet...
  if(!btn.firstElementChild.classList.contains('active')){
     //Remove Green Backgrounds from others
     for(const icon of operationsIcons){
      icon.classList.remove('active')
    }
    for(const text of homeOperationTexts){
      text.style.color = 'white'
    }
    btn.firstElementChild.classList.add('active')
    btn.lastElementChild.style.color = '#41EB5C'
    //Also add the highlight colors to the user mode version in case they toggle to that
    colorInUserIconToo()
    //Hide all open operation divs and then display the main container to place the appropriate one
    hideOpenOperationViews()
    for(const div of mainActionDivs){
      div.style.display = 'flex'
    }
  //Show logging outcome divs
  for (const view of outcomeViews){
    view.style.display = 'flex'
  }
    // Display the appropriate action div in the middle  
    if (actionCategory === 'admin-water'){
      for (const view of waterViews){
        view.style.display = 'block'
      }
    } 
    if (actionCategory === 'admin-mapping'){
      for (const view of mappingViews){
        view.style.display = 'flex'
      }
    } 
    if (actionCategory === 'admin-wifi'){
      for (const view of wifiViews){
        view.style.display = 'flex'
      }
    } 
    if (actionCategory === 'admin-wifi-config'){
      for (const view of wifiConfigViews){
        view.style.display = 'flex'
      }
    } 
    if (actionCategory === 'admin-mpu'){
      for (const view of mpuStatusViews){
        view.style.display = 'flex'
      }
    } 
    if (actionCategory === 'admin-mpu-config'){
      for (const view of mpuConfigViews){
        view.style.display = 'flex'
      }
    } 
    //Change the text of the outcome divs to indicate what they clicked on
    for (const text of ghOutcomeNums){
      text.textContent = currentGreenhouse;
    }
    for (const text of bayOutcomeNums){
      text.textContent = currentBay;  
    }
    for (const text of actionOutcomes){
      text.textContent = action;
    }
  } else {
    btn.firstElementChild.classList.remove('active')
    btn.lastElementChild.style.color = 'white'
     //Remove Green Backgrounds from others too
     for(const icon of operationsIcons){
      icon.classList.remove('active')
    }
    for(const text of homeOperationTexts){
      text.style.color = 'white'
    }
    hideOpenOperationViews()
    currentAction = ''
    for (const text of actionOutcomes){
      text.textContent = currentAction;
    }
  }
  
  } else {
  	alert('Select a bay')
  }
}

//Behavior for clicking an operation button in user mode
for(const btn of userWaterBtns){
  btn.addEventListener('click', () => {
    handleUserOperationBtn(btn)
  })
}
for(const btn of userMappingBtns){
  btn.addEventListener('click', () => {
    handleUserOperationBtn(btn)
  })
}

function handleUserOperationBtn(btn){
  let action = btn.lastElementChild.innerHTML;
  currentAction = action
  let actionCategory = btn.className
  //If they have already selected a bay to run a test on:
  if(currentBay){
  //If the icon hasn't been clicked yet...
  if(!btn.firstElementChild.classList.contains('active')){
    //Remove Selected Operation Icon Coloring from other icons if any
    for (const icon of operationsIcons){
      icon.classList.remove('active')
    }
    for (const text of homeOperationTexts){
      text.style.color = 'white'
    }
    btn.firstElementChild.classList.add('active')
    btn.lastElementChild.style.color = '#41EB5C'
    //Also add the highlight colors to the admin mode version in case they toggle to that
    colorInAdminIconToo()
    hideOpenOperationViews()
    //Display the main action div
    for(const div of mainActionDivs){
      div.style.display = 'flex'
    }
    //Show logging outcome divs
    for (const view of outcomeViews){
    view.style.display = 'flex'
    }
     // Display the appropriate action div in the middle  
    if (actionCategory === 'user-water'){
      for (const view of waterViews){
        view.style.display = 'block'
      }
    } 
    if (actionCategory === 'user-mapping'){
      for (const view of mappingViews){
        view.style.display = 'flex'
      }
    }
      //Change the text of the outcome divs to indicate what they clicked on
      for (const text of ghOutcomeNums){
        text.textContent = currentGreenhouse;
      }
      for (const text of bayOutcomeNums){
        text.textContent = currentBay;  
      }
      for (const text of actionOutcomes){
        text.textContent = action;
      }
  } 
  //If they have already selected an option, make in unselectable and take away stling and hide everything
  else {
    btn.firstElementChild.classList.remove('active')
    btn.lastElementChild.style.color = 'white'
     //Remove Green Backgrounds from others too
     for(const icon of operationsIcons){
      icon.classList.remove('active')
    }
    for(const text of homeOperationTexts){
      text.style.color = 'white'
    }
    hideOpenOperationViews()
    currentAction = ''
    for (const text of actionOutcomes){
      text.textContent = currentAction;
    }
  }
  }  else {
  	alert('Select a bay')
  }
}

//Function to hide all operation areas to clear out space for the incoming one that has been clicked
function hideOpenOperationViews(){
  for(const view of waterViews){
    view.style.display = 'none'
  }
  for(const view of mappingViews){
    view.style.display = 'none'
  }
  for(const view of wifiViews){
    view.style.display = 'none'
  }
  for(const view of wifiConfigViews){
    view.style.display = 'none'
  }
  for(const view of mpuStatusViews){
    view.style.display = 'none'
  }
  for(const view of mpuConfigViews){
    view.style.display = 'none'
  }
  for(const view of outcomeViews){
    view.style.display = 'none'
  }
}

// Bay Icons Color Changing
for(const icon of waterIcons){
  icon.addEventListener('click', () => {
    if(!icon.classList.contains('in-progress') && !icon.classList.contains('success') && !icon.classList.contains('error')){
      icon.classList.add('in-progress')
    } else if(icon.classList.contains('in-progress')){
      icon.classList.remove('in-progress')
      icon.classList.add('success')
    } else if (icon.classList.contains('success')){
      icon.classList.remove('success')
      icon.classList.add('error')
    } else if (icon.classList.contains('error')){
      icon.classList.remove('error')
    }
  })
}

for(const icon of mapIcons){
  icon.addEventListener('click', () => {
    if(!icon.classList.contains('in-progress') && !icon.classList.contains('success') && !icon.classList.contains('error')){
      icon.classList.add('in-progress')
    } else if(icon.classList.contains('in-progress')){
      icon.classList.remove('in-progress')
      icon.classList.add('success')
    } else if (icon.classList.contains('success')){
      icon.classList.remove('success')
      icon.classList.add('error')
    } else if (icon.classList.contains('error')){
      icon.classList.remove('error')
    }
  })
}

for(const icon of wifiIcons){
  icon.addEventListener('click', () => {
    if(!icon.classList.contains('in-progress') && !icon.classList.contains('success') && !icon.classList.contains('error')){
      icon.classList.add('in-progress')
    } else if(icon.classList.contains('in-progress')){
      icon.classList.remove('in-progress')
      icon.classList.add('success')
    } else if (icon.classList.contains('success')){
      icon.classList.remove('success')
      icon.classList.add('error')
    } else if (icon.classList.contains('error')){
      icon.classList.remove('error')
    }
  })
}

for(const icon of systemIcons){
  icon.addEventListener('click', () => {
    if(!icon.classList.contains('in-progress') && !icon.classList.contains('success') && !icon.classList.contains('error')){
      icon.classList.add('in-progress')
    } else if(icon.classList.contains('in-progress')){
      icon.classList.remove('in-progress')
      icon.classList.add('success')
    } else if (icon.classList.contains('success')){
      icon.classList.remove('success')
      icon.classList.add('error')
    } else if (icon.classList.contains('error')){
      icon.classList.remove('error')
    }
  })
}

//Homepage Operation Buttons 
for(const gear of gearDivs){
  gear.addEventListener('click', () => {
    for(const gear of gearDivs){
      gear.classList.remove('selected')
    }
    //Reverse any disabled styling from an office view
    for(const btn of buildingOperationBtns){
      btn.style.pointerEvents = 'auto'
      btn.style.opacity = '100'
    }
    if(!gear.classList.contains('selected')){
      gear.classList.add('selected')
      buildingSelected = 'true'
      currentBuilding = gear.parentNode.lastElementChild.firstElementChild.innerHTML;
      currentGear = gear
      ghOutcomeNumHome.textContent = currentBuilding;
      checkIfOfficeSelected()
    } else {
      gear.classList.remove('selected')
      buildingSelected = 'false'
      currentBuilding = ''
    }
  })
}

function checkIfOfficeSelected(){
  //If Office is selected, gray out the water and mapping options
  if(currentBuilding == 'Office'){
    for(const btn of buildingOperationBtns){
      if(btn.lastElementChild.innerHTML == 'Water' || btn.lastElementChild.innerHTML == 'Mapping'){
        btn.style.pointerEvents = 'none'
        btn.style.opacity = '.50'
      }
    }
  }
}

for(const btn of buildingOperationBtns){
  btn.addEventListener('click', () => {
    if(buildingSelected){
      //If they clicked a water or mapping action, call function to re-route them to other page view
      if(btn.classList.contains('water-action-home')){
        handleHomeWaterClicked()
      } else if(btn.classList.contains('mapping-action-home')){
        handleHomeMappingClicked()
      } else {
        //If they didn't click water or mapping, proceed
        outcomeViewHome.style.display = 'flex'
        let action = btn.lastElementChild.innerHTML;
        actionOutcomeHome.textContent = action;
        logDataHome.textContent = 'Log data appears here.';
        statusDataHome.textContent = 'Status data appears here.';
        //Hide all Previous Action Divs 
        for(const div of homeActionDivs){
          div.style.display = 'none'
        }
        //Find the corresponding action div to display
        if(btn.classList.contains('wifi-status-action-home')){
          wifiStatusActionHome.style.display = 'flex'
        }
        if(btn.classList.contains('wifi-config-action-home')){
          wifiConfigActionHome.style.display = 'flex'
        }
        if(btn.classList.contains('mpu-status-action-home')){
          mpuStatusActionHome.style.display = 'flex'
        }
        if(btn.classList.contains('mpu-config-action-home')){
          mpuConfigActionHome.style.display = 'flex'
        }
    
        //If the icon hasn't been clicked yet...
        if(!btn.firstElementChild.classList.add('active')){
         //Remove Selected Operation Icon Coloring
         for (const icon of buildingOperationIcons){
          icon.classList.remove('active')
        }
         for (const text of homeOperationTexts){
          text.style.color = 'white'
        }
        btn.firstElementChild.classList.add('active')
        btn.lastElementChild.style.color = '#41EB5C'
      } else {
        //If the icon has already been selected, unselect it and hide the elements associated
        btn.firstElementChild.classList.remove('active')
        btn.lastElementChild.style.color = 'white'

        for(const div of homeActionDivs){
          div.style.display = 'none'
        }
        outcomeViewHome.style.display = 'none'
        actionOutcomeHome.textContent = '';
      }}
    } else {
      alert('Please select a building target')
    }
  })
}

function handleHomeWaterClicked(){
  let targetGreenhouse = currentGear.parentNode.lastElementChild
  allGreenhousesView.style.display = 'none'
  targetGreenhouse.click()
  for(const div of mainActionDivs){
    div.style.display = 'flex'
  }
  for(const div of waterViews){
    div.style.display = 'block'
  }
  for(const view of outcomeViews){
    view.style.display = 'block'
  }
  //Change the text of the outcome divs to indicate what they clicked on
  for(const header of outcomeHeaders){
  header.style.display = 'flex'
  }
  for (const text of ghOutcomeNums){
    text.textContent = currentGreenhouse;
  }
  for (const text of bayOutcomeNums){
    text.textContent = currentBay;  
  }
  for (const text of actionOutcomes){
    text.textContent = 'Water';
  }
  //Color in icons and text
  for(icon of operationsIcons){
    if(icon.classList.contains('water')){
      icon.classList.add('active')
      icon.nextElementSibling.style.color = '#41EB5C'
    }
  }
}

function handleHomeMappingClicked(){
  let targetGreenhouse = currentGear.parentNode.lastElementChild
  allGreenhousesView.style.display = 'none'
  targetGreenhouse.click()
  for(const div of mainActionDivs){
    div.style.display = 'flex'
  }
  for(const div of mappingViews){
    div.style.display = 'flex'
  }
  for(const view of outcomeViews){
    view.style.display = 'block'
  }
  //Change the text of the outcome divs to indicate what they clicked on
  for(const header of outcomeHeaders){
  header.style.display = 'flex'
  }
  for (const text of ghOutcomeNums){
    text.textContent = currentGreenhouse;
  }
  for (const text of bayOutcomeNums){
    text.textContent = currentBay;  
  }
  for (const text of actionOutcomes){
    text.textContent = 'Mapping';
  }
  //Color in icons and text
  for(icon of operationsIcons){
    if(icon.classList.contains('mapping')){
      icon.classList.add('active')
      icon.nextElementSibling.style.color = '#41EB5C'
    }
  }
}
