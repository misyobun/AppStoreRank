/**
 * Created by misyobun on 2017/10/22.
 */
const async = require('async');
const client = require('cheerio-httpcli');

module.exports.getRank = function (params, success, error) {
    async.waterfall([function (callback) {
        const lookupURL = `https://itunes.apple.com/lookup?id=${params['appId']}&country=${params['country']}`
        client.fetch(lookupURL, function (err, $, res, body) {
            if (err) {
                error(err);
                return;
            }
            const jsonBody = JSON.parse(body);
            const app = jsonBody['results'][0];
            if (!app) {
                error("This app does not exist.");
                return
            }
            params["primaryGnereId"] = app['primaryGenreId'];
            params["appName"] = app['trackCensoredName'];
            callback(null, params, success, error);
        });
    }, function (params, success, error) {
        const rankingUrl = `https://itunes.apple.com/jp/rss/topfreeapplications/limit=${params['limit']}/country=${params['country']}/genre=${params['primaryGnereId']}/json`;
        client.fetch(rankingUrl, function (err, $, res, body) {
            if (err) {
                error(err);
                return;
            }
            var rank = 1;
            const feed = JSON.parse(body)['feed'];
            const entries = feed["entry"];
            const result = {
                appName: params['appName']
            };
            async.eachSeries(entries, function (entry, entriesCallback) {
                if (entry['id']['attributes']['im:id'] === params["appId"]) {
                    result['rank'] = rank;
                    success(result);
                    return;
                }
                rank++;
                entriesCallback(null);
            });
            if (rank > params['limit']) {
                result['rank'] = -1;
                success(result);
            }
        });
    }]);
};