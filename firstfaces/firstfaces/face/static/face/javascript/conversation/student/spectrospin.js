
var tiles = ['tile_1','tile_2',"tile_3","tile_4","tile_5"]
var classes = ['third-tile-top','second-tile-top','main-tile','second-tile-bottom','third-tile-bottom']
var opacities = [0.4, 0.7, 1, 0.7, 0.4]
var tops = []
var num_tiles = 5;
var tops_found = false;


function getTops(){
    if(!tops_found){
        tops = []
        for(i=0;i<tiles.length;i++){
            if(tiles[i] != ""){
                tops.push($('#'+tiles[i]).position().top);
            }else{
                if(i == 0){
                    tops.push($('#SpectroSpinHolder').height()*.0976)
                }
                if(i == 1){
                    tops.push($('#SpectroSpinHolder').height()*.232)
                }
                if(i == 3){
                    tops.push($('#SpectroSpinHolder').height()*.628)
                }
                if(i == 4){
                    tops.push($('#SpectroSpinHolder').height()*.8296)
                }
            }
        }
        fixedWordTile
        console.log(tops);
        tops_found= true;
    }

}

function setUpSpectrospin() {

    for(i=0;i<tiles.length;i++){
        if(tiles[i] != ""){
            tops.push($('#'+tiles[i]).position().top);
        }else{
            tops.push(0);
        }
    }

    $('#tophalfSpec').click(function(){
        secondTopClick();
    });
    $('#bottomhalfSpec').click(function(){
        secondBottomClick();
    });

    $('.tile-word').click(function(){

        var idx = tiles.indexOf($(this).attr('id'));

        if(idx == 2){
            tiaSpeak($(this).attr("id"), cont=true);
        }

        if(idx >= 3){
            secondBottomClick();
        }
        if(idx <= 1){
            secondTopClick();
        }
    });
    $('#fixedWordTile').unbind('click');
    $('#fixedWordTile').click(function(){
        tiaSpeak('Fixed_Word', cont=true);
    });

 }




function disable_everything(){
    //$('.tile-word')
    $('#tophalfSpec').unbind('click');
    $('#bottomhalfSpec').unbind('click');
    $('.tile-word').unbind('click');
}

function enable_everything(){
    $('#tophalfSpec').click(function(){
        secondTopClick();
    });
    $('#bottomhalfSpec').click(function(){
        secondBottomClick();
    });
    $('.tile-word').click(function(){
        var idx = tiles.indexOf($(this).attr('id'));
        if(idx >= 3){
            secondBottomClick();
        }
        if(idx == 2){
             tiaSpeak($(this).attr("id"), cont=true);
        }
        if(idx <= 1){
            secondTopClick();
        }
    });
}

