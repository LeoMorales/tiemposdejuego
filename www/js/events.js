(function(window){
 
/*    $('#take-picture').click(function(){
 
        var camerOptions = { 
            quality: 90,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 200,
            targetHeight: 350
        };
 
        navigator.camera.getPicture(function(imageURI){
 
            var image = $('#photo');
            image.attr('src', imageURI);
            $('#share-container').show();
             
        }, function(errorMessage){
            alert('The following error occured: ' + errorMessage)
        }, camerOptions);
 
    });
 
    $('#share').click(function(){
        var photo_src = $('#photo').attr('src');
        var caption = $('#caption').val();
        window.plugins.socialsharing.share(caption, null, photo_src, null);
    });
*/ 
    $('#floating-button__add_player').click(function(){
        console.log("event: open add player");        
    });

    $('#button__add_new_player').click(function () {
        /**
         * Handler of click on button add new player;
         *
         * @type       {Function}
         */
        var player_name = $('#form__new-player #input__player-name').val(),
            player_number = $('#form__new-player #input__player-number').val(),
            player = null;
        console.log('event: trying add new jugador: '+ player_number + ' - ' + player_name);
        player = app.GAME.add_player(player_number, player_name);
        if ( player === null ){
            return;
        }
        $("#modal__new_player").removeClass("active");
        $('#form__new-player #input__player-name').val("");
        $('#form__new-player #input__player-number').val("");

        
    });

    $("#button__go_to_match").click(function () {

        console.log("GO TO MATCH...");


    });


})(window);