const fs = require('fs');
let Tag = require('./../models/TagSchema');

let displayResults = (res, images) => {
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let imagesHtml = '';

        for (let image of images) {
            imagesHtml += `<fieldset id => <legend>${image.imageTitle}:</legend> 
            <img src="${image.imageUrl}">
            </img><p>${image.description}<p/>
            <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
            </button> 
            </fieldset>`;
        }
        

        data = data
            .toString()
            .replace(`<div class='replaceMe'></div>`, imagesHtml);
        res.end(data);
    })

};

module.exports = displayResults;