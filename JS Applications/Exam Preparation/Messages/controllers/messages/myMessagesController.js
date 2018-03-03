handlers.myMessagesController = function (ctx) {
    this.isLoggedIn = !!sessionStorage.getItem('authtoken');
    this.username = sessionStorage.getItem('username');

    util.loadMessages()
        .then(function (messages) {
            //format date
            messages.map(m => m._kmd.lmt = util.formatDate(m._kmd.lmt));
            //format sender_name
            messages.map(m => m.sender_name = util.formatSender(m["sender_username"], m["sender_name"]));

            ctx.messages = messages;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                message: './templates/common/message.hbs',
            }).then(function () {
                this.partial('./templates/messages/my_messages.hbs');
            });
        })
        .catch(auth.handleError);

};