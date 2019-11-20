function addData( gramPronSent, error, sentences ) {

    if ( gramPronSent === 'grammar' ) {

        let articleErrors = calculateArticleErrors( sentences );
        let correctArticlesPercent = articleErrors[ 0 ];
        let articleErrorsDetailed = articleErrors[ 1 ];
        drawChart( [ correctArticlesPercent, 100 - correctArticlesPercent ], 'allErrorsChart' );
        addDetailedErrorsChart( 'article', articleErrorsDetailed );    
        showHideDivs( gramPronSent, error );

    } if ( gramPronSent === 'pronunciation' ) {

        showHideDivs( gramPronSent, error );

    } else if ( gramPronSent === 'sentences' ) {

        showHideDivs( gramPronSent, error );

    }
    
}

function calculateArticleErrors( sentencesArray ) {
    
    let articleErrors = getTotalArticleErrors( sentencesArray );
    let totalArticlesUsed = articleErrors[ 0 ];
    let articleErrorsObject = articleErrors[ 1 ];

    let correctArticlesPercent = 0;
    if ( totalArticlesUsed > 0 ) {

        correctArticlesPercent = getTotalArticleErrorsPercent( totalArticlesUsed, articleErrorsObject );
    
    }
        
    $('#correctPercentage').text( correctArticlesPercent );

    inputDataForChart = putErrorObjectIntoListForChart( articleErrorsObject );
    //console.log('inputDataForChart:', inputDataForChart)
    return [ correctArticlesPercent, inputDataForChart ]

}
 
function getTotalArticleErrorsPercent( totalArticlesUsed, articleErrorsObject ) {
 
    let totalArticleErrors = Object.values( articleErrorsObject ).reduce((a, b) => a + b);
    let percentageArticlesCorrect = parseInt( 100 * ( totalArticlesUsed - totalArticleErrors ) / totalArticlesUsed )

    return percentageArticlesCorrect

}

function getTotalArticleErrors( sentencesArray ) {

    let totalArticlesUsed = 0;

    let totalArticleErrorsObject = {

        'a-the': 0,
        'a-x': 0,
        'the-a': 0,
        'the-x': 0,
        'x-a': 0,
        'x-the': 0

    }

    sentencesArray.forEach( function( sentenceObject ) {

        if ( ['P', 'B', 'M', 'I'].includes( sentenceObject.judgement ) ) {

            let numberOfArticlesInSentence = getNumberOfArticlesInSentence( sentenceObject.sentence );
            totalArticlesUsed += numberOfArticlesInSentence;

            if ( sentenceObject.judgement === 'I' ) {
            
                let articleErrors = determineIfArticleErrorAndAddToArticleErrorsObject( sentenceObject );

                Object.keys( articleErrors ).forEach( function( errorType ) {

                    totalArticleErrorsObject[ errorType ] += articleErrors[ errorType ]

                } );

            }

        }

    } );

    return [ totalArticlesUsed, totalArticleErrorsObject ]

}

function getNumberOfArticlesInSentence( sentenceArray ) {

    //console.log('sentenceArray:', typeof(sentenceArray));
    let noOfArticles = 0;
    sentenceArray.forEach( function( sentenceTuple ) {

        if ( [ 'a', 'the' ].includes( sentenceTuple[ 0 ] ) ) {

            noOfArticles += 1;

        }

    } );

    return noOfArticles

}

function determineIfArticleErrorAndAddToArticleErrorsObject( sentenceObject ) {

    let articleErrors = {

        'a-the': 0,
        'a-x': 0,
        'the-a': 0,
        'the-x': 0,
        'x-a': 0,
        'x-the': 0

    }

    sentenceObject.indexes.forEach( function( word_index, i ) {

        //console.log( 'word_index:', word_index );
        //console.log( 'i:', i );
        if ( word_index.length === 1 ) {

            withSpaceIndex = word_index[ 0 ];

            if ( withSpaceIndex % 2 === 0 ) {

                if ( sentenceObject.prompt[ i ] === "the" ) {

                    articleErrors[ 'x-the' ] += 1;

                } else if ( sentenceObject.prompt[ i ] === "a" ) {

                    articleErrors[ 'x-a' ] += 1;

                }

            } else {

                let withoutSpacesIndex = parseInt( ( withSpaceIndex - 1 ) / 2 );

                if ( sentenceObject.sentence[ withoutSpacesIndex ][ 0 ] === "the" ) {

                    if ( sentenceObject.prompt[ i ] === "a" ) {

                        articleErrors['the-a'] += 1;

                    } else if ( sentenceObject.prompt[ i ]  === "x" ) {

                        articleErrors['the-x'] += 1;

                    }

                } else if ( sentenceObject.sentence[ withoutSpacesIndex ][ 0 ] === "a" ) {

                    if ( sentenceObject.prompt[ i ] === "the") {

                        articleErrors['a-the'] += 1;

                    } else if ( sentenceObject.prompt[ i ] === "x" ) {

                        articleErrors['a-x'] += 1;

                    }

                }

            }

        }

    })

    return articleErrors

}

function putErrorObjectIntoListForChart( articleErrorsObject ) {

    let articleData = []

    //console.log( 'articleErrorsObject:', articleErrorsObject );

    articleData.push( articleErrorsObject[ 'a-the' ] );
    articleData.push( articleErrorsObject[ 'the-a' ] );
    articleData.push( articleErrorsObject[ 'a-x' ] );
    articleData.push( articleErrorsObject[ 'the-x' ] );
    articleData.push( articleErrorsObject[ 'x-a' ] );
    articleData.push( articleErrorsObject[ 'x-the' ] );

    //console.log('articleData:', articleData);
    return articleData

}

