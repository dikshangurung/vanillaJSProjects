"use strict";
const account1 = {
  name: "Dikshan Gurung",
  peoples: ["Sakar Adhikari", "Satya Dahal", "Kushal Pariyar"],
  movements: [200, 450, -400],
  email: "dxngrg2058@gmail.com",
  password: 2222,
  purpose: ["College Fee", "Khaja", "Travel"],
  movementsDates: [
    "2022-12-16T17:01:17.194Z",
    "2022-12-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};
const account2 = {
  name: "Satya Prakash Dahal",
  peoples: ["Dikshan Gurung", "Satya Dahal", "Kushal Pariyar"],
  movements: [100, 250, -100],
  email: "dxngrg2048@gmail.com",
  password: 2222,
  purpose: ["College Fee", "Khaja", "Travel"],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  name: "Kushal Pariyar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  email: "dxngrg2038@gmail.com",
  password: 2222,
  purpose: ["College Fee", "Khaja", "Travel"],
};
const acc_loan = {
  peoples: [
    "Satya Dahal",
    "Kushal Pariyar",
    "Sakar Adhikari",
    "Sushant Poudel",
  ],
  movements: ["400", "400", "400", "200"],
  purpose: [
    "Khaja",
    "Khaja Naan house",
    "Khaja Naan house",
    "Khaja Naan house",
  ],
};
const accounts = [account1, account2, account3];
// const { movements, name } = account1;
const movements_container = document.querySelector(".movement_container");
const movements_activity = document.querySelector(
  ".movement_container .movement_activity"
);
const movements_activity_inner = document.querySelector(
  ".hide_inner_two .movement_activity"
);
const movement_in = document.querySelector(
  ".data_container .movement_container .movement_activity .in"
);
const movement_out = document.querySelector(
  ".data_container .movement_container .movement_activity .out"
);
const Income_data = document.querySelector(
  ".data_container .data .census .income"
);
const Expense_data = document.querySelector(
  ".data_container .data .census .expense"
);
const Saving_data = document.querySelector(
  ".data_container .data .census .saving"
);
const hide_inner_one = document.querySelector(".hide_inner_one");
const hide_inner_two = document.querySelector(".hide_inner_two");
const highlight = document.querySelector(".hide_two .pdata .highlight");
const hide_one = document.querySelector(".hide_one");
const hide_two = document.querySelector(".hide_two");
const labelBalance = document.querySelector(".current_money");
const moneyInName = document.querySelector(
  ".cards .card_position .money_in_name"
);
const moneyInAmount = document.querySelector(
  ".cards .card_position .money_in_amount"
);
const moneyInPurpose = document.querySelector(
  ".cards .card_position .money_in_purpose"
);
const moneyOutName = document.querySelector(
  ".cards .card_position .money_out_name"
);
const moneyOutAmount = document.querySelector(
  ".cards .card_position .money_out_amount"
);
const moneyOutPurpose = document.querySelector(
  ".cards .card_position .money_out_purpose"
);
const loanName = document.querySelector(".cards .card_position .loan_name");
const loanAmount = document.querySelector(".cards .card_position .loan_amount");
const loanPurpose = document.querySelector(
  ".cards .card_position .loan_purpose"
);
const moneyIn = document.querySelector(".cards .card_position .money_in");
const moneyOut = document.querySelector(".cards .card_position .money_out");
const loan = document.querySelector(".cards .card_position .loan_given");
const loan_record = document.querySelector(".data .loan_box .view");
const logout = document.querySelector(".rdata .logout");
const sort_button = document.querySelector(".sort_button");
// const check = document.querySelectorAll(".hide_inner_two .check");
// let index = 0;
///Lessssssss gooooooo
let currAcc;
let pin = 2222;
let email = "dxngrg2058@gmail.com";
// document.addEventListener("DOMContentLoaded", initBegin);
document.addEventListener("DOMContentLoaded", function () {
  currAcc = accounts.find((el) => el.email === email);
  // console.log(currAcc);
  if (currAcc?.password === Number(pin)) {
    highlight.textContent = currAcc.name;
    displayMovementsInitial(
      currAcc.peoples,
      currAcc.purpose,
      currAcc.movements
    );
    calcDatas(currAcc);
  }
});
moneyIn.addEventListener("click", function (e) {
  e.preventDefault();
  currAcc.movementsDates.push(new Date());
  const sender_name = moneyInName.value;
  const sender_money = Number(moneyInAmount.value);
  const sender_purpose = moneyInPurpose.value;
  console.log(sender_name, sender_money, sender_purpose);
  if (sender_money > 0) {
    currAcc.movements.push(sender_money);
    currAcc.peoples.push(sender_name);
    currAcc.purpose.push(sender_purpose);
    displayMovementsInitial(
      currAcc.peoples,
      currAcc.purpose,
      currAcc.movements
    );
    console.log(currAcc);
    calcDatas(currAcc);
    moneyInName.value = moneyInAmount.value = moneyInPurpose.value = "";
  }
});

loan.addEventListener("click", function (e) {
  e.preventDefault();
  currAcc.movementsDates.push(new Date());
  const sender_name = loanName.value;
  const sender_money = Number(loanAmount.value);
  const sender_purpose = loanPurpose.value;
  if (
    sender_money > 0 &&
    currAcc.movements.some((mov) => mov >= 0.1 * sender_money)
  ) {
    currAcc.movements.push(-sender_money);
    acc_loan.movements.push(sender_money);
    currAcc.peoples.push(sender_name);
    acc_loan.peoples.push(sender_name);
    currAcc.purpose.push(sender_purpose);
    acc_loan.purpose.push(sender_purpose);
    displayMovementsInitial(
      currAcc.peoples,
      currAcc.purpose,
      currAcc.movements
    );
    console.log(currAcc);
    calcDatas(currAcc);
    loanName.value = loanAmount.value = loanPurpose.value = "";
  }
});
moneyOut.addEventListener("click", function (e) {
  e.preventDefault();
  currAcc.movementsDates.push(new Date());
  console.log(currAcc.balance);
  const sender_name = moneyOutName.value;
  const sender_money = Number(moneyOutAmount.value);
  const sender_purpose = moneyOutPurpose.value;
  console.log(sender_name, sender_money, sender_purpose);
  if (sender_money > 0 && sender_money <= currAcc.balance) {
    currAcc.movements.push(-sender_money);
    currAcc.peoples.push(sender_name);
    currAcc.purpose.push(sender_purpose);
    displayMovementsInitial(
      currAcc.peoples,
      currAcc.purpose,
      currAcc.movements
    );
    console.log(currAcc);
    calcDatas(currAcc);
    moneyOutName.value = moneyOutAmount.value = moneyOutPurpose.value = "";
  }
});
loan_record.addEventListener("click", function () {
  hide_inner_one.style.display = "none";
  hide_inner_two.style.display = "block";
  console.log(movements_activity_inner);
  loan_box();
  check_action();

  // check.forEach(function (el, index) {
  //   console.log(el, index);
  //   el.addEventListener("click", function () {
  //     alert("ok");
  //   });
  // });
  // alert("ok");
});
logout.addEventListener("click", function () {
  // alert("ok");
  hide_inner_one.style.display = "block";
  hide_inner_two.style.display = "none";
});

//Sorting.......
let sorted = false;
sort_button.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovementsInitial(
    currAcc.peoples,
    currAcc.purpose,
    currAcc.movements,
    !sorted
  );
  sorted = !sorted;
  // alert("ok");
});
//Functions for money in..

