function addOverallData( sentencesArray ) {

   addTotalSentencesText( sentencesArray );
   addDoughnutChart( sentencesArray );
   addPercentageCorrectInCentreOfDoughnut( sentencesArray ); 

}

function addTotalSentencesText( sentencesArray ) {

    $( '#totalSentencesNumber' ).text( sentencesArray.length );

}

function addDoughnutChart( sentencesArray ) {

    overallData = getOverallData( sentencesArray );

	let ctx = document.getElementById('overallDataChart').getContext('2d');
	let myDoughnutChart = new Chart(ctx, {
		type: 'doughnut',
		data: { 
			datasets: [{
				data: overallData,
				backgroundColor: [
					'rgba(17, 219, 13, 1)',
					'rgba(222, 135, 4, 1)',
					'rgba(217, 4, 4, 1)',
					'rgba(41, 0, 0, 1)',
				],
                borderWidth: 1,
                //borderAlign: 'inner',
			}],
			labels: [ 'correct', 'meaning?', 'incorrect', "don't know" ],
		},
		options: {
			responsive: true,
			legend: {
                //display: false
                position: 'top',
                //fullwidth: false,
                align: 'left',
			},
            cutoutPercentage: 60,
            //circumference: Math.PI,
            //rotation: 0.5 * Math.PI,
		},
	});

}

function getOverallData( sentencesArray ) {

    let judgements = calculateCorrectIncorrectMeaningWrongSentences( sentencesArray )

    dataArray = [];

    dataArray.push( judgements[ 'P' ] );
    dataArray.push( judgements[ 'M' ] );
    dataArray.push( judgements[ 'I' ] );
    dataArray.push( judgements[ 'D' ] );

    return dataArray;

}

function calculateCorrectIncorrectMeaningWrongSentences( sentencesArray ) {

    let judgements = {

        'P': 0,
        'I': 0,
        'M': 0,
        'D': 0,

    }

    sentencesArray.forEach( function( sentenceObject ) {

        if ( sentenceObject.judgement === "3" ) {

            judgements[ 'D' ] += 1;

        } else if ( sentenceObject.judgement === "B" ) {

            judgements[ 'P' ] += 1;

        } else {

            judgements[ sentenceObject.judgement ] += 1;
    
        }

    } );

    console.log(' judgements:', judgements );
    return judgements

}

function addPercentageCorrectInCentreOfDoughnut( sentencesArray ) {

    judgements = calculateCorrectIncorrectMeaningWrongSentences( sentencesArray );
    percentCorrect = parseInt( 100 * judgements[ 'P' ] / sentencesArray.length );
    $('#percentSentencesCorrectNo').text( percentCorrect );

}




