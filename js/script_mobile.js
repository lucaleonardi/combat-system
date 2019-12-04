// --------- CARDS ---------

function Card(type, title, img, color, damage, speed, breach, cost, defense) {
	
	this.type = type;
	this.title = title;
	this.img = img;
	this.color = color;
	
	this.damage = damage;
	this.speed = speed;
	this.breach = breach;
	this.cost = cost;
	this.defense = defense;
	
}

function ScoreDetail(id, name, val) {
	
	this.id = id;
	this.name = name;
	this.val = val;
	
}

var atk0 = new Card(0,"Light Attack","atk0","red accent-1",10,3,1,1,null);
var atk1 = new Card(0,"Medium Attack","atk1","red lighten-2",20,2,2,2,null);
var atk2 = new Card(0,"Heavy Attack","atk3","red lighten-1",30,1,3,3,null);
var def  = new Card(1, "Defense","def","indigo lighten-2",null,null,null,null,null);
var rec  = new Card(2, "Recover","rec","brown",null,null,null,null,null);

// -- score variables --
var nLightAttacks = new ScoreDetail("nLightAttacks","Light Attacks",0); // numero totale di attacchi leggeri effettuati
var nMediumAttacks = new ScoreDetail("nMediumAttacks","Medium Attacks",0); // numero totale di attacchi medi effettuati
var nHeavyAttacks = new ScoreDetail("nHeavyAttacks","Heavy Attacks",0); // numero totale di attacchi pesanti effettuati
var attacksCounter = new ScoreDetail("attacksCounter","Total Attacks",0); // numero totale di attacchi effettuati
var totStaminaUsed = new ScoreDetail("totStaminaUsed","Stamina used",0); // totale della stamina utilizzata
var successfulAttacks = new ScoreDetail("successfulAttacks","Successful Attacks",0); // numero totale di attacchi andati a segno
var defensesCounter = new ScoreDetail("defensesCounter","Total Defense",0); // numero totale di difese effettuate
var totDefensePointsUsed = new ScoreDetail("totDefensePointsUsed","Defense Points used",0); // totale dei punti difesa utilizzati
var successfulDefenses = new ScoreDetail("successfulDefenses","Successful Defense",0); // numero totale di attacchi nemici parati 
var recoversCounter = new ScoreDetail("recoversCounter","Total Recovers",0); // numero totale di ricariche effettuate 
var finalScore; // punteggio totale 
// --

var defaultDeck = [
	atk0,
	atk1,
	atk2,
	def,
	rec
];

var GameScore = [
	nLightAttacks,
	nMediumAttacks,
	nHeavyAttacks,
	//attacksCounter,
	//totStaminaUsed,
	successfulAttacks,
	defensesCounter,
	//totDefensePointsUsed,
	successfulDefenses,
	//recoversCounter
];

// --------- INITIALIZE ---------

var LIFE = 100;
var FULL = 5;
var DEFENSE = 5;
var DAMAGE;
var SPEED;
var COST;

var goodStatus = "green";
var middleStatus = "orange";
var badStatus = "red";

var playerDamage;
var cpuDamage;

var playerSpeed;
var cpuSpeed;

var playerCost;
var cpuCost;

var playerBreach;
var cpuBreach;

var playerDefense;
var cpuDefense;

var playerHealth;
var cpuHealth;

var playerStamina;
var cpuStamina;

var playerPreviousAction;
var cpuPreviousAction;

var playerDefensePoints;
var cpuDefensePoints;

var playerLightCooldown;
var cpuLightCooldown;

var playerHeavyCooldown;
var cpuHeavyCooldown;

var playerDeck;

var turn;
var i;

