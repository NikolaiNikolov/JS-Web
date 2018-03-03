function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_H1Rm8dmwb/biggestCatches';
    const name = 'guest';
    const password = 'guest123';
    let catches = $('div#catches');
    $('button.load').click(loadCatch);
    $('button.add').click(addCatch);

    function loadCatch() {
        $.ajax({
            url: baseUrl,
            method: "GET",
            headers: {
                Authorization: 'Basic ' + btoa(name + ':' + password)
            },
            success: displayCatches,
            error: displayError
        });
    }

    function displayCatches(data) {
        catches.empty();
        for (let catchO of data) {
            let catchDiv = $(`<div class="catch" data-id="${catchO._id}"></div>`);
            catchDiv.append($('<label>Angler</label>'))
                    .append($(`<input class="angler" value="${catchO.angler}" type="text">`))
                    .append($('<label>Weight</label>'))
                    .append($(`<input class="weight" value="${catchO.weight}" type="number">`))
                    .append($('<label>Species</label>'))
                    .append($(`<input class="species" value="${catchO.species}" type="text">`))
                    .append($('<label>Location</label>'))
                    .append($(`<input class="location" value="${catchO.location}" type="text">`))
                    .append($('<label>Bait</label>'))
                    .append($(`<input class="bait" value="${catchO.bait}" type="text">`))
                    .append($('<label>Capture Time</label>'))
                    .append($(`<input class="captureTime" value="${catchO.captureTime}" type="number">`))
                    .append($('<button class="update">Update</button>').click(updateCatch))
                    .append($('<button class="delete">Delete</button>').click(deleteCatch));
            catches.append(catchDiv);
        }
    }

    function updateCatch() {
        let parent = $(this).parent();
        let id = $(this).parent().attr('data-id');
        $.ajax({
            url: baseUrl + '/' + id,
            method: "PUT",
            headers: {
                Authorization: 'Basic ' + btoa(name + ':' + password)
            },
            data: {
                angler: parent.find('.angler').val(),
                weight: parent.find('.weight').val(),
                species: parent.find('.species').val(),
                bait: parent.find('.bait').val(),
                captureTime: parent.find('.captureTime').val(),
                location: parent.find('.location').val()
            },
            success: loadCatch,
            error: displayError
        });
    }

    function deleteCatch() {
        let id = $(this).parent().attr('data-id');
        $.ajax({
            url: baseUrl + '/' + id,
            method: "DELETE",
            headers: {
                Authorization: 'Basic ' + btoa(name + ':' + password)
            },
            success: loadCatch,
            error: displayError
        });
    }

    function addCatch() {
        let angler = $('fieldset#addForm input.angler');
        let weight = $('fieldset#addForm input.weight');
        let species = $('fieldset#addForm input.species');
        let bait = $('fieldset#addForm input.bait');
        let captureTime = $('fieldset#addForm input.captureTime');
        let location = $('fieldset#addForm input.location');

        $.ajax({
            url: baseUrl,
            method: "POST",
            headers: {
                Authorization: 'Basic ' + btoa(name + ':' + password)
            },
            data: {
                angler: angler.val(),
                weight: weight.val(),
                species: species.val(),
                bait: bait.val(),
                captureTime: captureTime.val(),
                location: location.val()
            },
            success: loadCatch,
            error: displayError
        });

        [angler, weight, species, bait, captureTime, location].forEach(f => f.val(''));
    }

    function displayError(err) {
        console.log(err.statusText);
    }
}