class Food{
constructor(x, y){
  this.image=loadImage("JS/Milk.png");
  this.foodStock=0;
}

updateFoodStock(Food){
    database.ref('/').update({
        food:Food
    })
}
    deductFood(foodStock){
        foodStock-=1
   }

   bedroom(){
background(bedroom, 250, 250);

   }

   garden(){
    background(garden, 250, 250);
    
   }

   washroom(){
    background(washroom, 250, 250);
   
   }

   display(){
   var x=80, y=100;

   imageMode(CENTER);
  // image(this.image, x, y, 50, 50);

   if(this.foodStock!==0){
     for(var i=0; i<this.foodStock; i++){
       if(i%10===0){
         x=80;
         y=y+50;
       }
       image(this.image, x, y, 50, 50);
       x=x+50;
     }
   }
   }

}
