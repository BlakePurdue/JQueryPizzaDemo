class Pizza {
    constructor(size, sizePrice,baseType, baseTypePrice, typePizza, typePizzaPrice, extras, extraPrice, totalPrice) {
      this.size = size;
      this.sizePrice = sizePrice;
      this.baseType = baseType;
      this.baseTypePrice = baseTypePrice;
      this.typePizza = typePizza;
      this.typePizzaPrice = typePizzaPrice;
      this.Extras = extras;
      this.extraPrice = extraPrice;
      this.totalPrice = totalPrice;
    }
  }

  let pizzaTypeMap = new Map();
  let pizzaSizeMap = new Map();
  let pizzaBaseMap = new Map();

  let localCartPizzas = [];
  let localTotalPrice = 0.00;

// Function to run on load to populate Maps 
$(function() {
    //Pizza Type Content
    pizzaTypeMap.set("Pepperoni", "3.00");
    pizzaTypeMap.set("Hawaiian", "3.00");
    pizzaTypeMap.set("Classic Cheese", "3.00");
    pizzaTypeMap.set("BBQ Chicken & Bacon Deluxe", "8.00");

    // Pizza Size Content
    pizzaSizeMap.set("Small", "2.50");
    pizzaSizeMap.set("Medium", "5.00");
    pizzaSizeMap.set("Large", "8.00");

    // Pizza Base Content
    pizzaBaseMap.set("Regular", "0.00");
    pizzaBaseMap.set("Thin crust", "1.00");
    pizzaBaseMap.set("Cheesy crust", "2.00");
    pizzaBaseMap.set("New York Style *Limited Time*", "3.50");

    $("#priceTotal").html("$ "+ localTotalPrice);

    console.log("Pizza Stuff added");
});


// Pizza Order Button
$("#pizzaSubmitBtn").click(function(){

  var typePizza = $( "#pizzaTypeSelect" ).val();
  var typePizzaPrice = pizzaTypeMap.get(typePizza);

  var sizePizza = $( "#pizzaSizeSelect" ).val();
  var sizePizzaPrice = pizzaSizeMap.get(sizePizza);

  var basePizza = $( "#pizzaBaseSelect" ).val();
  var basePizzaPrice = pizzaBaseMap.get(basePizza);

  var checkTest = $('.checkTest:checkbox:checked');

  var extrasArray = [];

  $.each($("input[name='extraOption']:checked"), function(){
    extrasArray.push($(this).val());
  });
  var extraPrice = parseInt(extrasArray.length) * 2; // Number of extras * 2, each extra is $2

  var totalPrice = parseFloat(typePizzaPrice) + parseFloat(sizePizzaPrice) + parseFloat(basePizzaPrice) + parseFloat(extraPrice);

  var newPizza = new Pizza(
    sizePizza,
    sizePizzaPrice,
    basePizza,
    basePizzaPrice,
    typePizza,
    typePizzaPrice,
    extrasArray,
    extraPrice,
    totalPrice,
  );
  
  addPizzaToCart(newPizza);

  // Clear form once added to cart
  document.getElementById("pizzaForm").reset();
});

function addPizzaToCart(pizza){
  //Add pizza to array
  localCartPizzas.add(pizza);
  // Update list of pizza
  addContent();

  // Update total price
  localTotalPrice = localTotalPrice + pizza.totalPrice;
  // Update total price on html
  $("#priceTotal").html("$ "+localTotalPrice);
}


function addContent(){
  for(var i =0; i< localCartPizzas.lenght; i ++){
    
  }


  var txt1Line = pizza.size + " " + pizza.baseType + " " + pizza.typePizza;
  var txt1 = $("<h6></h6>").text(txt1Line);
  var ulPart1 = $("<ul>");
  var line = $("<li></li>").text(txt1Line);
  var ulPart2 = $("</ul>");


  // Add content to page
  $("#groupOfPizza").append(txt1,ulPart1,line, ulPart2);  
}

$("#couponBtn").click(function(){
  var coup = $("#couponTextInput").val();

  if(localTotalPrice <= 0 || coup == null || coup == ""){
    //Price is 0, no way we doing discount on that!
    if(localTotalPrice <= 0){
      alert("Your carts empty! Add stuff before using discount");
    }
    else{
      
    }
   
  }
  else {
    if(coup = "pizza"){
      //Correct discount code, take 10% off 
      var discount = localTotalPrice / 10;
      localTotalPrice = localTotalPrice - discount;

      //Update the price text
      $("#priceTotal").html("$ "+ localTotalPrice);
    }
    else{
      alert("Thats not the correct coupon code! ");
    }   
    
  }
  $("#couponTextInput").val("");
});