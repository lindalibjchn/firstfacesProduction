function getAbsoluteCoordsOfMainExpressions() {

    Object.keys( expressionObject.rel ).forEach( function( exp ) {

        indExpRel = expressionObject.rel[ exp ];
        let expression = $.extend( true, {}, indExpRel );

        Object.keys( indExpRel.AUs.AU2 ).forEach( function( key ) {

            expression.AUs.AU2[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 0 ];
            expression.AUs.AU2[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 1 ];
            expression.AUs.AU2[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 2 ];

            expression.AUs.AU2[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 0 ];
            expression.AUs.AU2[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 1 ];
            expression.AUs.AU2[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 2 ];

        })
            
        Object.keys( expressionObject.base.AUs.AU1 ).forEach( function( key ) {

            expression.AUs.AU1[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 0 ];
            expression.AUs.AU1[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 1 ];
            expression.AUs.AU1[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 2 ];


            expression.AUs.AU1[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 0 ];
            expression.AUs.AU1[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 1 ];
            expression.AUs.AU1[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 2 ];

        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( expressionObject.base.AUs.AU1m ).forEach( function( key ) {

            expression.AUs.AU1m[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 0 ];
            expression.AUs.AU1m[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 1 ];
            expression.AUs.AU1m[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 2 ];


            expression.AUs.AU1m[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 0 ];
            expression.AUs.AU1m[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 1 ];
            expression.AUs.AU1m[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 2 ];
            
        });

        expressionObject.abs[ indExpRel.name ] = expression;

    });

}

function getAbsoluteCoordsOfExpressionNow() {

    let absExpression = $.extend(true, {}, expressionObject.rel.blank);

    Object.keys( absExpression.AUs.AU2 ).forEach( function( key ) {

        absExpression.AUs.AU2[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key + '.L'].position.x;
        absExpression.AUs.AU2[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key + '.L'].position.y;
        absExpression.AUs.AU2[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key + '.L'].position.z;

        absExpression.AUs.AU2[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key + '.L'].rotation.x;
        absExpression.AUs.AU2[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key + '.L'].rotation.y;
        absExpression.AUs.AU2[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key + '.L'].rotation.z;

    })
        
    //Object.keys( absExpression.AUs.eyelids ).forEach( function( key ) {

        //absExpression.AUs.eyelids[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key + '.L'].position.y;

    //})

    Object.keys( absExpression.AUs.AU1 ).forEach( function( key ) {

        absExpression.AUs.AU1[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key ].position.x;
        absExpression.AUs.AU1[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key ].position.y;
        absExpression.AUs.AU1[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key ].position.z;


        absExpression.AUs.AU1[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key ].rotation.x;
        absExpression.AUs.AU1[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key ].rotation.y;
        absExpression.AUs.AU1[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key ].rotation.z;

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( absExpression.AUs.AU1m ).forEach( function( key ) {

        absExpression.AUs.AU1m[ key ][ 0 ][ 0 ] = tiaObject.mouthBones[ key ].position.x;
        absExpression.AUs.AU1m[ key ][ 0 ][ 1 ] = tiaObject.mouthBones[ key ].position.y;
        absExpression.AUs.AU1m[ key ][ 0 ][ 2 ] = tiaObject.mouthBones[ key ].position.z;


        absExpression.AUs.AU1m[ key ][ 1 ][ 0 ] = tiaObject.mouthBones[ key ].rotation.x;
        absExpression.AUs.AU1m[ key ][ 1 ][ 1 ] = tiaObject.mouthBones[ key ].rotation.y;
        absExpression.AUs.AU1m[ key ][ 1 ][ 2 ] = tiaObject.mouthBones[ key ].rotation.z;
        
    })

    return absExpression;

}

function getAbsoluteCoordsOfExpressionTo( exp ) {

    let expression = $.extend( true, {}, exp );

    Object.keys( expression.AUs.AU2 ).forEach( function( key ) {

        expression.AUs.AU2[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 0 ];
        expression.AUs.AU2[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 1 ];
        expression.AUs.AU2[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 2 ];

        expression.AUs.AU2[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 0 ];
        expression.AUs.AU2[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 1 ];
        expression.AUs.AU2[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 2 ];

    })
        
    //Object.keys( expression.AUs.eyelids ).forEach( function( key ) {

        //expression.AUs.eyelids[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.eyelids[ key ][ 0 ][ 1 ];

    //})

    Object.keys( expression.AUs.AU1 ).forEach( function( key ) {

        expression.AUs.AU1[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 0 ];
        expression.AUs.AU1[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 1 ];
        expression.AUs.AU1[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 2 ];

        expression.AUs.AU1[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 0 ];
        expression.AUs.AU1[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 1 ];
        expression.AUs.AU1[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 2 ];

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( expression.AUs.AU1m ).forEach( function( key ) {

        expression.AUs.AU1m[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 0 ];
        expression.AUs.AU1m[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 1 ];
        expression.AUs.AU1m[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 2 ];

        expression.AUs.AU1m[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 0 ];
        expression.AUs.AU1m[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 1 ];
        expression.AUs.AU1m[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 2 ];
        
    });

    return expression;

}


