const PirataController = require('../controllers/pirata.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/piratas', authenticate, PirataController.list);
    app.get('/api/piratas/:id', authenticate, PirataController.get);
    app.post('/api/piratas', authenticate, PirataController.create);
    app.put('/api/piratas/:id', authenticate, PirataController.edit);
    app.delete('/api/piratas/:id', authenticate, PirataController.del);
}