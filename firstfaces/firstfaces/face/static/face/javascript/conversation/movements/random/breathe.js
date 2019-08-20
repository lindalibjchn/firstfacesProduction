function breathe( remaining ) {

    let mult = breatheObject.direction * breatheObject.scaleMult * breatheObject.sin[ remaining ];

    tiaObject.bodyBones.spineUpper.scale.x += mult * 12;
    tiaObject.bodyBones.spineUpper.scale.y += mult;
    tiaObject.bodyBones.spineUpper.scale.z += mult; 
    tiaObject.faceBones['shoulder.L'].position.y += breatheObject.direction * breatheObject.yPosMult * breatheObject.sin[ remaining ];
    tiaObject.faceBones['shoulder.R'].position.y += breatheObject.direction * breatheObject.yPosMult * breatheObject.sin[ remaining ];

}

