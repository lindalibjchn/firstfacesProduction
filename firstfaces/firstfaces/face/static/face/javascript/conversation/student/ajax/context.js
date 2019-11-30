


function get_word_context(){
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
        word = $('#bottomCent').text().trim().split(" ");


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
                $('#refBtn').removeClass().addClass("wholeSpec").addClass("ref-word");
                $('#SpectroSpinHolder').removeClass().addClass('noSide');
                $('#fixedWord').removeClass().addClass('noSide');

                synthesisObject.data.Ref_Word = {
                    'URLs':[$('#refAudio').attr('src')],
                    'phones':[json.c_vis],
                    'texts': [json.joined_word],
                    'duration':conversationVariables.refLenOriginal
                }
                conversationVariables.Trigram = false;
            }
            else{
                conversationVariables.Trigram = true;
                if(json.id == 0){
                   $('#btnCont').removeClass().addClass('leftSide');
                   $('#refBtn').removeClass("centered").removeClass('right-sided').addClass('left-sided');
                   $('#SpectroSpinHolder').removeClass().addClass('rightSide');
                   $('#fixedWord').removeClass().addClass('centerSide');

                }
                else if(json.id == 1){
                   $('#btnCont').removeClass().addClass('centerSide');
                   $('#refBtn').removeClass("left-sided").removeClass('right-sided').addClass('centered');
                   $('#SpectroSpinHolder').removeClass().addClass('rightSide');
                   $('#fixedWord').removeClass().addClass('centerSide');
                }
                else{
                     $('#btnCont').removeClass().addClass('rightSide');
                     $('#refBtn').removeClass("centered").removeClass('left-sided').addClass('right-sided');
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

                var fixedAudioURL = prefixURL + json.fixed_audio;
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
                        $('#tileAudios').append('<audio id="'+tiles[i]+'_audio" src="' + prefixURL + json.tile_audio[count]+'" />' )
                         synthesisObject.data[tiles[i]] = {
                             'URLs':[prefixURL +json.tile_audio[count]],
                             'texts':[$('#'+tiles[i]).find('span.tile-main-word').text()],
                             'phones':[json.tile_vis[count]],
                             'duration':json.tile_durations[count]
                         }
                        count++;
                    }
                }
                if(hiddenBottom.length > 0){
                    for(i=0;i<hiddenBottom.length;i++){
                        $('#tileAudios').append('<audio id="'+hiddenBottom[i]+'_audio" src="' + prefixURL +json.tile_audio[i+tile.length]+'" />' )
                        synthesisObject.data[hiddenBottom[i]] = {
                             'URLs':[prefixURL +json.tile_audio[i+tile.length]],
                             'texts':[$('#'+hiddenBottom[i]).find('span.tile-main-word').text()],
                             'phones':[json.tile_vis[i+tile.length]],
                             'duration':json.tile_durations[i+tile.length]
                         }
                    }
                }
                fix_locations(json.id);
                setUpSpectrospin();
            }

        },
        error: function() {
            console.log("Context error.");
            conversationVariables.Trigram = false;
            $('#btnCont').removeClass().addClass('wholeSide');
            $('#refBtn').removeClass().addClass("wholeSpec").addClass("ref-word");
            $('#SpectroSpinHolder').removeClass().addClass('noSide');
            $('#fixedWord').removeClass().addClass('noSide');
        },

    });

}





function fix_locations(value){
    conversationVariables.IDX_Val = value
    console.log("CALLED FIX LOCATIONS");
    if(value == 0){
        $('.main-tile').css({'width':'90%','left':'0','border-radius':'0 5px 5px 0','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'3px solid black','border-left':'0'})
        $('.second-tile-top').css({"width":"72%","left":"9%","top":"23.2%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.second-tile-bottom').css({"width":"72%","left":"9%","top":"62.8%",'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-top').css({"width":"57.6%","left":"16.2%","top":"9.76%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-top-hidden').css({"width":"57.6%","left":"16.2%","top":"9.76%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-bottom').css({"width":"57.6%","left":"16.2%","top":"82.96%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-bottom-hidden').css({"width":"57.6%","left":"16.2%","top":"82.96%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});//Center hyp??
        $('#fixedWordTile').removeClass("left-sided").removeClass('right-sided').addClass('centered');
    }else if(value == 1){
        $('.main-tile').css({'width':'90%','left':'10%','border-radius':'5px 0 0 5px','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'0','border-left':'3px solid black'})
        $('#fixedWordTile').removeClass("left-sided").removeClass('centered').addClass('right-sided');
        $('.second-tile-top').css({"width":"72%", "left":"19%", "top":"23.2%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.second-tile-bottom').css({"width":"72%", "left":"19%", "top":"62.8%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-top').css({"width":"57.6%", "left":"26.2%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-top-hidden').css({"width":"57.6%", "left":"26.2%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-bottom').css({"width":"57.6%", "left":"26.2%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-bottom-hidden').css({"width":"57.6%", "left":"26.2%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
    }else{
        $('.main-tile').css({'width':'90%','left':'10%','border-radius':'5px 0 0 5px','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'0','border-left':'3px solid black'})
        $('#fixedWordTile').removeClass("left-sided").removeClass('right-sided').addClass('centered');
        $('.second-tile-top').css({"width":"72%", "left":"19%", "top":"23.2%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.second-tile-bottom').css({"width":"72%", "left":"19%", "top":"62.8%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-top').css({"width":"57.6%", "left":"26.2%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-top-hidden').css({"width":"57.6%", "left":"26.2%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-bottom').css({"width":"57.6%", "left":"26.2%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-bottom-hidden').css({"width":"57.6%", "left":"26.2%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
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
        tiaPrepareToSpeak('Ref_Word');
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
                var path = prefixURL+json.path;
                synthesisObject.data['Spliced_Audio'] = {
                             'URLs':[path],
                             'texts':[json.words],
                             'phones':[json.viss],
                             'duration':json.duration,
                         }
                 tiaPrepareToSpeak('Spliced_Audio');
            },
            error: function() {console.log("Error slicing audio")},
        });
    }
}

$('#playTrigramBtn').click(function(){
    splice_audio();
});

function increase_type_size_stage2(){
    $('#correctionOverlay').css({'background-color':'rgba(255,255,255,0.8)', 'z-index':4}).animate({height:'100%'},300);
    $('#sentenceShowHolder').css('background-color','rgba(255,255,255,0)')
    $('#overlayBtnBox').css('height','10%');
    $('#finishClassIconContainer').hide()
    $('#prevSentsIconContainer').hide()
    $('#closeTallType').css("display","flex");
    conversationVariables.size_increased = true;
}

$('#closeTallTypeText').click(decrease_type_size_stage2);

function decrease_type_size_stage2(){
    $('#correctionOverlay').css({'background-color':'rgba(255,255,255,0)', 'z-index':2}).animate({height:'50%'},300);
    $('#sentenceShowHolder').css('background-color','rgba(255,255,255,0.8)')
    $('#overlayBtnBox').css('height','20%');
    $('#finishClassIconContainer').show()
    $('#prevSentsIconContainer').show()
    $('#closeTallType').css("display","none");
    unmoveText();
    $("#bottomCent").attr("contenteditable",false);
    $('#keyboardOverlay').show();
    $('#bottomCent').hide();
}