var hiddenTop = []
var hiddenBottom = []


 function secondBottomClick(){
    getTops();
    disable_everything();
      if(hiddenTop.length != 0){
            var next = hiddenTop[(hiddenTop.length-1)];
            hiddenTop.splice(hiddenTop.length-1, 1)
            appear_top(next);
            animate_down(0);
            animate_down(1);
            animate_down(2);
            animate_down(3);
            setTimeout(function(){fix_locations(conversationVariables.IDX_Val)},300);

            if(tiles[4] != ''){
                $("#"+tiles[4]).removeClass("third-tile-bottom").addClass("hidden_tile");
                hiddenBottom.push(tiles[4])
            }
            setTimeout(function(){
                tiles = [next,tiles[0],tiles[1],tiles[2],tiles[3]];
            },700);
            setTimeout(enable_everything,750);

      }
      else{
            if(tiles[0] != ''){
                animate_down(0);
                animate_down(1);
                animate_down(2);
                animate_down(3);
                if(tiles[4] != ''){
                    $("#"+tiles[4]).removeClass("third-tile-bottom").addClass("hidden_tile");
                    hiddenBottom.push(tiles[4])
                }
                setTimeout(function(){fix_locations(conversationVariables.IDX_Val)},300);
                setTimeout(function(){
                    tiles = ['',tiles[0],tiles[1],tiles[2],tiles[3]];

                 },700);
                setTimeout(enable_everything,750);
            }
            else{
                if(tiles[1] != ''){
                    animate_down(1);
                    animate_down(2);
                    animate_down(3);
                    setTimeout(function(){fix_locations(conversationVariables.IDX_Val)},300);
                    if(tiles[4] != ''){
                        $("#"+tiles[4]).removeClass("third-tile-bottom").addClass("hidden_tile");
                        hiddenBottom.push(tiles[4])
                    }
                    setTimeout(function(){tiles = ['',tiles[0],tiles[1],tiles[2],tiles[3]]},700);
                    setTimeout(enable_everything,750);
                }
                else{
                    console.log("No more above.");
                    enable_everything();
                }
            }
      }

 }

  function secondTopClick(){
    getTops();
    disable_everything();
      if(hiddenBottom.length != 0){
            var next = hiddenBottom[(hiddenBottom.length-1)];
            hiddenBottom.splice((hiddenBottom.length-1), 1)
            appear_bottom(next);
            animate_up(1);
            animate_up(2);
            animate_up(3);
            animate_up(4);

            if(tiles[0] != ''){
                $("#"+tiles[0]).removeClass("third-tile-top").addClass("hidden_tile");
                hiddenTop.push(tiles[0])
            }
            setTimeout(function(){fix_locations(conversationVariables.IDX_Val)},300);
            setTimeout(function(){tiles = [tiles[1],tiles[2],tiles[3], tiles[4], next ]},700);
            setTimeout(enable_everything,750);
      }
      else{
            if(tiles[4] != ''){
                animate_up(1);
                animate_up(2);
                animate_up(3);
                animate_up(4);
                if(tiles[0] != ''){
                    $("#"+tiles[0]).removeClass("third-tile-top").addClass("hidden_tile");
                    hiddenTop.push(tiles[0])
                }
                setTimeout(function(){fix_locations(conversationVariables.IDX_Val)},300);
                setTimeout(function(){tiles = [tiles[1],tiles[2],tiles[3], tiles[4], '' ]},700);
                setTimeout(enable_everything,750);
            }
            else{
                if(tiles[3] != ''){
                    animate_up(1);
                    animate_up(2);
                    animate_up(3);
                    if(tiles[0] != ''){
                        $("#"+tiles[0]).removeClass("third-tile-top").addClass("hidden_tile");
                        hiddenTop.push(tiles[0])
                    }
                    setTimeout(function(){fix_locations(conversationVariables.IDX_Val)},300);
                    setTimeout(function(){tiles = [tiles[1],tiles[2],tiles[3], "", '' ]},700);
                    setTimeout(enable_everything,750);
                }
                else{
                    console.log("No more below.")
                    enable_everything();
                }
            }

      }
 }



function animate_up(idx){
    if(idx == 0){
        console.log("To do");
    }
    else if(tiles[idx] == ''){
        console.log("Not_tile - "+idx);
    }
    else{
            var above = idx - 1;
            var diff = tops[idx] - tops[above];
            var moveDist = diff/2;
            $("#"+tiles[idx]).animate({top: '-='+(moveDist+moveDist*0.1)+'px',opacity:0}, 300);
            setTimeout(function(){$("#"+tiles[idx]).removeClass(classes[idx]).addClass(classes[idx-1]);},300);
            $("#"+tiles[idx]).animate({top: '-='+(moveDist-moveDist*0.1)+'px',opacity:opacities[idx-1]}, 300);
    }

}

function animate_down(idx){
    console.log("In here - "+idx);
    if(idx == 4){
        console.log("To do");
    }
     else if(tiles[idx] == ''){
        console.log("Not_tile - "+idx);
    }
    else{
            var below = idx + 1;
            var diff = tops[below] - tops[idx];
            var moveDist = diff/2;
            $("#"+tiles[idx]).animate({top: '+='+(moveDist+moveDist*0.1)+'px',opacity:0}, 300);
            setTimeout(function(){$("#"+tiles[idx]).removeClass(classes[idx]).addClass(classes[idx+1]);},300);
            $("#"+tiles[idx]).animate({top: '+='+(moveDist-moveDist*0.1)+'px',opacity:opacities[idx+1]}, 300);

    }
   }

function appear_top(id){
        var moveDist = tops[1] -tops[0];
        $('#'+id).removeClass('hidden_tile').addClass(classes[0]).css('opacity',0).animate({'top': '-='+((moveDist/2)*.9)+'px'})
        $('#'+id).animate({top: '+='+((moveDist/2)*.9)+'px',opacity:opacities[0]},200);
}


function appear_bottom(id){
        var moveDist = tops[4] -tops[3];
        $('#'+id).removeClass('hidden_tile').addClass(classes[4]).css('opacity',0).animate({'top': '+='+((moveDist/2)*.9)+'px'});
        $('#'+id).animate({top: '-='+((moveDist/2)*.9)+'px',opacity:opacities[4]},200);
}

