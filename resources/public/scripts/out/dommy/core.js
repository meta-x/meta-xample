// Compiled by ClojureScript 0.0-2227
goog.provide('dommy.core');
goog.require('cljs.core');
goog.require('dommy.template');
goog.require('dommy.template');
goog.require('dommy.attrs');
goog.require('dommy.attrs');
goog.require('dommy.utils');
goog.require('dommy.utils');
goog.require('clojure.string');
goog.require('clojure.string');
dommy.core.has_class_QMARK_ = dommy.attrs.has_class_QMARK_;
dommy.core.add_class_BANG_ = dommy.attrs.add_class_BANG_;
dommy.core.remove_class_BANG_ = dommy.attrs.remove_class_BANG_;
dommy.core.toggle_class_BANG_ = dommy.attrs.toggle_class_BANG_;
dommy.core.set_attr_BANG_ = dommy.attrs.set_attr_BANG_;
dommy.core.set_style_BANG_ = dommy.attrs.set_style_BANG_;
dommy.core.set_px_BANG_ = dommy.attrs.set_px_BANG_;
dommy.core.px = dommy.attrs.px;
dommy.core.style_str = dommy.attrs.style_str;
dommy.core.style = dommy.attrs.style;
dommy.core.remove_attr_BANG_ = dommy.attrs.remove_attr_BANG_;
dommy.core.toggle_attr_BANG_ = dommy.attrs.toggle_attr_BANG_;
dommy.core.attr = dommy.attrs.attr;
dommy.core.hidden_QMARK_ = dommy.attrs.hidden_QMARK_;
dommy.core.toggle_BANG_ = dommy.attrs.toggle_BANG_;
dommy.core.hide_BANG_ = dommy.attrs.hide_BANG_;
dommy.core.show_BANG_ = dommy.attrs.show_BANG_;
dommy.core.bounding_client_rect = dommy.attrs.bounding_client_rect;
dommy.core.scroll_into_view = dommy.attrs.scroll_into_view;
dommy.core.dissoc_in = dommy.utils.dissoc_in;
dommy.core.__GT_Array = dommy.utils.__GT_Array;
dommy.core.set_html_BANG_ = (function set_html_BANG_(elem,html){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);elem__$1.innerHTML = html;
return elem__$1;
});
dommy.core.html = (function html(elem){return dommy.template.__GT_node_like.call(null,elem).innerHTML;
});
dommy.core.set_text_BANG_ = (function set_text_BANG_(elem,text){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var prop = (cljs.core.truth_(elem__$1.textContent)?"textContent":"innerText");(elem__$1[prop] = text);
return elem__$1;
});
dommy.core.text = (function text(elem){var or__3541__auto__ = elem.textContent;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return elem.innerText;
}
});
dommy.core.value = (function value(elem){return dommy.template.__GT_node_like.call(null,elem).value;
});
dommy.core.set_value_BANG_ = (function set_value_BANG_(elem,value){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);elem__$1.value = value;
return elem__$1;
});
/**
* append `child` to `parent`. 'parent' and 'child' should be node-like
* (work with dommy.template/->node-like). The node-like projection
* of parent is returned after appending child.
* @param {...*} var_args
*/
dommy.core.append_BANG_ = (function() {
var append_BANG_ = null;
var append_BANG___2 = (function (parent,child){var G__11228 = dommy.template.__GT_node_like.call(null,parent);G__11228.appendChild(dommy.template.__GT_node_like.call(null,child));
return G__11228;
});
var append_BANG___3 = (function() { 
var G__11233__delegate = function (parent,child,more_children){var parent__$1 = dommy.template.__GT_node_like.call(null,parent);var seq__11229_11234 = cljs.core.seq.call(null,cljs.core.cons.call(null,child,more_children));var chunk__11230_11235 = null;var count__11231_11236 = 0;var i__11232_11237 = 0;while(true){
if((i__11232_11237 < count__11231_11236))
{var c_11238 = cljs.core._nth.call(null,chunk__11230_11235,i__11232_11237);append_BANG_.call(null,parent__$1,c_11238);
{
var G__11239 = seq__11229_11234;
var G__11240 = chunk__11230_11235;
var G__11241 = count__11231_11236;
var G__11242 = (i__11232_11237 + 1);
seq__11229_11234 = G__11239;
chunk__11230_11235 = G__11240;
count__11231_11236 = G__11241;
i__11232_11237 = G__11242;
continue;
}
} else
{var temp__4126__auto___11243 = cljs.core.seq.call(null,seq__11229_11234);if(temp__4126__auto___11243)
{var seq__11229_11244__$1 = temp__4126__auto___11243;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11229_11244__$1))
{var c__4297__auto___11245 = cljs.core.chunk_first.call(null,seq__11229_11244__$1);{
var G__11246 = cljs.core.chunk_rest.call(null,seq__11229_11244__$1);
var G__11247 = c__4297__auto___11245;
var G__11248 = cljs.core.count.call(null,c__4297__auto___11245);
var G__11249 = 0;
seq__11229_11234 = G__11246;
chunk__11230_11235 = G__11247;
count__11231_11236 = G__11248;
i__11232_11237 = G__11249;
continue;
}
} else
{var c_11250 = cljs.core.first.call(null,seq__11229_11244__$1);append_BANG_.call(null,parent__$1,c_11250);
{
var G__11251 = cljs.core.next.call(null,seq__11229_11244__$1);
var G__11252 = null;
var G__11253 = 0;
var G__11254 = 0;
seq__11229_11234 = G__11251;
chunk__11230_11235 = G__11252;
count__11231_11236 = G__11253;
i__11232_11237 = G__11254;
continue;
}
}
} else
{}
}
break;
}
return parent__$1;
};
var G__11233 = function (parent,child,var_args){
var more_children = null;if (arguments.length > 2) {
  more_children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__11233__delegate.call(this,parent,child,more_children);};
G__11233.cljs$lang$maxFixedArity = 2;
G__11233.cljs$lang$applyTo = (function (arglist__11255){
var parent = cljs.core.first(arglist__11255);
arglist__11255 = cljs.core.next(arglist__11255);
var child = cljs.core.first(arglist__11255);
var more_children = cljs.core.rest(arglist__11255);
return G__11233__delegate(parent,child,more_children);
});
G__11233.cljs$core$IFn$_invoke$arity$variadic = G__11233__delegate;
return G__11233;
})()
;
append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return append_BANG___2.call(this,parent,child);
default:
return append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
append_BANG_.cljs$lang$maxFixedArity = 2;
append_BANG_.cljs$lang$applyTo = append_BANG___3.cljs$lang$applyTo;
append_BANG_.cljs$core$IFn$_invoke$arity$2 = append_BANG___2;
append_BANG_.cljs$core$IFn$_invoke$arity$variadic = append_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return append_BANG_;
})()
;
/**
* prepend `child` to `parent`, both node-like
* return ->node-like projection of `parent`
* @param {...*} var_args
*/
dommy.core.prepend_BANG_ = (function() {
var prepend_BANG_ = null;
var prepend_BANG___2 = (function (parent,child){var parent__$1 = dommy.template.__GT_node_like.call(null,parent);return parent__$1.insertBefore(dommy.template.__GT_node_like.call(null,child),parent__$1.firstChild);
});
var prepend_BANG___3 = (function() { 
var G__11264__delegate = function (parent,child,more_children){var parent__$1 = dommy.template.__GT_node_like.call(null,parent);var seq__11260_11265 = cljs.core.seq.call(null,cljs.core.cons.call(null,child,more_children));var chunk__11261_11266 = null;var count__11262_11267 = 0;var i__11263_11268 = 0;while(true){
if((i__11263_11268 < count__11262_11267))
{var c_11269 = cljs.core._nth.call(null,chunk__11261_11266,i__11263_11268);prepend_BANG_.call(null,parent__$1,c_11269);
{
var G__11270 = seq__11260_11265;
var G__11271 = chunk__11261_11266;
var G__11272 = count__11262_11267;
var G__11273 = (i__11263_11268 + 1);
seq__11260_11265 = G__11270;
chunk__11261_11266 = G__11271;
count__11262_11267 = G__11272;
i__11263_11268 = G__11273;
continue;
}
} else
{var temp__4126__auto___11274 = cljs.core.seq.call(null,seq__11260_11265);if(temp__4126__auto___11274)
{var seq__11260_11275__$1 = temp__4126__auto___11274;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11260_11275__$1))
{var c__4297__auto___11276 = cljs.core.chunk_first.call(null,seq__11260_11275__$1);{
var G__11277 = cljs.core.chunk_rest.call(null,seq__11260_11275__$1);
var G__11278 = c__4297__auto___11276;
var G__11279 = cljs.core.count.call(null,c__4297__auto___11276);
var G__11280 = 0;
seq__11260_11265 = G__11277;
chunk__11261_11266 = G__11278;
count__11262_11267 = G__11279;
i__11263_11268 = G__11280;
continue;
}
} else
{var c_11281 = cljs.core.first.call(null,seq__11260_11275__$1);prepend_BANG_.call(null,parent__$1,c_11281);
{
var G__11282 = cljs.core.next.call(null,seq__11260_11275__$1);
var G__11283 = null;
var G__11284 = 0;
var G__11285 = 0;
seq__11260_11265 = G__11282;
chunk__11261_11266 = G__11283;
count__11262_11267 = G__11284;
i__11263_11268 = G__11285;
continue;
}
}
} else
{}
}
break;
}
return parent__$1;
};
var G__11264 = function (parent,child,var_args){
var more_children = null;if (arguments.length > 2) {
  more_children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__11264__delegate.call(this,parent,child,more_children);};
G__11264.cljs$lang$maxFixedArity = 2;
G__11264.cljs$lang$applyTo = (function (arglist__11286){
var parent = cljs.core.first(arglist__11286);
arglist__11286 = cljs.core.next(arglist__11286);
var child = cljs.core.first(arglist__11286);
var more_children = cljs.core.rest(arglist__11286);
return G__11264__delegate(parent,child,more_children);
});
G__11264.cljs$core$IFn$_invoke$arity$variadic = G__11264__delegate;
return G__11264;
})()
;
prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return prepend_BANG___2.call(this,parent,child);
default:
return prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
prepend_BANG_.cljs$lang$maxFixedArity = 2;
prepend_BANG_.cljs$lang$applyTo = prepend_BANG___3.cljs$lang$applyTo;
prepend_BANG_.cljs$core$IFn$_invoke$arity$2 = prepend_BANG___2;
prepend_BANG_.cljs$core$IFn$_invoke$arity$variadic = prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return prepend_BANG_;
})()
;
/**
* insert `node` before `other`, both node-like,
* `other` must have a parent. return `node`
*/
dommy.core.insert_before_BANG_ = (function insert_before_BANG_(elem,other){var actual_node = dommy.template.__GT_node_like.call(null,elem);var other__$1 = dommy.template.__GT_node_like.call(null,other);if(cljs.core.truth_(other__$1.parentNode))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,".-parentNode",".-parentNode",499016324,null),new cljs.core.Symbol(null,"other","other",-1534461751,null)))))));
}
other__$1.parentNode.insertBefore(actual_node,other__$1);
return actual_node;
});
/**
* insert `node` after `other`, both node-like,
* `other` must have a parent. return `node`
*/
dommy.core.insert_after_BANG_ = (function insert_after_BANG_(elem,other){var actual_node = dommy.template.__GT_node_like.call(null,elem);var other__$1 = dommy.template.__GT_node_like.call(null,other);var parent = other__$1.parentNode;var temp__4124__auto___11287 = other__$1.nextSibling;if(cljs.core.truth_(temp__4124__auto___11287))
{var next_11288 = temp__4124__auto___11287;parent.insertBefore(actual_node,next_11288);
} else
{parent.appendChild(actual_node);
}
return actual_node;
});
/**
* replace `elem` with `new`, both node-like, return node-like projection of new.
* node-like projection of elem must have parent.
*/
dommy.core.replace_BANG_ = (function replace_BANG_(elem,new$){var new$__$1 = dommy.template.__GT_node_like.call(null,new$);var elem__$1 = dommy.template.__GT_node_like.call(null,elem);if(cljs.core.truth_(elem__$1.parentNode))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,".-parentNode",".-parentNode",499016324,null),new cljs.core.Symbol(null,"elem","elem",-1637415608,null)))))));
}
elem__$1.parentNode.replaceChild(new$__$1,elem__$1);
return new$__$1;
});
dommy.core.replace_contents_BANG_ = (function replace_contents_BANG_(parent,node_like){var G__11290 = dommy.template.__GT_node_like.call(null,parent);G__11290.innerHTML = "";
dommy.core.append_BANG_.call(null,G__11290,node_like);
return G__11290;
});
/**
* remove node-like `elem` from parent, return node-like projection of elem
*/
dommy.core.remove_BANG_ = (function remove_BANG_(elem){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var G__11292 = elem__$1.parentNode;G__11292.removeChild(elem__$1);
return G__11292;
});
/**
* clears all children from `elem`
*/
dommy.core.clear_BANG_ = (function clear_BANG_(elem){return dommy.template.__GT_node_like.call(null,elem).innerHTML = "";
});
dommy.core.selector = (function selector(data){if(cljs.core.coll_QMARK_.call(null,data))
{return clojure.string.join.call(null," ",cljs.core.map.call(null,selector,data));
} else
{if((typeof data === 'string') || ((data instanceof cljs.core.Keyword)))
{return cljs.core.name.call(null,data);
} else
{return null;
}
}
});
dommy.core.selector_map = (function selector_map(template,key_selectors_map){var container = dommy.template.__GT_node_like.call(null,template);if(!(cljs.core.contains_QMARK_.call(null,key_selectors_map,new cljs.core.Keyword(null,"container","container",602947571))))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",-1640422260,null),cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"key-selectors-map","key-selectors-map",19054414,null),new cljs.core.Keyword(null,"container","container",602947571))))))));
}
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"container","container",602947571),container], null),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (container){
return (function (p__11298){var vec__11299 = p__11298;var k = cljs.core.nth.call(null,vec__11299,0,null);var v = cljs.core.nth.call(null,vec__11299,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,v)))?(function (){if(typeof dommy.core.t11300 !== 'undefined')
{} else
{
/**
* @constructor
*/
dommy.core.t11300 = (function (v,k,vec__11299,p__11298,container,key_selectors_map,template,selector_map,meta11301){
this.v = v;
this.k = k;
this.vec__11299 = vec__11299;
this.p__11298 = p__11298;
this.container = container;
this.key_selectors_map = key_selectors_map;
this.template = template;
this.selector_map = selector_map;
this.meta11301 = meta11301;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 425984;
})
dommy.core.t11300.cljs$lang$type = true;
dommy.core.t11300.cljs$lang$ctorStr = "dommy.core/t11300";
dommy.core.t11300.cljs$lang$ctorPrWriter = ((function (vec__11299,k,v,container){
return (function (this__4108__auto__,writer__4109__auto__,opt__4110__auto__){return cljs.core._write.call(null,writer__4109__auto__,"dommy.core/t11300");
});})(vec__11299,k,v,container))
;
dommy.core.t11300.prototype.cljs$core$IDeref$_deref$arity$1 = ((function (vec__11299,k,v,container){
return (function (this$){var self__ = this;
var this$__$1 = this;return dommy.utils.__GT_Array.call(null,dommy.template.__GT_node_like.call(null,self__.container).querySelectorAll(dommy.core.selector.call(null,self__.v)));
});})(vec__11299,k,v,container))
;
dommy.core.t11300.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (vec__11299,k,v,container){
return (function (_11302){var self__ = this;
var _11302__$1 = this;return self__.meta11301;
});})(vec__11299,k,v,container))
;
dommy.core.t11300.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (vec__11299,k,v,container){
return (function (_11302,meta11301__$1){var self__ = this;
var _11302__$1 = this;return (new dommy.core.t11300(self__.v,self__.k,self__.vec__11299,self__.p__11298,self__.container,self__.key_selectors_map,self__.template,self__.selector_map,meta11301__$1));
});})(vec__11299,k,v,container))
;
dommy.core.__GT_t11300 = ((function (vec__11299,k,v,container){
return (function __GT_t11300(v__$1,k__$1,vec__11299__$1,p__11298__$1,container__$1,key_selectors_map__$1,template__$1,selector_map__$1,meta11301){return (new dommy.core.t11300(v__$1,k__$1,vec__11299__$1,p__11298__$1,container__$1,key_selectors_map__$1,template__$1,selector_map__$1,meta11301));
});})(vec__11299,k,v,container))
;
}
return (new dommy.core.t11300(v,k,vec__11299,p__11298,container,key_selectors_map,template,selector_map,null));
})():dommy.template.__GT_node_like.call(null,container).querySelector(dommy.core.selector.call(null,v)))], null);
});})(container))
,key_selectors_map)));
});
/**
* a lazy seq of the ancestors of `node`
*/
dommy.core.ancestor_nodes = (function ancestor_nodes(elem){return cljs.core.take_while.call(null,cljs.core.identity,cljs.core.iterate.call(null,(function (p1__11303_SHARP_){return p1__11303_SHARP_.parentNode;
}),dommy.template.__GT_node_like.call(null,elem)));
});
/**
* returns a predicate on nodes that match `selector` at the
* time of this `matches-pred` call (may return outdated results
* if you fuck with the DOM)
*/
dommy.core.matches_pred = (function() {
var matches_pred = null;
var matches_pred__1 = (function (selector){return matches_pred.call(null,document,selector);
});
var matches_pred__2 = (function (base,selector){var matches = dommy.utils.__GT_Array.call(null,dommy.template.__GT_node_like.call(null,dommy.template.__GT_node_like.call(null,base)).querySelectorAll(dommy.core.selector.call(null,selector)));return ((function (matches){
return (function (elem){return (matches.indexOf(elem) >= 0);
});
;})(matches))
});
matches_pred = function(base,selector){
switch(arguments.length){
case 1:
return matches_pred__1.call(this,base);
case 2:
return matches_pred__2.call(this,base,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
matches_pred.cljs$core$IFn$_invoke$arity$1 = matches_pred__1;
matches_pred.cljs$core$IFn$_invoke$arity$2 = matches_pred__2;
return matches_pred;
})()
;
/**
* closest ancestor of `node` (up to `base`, if provided)
* that matches `selector`
*/
dommy.core.closest = (function() {
var closest = null;
var closest__2 = (function (elem,selector){return cljs.core.first.call(null,cljs.core.filter.call(null,dommy.core.matches_pred.call(null,selector),dommy.core.ancestor_nodes.call(null,dommy.template.__GT_node_like.call(null,elem))));
});
var closest__3 = (function (base,elem,selector){var base__$1 = dommy.template.__GT_node_like.call(null,base);var elem__$1 = dommy.template.__GT_node_like.call(null,elem);return cljs.core.first.call(null,cljs.core.filter.call(null,dommy.core.matches_pred.call(null,base__$1,selector),cljs.core.take_while.call(null,((function (base__$1,elem__$1){
return (function (p1__11304_SHARP_){return !((p1__11304_SHARP_ === base__$1));
});})(base__$1,elem__$1))
,dommy.core.ancestor_nodes.call(null,elem__$1))));
});
closest = function(base,elem,selector){
switch(arguments.length){
case 2:
return closest__2.call(this,base,elem);
case 3:
return closest__3.call(this,base,elem,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
closest.cljs$core$IFn$_invoke$arity$2 = closest__2;
closest.cljs$core$IFn$_invoke$arity$3 = closest__3;
return closest;
})()
;
/**
* is `descendant` a descendant of `ancestor`?
*/
dommy.core.descendant_QMARK_ = (function descendant_QMARK_(descendant,ancestor){var descendant__$1 = dommy.template.__GT_node_like.call(null,descendant);var ancestor__$1 = dommy.template.__GT_node_like.call(null,ancestor);if(cljs.core.truth_(ancestor__$1.contains))
{return ancestor__$1.contains(descendant__$1);
} else
{if(cljs.core.truth_(ancestor__$1.compareDocumentPosition))
{return ((ancestor__$1.compareDocumentPosition(descendant__$1) & (1 << 4)) != 0);
} else
{return null;
}
}
});
dommy.core.special_listener_makers = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__11305){var vec__11306 = p__11305;var special_mouse_event = cljs.core.nth.call(null,vec__11306,0,null);var real_mouse_event = cljs.core.nth.call(null,vec__11306,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__11306,special_mouse_event,real_mouse_event){
return (function (f){return ((function (vec__11306,special_mouse_event,real_mouse_event){
return (function (event){var related_target = event.relatedTarget;var listener_target = (function (){var or__3541__auto__ = event.selectedTarget;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return event.currentTarget;
}
})();if(cljs.core.truth_((function (){var and__3529__auto__ = related_target;if(cljs.core.truth_(and__3529__auto__))
{return dommy.core.descendant_QMARK_.call(null,related_target,listener_target);
} else
{return and__3529__auto__;
}
})()))
{return null;
} else
{return f.call(null,event);
}
});
;})(vec__11306,special_mouse_event,real_mouse_event))
});})(vec__11306,special_mouse_event,real_mouse_event))
], true, false)], null);
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mouseenter","mouseenter",2027084997),new cljs.core.Keyword(null,"mouseover","mouseover",1601081963),new cljs.core.Keyword(null,"mouseleave","mouseleave",2033263780),new cljs.core.Keyword(null,"mouseout","mouseout",894298107)], null)));
/**
* fires f if event.target is found with `selector`
*/
dommy.core.live_listener = (function live_listener(elem,selector,f){return (function (event){var selected_target = dommy.core.closest.call(null,dommy.template.__GT_node_like.call(null,elem),event.target,selector);if(cljs.core.truth_((function (){var and__3529__auto__ = selected_target;if(cljs.core.truth_(and__3529__auto__))
{return cljs.core.not.call(null,dommy.core.attr.call(null,selected_target,new cljs.core.Keyword(null,"disabled","disabled",1284845038)));
} else
{return and__3529__auto__;
}
})()))
{event.selectedTarget = selected_target;
return f.call(null,event);
} else
{return null;
}
});
});
/**
* Returns a nested map of event listeners on `nodes`
*/
dommy.core.event_listeners = (function event_listeners(elem){var or__3541__auto__ = dommy.template.__GT_node_like.call(null,elem).dommyEventListeners;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
});
/**
* @param {...*} var_args
*/
dommy.core.update_event_listeners_BANG_ = (function() { 
var update_event_listeners_BANG___delegate = function (elem,f,args){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);return elem__$1.dommyEventListeners = cljs.core.apply.call(null,f,dommy.core.event_listeners.call(null,elem__$1),args);
};
var update_event_listeners_BANG_ = function (elem,f,var_args){
var args = null;if (arguments.length > 2) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return update_event_listeners_BANG___delegate.call(this,elem,f,args);};
update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__11307){
var elem = cljs.core.first(arglist__11307);
arglist__11307 = cljs.core.next(arglist__11307);
var f = cljs.core.first(arglist__11307);
var args = cljs.core.rest(arglist__11307);
return update_event_listeners_BANG___delegate(elem,f,args);
});
update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic = update_event_listeners_BANG___delegate;
return update_event_listeners_BANG_;
})()
;
dommy.core.elem_and_selector = (function elem_and_selector(elem_sel){if(cljs.core.sequential_QMARK_.call(null,elem_sel))
{return cljs.core.juxt.call(null,(function (p1__11308_SHARP_){return dommy.template.__GT_node_like.call(null,cljs.core.first.call(null,p1__11308_SHARP_));
}),cljs.core.rest).call(null,elem_sel);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dommy.template.__GT_node_like.call(null,elem_sel),null], null);
}
});
/**
* Adds `f` as a listener for events of type `event-type` on
* `elem-sel`, which must either be a DOM node, or a sequence
* whose first item is a DOM node.
* 
* In other words, the call to `listen!` can take two forms:
* 
* If `elem-sel` is a DOM node, i.e., you're doing something like:
* 
* (listen! elem :click click-handler)
* 
* then `click-handler` will be set as a listener for `click` events
* on the `elem`.
* 
* If `elem-sel` is a sequence:
* 
* (listen! [elem :.selector.for :.some.descendants] :click click-handler)
* 
* then `click-handler` will be set as a listener for `click` events
* on descendants of `elem` that match the selector
* 
* Also accepts any number of event-type and handler pairs for setting
* multiple listeners at once:
* 
* (listen! some-elem :click click-handler :hover hover-handler)
* @param {...*} var_args
*/
dommy.core.listen_BANG_ = (function() { 
var listen_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,type_fs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null))))))));
}
var vec__11332_11355 = dommy.core.elem_and_selector.call(null,elem_sel);var elem_11356 = cljs.core.nth.call(null,vec__11332_11355,0,null);var selector_11357 = cljs.core.nth.call(null,vec__11332_11355,1,null);var seq__11333_11358 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,type_fs));var chunk__11340_11359 = null;var count__11341_11360 = 0;var i__11342_11361 = 0;while(true){
if((i__11342_11361 < count__11341_11360))
{var vec__11349_11362 = cljs.core._nth.call(null,chunk__11340_11359,i__11342_11361);var orig_type_11363 = cljs.core.nth.call(null,vec__11349_11362,0,null);var f_11364 = cljs.core.nth.call(null,vec__11349_11362,1,null);var seq__11343_11365 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_11363,new cljs.core.PersistentArrayMap.fromArray([orig_type_11363,cljs.core.identity], true, false)));var chunk__11345_11366 = null;var count__11346_11367 = 0;var i__11347_11368 = 0;while(true){
if((i__11347_11368 < count__11346_11367))
{var vec__11350_11369 = cljs.core._nth.call(null,chunk__11345_11366,i__11347_11368);var actual_type_11370 = cljs.core.nth.call(null,vec__11350_11369,0,null);var factory_11371 = cljs.core.nth.call(null,vec__11350_11369,1,null);var canonical_f_11372 = (cljs.core.truth_(selector_11357)?cljs.core.partial.call(null,dommy.core.live_listener,elem_11356,selector_11357):cljs.core.identity).call(null,factory_11371.call(null,f_11364));dommy.core.update_event_listeners_BANG_.call(null,elem_11356,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11357,actual_type_11370,f_11364], null),canonical_f_11372);
if(cljs.core.truth_(elem_11356.addEventListener))
{elem_11356.addEventListener(cljs.core.name.call(null,actual_type_11370),canonical_f_11372);
} else
{elem_11356.attachEvent(cljs.core.name.call(null,actual_type_11370),canonical_f_11372);
}
{
var G__11373 = seq__11343_11365;
var G__11374 = chunk__11345_11366;
var G__11375 = count__11346_11367;
var G__11376 = (i__11347_11368 + 1);
seq__11343_11365 = G__11373;
chunk__11345_11366 = G__11374;
count__11346_11367 = G__11375;
i__11347_11368 = G__11376;
continue;
}
} else
{var temp__4126__auto___11377 = cljs.core.seq.call(null,seq__11343_11365);if(temp__4126__auto___11377)
{var seq__11343_11378__$1 = temp__4126__auto___11377;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11343_11378__$1))
{var c__4297__auto___11379 = cljs.core.chunk_first.call(null,seq__11343_11378__$1);{
var G__11380 = cljs.core.chunk_rest.call(null,seq__11343_11378__$1);
var G__11381 = c__4297__auto___11379;
var G__11382 = cljs.core.count.call(null,c__4297__auto___11379);
var G__11383 = 0;
seq__11343_11365 = G__11380;
chunk__11345_11366 = G__11381;
count__11346_11367 = G__11382;
i__11347_11368 = G__11383;
continue;
}
} else
{var vec__11351_11384 = cljs.core.first.call(null,seq__11343_11378__$1);var actual_type_11385 = cljs.core.nth.call(null,vec__11351_11384,0,null);var factory_11386 = cljs.core.nth.call(null,vec__11351_11384,1,null);var canonical_f_11387 = (cljs.core.truth_(selector_11357)?cljs.core.partial.call(null,dommy.core.live_listener,elem_11356,selector_11357):cljs.core.identity).call(null,factory_11386.call(null,f_11364));dommy.core.update_event_listeners_BANG_.call(null,elem_11356,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11357,actual_type_11385,f_11364], null),canonical_f_11387);
if(cljs.core.truth_(elem_11356.addEventListener))
{elem_11356.addEventListener(cljs.core.name.call(null,actual_type_11385),canonical_f_11387);
} else
{elem_11356.attachEvent(cljs.core.name.call(null,actual_type_11385),canonical_f_11387);
}
{
var G__11388 = cljs.core.next.call(null,seq__11343_11378__$1);
var G__11389 = null;
var G__11390 = 0;
var G__11391 = 0;
seq__11343_11365 = G__11388;
chunk__11345_11366 = G__11389;
count__11346_11367 = G__11390;
i__11347_11368 = G__11391;
continue;
}
}
} else
{}
}
break;
}
{
var G__11392 = seq__11333_11358;
var G__11393 = chunk__11340_11359;
var G__11394 = count__11341_11360;
var G__11395 = (i__11342_11361 + 1);
seq__11333_11358 = G__11392;
chunk__11340_11359 = G__11393;
count__11341_11360 = G__11394;
i__11342_11361 = G__11395;
continue;
}
} else
{var temp__4126__auto___11396 = cljs.core.seq.call(null,seq__11333_11358);if(temp__4126__auto___11396)
{var seq__11333_11397__$1 = temp__4126__auto___11396;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11333_11397__$1))
{var c__4297__auto___11398 = cljs.core.chunk_first.call(null,seq__11333_11397__$1);{
var G__11399 = cljs.core.chunk_rest.call(null,seq__11333_11397__$1);
var G__11400 = c__4297__auto___11398;
var G__11401 = cljs.core.count.call(null,c__4297__auto___11398);
var G__11402 = 0;
seq__11333_11358 = G__11399;
chunk__11340_11359 = G__11400;
count__11341_11360 = G__11401;
i__11342_11361 = G__11402;
continue;
}
} else
{var vec__11352_11403 = cljs.core.first.call(null,seq__11333_11397__$1);var orig_type_11404 = cljs.core.nth.call(null,vec__11352_11403,0,null);var f_11405 = cljs.core.nth.call(null,vec__11352_11403,1,null);var seq__11334_11406 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_11404,new cljs.core.PersistentArrayMap.fromArray([orig_type_11404,cljs.core.identity], true, false)));var chunk__11336_11407 = null;var count__11337_11408 = 0;var i__11338_11409 = 0;while(true){
if((i__11338_11409 < count__11337_11408))
{var vec__11353_11410 = cljs.core._nth.call(null,chunk__11336_11407,i__11338_11409);var actual_type_11411 = cljs.core.nth.call(null,vec__11353_11410,0,null);var factory_11412 = cljs.core.nth.call(null,vec__11353_11410,1,null);var canonical_f_11413 = (cljs.core.truth_(selector_11357)?cljs.core.partial.call(null,dommy.core.live_listener,elem_11356,selector_11357):cljs.core.identity).call(null,factory_11412.call(null,f_11405));dommy.core.update_event_listeners_BANG_.call(null,elem_11356,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11357,actual_type_11411,f_11405], null),canonical_f_11413);
if(cljs.core.truth_(elem_11356.addEventListener))
{elem_11356.addEventListener(cljs.core.name.call(null,actual_type_11411),canonical_f_11413);
} else
{elem_11356.attachEvent(cljs.core.name.call(null,actual_type_11411),canonical_f_11413);
}
{
var G__11414 = seq__11334_11406;
var G__11415 = chunk__11336_11407;
var G__11416 = count__11337_11408;
var G__11417 = (i__11338_11409 + 1);
seq__11334_11406 = G__11414;
chunk__11336_11407 = G__11415;
count__11337_11408 = G__11416;
i__11338_11409 = G__11417;
continue;
}
} else
{var temp__4126__auto___11418__$1 = cljs.core.seq.call(null,seq__11334_11406);if(temp__4126__auto___11418__$1)
{var seq__11334_11419__$1 = temp__4126__auto___11418__$1;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11334_11419__$1))
{var c__4297__auto___11420 = cljs.core.chunk_first.call(null,seq__11334_11419__$1);{
var G__11421 = cljs.core.chunk_rest.call(null,seq__11334_11419__$1);
var G__11422 = c__4297__auto___11420;
var G__11423 = cljs.core.count.call(null,c__4297__auto___11420);
var G__11424 = 0;
seq__11334_11406 = G__11421;
chunk__11336_11407 = G__11422;
count__11337_11408 = G__11423;
i__11338_11409 = G__11424;
continue;
}
} else
{var vec__11354_11425 = cljs.core.first.call(null,seq__11334_11419__$1);var actual_type_11426 = cljs.core.nth.call(null,vec__11354_11425,0,null);var factory_11427 = cljs.core.nth.call(null,vec__11354_11425,1,null);var canonical_f_11428 = (cljs.core.truth_(selector_11357)?cljs.core.partial.call(null,dommy.core.live_listener,elem_11356,selector_11357):cljs.core.identity).call(null,factory_11427.call(null,f_11405));dommy.core.update_event_listeners_BANG_.call(null,elem_11356,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11357,actual_type_11426,f_11405], null),canonical_f_11428);
if(cljs.core.truth_(elem_11356.addEventListener))
{elem_11356.addEventListener(cljs.core.name.call(null,actual_type_11426),canonical_f_11428);
} else
{elem_11356.attachEvent(cljs.core.name.call(null,actual_type_11426),canonical_f_11428);
}
{
var G__11429 = cljs.core.next.call(null,seq__11334_11419__$1);
var G__11430 = null;
var G__11431 = 0;
var G__11432 = 0;
seq__11334_11406 = G__11429;
chunk__11336_11407 = G__11430;
count__11337_11408 = G__11431;
i__11338_11409 = G__11432;
continue;
}
}
} else
{}
}
break;
}
{
var G__11433 = cljs.core.next.call(null,seq__11333_11397__$1);
var G__11434 = null;
var G__11435 = 0;
var G__11436 = 0;
seq__11333_11358 = G__11433;
chunk__11340_11359 = G__11434;
count__11341_11360 = G__11435;
i__11342_11361 = G__11436;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var listen_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return listen_BANG___delegate.call(this,elem_sel,type_fs);};
listen_BANG_.cljs$lang$maxFixedArity = 1;
listen_BANG_.cljs$lang$applyTo = (function (arglist__11437){
var elem_sel = cljs.core.first(arglist__11437);
var type_fs = cljs.core.rest(arglist__11437);
return listen_BANG___delegate(elem_sel,type_fs);
});
listen_BANG_.cljs$core$IFn$_invoke$arity$variadic = listen_BANG___delegate;
return listen_BANG_;
})()
;
/**
* Removes event listener for the element defined in `elem-sel`,
* which is the same format as listen!.
* 
* The following forms are allowed, and will remove all handlers
* that match the parameters passed in:
* 
* (unlisten! [elem :.selector] :click event-listener)
* 
* (unlisten! [elem :.selector]
* :click event-listener
* :mouseover other-event-listener)
* @param {...*} var_args
*/
dommy.core.unlisten_BANG_ = (function() { 
var unlisten_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,type_fs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null))))))));
}
var vec__11461_11484 = dommy.core.elem_and_selector.call(null,elem_sel);var elem_11485 = cljs.core.nth.call(null,vec__11461_11484,0,null);var selector_11486 = cljs.core.nth.call(null,vec__11461_11484,1,null);var seq__11462_11487 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,type_fs));var chunk__11469_11488 = null;var count__11470_11489 = 0;var i__11471_11490 = 0;while(true){
if((i__11471_11490 < count__11470_11489))
{var vec__11478_11491 = cljs.core._nth.call(null,chunk__11469_11488,i__11471_11490);var orig_type_11492 = cljs.core.nth.call(null,vec__11478_11491,0,null);var f_11493 = cljs.core.nth.call(null,vec__11478_11491,1,null);var seq__11472_11494 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_11492,new cljs.core.PersistentArrayMap.fromArray([orig_type_11492,cljs.core.identity], true, false)));var chunk__11474_11495 = null;var count__11475_11496 = 0;var i__11476_11497 = 0;while(true){
if((i__11476_11497 < count__11475_11496))
{var vec__11479_11498 = cljs.core._nth.call(null,chunk__11474_11495,i__11476_11497);var actual_type_11499 = cljs.core.nth.call(null,vec__11479_11498,0,null);var __11500 = cljs.core.nth.call(null,vec__11479_11498,1,null);var keys_11501 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11486,actual_type_11499,f_11493], null);var canonical_f_11502 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_11485),keys_11501);dommy.core.update_event_listeners_BANG_.call(null,elem_11485,dommy.utils.dissoc_in,keys_11501);
if(cljs.core.truth_(elem_11485.removeEventListener))
{elem_11485.removeEventListener(cljs.core.name.call(null,actual_type_11499),canonical_f_11502);
} else
{elem_11485.detachEvent(cljs.core.name.call(null,actual_type_11499),canonical_f_11502);
}
{
var G__11503 = seq__11472_11494;
var G__11504 = chunk__11474_11495;
var G__11505 = count__11475_11496;
var G__11506 = (i__11476_11497 + 1);
seq__11472_11494 = G__11503;
chunk__11474_11495 = G__11504;
count__11475_11496 = G__11505;
i__11476_11497 = G__11506;
continue;
}
} else
{var temp__4126__auto___11507 = cljs.core.seq.call(null,seq__11472_11494);if(temp__4126__auto___11507)
{var seq__11472_11508__$1 = temp__4126__auto___11507;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11472_11508__$1))
{var c__4297__auto___11509 = cljs.core.chunk_first.call(null,seq__11472_11508__$1);{
var G__11510 = cljs.core.chunk_rest.call(null,seq__11472_11508__$1);
var G__11511 = c__4297__auto___11509;
var G__11512 = cljs.core.count.call(null,c__4297__auto___11509);
var G__11513 = 0;
seq__11472_11494 = G__11510;
chunk__11474_11495 = G__11511;
count__11475_11496 = G__11512;
i__11476_11497 = G__11513;
continue;
}
} else
{var vec__11480_11514 = cljs.core.first.call(null,seq__11472_11508__$1);var actual_type_11515 = cljs.core.nth.call(null,vec__11480_11514,0,null);var __11516 = cljs.core.nth.call(null,vec__11480_11514,1,null);var keys_11517 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11486,actual_type_11515,f_11493], null);var canonical_f_11518 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_11485),keys_11517);dommy.core.update_event_listeners_BANG_.call(null,elem_11485,dommy.utils.dissoc_in,keys_11517);
if(cljs.core.truth_(elem_11485.removeEventListener))
{elem_11485.removeEventListener(cljs.core.name.call(null,actual_type_11515),canonical_f_11518);
} else
{elem_11485.detachEvent(cljs.core.name.call(null,actual_type_11515),canonical_f_11518);
}
{
var G__11519 = cljs.core.next.call(null,seq__11472_11508__$1);
var G__11520 = null;
var G__11521 = 0;
var G__11522 = 0;
seq__11472_11494 = G__11519;
chunk__11474_11495 = G__11520;
count__11475_11496 = G__11521;
i__11476_11497 = G__11522;
continue;
}
}
} else
{}
}
break;
}
{
var G__11523 = seq__11462_11487;
var G__11524 = chunk__11469_11488;
var G__11525 = count__11470_11489;
var G__11526 = (i__11471_11490 + 1);
seq__11462_11487 = G__11523;
chunk__11469_11488 = G__11524;
count__11470_11489 = G__11525;
i__11471_11490 = G__11526;
continue;
}
} else
{var temp__4126__auto___11527 = cljs.core.seq.call(null,seq__11462_11487);if(temp__4126__auto___11527)
{var seq__11462_11528__$1 = temp__4126__auto___11527;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11462_11528__$1))
{var c__4297__auto___11529 = cljs.core.chunk_first.call(null,seq__11462_11528__$1);{
var G__11530 = cljs.core.chunk_rest.call(null,seq__11462_11528__$1);
var G__11531 = c__4297__auto___11529;
var G__11532 = cljs.core.count.call(null,c__4297__auto___11529);
var G__11533 = 0;
seq__11462_11487 = G__11530;
chunk__11469_11488 = G__11531;
count__11470_11489 = G__11532;
i__11471_11490 = G__11533;
continue;
}
} else
{var vec__11481_11534 = cljs.core.first.call(null,seq__11462_11528__$1);var orig_type_11535 = cljs.core.nth.call(null,vec__11481_11534,0,null);var f_11536 = cljs.core.nth.call(null,vec__11481_11534,1,null);var seq__11463_11537 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_11535,new cljs.core.PersistentArrayMap.fromArray([orig_type_11535,cljs.core.identity], true, false)));var chunk__11465_11538 = null;var count__11466_11539 = 0;var i__11467_11540 = 0;while(true){
if((i__11467_11540 < count__11466_11539))
{var vec__11482_11541 = cljs.core._nth.call(null,chunk__11465_11538,i__11467_11540);var actual_type_11542 = cljs.core.nth.call(null,vec__11482_11541,0,null);var __11543 = cljs.core.nth.call(null,vec__11482_11541,1,null);var keys_11544 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11486,actual_type_11542,f_11536], null);var canonical_f_11545 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_11485),keys_11544);dommy.core.update_event_listeners_BANG_.call(null,elem_11485,dommy.utils.dissoc_in,keys_11544);
if(cljs.core.truth_(elem_11485.removeEventListener))
{elem_11485.removeEventListener(cljs.core.name.call(null,actual_type_11542),canonical_f_11545);
} else
{elem_11485.detachEvent(cljs.core.name.call(null,actual_type_11542),canonical_f_11545);
}
{
var G__11546 = seq__11463_11537;
var G__11547 = chunk__11465_11538;
var G__11548 = count__11466_11539;
var G__11549 = (i__11467_11540 + 1);
seq__11463_11537 = G__11546;
chunk__11465_11538 = G__11547;
count__11466_11539 = G__11548;
i__11467_11540 = G__11549;
continue;
}
} else
{var temp__4126__auto___11550__$1 = cljs.core.seq.call(null,seq__11463_11537);if(temp__4126__auto___11550__$1)
{var seq__11463_11551__$1 = temp__4126__auto___11550__$1;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11463_11551__$1))
{var c__4297__auto___11552 = cljs.core.chunk_first.call(null,seq__11463_11551__$1);{
var G__11553 = cljs.core.chunk_rest.call(null,seq__11463_11551__$1);
var G__11554 = c__4297__auto___11552;
var G__11555 = cljs.core.count.call(null,c__4297__auto___11552);
var G__11556 = 0;
seq__11463_11537 = G__11553;
chunk__11465_11538 = G__11554;
count__11466_11539 = G__11555;
i__11467_11540 = G__11556;
continue;
}
} else
{var vec__11483_11557 = cljs.core.first.call(null,seq__11463_11551__$1);var actual_type_11558 = cljs.core.nth.call(null,vec__11483_11557,0,null);var __11559 = cljs.core.nth.call(null,vec__11483_11557,1,null);var keys_11560 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_11486,actual_type_11558,f_11536], null);var canonical_f_11561 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_11485),keys_11560);dommy.core.update_event_listeners_BANG_.call(null,elem_11485,dommy.utils.dissoc_in,keys_11560);
if(cljs.core.truth_(elem_11485.removeEventListener))
{elem_11485.removeEventListener(cljs.core.name.call(null,actual_type_11558),canonical_f_11561);
} else
{elem_11485.detachEvent(cljs.core.name.call(null,actual_type_11558),canonical_f_11561);
}
{
var G__11562 = cljs.core.next.call(null,seq__11463_11551__$1);
var G__11563 = null;
var G__11564 = 0;
var G__11565 = 0;
seq__11463_11537 = G__11562;
chunk__11465_11538 = G__11563;
count__11466_11539 = G__11564;
i__11467_11540 = G__11565;
continue;
}
}
} else
{}
}
break;
}
{
var G__11566 = cljs.core.next.call(null,seq__11462_11528__$1);
var G__11567 = null;
var G__11568 = 0;
var G__11569 = 0;
seq__11462_11487 = G__11566;
chunk__11469_11488 = G__11567;
count__11470_11489 = G__11568;
i__11471_11490 = G__11569;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var unlisten_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
unlisten_BANG_.cljs$lang$maxFixedArity = 1;
unlisten_BANG_.cljs$lang$applyTo = (function (arglist__11570){
var elem_sel = cljs.core.first(arglist__11570);
var type_fs = cljs.core.rest(arglist__11570);
return unlisten_BANG___delegate(elem_sel,type_fs);
});
unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic = unlisten_BANG___delegate;
return unlisten_BANG_;
})()
;
/**
* @param {...*} var_args
*/
dommy.core.listen_once_BANG_ = (function() { 
var listen_once_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,type_fs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null))))))));
}
var vec__11578_11585 = dommy.core.elem_and_selector.call(null,elem_sel);var elem_11586 = cljs.core.nth.call(null,vec__11578_11585,0,null);var selector_11587 = cljs.core.nth.call(null,vec__11578_11585,1,null);var seq__11579_11588 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,type_fs));var chunk__11580_11589 = null;var count__11581_11590 = 0;var i__11582_11591 = 0;while(true){
if((i__11582_11591 < count__11581_11590))
{var vec__11583_11592 = cljs.core._nth.call(null,chunk__11580_11589,i__11582_11591);var type_11593 = cljs.core.nth.call(null,vec__11583_11592,0,null);var f_11594 = cljs.core.nth.call(null,vec__11583_11592,1,null);dommy.core.listen_BANG_.call(null,elem_sel,type_11593,((function (seq__11579_11588,chunk__11580_11589,count__11581_11590,i__11582_11591,vec__11583_11592,type_11593,f_11594,vec__11578_11585,elem_11586,selector_11587){
return (function this_fn(e){dommy.core.unlisten_BANG_.call(null,elem_sel,type_11593,this_fn);
return f_11594.call(null,e);
});})(seq__11579_11588,chunk__11580_11589,count__11581_11590,i__11582_11591,vec__11583_11592,type_11593,f_11594,vec__11578_11585,elem_11586,selector_11587))
);
{
var G__11595 = seq__11579_11588;
var G__11596 = chunk__11580_11589;
var G__11597 = count__11581_11590;
var G__11598 = (i__11582_11591 + 1);
seq__11579_11588 = G__11595;
chunk__11580_11589 = G__11596;
count__11581_11590 = G__11597;
i__11582_11591 = G__11598;
continue;
}
} else
{var temp__4126__auto___11599 = cljs.core.seq.call(null,seq__11579_11588);if(temp__4126__auto___11599)
{var seq__11579_11600__$1 = temp__4126__auto___11599;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11579_11600__$1))
{var c__4297__auto___11601 = cljs.core.chunk_first.call(null,seq__11579_11600__$1);{
var G__11602 = cljs.core.chunk_rest.call(null,seq__11579_11600__$1);
var G__11603 = c__4297__auto___11601;
var G__11604 = cljs.core.count.call(null,c__4297__auto___11601);
var G__11605 = 0;
seq__11579_11588 = G__11602;
chunk__11580_11589 = G__11603;
count__11581_11590 = G__11604;
i__11582_11591 = G__11605;
continue;
}
} else
{var vec__11584_11606 = cljs.core.first.call(null,seq__11579_11600__$1);var type_11607 = cljs.core.nth.call(null,vec__11584_11606,0,null);var f_11608 = cljs.core.nth.call(null,vec__11584_11606,1,null);dommy.core.listen_BANG_.call(null,elem_sel,type_11607,((function (seq__11579_11588,chunk__11580_11589,count__11581_11590,i__11582_11591,vec__11584_11606,type_11607,f_11608,seq__11579_11600__$1,temp__4126__auto___11599,vec__11578_11585,elem_11586,selector_11587){
return (function this_fn(e){dommy.core.unlisten_BANG_.call(null,elem_sel,type_11607,this_fn);
return f_11608.call(null,e);
});})(seq__11579_11588,chunk__11580_11589,count__11581_11590,i__11582_11591,vec__11584_11606,type_11607,f_11608,seq__11579_11600__$1,temp__4126__auto___11599,vec__11578_11585,elem_11586,selector_11587))
);
{
var G__11609 = cljs.core.next.call(null,seq__11579_11600__$1);
var G__11610 = null;
var G__11611 = 0;
var G__11612 = 0;
seq__11579_11588 = G__11609;
chunk__11580_11589 = G__11610;
count__11581_11590 = G__11611;
i__11582_11591 = G__11612;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var listen_once_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
listen_once_BANG_.cljs$lang$maxFixedArity = 1;
listen_once_BANG_.cljs$lang$applyTo = (function (arglist__11613){
var elem_sel = cljs.core.first(arglist__11613);
var type_fs = cljs.core.rest(arglist__11613);
return listen_once_BANG___delegate(elem_sel,type_fs);
});
listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = listen_once_BANG___delegate;
return listen_once_BANG_;
})()
;
/**
* NOTE: ONLY TO BE USED FOR TESTS. May not work at mocking many
* event types or their bubbling behaviours
* 
* Creates an event of type `event-type`, optionally having
* `update-event!` mutate and return an updated event object,
* and fires it on `node`.
* Only works when `node` is in the DOM
* @param {...*} var_args
*/
dommy.core.fire_BANG_ = (function() { 
var fire_BANG___delegate = function (node,event_type,p__11614){var vec__11616 = p__11614;var update_event_BANG_ = cljs.core.nth.call(null,vec__11616,0,null);if(dommy.core.descendant_QMARK_.call(null,node,document.documentElement))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"descendant?","descendant?",-1886221157,null),new cljs.core.Symbol(null,"node","node",-1637144645,null),new cljs.core.Symbol("js","document.documentElement","js/document.documentElement",-1449696112,null)))))));
}
var update_event_BANG___$1 = (function (){var or__3541__auto__ = update_event_BANG_;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return cljs.core.identity;
}
})();if(cljs.core.truth_(document.createEvent))
{var event = document.createEvent("Event");event.initEvent(cljs.core.name.call(null,event_type),true,true);
return node.dispatchEvent(update_event_BANG___$1.call(null,event));
} else
{return node.fireEvent(("on"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,event_type))),update_event_BANG___$1.call(null,document.createEventObject()));
}
};
var fire_BANG_ = function (node,event_type,var_args){
var p__11614 = null;if (arguments.length > 2) {
  p__11614 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return fire_BANG___delegate.call(this,node,event_type,p__11614);};
fire_BANG_.cljs$lang$maxFixedArity = 2;
fire_BANG_.cljs$lang$applyTo = (function (arglist__11617){
var node = cljs.core.first(arglist__11617);
arglist__11617 = cljs.core.next(arglist__11617);
var event_type = cljs.core.first(arglist__11617);
var p__11614 = cljs.core.rest(arglist__11617);
return fire_BANG___delegate(node,event_type,p__11614);
});
fire_BANG_.cljs$core$IFn$_invoke$arity$variadic = fire_BANG___delegate;
return fire_BANG_;
})()
;

//# sourceMappingURL=core.js.map