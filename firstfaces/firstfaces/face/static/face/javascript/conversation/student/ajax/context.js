


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

            prepareToStopTyping();
            if(json.success == 0){
              //console.log("Context error.")
                $('#btnCont').removeClass().addClass('wholeSide');
                $('#refBtn').removeClass().addClass("ref-word").addClass("centered");
                $('#SpectroSpinHolder').removeClass().addClass('noSide');
                $('#fixedWord').removeClass().addClass('noSide');


                conversationVariables.Trigram = false;
            }
            else{
                conversationVariables.Trigram = true;

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



                synthesisObject.data.Fixed_Word = {
                    'URLs':[fixedAudioURL],
                    'visemes':json.fixed_vis,
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
                             'visemes':json.tile_vis[count],
                             'duration':json.tile_durations[count]
                         }
                        count++;
                    }
                }
                if(hiddenBottom.length > 0){
                    for(i=0;i<hiddenBottom.length;i++){
                        $('#tileAudios').append('<audio id="'+hiddenBottom[i]+'_audio" src="' + prefixURL +json.tile_audio[i+tiles.length]+'" />' )
                        synthesisObject.data[hiddenBottom[i]] = {
                             'URLs':[prefixURL +json.tile_audio[i+tiles.length]],
                             'texts':[$('#'+hiddenBottom[i]).find('span.tile-main-word').text()],
                             'visemes':json.tile_vis[i+tiles.length],
                             'duration':json.tile_durations[i+tiles.length]
                         }
                    }
                }
                //fix_locations(json.id);
                fix_location_1(json.fid, json.cid)
                conversationVariables.ss_fid = json.fid;
                conversationVariables.ss_cid = json.cid;
                setUpSpectrospin();


            }

        },
        error: function() {
          //console.log("Context error.");
            conversationVariables.Trigram = false;
            $('#btnCont').removeClass().addClass('wholeSide');
            $('#refBtn').removeClass().addClass("ref-word").addClass("centered");
            $('#SpectroSpinHolder').removeClass().addClass('noSide');
            $('#fixedWord').removeClass().addClass('noSide');
        },

    });

}





