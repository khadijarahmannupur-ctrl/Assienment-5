// console.log('hello')

document.getElementById('login-btn')
   .addEventListener('click', ()=> {
    // 1-get the username
    // 2-get the password
    // 3-match the condition for username and password
    // 3-1:if true ---> go to main page
    // 3-2:if false ---> alert ---> return
    const inputName = document.getElementById('inputName');
    const inputNameValue = inputName.value;
    const inputPassword = document.getElementById('inputPassword');
    const inputPasswordValue = inputPassword.value;
    if(inputNameValue === 'admin' && inputPasswordValue === 'admin123'){
        console.log('user name and password match')
        window.location.assign('/home.html')
    }
    else{
        alert('login failed');
        return;
    }

   })