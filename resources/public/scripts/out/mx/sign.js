// Compiled by ClojureScript 0.0-2227
goog.provide('mx.sign');
goog.require('cljs.core');
goog.require('dommy.core');
goog.require('ajax.core');
goog.require('ajax.core');
goog.require('dommy.core');
cljs.core.enable_console_print_BANG_.call(null);
cljs.core.println.call(null,"Hello world!, I'm in sign.cljs");
mx.sign.on_sign_success = (function on_sign_success(response){var user_id = cljs.core.get.call(null,response,"_id");localStorage.setItem(new cljs.core.Keyword(null,"user-id","user-id",866723279),user_id);
return cljs.core.println.call(null,"yay!");
});
mx.sign.on_sign_error = (function on_sign_error(response){return dommy.core.set_text_BANG_.call(null,document.getElementById("error-msg"),new cljs.core.Keyword(null,"response","response",673580979).cljs$core$IFn$_invoke$arity$1(response));
});
mx.sign.get_user_pwd_BANG_ = (function get_user_pwd_BANG_(){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dommy.core.value.call(null,document.getElementById("username-input")),dommy.core.value.call(null,document.getElementById("password-input"))], null);
});
mx.sign.cancel_submit = (function cancel_submit(evt){evt.preventDefault();
return evt.stopPropagation();
});
mx.sign.sign = (function sign(method,params,evt){method.call(null,"/user",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",4313443576),params,new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"raw","raw",1014016922),new cljs.core.Keyword(null,"handler","handler",1706707644),mx.sign.on_sign_success,new cljs.core.Keyword(null,"error-handler","error-handler",1866823671),mx.sign.on_sign_error], null));
return mx.sign.cancel_submit.call(null,evt);
});
mx.sign.sign_in = (function sign_in(evt){var vec__10707 = mx.sign.get_user_pwd_BANG_.call(null);var username = cljs.core.nth.call(null,vec__10707,0,null);var password = cljs.core.nth.call(null,vec__10707,1,null);return mx.sign.sign.call(null,ajax.core.GET,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"username","username",748190792),username,new cljs.core.Keyword(null,"password","password",2230889997),password], null),evt);
});
dommy.core.listen_BANG_.call(null,document.getElementById("sign-in"),new cljs.core.Keyword(null,"click","click",1108654330),mx.sign.sign_in);
mx.sign.sign_up = (function sign_up(evt){var vec__10709 = mx.sign.get_user_pwd_BANG_.call(null);var username = cljs.core.nth.call(null,vec__10709,0,null);var password = cljs.core.nth.call(null,vec__10709,1,null);return mx.sign.sign.call(null,ajax.core.POST,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"username","username",748190792),username,new cljs.core.Keyword(null,"password","password",2230889997),password,new cljs.core.Keyword(null,"roles","roles",1122599471),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["user"], null)], null),evt);
});
dommy.core.listen_BANG_.call(null,document.getElementById("sign-up"),new cljs.core.Keyword(null,"click","click",1108654330),mx.sign.sign_up);

//# sourceMappingURL=sign.js.map