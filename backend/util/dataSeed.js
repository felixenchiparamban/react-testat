const userService = require("../services/userService");
const accountService = require("../services/accountService");

let numbers = ["1000001","1000002","1000003"];
let startDate = +(new Date(2016, 10, 5));

let maxTransaction = 1500;
let currentTransaction = 0;
function createTransaction() {
  accountService.addTransaction(numbers[Math.round(Math.random() * 2)], numbers[Math.round(Math.random() * 2)], Math.round(Math.random() * 150), new Date(startDate + ( 3600 * currentTransaction * 1000 * 3)), () => {
    if (++currentTransaction < maxTransaction) {
      createTransaction();
    }
  });
}

userService.getByLogin("user1", (err, user) => {
  if(user == null) {
    userService.register("user1", "Bob", "Müller", "1234", () => {
      userService.register("user2", "Lisa", "Meier", "1234", () => {
        userService.register("user3", "Kevin", "Schmidt", "1234", () => {
          createTransaction();
        });
      });
    });
  }
});
