const fs = require('fs');
const html = fs.readFileSync('team.html', 'utf8');

const regex = /<div class=\"\" data-name=\"([^\"]+)\"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[1]);
}
