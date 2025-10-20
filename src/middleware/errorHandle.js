// src/middleware/errorHandler.js
module.exports = function errorHandler(err, req, res, next) {
  // Logar internamente (sem vazar stack para o usuário)
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message);

  // Não retornar stack trace em produção
  const payload = {
    error: 'InternalServerError',
    message: 'Ocorreu um erro no servidor. Contate o suporte.'
  };

  // se for dev e você quiser mais detalhe, poderia condicionalmente incluir info
  return res.status(500).json(payload);
};
