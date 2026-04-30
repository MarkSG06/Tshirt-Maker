const services = {
    authorizationService: new (require('../services/authorization-service'))(),
    geminiGeneratorService: new (require('../services/gemini-image-service'))(),
  }
  
  function createServiceMiddleware(serviceName) {
    return (req, res, next) => {
      req[serviceName] = services[serviceName]
      next()
    }
  }
  
  module.exports = Object.keys(services).reduce((middlewares, serviceName) => {
    middlewares[`${serviceName}Middleware`] = createServiceMiddleware(serviceName)
    return middlewares
  }, {})