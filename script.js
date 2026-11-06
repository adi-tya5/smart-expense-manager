let transactions = [];

//2.select html elements

const form=document.getElementById('transaction-form');
const descriptionInput=document.getElementById('description');
const amountInput=document.getElementById('amount');
const typeInput=document.getElementById('type');
const balanceElement=document.getElementById('balance');
const incomeElement=document.getElementById('income');
const expenseElement=document.getElementById('expense');

const transactionList=document.getElementById('transaction-list');

//3.Format Number as Indian Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}

//4.update summary
function updateSummary(){
    let totalIncome=0;
    let totalExpense=0;

    transactions.forEach(function(transaction){

        if(transaction.type==="income"){
            totalIncome +=transaction.amount;
        }else{
            totalExpense+=transaction.amount;
        }
    });

    const balance=totalIncome-totalExpense;
    incomeElement.textContent=formatCurrency(totalIncome);
    expenseElement.textContent=formatCurrency(totalExpense);
    balanceElement.textContent=formatCurrency(balance);
}

//5.Display Transactions
function displayTransactions(){
    transactionList.innerHTML='';
      if (transactions.length === 0) {
        transactionList.innerHTML = `
            <tr>
                <td colspan="4" class="empty-message">
                    No transactions yet.
                </td>
            </tr>
        `;
        return;
    }

    transactions.forEach(function(transaction) {

        const row = document.createElement("tr");

        const typeClass =
            transaction.type === "income"
                ? "income-text"
                : "expense-text";

        const sign =
            transaction.type === "income" ? "+" : "-";

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = transaction.description;

        const typeCell = document.createElement("td");
        typeCell.textContent = transaction.type;
        typeCell.className = typeClass;

        const amountCell = document.createElement("td");
        amountCell.textContent =
            sign + formatCurrency(transaction.amount);
        amountCell.className = typeClass;

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteTransaction(transaction.id);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(descriptionCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        transactionList.appendChild(row);

    });
}


// 6. Add new transaction
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    updateSummary();
    displayTransactions();

    form.reset();

});


// 7. Delete transaction
function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    updateSummary();
    displayTransactions();

}


// 8. Initial dashboard update
updateSummary();
displayTransactions();



