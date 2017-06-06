/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    GAME: null,
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        var app_player_list = new Vue({
            el: '#app-player-list',
            data: {
                team: [
                  // { data: '1 - Arquero' },
                  // { data: '2 - Defensor' },
                  // { data: '3 - Defensor' }
                ]
            }
        });

        this.GAME = APP.new_game(app_player_list);
    },

    initialize_two: function () {
        var substitutes_player_list = new Vue({
            el: '#substitutes-players-list',
            data: {
                team: this.GAME.get_players()
            }
        }); // to manage the vue list of players...

        var field_player_list = new Vue({
            el: '#field-players-list',
            data: {
                field: []
            }
        }); // to manage the vue list of players...
        
        this.GAME.set_substitutes_player_list(substitutes_player_list);
        this.GAME.set_field_player_list(field_player_list);

        $(".player_item_in_bank").click(function (e) {

            console.log(this);
            $(this).addClass("player_ready_to_in");
            let numero = $(this).find(".substitute-player-number").text();
            console.log(numero);
            let player_selected = app.GAME.get_player_by_number(numero);
            console.log(player_selected.representation());
            app.GAME.enter_player(numero);
        })


    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
/*        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
*/
        console.log('Received Event: ' + id);
    }
};

app.initialize();
var checkPage = function(){
    //Only run if twitter-widget exists on page
    if(document.getElementById('page__match')) {
        console.log("GO TO MATCH!");
        app.initialize_two();
    }
};

window.addEventListener('push', checkPage);