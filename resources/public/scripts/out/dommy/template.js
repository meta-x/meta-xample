// Compiled by ClojureScript 0.0-2227
goog.provide('dommy.template');
goog.require('cljs.core');
goog.require('dommy.attrs');
goog.require('dommy.attrs');
goog.require('clojure.string');
goog.require('clojure.string');
dommy.template._PLUS_svg_ns_PLUS_ = "http://www.w3.org/2000/svg";
dommy.template._PLUS_svg_tags_PLUS_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["svg",null,"line",null], null), null);
dommy.template.PElement = (function (){var obj11619 = {};return obj11619;
})();
dommy.template._elem = (function _elem(this$){if((function (){var and__3529__auto__ = this$;if(and__3529__auto__)
{return this$.dommy$template$PElement$_elem$arity$1;
} else
{return and__3529__auto__;
}
})())
{return this$.dommy$template$PElement$_elem$arity$1(this$);
} else
{var x__4168__auto__ = (((this$ == null))?null:this$);return (function (){var or__3541__auto__ = (dommy.template._elem[goog.typeOf(x__4168__auto__)]);if(or__3541__auto__)
{return or__3541__auto__;
} else
{var or__3541__auto____$1 = (dommy.template._elem["_"]);if(or__3541__auto____$1)
{return or__3541__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"PElement.-elem",this$);
}
}
})().call(null,this$);
}
});
/**
* index of css character (#,.) in base-element. bottleneck
*/
dommy.template.next_css_index = (function next_css_index(s,start_idx){var id_idx = s.indexOf("#",start_idx);var class_idx = s.indexOf(".",start_idx);var idx = Math.min(id_idx,class_idx);if((idx < 0))
{return Math.max(id_idx,class_idx);
} else
{return idx;
}
});
/**
* dom element from css-style keyword like :a.class1 or :span#my-span.class
*/
dommy.template.base_element = (function base_element(node_key){var node_str = cljs.core.name.call(null,node_key);var base_idx = dommy.template.next_css_index.call(null,node_str,0);var tag = (((base_idx > 0))?node_str.substring(0,base_idx):(((base_idx === 0))?"div":((new cljs.core.Keyword(null,"else","else",1017020587))?node_str:null)));var node = (cljs.core.truth_(dommy.template._PLUS_svg_tags_PLUS_.call(null,tag))?document.createElementNS(dommy.template._PLUS_svg_ns_PLUS_,tag):document.createElement(tag));if((base_idx >= 0))
{var str_11622 = node_str.substring(base_idx);while(true){
var next_idx_11623 = dommy.template.next_css_index.call(null,str_11622,1);var frag_11624 = (((next_idx_11623 >= 0))?str_11622.substring(0,next_idx_11623):str_11622);var G__11621_11625 = frag_11624.charAt(0);if(cljs.core._EQ_.call(null,"#",G__11621_11625))
{node.setAttribute("id",frag_11624.substring(1));
} else
{if(cljs.core._EQ_.call(null,".",G__11621_11625))
{dommy.attrs.add_class_BANG_.call(null,node,frag_11624.substring(1));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(frag_11624.charAt(0)))));
} else
{}
}
}
if((next_idx_11623 >= 0))
{{
var G__11626 = str_11622.substring(next_idx_11623);
str_11622 = G__11626;
continue;
}
} else
{}
break;
}
} else
{}
return node;
});
dommy.template.throw_unable_to_make_node = (function throw_unable_to_make_node(node_data){throw ("Don't know how to make node from: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,node_data)));
});
/**
* take data and return a document fragment
*/
dommy.template.__GT_document_fragment = (function() {
var __GT_document_fragment = null;
var __GT_document_fragment__1 = (function (data){return __GT_document_fragment.call(null,document.createDocumentFragment(),data);
});
var __GT_document_fragment__2 = (function (result_frag,data){if((function (){var G__11632 = data;if(G__11632)
{var bit__4191__auto__ = null;if(cljs.core.truth_((function (){var or__3541__auto__ = bit__4191__auto__;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return G__11632.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__11632.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11632);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11632);
}
})())
{result_frag.appendChild(dommy.template._elem.call(null,data));
return result_frag;
} else
{if(cljs.core.seq_QMARK_.call(null,data))
{var seq__11633_11637 = cljs.core.seq.call(null,data);var chunk__11634_11638 = null;var count__11635_11639 = 0;var i__11636_11640 = 0;while(true){
if((i__11636_11640 < count__11635_11639))
{var child_11641 = cljs.core._nth.call(null,chunk__11634_11638,i__11636_11640);__GT_document_fragment.call(null,result_frag,child_11641);
{
var G__11642 = seq__11633_11637;
var G__11643 = chunk__11634_11638;
var G__11644 = count__11635_11639;
var G__11645 = (i__11636_11640 + 1);
seq__11633_11637 = G__11642;
chunk__11634_11638 = G__11643;
count__11635_11639 = G__11644;
i__11636_11640 = G__11645;
continue;
}
} else
{var temp__4126__auto___11646 = cljs.core.seq.call(null,seq__11633_11637);if(temp__4126__auto___11646)
{var seq__11633_11647__$1 = temp__4126__auto___11646;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11633_11647__$1))
{var c__4297__auto___11648 = cljs.core.chunk_first.call(null,seq__11633_11647__$1);{
var G__11649 = cljs.core.chunk_rest.call(null,seq__11633_11647__$1);
var G__11650 = c__4297__auto___11648;
var G__11651 = cljs.core.count.call(null,c__4297__auto___11648);
var G__11652 = 0;
seq__11633_11637 = G__11649;
chunk__11634_11638 = G__11650;
count__11635_11639 = G__11651;
i__11636_11640 = G__11652;
continue;
}
} else
{var child_11653 = cljs.core.first.call(null,seq__11633_11647__$1);__GT_document_fragment.call(null,result_frag,child_11653);
{
var G__11654 = cljs.core.next.call(null,seq__11633_11647__$1);
var G__11655 = null;
var G__11656 = 0;
var G__11657 = 0;
seq__11633_11637 = G__11654;
chunk__11634_11638 = G__11655;
count__11635_11639 = G__11656;
i__11636_11640 = G__11657;
continue;
}
}
} else
{}
}
break;
}
return result_frag;
} else
{if((data == null))
{return result_frag;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return dommy.template.throw_unable_to_make_node.call(null,data);
} else
{return null;
}
}
}
}
});
__GT_document_fragment = function(result_frag,data){
switch(arguments.length){
case 1:
return __GT_document_fragment__1.call(this,result_frag);
case 2:
return __GT_document_fragment__2.call(this,result_frag,data);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
__GT_document_fragment.cljs$core$IFn$_invoke$arity$1 = __GT_document_fragment__1;
__GT_document_fragment.cljs$core$IFn$_invoke$arity$2 = __GT_document_fragment__2;
return __GT_document_fragment;
})()
;
/**
* take data and return DOM node if it satisfies PElement and tries to
* make a document fragment otherwise
*/
dommy.template.__GT_node_like = (function __GT_node_like(data){if((function (){var G__11659 = data;if(G__11659)
{var bit__4191__auto__ = null;if(cljs.core.truth_((function (){var or__3541__auto__ = bit__4191__auto__;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return G__11659.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__11659.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11659);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11659);
}
})())
{return dommy.template._elem.call(null,data);
} else
{return dommy.template.__GT_document_fragment.call(null,data);
}
});
/**
* element with either attrs or nested children [:div [:span "Hello"]]
*/
dommy.template.compound_element = (function compound_element(p__11660){var vec__11680 = p__11660;var tag_name = cljs.core.nth.call(null,vec__11680,0,null);var maybe_attrs = cljs.core.nth.call(null,vec__11680,1,null);var children = cljs.core.nthnext.call(null,vec__11680,2);var n = dommy.template.base_element.call(null,tag_name);var attrs = (((cljs.core.map_QMARK_.call(null,maybe_attrs)) && (!((function (){var G__11682 = maybe_attrs;if(G__11682)
{var bit__4191__auto__ = null;if(cljs.core.truth_((function (){var or__3541__auto__ = bit__4191__auto__;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return G__11682.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__11682.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11682);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11682);
}
})())))?maybe_attrs:null);var children__$1 = (cljs.core.truth_(attrs)?children:cljs.core.cons.call(null,maybe_attrs,children));var seq__11683_11699 = cljs.core.seq.call(null,attrs);var chunk__11684_11700 = null;var count__11685_11701 = 0;var i__11686_11702 = 0;while(true){
if((i__11686_11702 < count__11685_11701))
{var vec__11687_11703 = cljs.core._nth.call(null,chunk__11684_11700,i__11686_11702);var k_11704 = cljs.core.nth.call(null,vec__11687_11703,0,null);var v_11705 = cljs.core.nth.call(null,vec__11687_11703,1,null);var G__11688_11706 = (((k_11704 instanceof cljs.core.Keyword))?k_11704.fqn:null);var caseval__11707;
switch (G__11688_11706){
case "classes":
(function (){var seq__11689 = cljs.core.seq.call(null,v_11705);var chunk__11690 = null;var count__11691 = 0;var i__11692 = 0;while(true){
if((i__11692 < count__11691))
{var c = cljs.core._nth.call(null,chunk__11690,i__11692);dommy.attrs.add_class_BANG_.call(null,n,c);
{
var G__11708 = seq__11689;
var G__11709 = chunk__11690;
var G__11710 = count__11691;
var G__11711 = (i__11692 + 1);
seq__11689 = G__11708;
chunk__11690 = G__11709;
count__11691 = G__11710;
i__11692 = G__11711;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__11689);if(temp__4126__auto__)
{var seq__11689__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11689__$1))
{var c__4297__auto__ = cljs.core.chunk_first.call(null,seq__11689__$1);{
var G__11712 = cljs.core.chunk_rest.call(null,seq__11689__$1);
var G__11713 = c__4297__auto__;
var G__11714 = cljs.core.count.call(null,c__4297__auto__);
var G__11715 = 0;
seq__11689 = G__11712;
chunk__11690 = G__11713;
count__11691 = G__11714;
i__11692 = G__11715;
continue;
}
} else
{var c = cljs.core.first.call(null,seq__11689__$1);dommy.attrs.add_class_BANG_.call(null,n,c);
{
var G__11716 = cljs.core.next.call(null,seq__11689__$1);
var G__11717 = null;
var G__11718 = 0;
var G__11719 = 0;
seq__11689 = G__11716;
chunk__11690 = G__11717;
count__11691 = G__11718;
i__11692 = G__11719;
continue;
}
}
} else
{return null;
}
}
break;
}
})()
break;
case "class":
dommy.attrs.add_class_BANG_.call(null,n,v_11705)
break;
default:
dommy.attrs.set_attr_BANG_.call(null,n,k_11704,v_11705)
}
{
var G__11720 = seq__11683_11699;
var G__11721 = chunk__11684_11700;
var G__11722 = count__11685_11701;
var G__11723 = (i__11686_11702 + 1);
seq__11683_11699 = G__11720;
chunk__11684_11700 = G__11721;
count__11685_11701 = G__11722;
i__11686_11702 = G__11723;
continue;
}
} else
{var temp__4126__auto___11724 = cljs.core.seq.call(null,seq__11683_11699);if(temp__4126__auto___11724)
{var seq__11683_11725__$1 = temp__4126__auto___11724;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11683_11725__$1))
{var c__4297__auto___11726 = cljs.core.chunk_first.call(null,seq__11683_11725__$1);{
var G__11727 = cljs.core.chunk_rest.call(null,seq__11683_11725__$1);
var G__11728 = c__4297__auto___11726;
var G__11729 = cljs.core.count.call(null,c__4297__auto___11726);
var G__11730 = 0;
seq__11683_11699 = G__11727;
chunk__11684_11700 = G__11728;
count__11685_11701 = G__11729;
i__11686_11702 = G__11730;
continue;
}
} else
{var vec__11693_11731 = cljs.core.first.call(null,seq__11683_11725__$1);var k_11732 = cljs.core.nth.call(null,vec__11693_11731,0,null);var v_11733 = cljs.core.nth.call(null,vec__11693_11731,1,null);var G__11694_11734 = (((k_11732 instanceof cljs.core.Keyword))?k_11732.fqn:null);var caseval__11735;
switch (G__11694_11734){
case "classes":
(function (){var seq__11695 = cljs.core.seq.call(null,v_11733);var chunk__11696 = null;var count__11697 = 0;var i__11698 = 0;while(true){
if((i__11698 < count__11697))
{var c = cljs.core._nth.call(null,chunk__11696,i__11698);dommy.attrs.add_class_BANG_.call(null,n,c);
{
var G__11736 = seq__11695;
var G__11737 = chunk__11696;
var G__11738 = count__11697;
var G__11739 = (i__11698 + 1);
seq__11695 = G__11736;
chunk__11696 = G__11737;
count__11697 = G__11738;
i__11698 = G__11739;
continue;
}
} else
{var temp__4126__auto____$1 = cljs.core.seq.call(null,seq__11695);if(temp__4126__auto____$1)
{var seq__11695__$1 = temp__4126__auto____$1;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11695__$1))
{var c__4297__auto__ = cljs.core.chunk_first.call(null,seq__11695__$1);{
var G__11740 = cljs.core.chunk_rest.call(null,seq__11695__$1);
var G__11741 = c__4297__auto__;
var G__11742 = cljs.core.count.call(null,c__4297__auto__);
var G__11743 = 0;
seq__11695 = G__11740;
chunk__11696 = G__11741;
count__11697 = G__11742;
i__11698 = G__11743;
continue;
}
} else
{var c = cljs.core.first.call(null,seq__11695__$1);dommy.attrs.add_class_BANG_.call(null,n,c);
{
var G__11744 = cljs.core.next.call(null,seq__11695__$1);
var G__11745 = null;
var G__11746 = 0;
var G__11747 = 0;
seq__11695 = G__11744;
chunk__11696 = G__11745;
count__11697 = G__11746;
i__11698 = G__11747;
continue;
}
}
} else
{return null;
}
}
break;
}
})()
break;
case "class":
dommy.attrs.add_class_BANG_.call(null,n,v_11733)
break;
default:
dommy.attrs.set_attr_BANG_.call(null,n,k_11732,v_11733)
}
{
var G__11748 = cljs.core.next.call(null,seq__11683_11725__$1);
var G__11749 = null;
var G__11750 = 0;
var G__11751 = 0;
seq__11683_11699 = G__11748;
chunk__11684_11700 = G__11749;
count__11685_11701 = G__11750;
i__11686_11702 = G__11751;
continue;
}
}
} else
{}
}
break;
}
n.appendChild(dommy.template.__GT_node_like.call(null,children__$1));
return n;
});
(dommy.template.PElement["string"] = true);
(dommy.template._elem["string"] = (function (this$){if((this$ instanceof cljs.core.Keyword))
{return dommy.template.base_element.call(null,this$);
} else
{return document.createTextNode((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$)));
}
}));
(dommy.template.PElement["number"] = true);
(dommy.template._elem["number"] = (function (this$){return document.createTextNode((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$)));
}));
cljs.core.PersistentVector.prototype.dommy$template$PElement$ = true;
cljs.core.PersistentVector.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return dommy.template.compound_element.call(null,this$__$1);
});
SVGElement.prototype.dommy$template$PElement$ = true;
SVGElement.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
Document.prototype.dommy$template$PElement$ = true;
Document.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
Text.prototype.dommy$template$PElement$ = true;
Text.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
DocumentFragment.prototype.dommy$template$PElement$ = true;
DocumentFragment.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
HTMLElement.prototype.dommy$template$PElement$ = true;
HTMLElement.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
try{Window.prototype.dommy$template$PElement$ = true;
Window.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
}catch (e11752){if((e11752 instanceof ReferenceError))
{var __11753 = e11752;console.log("PElement: js/Window not defined by browser, skipping it... (running on phantomjs?)");
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11752;
} else
{}
}
}dommy.template.node = (function node(data){if((function (){var G__11755 = data;if(G__11755)
{var bit__4191__auto__ = null;if(cljs.core.truth_((function (){var or__3541__auto__ = bit__4191__auto__;if(cljs.core.truth_(or__3541__auto__))
{return or__3541__auto__;
} else
{return G__11755.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__11755.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11755);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,dommy.template.PElement,G__11755);
}
})())
{return dommy.template._elem.call(null,data);
} else
{return dommy.template.throw_unable_to_make_node.call(null,data);
}
});
dommy.template.html__GT_nodes = (function html__GT_nodes(html){var parent = document.createElement("div");parent.insertAdjacentHTML("beforeend",html);
return cljs.core.seq.call(null,Array.prototype.slice.call(parent.childNodes));
});

//# sourceMappingURL=template.js.map