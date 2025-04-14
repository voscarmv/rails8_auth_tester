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
    const url = 'https://probable-space-memory-7rp4wxxq74fvj4-3000.app.github.dev/passwords';
    // console.log('User email?');
    const usr = 'voscarmv@gmail.com';
    let output = null;
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST or another HTTP method as needed
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ email_address: usr }) // Send the body as JSON
      });
      output = await response.json();
    } catch (e) {
      console.error(e)
    }
    console.log(output);
    console.log('Password reset token?');
    const token = await readLineAsync();
    console.log('New password?');
    const pass = await readLineAsync();
    let output2;
    try {
      const response = await fetch(`${url}/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pass, password_confirmation: pass }) // Send the body as JSON
      });
      output2 = await response.json();
    } catch (e) {
      console.error(e)
    }
    console.log(output2);
  }
)();