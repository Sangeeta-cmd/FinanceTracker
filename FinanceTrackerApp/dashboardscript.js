document.addEventListener('DOMContentLoaded', () => {
    loadTransactionsFromLocalStorage();

    let incomeForm = document.querySelector('.transaction-forms .add-income form')
    let expenseForm = document.querySelector('.transaction-forms .add-expense form')

    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('username').value;
        const incomeAmt = document.getElementById('incomeAmt').value;
        const date = document.getElementById('date').value;
        const tagName = document.getElementById('dropdown-list').value;
        const category = 'income';

        updateAmounts(incomeAmt, category)
        updateTransitionList(name, category, incomeAmt, date, tagName)
        incomeForm.reset()
    })

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const expenseAmt = document.getElementById('expenseAmt').value;
        const date = document.getElementById('expenseAmtDate').value;
        const tagName = document.getElementById('expense-dropdown-list').value;
        const category = 'expense';

        updateAmounts(expenseAmt, category)
        updateTransitionList(name, category, expenseAmt, date, tagName)
        expenseForm.reset()
    })

});

function updateTransitionList(name, category, Amt, date, tagName) {
    const table = document.querySelector('.transaction-list table')
    let row = document.createElement('tr')

    let nameCell = document.createElement('td')
    nameCell.textContent = name;
    row.appendChild(nameCell)

    let categoryCell = document.createElement('td')
    categoryCell.innerText = category;
    row.appendChild(categoryCell)

    let amtCell = document.createElement('td')
    amtCell.textContent = Amt;
    row.appendChild(amtCell)

    let tagCell = document.createElement('td')
    tagCell.innerText = tagName;
    row.appendChild(tagCell)

    let dateCell = document.createElement('td')
    dateCell.innerHTML = date;
    row.appendChild(dateCell)

    let cancelBtn = document.createElement('button')
    cancelBtn.innerText = 'Delete'
    let buttonCell = document.createElement('td')
    buttonCell.appendChild(cancelBtn)
    row.appendChild(buttonCell)

    table.appendChild(row)

    saveTransactionToLocalStorage({ name, category, Amt, date, tagName })

    cancelBtn.addEventListener('click', () => {
        console.log('click')
        table.removeChild(row)
        deleteTransactionAmt(Amt, category)
        removeTransactionFromLocalStorage(Amt, category)
    })
}


let balanceAmtH2 = document.querySelector('#balanceSheet h2 span')
let incomeAmtH2 = document.querySelector('#incomeSheet h2 span')
let expenseAmtH2 = document.querySelector('#expenseSheet h2 span')
let balanceAmt = Number(balanceAmtH2.innerText)
let incomeAmt = Number(incomeAmtH2.innerText)
let expenseAmt = Number(expenseAmtH2.innerText)

function updateAmounts(amt, category) {
    amt = Number(amt)
    if (category === 'income') {
        if (incomeAmt === 0) {
            incomeAmt = amt
        } else {
            incomeAmt = incomeAmt + amt
        }
        balanceAmt = balanceAmt + amt;
        incomeAmtH2.innerText = String(incomeAmt)
        balanceAmtH2.innerText = String(balanceAmt)
    } else {
        if (expenseAmt === 0) {
            expenseAmt = amt;
        } else {
            expenseAmt = expenseAmt + amt
        }
        balanceAmt = balanceAmt - amt;
        expenseAmtH2.innerText = String(expenseAmt)
        balanceAmtH2.innerText = String(balanceAmt)
    }
}

function deleteTransactionAmt(amt, category) {
    amt = Number(amt)
    if (category === 'income') {
        incomeAmt = incomeAmt - amt
        balanceAmt = balanceAmt - amt;
        incomeAmtH2.innerText = String(incomeAmt)
        balanceAmtH2.innerText = String(balanceAmt)
    } else {
        expenseAmt = expenseAmt - amt
        balanceAmt = balanceAmt - amt;
        expenseAmtH2.innerText = String(expenseAmt)
        balanceAmtH2.innerText = String(balanceAmt)
    }
}


function saveTransactionToLocalStorage(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactionsFromLocalStorage() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        // Check if the transaction is already in the table
        const existingRows = document.querySelectorAll('.transaction-list .list table tbody tr');
        let exists = false;

        existingRows.forEach(row => {
            const amtCell = row.cells[2].textContent;
            const categoryCell = row.cells[1].textContent;
            if (amtCell === transaction.Amt && categoryCell === transaction.category) {
                exists = true;
            }
        });

        if (!exists) {
            updateTransitionList(transaction.name, transaction.category, transaction.Amt, transaction.date, transaction.tagName);
        }

    });

}

function removeTransactionFromLocalStorage(Amt, category) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(transaction => !(transaction.Amt === Amt && transaction.category === category));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