function fix_locations(value){
    conversationVariables.IDX_Val = value
  //console.log("CALLED FIX LOCATIONS");
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

function fix_location_1(fidx, cidx){
    console.log("CALLED FIX LOCATIONS");
    if(cidx == 0 && fidx == 1){
        $('#fixedWord').removeClass().addClass("centerSide");
        $('#fixedWordTile').removeClass("left-sided").removeClass('right-sided').addClass('centered');
        $('#btnCont').removeClass().addClass("leftSide");
        $('#refBtn').removeClass("centered").removeClass('right-sided').addClass('left-sided');
        $('#SpectroSpinHolder').removeClass().addClass("rightSide");
        $('.main-tile').css({'width':'90%','left':'0','border-radius':'0 5px 5px 0','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'3px solid black','border-left':'0'})
        $('.second-tile-top').css({"width":"72%","left":"9%","top":"23.2%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.second-tile-bottom').css({"width":"72%","left":"9%","top":"62.8%",'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-top').css({"width":"57.6%","left":"16.2%","top":"9.76%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-top-hidden').css({"width":"57.6%","left":"16.2%","top":"9.76%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-bottom').css({"width":"57.6%","left":"16.2%","top":"82.96%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-bottom-hidden').css({"width":"57.6%","left":"16.2%","top":"82.96%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});

    }else if(cidx == 0 && fidx == 2){
        $('#fixedWord').removeClass().addClass("rightSide");
        $('#fixedWordTile').removeClass("centered").removeClass('left-sided').addClass('right-sided');
        $('#btnCont').removeClass().addClass("leftSide");
        $('#refBtn').removeClass("centered").removeClass('right-sided').addClass('left-sided');
        $('#SpectroSpinHolder').removeClass().addClass("centerSide");
        $('.main-tile').css({'width':'100%','left':'0%','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'3px solid black','border-left':'3px solid black','border-radius':'0'});
        $('.second-tile-top').css({"width":"80%", "left":"10%", "top":"23.2%", 'border':"3px solid black", 'border-radius': '0'});
        $('.second-tile-bottom').css({"width":"80%", "left":"10%", "top":"62.8%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-top').css({"width":"64%", "left":"18%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-top-hidden').css({"width":"64%", "left":"18%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-bottom').css({"width":"64%", "left":"18%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-bottom-hidden').css({"width":"64%", "left":"18%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '0'});

    } else if(cidx == 1 && fidx == 0){
        $('#fixedWord').removeClass().addClass("leftSide");
        $('#fixedWordTile').removeClass("centered").removeClass('right-sided').addClass('left-sided');
        $('#btnCont').removeClass().addClass("centerSide");
        $('#refBtn').removeClass("left-sided").removeClass('right-sided').addClass('centered');
        $('#SpectroSpinHolder').removeClass().addClass("rightSide");
        $('.main-tile').css({'width':'90%','left':'0','border-radius':'0 5px 5px 0','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'3px solid black','border-left':'0'})
        $('.second-tile-top').css({"width":"72%","left":"9%","top":"23.2%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.second-tile-bottom').css({"width":"72%","left":"9%","top":"62.8%",'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-top').css({"width":"57.6%","left":"16.2%","top":"9.76%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-top-hidden').css({"width":"57.6%","left":"16.2%","top":"9.76%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-bottom').css({"width":"57.6%","left":"16.2%","top":"82.96%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});
        $('.third-tile-bottom-hidden').css({"width":"57.6%","left":"16.2%","top":"82.96%", 'border':"3px solid black", 'border-radius': '0 5px 5px 0'});

    }else if(cidx == 1 && fidx == 2){
        $('#fixedWord').removeClass().addClass("rightSide");
        $('#fixedWordTile').removeClass("centered").removeClass('left-sided').addClass('right-sided');
        $('#btnCont').removeClass().addClass("centerSide");
        $('#refBtn').removeClass("left-sided").removeClass('right-sided').addClass('centered');
        $('#SpectroSpinHolder').removeClass().addClass("leftSide");
        $('.main-tile').css({'width':'90%','left':'10%','border-radius':'5px 0 0 5px','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'0','border-left':'3px solid black'})
        $('.second-tile-top').css({"width":"72%", "left":"19%", "top":"23.2%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.second-tile-bottom').css({"width":"72%", "left":"19%", "top":"62.8%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-top').css({"width":"57.6%", "left":"26.2%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-top-hidden').css({"width":"57.6%", "left":"26.2%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-bottom').css({"width":"57.6%", "left":"26.2%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});
        $('.third-tile-bottom-hidden').css({"width":"57.6%", "left":"26.2%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '5px 0 0 5px'});


    }else if(cidx == 2 && fidx == 0){
        $('#fixedWord').removeClass().addClass("leftSide");
        $('#fixedWordTile').removeClass("centered").removeClass('right-sided').addClass('left-sided');
        $('#btnCont').removeClass().addClass("rightSide");
        $('#refBtn').removeClass("left-sided").removeClass('centered').addClass('right-sided');
        $('#SpectroSpinHolder').removeClass().addClass("centerSide");
        $('.main-tile').css({'width':'100%','left':'0%','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'3px solid black','border-left':'3px solid black','border-radius':'0'});
        $('.second-tile-top').css({"width":"80%", "left":"10%", "top":"23.2%", 'border':"3px solid black", 'border-radius': '0'});
        $('.second-tile-bottom').css({"width":"80%", "left":"10%", "top":"62.8%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-top').css({"width":"64%", "left":"18%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-top-hidden').css({"width":"64%", "left":"18%", "top":"9.76%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-bottom').css({"width":"64%", "left":"18%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '0'});
        $('.third-tile-bottom-hidden').css({"width":"64%", "left":"18%", "top":"82.96%", 'border':"3px solid black", 'border-radius': '0'});

    }else if(cidx == 2 && fidx == 1){
        $('#fixedWord').removeClass().addClass("centerSide");
        $('#fixedWordTile').removeClass("left-sided").removeClass('right-sided').addClass('centered');
        $('#btnCont').removeClass().addClass("rightSide");
        $('#refBtn').removeClass("left-sided").removeClass('centered').addClass('right-sided');
        $('#SpectroSpinHolder').removeClass().addClass("leftSide");
        $('.main-tile').css({'width':'90%','left':'10%','border-radius':'5px 0 0 5px','border-top':'3px solid black','border-bottom':'3px solid black','border-right':'0','border-left':'3px solid black'})
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
          //console.log('POS tagging complete');
        },
        error: function() {
          //console.log("POS tagging error.");
        },

    });
}

function fix_visemes(vis, p_duration){
    var out = []
    for(i=0;i<vis.length;i++){
        var temp = {"name":vis[i].name, "start":vis[i].start+p_duration ,"end":vis[i].end+p_duration, "Viseme": vis[i].Viseme+"Emp", "stress": vis[i].stress};
        out.push(temp);
    }
    return out;
}

function splice_audio(){
    out = []
    words = []
    viss = []

    if($('#btnCont').hasClass('wholeSide')){
        tiaPrepareToSpeak('Ref_Word');
    }else{
        if($('#btnCont').hasClass('leftSide')){
            viss = viss.concat(fix_visemes(synthesisObject.data.Ref_Word.visemes[0],0));
            out.push(synthesisObject.data.Ref_Word.URLs[0]);
            words.push(synthesisObject.data.Ref_Word.texts[0]);
            if($('#fixedWord').hasClass('centerSide')){
                out.push(synthesisObject.data.Fixed_Word.URLs[0]);
                words.push(synthesisObject.data.Fixed_Word.texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data.Fixed_Word.visemes[0],synthesisObject.data.Ref_Word.duration-500));
                out.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].URLs[0]);
                words.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].visemes[0],synthesisObject.data.Ref_Word.duration+synthesisObject.data.Fixed_Word.duration-1000));

            }
            else if($('#SpectroSpinHolder').hasClass('centerSide')){
                out.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].URLs[0]);
                words.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].visemes[0],synthesisObject.data.Ref_Word.duration-500));
                out.push(synthesisObject.data.Fixed_Word.URLs[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data.Fixed_Word.visemes[0],synthesisObject.data.Ref_Word.duration+synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].duration-1000));
                words.push(synthesisObject.data.Fixed_Word.texts[0]);
            }
        }
        else if($('#SpectroSpinHolder').hasClass('leftSide')){
            out.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].URLs[0]);
            words.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].texts[0]);
            viss = viss.concat(fix_visemes(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].visemes[0],0));
            if($('#btnCont').hasClass('centerSide')){
                out.push(synthesisObject.data.Ref_Word.URLs[0]);
                words.push(synthesisObject.data.Ref_Word.texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data.Ref_Word.visemes[0],synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].duration-500));
                out.push(synthesisObject.data.Fixed_Word.URLs[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data.Fixed_Word.visemes[0],synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].duration+synthesisObject.data.Ref_Word.duration-1000));
                words.push(synthesisObject.data.Fixed_Word.texts[0]);
            }
            else if($('#fixedWord').hasClass('centerSide')){
                 out.push(synthesisObject.data.Fixed_Word.URLs[0]);
                 words.push(synthesisObject.data.Fixed_Word.texts[0]);
                 viss = viss.concat(fix_visemes(synthesisObject.data.Fixed_Word.visemes[0],synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].duration-500));
                 out.push(synthesisObject.data.Ref_Word.URLs[0]);
                 words.push(synthesisObject.data.Ref_Word.texts[0]);
                 viss = viss.concat(fix_visemes(synthesisObject.data.Ref_Word.visemes[0],synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].duration+synthesisObject.data.Fixed_Word.duration-1000));
            }
        }
        else if($('#fixedWord').hasClass('leftSide')){
            out.push(synthesisObject.data.Fixed_Word.URLs[0]);
            words.push(synthesisObject.data.Fixed_Word.texts[0]);
            viss = viss.concat(fix_visemes(synthesisObject.data.Fixed_Word.visemes[0],0));
           if($('#btnCont').hasClass('centerSide')){
                out.push(synthesisObject.data.Ref_Word.URLs[0]);
                words.push(synthesisObject.data.Ref_Word.texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data.Ref_Word.visemes[0], synthesisObject.data.Fixed_Word.duration-(500)));
                out.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].URLs[0]);
                words.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].visemes[0],synthesisObject.data.Fixed_Word.duration+synthesisObject.data.Ref_Word.duration-1000));
           }
           else if($('#SpectroSpinHolder').hasClass('centerSide')){
                out.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].URLs[0]);
                words.push(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].visemes[0],synthesisObject.data.Fixed_Word.duration-500));
                out.push(synthesisObject.data.Ref_Word.URLs[0]);
                words.push(synthesisObject.data.Ref_Word.texts[0]);
                viss = viss.concat(fix_visemes(synthesisObject.data.Ref_Word.visemes[0],synthesisObject.data.Fixed_Word.duration+synthesisObject.data[document.getElementsByClassName('main-tile')[0].id].duration-1000));
           }
        }

        let fd = new FormData();
            fd.append("urls",out);
            fd.append("words", words);
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
                             'visemes':[viss],
                             'duration':json.duration,
                         }
                 tiaPrepareToSpeakWord('Spliced_Audio');
            },
            error: function() {console.log("Error slicing audio")},
        });
    }
}

