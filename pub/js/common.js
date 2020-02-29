var emailRegExp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; // 邮箱验证
var telRegExp = /^1[3|4|5|6|7|8|9]\d{9}$/; // 手机验证
var qqRegExp = /^((\d{3,4}){1}-)\d{7,8}$|(1[3|4|5|6|7|8|9]\d{9})$/; // QQ验证

// 兼容IE
if(!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {
            }
            return i > -1;
        };
}

// 引入JS/CSS  $.include(["/js/a.js"]);
if(typeof ossurl==="undefined"){
    var js = document.scripts;
    js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/"));
    var ossurl = js.substring(0, js.lastIndexOf("/"));
}
$.extend({
    includePath: ossurl,
    include: function(K) {
        var N = typeof K == "string" ? [K] : K;
        for (var T = 0; T < N.length; T++) {
            var M = N[T].replace(/^\s|\s$/g, "");
            var R = M.split(".");
            var L = R[R.length - 1].toLowerCase();
            var P = L == "css";
            var O = P ? "link" : "script";
            var S = P ? " type='text/css' rel='stylesheet' disabled='true' " : " language='javascript' type='text/javascript' ";
            var Q = (P ? "href" : "src") + "='" + $.includePath + M + "'";
            if ($(O + "[" + Q + "]").length == 0) {
                document.write("<" + O + S + Q + "></" + O + ">")
            }
        }
    }
});
$.include(["/layer/layer.js"]);

// 倒计时
function regOkcountDown(time) {
    var time = time || 5;
    var timer = setInterval(function () {
        var num = parseInt($(".count-down").text());
        if (num > 0) {
            num--;
            $(".count-down").text(num);
        } else {
            window.location.href = './login.html'
        }

    }, 1000);
}

