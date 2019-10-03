const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GizmoSchema = new Schema({
    name: String
})

const WidgetSchema = new Schema({
    name: String,
    gizmos: [GizmoSchema]
});

module.exports = mongoose.model('Widget', WidgetSchema, 'widgets');
