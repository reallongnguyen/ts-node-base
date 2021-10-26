const configs = {
  serviceName: 'base',
  version: '1.0.0',
  nodeENV: process.env.NODE_ENV || 'production',
  logLevel: process.env.LOG_LEVEL || 'info',
  server: {
    port: parseInt(process.env.PORT || '3001'),
  },
};

export default configs;
