var installBtn = document.querySelector('.a2hs-btn');
var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  console.log(e);
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPrompt();
});

function showInstallPrompt(){
  document.querySelector('.a2hs').getElementsByClassName.animationName = "a2hs";
}

var installBtnShow = document.querySelector('.a2hs-btn');

installBtnShow.addEventListener('click', function(e){
  deferredPrompt.prompt();

  deferredPrompt.userChoice.then(function(choiceResult){
    if(choiceResult.outcome === 'accepted'){
      console.log('Installation Accepted by User!');
    }
    else{
      console.log('Installation Dismissed!');
    }
  });
});