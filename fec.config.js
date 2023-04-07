module.exports = {
  appUrl: '/staging/trust',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: true,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  _unstableHotReload: process.env.HOT === 'true',
  customProxy: [
    {
      context: ['/api'],
      target: 'http://127.0.0.1:8081/api',
      pathRewrite: { '^/api': '' },
      secure: true,
      changeOrigin: false,
      proxyVerbose: true,
    },
  ],
  moduleFederation: {
/*
*/
    exclude: ['react-router-dom'],
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          requiredVersion: '^6.3.0',
        },
      },
    ],
  },
};