$('#playTrigramBtn').click(function(){
    splice_audio();
});

function increase_type_size_stage2(){
    if(!conversationVariables.stage_2_increased){
        $('#reRecordBtn').hide();
        $('#correctionOverlay').css({'background-color':'rgba(255,255,255,0.8)', 'z-index':4}).animate({height:'100%'},300);
        $('#sentenceShowHolder').css('background-color','rgba(255,255,255,0)')
        $('#overlayBtnBox').css('height','10%');
        $('#finishClassIconContainer').hide()
        $('#prevSentsIconContainer').hide()
        $('#closeTallType').css("display","flex");
        conversationVariables.stage_2_increased = true;
    }
}

$('#closeTallTypeText').click(decrease_type_size_stage2);

function decrease_type_size_stage2(){
    if(conversationVariables.stage_2_increased){
        $('#reRecordBtn').show();
        $('#correctionOverlay').css({'background-color':'rgba(255,255,255,0)', 'z-index':2}).animate({height:'50%'},300);
        $('#sentenceShowHolder').css('background-color','rgba(255,255,255,0.8)')
        $('#overlayBtnBox').css('height','20%');
        $('#finishClassIconContainer').show()
        $('#prevSentsIconContainer').show()
        $('#closeTallType').css("display","none");
        if($('#bottomCent').text().trim().length == 0){
            conversationVariables.movedText = true;
            unmoveText();
            $('#bottomCent').hide();
        }
        $("#bottomCent").attr("contenteditable",false);
        $('#keyboardOverlay').show();
        conversationVariables.stage_2_increased = false;
    }

}

