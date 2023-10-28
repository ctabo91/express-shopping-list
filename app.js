const express = require('express');
const ExpressError = require('./expressError');

const itemRoutes = require('./itemRoutes');

const app = express();

app.use(express.json());

app.use('/items', itemRoutes);


app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);
    return next(err);
});


app.use((err, req, res, next) => {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

module.exports = app;