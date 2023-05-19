const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: `http://127.0.0.1:5500` }));

// POST endpoint for input validation
app.post('/validate-input', (req, res) => {
  const input = req.body && req.body.input;

  if (!input || input.length !== 9 || isNaN(input)) {
    const errorResponse = { error: 'Invalid input! Please make sure that you are entering 9 digits number without spaces.  ' };
    return res.json(errorResponse);
  }



  const digits = input.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];

    if (i % 2 === 1) {
      digit *= 2;

      if (digit > 9) {
        digit = digit.toString().split('').map(Number).reduce((a, b) => a + b);
      }
    }
    sum += digit;
  }

  const isValid = sum % 10 === 0;

  if (isValid) {
    res.json({
      message: 'SIN is VALID.',
      status: '200',
    });
  } else {
    res.json({
      message: 'SIN is NOT VALID!',
      status: '400',
     });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
