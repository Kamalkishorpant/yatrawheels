const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/odoo',
    createProxyMiddleware({
      target: 'https://yourcar.odoo.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/odoo': '', // Remove /api/odoo from the path
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  );
};