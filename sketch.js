//Create variables here
var dog, happyDog,sadDog, Milk;
var database;
var foodS, foodstock;
var foodObj;
var FeedTime, lastFed;
var gameState, readState;
var bedroom, garden, washroom;
function preload(){
  dog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
  bedroom=loadImage("Image/Bed Room.png");
  garden=loadImage("Image/Garden.png");
  washroom=loadImage("Image/Wash Room.png");
  sadDog=loadImage("Image/deadDog.png");
}

function setup() {
 
	createCanvas(500, 500);
  

  database=firebase.database();
  d=createSprite(250, 300, 20, 20);
  d.scale=(0.1);
  d.addImage(dog);

readState=database.ref('gameState');
readState.on("value", (data)=>{
gameState=data.val();
})


food=new Food(80, 100);

feed=createButton("Feed the Dog");
feed.position(620, 60);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(720, 60);
addFood.mousePressed(addFoods);


var FedTime = database.ref('feedTime'); 
FedTime.on("value",function(data){ 
  lastFed = data.val();
 })

   
  foodstock=database.ref('Food')
  foodstock.on("value", readStock);

  
}


function draw() {  
  
  background(46, 139, 87);
  currentTime = hour();
  
  
  console.log(currentTime);
  textSize(20);
  fill("black");
  stroke("black");
  text("food remaining="+ foodS, 200, 250);
  //add styles here


if(gameState!=="Hungry"){
  feed.hide();
  addFood.hide();
 // d.remove();
}else{
  feed.show();
  addFood.show();
  d.addImage(sadDog)
}



if(currentTime==(lastFed+1)){
  update("Playing");
  food.garden();
  d.visible=false;
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  food.bedroom();
  d.visible=false;
}else{
  update("Bathing");
  food.washroom();
  d.visible=false;
  feed.show();
  addFood.show();
  
}







fill(255, 255, 254);
textSize(15);
if(lastFed>=12){
  text("last Fed :"+ lastFed%12 + "PM", 100,30);
} else if(lastFed==0){
  text("Last Fed : 12Pm", 100, 30);
}else{
  text("last Fed : "+lastFed + "AM", 100, 30);
}
    
food.display();
drawSprites();
}

function readStock(data){
  foodS=data.val();
  food.foodStock=foodS
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
d.addImage(happyDog);



foodS-=1;
if(foodS<1){
  foodS=0;
}
//food.updateFoodStock(food.getFoodStock()-1);
database.ref('/').update({
  Food:foodS,
  feedTime:hour(),
  gameState:"Hungry"
  
 
})
}


function addFoods(){
 
  foodS++;
  if(foodS>19){
    foodS=20;
  }
  database.ref('/').update({
Food:foodS

  })
}

function getFoodStock(data){ 
  foodS = data.val(); foodObj.foodStock = foodS; console.log(foodS); 
}

function update(state){
database.ref('/').update({
gameState:state
});
}