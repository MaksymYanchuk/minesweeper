function username(state) {
  let hasError = false;
  const playerName =  document.querySelector('.username');

  if (localStorage.getItem('username')){
    state.player = localStorage.getItem('username');
  } 
  playerName.innerHTML = state.player;

  const target = document.querySelector('.header__player-wrapper'),
        modalWindow = document.querySelector('.modal-username'),
        btn = document.querySelector('.modal-username__btn'),
        input = document.querySelector('.modal-username__input');

  target.addEventListener("click", () => openModal());

  btn.addEventListener("click", () => changeName());

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') =='') {
      closeModal();
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
        closeModal();   
    }
});

  function openModal() {
    hasError = false;
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';

    if (hasError) {
      const failureMessage = modalWindow.querySelector('.failure-мessage')
      failureMessage.remove();
    }
  }

  function changeName() {

    if (input.value.length >2 && input.value.length <=11) {
    state.player = input.value;
    localStorage.setItem('username', state.player);
    playerName.innerHTML = state.player;
    closeModal();

    } else {
      const parent = document.querySelector('.modal-username__content');

      if (!hasError) {
        hasError = true;
        const failureMessage = document.createElement('div');
        failureMessage.innerHTML = 'Nickname length must be from 3 to 11 letters';
        failureMessage.classList.add('failure-мessage')
        parent.insertAdjacentElement('afterbegin', failureMessage);

        setTimeout(()=> {
          hasError = false;
          failureMessage.remove();
        }, 5000)
      }
    }
  }

}

export default username;
