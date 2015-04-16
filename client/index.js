'use strict';
/* global Firebase: true */

$(document).ready(init);

var root, acctName, cashBal ;

function init(){
  root = new Firebase('https://stk-kolohelios.firebaseio.com/');
  acctName = root.child('name');
  cashBal = root.child('cash');
  //portfolios = root.child('portfolios');
  $('#update').click(createAccount);
  $('#create-portfolio').click(createPortfolio);
  acctName.on('value', updateName);
  cashBal.on('value', updateCashBal);
  //portfolios.on('child_added', addPortfolio);
  //$('#buy').on('click', getQuote);
}

function createAccount(){
  $('#personal-info').hide();
  $('#headdisplay').show();
  var name = $('#name-input').val();
  acctName.set(name);
  var value = $('#balance-input').val();
  cashBal.set(value);
  portfolios.set('');
}

function updateName(snapshot){
  var name = snapshot.val();
  $('#dispname').text(name);
}

function updateCashBal(snapshot){
  var cashBalance = snapshot.val();
  $('#dispcash').text(cashBalance);
}

function createPortfolio(){
  var portfolios = root.child('portfolios');
  var portfolioToAdd = $('#portfolio-name').val();
  portfolios.push(portfolioToAdd);

}

function addPortfolio(snapshot){
  var newPortfolio = snapshot.val();
  var key = snapshot.key();
  var $option = $('<option>');
  $option.text(newPortfolio);
  $('#portfolio-list').append($option);
  var $div = $('<div>');
  $div.text(newPortfolio).addClass(newPortfolio);
  $div.attr('data-key', key);
  $('#portfolios').append($div);
}
//
// function getQuote(){
//   var symbol = $('#symbol').val().toUpperCase();
//   $.getJSON('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?', function(response){
//     buyStock(response.LastPrice, symbol);
//   });
// }
//
// function buyStock(price, symbol){
//   var quantity = $('#num-shares').val();
//   var totalAmount = quantity * price;
//   var cashBalance = $('#dispcash').text() * 1;
//   console.log(totalAmount);
//   if(totalAmount < cashBalance){
//     updateFunds(cashBalance, totalAmount);
//     addStockToPortfolio(symbol, quantity, totalAmount);
//   }
// }
//
// function updateFunds(cash, purchaseAmount){
//   var newCash = cash - purchaseAmount;
//   cashBal.set(newCash);
// }
//
// function addStockToPortfolio(symbol, quantity, totalAmount){
//   console.log('hey, you\'re typing jive');
//   var selectedPortfolio = $('#portfolio-list').val();
//
//   var $domPortfolio  = $('#portfolios').find('div').attr('class', selectedPortfolio);
//   var key = $domPortfolio.data('key');
//
//   console.log(key);
//
//   var stock = {
//     symbol: symbol,
//     quantity: quantity,
//     totalAmount: totalAmount
//   };
//
//   var portfolio = portfolios.(key);
//   portfolio.push(stock);
// }