//Functions....
const calcDatas = function (currAcc) {
  calcIncomeExpense(currAcc.movements);
  calcBalance(currAcc.movements);
};
const calcIncomeExpense = function (movements) {
  const income = movements
    .filter((el) => el > 0)
    .reduce((acc, cur) => acc + cur, 0);
  Income_data.textContent = income;
  const expense = movements
    .filter((el) => el < 0)
    .reduce((acc, cur) => acc + cur, 0);
  Expense_data.textContent = Math.abs(expense);
  const saving = income + expense;
  Saving_data.textContent = saving;
};

const calcBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  currAcc.balance = balance;
  labelBalance.textContent = `Rs: ${balance}`;
};
const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed == 0) return "Today";
  else if (daysPassed == 1) return "Yesterday";
  else if (daysPassed <= 7) {
    return `${Math.round(daysPassed)} days ago`;
  }
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  return `${year}/${month}/${day}`;
};
const displayMovementsInitial = function (
  peoples,
  purpose,
  movements,
  sort = false
) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movements_activity.innerHTML = " ";
  movs.forEach(function (el, index) {
    // console.log(currAcc.movementsDates);
    const date = new Date(currAcc.movementsDates[index]);
    formatMovementDate(date);
    const html = `
    <div class="movement ${el > 0 ? "in" : "out"}">
        <div class="movement_position">
             <div class="movement_info">
                 <h2>${peoples[index]},${purpose[index]}</h2>
                 <h3>${formatMovementDate(date)}</h3>
            </div>
            <div class="money_movement">
                 Nrs. ${Math.abs(el)}
                <span class="${
                  el < 0 ? "withdraw" : "deposit"
                }_number">${++index} ${el < 0 ? "Withdraw" : "Deposit"}</span>
            </div>
         </div>
    </div>`;
    movements_activity.insertAdjacentHTML("afterbegin", html);
  });
};
const loan_box = function () {
  movements_activity_inner.innerHTML = " ";
  // console.log(check);

  acc_loan.movements.forEach(function (el, index) {
    const html = `
    <div class="movement out">
        <div class="movement_position">
             <div class="movement_info">
                 <h2>${acc_loan.peoples[index]},${acc_loan.purpose[index]}</h2>
                 <h3>2020/09/11</h3>
            </div>
            <div class="money_movement">
                 Nrs. ${Math.abs(el)}
            </div>
            <div class="check">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
         </div>
    </div>`;
    movements_activity_inner.insertAdjacentHTML("beforeend", html);
  });
};
const check_action = function () {
  document
    .querySelectorAll(".hide_inner_two .check")
    .forEach(function (el, index) {
      el.addEventListener("click", function () {
        const name = acc_loan.peoples[index];
        const purpose = acc_loan.purpose[index];
        const money = Number(acc_loan.movements[index]);
        currAcc.peoples.push(name);
        currAcc.purpose.push(purpose);
        currAcc.movements.push(money);
        calcDatas(currAcc);
        console.log(currAcc.peoples);
        console.log(name, purpose, money);
        // console.log(currAcc.peoples);
        // let remove = currAcc.peoples.findIndex((mov) => mov === name);
        acc_loan.peoples.splice(index, 1);
        acc_loan.purpose.splice(index, 1);
        acc_loan.movements.splice(index, 1);
        loan_box();
        check_action();
        // alert("ok");
      });
    });
};
