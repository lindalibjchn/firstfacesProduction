function resetLastSent( sId, sData ) {

    conversationVariables.last_sent = {

        'correction': null,
        'emotion': "[0, 0]",
        'indexes': null,
        'judgement': null,
        'nod': null,
        'nodAmount': 0,
        'nodSpeed': 0,
        'prompt': null,
        'sent_id': sId,
        'sentence': sData,
        'show_correction': null,
        'surprise': 0,

    }

}
