// Check the color in local storage

const userColor = localStorage.getItem('color-option'); // get the color key name and put it in var.
// Check if the value is empty or not
if (userColor !== null) {
  // If not empty print the color from local storage that we get and replace it.
  document.documentElement.style.setProperty('--main-color', userColor);
  // Remove active from elements
  document.querySelectorAll('.colors-list li').forEach(element => {
    element.classList.remove('active'); // Remove active class
    // Check if the color picked from user === user color var in local storage
    if(element.dataset.color === userColor){
      element.classList.add('active'); // add the active class
    };
  });
};

let bgOption = true;
let bgInterval;

// Check if there's data in local storage
let bgDataItem = localStorage.getItem('bg-option');
if(bgDataItem !== null) {
  if(bgDataItem === 'true') {
    bgOption = true;
  }else{
    bgOption = false;
  }
  // Remove all class active from elements
  document.querySelectorAll('.random-bg span').forEach(element => {
    element.classList.remove('active');
  });

  if(bgDataItem === 'true'){
    document.querySelector('.random-bg .yes').classList.add('active');
  }else{
    document.querySelector('.random-bg .no').classList.add('active');
  };
};

// Setting Box
//Setting Vars
// let toggleSettingWindow = document.querySelector('.setting-box');
// let toggleSettingIcon = document.querySelector('.fa-gear');
// Make onclick function on vars to toggle
document.querySelector('.toggle-settings .fa-gear').onclick = function (){
  this.classList.toggle('fa-spin');
  document.querySelector('.setting-box').classList.toggle('open');
};


// Switch color on elements
const colorLi = document.querySelectorAll('.colors-list li');
// Looping on li and add event listner
colorLi.forEach(li => {
  li.addEventListener('click', (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    // Set color in LocalStorage
    localStorage.setItem('color-option', e.target.dataset.color); // Saving the color picked in key name.
    // Remove active from elements
    handelActive(e);
  });
});

// Switch BG randomly
const randomBg = document.querySelectorAll('.random-bg span');
// Looping on span
randomBg.forEach(span => {
  span.addEventListener('click', (e) => {
    handelActive(e);
      // Check if data background is yes or no
    if(e.target.dataset.background === 'yes') { // If yes
      bgOption = true; // Make the background option true
      bgOptionR() // And run the function

      localStorage.setItem('bg-option', true);
    }else{ // If no
      bgOption = false; // Make the bg option false
      clearInterval(bgInterval); // And clear the interval

      localStorage.setItem('bg-option', false);
    }
  });
});


// First Changing Bg Randomly
// Setting lanfing Page variable
let landingPage = document.querySelector('.landing-page');
// Setting an array of images
let changingBg = ['01.jpg', '02.jpg', '03.jpg', '04.jpg'];

// Create afunction to check if the back ground option is true
function bgOptionR () {

  if(bgOption === true) {
    bgInterval = setInterval(() => {
      // Get a random number
      let randomNumber = Math.floor(Math.random() * changingBg.length)
      // Changing the background image randomly
      landingPage.style.backgroundImage = 'url("/styles/images/'+ changingBg[randomNumber] + '")';
    }, 10000);
  }
}
bgOptionR();


// Progress Skills vars

let skills = document.querySelector('.skills');

