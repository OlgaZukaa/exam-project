// https://github.com/expressjs/express/blob/master/examples/hello-world/index.js

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const stats = [];

let currentStats = getEmptyStats();

app.get('/endpoint', function (req, res) {

    //console.log('currentStat=', currentStats);

    const resTime = Math.floor(Math.random() * 1000);

    setTimeout(() => {
        currentStats.totalResTime += resTime
        currentStats.total++
        currentStats.maxResTime = Math.max(currentStats.maxResTime, resTime)

        if (currentStats.minResTime === null) {
            currentStats.minResTime = resTime
        }
        else {
            currentStats.minResTime = Math.min(currentStats.minResTime, resTime)
        }
        if (req.query.login) {
            console.log('valid req')
            currentStats.valid++
            res.sendStatus(200)

        } else {
            console.log('invalid req')
            currentStats.invalid++
            res.sendStatus(401)
        }

    }, resTime)

});

app.get('/stats', function (req, res) {

    if (req.query.from) {
        console.log('get stats from', req.query.from)
        res.json(stats.filter((statsItem) => statsItem.timestamp > req.query.from))

    } else {
        console.log('get last 10 stats')
        res.json(stats.slice(-10))
    }
});

setInterval(() => {
    stats.push({
        timestamp: Date.now(),
        minResTime: currentStats.minResTime,
        maxResTime: currentStats.maxResTime,
        valid: currentStats.valid,
        invalid: currentStats.invalid,
        total: currentStats.total,
        avgResTime: currentStats.total === 0 ? 0 : currentStats.totalResTime / currentStats.total
    })
    //console.log('stats=', stats)

    currentStats = getEmptyStats()

}, 10000)


function getEmptyStats() {
    return {
        valid: 0,
        invalid: 0,
        total: 0,
        minResTime: null,
        maxResTime: 0,
        avgResTime: 0,
        totalResTime: 0
    }
}
app.listen(4000);
console.log('Express started on port 4000');
