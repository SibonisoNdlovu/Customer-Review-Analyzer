import fs = require('fs');

export default function createJsonFile(text:any): any {
        fs.writeFile('results.json', JSON.stringify(text),  function(err) {
            if (err) {
                return console.error(err);
            }
        });
}