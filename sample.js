/**
 * Created by misyobun on 2017/10/22.
 */

var appStoreRank = require("./")
var reporter = new appStoreRank.Reporter({
    appId:'0000000',  // App Tracking ID for application you want to know about ranking
    limit:'200'       // Rank limit
});

reporter.request(function success(result){
    const appName = result['appName'];
    const rank    = result['rank'];
    if (result['rank'] === -1) {
        console.log(`${appName}はランキング 圏外 です。`);
        return
    }
    console.log(`${appName}の現在の順位は ${rank}位 です。`)
},function error(res) {
    console.log("error: ",res);
});