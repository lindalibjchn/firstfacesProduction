function get_word_context(){

    if ($('#upper_'+conversationVariables.startIDX).text().trim().split(" ").length == 1){
        idx = 0;
        for(i=0;i<parseInt(conversationVariables.startIDX);i++){
            if($('#upper_'+i).hasClass('normal-word') || $('#upper_'+idx).hasClass('uncorrected-error')){
                idx += $('#upper_'+idx).text().trim().split(" ").length;
            }
            else{
                idx += $('#lower_'+idx).text().trim().split(" ").length;
            }
        }


        pos = conversationVariables.POS_Tags[idx];
        word = $('#bottomCent').text().trim().split(" ")[0];

        let fd = new FormData();
        fd.append("word",word);
        fd.append("pos", pos);
        $.ajax({
        url: "/get_context",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {


            if(json.success == 0){
                console.log("Context error.")
                $('#btnCont').removeClass().addClass('wholeSide');
                $('#SpectroSpinHolder').removeClass().addClass('noSide');
                $('#fixedWord').removeClass().addClass('noSide');
                conversationVariables.Trigram = false;
            }
            else{
                conversationVariables.Trigram = true;
                if(json.id == 0){
                   $('#btnCont').removeClass().addClass('leftSide');
                   $('#SpectroSpinHolder').removeClass().addClass('rightSide');
                   $('#fixedWord').removeClass().addClass('centerSide');
                }
                else if(json.id == 1){
                   $('#btnCont').removeClass().addClass('centerSide');
                   $('#SpectroSpinHolder').removeClass().addClass('leftSide');
                   $('#fixedWord').removeClass().addClass('rightSide');
                }
                else{
                     $('#btnCont').removeClass().addClass('rightSide');
                     $('#SpectroSpinHolder').removeClass().addClass('leftSide');
                     $('#fixedWord').removeClass().addClass('centerSide');
                }
                $('#SpectroSpinCont').empty().append('<div id="tophalfSpec"></div>').append('<div id="bottomhalfSpec"></div>');

                conversationVariables.Audio_Dicts = {};



                for(i=0;i<json.tiles_html.length;i++){
                    $('#SpectroSpinCont').append(json.tiles_html[i]);
                }
                tiles = json.tiles;
                hiddenBottom = json.hidden_tiles;
                $('#fixedWord').empty().append(json.fixed_tile);

                var fixedAudioURL = "http://127.0.0.1:8000/" + json.fixed_audio;
                var fixedAudio = document.getElementById("fixedAudio");
                fixedAudio.src = fixedAudioURL;

                 synthesisObject.data.Ref_Word = {
                    'URLs':[$('#refAudio').attr('src')],
                    'phones':[json.c_vis],
                    'texts': [json.word],
                    'duration':conversationVariables.refLenOriginal
                }
                synthesisObject.data.Fixed_Word = {
                    'URLs':[fixedAudioURL],
                    'phones':[json.fixed_vis],
                    'texts': [json.fixed_word],
                    'duration':json.fixed_duration
                }

                $('#tileAudios').empty()
                var count = 0;
                for(i=0;i<tiles.length;i++){
                    if(tiles[i] != ''){
                        $('#tileAudios').append('<audio id="'+tiles[i]+'_audio" src="http://127.0.0.1:8000/'+json.tile_audio[count]+'" />' )
                         synthesisObject.data[tiles[i]] = {
                             'URLs':['http://127.0.0.1:8000/'+json.tile_audio[count]],
                             'texts':[$('#'+tiles[i]).find('span.tile-main-word').text()],
                             'phones':[json.tile_vis[count]],
                             'duration':json.tile_durations[count]
                         }
                        count++;
                    }
                }
                if(hiddenBottom.length > 0){
                    for(i=0;i<hiddenBottom.length;i++){
                        $('#tileAudios').append('<audio id="'+hiddenBottom[i]+'_audio" src="http://127.0.0.1:8000/'+json.tile_audio[i+tile.length]+'" />' )
                        synthesisObject.data[hiddenBottom[i]] = {
                             'URLs':['http://127.0.0.1:8000/'+json.tile_audio[i+tile.length]],
                             'texts':[$('#'+hiddenBottom[i]).find('span.tile-main-word').text()],
                             'phones':[json.tile_vis[i+tile.length]],
                             'duration':json.tile_durations[i+tile.length]
                         }
                    }
                }
                setUpSpectrospin();
            }

        },
        error: function() {
            console.log("Context error.");
            conversationVariables.Trigram = false;
            $('#btnCont').removeClass().addClass('wholeSide');
            $('#SpectroSpinHolder').removeClass().addClass('noSide');
            $('#fixedWord').removeClass().addClass('noSide');
        },

    });


    }
    else{
        console.log("Too many words to get context")
        $('#btnCont').removeClass().addClass('wholeSide');
        $('#SpectroSpinHolder').removeClass().addClass('noSide');
        $('#fixedWord').removeClass().addClass('noSide');
    }

}


