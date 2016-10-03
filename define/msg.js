
var msg = {};

msg.define = {};
msg.code = {};

msg.wrapper = function(err,result,res){
    if (err) {
        if(msg.define[err]){
            res.jsonp(msg.getMsg(err,result));
        }else{
            res.jsonp(msg.getMsg(msg.code.ERR_DB_ERR,result));
        }
    } else {
        res.jsonp(msg.getMsg(msg.code.ERR_SUCCESS,result));
    }
};

module.exports.global_msg_define = msg;
