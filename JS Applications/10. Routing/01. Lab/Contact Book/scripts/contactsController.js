handlers.contactsController = function () {
    this.loadPartials({
        header: './templates/common/header.hbr',
        footer: './templates/common/footer.hbr',
        contact: './templates/common/contact.hbr',
        contacts_list: './templates/common/contactList.hbr',
        contact_details: './templates/common/details.hbr'
    }).then(function () {
        this.partial('./templates/contacts.hbr')
    })
};