$(function () {
    var navList = [];
    var num = 0;
    $(".common-search-list li").click(function () {
        var _dom = $(".common-search-list li");
        var _this = $(this).index();
        _dom.removeClass("search-active");
        $(this).addClass("search-active")
        $(".common-search-input").hide().eq(_this).show()
    })
    $(".block-item").hover(function () {
        $(".block-item").removeClass("on")
        $(this).addClass("on");
    })
    $(".clip-b a").click(function () {
        var _dom = $(".foot-link ul")
        _dom.toggleClass('hAuto');
        if(_dom.hasClass('hAuto')){
            $(this).text("收起")
        } else {
            $(this).text("更多")
        }
    })
    $(".today-hot-qz-box").mouseenter(function () {
        $(this).find(".pager").fadeIn('fast');
    }).mouseleave(function () {
        $(this).find(".pager").fadeOut('fast');
    })
    $(".foot-contact ul li").mouseenter(function () {
        $(".foot-contact ol img").eq($(this).index()).show()
    }).mouseleave(function () {
        $(".foot-contact ol img").eq($(this).index()).hide()
    });
    // 导航
    $(".common-topbar-nav-list>li").mouseenter(function (event) {
        $(this).find('.common-topbar-dropdown').css('left', '-' + event.currentTarget.offsetLeft + 'px').show();

            $(this).find('.slide-list').show();
            return

        $(this).find('.triangle').css('left', event.currentTarget.offsetLeft + parseInt(($(event.currentTarget).width()) + 40 - 12) / 2 + 'px').show();
    }).mouseleave(function (event) {
        $(this).css("backgroundColor","#16243B").find('.common-topbar-dropdown,.slide-list').hide();
    });
    $(".common-nav-r").mouseenter(function (event) {
        $(".common-user-nav").show();
    }).mouseleave(function (event) {
        $(".common-user-nav").hide();
    });
    // 客服弹窗
    var _height = $(window).height();
    var _url = $("#kfjs").attr("src");
    var a_buxian = 0;
    var a_buxian_s = 0;

    // 获取地址上qq号码与电话号码参数
    function getparam(urlStr, paras) {
        var url = urlStr;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {},i,j;
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) === "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }

    // var _qqhm = getparam(_url, 'qqhm'); // qq号码
    // var regSS2 = new RegExp("[*]", "gi");
    // var _qqlj = getparam(_url, 'qqlj').replace(regSS2, "&"); // qq号码
    // var _dhhm = getparam(_url, 'dhhm'); // 电话号码
    // var _isdl = getparam(_url, 'isdl'); // 是否是代理
    // var _tpurl = getparam(_url, 'tpurl'); // 是否是代理
    // 插入dom信息
    $("body").append('<div id="kf">\n' +
        '       <div class="kf-touch"><i class="iconfont"></i>联系我们</div>\n' +
        '       <div class="c-wrap">\n' +
        '           <div class="kf-contact">\n' +
        '               <div class="qqhm"><a target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&amp;key=XzkzODAxNzIxMV8xNzU2NTBfNDAwOTk3Mjk5Nl8"><i class="iconfont"></i><span>在线客服（9:00-22:30）</span><strong style="">400-997-2996</strong></a>\n' +
        '               </div>\n' +
        '               <div class="dhhm">\n' +
        '                   <a href="javascript:;"><i class="iconfont"></i><span>问题建议</span><strong>聚名不是完美的，我们渴望您的建议</strong></a>\n' +
        '               </div>\n' +
        '               <div class="kf-item kf-wd"><a href="/user_wt_add.htm"><i class="iconfont"></i><span>代理申请</span><strong>重要通知文案</strong></a></div>\n' +
        '               <div class="kf-item kf-wd kf-manager"><i class="iconfont"></i><a href="javascript:;"><span>您的专属客户经理</span><strong>昵称：加载中...</strong><strong>Q Q：加载中...</strong><strong>电话：加载中...</strong></a></div>\n' +
        '               <div class="hot-line-kf"><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=3007704896&amp;site=qq&amp;menu=yes">在线咨询</a></div>\n' +
        '               <div class="triangle"></div>\n' +
        '           </div>\n' +
        '       </div>\n' +
        '   </div><div class="ttop"><i class="iconfont">&#xe613;</i></div>');
    if($(window).width()<1400){
        $("#kf,.ttop").css("marginLeft",$(window).width()/2-$("#kf").width()-10);
    }

    $("#kf").click(function () {
        $(".kf-contact,.c-wrap").show();
    }).mouseleave(function (event) {
        $(".kf-contact,.c-wrap").hide();
    });
    
    var _dom = $(".ttop");
    // 监听页面滚动隐藏按钮
    $(window).scroll(function () {
        if ($(window).scrollTop() > _height) {
            _dom.fadeIn();
        } else {
            _dom.fadeOut();
        }
    });

    // 返回顶部
    _dom.click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
    });

    function loginSubmit() {
        if (!emailRegExp.test($("#re_yx").val())) {
            layer.msg("请输入正确的邮箱");
            return;
        }
    }

    // 登陆
    $(".login").click(function (event) {
        layer.open({
            type: 1,
            skin: 'jm-class',
            shadeClose: true,
            title: '用户登录',
            area: ['360px', '400px'], //宽高
            content: '<div id="pop-login"><div class=""><input id="re_yx"class="jm-input"name="re_yx"type="text"placeholder="请输入您的邮箱/ID"></div><div class=""><input id="re_mm"class="jm-input"name="re_mm"type="password"placeholder="请输入您的密码"></div><div class=""><input id="re_yzm"class="jm-input"name="re_yzm"placeholder="请输入验证码"type="text"><img class="buttonss"id="re_yzms"title="看不清？点一下换图"src="http://www.juming.com/xcode.htm"onclick="document.getElementById(\'re_yzms\').src=\'http://www.juming.com/xcode.htm?nocache=\'+new Date().getTime();"align="absmiddle"></div><div class="submit-box"><button type="button"class="jm-button">登录</button><div><a href="./reg.html"class="reg-link">新用户注册</a><a href="./getpass1.html"class="reg-link fr">忘记密码？</a></div></div></div>',
            success: function () {
                $(".jm-class .cancel-btn").click(function (event) {
                    layer.closeAll();
                });
                $(".submit-box button").click(function (event) {
                    loginSubmit();
                });
            }
        });

    });
    $(".common-child-box .submit-box button").click(function (event) {
        loginSubmit();
    });

    $(window).resize(function() {
        if($(window).width()<1400){
            $("#kf,.ttop").css("marginLeft",$(window).width()/2-$("#kf").width()-10)
        }
    });

    $(".search-ym").focus(function () {
        if($(this).val()=='域名信息综合查询'){$(this).val('').addClass("on");}
    }).blur(function () {
        if($(this).val()==''){$(this).val('域名信息综合查询').removeClass("on");}
    })

    $(".search-whois").focus(function () {
        if($(this).val()=='请输入要查询whois的域名'){$(this).val('').addClass("on");}
    }).blur(function () {
        if($(this).val()==''){$(this).val('请输入要查询whois的域名').removeClass("on");}
    })


        // radio与checkbox点击
        $(".jm-checkbox-wrapper").click(function (event) {
            event = event || window.event;
            event.stopPropagation();
            if ($(this).find('input').is(":checked")) {
                $(this).find('.jm-checkbox').addClass('jm-checkbox-checked');
                return;
            }
            $(this).find('.jm-checkbox').removeClass('jm-checkbox-checked');
        });
        $(".jm-radio-wrapper").click(function (event) {
            $(this).parents(".jm-radio-group").find('.jm-radio').removeClass('jm-radio-checked');
            $(this).find('.jm-radio').addClass('jm-radio-checked')
        });
})