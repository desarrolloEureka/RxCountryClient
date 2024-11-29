const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // Prefijo para tus peticiones a Firebase
    createProxyMiddleware({
      target: 'https://firebasestorage.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  // Reescribe el prefijo
      },
    })
  );
};
