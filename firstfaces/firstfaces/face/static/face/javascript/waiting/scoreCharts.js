function insertChart( period ) {

	$('#scoresChart').remove(); // this is my <canvas> element
  	$('#chartOuterDiv').append('<canvas id="scoresChart"><canvas>');

    var ctx = document.getElementById('scoresChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: getDates( period ),
            datasets: [{
                label: 'score',
                backgroundColor: 'rgb(99, 255, 132)',
                borderColor: 'rgb(0, 150, 0)',
                data: getScores(),
                pointRadius: 8,
                pointHitRadius: 12,
                pointHoverRadius: 12,
                pointHoverBorderWidth: 6,
                pointBackgroundColor: getBackgroundColors(),
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            tooltips: {
                enabled: true,
                //callbacks: {
                    
                    //label: function( tooltipitem, data ) {

                        //console.log('tooltipitem:', tooltipitem);
                        //console.log('data:', data.datasets[0].data)

                        //var label = tooltipitem.yLabel;
                        //return label;

                    //}
                //},
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        steps: 5,
                        max: 100,
                    }
                }]
            },
            onClick: function(evt, activeElements) {

                if ( activeElements[0]._index !== undefined ) {

                    var elementIndex = activeElements[0]._index;

                    lenPoints = this.data.datasets[0].pointBackgroundColor.length;

                    for(i=0; i<lenPoints; i++) {

                        this.data.datasets[0].pointBackgroundColor[i] = 'white';

                    };

                    this.data.datasets[0].pointBackgroundColor[elementIndex] = 'yellow';
                    this.update();

                }

            },
        }
    });
                
    var sessionIds = [];
    function getDates( indOfPeriod ) {

        console.log( 'getDatesCalled' );
        // indOfPeriod gives which 3 months to display. 0 is psat 3 months, 1 is 3-6- months previous etc.

        let ThreeMonthsUnixTime = 90 * 24 * 60 * 60 * 1000; 

        let curTime = new Date();
        let timeEnd = curTime - indOfPeriod * ThreeMonthsUnixTime;
        let timeStart = curTime - ( indOfPeriod + 1 ) * ThreeMonthsUnixTime;

        let firstEverClassTime = sessionsDict[ sessionsDict.IDList[ sessionsDict.IDList.length - 1 ]].start_time * 1000;
        console.log('firstEverClassTime:', firstEverClassTime);
        if ( timeStart <= firstEverClassTime ) {

            earliestThreeMonths = true;

        } else {

            earliestThreeMonths = false;

        }

        dates = [];
        scores = [];
        sessionsDict.graphSessionIds = [];
        datesScoresDict = {}
        let ids = sessionsDict['IDList'];
        ids.forEach( function(e) {
        
            let startTimeUnix = sessionsDict[e].start_time * 1000;
            let sessionScore = sessionsDict[e].score;

            if ( startTimeUnix <= timeEnd && startTimeUnix >= timeStart ) {

                let date = new Date( startTimeUnix ).toLocaleDateString("en-GB");
                let dateFormatted = date.substring(0, date.length - 5)
                dates.unshift( dateFormatted );
                scores.unshift( sessionScore )
                sessionsDict.graphSessionIds.unshift( e )

            }

        })

        prepareHolder();
        console.log('dates:', dates);
        return dates;

    }

    function getScores() {

        //scores = [];
        //let ids = sessionsDict['IDList'];
        //ids.forEach( function(e) {
        
            //scores.unshift( sessionsDict[e].score );

        //})

        //console.log('scores:', scores);
        return scores;

    }

    // see https://stackoverflow.com/questions/43323152/change-point-color-on-click-using-chartjs for why need a list of colors just to change one when clicked
    function getBackgroundColors() {

        len_sesss = sessionsDict.IDList.length;
        let colourList = []
        for (i=0; i<len_sesss-1; i++) {

            colourList.push('white');

        }

        colourList.push('yellow');

        return colourList;

    }

    function prepareHolder() {

        var holder = document.getElementById("scoresChart");

        holder.onclick = function( e ) {

            let activePoint = chart.getElementAtEvent( e );
            let pointInd = activePoint[0]._index;
            let sessionID = sessionsDict.graphSessionIds[ pointInd ]

            console.log('sessionID:', sessionID);
            //pointInd = sessionsDict.IDList.length - pointInd - 1;
            showSession( sessionID );

        };

    }

}


