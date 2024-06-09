const fs = require('fs');

// Sample JSON data
const jsonData = require('../src/core/dictionary/words.json');

// Function to process the JSON data and filter out the items
function processJsonData(data) {
  const filteredData = data.data.filter((item) => {
    // Check if the text contains 1 word or more than 2 words
    const words = item.text.trim().split(/\s+/);
    if (words.length === 1 || words.length > 2) {
      return false;
    }

    // Check if the text contains Chinese characters or special characters
    const chineseRegex = /[\u4e00-\u9fff]/;
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (chineseRegex.test(item.text) || specialCharsRegex.test(item.text)) {
      return false;
    }

    // Check if the text contains any uppercase characters
    if (/[A-Z]/.test(item.text)) {
      return false;
    }

    return true;
  });

  return filteredData;
}

// Process the JSON data and write the filtered results to a file
const filteredData = processJsonData(jsonData);
const outputData = { data: filteredData };

fs.writeFile(
  'filtered_data.json',
  JSON.stringify(outputData, null, 2),
  (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Filtered data written to filtered_data.json');
    }
  },
);
