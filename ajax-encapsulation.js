<!-- 申明一个全局对象 -->
window.$={};
<!-- 在$下面申明一个ajax -->
$.ajax = function(options){
	<!-- options 参数对象 -->
	if(!options || typeof options != 'object'){
		return false;
	}
	<!-- options 里面的参数 需要处理 -->
	var type = options.type === 'post' ? 'post' : 'get';
	<!-- location 可以获取地址栏相关信息 -->
	var url = options.url || location.pathname;
	<!-- 异步的还是同步 ,默认异步-->
	var async = options.async === false ? false : true;
	<!-- 传输的数据 -->
	var data = options.data || {};<!--{name:xgg,age:18}-->
	<!-- 在提交的时候需要转成 name=xjj 这种格式 -->
	var dataStr = '';
	for(var key in data){
		dataStr += key + '=' + data[key] + '&';
	}
	<!-- name=xgg&age=10& -->
	dataStr = dataStr && dataStr.slice(0,-1);
	<!-- beforeSend -->
	if(options.beforeSend){
        var flag = options.beforeSend();
        if(flag === false){
            return false;
        }
    }
	<!-- ajax编程 -->
	var xhr = new XMLHttpRequest();
	<!-- 1.请求 -->
	<!-- 1.1 请求行 -->
	xhr.open(type,type == 'get' ? (url + '?' + dataStr) : url,async);
	<!-- 1.2 请求头 -->
	if(type == 'post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	<!-- 1.3 请求主体 发送 -->
	xhr.send(type == 'get' ? null : dataStr);
	<!-- 2.响应 -->
	xhr.onreadystatechange = function(){
		<!-- 通讯完成 -->
		if(xhr.readyState == 4){
			<!-- 1.响应成功 -->
			if(xhr.status == 200){
				<!-- 获取数据 -->
				var result = null;
				<!-- 获取什么数据 -->
                <!-- 怎么判断去获取什么数据 -->
                <!-- 可以根据响应的类型去判断获取什么数据 -->
				var contentType = xhr.getResponseHeader('Content-Type');
                <!-- 如果返回的类型包含 字符串 xml -->
                if(contentType.indexOf('xml') > -1){
                    result = xhr.responseXML;
                }
                <!-- 如果返回的类型包含 字符串 json -->
                else if(contentType.indexOf('json') > -1){
                    result = JSON.parse(xhr.responseText);
                }
                <!-- 如果返回的类型包含 字符串 text -->
                else{
                    result = xhr.responseText;
                }

                <!-- 调用用户传的 成功回调函数 -->
                options.success && options.success(result);
			}else{
				<!-- 2.响应失败 -->
				<!-- 调用用户传的 失败回调函数 -->
				var msg = {status:xhr.status,statusText:xhr.statusText};
				options.error && options.error(msg);
			}
			<!-- 通讯完成回调 -->
			options.complete && options.complete();
		}
	}
};
$.get = function (options) {
    options.type = 'get';
    $.ajax(options);
}
$.post = function (options) {
    options.type = 'post';
    $.ajax(options);
}