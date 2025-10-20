// src/middleware/sanitize.js
const { escape } = require('validator'); // npm i validator

module.exports = function sanitizeBody(req, res, next) {
  // sanitizar strings no body (exemplo simples)
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = escape(req.body[key]); // evita XSS simples
      }
    }
  }
  next();
};
