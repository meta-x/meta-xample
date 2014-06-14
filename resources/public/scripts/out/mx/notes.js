// Compiled by ClojureScript 0.0-2227
goog.provide('mx.notes');
goog.require('cljs.core');
goog.require('dommy.attrs');
goog.require('dommy.core');
goog.require('ajax.core');
goog.require('ajax.core');
goog.require('dommy.attrs');
goog.require('dommy.core');
cljs.core.enable_console_print_BANG_.call(null);
cljs.core.println.call(null,"Hello world! I'm in notes.cljs");
mx.notes.next_visibility = (function next_visibility(vis_elem){var G__6437 = dommy.core.text.call(null,vis_elem);var caseval__6438;
switch (G__6437){
case "private":
caseval__6438="public"
break;
case "public":
caseval__6438="private"
break;
default:
caseval__6438=(function(){throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(dommy.core.text.call(null,vis_elem)))))})()
}
return caseval__6438;
});
mx.notes.toggle_visibility = (function toggle_visibility(vis_elem){return dommy.core.set_text_BANG_.call(null,vis_elem,mx.notes.next_visibility.call(null,vis_elem));
});
mx.notes.sign_out = (function sign_out(evt){var user_id = localStorage.getItem(new cljs.core.Keyword(null,"user-id","user-id",866723279));var url = ("/user/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(user_id));return ajax.core.DELETE.call(null,url,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"handler","handler",1706707644),((function (user_id,url){
return (function (){return cljs.core.println.call(null,"yay");
});})(user_id,url))
], null));
});
dommy.core.listen_BANG_.call(null,document.getElementById("sign-out"),new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.sign_out);
mx.notes.change_new_note_visibility = (function change_new_note_visibility(){return mx.notes.toggle_visibility.call(null,document.getElementById("visibility-btn"));
});
dommy.core.listen_BANG_.call(null,document.getElementById("visibility-btn"),new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.change_new_note_visibility);
mx.notes.change_visibility = (function change_visibility(target){var elem = cljs.core.js__GT_clj.call(null,target.currentTarget);var parent = elem.parentNode;var new_vis = mx.notes.next_visibility.call(null,elem);return ajax.core.PUT.call(null,("/note/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(dommy.attrs.attr.call(null,parent,new cljs.core.Keyword(null,"data-id","data-id",2457051536)))),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"visibility","visibility",2955236996),new_vis], null),new cljs.core.Keyword(null,"handler","handler",1706707644),((function (elem,parent,new_vis){
return (function (){return dommy.core.set_text_BANG_.call(null,elem,new_vis);
});})(elem,parent,new_vis))
,new cljs.core.Keyword(null,"error-handler","error-handler",1866823671),((function (elem,parent,new_vis){
return (function (p1__6439_SHARP_){return cljs.core.println.call(null,p1__6439_SHARP_);
});})(elem,parent,new_vis))
,new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"raw","raw",1014016922)], null));
});
mx.notes.delete_note = (function delete_note(target){var elem = cljs.core.js__GT_clj.call(null,target.currentTarget);var parent = elem.parentNode;return ajax.core.DELETE.call(null,("/note/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(dommy.attrs.attr.call(null,parent,new cljs.core.Keyword(null,"data-id","data-id",2457051536)))),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",4313443576),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"handler","handler",1706707644),((function (elem,parent){
return (function (){return dommy.core.remove_BANG_.call(null,parent);
});})(elem,parent))
,new cljs.core.Keyword(null,"error-handler","error-handler",1866823671),((function (elem,parent){
return (function (p1__6440_SHARP_){return cljs.core.println.call(null,p1__6440_SHARP_);
});})(elem,parent))
,new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"raw","raw",1014016922)], null));
});
mx.notes.create_note_node = (function create_note_node(note){var id = cljs.core.get.call(null,note,"_id");var vis_elem = (function (){var dom6448 = document.createElement("button");dom6448.className = "text";
dom6448.setAttribute("id","note-visibility");
dom6448.appendChild(dommy.template.__GT_node_like.call(null,cljs.core.get.call(null,note,"visibility")));
return dom6448;
})();var del_elem = (function (){var dom6449 = document.createElement("button");dom6449.className = "text";
dom6449.setAttribute("id","note-delete");
dom6449.appendChild(document.createTextNode("delete"));
return dom6449;
})();var date_elem = (function (){var dom6450 = document.createElement("span");dom6450.className = "text";
dom6450.appendChild(dommy.template.__GT_node_like.call(null,cljs.core.get.call(null,note,"date")));
return dom6450;
})();var text_elem = (function (){var dom6451 = document.createElement("div");dom6451.className = "text";
dom6451.appendChild((function (){var dom6452 = document.createElement("a");dom6452.className = "anchor";
if(cljs.core.truth_(("/note/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(id))))
{dom6452.setAttribute("href",("/note/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)));
} else
{}
dom6452.appendChild((function (){var dom6453 = document.createElement("text");return dom6453;
})());
dom6452.appendChild(dommy.template.__GT_node_like.call(null,cljs.core.get.call(null,note,"text")));
return dom6452;
})());
return dom6451;
})();dommy.core.listen_BANG_.call(null,vis_elem,new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.change_visibility);
dommy.core.listen_BANG_.call(null,del_elem,new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.delete_note);
var dom6454 = document.createElement("div");if(cljs.core.truth_(id))
{dom6454.setAttribute("data-id",id);
} else
{}
dom6454.appendChild(dommy.template.__GT_node_like.call(null,text_elem));
dom6454.appendChild(dommy.template.__GT_node_like.call(null,date_elem));
dom6454.appendChild(dommy.template.__GT_node_like.call(null,vis_elem));
dom6454.appendChild(dommy.template.__GT_node_like.call(null,del_elem));
return dom6454;
});
mx.notes.on_note_create_success = (function on_note_create_success(response){cljs.core.println.call(null,"success");
dommy.core.append_BANG_.call(null,document.getElementById("notes"),mx.notes.create_note_node.call(null,response));
return dommy.core.set_value_BANG_.call(null,document.getElementById("note-text"),"");
});
mx.notes.on_note_create_error = (function on_note_create_error(response){cljs.core.println.call(null,"error");
return cljs.core.println.call(null,response);
});
mx.notes.create_note = (function create_note(){var note_text = dommy.core.value.call(null,document.getElementById("note-text"));var note_visibility = dommy.core.text.call(null,document.getElementById("visibility-btn"));return ajax.core.POST.call(null,"/note",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",1017460895),note_text,new cljs.core.Keyword(null,"visibility","visibility",2955236996),note_visibility], null),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"raw","raw",1014016922),new cljs.core.Keyword(null,"handler","handler",1706707644),mx.notes.on_note_create_success,new cljs.core.Keyword(null,"error-handler","error-handler",1866823671),mx.notes.on_note_create_error], null));
});
dommy.core.listen_BANG_.call(null,document.getElementById("create-note-btn"),new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.create_note);
mx.notes.on_get_notes_success = (function on_get_notes_success(response){cljs.core.println.call(null,"success");
var notes = document.getElementById("notes");return cljs.core.doall.call(null,cljs.core.map.call(null,((function (notes){
return (function (p1__6455_SHARP_){return dommy.core.append_BANG_.call(null,notes,mx.notes.create_note_node.call(null,p1__6455_SHARP_));
});})(notes))
,response));
});
mx.notes.on_get_notes_error = (function on_get_notes_error(response){cljs.core.println.call(null,"error");
return cljs.core.println.call(null,response);
});
mx.notes.get_user_notes = (function get_user_notes(){return ajax.core.GET.call(null,"/note",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",4313443576),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"raw","raw",1014016922),new cljs.core.Keyword(null,"handler","handler",1706707644),mx.notes.on_get_notes_success,new cljs.core.Keyword(null,"error-handler","error-handler",1866823671),mx.notes.on_get_notes_error], null));
});
dommy.core.listen_BANG_.call(null,document.getElementById("user-notes-btn"),new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.get_user_notes);
mx.notes.get_public_notes = (function get_public_notes(){return null;
});
dommy.core.listen_BANG_.call(null,document.getElementById("public-notes-btn"),new cljs.core.Keyword(null,"click","click",1108654330),mx.notes.get_public_notes);
mx.notes.get_user_notes.call(null);

//# sourceMappingURL=notes.js.map