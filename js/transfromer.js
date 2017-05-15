function transformerBattle(bots){
	var autoBots = new Team("A", bots);
	var decept = new Team("D", bots);
	
	console.log(autoBots);
	console.log(decept);

	battle(autoBots, decept);

	findVictor(autoBots, decept);
}

//  Build Team

	var Team = function(type, bots){
		this.name = type;
		this.battlesWon = 0;
		this.bots = findTeam(type, bots);
		this.bots.sort(rankBots);
		this.teamSize = this.bots.length;
		this.totBattles = 0;
	};

	Team.prototype.getName = function(){
		return this.name;
	};

	Team.prototype.getTeamSize = function(){
		return this.teamSize;
	};

	Team.prototype.getBot = function(index){
		return this.bots[index];
	};

	Team.prototype.getWins = function(){
		return this.battlesWon;
	};

	Team.prototype.getBotNames = function(){
		var names = [];
		for(var i = 0; i < this.teamSize; i++){
			names.push(this.bots[i].getName());
		}
		return names;
	};

	Team.prototype.getLivingBots = function(){
		var names = [];
		for(var i = 0; i < this.teamSize; i++){
			if(!this.bots[i].getDead()){
				names.push(this.bots[i].getName());
			}
		}
		return names;
	};

	Team.prototype.setTotBattles = function(num){
		this.totBattles = num;
	};

	Team.prototype.getTotBattles = function(){
		return this.totBattles;
	};

	Team.prototype.killAll = function(){
		console.log("kiil all bots");
		for(var i = 0; i < this.bots.length; i++){
			this.bots[i].kill();
		}
		this.battlesWon = 0;
	};

	Team.prototype.win = function(){
		this.battlesWon++;
	};

	


	// Build Bot

	var Bot = function(info){
		this.name = info[0];
		this.team = info[1];
		this.isBoss = isBoss(this.name);
		this.ranks = info.slice(2);
		this.score = findBotScore(info);
		this.dead = false;
	};

	Bot.prototype.getName = function(){
		return this.name;
	};

	Bot.prototype.getBoss = function(){
		return this.isBoss;
	};

	Bot.prototype.getRanks = function(){
		return this.ranks;
	};

	Bot.prototype.getScore = function(){
		return this.score;
	};

	Bot.prototype.getDead = function(){
		return this.dead;
	};

	Bot.prototype.kill = function(){
		this.dead = true;
	};

	

	// sorting functions

	function findTeam(team, bots){
		var builtBots = [];
		for(var i = 0; i < bots.length; i++){
			if(bots[i][1] === team){
				builtBots.push(new Bot(bots[i]));
			}
		}
		return builtBots;
	}

	function rankBots(a, b){
		console.log(a);
		console.log(b);
		var aScore = a.getScore();
		var bScore = b.getScore();
		if(aScore < bScore){
			return 1;
		}else if(aScore > bScore){
			return -1;
		}else{
			return 0;
		}
	}

	function findBotScore(bot){
		return bot.slice(2).reduce(function(a, b){
			return a + b;
		},0);
		
	}

	function isBoss(name){
		if(name === "Optimus Prime" || name === "Predaking"){
			return true;
		}else{
			return false;
		}
	}

	// battle functions

	function battle(team1, team2){
		var numBattles = findNumBattles(team1, team2);
		for(var i = 0; i < numBattles; i++){
			var bot1 = team1.getBot(i);
			var bot2 = team2.getBot(i);
			
			team1.setTotBattles(i + 1);

			var bossCount = bossBattle(team1, team2, bot1, bot2);

			if(bossCount === 2){
				break;
			}else if(bossCount === 0){
				minionBattle(team1, team2, bot1, bot2);
			}
		}
	}

	function findNumBattles(teamA, teamB){
		var teamASize = teamA.getTeamSize();
		var teamBSize = teamB.getTeamSize();
		if(teamASize < teamBSize){
			return teamASize;
		}else{
			return teamBSize;
		}
	}

	function bossBattle(team1, team2, bot1, bot2){
		var bot1Boss = bot1.getBoss();
		var bot2Boss = bot2.getBoss();
		console.log("bot1Boss: " + bot1Boss);
		console.log("bot2Boss: " + bot2Boss);
		if(bot1Boss && bot2Boss){
			team1.killAll();
			team2.killAll();
			return 2;
		}else if(bot1Boss){
			team1.win();
			bot2.kill();
			return 1;
		}else if(bot2Boss){
			team2.win();
			bot1.kill();
			return 1;
		}
		return 0;
	}

	function minionBattle(team1, team2, bot1, bot2){
		var ranks1 = bot1.getRanks();
		var ranks2 = bot2.getRanks();
		var courageDiff = ranks1[5] - ranks2[5];
		var strengthDiff = ranks1[0] - ranks2[0];
		var skillDiff = ranks1[7] - ranks2[7];
		var scoreDiff = bot1.getScore() - bot2.getScore();

		if(courageDiff > 4 || strengthDiff > 3){
			bot1Win();
		}else if(courageDiff < -4 || strengthDiff < -3){
			bot2Win();
		}else if(skillDiff > 3){
			bot1Win();
		}else if(skillDiff < -3){
			bot2Win();
		}else if(scoreDiff > 1){
			bot1Win();
		}else if(scoreDiff < -1){
			bot2Win();
		}else{
			bot1.kill();
			bot2.kill();
		}


		function bot1Win(){
			team1.win();
			bot2.kill();
		}
		function bot2Win(){
			team2.win();
			bot1.kill();
		}
	}

	// victory function

	function findVictor(team1, team2){
		var winDiff = team1.getWins() - team2.getWins();
		var totBattles = team1.getTotBattles();
		if(team1.getWins() === 0 && team2.getWins() === 0 && team1.getLivingBots().length === 0 && team2.getLivingBots().length === 0){
			console.log("World Distroyed, everyone is dead...");
		}else if(winDiff > 0){
			printResult(totBattles, team1, team2);
		}else if(winDiff < 0){
			printResult(totBattles, team2, team1);
		}else{
			console.log("It's a tie!");
		}


		function printResult(battles, winner, losser){
			console.log(battles + " battle(s)");
			console.log("Winning Team (" + winner.getName() + "): " + winner.getBotNames().toString());
			console.log("Survivors from the losing team (" + losser.getName() + "): " + losser.getLivingBots().toString());
		}
	}