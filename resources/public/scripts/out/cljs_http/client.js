// Compiled by ClojureScript 0.0-2227
goog.provide('cljs_http.client');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('clojure.string');
goog.require('cljs.core.async');
goog.require('no.en.core');
goog.require('goog.Uri');
goog.require('cljs_http.core');
goog.require('no.en.core');
goog.require('goog.Uri');
goog.require('cljs_http.util');
goog.require('cljs.core.async');
goog.require('cljs_http.util');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('cljs_http.core');
cljs_http.client.if_pos = (function if_pos(v){if(cljs.core.truth_((function (){var and__3529__auto__ = v;if(cljs.core.truth_(and__3529__auto__))
{return (v > 0);
} else
{return and__3529__auto__;
}
})()))
{return v;
} else
{return null;
}
});
/**
* Parse `s` as query params and return a hash map.
*/
cljs_http.client.parse_query_params = (function parse_query_params(s){if(cljs.core.not.call(null,clojure.string.blank_QMARK_.call(null,s)))
{return cljs.core.reduce.call(null,(function (p1__10773_SHARP_,p2__10772_SHARP_){var vec__10775 = clojure.string.split.call(null,p2__10772_SHARP_,/=/);var k = cljs.core.nth.call(null,vec__10775,0,null);var v = cljs.core.nth.call(null,vec__10775,1,null);return cljs.core.assoc.call(null,p1__10773_SHARP_,cljs.core.keyword.call(null,no.en.core.url_decode.call(null,k)),no.en.core.url_decode.call(null,v));
}),cljs.core.PersistentArrayMap.EMPTY,clojure.string.split.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)),/&/));
} else
{return null;
}
});
/**
* Parse `url` into a hash map.
*/
cljs_http.client.parse_url = (function parse_url(url){if(cljs.core.not.call(null,clojure.string.blank_QMARK_.call(null,url)))
{var uri = goog.Uri.parse(url);var query_data = uri.getQueryData();return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"scheme","scheme",4400883991),cljs.core.keyword.call(null,uri.getScheme()),new cljs.core.Keyword(null,"server-name","server-name",4503925319),uri.getDomain(),new cljs.core.Keyword(null,"server-port","server-port",4503998525),cljs_http.client.if_pos.call(null,uri.getPort()),new cljs.core.Keyword(null,"uri","uri",1014020318),uri.getPath(),new cljs.core.Keyword(null,"query-string","query-string",1183691816),((cljs.core.not.call(null,query_data.isEmpty()))?(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_data)):null),new cljs.core.Keyword(null,"query-params","query-params",1080249757),((cljs.core.not.call(null,query_data.isEmpty()))?cljs_http.client.parse_query_params.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(query_data))):null)], null);
} else
{return null;
}
});
cljs_http.client.unexceptional_status_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 13, [205,null,206,null,300,null,204,null,307,null,303,null,301,null,201,null,302,null,202,null,200,null,203,null,207,null], null), null);
cljs_http.client.generate_query_string = (function generate_query_string(params){return clojure.string.join.call(null,"&",cljs.core.map.call(null,(function (p__10778){var vec__10779 = p__10778;var k = cljs.core.nth.call(null,vec__10779,0,null);var v = cljs.core.nth.call(null,vec__10779,1,null);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(no.en.core.url_encode.call(null,cljs.core.name.call(null,k)))+"="+cljs.core.str.cljs$core$IFn$_invoke$arity$1(no.en.core.url_encode.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))));
}),params));
});
/**
* Decocde the :body of `response` with `decode-fn` if the content type matches.
*/
cljs_http.client.decode_body = (function decode_body(response,decode_fn,content_type){if(cljs.core.truth_(cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,("(?i)"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(content_type))),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"headers","headers",1809212152).cljs$core$IFn$_invoke$arity$1(response),"content-type",""))))))
{return cljs.core.update_in.call(null,response,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"body","body",1016933652)], null),decode_fn);
} else
{return response;
}
});
/**
* Encode :edn-params in the `request` :body and set the appropriate
* Content Type header.
*/
cljs_http.client.wrap_edn_params = (function wrap_edn_params(client){return (function (request){var temp__4124__auto__ = new cljs.core.Keyword(null,"edn-params","edn-params",1007197398).cljs$core$IFn$_invoke$arity$1(request);if(cljs.core.truth_(temp__4124__auto__))
{var params = temp__4124__auto__;return client.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"edn-params","edn-params",1007197398)),new cljs.core.Keyword(null,"body","body",1016933652),cljs.core.pr_str.call(null,params)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",1809212152),"content-type"], null),"application/edn"));
} else
{return client.call(null,request);
}
});
});
/**
* Decode application/edn responses.
*/
cljs_http.client.wrap_edn_response = (function wrap_edn_response(client){return (function (request){var channel = cljs.core.async.chan.call(null);var c__6921__auto___10814 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__6921__auto___10814,channel){
return (function (){var f__6922__auto__ = (function (){var switch__6809__auto__ = ((function (c__6921__auto___10814,channel){
return (function (state_10804){var state_val_10805 = (state_10804[1]);if((state_val_10805 === 2))
{var inst_10799 = (state_10804[2]);var inst_10800 = cljs_http.client.decode_body.call(null,inst_10799,cljs.reader.read_string,"application/edn");var inst_10801 = cljs.core.async.put_BANG_.call(null,channel,inst_10800);var inst_10802 = cljs.core.async.close_BANG_.call(null,channel);var state_10804__$1 = (function (){var statearr_10806 = state_10804;(statearr_10806[7] = inst_10801);
return statearr_10806;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10804__$1,inst_10802);
} else
{if((state_val_10805 === 1))
{var inst_10797 = client.call(null,request);var state_10804__$1 = state_10804;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10804__$1,2,inst_10797);
} else
{return null;
}
}
});})(c__6921__auto___10814,channel))
;return ((function (switch__6809__auto__,c__6921__auto___10814,channel){
return (function() {
var state_machine__6810__auto__ = null;
var state_machine__6810__auto____0 = (function (){var statearr_10810 = [null,null,null,null,null,null,null,null];(statearr_10810[0] = state_machine__6810__auto__);
(statearr_10810[1] = 1);
return statearr_10810;
});
var state_machine__6810__auto____1 = (function (state_10804){while(true){
var ret_value__6811__auto__ = (function (){try{while(true){
var result__6812__auto__ = switch__6809__auto__.call(null,state_10804);if(cljs.core.keyword_identical_QMARK_.call(null,result__6812__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6812__auto__;
}
break;
}
}catch (e10811){if((e10811 instanceof Object))
{var ex__6813__auto__ = e10811;var statearr_10812_10815 = state_10804;(statearr_10812_10815[5] = ex__6813__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10804);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10811;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6811__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__10816 = state_10804;
state_10804 = G__10816;
continue;
}
} else
{return ret_value__6811__auto__;
}
break;
}
});
state_machine__6810__auto__ = function(state_10804){
switch(arguments.length){
case 0:
return state_machine__6810__auto____0.call(this);
case 1:
return state_machine__6810__auto____1.call(this,state_10804);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6810__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6810__auto____0;
state_machine__6810__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6810__auto____1;
return state_machine__6810__auto__;
})()
;})(switch__6809__auto__,c__6921__auto___10814,channel))
})();var state__6923__auto__ = (function (){var statearr_10813 = f__6922__auto__.call(null);(statearr_10813[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6921__auto___10814);
return statearr_10813;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6923__auto__);
});})(c__6921__auto___10814,channel))
);
return channel;
});
});
/**
* @param {...*} var_args
*/
cljs_http.client.wrap_accept = (function() { 
var wrap_accept__delegate = function (client,p__10817){var vec__10819 = p__10817;var accept = cljs.core.nth.call(null,vec__10819,0,null);return ((function (vec__10819,accept){
return (function (request){var temp__4124__auto__ = (function (){var or__3541__auto__ = new cljs.core.Keyword(null,"accept","accept",3885410426).cljs$core$IFn$_invoke$arity$1(request);if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return accept;
}
})();if(cljs.core.truth_(temp__4124__auto__))
{var accept__$1 = temp__4124__auto__;return client.call(null,cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",1809212152),"accept"], null),accept__$1));
} else
{return client.call(null,request);
}
});
;})(vec__10819,accept))
};
var wrap_accept = function (client,var_args){
var p__10817 = null;if (arguments.length > 1) {
  p__10817 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return wrap_accept__delegate.call(this,client,p__10817);};
wrap_accept.cljs$lang$maxFixedArity = 1;
wrap_accept.cljs$lang$applyTo = (function (arglist__10820){
var client = cljs.core.first(arglist__10820);
var p__10817 = cljs.core.rest(arglist__10820);
return wrap_accept__delegate(client,p__10817);
});
wrap_accept.cljs$core$IFn$_invoke$arity$variadic = wrap_accept__delegate;
return wrap_accept;
})()
;
/**
* @param {...*} var_args
*/
cljs_http.client.wrap_content_type = (function() { 
var wrap_content_type__delegate = function (client,p__10821){var vec__10823 = p__10821;var content_type = cljs.core.nth.call(null,vec__10823,0,null);return ((function (vec__10823,content_type){
return (function (request){var temp__4124__auto__ = (function (){var or__3541__auto__ = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(request);if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return content_type;
}
})();if(cljs.core.truth_(temp__4124__auto__))
{var content_type__$1 = temp__4124__auto__;return client.call(null,cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",1809212152),"content-type"], null),content_type__$1));
} else
{return client.call(null,request);
}
});
;})(vec__10823,content_type))
};
var wrap_content_type = function (client,var_args){
var p__10821 = null;if (arguments.length > 1) {
  p__10821 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return wrap_content_type__delegate.call(this,client,p__10821);};
wrap_content_type.cljs$lang$maxFixedArity = 1;
wrap_content_type.cljs$lang$applyTo = (function (arglist__10824){
var client = cljs.core.first(arglist__10824);
var p__10821 = cljs.core.rest(arglist__10824);
return wrap_content_type__delegate(client,p__10821);
});
wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = wrap_content_type__delegate;
return wrap_content_type;
})()
;
/**
* Encode :json-params in the `request` :body and set the appropriate
* Content Type header.
*/
cljs_http.client.wrap_json_params = (function wrap_json_params(client){return (function (request){var temp__4124__auto__ = new cljs.core.Keyword(null,"json-params","json-params",2645529981).cljs$core$IFn$_invoke$arity$1(request);if(cljs.core.truth_(temp__4124__auto__))
{var params = temp__4124__auto__;return client.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"json-params","json-params",2645529981)),new cljs.core.Keyword(null,"body","body",1016933652),cljs_http.util.json_encode.call(null,params)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",1809212152),"content-type"], null),"application/json"));
} else
{return client.call(null,request);
}
});
});
/**
* Decode application/json responses.
*/
cljs_http.client.wrap_json_response = (function wrap_json_response(client){return (function (request){var channel = cljs.core.async.chan.call(null);var c__6921__auto___10859 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,((function (c__6921__auto___10859,channel){
return (function (){var f__6922__auto__ = (function (){var switch__6809__auto__ = ((function (c__6921__auto___10859,channel){
return (function (state_10849){var state_val_10850 = (state_10849[1]);if((state_val_10850 === 2))
{var inst_10844 = (state_10849[2]);var inst_10845 = cljs_http.client.decode_body.call(null,inst_10844,cljs_http.util.json_decode,"application/json");var inst_10846 = cljs.core.async.put_BANG_.call(null,channel,inst_10845);var inst_10847 = cljs.core.async.close_BANG_.call(null,channel);var state_10849__$1 = (function (){var statearr_10851 = state_10849;(statearr_10851[7] = inst_10846);
return statearr_10851;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10849__$1,inst_10847);
} else
{if((state_val_10850 === 1))
{var inst_10842 = client.call(null,request);var state_10849__$1 = state_10849;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10849__$1,2,inst_10842);
} else
{return null;
}
}
});})(c__6921__auto___10859,channel))
;return ((function (switch__6809__auto__,c__6921__auto___10859,channel){
return (function() {
var state_machine__6810__auto__ = null;
var state_machine__6810__auto____0 = (function (){var statearr_10855 = [null,null,null,null,null,null,null,null];(statearr_10855[0] = state_machine__6810__auto__);
(statearr_10855[1] = 1);
return statearr_10855;
});
var state_machine__6810__auto____1 = (function (state_10849){while(true){
var ret_value__6811__auto__ = (function (){try{while(true){
var result__6812__auto__ = switch__6809__auto__.call(null,state_10849);if(cljs.core.keyword_identical_QMARK_.call(null,result__6812__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6812__auto__;
}
break;
}
}catch (e10856){if((e10856 instanceof Object))
{var ex__6813__auto__ = e10856;var statearr_10857_10860 = state_10849;(statearr_10857_10860[5] = ex__6813__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10849);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10856;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6811__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__10861 = state_10849;
state_10849 = G__10861;
continue;
}
} else
{return ret_value__6811__auto__;
}
break;
}
});
state_machine__6810__auto__ = function(state_10849){
switch(arguments.length){
case 0:
return state_machine__6810__auto____0.call(this);
case 1:
return state_machine__6810__auto____1.call(this,state_10849);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6810__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6810__auto____0;
state_machine__6810__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6810__auto____1;
return state_machine__6810__auto__;
})()
;})(switch__6809__auto__,c__6921__auto___10859,channel))
})();var state__6923__auto__ = (function (){var statearr_10858 = f__6922__auto__.call(null);(statearr_10858[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6921__auto___10859);
return statearr_10858;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6923__auto__);
});})(c__6921__auto___10859,channel))
);
return channel;
});
});
cljs_http.client.wrap_query_params = (function wrap_query_params(client){return (function (p__10864){var map__10865 = p__10864;var map__10865__$1 = ((cljs.core.seq_QMARK_.call(null,map__10865))?cljs.core.apply.call(null,cljs.core.hash_map,map__10865):map__10865);var req = map__10865__$1;var query_params = cljs.core.get.call(null,map__10865__$1,new cljs.core.Keyword(null,"query-params","query-params",1080249757));if(cljs.core.truth_(query_params))
{return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"query-params","query-params",1080249757)),new cljs.core.Keyword(null,"query-string","query-string",1183691816),cljs_http.client.generate_query_string.call(null,query_params)));
} else
{return client.call(null,req);
}
});
});
cljs_http.client.wrap_android_cors_bugfix = (function wrap_android_cors_bugfix(client){return (function (request){return client.call(null,(cljs.core.truth_(cljs_http.util.android_QMARK_.call(null))?cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"query-params","query-params",1080249757),new cljs.core.Keyword(null,"android","android",4447480289)], null),Math.random.call(null)):request));
});
});
cljs_http.client.wrap_method = (function wrap_method(client){return (function (req){var temp__4124__auto__ = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(req);if(cljs.core.truth_(temp__4124__auto__))
{var m = temp__4124__auto__;return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"method","method",4231316563)),new cljs.core.Keyword(null,"request-method","request-method",1993477457),m));
} else
{return client.call(null,req);
}
});
});
cljs_http.client.wrap_server_name = (function wrap_server_name(client,server_name){return (function (p1__10866_SHARP_){return client.call(null,cljs.core.assoc.call(null,p1__10866_SHARP_,new cljs.core.Keyword(null,"server-name","server-name",4503925319),server_name));
});
});
cljs_http.client.wrap_url = (function wrap_url(client){return (function (p__10870){var map__10871 = p__10870;var map__10871__$1 = ((cljs.core.seq_QMARK_.call(null,map__10871))?cljs.core.apply.call(null,cljs.core.hash_map,map__10871):map__10871);var req = map__10871__$1;var query_params = cljs.core.get.call(null,map__10871__$1,new cljs.core.Keyword(null,"query-params","query-params",1080249757));var temp__4124__auto__ = cljs_http.client.parse_url.call(null,new cljs.core.Keyword(null,"url","url",1014020321).cljs$core$IFn$_invoke$arity$1(req));if(cljs.core.truth_(temp__4124__auto__))
{var spec = temp__4124__auto__;return client.call(null,cljs.core.update_in.call(null,cljs.core.dissoc.call(null,cljs.core.merge.call(null,req,spec),new cljs.core.Keyword(null,"url","url",1014020321)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"query-params","query-params",1080249757)], null),((function (spec,temp__4124__auto__,map__10871,map__10871__$1,req,query_params){
return (function (p1__10867_SHARP_){return cljs.core.merge.call(null,p1__10867_SHARP_,query_params);
});})(spec,temp__4124__auto__,map__10871,map__10871__$1,req,query_params))
));
} else
{return client.call(null,req);
}
});
});
/**
* Middleware converting the :basic-auth option or `credentials` into
* an Authorization header.
* @param {...*} var_args
*/
cljs_http.client.wrap_basic_auth = (function() { 
var wrap_basic_auth__delegate = function (client,p__10872){var vec__10874 = p__10872;var credentials = cljs.core.nth.call(null,vec__10874,0,null);return ((function (vec__10874,credentials){
return (function (req){var credentials__$1 = (function (){var or__3541__auto__ = new cljs.core.Keyword(null,"basic-auth","basic-auth",4138175321).cljs$core$IFn$_invoke$arity$1(req);if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return credentials;
}
})();if(!(cljs.core.empty_QMARK_.call(null,credentials__$1)))
{return client.call(null,cljs.core.assoc_in.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"basic-auth","basic-auth",4138175321)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",1809212152),"authorization"], null),cljs_http.util.basic_auth.call(null,credentials__$1)));
} else
{return client.call(null,req);
}
});
;})(vec__10874,credentials))
};
var wrap_basic_auth = function (client,var_args){
var p__10872 = null;if (arguments.length > 1) {
  p__10872 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return wrap_basic_auth__delegate.call(this,client,p__10872);};
wrap_basic_auth.cljs$lang$maxFixedArity = 1;
wrap_basic_auth.cljs$lang$applyTo = (function (arglist__10875){
var client = cljs.core.first(arglist__10875);
var p__10872 = cljs.core.rest(arglist__10875);
return wrap_basic_auth__delegate(client,p__10872);
});
wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = wrap_basic_auth__delegate;
return wrap_basic_auth;
})()
;
/**
* Middleware converting the :oauth-token option into an Authorization header.
*/
cljs_http.client.wrap_oauth = (function wrap_oauth(client){return (function (req){var temp__4124__auto__ = new cljs.core.Keyword(null,"oauth-token","oauth-token",4322509493).cljs$core$IFn$_invoke$arity$1(req);if(cljs.core.truth_(temp__4124__auto__))
{var oauth_token = temp__4124__auto__;return client.call(null,cljs.core.assoc_in.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"oauth-token","oauth-token",4322509493)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",1809212152),"authorization"], null),("Bearer "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(oauth_token))));
} else
{return client.call(null,req);
}
});
});
/**
* Returns a battaries-included HTTP request function coresponding to the given
* core client. See client/client.
*/
cljs_http.client.wrap_request = (function wrap_request(request){return cljs_http.client.wrap_url.call(null,cljs_http.client.wrap_method.call(null,cljs_http.client.wrap_android_cors_bugfix.call(null,cljs_http.client.wrap_oauth.call(null,cljs_http.client.wrap_basic_auth.call(null,cljs_http.client.wrap_query_params.call(null,cljs_http.client.wrap_json_response.call(null,cljs_http.client.wrap_json_params.call(null,cljs_http.client.wrap_edn_response.call(null,cljs_http.client.wrap_edn_params.call(null,cljs_http.client.wrap_content_type.call(null,cljs_http.client.wrap_accept.call(null,request))))))))))));
});
/**
* Executes the HTTP request corresponding to the given map and returns the
* response map for corresponding to the resulting HTTP response.
* 
* In addition to the standard Ring request keys, the following keys are also
* recognized:
* * :url
* * :method
* * :query-params
*/
cljs_http.client.request = cljs_http.client.wrap_request.call(null,cljs_http.core.request);
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.delete$ = (function() { 
var delete$__delegate = function (url,p__10876){var vec__10878 = p__10876;var req = cljs.core.nth.call(null,vec__10878,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var delete$ = function (url,var_args){
var p__10876 = null;if (arguments.length > 1) {
  p__10876 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return delete$__delegate.call(this,url,p__10876);};
delete$.cljs$lang$maxFixedArity = 1;
delete$.cljs$lang$applyTo = (function (arglist__10879){
var url = cljs.core.first(arglist__10879);
var p__10876 = cljs.core.rest(arglist__10879);
return delete$__delegate(url,p__10876);
});
delete$.cljs$core$IFn$_invoke$arity$variadic = delete$__delegate;
return delete$;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.get = (function() { 
var get__delegate = function (url,p__10880){var vec__10882 = p__10880;var req = cljs.core.nth.call(null,vec__10882,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var get = function (url,var_args){
var p__10880 = null;if (arguments.length > 1) {
  p__10880 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return get__delegate.call(this,url,p__10880);};
get.cljs$lang$maxFixedArity = 1;
get.cljs$lang$applyTo = (function (arglist__10883){
var url = cljs.core.first(arglist__10883);
var p__10880 = cljs.core.rest(arglist__10883);
return get__delegate(url,p__10880);
});
get.cljs$core$IFn$_invoke$arity$variadic = get__delegate;
return get;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.head = (function() { 
var head__delegate = function (url,p__10884){var vec__10886 = p__10884;var req = cljs.core.nth.call(null,vec__10886,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"head","head",1017102674),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var head = function (url,var_args){
var p__10884 = null;if (arguments.length > 1) {
  p__10884 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return head__delegate.call(this,url,p__10884);};
head.cljs$lang$maxFixedArity = 1;
head.cljs$lang$applyTo = (function (arglist__10887){
var url = cljs.core.first(arglist__10887);
var p__10884 = cljs.core.rest(arglist__10887);
return head__delegate(url,p__10884);
});
head.cljs$core$IFn$_invoke$arity$variadic = head__delegate;
return head;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.move = (function() { 
var move__delegate = function (url,p__10888){var vec__10890 = p__10888;var req = cljs.core.nth.call(null,vec__10890,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var move = function (url,var_args){
var p__10888 = null;if (arguments.length > 1) {
  p__10888 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return move__delegate.call(this,url,p__10888);};
move.cljs$lang$maxFixedArity = 1;
move.cljs$lang$applyTo = (function (arglist__10891){
var url = cljs.core.first(arglist__10891);
var p__10888 = cljs.core.rest(arglist__10891);
return move__delegate(url,p__10888);
});
move.cljs$core$IFn$_invoke$arity$variadic = move__delegate;
return move;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.options = (function() { 
var options__delegate = function (url,p__10892){var vec__10894 = p__10892;var req = cljs.core.nth.call(null,vec__10894,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"options","options",4059396624),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var options = function (url,var_args){
var p__10892 = null;if (arguments.length > 1) {
  p__10892 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return options__delegate.call(this,url,p__10892);};
options.cljs$lang$maxFixedArity = 1;
options.cljs$lang$applyTo = (function (arglist__10895){
var url = cljs.core.first(arglist__10895);
var p__10892 = cljs.core.rest(arglist__10895);
return options__delegate(url,p__10892);
});
options.cljs$core$IFn$_invoke$arity$variadic = options__delegate;
return options;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.patch = (function() { 
var patch__delegate = function (url,p__10896){var vec__10898 = p__10896;var req = cljs.core.nth.call(null,vec__10898,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"patch","patch",1120342970),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var patch = function (url,var_args){
var p__10896 = null;if (arguments.length > 1) {
  p__10896 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return patch__delegate.call(this,url,p__10896);};
patch.cljs$lang$maxFixedArity = 1;
patch.cljs$lang$applyTo = (function (arglist__10899){
var url = cljs.core.first(arglist__10899);
var p__10896 = cljs.core.rest(arglist__10899);
return patch__delegate(url,p__10896);
});
patch.cljs$core$IFn$_invoke$arity$variadic = patch__delegate;
return patch;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.post = (function() { 
var post__delegate = function (url,p__10900){var vec__10902 = p__10900;var req = cljs.core.nth.call(null,vec__10902,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"post","post",1017351186),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var post = function (url,var_args){
var p__10900 = null;if (arguments.length > 1) {
  p__10900 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return post__delegate.call(this,url,p__10900);};
post.cljs$lang$maxFixedArity = 1;
post.cljs$lang$applyTo = (function (arglist__10903){
var url = cljs.core.first(arglist__10903);
var p__10900 = cljs.core.rest(arglist__10903);
return post__delegate(url,p__10900);
});
post.cljs$core$IFn$_invoke$arity$variadic = post__delegate;
return post;
})()
;
/**
* Like #'request, but sets the :method and :url as appropriate.
* @param {...*} var_args
*/
cljs_http.client.put = (function() { 
var put__delegate = function (url,p__10904){var vec__10906 = p__10904;var req = cljs.core.nth.call(null,vec__10906,0,null);return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617),new cljs.core.Keyword(null,"url","url",1014020321),url], null)));
};
var put = function (url,var_args){
var p__10904 = null;if (arguments.length > 1) {
  p__10904 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return put__delegate.call(this,url,p__10904);};
put.cljs$lang$maxFixedArity = 1;
put.cljs$lang$applyTo = (function (arglist__10907){
var url = cljs.core.first(arglist__10907);
var p__10904 = cljs.core.rest(arglist__10907);
return put__delegate(url,p__10904);
});
put.cljs$core$IFn$_invoke$arity$variadic = put__delegate;
return put;
})()
;

//# sourceMappingURL=client.js.map