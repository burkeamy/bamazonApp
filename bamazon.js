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
            }) .then (function (err, response) {
              console.log ("you chose product number" + response.productChoice);
        if (err) throw err;{
          console.log("something went wrong you got an error ", + err);
        } if (response.productChoice === "Q"){
            exit();
          } else {
          purchase(response);
        }
          
         /* if (response.productChoice = number) connection.query("select id from bamazonStock")) {
              console.log("you choose " + connection.query("select product_name where id ===response.productChoice"));
              } else {
                console.log("something went wrong")*/
              });
            });
        
    };

function exit() { 
    connection.end()
    }

function purchase (response) {
    console.log("how many " + response.productChoice + "would you like to purchase?")
}


/*function updateProduct() {
     var query = connection.query(
      "UPDATE bamazonStock SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }
  
  function deleteProduct() {
    console.log("Deleting all strawberry icecream...\n");
    connection.query(
      "DELETE FROM products WHERE ?",
      {
        flavor: "strawberry"
      },
      function(err, res) {
        console.log(res.affectedRows + " products deleted!\n");
        // Call readProducts AFTER the DELETE completes
        readProducts();
      }*/
    

