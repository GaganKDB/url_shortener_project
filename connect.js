const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}
// exporting the schema as a model here and some modify changes with comment 
module.exports = {
    connectToMongoDB,
};
