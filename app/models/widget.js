var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Widget', WidgetSchema);
