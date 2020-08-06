var installBtn = document.querySelector('.a2hs-btn');
var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  console.log(e);
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  if(localStorage.getItem('appInstalled') === 'true')
  showInstallPrompt();
});

window.addEventListener('DOMContentLoaded', () => {
  let displayMode = 'browser tab';
  if (navigator.standalone) {
    displayMode = 'standalone-ios';
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    displayMode = 'standalone';
  }
  // Log launch display mode to analytics
  hidePrompt();
  console.log('DISPLAY_MODE_LAUNCH:', displayMode);
});


window.addEventListener('appinstalled', (evt) => {
  // Log install to analytics
  localStorage.setItem('appInstalled', 'true');
  console.log('INSTALL: Success');
  hidePrompt();
});

function showInstallPrompt(){
  document.querySelector('.a2hs').style.animationName = "a2hs";
}

function hidePrompt(){
  document.querySelector('.a2hs').style.display = "a2hs";
  document.querySelector('.instPrompt').style.display = "none";

}

var installBtnShow = document.querySelector('.a2hs-btn');

installBtnShow.addEventListener('click', function(e){
  deferredPrompt.prompt();
  installBtnShow.style.display = "none";
  document.querySelector('.instPrompt').style.display = "flex";
  deferredPrompt.userChoice.then(function(choiceResult){
    if(choiceResult.outcome === 'accepted'){
      console.log('Installation Accepted by User!');
    }
    else{
      console.log('Installation Dismissed!');
    }
  });
});