window.onscroll = function () {
  // Get scroll top
  let top = skills.offsetTop;
  // Get scroll height
  let height = skills.offsetHeight;
  // Get window inner height
  let innerHeight = this.innerHeight;
  // Get page scroll y
  let pageScroll = this.pageYOffset;

  if(pageScroll > (top + height - innerHeight)) {
    // console.log('Yes');
    let skillProgress = document.querySelectorAll('.skill-progress span');
    skillProgress.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}

// Create overlay element
let gallery = document.querySelectorAll('.image-box img');
// Looping on the overlay imgs
gallery.forEach(img => {
  img.addEventListener('click', (e) => {
    let overlayBox = document.createElement('div'); // Create div element to contain overlay popup
    overlayBox.className = 'overlay-popup'; // Create class name to the overlay
    document.body.appendChild(overlayBox); // Append the overlay we created to the body
    // Create PopUp Element
    let popup = document.createElement('div');
    popup.className = 'popup-box';

    // Create img alt
    if(img.alt !== null) {
      let imgHeading = document.createElement('h3');
      let imgHeadingText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgHeadingText);
      popup.appendChild(imgHeading);
    }

    //Create imags
    let popupImg = document.createElement('img');
    popupImg.src = img.src;
    popup.appendChild(popupImg);
    // Append popup to the body
    document.body.appendChild(popup);

    //Creat close window button
    let closeButton = document.createElement('span');
    // Create span text to contain x
    let closeButtonText = document.createTextNode('X');
    // Append the text to the span
    closeButton.appendChild(closeButtonText);
    // Create a class name to span so we can style it with CSS
    closeButton.className = 'close-button';

    // Append the close button we 've created to the popup box
    popup.appendChild(closeButton);
  })
});

// Close the PopUp Window
document.addEventListener('click', (e) => {
  if(e.target.className === 'close-button') {
    e.target.parentElement.remove();
    // Remove Overlay
    document.querySelector('.overlay-popup').remove();
  }
});

// Select all Section to scroll on with nav-Bullets

const bullets = document.querySelectorAll('.nav-bullets .bullet');
const links = document.querySelectorAll('.links a');

function scroll(elements) {
  elements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      });


    });
  });

};
scroll(bullets);
scroll(links);

// Create add/remove active function

function handelActive(ha) {
  ha.target.parentElement.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active'); // Remove active class
    // Add active class to elements
  });
  ha.target.classList.add('active');
};


// Show or Hide Bullets

// Set Vars
let bulletSpan = document.querySelectorAll('.show-bullets span');
let bulletNav = document.querySelector('.nav-bullets');
let bulletLocalstorage = localStorage.getItem('bulletsLs');

if (bulletLocalstorage !== null) {
  bulletSpan.forEach(span => {
    span.classList.remove('active');
  });

  if(bulletLocalstorage === 'block') {
    bulletNav.style.display = 'block';
    document.querySelector('.show-bullets .yes').classList.add('active');
  }else{
    bulletNav.style.display = 'none';
    document.querySelector('.show-bullets .no').classList.add('active');
  }


}

bulletSpan.forEach(span => {
  span.addEventListener('click', (e) => {

    if(span.dataset.show === 'show') {

      bulletNav.style.display = 'block';
      localStorage.setItem('bulletsLs', 'block');

    }else{

      bulletNav.style.display = 'none';
      localStorage.setItem('bulletsLs', 'none');
    }
    handelActive(e);
  });
});


// Create Reset Button to Reset Option Box
document.querySelector('.reset-option').onclick = function() {
  // Clear all the data in the local storage
  // localStorage.clear();

  // Clear the data o choose to be clear only
  localStorage.removeItem('color-option');
  localStorage.removeItem('bg-option');
  localStorage.removeItem('bulletsLs');

  // Reload the page after clearing the local storage
  window.location.reload();
}


// Toggle Menu
let menuBtn = document.querySelector('.toggle-menu');
let linkMenu = document.querySelector('.links');


menuBtn.onclick = function (e) {
  e.stopPropagation();
  // Toggle the class to the toggle menu to appear the arrow
  this.classList.toggle('menu-appear');

  // Show the menu with the arrow when click on the menu
  linkMenu.classList.toggle('open');

}

// Close open menu when click anywhere on the page
document.addEventListener('click', (e) => {
  if (e.target !== menuBtn && e.target !== linkMenu) {
    if(linkMenu.classList.contains('open')) {
      menuBtn.classList.toggle('menu-appear');

      linkMenu.classList.toggle('open');
    }
  };
});

linkMenu.onclick = function (e) {
  e.stopPropagation();
}



























