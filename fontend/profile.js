const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('Id');
const profileData = localStorage.getItem(`Profile${id}`);
const profiledisplay = document.getElementById('profileModal');
const sendingMoneyModal = document.getElementById('sendMoneyModal');
const profile = JSON.parse(profileData);
const transactionModal = document.getElementById('transactionModal');
const transactionTableBody = document.getElementById('transactionTableBody');


function displayProfile(){

    if (!profileData) {
        console.error("No profile found for this ID");
        // window.location.href = "login.html";
        return;
    }
    
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




function openSendMoneyModal(event){
    event.preventDefault();
    sendingMoneyModal.classList.remove('hidden');
};

function closeSendMoneyModal(){
    sendingMoneyModal.classList.add('hidden');
};


function openTransactionModal(event){
    event.preventDefault();
    transactionModal.classList.remove('hidden');
};

function closeTransactionModal(){
    transactionModal.classList.add('hidden');
};



function sendMoney(event){
    event.preventDefault();
    const accountNumber = document.getElementById('toAccountNumber').value;
    const amount = document.getElementById("sendAmount").value;
    const pincode = document.getElementById('sendingPin').value;
    const fromAccount = profile.account;
    if (!accountNumber || !amount || !pincode) {
        alert("All fields are required");
        return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("Amount must be a positive number");
        return;
    }
    

    const transactionDetails = {
        from_account: fromAccount,
        to_account: accountNumber,
        amount: Number(amount)
    }

    if(pincode !== profile.pincode){
        alert("Incorrect pincode");
        return;
    }

    axios.post("http://localhost:3008/transaction", transactionDetails)
    .then(response => {
        alert(response.data.message);
        closeSendMoneyModal();
    })
    .catch(error => {
    if (error.response) {
      alert(`Error: ${error.response.data || error.response.statusText}`);
    } else if (error.request) {
      alert("No response from server. Please try again later.");
    } else {
      alert(`Error: ${error.message}`);
    }
})
}


function seeTransaction(event){
    event.preventDefault();
    openTransactionModal(event);
    axios.get(`http://localhost:3008/transaction/${id}`)
    .then(response => {
        transactionTableBody.innerHTML = "";
        const transactions = response.data;
        transactions.forEach((transaction)=>{
            const row = document.createElement('tr');
            const transactionIdCell = document.createElement('td');
            const amountCell = document.createElement('td');
            const fromAccountCell = document.createElement('td');
            const toAccountCell = document.createElement('td');
            const dateCell = document.createElement('td');
            transactionIdCell.innerText = transaction.transaction_id;
            amountCell.innerText = transaction.amount;
            fromAccountCell.innerText = transaction.from_account;
            toAccountCell.innerText = transaction.to_account;
            dateCell.innerText = new Date(transaction.transacted_at).toLocaleString();
            row.appendChild(transactionIdCell);
            row.appendChild(amountCell);  
            row.appendChild(fromAccountCell);
            row.appendChild(toAccountCell);
            row.appendChild(dateCell);
            transactionTableBody.appendChild(row);
        })
    })
}
