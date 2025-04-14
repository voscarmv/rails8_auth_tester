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
    // console.log('API URL?');
    const url = 'https://probable-space-memory-7rp4wxxq74fvj4-3000.app.github.dev/session';
    // console.log('Username?');
    const usr = 'user@test.com';
    // console.log('Password?');
    const pass = '123456789';
    let output = null;
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST or another HTTP method as needed
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ email_address: usr, password: pass }) // Send the body as JSON
      });
      output = await response.json();
    } catch (e) {
      console.error(e)
    }
    console.log(output);
    // console.log('API URL?');
    const url2 = 'https://probable-space-memory-7rp4wxxq74fvj4-3000.app.github.dev/projects';
    let output2;
    let headers2;
    try {
      const response = await fetch(url2, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${output.data.token}`,
        },
      });
      output2 = await response.json();
      headers2 = response.headers;
    } catch (e) {
      console.error(e)
    }
    console.log(output2);
    console.log(headers2.get('authorization'));
    try {
      const response = await fetch(url2, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${headers2.get('authorization')}`,
        },
      });
      output2 = await response.json();
      headers2 = response.headers;
    } catch (e) {
      console.error(e)
    }
    console.log(output2);
    console.log(headers2.get('authorization'));
  }
)();