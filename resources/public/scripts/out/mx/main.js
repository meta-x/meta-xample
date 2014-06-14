// Compiled by ClojureScript 0.0-2227
goog.provide('mx.main');
goog.require('cljs.core');
goog.require('secretary.core');
goog.require('om.dom');
goog.require('goog.History.EventType');
goog.require('om.dom');
goog.require('goog.History');
goog.require('goog.events');
goog.require('om.core');
goog.require('om.core');
goog.require('secretary.core');
goog.require('goog.events');
mx.main.history = (new goog.History());
mx.main.navigation_state = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"Sign",new cljs.core.Keyword(null,"path","path",1017337751),"/sign"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"Notes",new cljs.core.Keyword(null,"path","path",1017337751),"/notes"], null)], null));
var action__5166__auto___11035 = (function (params__5167__auto__){if(cljs.core.map_QMARK_.call(null,params__5167__auto__))
{var map__11033 = params__5167__auto__;var map__11033__$1 = ((cljs.core.seq_QMARK_.call(null,map__11033))?cljs.core.apply.call(null,cljs.core.hash_map,map__11033):map__11033);return console.log("in sign-in/up");
} else
{if(cljs.core.vector_QMARK_.call(null,params__5167__auto__))
{var vec__11034 = params__5167__auto__;return console.log("in sign-in/up");
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/sign",action__5166__auto___11035);
var action__5166__auto___11038 = (function (params__5167__auto__){if(cljs.core.map_QMARK_.call(null,params__5167__auto__))
{var map__11036 = params__5167__auto__;var map__11036__$1 = ((cljs.core.seq_QMARK_.call(null,map__11036))?cljs.core.apply.call(null,cljs.core.hash_map,map__11036):map__11036);return console.log("in notes");
} else
{if(cljs.core.vector_QMARK_.call(null,params__5167__auto__))
{var vec__11037 = params__5167__auto__;return console.log("in notes");
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/notes",action__5166__auto___11038);
mx.main.refresh_navigation = (function refresh_navigation(){var token = mx.main.history.getToken();var set_active = ((function (token){
return (function (p1__11039_SHARP_){return cljs.core.assoc.call(null,p1__11039_SHARP_,new cljs.core.Keyword(null,"active","active",3885920888),cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(p1__11039_SHARP_),token));
});})(token))
;return cljs.core.swap_BANG_.call(null,mx.main.navigation_state,((function (token,set_active){
return (function (p1__11040_SHARP_){return cljs.core.map.call(null,set_active,p1__11040_SHARP_);
});})(token,set_active))
);
});
mx.main.on_navigate = (function on_navigate(event){mx.main.refresh_navigation.call(null);
return secretary.core.dispatch_BANG_.call(null,event.token);
});
var G__11041_11042 = mx.main.history;goog.events.listen(G__11041_11042,goog.History.EventType.NAVIGATE,mx.main.on_navigate);
G__11041_11042.setEnabled(true);
mx.main.navigation_item_view = (function navigation_item_view(p__11043,owner){var map__11048 = p__11043;var map__11048__$1 = ((cljs.core.seq_QMARK_.call(null,map__11048))?cljs.core.apply.call(null,cljs.core.hash_map,map__11048):map__11048);var name = cljs.core.get.call(null,map__11048__$1,new cljs.core.Keyword(null,"name","name",1017277949));var path = cljs.core.get.call(null,map__11048__$1,new cljs.core.Keyword(null,"path","path",1017337751));var active = cljs.core.get.call(null,map__11048__$1,new cljs.core.Keyword(null,"active","active",3885920888));if(typeof mx.main.t11049 !== 'undefined')
{} else
{
/**
* @constructor
*/
mx.main.t11049 = (function (active,path,name,map__11048,owner,p__11043,navigation_item_view,meta11050){
this.active = active;
this.path = path;
this.name = name;
this.map__11048 = map__11048;
this.owner = owner;
this.p__11043 = p__11043;
this.navigation_item_view = navigation_item_view;
this.meta11050 = meta11050;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
mx.main.t11049.cljs$lang$type = true;
mx.main.t11049.cljs$lang$ctorStr = "mx.main/t11049";
mx.main.t11049.cljs$lang$ctorPrWriter = ((function (map__11048,map__11048__$1,name,path,active){
return (function (this__4122__auto__,writer__4123__auto__,opt__4124__auto__){return cljs.core._write.call(null,writer__4123__auto__,"mx.main/t11049");
});})(map__11048,map__11048__$1,name,path,active))
;
mx.main.t11049.prototype.om$core$IRender$ = true;
mx.main.t11049.prototype.om$core$IRender$render$arity$1 = ((function (map__11048,map__11048__$1,name,path,active){
return (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,React.DOM.a({"href": ("#"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.path))},("["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.active)+"] "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.name))));
});})(map__11048,map__11048__$1,name,path,active))
;
mx.main.t11049.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__11048,map__11048__$1,name,path,active){
return (function (_11051){var self__ = this;
var _11051__$1 = this;return self__.meta11050;
});})(map__11048,map__11048__$1,name,path,active))
;
mx.main.t11049.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__11048,map__11048__$1,name,path,active){
return (function (_11051,meta11050__$1){var self__ = this;
var _11051__$1 = this;return (new mx.main.t11049(self__.active,self__.path,self__.name,self__.map__11048,self__.owner,self__.p__11043,self__.navigation_item_view,meta11050__$1));
});})(map__11048,map__11048__$1,name,path,active))
;
mx.main.__GT_t11049 = ((function (map__11048,map__11048__$1,name,path,active){
return (function __GT_t11049(active__$1,path__$1,name__$1,map__11048__$2,owner__$1,p__11043__$1,navigation_item_view__$1,meta11050){return (new mx.main.t11049(active__$1,path__$1,name__$1,map__11048__$2,owner__$1,p__11043__$1,navigation_item_view__$1,meta11050));
});})(map__11048,map__11048__$1,name,path,active))
;
}
return (new mx.main.t11049(active,path,name,map__11048__$1,owner,p__11043,navigation_item_view,null));
});
mx.main.navigation_view = (function navigation_view(app,owner){if(typeof mx.main.t11055 !== 'undefined')
{} else
{
/**
* @constructor
*/
mx.main.t11055 = (function (owner,app,navigation_view,meta11056){
this.owner = owner;
this.app = app;
this.navigation_view = navigation_view;
this.meta11056 = meta11056;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
mx.main.t11055.cljs$lang$type = true;
mx.main.t11055.cljs$lang$ctorStr = "mx.main/t11055";
mx.main.t11055.cljs$lang$ctorPrWriter = (function (this__4122__auto__,writer__4123__auto__,opt__4124__auto__){return cljs.core._write.call(null,writer__4123__auto__,"mx.main/t11055");
});
mx.main.t11055.prototype.om$core$IRender$ = true;
mx.main.t11055.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,mx.main.navigation_item_view,self__.app));
});
mx.main.t11055.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11057){var self__ = this;
var _11057__$1 = this;return self__.meta11056;
});
mx.main.t11055.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11057,meta11056__$1){var self__ = this;
var _11057__$1 = this;return (new mx.main.t11055(self__.owner,self__.app,self__.navigation_view,meta11056__$1));
});
mx.main.__GT_t11055 = (function __GT_t11055(owner__$1,app__$1,navigation_view__$1,meta11056){return (new mx.main.t11055(owner__$1,app__$1,navigation_view__$1,meta11056));
});
}
return (new mx.main.t11055(owner,app,navigation_view,null));
});
om.core.root.call(null,mx.main.navigation_view,mx.main.navigation_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("navigation")], null));

//# sourceMappingURL=main.js.map