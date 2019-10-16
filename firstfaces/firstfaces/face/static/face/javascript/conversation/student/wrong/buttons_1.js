function showErrorBtns() {

    recTimes.showErrors = Date.now() / 1000;
    
    // show buttons again
    showOptionBtns();
    $('#whatsWrongBtn').hide();
    $('#showCorrectionBtn').css('display', 'flex')
    $('.option-btn').prop( "disabled", false );
    $('#optionBtns').fadeIn( 500 );

}


function highlightWrong() {

    conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.forEach( function(ind, i) {

        setTimeout( function() {

            // for spaces
            if ( ind.length === 1 && conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence[ ind ] === " " ) {

                $('#wrongWord_' + ind[0].toString()).css( {
                    //'color': 'red' ,
                    //'font-weight': 'bold'
                    'background-image': 'linear-gradient(rgba(0,0,0,0), red, rgba(0,0,0,0))',
                });
                setTimeout( function() { 
                    $('#wrongWord_' + ind[0].toString()).css( {
                        'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, rgba(0,0,0,0), rgba(0,0,0,0))',
                    });
                }, 1500);

            } else {

                ind.forEach( function(i, ind) {

                    $('#wrongWord__' + i.toString()).css( {
                            'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, red, rgba(0,0,0,0), rgba(0,0,0,0))',
                            'color': 'white',
                    });


                    if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence[ i ] === " " ) {
                    
                        $('#wrongWord_' + i.toString()).css( {
                            'color': 'rgba(0,0,0,0)',
                            'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, red, rgba(0,0,0,0), rgba(0,0,0,0))',
                        });
                        setTimeout( function() { 
                            $('#wrongWord_' + i.toString()).css( {
                                'background-image': 'none',
                           
                            });

                            if ( ind === conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length - 1 ) {

                                showErrorBtns();

                            }

                        }, 1500);

                    } else {
                        
                        $('#wrongWord_' + i.toString()).css( {
                            'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, red, rgba(0,0,0,0), rgba(0,0,0,0))',
                            'color': 'white',
                            'font-weight': 'bold',
                        });
                        setTimeout( function() { 
                            $('#wrongWord_' + i.toString()).css( {
                                'color': 'red',
                                'background-image': 'none',
                            });

                            if ( ind === conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length - 1 ) {

                                showErrorBtns();

                            }

                        }, 1500);

                    }

                } );

            }

        }, i * 2250 );

    } );

}

function showCorrectionUnderWrongSent() {

    $( '#correctedSentence' ).fadeIn()

    //get correct parts
    let correctParts = [];
    let lenCorrectParts = [];
    let startSlice = 0;
    for (let i=0; i<conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length + 1; i++ ) {

        var slice;
        if ( i < conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length ) {

            slice = conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence.slice( startSlice, conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes[ i ][ 0 ])
            correctParts.push( slice )

            startSlice = conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes[ i ][ conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes[ i ].length - 1] + 1

        } else {

            slice = conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence.slice( startSlice )
            correctParts.push( slice )

        }

        let lenSlice = 0;
        slice.forEach( function( w ) {

            lenSlice += w.length;

        } );
        lenCorrectParts.push( lenSlice );

    }

    let wrongParts = [];
    let lenWrongParts = [];
    conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.forEach( function(ind) {

        lenWrongPart = 0;
        wrongPart = []
        ind.forEach( function( wo ) {

            wrongPart.push( conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence[ wo ] );
            lenWrongPart += conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence[ wo ].length;

        } );

        wrongParts.push( wrongPart );
        lenWrongParts.push( lenWrongPart );

    } );

    let corrections = conversationVariables.conversation_dict.completed_sentences[ 0 ].correction
    let lenCorrections = [];
    corrections.forEach( function( wp ) {

        let lenCorrection = 0
        wp.forEach( function( wpp ) {

            lenCorrection += wpp.length;

        } );

        lenCorrections.push( lenCorrection );

    } );

    correct = true;
    count = 0;
    for ( j=0; j<conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length * 2; j++ ) {

        if ( correct ) {

            correctParts[ count ].forEach( function( p ) {

                if ( p  === ' ' ) {

                    $('#correctedSentence').append(

                        "<div class='correct-words correct-parts correct-words-spaces'>*</div>"

                    );

                } else {

                    $('#correctedSentence').append(

                        "<div class='correct-words correct-parts correct-words-words'>" + p + "</div>"

                    );

                };

            } )

            correct = false;

        } else {

            conversationVariables.conversation_dict.completed_sentences[ 0 ].correction[ count ].forEach( function( q ) {

                if ( q  === ' ' ) {

                    $('#correctedSentence').append(

                        "<div class='correct-words wrong-parts wrong-parts-spaces correct_words_" + count.toString() + "'>*</div>"

                    );

                } else {

                    $('#correctedSentence').append(

                        "<div class='correct-words wrong-parts wrong-parts-words correct_words_" + count.toString() + "'>" + q + "</div>"

                    );

                };

            } );

            let lenWrong = lenWrongParts[ count ];
            let lenCorrection = lenCorrections[ count ];
            let lenNextCorrect = lenCorrectParts[ count + 1 ];

            let needsAdded = lenWrong - lenCorrection;
            let nextCorrectStarString = correctParts[ count + 1  ];
            if ( needsAdded > 0 ) {

                for (let i = wrongParts[ count ].length - 1; i>=0; i--) {
                    
                    let lenWord = wrongParts[ count ][ i ].length;

                    if ( lenWord > needsAdded ) {

                        nextCorrectStarString.unshift( '*'.repeat( needsAdded ));
                        break;

                    } else {

                        nextCorrectStarString.unshift( '*'.repeat( lenWord ));
                        needsAdded -= lenWord; 

                    }

                }

            } else if ( needsAdded < 0 ) {

                let noIters = correctParts[ count + 1 ].length - 1;
                for (let i=0; i<noIters; i++) {

                    let lenWord = correctParts[ count + 1 ][ 0 ].length;
                    if ( lenWord > Math.abs(needsAdded) ) {

                        nextCorrectStarString.shift();
                        nextCorrectStarString.unshift( '*'.repeat( lenWord - Math.abs(needsAdded) ));
                        break;

                    } else {

                        nextCorrectStarString.shift();
                        needsAdded += lenWord; 

                    }

                }

            }

            correct = true;
            count += 1;



        }

    }
    setTimeout( function() {

        for (let i=0; i<conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length; i++ ) {

            setTimeout( function() {

                $('.correct_words_' + i.toString()).css({

                    'color': 'white',
                    'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), green, green, rgba(0,0,0,0), rgba(0,0,0,0))',

                });
                $('.correct_words_' + i.toString()).each( function() {
                    if ( $(this).text() === '*' ) {
                        $(this).css({
                            'color': 'green',
                        })

                    }
                });

                setTimeout( function() {

                    $('.correct_words_' + i.toString()).css({
                        'color': 'green',
                        'background-image': 'none',
                    });

                    $('.correct_words_' + i.toString()).each( function() {
                        if ( $(this).text() === '*' ) {
                            $(this).css({
                                'color': 'rgba(0,0,0,0)',
                            })

                        }
                    });

                    if ( i === conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes.length - 1 ) {

                        $('#nextSentenceBtn').css('display', 'flex');
                        $('#nextSentenceBtn').prop( "disabled", false ).fadeIn( 500 );

                    }

                }, 1500 )

            }, i*2250 );

        }

    }, 1000 );

};

