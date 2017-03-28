/**
 * Created by matonghe on 15/03/2017.
 */
var log4js = require('log4js');
var mongoAppender = require('log4js-node-mongodb');
var path = require('path');
var fs = require('fs');
//日志根目录
var baseLogPath = path.resolve(__dirname, './logs');
var logger = log4js.getLogger('http');
/**
 * 初始化日志目录
 */
if(!fs.existsSync(baseLogPath)){
    fs.mkdirSync(baseLogPath);
    logger.info('createPath: ' + baseLogPath);
}
log4js.addAppender(mongoAppender.appender({
    connectionString: 'localhost:27017/fluorescence'

}), 'fluorescence');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            'type': 'dateFile',
            'filename': './logs/access.log',
            'pattern': '-yyyy-MM-dd',
            'category': 'http'
        },
        {
            'type': 'file',
            'filename': './logs/app.log',
            'maxLogSize': 10485760,
            'numBackups': 3
        },
        {
            'type': 'logLevelFilter',
            'level': 'ERROR',
            'appender': {
                'type': 'file',
                'filename': './logs/errors.log'
            }
        }
    ]
});

exports.logger = logger;
