let timer_handles = {};
const bosses = require('../bosses.json');

const createTimer = (channel, boss_name, boss_time) => {
    const b = bosses[boss_name];

    if (b === undefined) {
        console.log(`AlertLogger: ${boss_name} not found in bosses.json`);
        return;
    }

    let bossAlertTimes = b.slice(1);

    bossAlertTimes.forEach(timer => {
        let timerName = boss_name + timer;
        if (Object.keys(timer_handles).includes(timerName)) {
            clearTimeout(timer_handles[timerName])
        }
    });

    // if timer is set below 5 minutes (the minimum alert time), send alert instantly
    if (boss_time && boss_time < 5 * 60 * 1000) {
        channel.send({
            content: `${boss_name} is due in ${(boss_time / (60 * 1000)).toFixed(0)} mins!`,
        })

        let dateTime = new Date(Date.now());
        console.log(`AlertLogger: ${boss_name} due alert sent in ${channel} at ${dateTime.toString()}`);
    }
    // if timer is set for more than 5 mins of time then set it to alert when the boss is due in 5 mins
    else if (boss_time) {
        bossAlertTimes.forEach(alertTime => {
            timer_handles[boss_name + alertTime] = setTimeout(function () {
                channel.send({
                    content: `${boss_name} is due in ${alertTime} mins!`,
                })

                let dateTime = new Date(Date.now());
                console.log(`AlertLogger: ${boss_name} due alert sent in ${channel} at ${dateTime.toString()}`);
            }
                , boss_time - (alertTime * 60 * 1000));
        });
    }
}

const clearTimers = () => {
    Object.values(timer_handles).forEach(timer => clearTimeout(timer));
}

const clearTimer = (boss_name) => {
    const b = bosses[boss_name];

    if (b === undefined) {
        console.log(`AlertLogger: ${boss_name} not found in bosses.json`);
        return;
    }

    let bossAlertTimes = b.slice(1);

    bossAlertTimes.forEach(timer => {
        let timerName = boss_name + timer;
        if (Object.keys(timer_handles).includes(timerName)) {
            clearTimeout(timer_handles[timerName])
        }
    });
}

module.exports = { createTimer, clearTimers, clearTimer };