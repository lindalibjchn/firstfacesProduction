function insertChart() {

    var ctx = document.getElementById('scoresChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: getDates(),
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
                
    function getDates() {

        dates = [];
        let ids = sessionsDict['IDList'];
        ids.forEach( function(e) {
        
            let date = new Date(sessionsDict[e].start_time * 1000).toLocaleDateString("en-GB");
            dates.unshift( date.substring(0, date.length - 5) );
            console.log('dates:', dates);

        })

        return dates;

    }

    function getScores() {

        scores = [];
        let ids = sessionsDict['IDList'];
        ids.forEach( function(e) {
        
            scores.unshift( sessionsDict[e].score );

        })

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

    var holder = document.getElementById("scoresChart");
    holder.onclick = function( e ) {

        let activePoint = chart.getElementAtEvent( e );
        let pointInd = activePoint[0]._index;
        pointInd = sessionsDict.IDList.length - pointInd - 1;
        showSession( pointInd );

    };

}








