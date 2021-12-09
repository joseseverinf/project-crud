const Pirata = require('../models/pirata.model');


module.exports.create = (req, resp) => {
    const pirata = req.body;
    Pirata.create(pirata)
        .then(data => resp.status(200).json({ ok: true, message: 'Se agregó', data: data}))
        .catch(error => {
            console.log('CREATE', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar'})
            }
        });
}

module.exports.edit = (req, resp) => {
    const pirata = req.body;
    Pirata.findOneAndUpdate({_id: req.params.id }, pirata)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó', data: pirata}))
        .catch(error => {
            console.log('EDIT', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar'})
            }
        });
}

module.exports.get = (req, resp) => {
    Pirata.findById(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Pirata', data: data}))
        .catch(error => {
            console.log('GET', error);
            resp.status(500).json({ok: false, message: 'Error al obtener'})
        });
}

module.exports.list = (req, resp) => {
    Pirata.find()
        .then(data => resp.status(200).json({ ok: true, message: 'Piratas', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener'})
        });
}

module.exports.del = (req, resp) => {
    Pirata.findByIdAndRemove(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Se eliminó', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            resp.status(500).json({ok: false, message: 'Error al eliminar la mascota'})
        });
}