var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GizmoSchema = new Schema({
    name: String
})

var WidgetSchema = new Schema({
    name: String,
    gizmos: [GizmoSchema]
});

module.exports = mongoose.model('Widget', WidgetSchema, 'widgets');
