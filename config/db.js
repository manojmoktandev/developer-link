const mongoose = require('mongoose');
const config = require('config');
const uri = config.get('mongoURI');
const connectDB = async () => {
    try {
        mongoose
            .connect(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            .then(() => console.log('Mongob connected ...'))
            .catch(err => {
                console.log(`DB Connection Error: ${err.message}`);
                // Exit process with failure
		        process.exit(1);
            });
       
    }
    catch (err) {
        console.log(err.message);
        // Exit Process with failure
        process.exit(1);
            
    }
};

module.exports = connectDB;