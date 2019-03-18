let clouds = [];
let cloudCount = 100;
let startLeft = 100;
let endRight = 900;
let startTop = 0;
let endBottom = 900;
let startX = 0;
let startY = 0;
let cloudMinSize = 50;
let cloudMaxSize = 120;
let cloudSpeed = .4;


function setup(){
	createCanvas(1000,1000);
	background(110,110,255);

	for(let i = 0; i < cloudCount; i++){
		startX = random(startLeft,endRight)-windowWidth+150;
		startY = random(startTop, endBottom);
		clouds[i] = new Cloud(startX,startY,random(.05,cloudSpeed),random(cloudMinSize,cloudMaxSize),7,i);
	}
}

function draw(){

	cloudCollision();

	background(110,180,255);
	for(let i = 0; i < cloudCount; i++){
		clouds[i].display();
		clouds[i].move();
	}
}

function cloudCollision(){

	for(let i = 0; i < cloudCount; i++){
		clouds[i].collidedWith = null;
	}


	for(let j = 0; j < cloudCount; j++){
		for(let i = 0; i < cloudCount; i++){
			if(j == i)continue;
			let dx = (clouds[j].x-clouds[i].x);
			let dy = (clouds[j].y-clouds[i].y);
			let Dist = Math.sqrt(((dx*dx)+(dy*dy)));
			let dr = (clouds[j].big/2+clouds[i].big/2);
			if(Dist<dr){
				clouds[i].collidedWith = clouds[j];
			}
		}
	}

}

class Cloud{

	constructor(x,y,velX,big,fluff,ID){
		this.x = x;
		this.y = y;
		this.big = big;
		this.velX = velX;
		this.fluff = fluff;
		this.ID = ID;
		this.fill = 255;


	}

	display(){
		fill(this.fill);
		if(this.collidedWith != null){
			fill(this.fill-50);
		}
		noStroke();
		ellipse(this.x,this.y,this.big,this.big);
	}

	move(){
		this.x = this.x + this.velX;
	}


}
