function attachEvents() {
    const towns = $('#towns');
    let source = $('#towns-template').html();
    let template = Handlebars.compile(source);
    $('#btnLoadTowns').click(displayTowns);


    const context = {
      towns: [

      ]
    };

    function displayTowns() {
        towns.val().split(',').forEach(function (town) {
            context.towns.push({name: town.trim()});
        });

        $('#root').html(template(context));
        towns.val('');
        context.towns = [];
    }
}