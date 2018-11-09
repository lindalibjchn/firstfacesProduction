function addGUI( place ) {


    var gui = new dat.GUI();

    if ( place === 'face' ) {

        var jawRotXGUI = gui.addFolder( 'jawRotX' );

        jawRotXGUI.add(tiaObject.faceBones['jaw'].rotation, 'x', tiaObject.faceBones['jaw'].rotation.x - 1, tiaObject.faceBones['jaw'].rotation.x + 1).name('jaw');
        jawRotXGUI.add(tiaObject.mouthBones['jaw_inner'].rotation, 'x', tiaObject.mouthBones['jaw_inner'].rotation.x - 1, tiaObject.mouthBones['jaw_inner'].rotation.x + 1).name('jaw_inner');

        jawRotXGUI.open();

        
        var cheekPosGUI = gui.addFolder( 'cheekPos' );

        cheekPosGUI.add(tiaObject.faceBones['cheek.L'].position, 'x', tiaObject.faceBones['cheek.L'].position.x - 1, tiaObject.faceBones['cheek.L'].position.x + 1).name('cheekX');
        cheekPosGUI.add(tiaObject.faceBones['cheek.L'].position, 'y', tiaObject.faceBones['cheek.L'].position.y - 1, tiaObject.faceBones['cheek.L'].position.y + 1).name('cheekY');
        cheekPosGUI.add(tiaObject.faceBones['cheek.L'].position, 'z', tiaObject.faceBones['cheek.L'].position.z - 1, tiaObject.faceBones['cheek.L'].position.z + 1).name('cheekZ');

        cheekPosGUI.open();

        var pal_ja_jooreumPosGUI = gui.addFolder( 'pal_ja_jooreumPos' );

        pal_ja_jooreumPosGUI.add(tiaObject.faceBones['pal_ja_jooreum.L'].position, 'x', tiaObject.faceBones['pal_ja_jooreum.L'].position.x - 1, tiaObject.faceBones['pal_ja_jooreum.L'].position.x + 1).name('pal_ja_jooreumX');
        pal_ja_jooreumPosGUI.add(tiaObject.faceBones['pal_ja_jooreum.L'].position, 'y', tiaObject.faceBones['pal_ja_jooreum.L'].position.y - 1, tiaObject.faceBones['pal_ja_jooreum.L'].position.y + 1).name('pal_ja_jooreumY');
        pal_ja_jooreumPosGUI.add(tiaObject.faceBones['pal_ja_jooreum.L'].position, 'z', tiaObject.faceBones['pal_ja_jooreum.L'].position.z - 1, tiaObject.faceBones['pal_ja_jooreum.L'].position.z + 1).name('pal_ja_jooreumZ');

        pal_ja_jooreumPosGUI.open();


        var lipsPosXGUI = gui.addFolder( 'lipsPosX' );

        lipsPosXGUI.add(tiaObject.faceBones['lip_upper_inner.L'].position, 'x', tiaObject.faceBones['lip_upper_inner.L'].position.x - 1, tiaObject.faceBones['lip_upper_inner.L'].position.x + 1).name('up_inner.L');
        lipsPosXGUI.add(tiaObject.faceBones['lip_upper_outer.L'].position, 'x', tiaObject.faceBones['lip_upper_outer.L'].position.x - 1, tiaObject.faceBones['lip_upper_outer.L'].position.x + 1).name('up_outer.L');

        lipsPosXGUI.add(tiaObject.faceBones['lip_edge_upper.L'].position, 'x', tiaObject.faceBones['lip_edge_upper.L'].position.x - 1, tiaObject.faceBones['lip_edge_upper.L'].position.x + 1).name('up_edge.L');
        lipsPosXGUI.add(tiaObject.faceBones['lip_edge_lower.L'].position, 'x', tiaObject.faceBones['lip_edge_lower.L'].position.x - 1, tiaObject.faceBones['lip_edge_lower.L'].position.x + 1).name('low_edge.L');

        lipsPosXGUI.add(tiaObject.faceBones['lip_lower_inner.L'].position, 'x', tiaObject.faceBones['lip_lower_inner.L'].position.x - 1, tiaObject.faceBones['lip_lower_inner.L'].position.x + 1).name('low_inner.L');
        lipsPosXGUI.add(tiaObject.faceBones['lip_lower_outer.L'].position, 'x', tiaObject.faceBones['lip_lower_outer.L'].position.x - 1, tiaObject.faceBones['lip_lower_outer.L'].position.x + 1).name('low_outer.L');

        //lipsPosXGUI.add(tiaObject.faceBones['lip_upper_inner.R'].position, 'x', tiaObject.faceBones['lip_upper_inner.R'].position.x - 1, tiaObject.faceBones['lip_upper_inner.R'].position.x + 1).name('up_inner.R');
        //lipsPosXGUI.add(tiaObject.faceBones['lip_upper_outer.R'].position, 'x', tiaObject.faceBones['lip_upper_outer.R'].position.x - 1, tiaObject.faceBones['lip_upper_outer.R'].position.x + 1).name('up_outer.R');

        //lipsPosXGUI.add(tiaObject.faceBones['lip_edge_upper.R'].position, 'x', tiaObject.faceBones['lip_edge_upper.R'].position.x - 1, tiaObject.faceBones['lip_edge_upper.R'].position.x + 1).name('up_edge.R');
        //lipsPosXGUI.add(tiaObject.faceBones['lip_edge_lower.R'].position, 'x', tiaObject.faceBones['lip_edge_lower.R'].position.x - 1, tiaObject.faceBones['lip_edge_lower.R'].position.x + 1).name('low_edge.R');

        //lipsPosXGUI.add(tiaObject.faceBones['lip_lower_inner.R'].position, 'x', tiaObject.faceBones['lip_lower_inner.R'].position.x - 1, tiaObject.faceBones['lip_lower_inner.R'].position.x + 1).name('low_inner.R');
        //lipsPosXGUI.add(tiaObject.faceBones['lip_lower_outer.R'].position, 'x', tiaObject.faceBones['lip_lower_outer.R'].position.x - 1, tiaObject.faceBones['lip_lower_outer.R'].position.x + 1).name('low_outer.R');

        lipsPosXGUI.open();

        
        var lipsPosYGUI = gui.addFolder( 'lipsPosY' );

        lipsPosYGUI.add(tiaObject.faceBones['lip_upper_inner.L'].position, 'y', tiaObject.faceBones['lip_upper_inner.L'].position.y - 1, tiaObject.faceBones['lip_upper_inner.L'].position.y + 1).name('up_inner.L');
        lipsPosYGUI.add(tiaObject.faceBones['lip_upper_outer.L'].position, 'y', tiaObject.faceBones['lip_upper_outer.L'].position.y - 1, tiaObject.faceBones['lip_upper_outer.L'].position.y + 1).name('up_outer.L');

        lipsPosYGUI.add(tiaObject.faceBones['lip_edge_upper.L'].position, 'y', tiaObject.faceBones['lip_edge_upper.L'].position.y - 2, tiaObject.faceBones['lip_edge_upper.L'].position.y + 2).name('up_edge.L');
        lipsPosYGUI.add(tiaObject.faceBones['lip_edge_lower.L'].position, 'y', tiaObject.faceBones['lip_edge_lower.L'].position.y - 2, tiaObject.faceBones['lip_edge_lower.L'].position.y + 2).name('low_edge.L');

        lipsPosYGUI.add(tiaObject.faceBones['lip_lower_inner.L'].position, 'y', tiaObject.faceBones['lip_lower_inner.L'].position.y - 2, tiaObject.faceBones['lip_lower_inner.L'].position.y + 2).name('low_inner.L');
        lipsPosYGUI.add(tiaObject.faceBones['lip_lower_outer.L'].position, 'y', tiaObject.faceBones['lip_lower_outer.L'].position.y - 2, tiaObject.faceBones['lip_lower_outer.L'].position.y + 2).name('low_outer.L');

        //lipsPosYGUI.add(tiaObject.faceBones['lip_upper_inner.R'].position, 'y', tiaObject.faceBones['lip_upper_inner.R'].position.y - 1, tiaObject.faceBones['lip_upper_inner.R'].position.y + 1).name('up_inner.R');
        //lipsPosYGUI.add(tiaObject.faceBones['lip_upper_outer.R'].position, 'y', tiaObject.faceBones['lip_upper_outer.R'].position.y - 1, tiaObject.faceBones['lip_upper_outer.R'].position.y + 1).name('up_outer.R');

        //lipsPosXGUI.add(tiaObject.faceBones['lip_edge_upper.R'].position, 'y', tiaObject.faceBones['lip_edge_upper.R'].position.y - 1, tiaObject.faceBones['lip_edge_upper.R'].position.y + 1).name('up_edge.R');
        //lipsPosXGUI.add(tiaObject.faceBones['lip_edge_lower.R'].position, 'y', tiaObject.faceBones['lip_edge_lower.R'].position.y - 1, tiaObject.faceBones['lip_edge_lower.R'].position.y + 1).name('low_edge.R');

        //lipsPosYGUI.add(tiaObject.faceBones['lip_lower_inner.R'].position, 'y', tiaObject.faceBones['lip_lower_inner.R'].position.y - 1, tiaObject.faceBones['lip_lower_inner.R'].position.y + 1).name('low_inner.R');
        //lipsPosYGUI.add(tiaObject.faceBones['lip_lower_outer.R'].position, 'y', tiaObject.faceBones['lip_lower_outer.R'].position.y - 1, tiaObject.faceBones['lip_lower_outer.R'].position.y + 1).name('low_outer.R');

        lipsPosYGUI.open();

        
        var lipsPosZGUI = gui.addFolder( 'lipsPosZ' );

        lipsPosZGUI.add(tiaObject.faceBones['lip_upper_inner.L'].position, 'z', tiaObject.faceBones['lip_upper_inner.L'].position.z - 1, tiaObject.faceBones['lip_upper_inner.L'].position.z + 1).name('up_inner.L');
        lipsPosZGUI.add(tiaObject.faceBones['lip_upper_outer.L'].position, 'z', tiaObject.faceBones['lip_upper_outer.L'].position.z - 1, tiaObject.faceBones['lip_upper_outer.L'].position.z + 1).name('up_outer.L');

        lipsPosZGUI.add(tiaObject.faceBones['lip_edge_upper.L'].position, 'z', tiaObject.faceBones['lip_edge_upper.L'].position.z - 1, tiaObject.faceBones['lip_edge_upper.L'].position.z + 1).name('up_edge.L');
        lipsPosZGUI.add(tiaObject.faceBones['lip_edge_lower.L'].position, 'z', tiaObject.faceBones['lip_edge_lower.L'].position.z - 1, tiaObject.faceBones['lip_edge_lower.L'].position.z + 1).name('low_edge.L');

        lipsPosZGUI.add(tiaObject.faceBones['lip_lower_inner.L'].position, 'z', tiaObject.faceBones['lip_lower_inner.L'].position.z - 1, tiaObject.faceBones['lip_lower_inner.L'].position.z + 1).name('low_inner.L');
        lipsPosZGUI.add(tiaObject.faceBones['lip_lower_outer.L'].position, 'z', tiaObject.faceBones['lip_lower_outer.L'].position.z - 1, tiaObject.faceBones['lip_lower_outer.L'].position.z + 1).name('low_outer.L');

        //lipsPosZGUI.add(tiaObject.faceBones['lip_upper_inner.R'].position, 'z', tiaObject.faceBones['lip_upper_inner.R'].position.z - 1, tiaObject.faceBones['lip_upper_inner.R'].position.z + 1).name('up_inner.R');
        //lipsPosZGUI.add(tiaObject.faceBones['lip_upper_outer.R'].position, 'z', tiaObject.faceBones['lip_upper_outer.R'].position.z - 1, tiaObject.faceBones['lip_upper_outer.R'].position.z + 1).name('up_outer.R');

        //lipsPosXGUI.add(tiaObject.faceBones['lip_edge_upper.R'].position, 'z', tiaObject.faceBones['lip_edge_upper.R'].position.z - 1, tiaObject.faceBones['lip_edge_upper.R'].position.z + 1).name('up_edge.R');
        //lipsPosXGUI.add(tiaObject.faceBones['lip_edge_lower.R'].position, 'z', tiaObject.faceBones['lip_edge_lower.R'].position.z - 1, tiaObject.faceBones['lip_edge_lower.R'].position.z + 1).name('low_edge.R');

        //lipsPosZGUI.add(tiaObject.faceBones['lip_lower_inner.R'].position, 'z', tiaObject.faceBones['lip_lower_inner.R'].position.z - 1, tiaObject.faceBones['lip_lower_inner.R'].position.z + 1).name('low_inner.R');
        //lipsPosZGUI.add(tiaObject.faceBones['lip_lower_outer.R'].position, 'z', tiaObject.faceBones['lip_lower_outer.R'].position.z - 1, tiaObject.faceBones['lip_lower_outer.R'].position.z + 1).name('low_outer.R');

        lipsPosZGUI.open();

        
        var lipsRotZGUI = gui.addFolder( 'lipsRotZ' );

        lipsRotZGUI.add(tiaObject.faceBones['lip_upper_inner.L'].rotation, 'z', tiaObject.faceBones['lip_upper_inner.L'].rotation.z - 1, tiaObject.faceBones['lip_upper_inner.L'].rotation.z + 1).name('up_inner.L').step(0.1);
        lipsRotZGUI.add(tiaObject.faceBones['lip_upper_outer.L'].rotation, 'z', tiaObject.faceBones['lip_upper_outer.L'].rotation.z - 1, tiaObject.faceBones['lip_upper_outer.L'].rotation.z + 1).name('up_outer.L').step(0.1);

        lipsRotZGUI.add(tiaObject.faceBones['lip_edge_upper.L'].rotation, 'z', tiaObject.faceBones['lip_edge_upper.L'].rotation.z - 1, tiaObject.faceBones['lip_edge_upper.L'].rotation.z + 1).name('up_edge.L').step(0.1);
        lipsRotZGUI.add(tiaObject.faceBones['lip_edge_lower.L'].rotation, 'z', tiaObject.faceBones['lip_edge_lower.L'].rotation.z - 1, tiaObject.faceBones['lip_edge_lower.L'].rotation.z + 1).name('low_edge.L').step(0.1);
        
        lipsRotZGUI.add(tiaObject.faceBones['lip_lower_inner.L'].rotation, 'z', tiaObject.faceBones['lip_lower_inner.L'].rotation.z - 1, tiaObject.faceBones['lip_lower_inner.L'].rotation.z + 1).name('low_inner.L').step(0.1);
        lipsRotZGUI.add(tiaObject.faceBones['lip_lower_outer.L'].rotation, 'z', tiaObject.faceBones['lip_lower_outer.L'].rotation.z - 1, tiaObject.faceBones['lip_lower_outer.L'].rotation.z + 1).name('low_outer.L').step(0.1);

        //lipsRotZGUI.add(tiaObject.faceBones['lip_upper_inner.R'].rotation, 'z', tiaObject.faceBones['lip_upper_inner.R'].rotation.z - 1, tiaObject.faceBones['lip_upper_inner.R'].rotation.z + 1).name('up_inner.R').step(0.1);
        //lipsRotZGUI.add(tiaObject.faceBones['lip_upper_outer.R'].rotation, 'z', tiaObject.faceBones['lip_upper_outer.R'].rotation.z - 1, tiaObject.faceBones['lip_upper_outer.R'].rotation.z + 1).name('up_outer.R').step(0.1);

        //lipsRotZGUI.add(tiaObject.faceBones['lip_edge_upper.R'].position, 'z', tiaObject.faceBones['lip_edge_upper.R'].position.z - 1, tiaObject.faceBones['lip_edge_upper.R'].position.z + 1).name('up_edge.R').step(0.1);
        //lipsRotZGUI.add(tiaObject.faceBones['lip_edge_lower.R'].position, 'z', tiaObject.faceBones['lip_edge_lower.R'].position.z - 1, tiaObject.faceBones['lip_edge_lower.R'].position.z + 1).name('low_edge.R').step(0.1);
        
        //lipsRotZGUI.add(tiaObject.faceBones['lip_lower_inner.R'].rotation, 'z', tiaObject.faceBones['lip_lower_inner.R'].rotation.z - 1, tiaObject.faceBones['lip_lower_inner.R'].rotation.z + 1).name('low_inner.R').step(0.1);
        //lipsRotZGUI.add(tiaObject.faceBones['lip_lower_outer.R'].rotation, 'z', tiaObject.faceBones['lip_lower_outer.R'].rotation.z - 1, tiaObject.faceBones['lip_lower_outer.R'].rotation.z + 1).name('low_outer.R').step(0.1);

        lipsRotZGUI.open();

    } else if ( place === 'body' ) {

        var spineGUI = gui.addFolder( 'spine' );

        spineGUI.add(tiaObject.faceBones['spine.L'].rotation, 'y', tiaObject.faceBones['spine.L'].position.y - 1, tiaObject.faceBones['spine.L'].position.y + 1).name('spineY');
        spineGUI.add(tiaObject.faceBones['spine.L'].scale, 'z', tiaObject.faceBones['spine.L'].position.z - 1, tiaObject.faceBones['spine.L'].position.z + 1).name('spineZ');

        spineGUI.open();



    }

}
