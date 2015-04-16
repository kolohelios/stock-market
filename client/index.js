'use strict';
/* global Firebase: true */

$(document).ready(init);

var root, acctName, cashBal, portfolios;

function init(){
  root = new Firebase('https://stk-kolohelios.firebaseio.com/');
  acctName = root.child('name');
  cashBal = root.child('cash');
  portfolios = root.child('portfolios');
  $('#update').click(createAccount);
  $('#create-portfolio').click(createPortfolio);
  acctName.on('value', updateName);
  cashBal.on('value', updateCashBal);
  portfolios.on('child_added', addPortfolio);
  $('#buy').on('click', getQuote);
}

function createAccount(){
  $('#personal-info').hide();
  $('#headdisplay').show();
  var name = $('#name-input').val();
  acctName.set(name);
  var value = $('#balance-input').val();
  cashBal.set(value);
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
  var portfolioName = $('#portfolio-name').val();
  var portfolio = { name: portfolioName };
  portfolios.push(portfolio);
}

function addPortfolio(snapshot){
  var newPortfolio = snapshot.val();
  var newPortfolioName = newPortfolio.name;
  var key = snapshot.key();
  var $option = $('<option>');
  $option.text(newPortfolioName);
  $('#portfolio-list').append($option);
  var $div = $('<div>');
  $div.text(newPortfolioName).addClass(newPortfolioName).addClass('portfolio');
  $div.attr('data-key', key);
  $('#portfolios').append($div);
  for(var i in newPortfolio){
    if(typeof newPortfolio[i] === 'object'){
      var $ul = $('<ul>');
      var stockString = [];
        for(var j in newPortfolio[i]){
          var $li = $('<li>');
          $li.text(j + ' : ' + newPortfolio[i][j]);
          $ul.append($li);
        }
        //console.log(newPortfolioName);
        $('.' + newPortfolioName).append($ul);
        //console.log(stockString);
      }
  }
}

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  $.getJSON('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?', function(response){
    buyStock(response.LastPrice, symbol);
  });
}

function buyStock(price, symbol){
  var quantity = $('#num-shares').val() * 1;
  var totalAmount = quantity * price;
  var cashBalance = $('#dispcash').text() * 1;
  if(totalAmount < cashBalance){
    updateFunds(cashBalance, totalAmount);
    addStockToPortfolio(symbol, quantity, totalAmount);
  }
}

function updateFunds(cash, purchaseAmount){
  var newCash = cash - purchaseAmount;
  cashBal.set(newCash);
}

function addStockToPortfolio(symbol, quantity, totalAmount){
  console.log(totalAmount, symbol, quantity);
  var selectedPortfolio = $('#portfolio-list').val();
  var $domPortfolio  = $('.' + selectedPortfolio);
  console.log($domPortfolio);
  var key = $domPortfolio.data('key');
  console.log($domPortfolio);
  console.log(key);
  var stock = {
    symbol: symbol,
    quantity: quantity,
    totalAmount: totalAmount
  };
  var portfolio = portfolios.child(key);
  portfolio.push(stock);
}

function totalOfPortfolios(){
  $('#portfolios').find('div').each(function(i, e){
    console.log(e);
    $('ul').each(function(j, f){

    })



  });


}
