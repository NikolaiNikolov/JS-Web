function attachEvents() {
    $('#refresh').click(loadMessages);
    $('#submit').click(sendMessage);
    let messageBox = $('#messages');
    let author = $('#author');
    let content = $('#content');

    function loadMessages() {
        messageBox.empty();
        let req = {
            url: 'https://messenger-7e448.firebaseio.com/messenger.json',
            method: 'GET',
            success: displayMessages,
            error: displayError
        };
        $.ajax(req);
    }

    function sendMessage() {
        let message = {
            author: author.val(),
            content: content.val(),
            timestamp: Date.now()
        };
        let req = {
            url: 'https://messenger-7e448.firebaseio.com/messenger.json',
            method: 'POST',
            data: JSON.stringify(message),
            success: loadMessages,
            error: displayError
        };
        $.ajax(req);
    }

    function displayMessages(data) {
        for (id in data) {
            let message = `${data[id].author}: ${data[id].content}\n`;
            messageBox.append(message);
        }
    }

    function displayError(err) {
        messageBox.text('Error');
    }
}