function initialize() {

	playerHealth = 	LIFE;
	cpuHealth = 	LIFE;
	playerStamina = FULL;
	cpuStamina = 	FULL;
	playerDefensePoints = DEFENSE;
	cpuDefensePoints = 	DEFENSE;
	
	playerDeck = defaultDeck;
	
	playerPreviousAction = 1;
	cpuPreviousAction = 1;
	
	playerLightCooldown = 0;
	cpuLightCooldown = 0;
	playerHeavyCooldown = 0;
	cpuHeavyCooldown = 0;
	
	nLightAttacks.val = 0;
	nMediumAttacks.val = 0;
	nHeavyAttacks.val = 0;
	attacksCounter.val = 0;
	totStaminaUsed.val = 0;
	successfulAttacks.val = 0;

	defensesCounter.val = 0;
	totDefensePointsUsed.val = 0;
	successfulDefenses.val = 0; 

	recoversCounter.val = 0;
	finalScore = 0;
	
	turn = 0;
	
	document.getElementById("turn").innerHTML = turn;
	
	document.getElementById("playerStamina").innerHTML = "Stamina: "+playerStamina;
	document.getElementById("playerDefense").innerHTML = "Defense: "+playerDefensePoints;
	document.getElementById("playerHealth").innerHTML = "Health: "+playerHealth;
	document.getElementById("playerAction").innerHTML = "NONE";
	
	document.getElementById("playerStamina").style.color = goodStatus;
	document.getElementById("playerDefense").style.color = goodStatus;
	document.getElementById("playerHealth").style.color = goodStatus;

	document.getElementById("cpuStamina").innerHTML = "Stamina: "+cpuStamina;
	document.getElementById("cpuDefense").innerHTML = "Defense: "+cpuDefensePoints;
	document.getElementById("cpuHealth").innerHTML = "Health: "+cpuHealth;
	document.getElementById("cpuAction").innerHTML = "NONE";
	
	document.getElementById("cpuStamina").style.color = goodStatus;
	document.getElementById("cpuDefense").style.color = goodStatus;
	document.getElementById("cpuHealth").style.color = goodStatus;
	
	for(i=0; i<playerDeck.length-2; i++)
		document.getElementById("card"+i).innerHTML = cardPrint(playerDeck[i]);
		
	document.getElementById("card0").style.filter = "brightness(100%)";
	document.getElementById("card2").style.filter = "brightness(100%)";
	
	document.getElementById("score").style.display = "none";
	
	document.getElementById("recover").style.display = "block";
	document.getElementById("defense").style.display = "block";
	document.getElementById("cardsContainer").style.display = "block";
	
	M.Toast.dismissAll();
	
}


// --------- CARDS PRINT ---------

function cardPrint(card) {
	
	var cardContent = 	"<p>Dmg: "+card.damage+"</p>"+
						"<p>Spd: "+card.speed+"</p>"+
						"<p>Brc: "+card.breach+"</p>"+
						"<p>Cost: "+card.cost+"</p>";
	
	return	"<div onclick=\"action(playerDeck["+i+"])\" class=\"card hoverable "+card.color+"\">"+
				"<div class=\"card-image\">"+
					"<img src=\"images/"+card.img+".png\">"+
				"</div>"+
				"<div class=\"card-content center-align\" style=\"padding: 0px 0px 12px 0px;\">"+cardContent+"</div>"+
			"</div>";
}


// --------- ACTION PHASE ---------

