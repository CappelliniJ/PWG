const db = require('../server/db.js');

async function generatePassword(length, lowercase, uppercase, number, special) {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let allChars = '';

  if (lowercase) {
    allChars += lowercaseChars;
  }

  if (uppercase) {
    allChars += uppercaseChars;
  }

  if (number) {
    allChars += numberChars;
  }

  if (special) {
    allChars += specialChars;
  }

  if (allChars.length === 0) {
    return 'Error: At least one character set must be selected.';
  }

  if (length < 4 || length > 128) {
    return 'Error: Password length must be between 4 and 128.';
  }

  let password = '';
  let passwordExists = true;

  while (passwordExists) {
    password = '';
    for (let i = 0; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    passwordExists = await db.checkIfPasswordExists(password);
  }

  await db.insertPassword(password);

  return password;
}
