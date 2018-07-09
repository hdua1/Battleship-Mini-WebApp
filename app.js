new Vue({
	el:'#app',
	data:{
		brutusHealth:100,
		popeyeHealth:100,
		gameIsRunning:false,
		turns: []
	},
	methods:{
		startGame:function(){
			this.gameIsRunning = true;
			this.popeyeHealth = 100;
			this.brutusHealth = 100;
			this.turns = [];
		},
		attack:function(){
			var damage = this.calculateDamage(3,10);
			this.brutusHealth -= damage;
			this.turns.unshift({
				isPopeye: true,
				text: 'Popeye hits Brutus for '+damage
			});
			if(this.checkVictory()){
				return;
			}
			this.brutusAttack();
		},
		specialAttack:function(){
			var damage = this.calculateDamage(10,20);
			this.brutusHealth -=damage;
			this.turns.unshift({
				isPopeye: true,
				text: 'Popeye hits Brutus with special attack for '+damage
			});
			if(this.checkVictory()){
				return;
			}
			this.brutusAttack();
		},
		spinach:function(){
			if(this.popeyeHealth<=90){
				this.popeyeHealth += 10;
			}
			else{
				this.popeyeHealth = 100;
			}
			this.turns.unshift({
				isPopeye: true,
				text: 'Popeye eats spinach! Health + 10'
			});
			this.brutusAttack();
		},
		runAway:function(){
			this.gameIsRunning = false; 
		},
		calculateDamage:function(min,max){
			return Math.max(Math.floor(Math.random() * max) + 1);
		},
		checkVictory:function(){
			if(this.brutusHealth<=0){
				if(confirm('Popeye wins! New Game?')){
					this.startGame();
				}
				else{
				this.gameIsRunning = false;
				}
				return true;
			} else if(this.popeyeHealth<=0){
				if(confirm('Popeye loses to Brutus! Play again?')){
					this.startGame();
				}
				else{
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		},
		brutusAttack:function(){
			var d = this.calculateDamage(5,12);
			this.popeyeHealth -= d;
			this.turns.unshift({
				isPopeye: false,
				text: 'Brutus hits Popeye for '+d
			});
			this.checkVictory(); 
		}
	}
})