function drawChart( inputData, divId ) {

    //console.log(' inputData:', inputData )
	let ctx = document.getElementById( divId ).getContext('2d');
	let myDoughnutChart = new Chart(ctx, {
		type: 'doughnut',
		data: { 
			datasets: [{
				data: inputData,
				backgroundColor: [
					'rgba(69, 255, 48, 0.7)',
					'rgba(255, 48, 48, 0.7)',
				],
                borderWidth: 1,
			}],
			labels: [ 'correct', 'incorrect' ],
		},
		options: {
			responsive: true,
			legend: {
                display: false
                //position: 'left',
                //fullwidth: false,
                //align: 'left',
			},
            cutoutPercentage: 70,
            //circumference: Math.PI,
            //rotation: 0.5 * Math.PI,
		},
	});

}

function addDetailedErrorsChart( typeOfError, inputData ) {

    let maxErrors = Math.max( ...inputData );
    let maxChartValue = Math.max( 3, maxErrors );
    //console.log('inputData:', inputData);
    var myData;
    var myLabels;
    if ( typeOfError === 'article' ) {

        myLabels = [ "a-the", "the-a", "a-_", "the-_", "_-a", "_-the"]
    
    } else if ( typeOfError === 'verb' ) {

        inputData = [3, 1, 0, 2, 5]
        myLabels = [ "pres-past", "pl-sing", "pres-fut", "past-pres", "pres-perf"]

    } else if ( typeOfError === 'preposition' ) {

        inputData = [2, 0, 0, 1, 2, 1, 3, 0, 0]
        myLabels = [ "of-with", "in-on", "out-in", "off-over", "with-around", "by-in", "above-up", "at-on", "near-beside"]

    }

	let ctx = document.getElementById('detailedErrorsChart').getContext('2d');
	let myRadarChart = new Chart(ctx, {
		type: 'radar',
		data: { 
			datasets: [{
				data: inputData,
                pointBackgroundColor: "rgba(255, 48, 48, 1)",
                backgroundColor: "rgba(255, 48, 48, 0.3)",
                borderColor: "rgba(255, 48, 48, 0.5)",
                pointRadius: 5,
				//backgroundColor: [
					//'rgb(255, 99, 132)',
					//'rgb(132, 99, 255)',
					//'rgb(99, 255, 132)'
				//]
			}],
			labels: myLabels,
		},
		options: {
			responsive: true,
			legend: {
				display: false,
			},
            scale: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                    min: -0.15,
                    max: maxChartValue,
                },
                pointLabels: {
                    fontSize: 14,
                    fontColor: "rgba(255, 48, 48, 1)",
                    fontStyle: 'bold',
                },
            },
		},
	});

}

function showHideDivs( gramPronSent, typeOfError ) {

    // hide all
    $('.main-data-container').hide();
    $('.tabs-container').hide();
    $('.titles').removeClass('active-title');
    $('.titles').addClass('background-title');
    
    if ( gramPronSent === 'grammar' ) {

        $('#grammarContainer').show();
        $('#grammarTabsContainer').show();
        $('#grammarTitleContainer').removeClass('background-title');
        $('#grammarTitleContainer').addClass('active-title');

        if ( typeOfError === 'article' ) {

            $('#articlesTabContainer').removeClass('background-title');
            $('#articlesTabContainer').addClass('active-title');
            //$('#correctPercentage').text('65');

        } else if ( typeOfError === 'verb' ) {

            $('#verbsTabContainer').removeClass('background-title');
            $('#verbsTabContainer').addClass('active-title');
            $('#correctPercentage').text('55');

        } else if ( typeOfError === 'preposition' ) {

            $('#prepositionsTabContainer').removeClass('background-title');
            $('#prepositionsTabContainer').addClass('active-title');
            $('#correctPercentage').text('80');

        }

    } else if ( gramPronSent === 'pronunciation' ) {

        $('#pronunciationContainer').show();
        $('#pronunciationTabsContainer').show();
        $('#pronunciationTitleContainer').removeClass('background-title');
        $('#pronunciationTitleContainer').addClass('active-title');

        if ( typeOfError === 'phrase' ) {

            $('#phrasesTabContainer').removeClass('background-title');
            $('#phrasesTabContainer').addClass('active-title');

        } else if ( typeOfError === 'word' ) {

            $('#wordsTabContainer').removeClass('background-title');
            $('#wordsTabContainer').addClass('active-title');

        } else if ( typeOfError === 'phoneme' ) {

            $('#phonemesTabContainer').removeClass('background-title');
            $('#phonemesTabContainer').addClass('active-title');

        }

    } else if ( gramPronSent === 'sentences' ) {

        $('#prevSentsContainer0').show();
        updateScroll( document.getElementById('prevSentsInnerContainer0') );
        $('#sentencesTitleContainer').removeClass('background-title');
        $('#sentencesTitleContainer').addClass('active-title');

    }

}

function showPronunciation() {

    $('#pronunciationContainer').show();
    $('#grammarContainer').hide();
    $('#pronunciationTitleContainer').addClass('active-title');
    $('#grammarTitleContainer').addClass('background-title');

}



