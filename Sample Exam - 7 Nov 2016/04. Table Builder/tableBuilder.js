function tableBuilder(selector) {
    let selectorTxt = selector;
    selector = $(selector);

    function createTable(columnNames) {
        selector.empty();
        let table = $('<table>');
        let row = $('<tr>');
        for (let colName of columnNames) {
            row.append($(`<th>${colName}</th>`));
        }
        row.append($(`<th>Action</th>`));
        table.append(row);
        selector.append(table);
    }

    function fillData(dataRows) {
        let table = $(`${selectorTxt} table`);
        for (let dataRow of dataRows) {
            let deleteBtn = $('<button>').text('Delete');
            deleteBtn.click(deleteRow);
            let row = $('<tr>');
            for (property of dataRow) {
                row.append($('<td>').text(property));
            }
            row.append($('<td>').append(deleteBtn));
            table.append(row);
        }
    }
    
    function deleteRow() {
        $(this).parent().parent().remove();
    }

    return {
        createTable,
        fillData
    };
}