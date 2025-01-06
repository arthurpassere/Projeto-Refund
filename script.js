const amount = document.getElementById("amount")
const form = document.querySelector("form")
const expense = document.getElementById("expense")
const totalExpenses = document.getElementById("total-expenses")
const category = document.getElementById("category")
const lists = document.querySelector("ul")
const aside = document.querySelector("aside")
const li = document.querySelector("li")
const totalAmount = document.querySelector("h2")

amount.oninput = ()=>{
  let value = amount.value.replace(/[^\d.,]/g, '') // Regex para não aceitar letras
  amount.value = value
}

let numSolicitations =  0
let totalSolicitations = 0.00

form.onsubmit = (e) =>{
  e.preventDefault()

  let solicitation = {
    name: expense.value,
    amount: amount.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].textContent, 
  }

  updateTotals(solicitation)
  addExpense(solicitation)
}

function moneyFormat(money){
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(money);
}

function addExpense(solicitation){

  const newLi = document.createElement("li");
  newLi.className = "expense";
  
  const typeIcon = document.createElement("img");
  typeIcon.setAttribute("src", `./img/${solicitation.category_id}.svg`);
  typeIcon.setAttribute("alt", "Ícone de tipo da despesa");
  newLi.appendChild(typeIcon);

  const newDiv = document.createElement("div");
  newDiv.className = "expense-info";

  const expName = document.createElement("strong");
  expName.textContent = solicitation.name;

  const catName = document.createElement("span");
  catName.textContent = solicitation.category_name;

  newDiv.appendChild(expName);
  newDiv.appendChild(catName);
  newLi.appendChild(newDiv);

  const expAmount = document.createElement("span")
  expAmount.className = "expense-amount"

  const amountSimble = document.createElement("small")
  amountSimble.textContent = "R$"
  expAmount.appendChild(amountSimble)
  expAmount.textContent += (" " + moneyFormat(parseFloat(solicitation.amount.replace(",","."))))

  newLi.appendChild(expAmount)

  const removeIcon = document.createElement("img")
  removeIcon.setAttribute("src", "./img/remove.svg")
  removeIcon.setAttribute("alt", "remover")
  removeIcon.className = "remove-icon"

  removeIcon.addEventListener("click", (e) => {
    lists.removeChild(newLi);
    numSolicitations -= 1;
    totalSolicitations -= parseFloat(solicitation.amount.replace(',', '.'));
    totalExpenses.textContent = (numSolicitations + " despesas");
    totalAmount.innerHTML = `<small>R$</small> ${moneyFormat(totalSolicitations)}`;
    if (numSolicitations == 0 && totalSolicitations != 0){
      totalSolicitations = 0
      totalAmount.innerHTML = `<small>R$</small> ${moneyFormat(totalSolicitations)}`
  }});


  newLi.appendChild(removeIcon)
  lists.appendChild(newLi)

  formClear()
}

function updateTotals(solicitation){
  numSolicitations += 1
  totalExpenses.textContent = (numSolicitations + " despesas") // update total expenses value
  
  totalSolicitations += parseFloat(solicitation.amount.replace(',', '.'));
  totalAmount.innerHTML = `<small>R$</small> ${moneyFormat(totalSolicitations)}`;

}

function formClear(){
  amount.value = ""
  expense.value = ""
  category.value = ""
}
