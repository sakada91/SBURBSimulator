//if i am page or blood player, can't do this alone.

function SolvePuzzles(session){
	this.session = session;
	this.canRepeat = true;
	this.player1 = null;
	this.player2 = null; //optional


	this.checkPlayer = function(player){
		this.player1 = player;
		this.player2 = null;
		if(player.aspect == "Blood" || player.class_name == "Page"){
			if(this.session.availablePlayers.length > 1){
				this.player2 = getRandomElementFromArray(this.session.availablePlayers);
				if(this.player2 == this.player1 && this.player2.aspect != "Time"){
					this.player1 = null;
					this.player2 = null;
					return null;
				}

			}else{
				this.player1 = null;
				return null;
			}
		}

		//if i'm not blood or page, random roll for a friend.
		if(this.session.availablePlayers.length > 1 && Math.seededRandom() > .5){
			this.player2 = findHighestMobilityPlayer(this.session.availablePlayers);
			if(this.player2 == this.player1 && this.player1.aspect != "Time"){  //only time player can help themselves out.
				this.player2 == null
			}
		}

	}
	this.trigger = function(playerList){
		this.player1 = null; //reset
		this.player2 = null;
		for(var i = 0; i<this.session.availablePlayers.length; i++){
			this.checkPlayer(this.session.availablePlayers[i]);
			if(this.player1 != null && this.player1.land != null){
				return true;
			}
		}
		if(this.player1 == null || this.session.availablePlayers.length == 0 || this.player1.land == null){
			return false;
		}
		return true;


	}

	this.checkBloodBoost = function(){
		if(this.player1.aspect == "Blood" && this.player2 != null){
			this.player2.boostAllRelationships
		}

		if(this.player2!=null && this.player2.aspect == "Blood"){
			this.player1.boostAllRelationships();
		}
	}


	this.renderContent = function(div){
		//console.log("Ultimate Riddle for Player with power of: " + this.player1.power + " and land level of: " + this.player1.landLevel + " " + this.player1)
		div.append("<br>"+this.content());
	}

	this.spreadCoruption = function(player1, player2){
		var ret = false;
		if(player2 && player2.grimDark>0){
			player1.corruptionLevelOther += 25;
			ret = true;
		}

		if(player2 && player1.grimDark>0){
			player2.corruptionLevelOther += 25;
			ret = true;
		}

		if(corruptedOtherLandTitles.indexOf(player1.land1) != -1 || corruptedOtherLandTitles.indexOf(player1.land2) != -1 ){
			player1.corruptionLevelOther += 25;
			if(player2) player2.corruptionLevelOther += 25;
			ret = true;
		}

		if(ret){
		//	console.log("Spreading corruptin in: " + this.session.session_id)
			return "The corruption is spreading."
		}
		return "";

	}

	this.content = function(){
		//console.log("Solving puzzles at: " + this.player1.land)
		var ret = "";
		//remove player1 and player2 from available player list.
		removeFromArray(this.player1, this.session.availablePlayers);
		removeFromArray(this.player2, this.session.availablePlayers);
		var r1 = null;
		var r2 = null;
		var living = findLivingPlayers(this.session.players);
		var dead = findDeadPlayers(this.session.players)
		if(living.length == 1 && dead.length > 2){  //less of a reference if it's just one dead dude.
			console.log("SWEET BIKE STUNTS, BRO: " + this.session.session_id)
			var realSelf = "";
			if(!this.player1.isDreamSelf && !this.player1.godTier){
				console.log("Real self stunting in: " + this.session.session_id)
				realSelf =  "You are duly impressed that they are not a poser who does dreamself stunting.  Realself stunting 5ever, bro."
			}
			return "The " +  this.player1.htmlTitle()  + " is "+ getRandomElementFromArray(bike_quests) + "." + realSelf;
		}
		this.player1.increasePower();
		if(this.player2 != null &&  this.player1  != this.player2){  //could be a time double, don't have a relationship with a time double (it never works out)
			this.player1.increasePower();
			this.player2.increasePower();
			this.player1.interactionEffect(this.player2);
			this.player2.interactionEffect(this.player1);
		}

		this.checkBloodBoost();

		ret += "The " + this.player1.htmlTitle();
		if(this.player2 != null && (this.player2.aspect != this.player1.aspect ||this.player2.aspect == "Time")){ //seriously, stop having clones of non time players!!!!
			ret += " and the " + this.player2.htmlTitle() + " do ";
		}else{
			ret += " does "
		}
		ret += " random bullshit sidequests at " + this.player1.shortLand();
		ret += ", solving puzzles and getting coy hints about The Ultimate Riddle. "

		ret += this.spreadCoruption(this.player1, this.player2);
		return ret;
	}


}
