function cardDeckBuilder(selector) {
    let selectorTxt = selector;
    selector = $(selector);
    function addCard(face, suit) {
        let suitMap = {
            C: '\u2663',
            D: '\u2666',
            H: '\u2665',
            S: '\u2660'
        };
        let cardText = face + suitMap[suit];
        let card = $('<div class="card"></div>');
        card.text(cardText);
        card.click(reverseCards);
        selector.append(card);
    }
    
    function reverseCards() {
        let cards = $(`${selectorTxt} div`);
        selector.append([...cards].reverse());
    }
    return {
        addCard
    }
}