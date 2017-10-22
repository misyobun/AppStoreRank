/**
 * Created by misyobun on 2017/10/22.
 */
const RANKLIMIT = 200
const rank = require("./src/rank");
exports.Reporter = Reporter;
function Reporter(params) {
    this.params = params;
    this.params['country']  = !this.params['country'] ? 'jp' : this.params['country'];
    this.params['limit']    = !this.params['limit']   ? RANKLIMIT : this.params['limit'];
}

Reporter.prototype.validate = function() {
    var result = {};
    if (!this.params['appId']) {
        result['message'] = "There is no appId. You should set appId.";
        return result
    }

    if (this.params['limit'] > RANKLIMIT) {
        result['message'] = "limit should be under 200.";
        return result
    }
    result = null;
    return result
};

Reporter.prototype.request = function(success,error) {
    const result = this.validate();
    if (result !== null) {
        error(result);
        return
    }
    rank.getRank(this.params,success,error);
    return this;
};