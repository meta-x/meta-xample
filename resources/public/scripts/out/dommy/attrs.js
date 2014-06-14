// Compiled by ClojureScript 0.0-2227
goog.provide('dommy.attrs');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
/**
* does class-name string have class starting at index idx.
* only will be used when Element::classList doesn't exist
*/
dommy.attrs.class_match_QMARK_ = (function class_match_QMARK_(class_name,class$,idx){var and__3529__auto__ = ((idx === 0)) || ((" " === class_name.charAt((idx - 1))));if(and__3529__auto__)
{var total_len = class_name.length;var stop = (idx + class$.length);if((stop <= total_len))
{return ((stop === total_len)) || ((" " === class_name.charAt(stop)));
} else
{return null;
}
} else
{return and__3529__auto__;
}
});
/**
* Finds the index of class in a space-delimited class-name
* only will be used when Element::classList doesn't exist
*/
dommy.attrs.class_index = (function class_index(class_name,class$){var start_from = 0;while(true){
var i = class_name.indexOf(class$,start_from);if((i >= 0))
{if(dommy.attrs.class_match_QMARK_.call(null,class_name,class$,i))
{return i;
} else
{{
var G__10939 = (i + class$.length);
start_from = G__10939;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Does an HTML element have a class. Uses Element::classList if
* available and otherwise does fast parse of className string
*/
dommy.attrs.has_class_QMARK_ = (function has_class_QMARK_(elem,class$){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var class$__$1 = cljs.core.name.call(null,class$);var temp__4124__auto__ = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto__))
{var class_list = temp__4124__auto__;return class_list.contains(class$__$1);
} else
{var temp__4126__auto__ = elem__$1.className;if(cljs.core.truth_(temp__4126__auto__))
{var class_name = temp__4126__auto__;var temp__4126__auto____$1 = dommy.attrs.class_index.call(null,class_name,class$__$1);if(cljs.core.truth_(temp__4126__auto____$1))
{var i = temp__4126__auto____$1;return (i >= 0);
} else
{return null;
}
} else
{return null;
}
}
});
/**
* add class to element
* @param {...*} var_args
*/
dommy.attrs.add_class_BANG_ = (function() {
var add_class_BANG_ = null;
var add_class_BANG___2 = (function (elem,classes){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var classes__$1 = clojure.string.trim.call(null,cljs.core.name.call(null,classes));if(cljs.core.seq.call(null,classes__$1))
{var temp__4124__auto___10964 = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto___10964))
{var class_list_10965 = temp__4124__auto___10964;var seq__10952_10966 = cljs.core.seq.call(null,classes__$1.split(/\s+/));var chunk__10953_10967 = null;var count__10954_10968 = 0;var i__10955_10969 = 0;while(true){
if((i__10955_10969 < count__10954_10968))
{var class_10970 = cljs.core._nth.call(null,chunk__10953_10967,i__10955_10969);class_list_10965.add(class_10970);
{
var G__10971 = seq__10952_10966;
var G__10972 = chunk__10953_10967;
var G__10973 = count__10954_10968;
var G__10974 = (i__10955_10969 + 1);
seq__10952_10966 = G__10971;
chunk__10953_10967 = G__10972;
count__10954_10968 = G__10973;
i__10955_10969 = G__10974;
continue;
}
} else
{var temp__4126__auto___10975 = cljs.core.seq.call(null,seq__10952_10966);if(temp__4126__auto___10975)
{var seq__10952_10976__$1 = temp__4126__auto___10975;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10952_10976__$1))
{var c__4297__auto___10977 = cljs.core.chunk_first.call(null,seq__10952_10976__$1);{
var G__10978 = cljs.core.chunk_rest.call(null,seq__10952_10976__$1);
var G__10979 = c__4297__auto___10977;
var G__10980 = cljs.core.count.call(null,c__4297__auto___10977);
var G__10981 = 0;
seq__10952_10966 = G__10978;
chunk__10953_10967 = G__10979;
count__10954_10968 = G__10980;
i__10955_10969 = G__10981;
continue;
}
} else
{var class_10982 = cljs.core.first.call(null,seq__10952_10976__$1);class_list_10965.add(class_10982);
{
var G__10983 = cljs.core.next.call(null,seq__10952_10976__$1);
var G__10984 = null;
var G__10985 = 0;
var G__10986 = 0;
seq__10952_10966 = G__10983;
chunk__10953_10967 = G__10984;
count__10954_10968 = G__10985;
i__10955_10969 = G__10986;
continue;
}
}
} else
{}
}
break;
}
} else
{var class_name_10987 = elem__$1.className;var seq__10956_10988 = cljs.core.seq.call(null,classes__$1.split(/\s+/));var chunk__10957_10989 = null;var count__10958_10990 = 0;var i__10959_10991 = 0;while(true){
if((i__10959_10991 < count__10958_10990))
{var class_10992 = cljs.core._nth.call(null,chunk__10957_10989,i__10959_10991);if(cljs.core.truth_(dommy.attrs.class_index.call(null,class_name_10987,class_10992)))
{} else
{elem__$1.className = (((class_name_10987 === ""))?class_10992:(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name_10987)+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_10992)));
}
{
var G__10993 = seq__10956_10988;
var G__10994 = chunk__10957_10989;
var G__10995 = count__10958_10990;
var G__10996 = (i__10959_10991 + 1);
seq__10956_10988 = G__10993;
chunk__10957_10989 = G__10994;
count__10958_10990 = G__10995;
i__10959_10991 = G__10996;
continue;
}
} else
{var temp__4126__auto___10997 = cljs.core.seq.call(null,seq__10956_10988);if(temp__4126__auto___10997)
{var seq__10956_10998__$1 = temp__4126__auto___10997;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10956_10998__$1))
{var c__4297__auto___10999 = cljs.core.chunk_first.call(null,seq__10956_10998__$1);{
var G__11000 = cljs.core.chunk_rest.call(null,seq__10956_10998__$1);
var G__11001 = c__4297__auto___10999;
var G__11002 = cljs.core.count.call(null,c__4297__auto___10999);
var G__11003 = 0;
seq__10956_10988 = G__11000;
chunk__10957_10989 = G__11001;
count__10958_10990 = G__11002;
i__10959_10991 = G__11003;
continue;
}
} else
{var class_11004 = cljs.core.first.call(null,seq__10956_10998__$1);if(cljs.core.truth_(dommy.attrs.class_index.call(null,class_name_10987,class_11004)))
{} else
{elem__$1.className = (((class_name_10987 === ""))?class_11004:(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name_10987)+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_11004)));
}
{
var G__11005 = cljs.core.next.call(null,seq__10956_10998__$1);
var G__11006 = null;
var G__11007 = 0;
var G__11008 = 0;
seq__10956_10988 = G__11005;
chunk__10957_10989 = G__11006;
count__10958_10990 = G__11007;
i__10959_10991 = G__11008;
continue;
}
}
} else
{}
}
break;
}
}
} else
{}
return elem__$1;
});
var add_class_BANG___3 = (function() { 
var G__11009__delegate = function (elem,classes,more_classes){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var seq__10960_11010 = cljs.core.seq.call(null,cljs.core.conj.call(null,more_classes,classes));var chunk__10961_11011 = null;var count__10962_11012 = 0;var i__10963_11013 = 0;while(true){
if((i__10963_11013 < count__10962_11012))
{var c_11014 = cljs.core._nth.call(null,chunk__10961_11011,i__10963_11013);add_class_BANG_.call(null,elem__$1,c_11014);
{
var G__11015 = seq__10960_11010;
var G__11016 = chunk__10961_11011;
var G__11017 = count__10962_11012;
var G__11018 = (i__10963_11013 + 1);
seq__10960_11010 = G__11015;
chunk__10961_11011 = G__11016;
count__10962_11012 = G__11017;
i__10963_11013 = G__11018;
continue;
}
} else
{var temp__4126__auto___11019 = cljs.core.seq.call(null,seq__10960_11010);if(temp__4126__auto___11019)
{var seq__10960_11020__$1 = temp__4126__auto___11019;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10960_11020__$1))
{var c__4297__auto___11021 = cljs.core.chunk_first.call(null,seq__10960_11020__$1);{
var G__11022 = cljs.core.chunk_rest.call(null,seq__10960_11020__$1);
var G__11023 = c__4297__auto___11021;
var G__11024 = cljs.core.count.call(null,c__4297__auto___11021);
var G__11025 = 0;
seq__10960_11010 = G__11022;
chunk__10961_11011 = G__11023;
count__10962_11012 = G__11024;
i__10963_11013 = G__11025;
continue;
}
} else
{var c_11026 = cljs.core.first.call(null,seq__10960_11020__$1);add_class_BANG_.call(null,elem__$1,c_11026);
{
var G__11027 = cljs.core.next.call(null,seq__10960_11020__$1);
var G__11028 = null;
var G__11029 = 0;
var G__11030 = 0;
seq__10960_11010 = G__11027;
chunk__10961_11011 = G__11028;
count__10962_11012 = G__11029;
i__10963_11013 = G__11030;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var G__11009 = function (elem,classes,var_args){
var more_classes = null;if (arguments.length > 2) {
  more_classes = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__11009__delegate.call(this,elem,classes,more_classes);};
G__11009.cljs$lang$maxFixedArity = 2;
G__11009.cljs$lang$applyTo = (function (arglist__11031){
var elem = cljs.core.first(arglist__11031);
arglist__11031 = cljs.core.next(arglist__11031);
var classes = cljs.core.first(arglist__11031);
var more_classes = cljs.core.rest(arglist__11031);
return G__11009__delegate(elem,classes,more_classes);
});
G__11009.cljs$core$IFn$_invoke$arity$variadic = G__11009__delegate;
return G__11009;
})()
;
add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return add_class_BANG___2.call(this,elem,classes);
default:
return add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
add_class_BANG_.cljs$lang$maxFixedArity = 2;
add_class_BANG_.cljs$lang$applyTo = add_class_BANG___3.cljs$lang$applyTo;
add_class_BANG_.cljs$core$IFn$_invoke$arity$2 = add_class_BANG___2;
add_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return add_class_BANG_;
})()
;
dommy.attrs.remove_class_str = (function remove_class_str(init_class_name,class$){var class_name = init_class_name;while(true){
var class_len = class_name.length;var temp__4124__auto__ = dommy.attrs.class_index.call(null,class_name,class$);if(cljs.core.truth_(temp__4124__auto__))
{var i = temp__4124__auto__;{
var G__11032 = (function (){var end = (i + class$.length);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1((((end < class_len))?(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name.substring(0,i))+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name.substr((end + 1)))):class_name.substring(0,(i - 1)))));
})();
class_name = G__11032;
continue;
}
} else
{return class_name;
}
break;
}
});
/**
* remove class from and returns `elem`
* @param {...*} var_args
*/
dommy.attrs.remove_class_BANG_ = (function() {
var remove_class_BANG_ = null;
var remove_class_BANG___2 = (function (elem,class$){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var class$__$1 = cljs.core.name.call(null,class$);var temp__4124__auto___11041 = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto___11041))
{var class_list_11042 = temp__4124__auto___11041;class_list_11042.remove(class$__$1);
} else
{var class_name_11043 = elem__$1.className;var new_class_name_11044 = dommy.attrs.remove_class_str.call(null,class_name_11043,class$__$1);if((class_name_11043 === new_class_name_11044))
{} else
{elem__$1.className = new_class_name_11044;
}
}
return elem__$1;
});
var remove_class_BANG___3 = (function() { 
var G__11045__delegate = function (elem,class$,classes){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var seq__11037 = cljs.core.seq.call(null,cljs.core.conj.call(null,classes,class$));var chunk__11038 = null;var count__11039 = 0;var i__11040 = 0;while(true){
if((i__11040 < count__11039))
{var c = cljs.core._nth.call(null,chunk__11038,i__11040);remove_class_BANG_.call(null,elem__$1,c);
{
var G__11046 = seq__11037;
var G__11047 = chunk__11038;
var G__11048 = count__11039;
var G__11049 = (i__11040 + 1);
seq__11037 = G__11046;
chunk__11038 = G__11047;
count__11039 = G__11048;
i__11040 = G__11049;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__11037);if(temp__4126__auto__)
{var seq__11037__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11037__$1))
{var c__4297__auto__ = cljs.core.chunk_first.call(null,seq__11037__$1);{
var G__11050 = cljs.core.chunk_rest.call(null,seq__11037__$1);
var G__11051 = c__4297__auto__;
var G__11052 = cljs.core.count.call(null,c__4297__auto__);
var G__11053 = 0;
seq__11037 = G__11050;
chunk__11038 = G__11051;
count__11039 = G__11052;
i__11040 = G__11053;
continue;
}
} else
{var c = cljs.core.first.call(null,seq__11037__$1);remove_class_BANG_.call(null,elem__$1,c);
{
var G__11054 = cljs.core.next.call(null,seq__11037__$1);
var G__11055 = null;
var G__11056 = 0;
var G__11057 = 0;
seq__11037 = G__11054;
chunk__11038 = G__11055;
count__11039 = G__11056;
i__11040 = G__11057;
continue;
}
}
} else
{return null;
}
}
break;
}
};
var G__11045 = function (elem,class$,var_args){
var classes = null;if (arguments.length > 2) {
  classes = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__11045__delegate.call(this,elem,class$,classes);};
G__11045.cljs$lang$maxFixedArity = 2;
G__11045.cljs$lang$applyTo = (function (arglist__11058){
var elem = cljs.core.first(arglist__11058);
arglist__11058 = cljs.core.next(arglist__11058);
var class$ = cljs.core.first(arglist__11058);
var classes = cljs.core.rest(arglist__11058);
return G__11045__delegate(elem,class$,classes);
});
G__11045.cljs$core$IFn$_invoke$arity$variadic = G__11045__delegate;
return G__11045;
})()
;
remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return remove_class_BANG___2.call(this,elem,class$);
default:
return remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_class_BANG_.cljs$lang$maxFixedArity = 2;
remove_class_BANG_.cljs$lang$applyTo = remove_class_BANG___3.cljs$lang$applyTo;
remove_class_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_class_BANG___2;
remove_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return remove_class_BANG_;
})()
;
/**
* (toggle-class! elem class) will add-class! if elem does not have class
* and remove-class! otherwise.
* (toggle-class! elem class add?) will add-class! if add? is truthy,
* otherwise it will remove-class!
*/
dommy.attrs.toggle_class_BANG_ = (function() {
var toggle_class_BANG_ = null;
var toggle_class_BANG___2 = (function (elem,class$){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var class$__$1 = cljs.core.name.call(null,class$);var temp__4124__auto___11059 = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto___11059))
{var class_list_11060 = temp__4124__auto___11059;class_list_11060.toggle(class$__$1);
} else
{toggle_class_BANG_.call(null,elem__$1,class$__$1,!(dommy.attrs.has_class_QMARK_.call(null,elem__$1,class$__$1)));
}
return elem__$1;
});
var toggle_class_BANG___3 = (function (elem,class$,add_QMARK_){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);if(add_QMARK_)
{dommy.attrs.add_class_BANG_.call(null,elem__$1,class$);
} else
{dommy.attrs.remove_class_BANG_.call(null,elem__$1,class$);
}
return elem__$1;
});
toggle_class_BANG_ = function(elem,class$,add_QMARK_){
switch(arguments.length){
case 2:
return toggle_class_BANG___2.call(this,elem,class$);
case 3:
return toggle_class_BANG___3.call(this,elem,class$,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_class_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_class_BANG___2;
toggle_class_BANG_.cljs$core$IFn$_invoke$arity$3 = toggle_class_BANG___3;
return toggle_class_BANG_;
})()
;
dommy.attrs.style_str = (function style_str(x){if(typeof x === 'string')
{return x;
} else
{return clojure.string.join.call(null," ",cljs.core.map.call(null,(function (p__11063){var vec__11064 = p__11063;var k = cljs.core.nth.call(null,vec__11064,0,null);var v = cljs.core.nth.call(null,vec__11064,1,null);return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,k))+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,v))+";");
}),x));
}
});
/**
* @param {...*} var_args
*/
dommy.attrs.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (elem,kvs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,kvs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null))))))));
}
var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var style = elem__$1.style;var seq__11071_11077 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,kvs));var chunk__11072_11078 = null;var count__11073_11079 = 0;var i__11074_11080 = 0;while(true){
if((i__11074_11080 < count__11073_11079))
{var vec__11075_11081 = cljs.core._nth.call(null,chunk__11072_11078,i__11074_11080);var k_11082 = cljs.core.nth.call(null,vec__11075_11081,0,null);var v_11083 = cljs.core.nth.call(null,vec__11075_11081,1,null);(style[cljs.core.name.call(null,k_11082)] = v_11083);
{
var G__11084 = seq__11071_11077;
var G__11085 = chunk__11072_11078;
var G__11086 = count__11073_11079;
var G__11087 = (i__11074_11080 + 1);
seq__11071_11077 = G__11084;
chunk__11072_11078 = G__11085;
count__11073_11079 = G__11086;
i__11074_11080 = G__11087;
continue;
}
} else
{var temp__4126__auto___11088 = cljs.core.seq.call(null,seq__11071_11077);if(temp__4126__auto___11088)
{var seq__11071_11089__$1 = temp__4126__auto___11088;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11071_11089__$1))
{var c__4297__auto___11090 = cljs.core.chunk_first.call(null,seq__11071_11089__$1);{
var G__11091 = cljs.core.chunk_rest.call(null,seq__11071_11089__$1);
var G__11092 = c__4297__auto___11090;
var G__11093 = cljs.core.count.call(null,c__4297__auto___11090);
var G__11094 = 0;
seq__11071_11077 = G__11091;
chunk__11072_11078 = G__11092;
count__11073_11079 = G__11093;
i__11074_11080 = G__11094;
continue;
}
} else
{var vec__11076_11095 = cljs.core.first.call(null,seq__11071_11089__$1);var k_11096 = cljs.core.nth.call(null,vec__11076_11095,0,null);var v_11097 = cljs.core.nth.call(null,vec__11076_11095,1,null);(style[cljs.core.name.call(null,k_11096)] = v_11097);
{
var G__11098 = cljs.core.next.call(null,seq__11071_11089__$1);
var G__11099 = null;
var G__11100 = 0;
var G__11101 = 0;
seq__11071_11077 = G__11098;
chunk__11072_11078 = G__11099;
count__11073_11079 = G__11100;
i__11074_11080 = G__11101;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var set_style_BANG_ = function (elem,var_args){
var kvs = null;if (arguments.length > 1) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_style_BANG___delegate.call(this,elem,kvs);};
set_style_BANG_.cljs$lang$maxFixedArity = 1;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__11102){
var elem = cljs.core.first(arglist__11102);
var kvs = cljs.core.rest(arglist__11102);
return set_style_BANG___delegate(elem,kvs);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
dommy.attrs.style = (function style(elem,k){if(cljs.core.truth_(k))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"k","k",-1640531420,null))))));
}
return (window.getComputedStyle(dommy.template.__GT_node_like.call(null,elem))[cljs.core.name.call(null,k)]);
});
/**
* @param {...*} var_args
*/
dommy.attrs.set_px_BANG_ = (function() { 
var set_px_BANG___delegate = function (elem,kvs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,kvs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null))))))));
}
var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var seq__11109_11115 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,kvs));var chunk__11110_11116 = null;var count__11111_11117 = 0;var i__11112_11118 = 0;while(true){
if((i__11112_11118 < count__11111_11117))
{var vec__11113_11119 = cljs.core._nth.call(null,chunk__11110_11116,i__11112_11118);var k_11120 = cljs.core.nth.call(null,vec__11113_11119,0,null);var v_11121 = cljs.core.nth.call(null,vec__11113_11119,1,null);dommy.attrs.set_style_BANG_.call(null,elem__$1,k_11120,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v_11121)+"px"));
{
var G__11122 = seq__11109_11115;
var G__11123 = chunk__11110_11116;
var G__11124 = count__11111_11117;
var G__11125 = (i__11112_11118 + 1);
seq__11109_11115 = G__11122;
chunk__11110_11116 = G__11123;
count__11111_11117 = G__11124;
i__11112_11118 = G__11125;
continue;
}
} else
{var temp__4126__auto___11126 = cljs.core.seq.call(null,seq__11109_11115);if(temp__4126__auto___11126)
{var seq__11109_11127__$1 = temp__4126__auto___11126;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11109_11127__$1))
{var c__4297__auto___11128 = cljs.core.chunk_first.call(null,seq__11109_11127__$1);{
var G__11129 = cljs.core.chunk_rest.call(null,seq__11109_11127__$1);
var G__11130 = c__4297__auto___11128;
var G__11131 = cljs.core.count.call(null,c__4297__auto___11128);
var G__11132 = 0;
seq__11109_11115 = G__11129;
chunk__11110_11116 = G__11130;
count__11111_11117 = G__11131;
i__11112_11118 = G__11132;
continue;
}
} else
{var vec__11114_11133 = cljs.core.first.call(null,seq__11109_11127__$1);var k_11134 = cljs.core.nth.call(null,vec__11114_11133,0,null);var v_11135 = cljs.core.nth.call(null,vec__11114_11133,1,null);dommy.attrs.set_style_BANG_.call(null,elem__$1,k_11134,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v_11135)+"px"));
{
var G__11136 = cljs.core.next.call(null,seq__11109_11127__$1);
var G__11137 = null;
var G__11138 = 0;
var G__11139 = 0;
seq__11109_11115 = G__11136;
chunk__11110_11116 = G__11137;
count__11111_11117 = G__11138;
i__11112_11118 = G__11139;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var set_px_BANG_ = function (elem,var_args){
var kvs = null;if (arguments.length > 1) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_px_BANG___delegate.call(this,elem,kvs);};
set_px_BANG_.cljs$lang$maxFixedArity = 1;
set_px_BANG_.cljs$lang$applyTo = (function (arglist__11140){
var elem = cljs.core.first(arglist__11140);
var kvs = cljs.core.rest(arglist__11140);
return set_px_BANG___delegate(elem,kvs);
});
set_px_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_px_BANG___delegate;
return set_px_BANG_;
})()
;
dommy.attrs.px = (function px(elem,k){var pixels = dommy.attrs.style.call(null,dommy.template.__GT_node_like.call(null,elem),k);if(cljs.core.seq.call(null,pixels))
{return parseInt(pixels);
} else
{return null;
}
});
/**
* Sets dom attributes on and returns `elem`.
* Attributes without values will be set to "true":
* 
* (set-attr! elem :disabled)
* 
* With values, the function takes variadic kv pairs:
* 
* (set-attr! elem :id "some-id"
* :name "some-name")
* @param {...*} var_args
*/
dommy.attrs.set_attr_BANG_ = (function() {
var set_attr_BANG_ = null;
var set_attr_BANG___2 = (function (elem,k){return set_attr_BANG_.call(null,dommy.template.__GT_node_like.call(null,elem),k,"true");
});
var set_attr_BANG___3 = (function (elem,k,v){if(cljs.core.truth_(v))
{if(cljs.core.fn_QMARK_.call(null,v))
{var G__11149 = dommy.template.__GT_node_like.call(null,elem);(G__11149[cljs.core.name.call(null,k)] = v);
return G__11149;
} else
{var G__11150 = dommy.template.__GT_node_like.call(null,elem);G__11150.setAttribute(cljs.core.name.call(null,k),(((k === new cljs.core.Keyword(null,"style","style",1123684643)))?dommy.attrs.style_str.call(null,v):v));
return G__11150;
}
} else
{return null;
}
});
var set_attr_BANG___4 = (function() { 
var G__11157__delegate = function (elem,k,v,kvs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,kvs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null))))))));
}
var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var seq__11151_11158 = cljs.core.seq.call(null,cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.call(null,2,kvs)));var chunk__11152_11159 = null;var count__11153_11160 = 0;var i__11154_11161 = 0;while(true){
if((i__11154_11161 < count__11153_11160))
{var vec__11155_11162 = cljs.core._nth.call(null,chunk__11152_11159,i__11154_11161);var k_11163__$1 = cljs.core.nth.call(null,vec__11155_11162,0,null);var v_11164__$1 = cljs.core.nth.call(null,vec__11155_11162,1,null);set_attr_BANG_.call(null,elem__$1,k_11163__$1,v_11164__$1);
{
var G__11165 = seq__11151_11158;
var G__11166 = chunk__11152_11159;
var G__11167 = count__11153_11160;
var G__11168 = (i__11154_11161 + 1);
seq__11151_11158 = G__11165;
chunk__11152_11159 = G__11166;
count__11153_11160 = G__11167;
i__11154_11161 = G__11168;
continue;
}
} else
{var temp__4126__auto___11169 = cljs.core.seq.call(null,seq__11151_11158);if(temp__4126__auto___11169)
{var seq__11151_11170__$1 = temp__4126__auto___11169;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11151_11170__$1))
{var c__4297__auto___11171 = cljs.core.chunk_first.call(null,seq__11151_11170__$1);{
var G__11172 = cljs.core.chunk_rest.call(null,seq__11151_11170__$1);
var G__11173 = c__4297__auto___11171;
var G__11174 = cljs.core.count.call(null,c__4297__auto___11171);
var G__11175 = 0;
seq__11151_11158 = G__11172;
chunk__11152_11159 = G__11173;
count__11153_11160 = G__11174;
i__11154_11161 = G__11175;
continue;
}
} else
{var vec__11156_11176 = cljs.core.first.call(null,seq__11151_11170__$1);var k_11177__$1 = cljs.core.nth.call(null,vec__11156_11176,0,null);var v_11178__$1 = cljs.core.nth.call(null,vec__11156_11176,1,null);set_attr_BANG_.call(null,elem__$1,k_11177__$1,v_11178__$1);
{
var G__11179 = cljs.core.next.call(null,seq__11151_11170__$1);
var G__11180 = null;
var G__11181 = 0;
var G__11182 = 0;
seq__11151_11158 = G__11179;
chunk__11152_11159 = G__11180;
count__11153_11160 = G__11181;
i__11154_11161 = G__11182;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var G__11157 = function (elem,k,v,var_args){
var kvs = null;if (arguments.length > 3) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return G__11157__delegate.call(this,elem,k,v,kvs);};
G__11157.cljs$lang$maxFixedArity = 3;
G__11157.cljs$lang$applyTo = (function (arglist__11183){
var elem = cljs.core.first(arglist__11183);
arglist__11183 = cljs.core.next(arglist__11183);
var k = cljs.core.first(arglist__11183);
arglist__11183 = cljs.core.next(arglist__11183);
var v = cljs.core.first(arglist__11183);
var kvs = cljs.core.rest(arglist__11183);
return G__11157__delegate(elem,k,v,kvs);
});
G__11157.cljs$core$IFn$_invoke$arity$variadic = G__11157__delegate;
return G__11157;
})()
;
set_attr_BANG_ = function(elem,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 2:
return set_attr_BANG___2.call(this,elem,k);
case 3:
return set_attr_BANG___3.call(this,elem,k,v);
default:
return set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, cljs.core.array_seq(arguments, 3));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
set_attr_BANG_.cljs$lang$maxFixedArity = 3;
set_attr_BANG_.cljs$lang$applyTo = set_attr_BANG___4.cljs$lang$applyTo;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = set_attr_BANG___2;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = set_attr_BANG___3;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic;
return set_attr_BANG_;
})()
;
/**
* @param {...*} var_args
*/
dommy.attrs.remove_attr_BANG_ = (function() {
var remove_attr_BANG_ = null;
var remove_attr_BANG___2 = (function (elem,k){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",1108647146),null,new cljs.core.Keyword(null,"classes","classes",1867525016),null], null), null).call(null,k)))
{elem__$1.className = "";
} else
{elem__$1.removeAttribute(cljs.core.name.call(null,k));
}
return elem__$1;
});
var remove_attr_BANG___3 = (function() { 
var G__11192__delegate = function (elem,k,ks){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var seq__11188_11193 = cljs.core.seq.call(null,cljs.core.cons.call(null,k,ks));var chunk__11189_11194 = null;var count__11190_11195 = 0;var i__11191_11196 = 0;while(true){
if((i__11191_11196 < count__11190_11195))
{var k_11197__$1 = cljs.core._nth.call(null,chunk__11189_11194,i__11191_11196);remove_attr_BANG_.call(null,elem__$1,k_11197__$1);
{
var G__11198 = seq__11188_11193;
var G__11199 = chunk__11189_11194;
var G__11200 = count__11190_11195;
var G__11201 = (i__11191_11196 + 1);
seq__11188_11193 = G__11198;
chunk__11189_11194 = G__11199;
count__11190_11195 = G__11200;
i__11191_11196 = G__11201;
continue;
}
} else
{var temp__4126__auto___11202 = cljs.core.seq.call(null,seq__11188_11193);if(temp__4126__auto___11202)
{var seq__11188_11203__$1 = temp__4126__auto___11202;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11188_11203__$1))
{var c__4297__auto___11204 = cljs.core.chunk_first.call(null,seq__11188_11203__$1);{
var G__11205 = cljs.core.chunk_rest.call(null,seq__11188_11203__$1);
var G__11206 = c__4297__auto___11204;
var G__11207 = cljs.core.count.call(null,c__4297__auto___11204);
var G__11208 = 0;
seq__11188_11193 = G__11205;
chunk__11189_11194 = G__11206;
count__11190_11195 = G__11207;
i__11191_11196 = G__11208;
continue;
}
} else
{var k_11209__$1 = cljs.core.first.call(null,seq__11188_11203__$1);remove_attr_BANG_.call(null,elem__$1,k_11209__$1);
{
var G__11210 = cljs.core.next.call(null,seq__11188_11203__$1);
var G__11211 = null;
var G__11212 = 0;
var G__11213 = 0;
seq__11188_11193 = G__11210;
chunk__11189_11194 = G__11211;
count__11190_11195 = G__11212;
i__11191_11196 = G__11213;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var G__11192 = function (elem,k,var_args){
var ks = null;if (arguments.length > 2) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__11192__delegate.call(this,elem,k,ks);};
G__11192.cljs$lang$maxFixedArity = 2;
G__11192.cljs$lang$applyTo = (function (arglist__11214){
var elem = cljs.core.first(arglist__11214);
arglist__11214 = cljs.core.next(arglist__11214);
var k = cljs.core.first(arglist__11214);
var ks = cljs.core.rest(arglist__11214);
return G__11192__delegate(elem,k,ks);
});
G__11192.cljs$core$IFn$_invoke$arity$variadic = G__11192__delegate;
return G__11192;
})()
;
remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return remove_attr_BANG___2.call(this,elem,k);
default:
return remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_attr_BANG_.cljs$lang$maxFixedArity = 2;
remove_attr_BANG_.cljs$lang$applyTo = remove_attr_BANG___3.cljs$lang$applyTo;
remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_attr_BANG___2;
remove_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return remove_attr_BANG_;
})()
;
dommy.attrs.attr = (function attr(elem,k){if(cljs.core.truth_(k))
{return dommy.template.__GT_node_like.call(null,elem).getAttribute(cljs.core.name.call(null,k));
} else
{return null;
}
});
dommy.attrs.toggle_attr_BANG_ = (function() {
var toggle_attr_BANG_ = null;
var toggle_attr_BANG___2 = (function (elem,k){return toggle_attr_BANG_.call(null,elem,k,cljs.core.boolean$.call(null,dommy.attrs.attr.call(null,elem,k)));
});
var toggle_attr_BANG___3 = (function (elem,k,add_QMARK_){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);if(add_QMARK_)
{return dommy.attrs.set_attr_BANG_.call(null,elem__$1,k);
} else
{return dommy.attrs.remove_attr_BANG_.call(null,elem__$1,k);
}
});
toggle_attr_BANG_ = function(elem,k,add_QMARK_){
switch(arguments.length){
case 2:
return toggle_attr_BANG___2.call(this,elem,k);
case 3:
return toggle_attr_BANG___3.call(this,elem,k,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_attr_BANG___2;
toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = toggle_attr_BANG___3;
return toggle_attr_BANG_;
})()
;
dommy.attrs.hidden_QMARK_ = (function hidden_QMARK_(elem){return ("none" === dommy.template.__GT_node_like.call(null,elem).style.display);
});
/**
* Display or hide the given `elem`. Takes an optional boolean `show?`
* indicating whether to show or hide `elem`.
*/
dommy.attrs.toggle_BANG_ = (function() {
var toggle_BANG_ = null;
var toggle_BANG___1 = (function (elem){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);toggle_BANG_.call(null,elem__$1,dommy.attrs.hidden_QMARK_.call(null,elem__$1));
return elem__$1;
});
var toggle_BANG___2 = (function (elem,show_QMARK_){var G__11216 = dommy.template.__GT_node_like.call(null,elem);G__11216.style.display = ((show_QMARK_)?"":"none");
return G__11216;
});
toggle_BANG_ = function(elem,show_QMARK_){
switch(arguments.length){
case 1:
return toggle_BANG___1.call(this,elem);
case 2:
return toggle_BANG___2.call(this,elem,show_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_BANG_.cljs$core$IFn$_invoke$arity$1 = toggle_BANG___1;
toggle_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_BANG___2;
return toggle_BANG_;
})()
;
dommy.attrs.hide_BANG_ = (function hide_BANG_(elem){var G__11218 = dommy.template.__GT_node_like.call(null,elem);dommy.attrs.toggle_BANG_.call(null,G__11218,false);
return G__11218;
});
dommy.attrs.show_BANG_ = (function show_BANG_(elem){var G__11220 = dommy.template.__GT_node_like.call(null,elem);dommy.attrs.toggle_BANG_.call(null,G__11220,true);
return G__11220;
});
/**
* Returns a map of the bounding client rect of `elem`
* as a map with [:top :left :right :bottom :width :height]
*/
dommy.attrs.bounding_client_rect = (function bounding_client_rect(elem){return cljs.core.js__GT_clj.call(null,(function (){var G__11222 = dommy.template.__GT_node_like.call(null,elem).getBoundingClientRect();(G__11222["constructor"] = Object);
return G__11222;
})(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true);
});
dommy.attrs.scroll_into_view = (function scroll_into_view(elem,align_with_top_QMARK_){var elem__$1 = dommy.template.__GT_node_like.call(null,elem);var top = new cljs.core.Keyword(null,"top","top",1014019271).cljs$core$IFn$_invoke$arity$1(dommy.attrs.bounding_client_rect.call(null,elem__$1));if((window.innerHeight < (top + elem__$1.offsetHeight)))
{return elem__$1.scrollIntoView(align_with_top_QMARK_);
} else
{return null;
}
});

//# sourceMappingURL=attrs.js.map