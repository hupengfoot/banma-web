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
    var vedioList;
    var vedioListCount;
    var allList;
    var allListCount;
    async.waterfall([
	function(callback){
	    httpBiz.getForumRecommendList(param.needAd, param.category, "video_obj", param.deviceType, param.pageSize, param.pageNum, function(err, infos){
		if(err){
		    callback("404 NOT FOUND");
		}else{
		    if(+ infos.code === 200){
			vedioList = infos.messages.data.list;
			vedioListCount = infos.messages.data.count;
			callback();
		    }else{
			callback("PARAM ERROR");
		    }
		}
	    });
	},
	function(callback){
	    httpBiz.getForumRecommendList(param.needAd, param.category, "video_obj,subject", param.deviceType, param.pageSize, param.pageNum, function(err, infos){
		if(err){
		    callback("404 NOT FOUND");
		}else{
		    if(+ infos.code === 200){
			allList = infos.messages.data.list;
			allListCount = infos.messages.data.count;
			callback();
		    }else{
			callback("PARAM ERROR");
		    }
		}
	    });

	}
    ], function(err){
	if(err){
	    res.jsonp(err);
	}else{
	    res.render('pages/vedio/list', {vedioList : vedioList, totalCount : vedioListCount, allList : allList, allListCount : allListCount, pageSize : param.pageSize, pageNum : param.pageNum, category : param.category, myType : param.type});
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

router.get("/subjectdetail", function(req, res){
    var param= url.parse(req.url, true).query;
    httpBiz.getBMMarketSubjectDetail(param.passport, param.subjectId, function(err, info){
	if(err){
	    res.jsonp("404 NOT FOUND");
	}else{
	    res.render('pages/vedio/subject', {subjectDetail : info});
	}
    });
});

module.exports = router;
