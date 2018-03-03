function move(command) {
    let selectedTown;
    let availableTowns = $('#available-towns');
    let selectedTowns = $('#selected-towns');
    switch (command) {
        case 'right':
            selectedTown = $('#available-towns option:selected');
            selectedTowns.append(selectedTown);
            break;
        case 'left':
            selectedTown = $('#selected-towns option:selected');
            availableTowns.append(selectedTown);
            break;
        case 'print':
            let output = $('#output');
            output.empty();
            output.append([...$('#selected-towns option')].map(t => t.textContent).join('; '));
            break;
    }
}