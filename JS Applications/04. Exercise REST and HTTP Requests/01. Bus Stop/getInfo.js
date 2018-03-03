function getInfo() {
    let stopId = $('#stopId').val();
    let stopName = $('#stopName');
    const list = $('#buses');
    list.empty();
    stopName.text('');

    let req = {
        url: `https://judgetests.firebaseio.com/businfo/${stopId}.json`,
        method: "GET",
        success: displayData,
        error: displayError
    };
    $.ajax(req);

    function displayData(data) {
        stopName.text(data.name);
        for (let bus in data.buses) {
            let li = $(`<li>Bus ${bus} arrives in ${data.buses[bus]} minutes</li>`);
            list.append(li);
        }

    }

    function displayError(err) {
        stopName.text('Error');
    }
}