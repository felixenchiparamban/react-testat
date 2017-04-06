let config = require('../config');
config.inMemory = true;

let userService = require('../services/userService');
let accountService = require('../services/accountService');



describe("Register", function() {

  it("register should return true", function (done) {
    userService.register("mgfeller", "Michael", "Gfeller", "1234", (err, result) => {
      expect(err).toBeNull();
      done();
    });
  });

  it("register should return true", function (done) {
    userService.register("mgfeller2", "Michael", "Gfeller", "1234", (err, result) => {
      expect(err).toBeNull();
      done();
    });
  });

  it("second register should return false", function (done) {
    userService.register("mgfeller", "Michael", "Gfeller", "1234", (err, result) => {
      expect(err).toBeTruthy();
      done();
    });
  });
});



describe("Transactions", function() {
  it("1000 amount after register", function (done) {
    accountService.get("1000001", (err, result) => {
      expect(result.amount).toBe(1000);

      accountService.get("1000002", (err, result) => {
        expect(result.amount).toBe(1000);
        done();
      });
    })
  });

  it("transaction above limit", function (done) {
    accountService.addTransaction("1000001", "1000002", 1500, null, (result) => {
      accountService.get("1000001", (err, result) => {
        expect(result.amount).toBe(1000);

        accountService.get("1000002", (err, result) => {
          expect(result.amount).toBe(1000);
          done();
        });
      });
    });
  });

  it("transaction wrong target", function (done) {
    accountService.addTransaction("1000001", "XXXXXXXX", 500, null,(result) => {
      accountService.get("1000001", (err, result) => {
        expect(result.amount).toBe(1000);
        done();
      });
    });
  });


  it("transaction wrong from", function (done) {
    accountService.addTransaction("XXXXXXXX", "1000002", 500, null,(result) => {
      accountService.get("1000002", (err, result) => {
        expect(result.amount).toBe(1000);
        done();
      });
    });
  });

  it("transaction of 500", function (done) {
    accountService.addTransaction("1000001", "1000002", 500, null,(result) => {
      accountService.get("1000001", (err, result) => {
        expect(result.amount).toBe(500);

        accountService.get("1000002", (err, result) => {
          expect(result.amount).toBe(1500);
          done();
        });
      });
    });
  });
});
