


const sendingMoneyModal = document.getElementById('SendMoneyModal');
const adminLoginModal = document.getElementById('AdminloginModal');
const depositModal = document.getElementById('depositModal');
const withdrawModal = document.getElementById('withdrawModal');
const accountModal = document.getElementById('AccountsModal');
const transactionModal = document.getElementById('transactionModal');
const accountsBodyTable = document.getElementById('accountsBodyTable');

function openSendMoneyModal(event){
    event.preventDefault();
    sendingMoneyModal.classList.remove('hidden');
};

function closeSendMoneyModal(){
    sendingMoneyModal.classList.add('hidden');
};


function openAdminLoginModal(event){
    event.preventDefault();
    adminLoginModal.classList.remove('hidden');
};

function closeAdminLoginModal(){
    adminLoginModal.classList.add('hidden');
};

function openDepositModal(event){
    event.preventDefault();
    depositModal.classList.remove('hidden');
};

function closeDepositModal(){
    depositModal.classList.add('hidden');
};

function openWithdrawModal(event){
    event.preventDefault();
    withdrawModal.classList.remove('hidden');
};

function closeWithdrawModal(){
    withdrawModal.classList.add('hidden'); 
};


function openAccounts(event){
    event.preventDefault();
    accountModal.classList.remove('hidden');
    displayAccounts(event);
};

function closeAccounts(){
    accountModal.classList.add('hidden'); 
};


function openTransactionModal(event){
    event.preventDefault();
    transactionModal.classList.remove('hidden');
    closeAccounts();
};

function closeTransactionModal(){
    transactionModal.classList.add('hidden');
    openAccounts(event);
};



function sendMoney(event){
    event.preventDefault();
    const fromAccount = document.getElementById('fromAccountNumber').value;
    const accountNumber = document.getElementById('toAccountNumber').value;
    const amount = document.getElementById("transactionAmount").value;
    if (!accountNumber || !amount || !fromAccount) {
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


function adminLogin(event){
    event.preventDefault();
    const adminPin = document.getElementById('adminPin').value;
    if (!adminPin) {
        alert("Admin pin is required");
        return;
    }
    if (isNaN(Number(adminPin)) || adminPin.length !== 6){
        alert("Admin pin must be a 6 digit number");
        return;
    }
    axios.get(`http://localhost:3008/admin`)
    .then(response => {
        const pin = response.data.pincode;
        if (pin !== adminPin){
            alert("Incorrect admin pin");
        }else if(pin === adminPin){
        alert("Admin Login Successful");
        closeAdminLoginModal();
        }

    })
}


function depositMoney(event){
    event.preventDefault();
    const depositAccount = document.getElementById('depositAccount').value;
    const depositAmount = document.getElementById('depositAmount').value;
    if (!depositAccount || !depositAmount) {
        alert("All fields are required");
        return;
    }
    if (isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
        alert("Deposit amount must be a positive number");
        return;
    }
    const depositDetails = {
        to_account: depositAccount,
        amount: Number(depositAmount)
    }
    axios.post(`http://localhost:3008/deposit`, depositDetails)
    .then(response => {
        alert(response.data.message);
        closeDepositModal();
    })
}


function withdrawMoney(event){
    event.preventDefault();
    const withdrawAccount = document.getElementById('withdrawAccount').value;
    const withdrawAmount = document.getElementById('withdrawAmount').value;
    if (!withdrawAccount || !withdrawAmount) {
        alert("All fields are required");
        return;
    }
    if (isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) {
        alert("Deposit amount must be a positive number");
        return;
    }
    const depositDetails = {
        from_account: withdrawAccount,
        amount: Number(withdrawAmount)
    }
    axios.post(`http://localhost:3008/withdraw`, depositDetails)
    .then(response => {
        alert(response.data.message);
        closeWithdrawModal();
    })
}


function displayAccounts(event) {
    event.preventDefault();
    axios.get(`http://localhost:3008/acc`)
    .then(response => {
        accountsBodyTable.innerHTML = "";
        const accounts = response.data;
        accounts.forEach((acc)=>{
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            const accountCell = document.createElement('td');
            const balanceCell = document.createElement('td');
            const createdCell = document.createElement('td');
            const TransactionCell = document.createElement('td');
            idCell.textContent = acc.id;
            accountCell.textContent = acc.account;
            balanceCell.textContent = acc.balance;
            createdCell.textContent = new Date(acc.created_at).toLocaleString();
            TransactionCell.innerHTML = `<button class="bg-gray-900 text-white px-4 py-2 rounded" onclick="seeTransaction(event, ${acc.id})">See Transactions</button>`;
            row.appendChild(idCell);
            row.appendChild(accountCell);
            row.appendChild(balanceCell);
            row.appendChild(createdCell);
            row.appendChild(TransactionCell);
            accountsBodyTable.appendChild(row);
        })
    })
}


function seeTransaction(event, id){
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


