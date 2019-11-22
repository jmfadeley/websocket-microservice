import express from 'express';
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';
import http from 'http';
import SocketIO from 'socket.io';
import winstonInstance from './winston';
import routes from '../routes/index.route';
import config from './config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.Server(app);
const io = new SocketIO(server);

const babble = ['what', 'no', 'why', 'boohoo', 'truffle', 'shuffle', 'mushrooms'];
let word = 'start';

setInterval(() => {
    const rand = Math.floor(Math.random() * 19);
    word = rand < 7 ? babble[rand] : ''+rand;
    winstonInstance.info('The passthword ith... ' + word);
}, 7500);

// Logging details.
if (config.env === 'development' || config.env === 'production') {
    if (config.logLevel === 'debug') {
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
    } else {
        expressWinston.requestWhitelist = ['url', 'method', 'httpVersion', 'originalUrl', 'query'];
        expressWinston.responseWhitelist = ['statusCode', 'responseTime'];
    }
    app.use(expressWinston.logger({
        winstonInstance,
        meta: true, // records meta data about requests
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statueCode}} {{res.responseTime}}ms',
        colorStatus: true, // Defualt green, 300s cyan, 400s yellow and 500s red
    }));
}

app.use('/api', routes);

if (config.env !== 'test') {
    app.use((err, req, res, next) => {
        if (err.isOperational) {
            winstonInstance.warn(err);
        } else {
            winstonInstance.error(err);
        }
        return next(err);
    });
}

app.use((err, req, res, next) =>
    res.status(err.status || 500).json({
        code: error.isPublic ? err.code : 'UNKNOWN_ERROR',
        status: 'ERROR',
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {},
    })
);

io.on('connection', (socket) => {
    winstonInstance.info('You are now connected... to Zombo.com');
    socket.on('connection', () => {
        socket.emit('tick', { word })
    });

    setInterval(() => {
        socket.broadcast.emit('tick', { word })
    }, 5000);

    socket.on('disconnect', () => {
        winstonInstance.info('The only limit... is yourself.');
    });
});

export default server;