	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var q = require('q');
	var cache = require('./cache.js');
	
	/**
	  *	@desp ���ӽ�ɫ
	*/
	var create = function(logInfo){
		return db.log.add(logInfo);
	};
	
	
	/**
	  *	@desp ��ȡ���н�ɫ�������Ȩ��
	*/
	var get = function(query){
		var obj = query || {};
		var pageIndex = query.pageIndex || 1;
		var pageSize = query.pageSize || 0;
		var start = (pageIndex - 1) * pageSize;
		var user_id = query.user_id || 0;
		
		return db.role.get({'user_id' : user_id, 'start': start, 'end' : pageSize});
	};
	

	
	/**
	  *	@desp �h����ɫ�����h���c���Ñ�ӳ���P�S
	*/
	var remove = function(query){
		return db.log.del(query);
	};
	
	
	exports.create = create;
	exports.get = get;
	exports.remove = remove;