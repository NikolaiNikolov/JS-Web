function move(direction) {
    let selected = $('#towns option:selected');
    if (selected.length > 0) {
        if (direction < 0) {
            selected.insertBefore(selected.prev());
        } else {
            selected.insertAfter(selected.next());
        }
    }
}