function tag_sentence(){
    let fd = new FormData();
    fd.append("sentence", getSentence().trim());
    $.ajax({
        url: "/tag_sentence",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {
            conversationVariables.POS_Tags = json.POS;
            console.log('POS tagging complete');
        },
        error: function() {
            console.log("POS tagging error.");
        },

    });
}

function splice_audio(){
    out = []
    words = []
    viss = []

    if($('#btnCont').hasClass('wholeSide')){
        tiaSpeaks('Ref_word');
    }else{
        if($('#btnCont').hasClass('leftSide')){
            viss.push(synthesisObject.data.Ref_Word.phones);
            out.push($('#refAudio').attr('src'));
            words.push($('#refText').text());
            if($('#fixedWord').hasClass('centerSide')){
                out.push($('#fixedAudio').attr('src'));
                words.push($('#fixedWord').find("span.tile-main-word").text());
                viss.push(synthesisObject.data.Fixed_Word.phones);
                out.push($('#'+document.getElementsByClassName('main-tile')[0].id+"_audio").attr('src'));
                words.push($('#'+document.getElementsByClassName('main-tile')[0].id).find("span.tile-main-word").text());
                viss.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].phones);

            }
            else if($('#SpectroSpinHolder').hasClass('centerSide')){
                out.push($('#'+document.getElementsByClassName('main-tile')[0].id+"_audio").attr('src'));
                words.push($('#'+document.getElementsByClassName('main-tile')[0].id).find("span.tile-main-word").text());
                viss.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].phones);
                out.push($('#fixedAudio').attr('src'));
                viss.push(synthesisObject.data.Fixed_Word.phones);
                words.push($('#fixedWord').find("span.tile-main-word").text());
            }
        }
        else if($('#SpectroSpinHolder').hasClass('leftSide')){
            out.push($('#'+document.getElementsByClassName('main-tile')[0].id+"_audio").attr('src'));
            words.push($('#'+document.getElementsByClassName('main-tile')[0].id).find("span.tile-main-word").text());
            viss.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].phones);
            if($('#btnCont').hasClass('centerSide')){
                out.push($('#refAudio').attr('src'));
                words.push($('#refText').text());
                viss.push(synthesisObject.data.Ref_Word.phones);
                out.push($('#fixedAudio').attr('src'));
                viss.push(synthesisObject.data.Fixed_Word.phones);
                words.push($('#fixedWord').find("span.tile-main-word").text());
            }
            else if($('#fixedWord').hasClass('centerSide')){
                 out.push($('#fixedAudio').attr('src'));
                 words.push($('#fixedWord').find("span.tile-main-word").text());
                 viss.push(synthesisObject.data.Fixed_Word.phones);
                 out.push($('#refAudio').attr('src'));
                 words.push($('#refText').text());
                 viss.push(synthesisObject.data.Ref_Word.phones);
            }
        }
        else if($('#fixedWord').hasClass('leftSide')){
            out.push($('#fixedAudio').attr('src'));
            words.push($('#fixedWord').find("span.tile-main-word").text());
            viss.push(synthesisObject.data.Fixed_Word.phones);
           if($('#btnCont').hasClass('centerSide')){
                out.push($('#refAudio').attr('src'));
                words.push($('#refText').text());
                viss.push(synthesisObject.data.Ref_Word.phones);
                out.push($('#'+document.getElementsByClassName('main-tile')[0].id+"_audio").attr('src'));
                words.push($('#'+document.getElementsByClassName('main-tile')[0].id).find("span.tile-main-word").text());
                viss.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].phones);
           }
           else if($('#SpectroSpinHolder').hasClass('centerSide')){
                out.push($('#'+document.getElementsByClassName('main-tile')[0].id+"_audio").attr('src'));
                words.push($('#'+document.getElementsByClassName('main-tile')[0].id).find("span.tile-main-word").text());
                viss.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].phones);
                 out.push($('#refAudio').attr('src'));
                 words.push($('#refText').text());
                 viss.push(synthesisObject.data.Ref_Word.phones);
           }
        }


        let fd = new FormData();
            fd.append("urls",out);
            fd.append("words", words);
            fd.append("viss", viss);
        $.ajax({
            url: "/get_spliced_audio",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(json) {
                var path = 'http://127.0.0.1:8000/'+json.path;
                synthesisObject.data['Spliced_Audio'] = {
                             'URLs':[path],
                             'texts':[json.words],
                             'phones':[json.viss],
                             'duration':json.duration,
                         }
                 tiaSpeak('Spliced_Audio');
            },
            error: function() {console.log("Error slicing audio")},
        });
    }
}

$('#playTrigramBtn').click(function(){
    splice_audio();
});

