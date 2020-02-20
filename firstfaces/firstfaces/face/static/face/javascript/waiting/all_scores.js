function addAllScores( allConversations ) {

    let startTimeCorrectPercerongNWrongArticlePercentage = calculateCorrectSentencesNWrongArticlesPercentForEachConversation( allConversations );

    drawLineChartAllScores( startTimeCorrectPercerongNWrongArticlePercentage );

}

function calculateCorrectSentencesNWrongArticlesPercentForEachConversation( allConversations ) {

    allConversationsStartTimes = [];
    allConversationsTotalPoints = [];
    allConversationsWrongArticlesPercentage = [];
    
    allConversations.forEach( function( c ) {

        let totalSentences = c.completed_sentences.length;
        //if ( totalSentences !== 0 ) {

            console.log( 'c.start_time:', c.start_time );
            let startTimeDateStringForChart = convertStartTimeIntToDayMonthStringForChart( c.start_time );
            allConversationsStartTimes.unshift( startTimeDateStringForChart );
        
            var totalPoints;
            if ( waitingVariables.experimental_group !== "control" ) {

                totalPoints = getTotalPointsForAClass( c.completed_sentences );
            
            } else {

                totalPoints = 0;

            }

            //let correctPercentage = parseInt( 100 * correctIncorrectDunno['P'] / totalSentences );
            allConversationsTotalPoints.unshift( totalPoints );

            let wrongArticlesPercentage = parseInt( 100 - calculateArticleErrors( c.completed_sentences )[ 0 ] );
            allConversationsWrongArticlesPercentage.unshift( wrongArticlesPercentage );

        //}

    } );

    return [ allConversationsStartTimes, allConversationsTotalPoints, allConversationsWrongArticlesPercentage ]

}

function convertStartTimeIntToDayMonthStringForChart( t ) {

    let dateObject = new Date( t );
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;

    let stringDayMonth =  day.toString() + '/' + month.toString();
    
    console.log('stringDayMonth', stringDayMonth)
    return stringDayMonth

}

function drawLineChartAllScores( allData ) {

    //console.log( 'allData:', allData )
	// ok, so have to individually add sizes and colours of points in a list so I can individually control them later. there must be anther way but I can't find one now and hitRadius returns to normal size. FIID!!
	let noOfConv = allData[0].length;
	let correctBorderRadii = [];
	//let articleBorderRadii = [];
	for (let i=0; i<noOfConv; i++) {
        if (i=== noOfConv - 1) {
		    correctBorderRadii.push( 10 );
			//articleBorderRadii.push( 8 );
        } else {
		    correctBorderRadii.push( 5 );
			//articleBorderRadii.push( 3 );
        }
    }

    let ptsLabel = '';
    let displayAxis = false
    if ( waitingVariables.experimental_group !== "control" ) {

        ptsLabel = 'points';
        displayAxis = true;

    }

	let ctx = document.getElementById('allScoresChart').getContext('2d');
	let myLineChart = new Chart(ctx, {
		type: 'line',
		data: { 
            labels: allData[ 0 ],
            radius: 8,
			datasets: [
                {
                    label: ptsLabel,
                    data: allData[ 1 ],
                    backgroundColor: 'rgba( 231, 202, 0, 1 )',
                    borderColor: 'rgba(31, 176, 48, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: correctBorderRadii,
                    //pointHitRadius: 1,
                    pointHitRadius: 15,
                },
                //{
                    //label: '% article errors',
                    //data: allData[ 2 ],
                    //backgroundColor: 'rgba(219, 17, 13, 0.7)',
                    //borderColor: 'rgba(219, 17, 13, 0.5)',
                    //fill: false,
                    //borderWidth: 2,
                    //pointRadius: 4,
                    //borderDash: [5, 5],
                    //pointStyle: 'triangle',
                //}
            ],
            //pointHitRadius: 9,
            //hoverRadius: 9,
		},
		options: {
			//responsive: true,
			legend: {
                display: false,
                //position: 'top',
                //align: 'left',
                labels: {
                    fontColor: '#102858',
                    fontStyle: 'bold',
                },
			},
            title: {
                //display: true,
                text: 'Conversations',
                fontColor: '#102858',
                fontSize: 16,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: displayAxis,
                        beginAtZero: true,
                        fontStyle: 'bold',
                        //max: 100,
                    },
                    scaleLabel: {
                        display: false,
                        labelString:'points',
                        fontColor: '#102858',
                        fontSize: 14,
                        fontStyle: 'bold',
                    },
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: '#102858',
                        fontStyle: 'bold',
                    },
                    scaleLabel: {
                        display: false,
                        labelString:'date',
                        fontColor: '#102858',
                        fontSize: 14,
                        fontStyle: 'bold',
                    },
                    gridLines: {
                        display: false,
                    },
                }]
            },
            tooltips: {enabled: false},
            hover: {mode: null},
			onClick: function(evt) {


                el = myLineChart.getElementAtEvent( evt );
                if ( el.length !== 0 ) {
                    //console.log('el:', el );
                    let elementIndex = el[ 0 ]._index

                    //console.log('this.data.datasets[0]:', this.data.datasets[0]);
                    lenPoints = this.data.datasets[0].pointRadius.length;

                    for(i=0; i<lenPoints; i++) {

                        this.data.datasets[0].pointRadius[i] = 5;

                    };

                    this.data.datasets[0].pointRadius[elementIndex] = 12;
                    //console.log( this.data.datasets[0] );
                    
                    this.update();

                    showConversationSentences( lenPoints - elementIndex - 1 );

                };

            },

		},
	});

}

