function generatePassword(length, lowercase, uppercase, number, special) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let allChars = "";

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
    return "Error: At least one character set must be selected.";
  }

  if (length < 4 || length > 128) {
    return "Error: Password length must be between 4 and 128.";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password;
}

const generateButton = document.getElementById("generate");
const resultDiv = document.getElementById("result");

generateButton.addEventListener("click", function () {
  const length = document.getElementById("length").value;
  const lowercase = document.getElementById("lowercase").checked;
  const uppercase = document.getElementById("uppercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const special = document.getElementById("special").checked;

  const password = generatePassword(
    length,
    lowercase,
    uppercase,
    numbers,
    special
  );
  resultDiv.textContent = password;
});
