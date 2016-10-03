var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('util');
var url = require('url');
var async = require('async');

var httpBiz = require(path.join(global.rootPath, "interfaceBiz/httpBiz"));
var msg = require(path.join(global.rootPath, "define/msg")).global_msg_define;

router.get("/list", function(req, res){
    var param = url.parse(req.url, true).query;
    httpBiz.getForumRecommendList(param.needAd, param.category, param.deviceType, param.pageSize, param.pageNum, function(err, infos){
	if(err){
	    res.jsonp("404 NOT FOUND");
	}else{
	    res.render('pages/vedio/list', {vedioList : infos});
	}
    });
});

router.get("/detail", function(req, res){
    var param= url.parse(req.url, true).query;
    httpBiz.getBMVideoDetail(param.passport, param.videoId, param.objType, param.objId, function(err, info){
	if(err){
	    res.jsonp("404 NOT FOUND");
	}else{
	    res.render('pages/vedio/detail', {vedioDetail : info});
	}
    });
});

module.exports = router;