function action(playerCard) {
	
	var cpuAction;
	var attackAllowed;
	var nextTurn = true;
	
	playerDamage = 0;
	playerSpeed = 0;
	playerBreach = 0;
	playerCost = 0;
	playerDefense = 0;
	
	switch(playerCard.type) {
		
		case 0:	{
			playerAction = 0;
			playerDamage = playerCard.damage;
			playerSpeed = playerCard.speed;
			playerBreach = playerCard.breach;
			playerCost = playerCard.cost;
		}
		break;
		
		case 1: playerAction = 1; break;
		case 2: playerAction = 2;
	}
	
	do {
		cpuAction = randomGenerator(0, 2);
		attackAllowed = true;
		cpuDamage = 0;
		cpuSpeed = 0;
		cpuBreach = 0;
		cpuDefense = 0;
		cpuCost = 0;
		
		if(cpuAction == 0) {
			
			switch(randomGenerator(0,2)) {
				
				case 0: {
					if(cpuLightCooldown>0) attackAllowed = false;
					else {
						cpuDamage = 10;
						cpuSpeed = 3;
						cpuBreach = 1;
						cpuCost = 1;
						cpuLightCooldown = 3; // actually is 2
					}
				}
				break;
				
				case 1: {
					cpuDamage = 20;
					cpuSpeed = 2;
					cpuBreach = 2;
					cpuCost = 2;
				}
				break;
				
				case 2: {
					if(cpuHeavyCooldown>0) attackAllowed = false;
					else {
						cpuDamage = 30;
						cpuSpeed = 1;
						cpuBreach = 3;
						cpuCost = 3;
						cpuHeavyCooldown = 3; // actually is 2
					}
				}	
				break;
			}
		}

	} while ((cpuCost>cpuStamina) || (cpuAction==2 && cpuStamina>3) || (cpuAction==1 && cpuDefensePoints==0) || (cpuDefense>cpuDefensePoints) || (!attackAllowed));
	
	if(playerPreviousAction != 1 && playerAction != 1 && playerDefensePoints<DEFENSE) playerDefensePoints++;
	if(cpuPreviousAction != 1 && cpuAction != 1 && cpuDefensePoints<DEFENSE) cpuDefensePoints++;
	
	switch(playerAction) {

		case 0: {
			
			if(playerCost > playerStamina) {
				M.toast({html: 'You haven\'t enough stamina!'});
				nextTurn = false;
				break;
			}
			
			if(playerDamage == 10) {
				if(playerLightCooldown != 0) {
					if(playerLightCooldown>1) M.toast({html: 'You need to wait '+playerLightCooldown+' turns for the Light Attack', displayLength: 2000});
					else M.toast({html: 'You need to wait 1 turn for the Light Attack', displayLength: 2000});
					nextTurn = false;
					break;
				} else {
					playerLightCooldown = 3; // actually is 2
					nLightAttacks.val++;
				}
			}
			
			if(playerDamage == 20) nMediumAttacks.val++;
			
			if(playerDamage == 30) {
				if(playerHeavyCooldown != 0) {
					if(playerHeavyCooldown>1) M.toast({html: 'You need to wait '+playerHeavyCooldown+' turns for the Heavy Attack', displayLength: 2000});
					else M.toast({html: 'You need to wait 1 turn for the Heavy Attack', displayLength: 2000});
					nextTurn = false;
					break;
				} else {
					playerHeavyCooldown = 3; // actually is 2
					nHeavyAttacks.val++;
				}
			}
			
			attacksCounter.val++;
			totStaminaUsed.val += playerCost;
			
			switch(cpuAction) {
				case 0: {
					
					playerStamina -= playerCost;
					cpuStamina -= cpuCost;
					
					if(playerSpeed-cpuSpeed>0) {
						cpuHealth -= playerDamage;
						successfulAttacks.val++;
						break;
					}
					
					if(playerSpeed-cpuSpeed<0) {
						playerHealth -= cpuDamage;
						break;
					}
					
					playerHealth -= cpuDamage;
					cpuHealth -= playerDamage;
					successfulAttacks.val++;
					
				}
				break;
				
				case 1: {
					playerHealth -= 0;
					playerStamina -= playerCost;
					if(playerBreach>cpuDefensePoints) {
						cpuHealth -= (playerDamage/playerBreach) * (playerBreach-cpuDefensePoints); 
						successfulAttacks.val++;
						cpuDefensePoints = 0;
					}
					else cpuDefensePoints -= playerBreach;
					cpuStamina -= 0;
				}
				break;
				
				case 2: {
					playerHealth -= 0;
					playerStamina -= playerCost;
					cpuHealth -= playerDamage;
					cpuStamina = FULL;
					successfulAttacks.val++;
				}
			}
		}
		break;
		
		case 1: {
			
			if(playerDefensePoints == 0) {
				M.toast({html: 'You haven\'t enough defense points!', displayLength: 2000});
				nextTurn = false;
				break;
			}
			
			defensesCounter.val++;

			switch(cpuAction) {
				case 0: {					
					if(cpuBreach>playerDefensePoints) {
						playerHealth -= (cpuDamage/cpuBreach) * (cpuBreach-playerDefensePoints);
						totDefensePointsUsed.val += playerDefensePoints;
						playerDefensePoints = 0;
					}
					else {
						playerDefensePoints -= cpuBreach;
						totDefensePointsUsed.val += cpuBreach;
						successfulDefenses.val++;
					}
					playerStamina -= 0;
					cpuHealth -= 0;
					cpuStamina -= cpuCost;
				}
				break;
				case 1: {
					playerHealth -= 0;
					playerStamina -= 0;
					cpuHealth -= 0;
					cpuStamina -= 0;
				}
				break;
				case 2: {
					playerHealth -= 0;
					playerStamina -= 0;
					cpuHealth -= 0;
					cpuStamina = FULL;
				}
			}
		}
		break;
		
		case 2: {

			if(playerStamina == 5) {
				M.toast({html: 'You\'re stamina is already full!', displayLength: 2000});
				nextTurn = false;
				break;
			}			
			
			recoversCounter.val++;

			switch(cpuAction) {
				case 0: {
					playerHealth -= cpuDamage;
					playerStamina = FULL;
					cpuHealth -= 0;
					cpuStamina -= cpuCost;
				}
				break;
				case 1: {
					playerHealth -= 0;
					playerStamina = FULL;
					cpuHealth -= 0;
					cpuStamina -= 0;
				}
				break;
				case 2: {
					playerHealth -= 0;
					playerStamina = FULL;
					cpuHealth -= 0;
					cpuStamina = FULL;
				}
			}
		}
	}
	
	if(nextTurn) {
		
		playerPreviousAction = playerAction;
		cpuPreviousAction = cpuAction;
		turn++;
		
		if(playerLightCooldown>0) {
			playerLightCooldown--;
			switch(playerLightCooldown) {
				case 2: document.getElementById("card0").style.filter = "brightness(40%)"; break;
				case 1: document.getElementById("card0").style.filter = "brightness(60%)"; break;
				case 0: document.getElementById("card0").style.filter = "brightness(100%)";
			}
		}
		
		if(playerHeavyCooldown>0) {
			playerHeavyCooldown--;
			switch(playerHeavyCooldown) {
				case 2: document.getElementById("card2").style.filter = "brightness(40%)"; break;
				case 1: document.getElementById("card2").style.filter = "brightness(60%)"; break;
				case 0: document.getElementById("card2").style.filter = "brightness(100%)";
			}
		}
		
		if(cpuLightCooldown>0) cpuLightCooldown--;
		if(cpuHeavyCooldown>0) cpuHeavyCooldown--;
		
		if(playerHealth<0) 	playerHealth = 0;
		if(cpuHealth<0) 	cpuHealth = 0;
	
		document.getElementById("turn").innerHTML = turn;
	
		document.getElementById("playerStamina").innerHTML = "Stamina: "+playerStamina;
		document.getElementById("playerDefense").innerHTML = "Defense: "+playerDefensePoints;
		document.getElementById("playerHealth").innerHTML = "Health: "+playerHealth;
	
		if(playerStamina>2) {
			document.getElementById("playerStamina").style.color = goodStatus;
		}
		else {
			if(playerStamina>0) {
				document.getElementById("playerStamina").style.color = middleStatus;
			}
			else {
				document.getElementById("playerStamina").style.color = badStatus;
			}
		}
		
		if(playerDefensePoints>2) {
			document.getElementById("playerDefense").style.color = goodStatus;
		}
		else {
			if(playerDefensePoints>0) {
				document.getElementById("playerDefense").style.color = middleStatus;
			}
			else {
				document.getElementById("playerDefense").style.color = badStatus;
			}
		}
		
		if(playerHealth>60) {
			document.getElementById("playerHealth").style.color = goodStatus;
		}
		else {
			if(playerHealth>20) {
				document.getElementById("playerHealth").style.color = middleStatus;
			}
			else {
				document.getElementById("playerHealth").style.color = badStatus;
			}
		}
	
		document.getElementById("cpuStamina").innerHTML = "Stamina: "+cpuStamina;
		document.getElementById("cpuDefense").innerHTML = "Defense: "+cpuDefensePoints;
		document.getElementById("cpuHealth").innerHTML = "Health: "+cpuHealth;
	
		if(cpuStamina>2) {
			document.getElementById("cpuStamina").style.color = goodStatus;
		}
		else {
			if(cpuStamina>0) {
				document.getElementById("cpuStamina").style.color = middleStatus;
			}
			else {
				document.getElementById("cpuStamina").style.color = badStatus;
			}
		}
		
		if(cpuDefensePoints>2) {
			document.getElementById("cpuDefense").style.color = goodStatus;
		}
		else {
			if(cpuDefensePoints>0) {
				document.getElementById("cpuDefense").style.color = middleStatus;
			}
			else {
				document.getElementById("cpuDefense").style.color = badStatus;
			}
		}
		
		if(cpuHealth>60) {
			document.getElementById("cpuHealth").style.color = goodStatus;
		}
		else {
			if(cpuHealth>20) {
				document.getElementById("cpuHealth").style.color = middleStatus;
			}
			else {
				document.getElementById("cpuHealth").style.color = badStatus;
			}
		}
	
		switch(playerAction) {	
			case 0: document.getElementById("playerAction").innerHTML = "ATTACK "+playerDamage; break;
			case 1: document.getElementById("playerAction").innerHTML = "DEFENSE"; break;
			case 2: document.getElementById("playerAction").innerHTML = "RECOVER";
		}
	
		switch(cpuAction) {
			case 0: document.getElementById("cpuAction").innerHTML = "ATTACK "+cpuDamage; break;
			case 1: document.getElementById("cpuAction").innerHTML = "DEFENSE"; break;
			case 2: document.getElementById("cpuAction").innerHTML = "RECOVER"; 
		}
	}
	
	if(playerHealth <= 0 || cpuHealth <= 0) {
		
		document.getElementById("cardsContainer").style.display= "none";
		document.getElementById("recover").style.display= "none";
		document.getElementById("defense").style.display= "none";
		document.getElementById("score").style.display= "block";
		
		if(playerHealth <= 0 && cpuHealth <= 0) {
			document.getElementById("score").style.background = "#f0f4c3";
			document.getElementById("result").innerHTML = "Draw!";
			finalScore = score()/2;
		}
		else {
			if(playerHealth <= 0) {
				document.getElementById("score").style.background = "#ffcdd2";
				document.getElementById("result").innerHTML = "You Lose!";
				finalScore = score();
			}
		
			if(cpuHealth <= 0) {
				document.getElementById("score").style.background = "#dcedc8";
				document.getElementById("result").innerHTML = "You Won!";
				finalScore = score();
			}
		}
		
		var scoreContainer = "";
		
		for(i=0; i<GameScore.length; i++) {
			scoreContainer += 	"<div class=\"row\" style=\"margin-bottom: 5px;\">"+
									"<div class=\"col s1\"><a style=\"background-color: transparent;\" href=\"#modal_"+GameScore[i].id+"\" class=\"btn-floating btn-small btn-flat modal-trigger\"><i class=\"small material-icons black-text\">info_outline</i></a></div>"+
									"<div class=\"col s10\">"+GameScore[i].name+":</div>"+
									"<div class=\"col s1\">"+GameScore[i].val+"</div>"+
								"</div>";
		}
								
		document.getElementById("finalScore").innerHTML = "Final score: "+finalScore;
		
		document.getElementById("scoreContainer").innerHTML = scoreContainer;
		
	}
}

// --------- RANDOM GENERATOR ---------

function randomGenerator(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function division(a, b) {
	if(isNaN(a/b)) return 0;
	else return a/b;
}

function score() {
	//document.getElementById("debug").innerHTML = ""+Math.round(division(successfulAttacks.val, attacksCounter.val)*100)/10+" "+(Math.round((division(successfulDefenses.val, defensesCounter.val))*100)/10 * successfulDefenses.val + 10)+"";
	return Math.round(Math.round(division(successfulAttacks.val, attacksCounter.val)*100)/10 * (Math.round((division(successfulDefenses.val, defensesCounter.val))*100)/10 * successfulDefenses.val + 10) * playerHealth) * 10;
}