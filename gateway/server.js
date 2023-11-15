const path = require("path");
const gateway = require("express-gateway");

require('dotenv').config();

gateway().load(path.join(__dirname, "config")).run();

// TODO: Add health check