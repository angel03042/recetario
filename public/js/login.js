document.querySelector('.btn1').addEventListener('click', (event)=> {
    event.preventDefault()

    const usuario = document.querySelector('#usuario').value;
    const password = document.querySelector('#password').value;

    let verificacion = document.querySelector('#verificacionId');
    let verificacion_incorrectos = document.querySelector('#incorrectosId');

    let labels = document.querySelectorAll('#labels');
    
    if(usuario === '' && password === '') {
        labels.forEach(labelsInput => {
            labelsInput.style.color = 'red';
        })
        verificacion.style.display = 'block';
    } else {
        if(usuario === 'Angel03' && password === 'afbr0304') {
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('password', password);
            window.location = 'public/pages/usuario.html'
        } else {
            verificacion.style.display = 'none';
            verificacion_incorrectos.style.display = 'block'
        }
    }
})
