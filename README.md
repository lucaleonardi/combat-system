# combat-system
The combat system I created for a rogue like project

## How to play
The combat system is quite simple, there are just some rules to understand:

### 1. Gameplay mechanics
The fight is turn based with the turns simoultaneously resolved (like rock, paper and scissor)

### 2. How to win
The objective of the match is to bring the opponent's HP to 0.
Each fighter has three parameters:
**HP**: the health points
**Stamina**: it's used for attacking. Fighters can attack only when they have enough stamina
**Defense points**: are used for defending, they auto-regenerates at each turn in which the DEFENSE action was not used during the previous turn

### 3. Actions
During the turn each fighter has three actions available:
**Recover**: without enough stamina the fighter can't attack, this is the only way to refill the stamina points. Durign this action, the fighter is exposed to a potential opponent attack
**Defense**: used for blocking opponent attacks. Fighters can use this action without restriction as long as they have defense points available. Defense points are scaled during an actual block againts an attack
**Attack**: there are three types of attacks — light, normal and heavy. Attacks are defined from four parameters

### 4. Attacks parameters
**DMG**: The damage inflicted from the attack
**SPD**: The speed of the attack. During a simultaneous attack from each fighter, the faster attack will prevail, canceling the other one. If the speed of the attacks is equal, each attack will inflict damage
**BRC**: The breach of the attack. If a fighter blocks an attack, this parameter is subtracted from the defender "defense points". If during the block, this value is higher of the defender "defense points", a part of the (or the whole) damage will pass through
**COST**: The stamina cost of the attack. The stronger the attack, the higher the cost of stamina
