const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const XLSX = require('xlsx');

const dataFilePath = './constants/data.json';
const reportFilePath = './report/report.csv';

module.exports = {
    getPaymentById: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await readFileAsync(dataFilePath, 'utf8');
            const parsedData = JSON.parse(data);
            const item = parsedData.find((item) => item.id.toString() === id);
        
            if (!item) {
            return res.status(404).json({ error: 'Payment was not found' });
            }
        
            return res.json(item);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Was impossible to access the data. Check the data source' });
        }
    },
      
    getAllPaymenteWithTypeFilter: async (req, res) => {
        try {
        const {type} = req.query;
        const data = await readFileAsync(dataFilePath, 'utf8');
        const parsedData = JSON.parse(data);
        const filteredData = parsedData.filter((item) => item.type === type);
        return res.json(filteredData);
        } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Was impossible to access the data, check the data source' });
        }
    },
      
    deletePaymentById: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await readFileAsync(dataFilePath, 'utf8');
            let parsedData = JSON.parse(data);
            const index = parsedData.findIndex((item) => item.id.toString() === id);
            if (index === -1) {
            return res.status(404).json({ error: 'Payment method not found' });
            }
        
            parsedData.splice(index, 1);
        
            await writeFileAsync(dataFilePath, JSON.stringify(parsedData));
        
            return res.json({ message: 'Payment method successfully deleted' });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Was impossible to access the data. Check the data source' });
        }
      },
    
    createPaymentReport: async (req, res) => {
        try {
            const data = await readFileAsync(dataFilePath, 'utf8');
            let parsedData = JSON.parse(data);
        
            const worksheet = XLSX.utils.json_to_sheet(parsedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            
            const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets['Data']);
        
            await writeFileAsync(reportFilePath, csvData);
        
            res.download(reportFilePath, 'report.csv', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error occurred while downloading the CSV file.' });
            }
        
            fs.unlink(reportFilePath, (err) => {
                if (err) {
                console.error(err);
                }
            });
            });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error occurred while downloading the CSV file.' });
        }
    }
}
