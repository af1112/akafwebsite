const https = require('https');

const url = 'https://www.akafco.com/pc_software/';

console.log(`Checking URL: ${url}`);

https.get(url, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:');
  for (const [key, value] of Object.entries(res.headers)) {
    console.log(`  ${key}: ${value}`);
  }
  
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log(`\nRedirect Location: ${res.headers.location}`);
  }
}).on('error', (e) => {
  console.error(`Error: ${e.message}`);
});
