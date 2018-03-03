function listBuilder(selector) {
    selector = $(selector);
    return {
        createNewList,
        addItem
    };
    function createNewList() {
        selector.empty();
        selector.append($('<ul>'));
    }
    function addItem(text) {
        let btnUp = $(`<button>Up</button>`).click(moveUp);
        let btnDown = $(`<button>Down</button>`).click(moveDown);
        function moveUp() {
            let list = $(this.parentNode);
            list.insertBefore(list.prev());
        }
        function moveDown() {
            let list = $(this.parentNode);
            list.insertAfter(list.next());
        }
        selector.find('ul').append($(`<li></li>`).text(text).append(btnUp).append(btnDown));
    }
}