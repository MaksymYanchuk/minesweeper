function copyText(target, copyTextSelector) {
    let copied = false;

    target.addEventListener('click', copyText) 




    function copyText() {

        if (!copied) {
            const textElement = document.querySelector(copyTextSelector);
            const tempInput = document.createElement('input');
            tempInput.setAttribute('value', textElement.innerText);
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            const copyMassage = document.createElement('div');
            copyMassage.innerHTML = 'Сopied';
            copyMassage.classList.add('copy-message', 'fadeIn');
            copied = true;

            document.querySelector('.footer__card').insertAdjacentElement('beforeend', copyMassage);

            setTimeout(()=> {
                copyMassage.remove();
                copied = false;
              }, 2000)
            
        }   
    }

}

export default copyText;