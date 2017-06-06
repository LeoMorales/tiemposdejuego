var APP;

var Quarter = function () {

}

var Player = function (number, name) {
	this.number = number;
	this.name = name;
	this._in_field = false;
	this._enter_time = null; // save the last time that the player goes into the field
	this.minutes = 0;  // Acumulates minutes per quarter...
	this.minutes_per_quarter = [0, 0, 0, 0]; // Acumulates the minutes played in the quarters

	this.is_in_field = function () {
		return this._in_field;
	}

	this.is_running = function () {
		return this._enter_time != null;
	}

	this.enter_to_field = function () {
		this._in_field = true;
	}

	this.run = function () {
		if (this.is_in_field()) {
			this._enter_time = new Date();
		}
	}

	this.stop = function () {
		if ( this.is_in_field() ) {
			this.minutes += ((new Date().getTime() - this._enter_time.getTime()) / 1000) /60;
			this._enter_time = null;
		}
	}

	this.quarter_finished = function (quarter_number) {
		this.stop();
		this.minutes_per_quarter[quarter_number] = this.minutes;
		this.minutes = 0;  // Reset
	}

	this.acumulated_minutes_played = function () {
		// Sumatory of times of the quarters array
		return this.minutes_per_quarter.reduce(function(a, b){ return a + b; });
	}

    this.representation = function () {
        return this.number + " - " + this.name;
    }

    this.get_name = function () {
        return this.name;
    }

    this.get_number = function () {
        return this.number;
    }

}

var Game = function (player_list_mgr) {

	// Attributes
    this.players = []; // all players availables
    this._status = 'not_running';
    this._quarter = 0;
    this.player_list_mgr = player_list_mgr; // a Vue instance
    this.substitutes_player_list = null;  // a Vue instance is setted when page 'go to match' is visible.
    this.field_player_list = null;  // a Vue instance is setted when page 'go to match' is visible.
    // this.substitutes_player_list = new Vue({
    //     el: '#match-player-list',
    //     data: {
    //         team: this.players
    //     }
    // }); // to manage the vue list of players...

    // Methods
    this.players_count = function () {
    	return this.players.length
    }

    this.get_players = function () {
        return this.players;
    }

    this.set_substitutes_player_list = function (list) {
        this.substitutes_player_list = list;
    }

    this.set_field_player_list = function (vue_app_list_mgr) {
        this.field_player_list = vue_app_list_mgr;
    }
    
    this.add_player = function (number, name) {
        /**
         * Adds a new player.
         * No valid a repeated t-shirt number.
         * The player is pushed as data to the vue
         * list manager.
         *
         * @type       {Player}
         */

        if( number.length == 0 || name.length == 0 ){
            return null;
        }
        var new_player = new Player(number, name);
    	this.players.push( new_player );
        
        console.log("New player added! "+ new_player.representation());
        console.log("Total: "+this.players_count());
        this.player_list_mgr.team.push({ data: new_player.representation() });

        return new_player;
    }

    this.can_play = function () {
    	return this.players_count() >= 11;
    }

    this.start_quarter = function () {
    	this._status = 'quarter_running';
    	this._quarter++;
    	for (var i = 0; i < this.players.length; i++) {
   			this.players[i].run();
    	}
    }

    this.status = function () {
    	return this._status;
    }

    this.ready = function () {
    	return this.players_in_field_count() == 11;
    }

    this.enter_player = function (player_number) {
        let player_selected = this.get_player_by_number(player_number);
    	player_selected.enter_to_field();
        this.field_player_list.field.push(player_selected);
        let index_of_player = this.substitutes_player_list.team.indexOf(player_selected);
        this.substitutes_player_list.team.splice(index_of_player, 1);
    }

    this.current_quarter = function () {
    	return this._quarter;
    }

    this.players_running = function () {
    	// only to test
    	return this.players.filter( (player) => player.is_running() );
    }

    this.pause_quarter = function () {
    	// Send 'pause' to all players. Only the player that are running stop... 
    	this._status = 'quarter_paused';
    	for (var i = 0; i < this.players.length; i++) {
    		this.players[i].stop();
    	}
    }

    this.resume_quarter = function () {
    	// This gonna be a state pattern
    	if ( this.status() != 'quarter_paused')
    		return;

    	this._status = 'quarter_running';
    	for (var i = 0; i < this.players.length; i++) {
    		this.players[i].run();
    	}
    }

    this.finish_quarter = function () {
    	if ( this.status() != 'quarter_running')
    		return;

    	this._status = 'quarter_finished: '+ this.current_quarter();
    	for (var i = 0; i < this.players.length; i++) {
    		this.players[i].quarter_finished(this.current_quarter());


    	}
    } 

    // Private
    this.players_in_field_count = function () {
    	return this.players_in_field().length;
    }

    this.players_in_field = function () {
    	return this.players.filter( (player) => player.is_in_field() );
    }

    this.get_player_by_number = function (number) {
    	return this.players.find( (player) => player.number == number );
    }
};

APP = {

	new_game: function (player_list_elem) {
		return new Game(player_list_elem);
	}
};

//module.exports = APP;