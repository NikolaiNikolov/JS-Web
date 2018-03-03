class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.online = false;
    }

    set firstName(value) {
        this._firstName = value;
    }
    get firstName() {
        return this._firstName;
    }

    set lastName(value) {
        this._lastName = value;
    }
    get lastName() {
        return this._lastName;
    }

    set phone(value) {
        this._phone = value;
    }
    get phone() {
        return this._phone;
    }

    set email(value) {
        this._email = value;
    }
    get email() {
        return this._email;
    }

    set online(value) {
        this._online = value;

        let fullName = `${this.firstName} ${this.lastName}`;
        let div = $(`.title:contains(${fullName})`);
        if (this.online) {
            div.addClass('online');
        } else {
            div.removeClass('online');
        }
    }

    get online() {
        return this._online;
    }

    toggleInfo() {
        let article = $(this).parent().parent();
        let infoDiv = article.find('.info');
        if (infoDiv.css('display') === 'block') {
            infoDiv.css('display', 'none');
        } else {
            infoDiv.css('display', 'block');
        }
    }

    render(id) {
        id = $(`#${id}`);
        let article = $('<article>');
        let titleDiv = $(`<div class="title"></div>`).text(`${this.firstName} ${this.lastName}`);
        if (this.online) {
            titleDiv.addClass('online');
        }
        let btn = $(`<button>&#8505;</button>`);
        btn.click(this.toggleInfo);
        let infoDiv = $(`<div class="info" style="display: none;"></div>`);
        let phoneSpan = $(`<span>&phone;${this.phone}</span>`);
        let emailSpan = $(`<span>&#9993;${this.email}</span>`);
        infoDiv.append(phoneSpan);
        infoDiv.append(emailSpan);
        titleDiv.append(btn);
        article.append(titleDiv);
        article.append(infoDiv);
        id.append(article);
    }
}