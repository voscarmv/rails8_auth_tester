import fetch from 'node-fetch';
import readline from 'readline';

const readLineAsync = () => {
    const rl = readline.createInterface({
      input: process.stdin
    });
    
    return new Promise((resolve) => {
      rl.prompt();
      rl.on('line', (line) => {
        rl.close();
        resolve(line);
      });
    });
  };

(
    async () => {
        console.log('API URL?');
        const url = await readLineAsync();
        console.log('Username?');
        const usr = await readLineAsync();
        console.log('Password?');
        const pass = await readLineAsync();

        try {
            const response = await fetch(url, {
                method: 'POST', // Use POST or another HTTP method as needed
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify({ email_address: usr, password: pass }) // Send the body as JSON
            });
            const output = await response.json();
            console.log(output);
        } catch(e) {
            console.error(e)
        }
    }
)();