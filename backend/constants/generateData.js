const { promisify } = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);


const dataFilePath = './constants/data.json';


function randomLast4() {
    let random_number = Math.floor(Math.random() * 10000);
    return random_number.toString().padStart(4, '0');
  }

function currentDatetime(){
    var date = new Date();
    return date.toLocaleString();
}

module.exports = {
    createData: () => {
    const brands = ["visa","master","amex","discovery"]
    const types = ["credit_card","debit_card"]
    let payment_methods = []
    let id = 1

    for (const brand of brands) {
        for (const type of types){
            payment_methods.push({
                 "id": id++,
                 "brand": brand,
                 "type": type,
                 "last4": randomLast4(),
                 "createdAt": currentDatetime()
            })
        }
    }

    writeFileAsync(dataFilePath, JSON.stringify(payment_methods));
    return 
}

}
// payment_methods=createData()