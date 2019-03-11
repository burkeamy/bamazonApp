const mysql = require("mysql");
const inquirer = require("inquirer");
const strpad = require("strpad");

const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log ("You are shopper " + connection.threadId + "\n");
    start();
});

function start() {
    connection.query("select id, product_name, department_name, price, stock_quantity from bamazonStock", function(err, data) {
        if (err) throw err;
            console.log("ID     product name      department name     price  stock")
            console.log(strpad.right('-', 63, '-'));
            for (let i = 0; i < data.length; i++) {
                  console.log(`${strpad.right(data[i].id.toString(), 2)} | ${strpad.right(data[i].product_name, 20)} | 
                  ${strpad.right(data[i].department_name, 15)} | ${strpad.right(data[i].price.toString(), 7)}| ${strpad.right(data[i].stock_quantity.toString(), 6)}`);
            }
                  console.log(strpad.right('-', 63, '-'));
                  console.log('\n\r') 
                  inquirer.prompt({
                    name: "productChoice",
                    type: "input",
                    message: "Choose the product id for the item you wish to purchase [Q for Quit]"
            }) .then (function (response) {
          if (response.productChoice === "Q"){
            exit();
          } else if (response.productChoice > data.length) {
            console.log("We currently do not sell that item. Please choose another product.");
            start();
          } else {
          purchase(response);
          }
      });
    });
  };

function exit() { 
    connection.end()
    }

function purchase (response) {
    connection.query(`select * from bamazonStock where id = ${response.productChoice}`, function(err, data) {
    if (err) throw err;
    let item = data[0].product_name;
    inquirer.prompt({
      name: "quantity",
      type: "input",
      message: "How many of " + item + " would you like to purchase?"
  }) .then (function (answer) {
      let amountAvilable = data[0].stock_quantity
      let purchaseAmount = answer.quantity
      console.log (" you are buying " + purchaseAmount + " " + item + " out of " + amountAvilable);
        if (answer.quantity > amountAvilable) {
          console.log ("We currently do not have enough in stock. Please enter a different amount")
          purchase(response);
        } else {
        updateProduct(item, purchaseAmount, amountAvilable);
        };
     });
  });
}

function updateProduct(item, purchaseAmount, amountAvilable) {
    let amountLeft = (amountAvilable - purchaseAmount);
    connection.query(
      "UPDATE bamazonStock SET ? WHERE ?",
      [
        {
          stock_quantity: amountLeft
        },
        {
          product_name: item
        }
      ]).then
      connection.query("select id, product_name, department_name, price, stock_quantity from bamazonStock", function(err, data) {
        if (err) throw err;
            console.log("ID     product name      department name     price  stock")
            console.log(strpad.right('-', 63, '-'));
            for (let i = 0; i < data.length; i++) {
                  console.log(`${strpad.right(data[i].id.toString(), 2)} | ${strpad.right(data[i].product_name, 15)} | 
                  ${strpad.right(data[i].department_name, 15)} | ${strpad.right(data[i].price.toString(), 7)}| ${strpad.right(data[i].stock_quantity.toString(), 6)}`);
            }
                  console.log(strpad.right('-', 63, '-'));
                  console.log('\n\r');
                  inquirer.prompt({
                    name: "continue",
                    type: "confirm",
                    message: "Would you like to make another purchase"
            }) .then (function (choice) {
              if (choice.continue === true) {
                start();
              } else {
                exit();
              }
         });
      })
    }