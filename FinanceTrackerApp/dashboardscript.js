

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

const table = document.querySelector('.transaction-list table')
const tbody = document.getElementById('table-body')

function updateTransitionList(name, category, Amt, date, tagName) {
    let row = tbody.insertRow();

    let nameCell = row.insertCell();
    nameCell.textContent = name
    let categoryCell = row.insertCell();
    categoryCell.innerText = category;
    let amtCell = row.insertCell();
    amtCell.textContent = Amt;
    let tagCell = row.insertCell();
    tagCell.innerText = tagName;
    let dateCell = row.insertCell()
    dateCell.innerText = date;
    let cancelCell = row.insertCell()
    cancelCell.innerText = 'Delete'
    cancelCell.classList.add("cancelBtn-style")

    table.appendChild(row)

    saveTransactionToLocalStorage();

    // cancelBtn.addEventListener('click', () => {
    //     console.log('click')
    //     table.removeChild(row)
    //     deleteTransactionAmt(Amt, category)
    //     // removeTransactionFromLocalStorage(Amt, category)
    // })
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


function saveTransactionToLocalStorage() {
    let tableData = [];
    let rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
        let rowData = [];
        let cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].innerText)
        }
        tableData.push(rowData)
    }
    
    localStorage.setItem('transactions', JSON.stringify(tableData));
}

function loadTransactionsFromLocalStorage() {
    let tableData = JSON.parse(localStorage.getItem("transactions"))
    if (tableData) {
        console.log("clicked ", tableData)
        tableData.forEach(rowData => {
            let newRow = tbody.insertRow();
            rowData.forEach(cell => {
                let newCell = newRow.insertCell();
                newCell.innerText = cell
            })
        });
    }
}

function removeTransactionFromLocalStorage(Amt, category) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(transaction => !(transaction.Amt === Amt && transaction.category === category));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


loadTransactionsFromLocalStorage();