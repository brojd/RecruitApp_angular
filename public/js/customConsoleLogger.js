var updateConsole = function(oldConsole){
    var myDate = new Date();
    var currentDate;
    return {
        log: function(text){
            currentDate = Date.now();
            myDate.setTime(currentDate);
            oldConsole.info('LOG, RecruitApp, ' + myDate);
            oldConsole.log(text);
        },
        info: function(){},
        warn: function (text) {
            currentDate = Date.now();
            myDate.setTime(currentDate);
            oldConsole.info('WARNING, RecruitApp, ' + myDate);
            oldConsole.warn(text);
        },
        error: function (text) {
            currentDate = Date.now();
            myDate.setTime(currentDate);
            oldConsole.info('ERROR, RecruitApp, ' + myDate);
            oldConsole.error(text);
        }
    };
};