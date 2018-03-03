function attachEvents() {
    const baseUrl = 'https://messenger-7e448.firebaseio.com/';
    const phonebook = $('#phonebook');
    $('#btnLoad').click(getContacts);
    $('#btnCreate').click(createContact);
    let personBox = $('#person');
    let phoneBox = $('#phone');

    function getContacts() {
        let req = {
            url: baseUrl + '.json',
            method: "GET",
            success: displayContacts,
            error: displayError
        };
        $.ajax(req);
    }

    function createContact() {
        let contact = {
            name: personBox.val(),
            phone: phoneBox.val()
        };
        let req = {
            url: baseUrl + '.json',
            method: "POST",
            data: JSON.stringify(contact),
            success: getContacts,
            error: displayError
        };
        $.ajax(req);
        phoneBox.val('');
        personBox.val('');
    }

    function displayError(err) {
        console.log(err.responseText);
    }

    function deleteContact(id) {
        let req = {
            url: `${baseUrl}/${id}.json`,
            method: 'DELETE',
            success: getContacts,
            error: displayError
        };
        $.ajax(req);
    }

    function displayContacts(data) {
        phonebook.empty();
        for (let id in data) {
            let deleteBtn = $('<button>[Delete]</button>').click(() => deleteContact(id));
            phonebook.append($(`<li>${data[id].name}: ${data[id].phone}</li> `).append(deleteBtn));
        }
    }
}