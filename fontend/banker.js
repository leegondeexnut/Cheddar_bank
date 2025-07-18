const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const newbieId = document.getElementById('newbieId');
const newbiePassword = document.getElementById('newbiePassword');
const userId = document.getElementById('userIdInput');
const userPassword = document.getElementById('password');

function closeRegistration(){
    registrationForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

function openRegistration(){
    registrationForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
}


function register(event){
    event.preventDefault();
    const account = newbieId.value;
    const pincode = newbiePassword.value;

    if (!account || !pincode) {
        alert("All fields are required");
        return;
    }
    if (isNaN(Number(pincode)) || pincode.length !== 6) {
        alert("Pincode must be a number and 6 digits long");
        return;
    }
const newbieDetails = {
    account,
    pincode
};
axios.post("http://localhost:3008/register", newbieDetails)
.then(response => {
    alert(response.data.message);
    closeRegistration();
})

    
}

function submitUserId(){
    const account = userId.value;
    const pincode = userPassword.value;
    if(!account || !pincode){
      return  alert("All fields should be filled.")
    }
    if(isNaN(Number(pincode)) || pincode.length !== 6) {
        return alert("Pincode must be a number and 6 digits long");
    }
    const accountDetails = {
        account,
        pincode
    }
    axios.post("http://localhost:3008/login", accountDetails)
    .then(response => {
        alert(response.data.message);
        window.location.href = "page.html"
    })
}

