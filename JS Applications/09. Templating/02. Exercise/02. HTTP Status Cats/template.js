$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $('#cat-template').html();
        let template = Handlebars.compile(source);
        $('#allCats').html(template({cats}));
        $('.card-block').find('button').click(showStatusCode);
    }

    function showStatusCode() {
        let btn = $(this);
        btn.parent().find('div').toggle(changeText);

        function changeText() {
            let div = $(this);

            switch(div.css('display')) {
                case 'none':
                    btn.text('Show status code');
                    break;
                case 'block':
                    btn.text('Hide status code');
                    break;
                default:
                    break;
            }
        }
    }

});
