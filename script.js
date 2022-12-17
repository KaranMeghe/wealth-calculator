const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const millionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWelthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  console.log(data);
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// doubleMoney
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Only Millionaries
function onlyMillionaries() {
  data = data.filter((rich) => rich.money > 1000000);
  console.log(data);
  updateDOM();
}

// calculate welth
function calculateWelth() {
  const total = data.reduce((accumulator, nextValue) => {
    return (accumulator += nextValue.money);
  }, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth:<strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
  console.log(formatMoney(total));
  //   updateDOM();
}

// add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update Dom
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2> <strong>Person</strong> Wealth </h2>";

  providedData.forEach((data) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${data.name} </strong> ${formatMoney(
      data.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}
// Event listners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
millionairesBtn.addEventListener("click", onlyMillionaries);
calculateWelthBtn.addEventListener("click", calculateWelth);
