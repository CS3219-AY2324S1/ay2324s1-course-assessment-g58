module.exports = {
    version: '0.0.1',
    init: function (pluginContext) {
      console.log("init rabbitmq-middleware plugin")
      let policy = require('./policies/rabbitmq-middleware-policy')
      pluginContext.registerPolicy(policy)
    },
    policies: ['rabbitmq-middleware-policy'],
    schema: {
        $id: 'http://express-gateway.io/schemas/rabbitmq-middleware-policy.json',
    }
  }