///////// TEST CHART

function insertTestChart( period ) {

	$('#testChart').remove(); // this is my <canvas> element
  	$('#testChartOuterDiv').append('<canvas id="testChart"><canvas>');

    var ctx = document.getElementById('testChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: getTestDates( period ),
            datasets: [{
                label: 'score',
                backgroundColor: 'rgb(99, 255, 132)',
                borderColor: 'rgb(0, 150, 0)',
                data: getTestScores(),
                pointRadius: 8,
                pointHitRadius: 12,
                pointHoverRadius: 12,
                pointHoverBorderWidth: 6,
                //pointBackgroundColor: getBackgroundColors(),
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: true,
            },
            tooltips: {
                enabled: false,
                //callbacks: {
                    
                    //label: function( tooltipitem, data ) {

                        //console.log('tooltipitem:', tooltipitem);
                        //console.log('data:', data.datasets[0].data)

                        //var label = tooltipitem.yLabel;
                        //return label;

                    //}
                //},
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        steps: 5,
                        max: 100,
                    }
                }]
            },
            //onClick: function(evt, activeElements) {

                //if ( activeElements[0]._index !== undefined ) {

                    //var elementIndex = activeElements[0]._index;

                    //lenPoints = this.data.datasets[0].pointBackgroundColor.length;

                    //for(i=0; i<lenPoints; i++) {

                        //this.data.datasets[0].pointBackgroundColor[i] = 'white';

                    //};

                    //this.data.datasets[0].pointBackgroundColor[elementIndex] = 'yellow';
                    //this.update();

                //}

            //},
        }
    });
                
    function getTestDates( indOfPeriod ) {

        // indOfPeriod gives which 3 months to display. 0 is psat 3 months, 1 is 3-6- months previous etc.

        let ThreeMonthsUnixTime = 90 * 24 * 60 * 60 * 1000; 

        let curTime = new Date();
        let timeEnd = curTime - indOfPeriod * ThreeMonthsUnixTime;
        let timeStart = curTime - ( indOfPeriod + 1 ) * ThreeMonthsUnixTime;

        let firstEverTestTime = prevTestScores[prevTestScores.length - 1][0] * 1000;
        console.log('firstEverTestTime:', firstEverTestTime);
        if ( timeStart <= firstEverTestTime ) {

            testEarliestThreeMonths = true;

        } else {

            testEarliestThreeMonths = false;

        }
        
        testDates = [];
        prevTestScores.forEach( function(e) {
        
            let startTimeUnix = e[0] * 1000;
            //console.log('startTimeUnix:', startTimeUnix);
            //console.log('timeEnd:', timeEnd);
            //console.log('timeStart:', timeStart);

            //if ( startTimeUnix <= timeEnd && startTimeUnix >= timeStart ) {

                //console.log('e:', e);
                let date = new Date( startTimeUnix ).toLocaleDateString("en-GB");
                testDates.unshift( date.substring(0, date.length - 5) );

            //}

        })

        console.log('test dates:', testDates);
        return testDates;

    }

    function getTestScores() {

        testScores = [];
        prevTestScores.forEach( function(e) {
        
            testScores.unshift( e[1] );

        })

        console.log('testScores:', testScores);
        return testScores;

    }

    // see https://stackoverflow.com/questions/43323152/change-point-color-on-click-using-chartjs for why need a list of colors just to change one when clicked
    //function getBackgroundColors() {

        //len_sesss = sessionsDict.IDList.length;
        //let colourList = []
        //for (i=0; i<len_sesss-1; i++) {

            //colourList.push('white');

        //}

        //colourList.push('yellow');

        //return colourList;

    //}

    //var holder = document.getElementById("scoresChart");
    //holder.onclick = function( e ) {

        //let activePoint = chart.getElementAtEvent( e );
        //let pointInd = activePoint[0]._index;
        //pointInd = sessionsDict.IDList.length - pointInd - 1;
        //showSession( pointInd );

    //};

}





