
const profiledisplay = document.getElementById('profileModal');

function displayProfile(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('Id');

    const profileData = localStorage.getItem(`Profile${id}`);

    if (!profileData) {
        console.error("No profile found for this ID");
        window.location.href = "login.html";
        return;
    }
    const profile = JSON.parse(profileData);
    const usersAccount = profile.account;
    const balance = profile.balance;
    const createdAt = profile.created_at;
    const updatedAt = profile.updated_at;

    const image = document.createElement('img');
    const accountNumber = document.createElement('p');
    const accountBalance = document.createElement('p');
    const accountCreated = document.createElement('p');
    const accountUpdated = document.createElement('p');
    accountNumber.textContent = `Account Number: ${usersAccount}`;
    accountBalance.textContent = `Account Balance: Nu.${balance}`;
    accountCreated.textContent = `Account Created At: ${new Date(createdAt).toLocaleString()}`;
    accountUpdated.textContent = `Account Updated At: ${new Date(updatedAt).toLocaleString()}`;
    image.src = "https://thumbs.dreamstime.com/b/pig-head-line-icon-outline-vector-sign-linear-pictogram-white-symbol-logo-illustration-89696762.jpg?w=768"
    image.alt = "Profile Picture";
    image.setAttribute('class', 'rounded-xl w-26 h-26 bg-cover bg-center mx-auto object-cover shadow-xl')
    profiledisplay.appendChild(image);
    profiledisplay.appendChild(accountNumber);
    profiledisplay.appendChild(accountBalance);
    profiledisplay.appendChild(accountCreated);
    profiledisplay.appendChild(accountUpdated);

    
}
displayProfile();



