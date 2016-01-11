	/**
	  *	@fileOverView role control  
	*/
	
	var db = require('./data.js');
	var cache = require('./cache.js');
	var q = require('q');
	
	
	/**
	  *	@desp �����²���
	*/
	var create	= function(operationInfo){
		
		var pid = operationInfo.pid;
		operationInfo.tree = pid;
		cache.set('operationInfos', null);
		
		return get().then(function(result){
			if(result[pid] && result[pid].tree){
				operationInfo.tree += ',' + result[pid].tree;
			}
			return db.operation.add(operationInfo);
		});
		
	};
	
	
	
	/**
	  *	@desp ������в���,����ʽ��
	*/
	var get = function(){
		
		var operationInfos = cache.get('operationInfos');
		if(operationInfos)
			return q.fcall(function(){ return operationInfos;});

		return db.operation.get()
		.then(function(result){
			operationInfos = format(result);
			cache.set('operationInfos', operationInfos);
			return operationInfos;
		});
	};
	
	
	
	/**
	  *	@desp ��ʽ�����в���
	*/
	var format = function(operationInfos){
		var result = {};
		operationInfos.forEach(function(item){
			result[item.id] = item;
			result[item.name] = item;
		});
		return result;
	};
	
	
	/**
	  *	@desp ��ȡָ�������ĸ�����
	*/
	var getParentTree = function(name){		
		return get().then(function(operationInfos){
			var oper = operationInfos[name], tree;
			tree = oper.id + '';
			if(oper.tree) tree += ',' + oper.id;
			return tree;
		});
	};
	
	
	/**
	  *	@desp ����Ȩ������
	*/
	var set = function(operationInfo){
		cache.set('operationInfos', null);
		return db.operation.set(operationInfo);
	};
	
	
	/**
	  *	@desp ɾ��Ȩ��
	*/
	var remove = function(query){
		cache.set('operationInfos', null);
		return db.operation.del(query);
	};
	
	
	
	
	
	exports.create = create;
	exports.get = get;
	exports.set = set;
	exports.remove = remove;
	exports.getParentTree = getParentTree;