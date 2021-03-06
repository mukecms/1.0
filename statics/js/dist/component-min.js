!
function(e, n, i) {
	var o = {
		selectMod: 1,
		selectIds: [],
		callback: null
	},
		t = {
			selectGoods: e("#tpl_popup_selectGoods").html()
		},
		c = null,
		l = {},
		s = {
			getItem: "index.php?con=design&act=getItem"
		},
		a = function(n, i, o) {
			e.ajax({
				url: s.getItem + "&v=" + Math.round(100 * Math.random()),
				type: "POST",
				dataType: "json",
				data: o,
				beforeSend: function() {
					e.jBox.showloading()
				},
				success: function(s) {
					if (1 == s.status) {
						c = s.list;
						var a = _.template(t.selectGoods, {
							dataset: s.list,
							classlists: s.class_lists,
							page: s.page,
							formdata: o,
							selectMod: i.selectMod,
							selectIds: i.selectIds,
							curPageCache: l[o.p]
						}),
							r = e(a);
						n.find(".jbox-container").empty().html(r)
					} else HYD.hint("danger", "获取数据失败，" + s.msg), e.jBox.close(n);
					e.jBox.hideloading()
				}
			})
		},
		r = function(e) {
			var n = e.data("page");
			return n;
		};
		e.selectGoods = function(n) {
		var i = e.extend(!0, {}, o, n);
		c = null, l = {}, e.jBox.show({
			title: "选择商品",
			width: 1e3,
			minHeight: 605,
			content: "",
			onOpen: function(n) {
				a(n, i, {
					p: 0
				});
				var o = function() {
						var i = n.find(".paginate a.cur").text(),
							o = [],
							t = [];
						n.find(".j-chkbox:checked").each(function() {
							var n = e(this),
								i = n.data("itemid"),
								l = n.data("index"),
								s = c[l];
							o.push(i), t.push(s)
						}), l[i] = {
							ids: o,
							data: t
						}
					};
				n.on("click", ".paginate a", function() {
					if (!e(this).hasClass("cur")) {
						o();
						var t = r(e(this)),
							c = n.find("input[name=title]").val(),
							l = n.find("select[name=status]").val(),
							s = n.find("select[name=class_id]").val();
						return a(n, i, {
							p: t,
							title: c,
							status: l,
							class_id: s
						}), !1
					}
				}), n.on("click", ".j-search", function() {
					var e = n.find("input[name=title]").val(),
						o = n.find("select[name=status]").val(),
						t = n.find("select[name=class_id]").val();
					a(n, i, {
						p: 0,
						title: e,
						status: o,
						class_id: t
					})
				}), 1 == i.selectMod ? n.on("click", ".j-select", function() {
					var o = e(this).data("index");
					i.callback && i.callback(c[o]), e.jBox.close(n)
				}) : (n.on("click", ".j-select", function() {
					var n = e(this),
						i = n.siblings(".j-chkbox");
					n.hasClass("cur") ? (n.removeClass("cur"), i.attr("checked", !1)) : (n.addClass("cur"), i.attr("checked", !0))
				}), n.on("click", ".j-use", function() {
					o();
					var t = [],
						c = [];
					for (var s in l) t = t.concat(l[s].ids), c = c.concat(l[s].data);
					i.callback && i.callback(c, t), e.jBox.close(n)
				}), n.on("click", ".j-selectAll", function() {
					n.find(".j-select").addClass("cur"), n.find(".j-chkbox").attr("checked", !0)
				}), n.on("click", ".j-selectReverse", function() {
					n.find(".j-select").each(function() {
						var n = e(this),
							i = n.siblings(".j-chkbox");
						n.hasClass("cur") ? (n.removeClass("cur"), i.attr("checked", !1)) : (n.addClass("cur"), i.attr("checked", !0))
					})
				}), n.on("click", ".j-cancelSelectAll", function() {
					n.find(".j-select").removeClass("cur"), n.find(".j-chkbox").attr("checked", !1)
				}))
			},
			btnOK: {
				show: !1
			},
			btnCancel: {
				show: !1
			}
		})
	}
}(jQuery, document, window), 
$(function() {
	var e = null,
		n = null,
		i = null,
		o = {
			content: "",
			callback: null
		};
	$.composeBox = function(t) {
		var c = $.extend(!0, {}, o, t),
			l = $("#tpl_popup_selectCompose").html(),
			s = $(l);
		$("body").append(s);
		var a = ($(".J-composeBox").height(), $(window).height());
		$("body").append('<div class="box-overlay"></div>'), $(".box-overlay").css("height", a);
		var r = $(window).height(),
			d = $(".compose_top").height(),
			g = $("#tmpl h2").height(),
			u = r - d - g;
		s.find(".compose_lists").css({
			height: u,
			overflow: "auto"
		});
		var p = function() {
				$(".J-composeBox").remove(), $(".box-overlay").remove(), $("body").css({
					height: "auto",
					overflow: "auto"
				})
			};
		renderData(s, "10"), s.on("click", ".J-okClk", function() {
			c.content = e.getContent(), n = c.content, i = html_encode(c.content), c.callback && c.callback(n, i), p(), e.destroy()
		}), s.on("click", ".J-noClk", function() {
			p(), e.destroy()
		}), s.find("#nav li").click(function() {
			var e = $(this),
				n = e.data("id");
			e.addClass("active").siblings().removeClass("active"), renderData(s, n)
		}), s.on("click", ".compose_lists li", function() {
			var n = $(this).find(".pEditor").html() + "<p></p>";
			e.focus(), e.execCommand("inserthtml", n)
		}), e = UE.getEditor("edit_content", {
			autoHeight: !1,
			autoHeightEnabled: !1,
			autoClearinitialContent: !1,
			initialFrameHeight: u - 74
		}), e.ready(function() {
			e.setContent(c.content)
		})
	},  renderData = function(e, n) {
		$.ajax({
			url: "index.php?con=design&act=compose&id=" + n + "&v=" + Math.round(100 * Math.random()),
			type: "GET",
			dataType: "json",
			beforeSend: function() {
				$.jBox.showloading()
			},
			success: function(n) {
				if (1 == n.status) {
					var i = $("#tpl_Compose_lists").html(),
						o = _.template(i, {
							dataset: n.data
						}),
						t = $(o);
					$("#tmpl .compose_lists").empty().append(t)
				} else HYD.hint("danger", "获取数据失败，"), $.jBox.close(e);
				$.jBox.hideloading()
			}
		})
	}, html_encode = function(e) {
		var n = "";
		return 0 == e.length ? "" : (n = e.replace(/&/g, "&amp;"), n = n.replace(/</g, "&lt;"), n = n.replace(/>/g, "&gt;"), n = n.replace(/ /g, "&nbsp;"), n = n.replace(/\'/g, "&#39;"), n = n.replace(/\"/g, "&quot;"))
	}, html_decode = function(e) {
		var n = "";
		return 0 == e.length ? "" : (n = e.replace(/&amp;/g, "&"), n = n.replace(/&lt;/g, "<"), n = n.replace(/&gt;/g, ">"), n = n.replace(/&nbsp;/g, " "), n = n.replace(/&#39;/g, "'"), n = n.replace(/&quot;/g, '"'))
	}
});
var HYD = HYD ? HYD : {};
HYD.Constant = HYD.Constant ? HYD.Constant : {}, HYD.popbox = HYD.popbox ? HYD.popbox : {}, HYD.linkType = {
	1: "选择商品",
	2: "商品分组",
	3: "专题页面",
	4: "专题分类",
	5: "插件活动",
	6: "店铺主页",
	7: "会员主页",
	8: "分销申请",
	9: "购物车",
	10: "全部商品",
	12: "商品分类",
	11: "自定义链接",
	13: "我的订单"
}, HYD.getTimestamp = function() {
	var e = new Date;
	return "" + e.getFullYear() + parseInt(e.getMonth() + 1) + e.getDate() + e.getHours() + e.getMinutes() + e.getSeconds() + e.getMilliseconds()
}, HYD.hint = function(e, n, i) {
	if (e && n) {
		var o = $("#tpl_hint").html(),
			t = _.template(o, {
				type: e,
				content: n
			}),
			c = $(t),
			l = 200,
			i = i || 1500;
		$("body").append(c.css({
			opacity: "0",
			zIndex: "999999"
		})), c.animate({
			opacity: 1,
			top: 200
		}, l, function() {
			setTimeout(function() {
				c.animate({
					opacity: 0,
					top: 600
				}, l, function() {
					$(this).remove()
				})
			}, i)
		})
	}
}, HYD.FormShowError = function(e, n, i) {
	e && n && (void 0 == i && (i = !0), e.addClass("error").siblings(".fi-help-text").addClass("error").text(n).show(), i && e.focus(), "select" == e[0].nodeName.toLowerCase() && e.siblings(".select-sim").addClass("error"), e.one("change", function() {
		HYD.FormClearError($(this))
	}))
}, HYD.FormClearError = function(e) {
	e && (e.removeClass("error").siblings(".fi-help-text").hide(), "select" == e[0].nodeName.toLowerCase() && e.siblings(".select-sim").removeClass("error"))
}, HYD.showQrcode = function(e) {
	var n = $("#qrcode");
	if (!n.length) {
		var i = _.template($("#tpl_qrcode").html(), {
			src: e
		});
		n = $(i), n.click(function() {
			n.fadeOut(300)
		}), $("body").append(n)
	}
	n.find("img").attr("src", e), n.fadeIn(300)
}, HYD.changeWizardStep = function(e, n) {
	var i = $(e),
		o = i.find(".wizard-item");
	o.removeClass("process complete");
	for (var t = 0; n - 1 >= t; t++) o.filter(":eq(" + t + ")").addClass("complete");
	o.filter(":eq(" + n + ")").addClass("process")
}, HYD.autoLocation = function(e, n) {
	if (e) {
		var n = n ? n : 2e3;
		timer = setInterval(function() {
			1e3 >= n ? (clearInterval(timer), window.location.href = e) : (n -= 1e3, $("#j-autoLocation-second").text(n / 1e3))
		}, 1e3)
	}
}, 
HYD.popbox.ImgPicker = function(e) {
	var n, i = $("#tpl_popbox_ImgPicker").html(),
		o = $(i),
		t = function(e, i) {
			var c = function(e) {
					if (n = e.list, n && n.length) {
						var c = _.template($("#tpl_popbox_ImgPicker_listItem").html(), {
							dataset: n
						}),
							l = $(c);
						l.filter("li").click(function() {
							$(this).toggleClass("selected")
						}), o.find(".imgpicker-list").empty().append(l);
						var s = e.page,
							a = $(s);
						a.filter("a:not(.disabled,.cur)").click(function() {
							var e = $(this).attr("href"),
								n = e.split("/");
							return n = n[n.length - 1], n = n.replace(/.html/, ""), t(n), !1
						}), o.find(".paginate").empty().append(a)
					} else o.find(".imgpicker-list").append("<p class='txtCenter'>对不起，暂无图片</p>");
					i && i()
				};
			$.ajax({
				url: "/Design/getImg&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					p: parseInt(e)
				},
				success: function(e) {
					1 == e.status ? c(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		},
		c = function(n) {
			var i = [];
			o.find("#imgpicker_upload_input").uploadify({
				debug: !1,
				auto: !0,
				formData: {
					PHPSESSID: $.cookie("PHPSESSID")
				},
				width: 60,
				height: 60,
				multi: !0,
				swf: "/statics/plugins/uploadify/uploadify.swf",
				uploader: "/Design/uploadFile",
				buttonText: "+",
				fileSizeLimit: "5MB",
				fileTypeExts: "*.jpg; *.jpeg; *.png; *.gif; *.bmp",
				onSelectError: function(e, n, i) {
					switch (n) {
					case -100:
						HYD.hint("danger", "对不起，系统只允许您一次最多上传10个文件");
						break;
					case -110:
						HYD.hint("danger", "对不起，文件 [" + e.name + "] 大小超出5MB！");
						break;
					case -120:
						HYD.hint("danger", "文件 [" + e.name + "] 大小异常！");
						break;
					case -130:
						HYD.hint("danger", "文件 [" + e.name + "] 类型不正确！")
					}
				},
				onFallback: function() {
					HYD.hint("danger", "您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。")
				},
				onUploadSuccess: function(e, n, t) {
					var n = $.parseJSON(n),
						c = $("#tpl_popbox_ImgPicker_uploadPrvItem").html(),
						l = o.find(".imgpicker-upload-preview"),
						s = n.file_path;
					i.push(s);
					var a = _.template(c, {
						url: s
					}),
						r = $(a);
					r.find(".j-imgpicker-upload-btndel").click(function() {
						var e = o.find(".imgpicker-upload-preview li").index($(this).parent("li"));
						r.fadeOut(300, function() {
							i.splice(e, 1), $(this).remove()
						})
					}), l.append(r)
				},
				onUploadError: function(e, n, i, o) {
					HYD.hint("danger", "对不起：" + e.name + "上传失败：" + o)
				}
			}), o.find("#j-btn-uploaduse").click(function() {
				e && e(i), $.jBox.close(n)
			})
		};
	t(1, function() {
		$.jBox.show({
			title: "选择图片",
			content: o,
			btnOK: {
				show: !1
			},
			btnCancel: {
				show: !1
			},
			onOpen: function(i) {
				var t = o.find("#j-btn-listuse");
				t.click(function() {
					var t = [];
					o.find(".imgpicker-list li.selected").each(function() {
						t.push(n[$(this).index()])
					}), e && e(t), $.jBox.close(i)
				}), o.find(".j-initupload").one("click", function() {
					c(i)
				})
			}
		})
	})
},
HYD.popbox.IconPicker = function(e) {
	var n, i = $("#icon_imgPicker").html(),
		o = $(i);
	n = $.browser.chrome ? "body" : document.documentElement || document.body, $(n).append(o);
	var t = $("#icon_imglist").html(),
		c = {
			style: "style1",
			color: "color0"
		},
		l = function(e) {
			c = e ? e : c;
			var n = _.template(t, {
				data: {"url":site_root+'statics/images/icon/',"list":HYD.popbox.iconimgsrc.data[c.style][c.color]}
			});
			o.find(".albums-icon-tab").html(n), o.find(".albums-icon-tab").find("li").click(function(e) {
				var n = $(this);
				n.hasClass("selected") || n.addClass("selected").siblings("li").removeClass("selected")
			})
		};
	l(c), o.find(".albums-cr-actions").children("a").click(function(e) {
		var n = $(this),
			i = n.data("style");
		c.style = i, n.addClass("cur").siblings("a").removeClass("cur"), l(c)
	}), o.find(".albums-color-tab").find("li").click(function(e) {
		var n = $(this),
			i = n.data("color");
		c.color = i, n.addClass("cur").siblings("li").removeClass("cur"), l(c), "color1" == i && $(".albums-icon-tab").find("li").css({
			background: "#333"
		})
	});
	var s = [];
	o.find("#j-useIcon").click(function(n) {
		var i = o.find(".albums-icon-tab").find("li.selected");
		if (0 == i.length) return HYD.hint("danger", "对不起，请选择一张小图标"), !1;
		var t = i.children("img").attr("src");
		t = t.replace("Public", "PublicMob"), s.push(t), a(), e && e(s)
	});
	var a = function() {
			o.remove()
		};
	o.find("#Jclose").click(function(e) {
		a()
	})
},
HYD.popbox.ModulePicker = function(e) {
	var n, i = $("#tpl_popbox_ModulePicker").html(),
		o = $(i),
		t = function(e, i) {
			var c = function(e) {
					if (n = e.list, n && n.length) {
						var c = $("#tpl_popbox_ModulePicker_item").html(),
							l = _.template(c, {
								dataset: n
							}),
							s = $(l);
						o.find(".modulePicker-list").empty().append(s);
						var a = e.page,
							r = $(a);
						r.filter("a:not(.disabled,.cur)").click(function() {
							var e = $(this).attr("href"),
								n = e.split("/");
							return n = n[n.length - 1], n = n.replace(/.html/, ""), t(n), !1
						}), o.find(".paginate").empty().append(r)
					} else o.find(".modulePicker-list").append("<p class='txtCenter'>对不起，暂无自定义模块</p>");
					i && i()
				};
			$.ajax({
				url: "index.php?con=design&act=getModule&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					p: parseInt(e)
				},
				success: function(e) {
					1 == e.status ? c(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		};
	t(1, function() {
		$.jBox.show({
			title: "选择自定义模块",
			content: o,
			btnOK: {
				show: !1
			},
			btnCancel: {
				show: !1
			},
			onOpen: function(i) {
				o.on("click", ".j-select", function() {
					var o = $(".modulePicker-list li").index($(this).parent("li"));
					e && e(n[o]), $.jBox.close(i)
				})
			}
		})
	})
},
HYD.popbox.GoodsAndGroupPicker = function(e, n) {
	var i, o, t = $("#tpl_popbox_GoodsAndGroupPicker").html(),
		c = $(t),
		l = [],
		s = [],
		a = function(e, n) {
			var o = function(e) {
					if (i = e.list, i && i.length) {
						var o = $("#tpl_popbox_GoodsAndGroupPicker_goodsitem").html(),
							t = _.template(o, {
								dataset: i
							}),
							r = $(t);
						r.find(".j-select").click(function() {
							var e, n = $(this),
								o = n.parent("li"),
								t = o.index(),
								c = o.data("item"),
								a = $(".j-verify").val();
							if (e = "" != a ? a.split(",") : [], o.hasClass("selected")) {
								if (o.removeClass("selected"), n.removeClass("btn-success").text("选取"), 0 != l.length) for (var r = 0; r < l.length; r++) if (c == l[r].item_id) {
									l.splice(r, 1);
									break
								}
								if (0 != s.length) for (var r = 0; r < s.length; r++) {
									var d = s[r];
									if (c == d) {
										s.splice(r, 1);
										break
									}
								}
								if (0 != e.length) {
									for (var r = 0; r < e.length; r++) {
										var d = e[r];
										if (c == d) {
											e.splice(r, 1);
											break
										}
									}
									a = e.join(","), $(".j-verify").val(a)
								}
							} else o.addClass("selected"), n.addClass("btn-success").text("已选"), l.push(i[t]), s.push(c), e.push(c), a = e.join(","), $(".j-verify").val(a)
						}), c.find(".gagp-goodslist").empty().append(r);
						var d = e.page,
							g = $(d);
						g.filter("a:not(.disabled,.cur)").click(function() {
							var e = $(this).attr("href"),
								n = e.split("/");
							return n = n[n.length - 1], n = n.replace(/.html/, ""), a(n), !1
						}), c.find(".paginate:eq(0)").empty().append(g)
					} else c.find(".gagp-goodslist").append("<p class='txtCenter'>对不起，暂无数据</p>");
					var u = [];
					"" != $(".j-verify").val() ? u = $(".j-verify").val().split(",") : $(".img-list li").not(".img-list-add").each(function(e, n) {
						var i = $(this).data("item");
						u.push(i)
					}), c.find("li").each(function(e, n) {
						var i = $(this),
							o = i.data("item");
						$.each(u, function(e, n) {
							o == n && (i.addClass("selected"), i.children(".j-select").addClass("btn-success").text("已选"))
						})
					}), n && n()
				};
			$.ajax({
				url: "index.php?con=design&act=getItem&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					p: parseInt(e)
				},
				success: function(e) {
					1 == e.status ? o(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		},
		r = function(e, n) {
			var parseGroup = function(e) {
					if (o = e.list, o && o.length) {
						var i = $("#tpl_popbox_GoodsAndGroupPicker_groupitem").html(),
							t = _.template(i, {
								dataset: o
							}),
							l = $(t);
						c.find(".gagp-grouplist").empty().append(l);
						var s = e.page,
							a = $(s);
						a.filter("a:not(.disabled,.cur)").click(function() {
							var e = $(this).attr("href"),
								n = e.split("/");
							return n = n[n.length - 1], n = n.replace(/.html/, ""), r(n), !1
						}), c.find(".paginate").empty().append(a)
					} else c.find(".gagp-grouplist").append("<p class='txtCenter'>对不起，暂无数据</p>");
					var d = $(".badge-success").data("group");
					void 0 != d && c.find(".gagp-grouplist li").each(function(e, n) {
						var i = $(this),
							o = i.data("group");
						d == o && i.find(".j-select").addClass("btn-success").text("已选")
					}), n && n()
				};
			$.ajax({
				url: "index.php?con=design&act=getGroup&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					p: parseInt(e)
				},
				success: function(e) {
					1 == e.status ? parseGroup(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		},
		d = function(e, i) {
			c.on("click", ".j-btn-goodsuse", function() {
				var i = 1;
				n && n(l, i, s), $.jBox.close(e)
			})
		},
		g = function(e) {
			var o = 1;
			c.find(".j-btn-goodsuse").remove(), c.on("click", ".gagp-goodslist .j-select", function() {
				var t = $(".gagp-goodslist li").index($(this).parent("li"));
				n && n(i[t], o), $.jBox.close(e)
			})
		},
		u = function(e) {
			var i = 2;
			c.on("click", ".gagp-grouplist .j-select", function() {
				var t = $(".gagp-grouplist li").index($(this).parent("li"));
				n && n(o[t], i), $.jBox.close(e)
			})
		},
		p = function(e) {
			g(e), c.find(".j-tab-group").one("click", function() {
				r(1, function() {
					u(e)
				})
			})
		};
	switch (e) {
	case "goods":
	case "goodsMulti":
		c.find(".tabs").remove(), c.find(".gagp-goodslist").unwrap().unwrap(), c.find(".tc[data-index='2']").remove(), a(1, function() {
			var n = '<span class="fl">选择商品</span><div class="goodsearch"><input type="text" name="title" placeholder="请输入商品名称" /><select class="select small newselect" style="width:90px;"><option value="-1">在售中</option><option value="3">仓库中</option></select><a href="javascript:;" class="btn btn-primary jGetgood"><i class="gicon-search white"></i>查询</a></div>';
			$.jBox.show({
				title: n,
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(n) {
					if ("goodsMulti" == e) {
						var o = [];
						$(".img-list li").not(".img-list-add").each(function(e, n) {
							var i = $(this).data("item");
							o.push(i)
						}), c.find("li").each(function(e, n) {
							var i = $(this),
								t = i.data("item");
							$.each(o, function(e, n) {
								t == n && (i.addClass("selected"), i.children(".j-select").addClass("btn-success").text("已选"))
							})
						}), d(n, o)
					} else g(n);
					$(document).on("click", ".jGetgood", function(e) {
						var n = $(this).siblings("input").val(),
							o = $(this).siblings("select").val(),
							t = function(e, a) {
								e = e ? e : 1;
								var r = function(e) {
										if (i = e.list, i && i.length) {
											var n = $("#tpl_popbox_GoodsAndGroupPicker_goodsitem").html(),
												o = _.template(n, {
													dataset: i
												}),
												r = $(o);
											r.find(".j-select").click(function() {
												var e, n = $(this),
													o = n.parent("li"),
													t = o.index(),
													c = o.data("item"),
													a = $(".j-verify").val();
												if (e = "" != a ? a.split(",") : [], o.hasClass("selected")) {
													if (o.removeClass("selected"), n.removeClass("btn-success").text("选取"), 0 != l.length) for (var r = 0; r < l.length; r++) if (c == l[r].item_id) {
														l.splice(r, 1);
														break
													}
													if (0 != s.length) for (var r = 0; r < s.length; r++) {
														var d = s[r];
														if (c == d) {
															s.splice(r, 1);
															break
														}
													}
													if (0 != e.length) {
														for (var r = 0; r < e.length; r++) {
															var d = e[r];
															if (c == d) {
																e.splice(r, 1);
																break
															}
														}
														a = e.join(","), $(".j-verify").val(a)
													}
												} else o.addClass("selected"), n.addClass("btn-success").text("已选"), l.push(i[t]), s.push(c), e.push(c), a = e.join(","), $(".j-verify").val(a)
											}), c.find(".gagp-goodslist").empty().append(r);
											var d = e.page,
												g = $(d);
											g.filter("a:not(.disabled,.cur)").click(function() {
												var e = $(this).attr("href"),
													n = e.split("/");
												return n = n[n.length - 1], n = n.replace(/.html/, ""), t(n), !1
											}), c.find(".paginate:eq(0)").empty().append(g)
										} else c.find(".gagp-goodslist").empty().append("<p class='txtCenter'>对不起，暂无数据</p>"), c.find(".paginate").empty();
										a && a()
									};
								$.ajax({
									url: "index.php?con=design&act=getItem&v=" + Math.round(100 * Math.random()),
									type: "post",
									dataType: "json",
									data: {
										p: parseInt(e),
										title: n,
										status: o
									},
									success: function(e) {
										1 == e.status ? r(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
									}
								})
							};
						t()
					})
				}
			})
		});
		break;
	case "group":
		c.find(".tabs").remove(), c.find(".gagp-grouplist").unwrap().unwrap(), c.find(".tc[data-index='1']").remove(), r(1, function() {
			$.jBox.show({
				title: "选择商品分组",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					u(e)
				}
			})
		});
		break;
	case "all":
		a(1, function() {
			$.jBox.show({
				title: "选择商品或商品分组",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					p(e)
				}
			})
		})
	}
}, HYD.popbox.MgzAndMgzCate = function(e, n) {
	var i, o, t = $("#tpl_popbox_MgzAndMgzCate").html(),
		c = $(t),
		l = function(e, n) {
			var o = function(e) {
					if (i = e.list, i && i.length) {
						var o = $("#tpl_popbox_MgzAndMgzCate_item").html(),
							t = _.template(o, {
								dataset: i
							}),
							s = $(t);
						s.find(".j-select").click(function() {
							var e = $(this),
								n = e.parent("li");
							n.hasClass("selected") ? (n.removeClass("selected"), e.removeClass("btn-success").text("选取")) : (n.addClass("selected"), e.addClass("btn-success").text("已选"))
						}), c.find(".mgz-list-panel1").empty().append(s);
						var a = e.page,
							r = $(a);
						r.filter("a:not(.disabled,.cur)").click(function() {
							var e = $(this).attr("href"),
								n = e.split("/");
							return n = n[n.length - 1], n = n.replace(/.html/, ""), l(n), !1
						}), c.find(".paginate").empty().append(r)
					} else c.find(".mgz-list-panel1").empty().append("<p class='txtCenter'>对不起，暂无数据</p>");
					n && n()
				};
			$.ajax({
				url: "index.php?con=design&act=getMagazine&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					p: parseInt(e)
				},
				success: function(e) {
					1 == e.status ? o(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		},
		s = function(e, n) {
			var i = function(e) {
					if (o = e.list, o && o.length) {
						var i = $("#tpl_popbox_MgzAndMgzCate_item").html(),
							t = _.template(i, {
								dataset: o
							}),
							l = $(t);
						l.find(".j-select").click(function() {
							var e = $(this),
								n = e.parent("li");
							n.hasClass("selected") ? (n.removeClass("selected"), e.removeClass("btn-success").text("选取")) : (n.addClass("selected"), e.addClass("btn-success").text("已选"))
						}), c.find(".mgz-list-panel2").empty().append(l);
						var a = e.page,
							r = $(a);
						r.filter("a:not(.disabled,.cur)").click(function() {
							var e = $(this).attr("href"),
								n = e.split("/");
							return n = n[n.length - 1], n = n.replace(/.html/, ""), s(n), !1
						}), c.find(".paginate").empty().append(r)
					} else c.find(".mgz-list-panel2").empty().append("<p class='txtCenter'>对不起，暂无数据</p>");
					n && n()
				};
			$.ajax({
				url: "index.php?con=design&act=getMagazineCategory&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					p: parseInt(e)
				},
				success: function(e) {
					1 == e.status ? i(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		},
		a = function(e) {
			c.on("click", ".mgz-list-panel1 .j-select", function() {
				var o = $(".mgz-list-panel1 li").index($(this).parent("li"));
				n && n(i[o], 3), $.jBox.close(e)
			})
		},
		r = function(e) {
			c.on("click", ".mgz-list-panel2 .j-select", function() {
				var i = $(".mgz-list-panel2 li").index($(this).parent("li"));
				n && n(o[i], 4), $.jBox.close(e)
			})
		},
		d = function(e) {
			c.on("click", ".j-btn-use", function() {
				var i = [],
					t = 4;
				c.find(".mgz-list-panel2 li.selected").each(function() {
					i.push(o[$(this).index()])
				}), n && n(i, t), $.jBox.close(e)
			})
		},
		g = function(e) {
			a(e), c.find(".j-tab-mgzcate").one("click", function() {
				s(1, function() {
					r(e)
				})
			})
		};
	switch (e) {
	case "mgzCate":
		c.find(".tabs").remove(), c.find(".mgz-list-panel2").unwrap().unwrap(), c.find(".tc[data-index='1']").remove(), c.find(".j-btn-use").remove(), s(1, function() {
			$.jBox.show({
				title: "选择专题分类",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					r(e)
				}
			})
		});
		break;
	case "mgzCateMulti":
		c.find(".tabs").remove(), c.find(".mgz-list-panel2").unwrap().unwrap(), c.find(".tc[data-index='1']").remove(), s(1, function() {
			$.jBox.show({
				title: "选择专题分类",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					d(e)
				}
			})
		});
		break;
	case "mgz":
		c.find(".tabs").remove(), c.find(".mgz-list-panel1").unwrap().unwrap(), c.find(".tc[data-index='2']").remove(), c.find(".j-btn-use").remove(), l(1, function() {
			$.jBox.show({
				title: "选择专题页面",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					g(e)
				}
			})
		});
		break;
	case "all":
		c.find(".j-btn-use").remove(), l(1, function() {
			$.jBox.show({
				title: "选择专题",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					g(e)
				}
			})
		})
	}
	switch (e) {
	case "goods":
	case "goodsMulti":
		c.find(".tabs").remove(), c.find(".gagp-goodslist").unwrap().unwrap(), c.find(".tc[data-index='2']").remove(), showListRender_goods(1, function() {
			$.jBox.show({
				title: "选择商品",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(n) {
					"goodsMulti" == e ? selectEvent_goods_multi(n) : selectEvent_goods(n)
				}
			})
		});
		break;
	case "group":
		c.find(".tabs").remove(), c.find(".gagp-grouplist").unwrap().unwrap(), c.find(".tc[data-index='1']").remove(), showListRender_group(1, function() {
			$.jBox.show({
				title: "选择商品分组",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					selectEvent_group(e)
				}
			})
		});
		break;
	case "all":
		showListRender_goods(1, function() {
			$.jBox.show({
				title: "选择商品或商品分组",
				content: c,
				btnOK: {
					show: !1
				},
				btnCancel: {
					show: !1
				},
				onOpen: function(e) {
					selectEvent_goodsAndGroup(e)
				}
			})
		})
	}
}, HYD.popbox.GamePicker = function(e, n) {
	$.ajax({
		url: "http://shop.bidcms.com/wxapp/index.php?con=marketing&act=getImageResourceList&v=" + Math.round(100 * Math.random()),
		type: "post",
		dataType: "json",
		data: {
			p: parseInt(n),
			type: parseInt(s[e])
		},
		success: function(e) {
			if(0 == e.errcode){
				var html = $("#tpl_popbox_GamePicker").html();
				var list=[];
				for(i in e.data){
					list.push(e.data[i]);
				}
				s = _.template(html, {
					dataset: list
				});
				var a = $(s);
				
				$.jBox.show({
					title: "选择营销活动",
					content: a,
					btnOK: {
						show: !1
					},
					btnCancel: {
						show: !1
					},
					onOpen: function(e) {
						a.on("click", ".j-select", function() {
							var i=$(this).data('parent');
							var o=$(this).data('index');
							n && n(list[i]['material_list'][o], 5), $.jBox.close(e)
						})
					}
				})
			} else {
				HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
			}
		}
	});
	
}, HYD.popbox.dplPickerColletion = function(e) {
	var n = {
		linkType: 1,
		callback: null
	},
	i = $.extend(!0, {}, n, e);
	switch (parseInt(i.linkType)) {
	case 1:
		$.selectGoods({
			selectMod: 1,
			callback: function(e) {
				i.callback(e, 1)
			}
		});
		break;
	case 2:
		HYD.popbox.GoodsAndGroupPicker("group", i.callback);
		break;
	case 3:
		HYD.popbox.MgzAndMgzCate("mgz", i.callback);
		break;
	case 4:
		HYD.popbox.MgzAndMgzCate("mgzCate", i.callback);
		break;
	case 5:
		HYD.popbox.GamePicker("all", i.callback);
		break;
	case 6:
		var o = {
			title: "店铺主页",
			link: "https://shop.bidcms.com/store/m.php?con=index&act=index&wxapp=/pages/index/index"
		};
		i.callback(o, 6);
		break;
	case 7:
		var o = {
			title: "会员主页",
			link: "https://shop.bidcms.com/store/m.php?con=index&act=user&wxapp=/pages/user/index"
		};
		i.callback(o, 7);
		break;
	case 8:
		var o = {
			title: "分销申请",
			link: "https://shop.bidcms.com/store/m.php?con=agent&act=apply"
		};
		i.callback(o, 8);
		break;
	case 9:
		var o = {
			title: "购物车",
			link: "https://shop.bidcms.com/store/m.php?con=index&act=cart&wxapp=/pages/shoppingcar/index"
		};
		i.callback(o, 9);
		break;
	case 10:
		var o = {
			title: "全部商品",
			link: "https://shop.bidcms.com/store/m.php?con=index&act=goods&wxapp=/pages/list/index"
		};
		i.callback(o, 10);
		break;
	case 11:
		var o = {
			title: "自定义链接",
			link: "小程序链接示例：bidcms://小程序的appid/小程序打开页面"
		};
		i.callback(o, 11);
		break;
	case 12:
		var o = {
			title: "商品分类",
			link: "https://shop.bidcms.com/store/m.php?con=index&act=cate&wxapp=/pages/cate/index"
		};
		i.callback(o, 12);
		break;
	case 13:
		var o = {
			title: "我的订单",
			link: "https://shop.bidcms.com/store/m.php?con=order&act=index&wxapp=/pages/order/index"
		};
		i.callback(o, 13)
	}
}, HYD.ajaxPopTable = function(e) {
	var n, i, o = {
		title: "",
		url: "",
		width: "auto",
		minHeight: "auto",
		data: {
			p: 1
		},
		tpl: "",
		onOpen: null,
		onPageChange: null
	},
		t = $.extend(!0, {}, o, e),
		c = $("<div></div>"),
		l = function(e) {
			var o = t.tpl,
				s = t.url,
				a = function(s) {
					n = s;
					var a = _.template(o, s),
						r = $(a);
					c.empty().append(r), c.find(".paginate a:not(.disabled,.cur)").click(function() {
						for (var e = $(this).attr("href"), n = e.split("/"), i = 0; i < n.length; i++) if ("p" == n[i]) {
							t.data.p = n[i + 1].replace(/.html/, ""), l();
							break
						}
						return !1
					}), e && e(), t.onPageChange && t.onPageChange(i, n)
				};
			$.ajax({
				url: s + "&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: t.data,
				success: function(e) {
					1 == e.status ? a(e) : HYD.hint("danger", "对不起，获取数据失败：" + e.msg)
				}
			})
		};
	l(function() {
		$.jBox.show({
			title: t.title,
			width: t.width,
			minHeight: t.minHeight,
			content: c,
			btnOK: {
				show: !1
			},
			btnCancel: {
				show: !1
			},
			onOpen: function(e) {
				i = e, t.onOpen && t.onOpen(e, n)
			}
		})
	})
}, HYD.regRules = {
	email: /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i,
	mobphone: /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/,
	telphone: /^0\d{2,3}(\-)?\d{7,8}$/,
	integer: /^\d+$/,
	"float": /^[\d]*\.?[\d]+$/
}, HYD.popbox.iconimgsrc = {
	data: {
		style1: {
			color0: ["style1/color0/icon_home.png", "style1/color0/icon_allgoods.png", "style1/color0/icon_newgoods.png", "style1/color0/icon_user.png", "style1/color0/icon_fx.png", "style1/color0/icon_active.png", "style1/color0/icon_hotsale.png", "style1/color0/icon_subject.png", "style1/color0/style1_gz0.png", "style1/color0/style1_shopcar0.png"],
			color1: ["style1/color1/icon_home.png", "style1/color1/icon_allgoods.png", "style1/color1/icon_newgoods.png", "style1/color1/icon_user.png", "style1/color1/icon_fx.png", "style1/color1/icon_active.png", "style1/color1/icon_hotsale.png", "style1/color1/icon_subject.png", "style1/color1/style1_gz1.png", "style1/color1/style1_shopcar1.png"],
			color2: ["style1/color2/icon_home.png", "style1/color2/icon_allgoods.png", "style1/color2/icon_newgoods.png", "style1/color2/icon_user.png", "style1/color2/icon_fx.png", "style1/color2/icon_active.png", "style1/color2/icon_hotsale.png", "style1/color2/icon_subject.png", "style1/color2/style1_gz2.png", "style1/color2/style1_shopcar2.png"],
			color3: ["style1/color3/icon_home.png", "style1/color3/icon_allgoods.png", "style1/color3/icon_newgoods.png", "style1/color3/icon_user.png", "style1/color3/icon_fx.png", "style1/color3/icon_active.png", "style1/color3/icon_hotsale.png", "style1/color3/icon_subject.png", "style1/color3/style1_gz3.png", "style1/color3/style1_shopcar3.png"],
			color4: ["style1/color4/icon_home.png", "style1/color4/icon_allgoods.png", "style1/color4/icon_newgoods.png", "style1/color4/icon_user.png", "style1/color4/icon_fx.png", "style1/color4/icon_active.png", "style1/color4/icon_hotsale.png", "style1/color4/icon_subject.png", "style1/color4/style1_gz4.png", "style1/color4/style1_shopcar4.png"],
			color5: ["style1/color5/icon_home.png", "style1/color5/icon_allgoods.png", "style1/color5/icon_newgoods.png", "style1/color5/icon_user.png", "style1/color5/icon_fx.png", "style1/color5/icon_active.png", "style1/color5/icon_hotsale.png", "style1/color5/icon_subject.png", "style1/color5/style1_gz5.png", "style1/color5/style1_shopcar5.png"],
			color6: ["style1/color6/icon_home.png", "style1/color6/icon_allgoods.png", "style1/color6/icon_newgoods.png", "style1/color6/icon_user.png", "style1/color6/icon_fx.png", "style1/color6/icon_active.png", "style1/color6/icon_hotsale.png", "style1/color6/icon_subject.png", "style1/color6/style1_gz6.png", "style1/color6/style1_shopcar6.png"],
			color7: ["style1/color7/icon_home.png", "style1/color7/icon_allgoods.png", "style1/color7/icon_newgoods.png", "style1/color7/icon_user.png", "style1/color7/icon_fx.png", "style1/color7/icon_active.png", "style1/color7/icon_hotsale.png", "style1/color7/icon_subject.png", "style1/color7/style1_gz7.png", "style1/color7/style1_shopcar7.png"],
			color8: ["style1/color8/icon_home.png", "style1/color8/icon_allgoods.png", "style1/color8/icon_newgoods.png", "style1/color8/icon_user.png", "style1/color8/icon_fx.png", "style1/color8/icon_active.png", "style1/color8/icon_hotsale.png", "style1/color8/icon_subject.png", "style1/color8/style1_gz8.png", "style1/color8/style1_shopcar8.png"]
		},
		style2: {
			color0: ["style2/color0/icon_home.png", "style2/color0/icon_allgoods.png", "style2/color0/icon_newgoods.png", "style2/color0/icon_user.png", "style2/color0/icon_fx.png", "style2/color0/icon_active.png", "style2/color0/icon_hotsale.png", "style2/color0/icon_subject.png", "style2/color0/style2_gz0.png", "style2/color0/style2_shopcar0.png"],
			color1: ["style2/color1/icon_home.png", "style2/color1/icon_allgoods.png", "style2/color1/icon_newgoods.png", "style2/color1/icon_user.png", "style2/color1/icon_fx.png", "style2/color1/icon_active.png", "style2/color1/icon_hotsale.png", "style2/color1/icon_subject.png", "style2/color1/style2_gz1.png", "style2/color1/style2_shopcar1.png"],
			color2: ["style2/color2/icon_home.png", "style2/color2/icon_allgoods.png", "style2/color2/icon_newgoods.png", "style2/color2/icon_user.png", "style2/color2/icon_fx.png", "style2/color2/icon_active.png", "style2/color2/icon_hotsale.png", "style2/color2/icon_subject.png", "style2/color2/style2_gz2.png", "style2/color2/style2_shopcar2.png"],
			color3: ["style2/color3/icon_home.png", "style2/color3/icon_allgoods.png", "style2/color3/icon_newgoods.png", "style2/color3/icon_user.png", "style2/color3/icon_fx.png", "style2/color3/icon_active.png", "style2/color3/icon_hotsale.png", "style2/color3/icon_subject.png", "style2/color3/style2_gz3.png", "style2/color3/style2_shopcar3.png"],
			color4: ["style2/color4/icon_home.png", "style2/color4/icon_allgoods.png", "style2/color4/icon_newgoods.png", "style2/color4/icon_user.png", "style2/color4/icon_fx.png", "style2/color4/icon_active.png", "style2/color4/icon_hotsale.png", "style2/color4/icon_subject.png", "style2/color4/style2_gz4.png", "style2/color4/style2_shopcar4.png"],
			color5: ["style2/color5/icon_home.png", "style2/color5/icon_allgoods.png", "style2/color5/icon_newgoods.png", "style2/color5/icon_user.png", "style2/color5/icon_fx.png", "style2/color5/icon_active.png", "style2/color5/icon_hotsale.png", "style2/color5/icon_subject.png", "style2/color5/style2_gz5.png", "style2/color5/style2_shopcar5.png"],
			color6: ["style2/color6/icon_home.png", "style2/color6/icon_allgoods.png", "style2/color6/icon_newgoods.png", "style2/color6/icon_user.png", "style2/color6/icon_fx.png", "style2/color6/icon_active.png", "style2/color6/icon_hotsale.png", "style2/color6/icon_subject.png", "style2/color6/style2_gz6.png", "style2/color6/style2_shopcar6.png"],
			color7: ["style2/color7/icon_home.png", "style2/color7/icon_allgoods.png", "style2/color7/icon_newgoods.png", "style2/color7/icon_user.png", "style2/color7/icon_fx.png", "style2/color7/icon_active.png", "style2/color7/icon_hotsale.png", "style2/color7/icon_subject.png", "style2/color7/style2_gz7.png", "style2/color7/style2_shopcar7.png"],
			color8: ["style2/color8/icon_home.png", "style2/color8/icon_allgoods.png", "style2/color8/icon_newgoods.png", "style2/color8/icon_user.png", "style2/color8/icon_fx.png", "style2/color8/icon_active.png", "style2/color8/icon_hotsale.png", "style2/color8/icon_subject.png", "style2/color8/style2_gz8.png", "style2/color8/style2_shopcar8.png"]
		},
		style3: {
			color0: ["style3/color0/icon_home.png", "style3/color0/icon_allgoods.png", "style3/color0/icon_newgoods.png", "style3/color0/icon_user.png", "style3/color0/icon_fx.png", "style3/color0/icon_active.png", "style3/color0/icon_hotsale.png", "style3/color0/icon_subject.png", "style3/color0/style3_gz0.png", "style3/color0/style3_shopcar0.png"],
			color1: ["style3/color1/icon_home.png", "style3/color1/icon_allgoods.png", "style3/color1/icon_newgoods.png", "style3/color1/icon_user.png", "style3/color1/icon_fx.png", "style3/color1/icon_active.png", "style3/color1/icon_hotsale.png", "style3/color1/icon_subject.png", "style3/color1/style3_gz1.png", "style3/color1/style3_shopcar1.png"],
			color2: ["style3/color2/icon_home.png", "style3/color2/icon_allgoods.png", "style3/color2/icon_newgoods.png", "style3/color2/icon_user.png", "style3/color2/icon_fx.png", "style3/color2/icon_active.png", "style3/color2/icon_hotsale.png", "style3/color2/icon_subject.png", "style3/color2/style3_gz2.png", "style3/color2/style3_shopcar2.png"],
			color3: ["style3/color3/icon_home.png", "style3/color3/icon_allgoods.png", "style3/color3/icon_newgoods.png", "style3/color3/icon_user.png", "style3/color3/icon_fx.png", "style3/color3/icon_active.png", "style3/color3/icon_hotsale.png", "style3/color3/icon_subject.png", "style3/color3/style3_gz3.png", "style3/color3/style3_shopcar3.png"],
			color4: ["style3/color4/icon_home.png", "style3/color4/icon_allgoods.png", "style3/color4/icon_newgoods.png", "style3/color4/icon_user.png", "style3/color4/icon_fx.png", "style3/color4/icon_active.png", "style3/color4/icon_hotsale.png", "style3/color4/icon_subject.png", "style3/color4/style3_gz4.png", "style3/color4/style3_shopcar4.png"],
			color5: ["style3/color5/icon_home.png", "style3/color5/icon_allgoods.png", "style3/color5/icon_newgoods.png", "style3/color5/icon_user.png", "style3/color5/icon_fx.png", "style3/color5/icon_active.png", "style3/color5/icon_hotsale.png", "style3/color5/icon_subject.png", "style3/color5/style3_gz5.png", "style3/color5/style3_shopcar5.png"],
			color6: ["style3/color6/icon_home.png", "style3/color6/icon_allgoods.png", "style3/color6/icon_newgoods.png", "style3/color6/icon_user.png", "style3/color6/icon_fx.png", "style3/color6/icon_active.png", "style3/color6/icon_hotsale.png", "style3/color6/icon_subject.png", "style3/color6/style3_gz6.png", "style3/color6/style3_shopcar6.png"],
			color7: ["style3/color7/icon_home.png", "style3/color7/icon_allgoods.png", "style3/color7/icon_newgoods.png", "style3/color7/icon_user.png", "style3/color7/icon_fx.png", "style3/color7/icon_active.png", "style3/color7/icon_hotsale.png", "style3/color7/icon_subject.png", "style3/color7/style3_gz7.png", "style3/color7/style3_shopcar7.png"],
			color8: ["style3/color8/icon_home.png", "style3/color8/icon_allgoods.png", "style3/color8/icon_newgoods.png", "style3/color8/icon_user.png", "style3/color8/icon_fx.png", "style3/color8/icon_active.png", "style3/color8/icon_hotsale.png", "style3/color8/icon_subject.png", "style3/color8/style3_gz8.png", "style3/color8/style3_shopcar8.png"]
		}
	}
}, HYD.urgencyPopup = function() {
	var e = function(e) {
			$.jBox.show({
				title: "提示",
				content: "<p style='font-size:14px;'>" + e + "</p>",
				btnOK: {
					onBtnClick: function(e) {
						$.jBox.close(e)
					}
				},
				btnCancel: {
					show: !1
				}
			})
		};
	$("#urgency-content").jBox({
		title: "紧急通知",
		onOpen: function(n) {
			n.addClass("jbox-urgencyPopup"), $chk = n.find(".j-urgency-checkbox"), $btn = n.find(".j-urgency-submit"), $btn.click(function() {
				$chk.is(":checked") ? $.ajax({
					url: "/Shop/apply_temporary_domain",
					type: "get",
					dataType: "json",
					beforeSend: function() {
						$.jBox.showloading()
					},
					success: function(e) {
						$.jBox.hideloading(), 1 == e.status ? ($.jBox.close(n), HYD.hint("success", "恭喜您，临时域名申请成功！")) : HYD.hint("danger", "对不起，" + e.msg)
					}
				}) : e("请先注册域名并提交备案信息!")
			})
		},
		btnOK: {
			show: !1
		},
		btnCancel: {
			show: !1
		}
	})
}, $(function() {
	top.location != self.location && (top.location.href = self.location.href), $(".header-ctrl-item").hover(function() {
		var e = $(this);
		e.data("type"), e.data("cache");
		e.find(".header-ctrl-item-children").length && e.addClass("show")
	}, function() {
		$(this).removeClass("show")
	}), $(".tips").tooltips();
	var e = $(".container .inner");
	if (e.length) {
		var n = function() {
				HYD.Constant.windowHeight = $(this).height(), HYD.Constant.windowWidth = $(this).width(), HYD.Constant.containerOffset = e.offset(), HYD.Constant.containerWidth = e.outerWidth()
			},
			i = function() {
				$("#j-gotop").css("left", HYD.Constant.containerWidth + HYD.Constant.containerOffset.left + 10)
			};
		$(window).resize(function() {
			n(), i()
		}), n(), i()
	}
	$(window).scroll(function() {
		$(this).scrollTop() >= 150 ? $("#j-gotop").fadeIn(300) : $("#j-gotop").fadeOut(300)
	}), $.ajaxSetup({
		timeout: 2e4,
		error: function(e, n, i) {
			"timeout" == n && (HYD && HYD.hint ? HYD.hint("warning", "请求超时，请重试！") : alert("请求超时，请重试！"), $.jBox.hideloading())
		}
	}), function() {
		var e = function() {
				$.jBox.show({
					title: "温馨提示",
					width: 520,
					content: $("#tpl_jbox_domain_tip").html(),
					btnOK: {
						show: !1
					},
					btnCancel: {
						show: !1
					},
					onOpen: function() {},
					onClosed: function() {}
				})
			};
		window.is_domain_tip && e()
	}(), $(".js-save-btn").click(function() {
		HYD.hint("success", "恭喜，保存成功！")
	}), $(".content-left .left-menu dt").toggle(function() {
		$(this).siblings("dd").hide()
	}, function() {
		$(this).siblings("dd").show()
	})
}), $(function() {
	var e = $(".wxtables").find("input[type='checkbox'].table-ckbs");
	$(".btn_table_selectAll").click(function() {
		e.attr("checked", !0)
	}), $(".btn_table_Cancle").click(function() {
		e.attr("checked", !1)
	}), $(".paginate").each(function() {
		var e = $(this),
			n = e.find("input"),
			i = e.find(".goto"),
			o = window.location.href.toString();
		n.focus(function() {
			$(this).addClass("focus").siblings(".goto").addClass("focus")
		}), n.blur(function() {
			"" == $(this).val() && $(this).removeClass("focus").siblings(".goto").removeClass("focus")
		}), n.keypress(function(e) {
			var n = window.event ? e.keyCode : e.which;
			return 13 == n && (window.location.href = $(this).siblings("a.goto").attr("href")), 8 == n || 46 == n || 37 == n || 39 == n ? !0 : 48 > n || n > 57 ? !1 : !0
		}), n.keyup(function(e) {
			var n = $(this).val(),
				t = o.split("/"),
				c = t.length,
				l = !1,
				s = !1;
			"" == t[c - 1] && (t.pop(), c = t.length, l = !0), (l || "p" != t[c - 2]) && (t.push("p"), c = t.length, s = !0), l || s ? t[c] = n + ".html" : t[c - 1] = n + ".html", i.attr("href", t.join("/"))
		})
	})
}), $(function() {
	$(document).on("click", ".tabs .tabs_a", function() {
		var e = $(this),
			n = e.data("origin"),
			i = 0;
		e.parent().hasClass("wizardstep") || e.parent().hasClass("nochange") || (e.addClass("active").siblings(".tabs_a").removeClass("active"), e.data("index") ? (i = e.data("index"), $(".tabs-content[data-origin='" + n + "']").find(".tc[data-index='" + i + "']").removeClass("hide").siblings(".tc").addClass("hide")) : (i = e.index(), $(".tabs-content[data-origin='" + n + "']").find(".tc:eq(" + i + ")").removeClass("hide").siblings(".tc").addClass("hide")))
	})
}), $(function() {
	$(".alert.disable-del").each(function() {
		var e = $('<a href="javascript:;" class="alert-delete" title="隐藏"><i class="gicon-remove"></i></a>');
		e.click(function() {
			$(this).parent(".alert").fadeOut()
		}), $(this).append(e)
	})
}), function(e, n, i) {
	var o = {
		trigger: "hover"
	};
	e.fn.tooltips = function() {
		return this.each(function() {
			var n = function() {
					var n = e(this),
						i = n.data("content"),
						o = n.offset(),
						t = {
							width: n.outerWidth(!0),
							height: n.outerHeight(!0)
						},
						c = n.data("placement");
					if (this.tip = null, i = void 0 == i || "" == i ? i = n.text() : i, null == this.$tip) {
						var l = e("#tpl_tooltips").html();
						if (void 0 == l || "" == l) return void console.log("Please check template!");
						var s = _.template(l, {
							content: i,
							placement: c
						});
						this.$tip = e(s), e("body").append(this.$tip);
						var a = 0,
							r = 0,
							d = this.$tip.outerWidth(!0),
							g = this.$tip.outerHeight(!0);
						switch (c) {
						case "top":
							a = o.top + t.height + 5, r = o.left - 5;
							break;
						case "bottom":
							a = o.top - g - 5, r = o.left - 5;
							break;
						case "left":
							a = o.top - t.height / 2, r = o.left + t.width + 5;
							break;
						case "right":
							a = o.top + t.height / 2 - g / 2, r = o.left - d - 5
						}
						this.$tip.css({
							top: a,
							left: r
						})
					}
					this.$tip.stop(!0, !0).fadeIn(300)
				},
				i = function() {
					this.$tip && this.$tip.stop(!0, !0).fadeOut(300)
				},
				t = e(this).data("trigger");
			switch (t = void 0 != t && "" != t ? t : o.trigger) {
			case "hover":
				e(this).hover(n, i);
				break;
			case "click":
				e(this).click(n).mouseleave(i)
			}
		})
	}
}(jQuery, document, window), $(function() {
	$(document).on("mouseover", ".droplist .j-droplist-toggle", function() {
		$(this).siblings(".droplist-menu").show()
	}), $(document).on("mouseleave", ".droplist .droplist-menu", function() {
		$(this).hide()
	}), $(document).on("mouseleave", ".droplist", function() {
		$(this).find(".droplist-menu").hide()
	}), $(document).on("click", ".droplist .droplist-menu a", function() {
		$(this).parents(".droplist-menu").hide()
	})
}), 
function(e, n, i) {
	var o = {
		callback: null
	},
	t = {},
	c = {
		width: e(i).width(),
		height: e(i).height()
	},
	l = {
		main: e("#tpl_albums_main").html(),
		overlay: e("#tpl_albums_overlay").html(),
		tree: e("#tpl_albums_tree").html(),
		treeFn: e("#tpl_albums_tree_fn").html(),
		imgs: e("#tpl_albums_imgs").html()
	},
	s = {
		folderID: "",
		moveFolderID: 0,
		imgs: {}
	},
	a = {
		getFolderTree: "index.php?con=design&act=getFolderTree",
		getSubFolderTree: "index.php?con=design&act=getSubFolderTree",
		getImgList: "index.php?con=design&act=img_list",
		addImg: "index.php?con=design&act=uploadFile&sid=" + e.cookie("shop_id"),
		moveImg: "index.php?con=design&act=moveImg",
		delImg: "index.php?con=design&act=delImg",
		addFolder: "index.php?con=design&act=addFolder",
		renameFolder: "index.php?con=design&act=renameFolder",
		delFolder: "index.php?con=design&act=delFolder",
		moveCateImg: "index.php?con=design&act=moveCateImg",
		renameImg: "index.php?con=design&act=renameImg"
	},
	r = function(n, i, o, t) {
		var c = arguments.callee,
			r = n.find("#j-panelImgs"),
			d = n.find("#j-panelPaginate"),
			g = {
				p: o,
				file_name: t
			};
		"undefined" == typeof GLOBAL_NEED_COMPRESS || 0 == GLOBAL_NEED_COMPRESS ? g.need_compress = 0 : g.need_compress = 1, e.ajax({
			url: a.getImgList + "&id="+i+"&v=" + Math.round(100 * Math.random()),
			type: "post",
			dataType: "json",
			data: g,
			beforeSend: function() {
				r.find(".j-loading").show()
			},
			success: function(o) {
				if (1 == o.status) {
					s.imgs = _.isArray(o.data) ? o.data : null;
					var a = e(_.template(l.imgs, {
						dataset: s.imgs
					})),
						g = e(o.page);
					r.find(".j-loading").hide().end().find("ul,.j-noPic").remove().end().append(a), d.empty().append(g), g.filter("a:not(.disabled,.cur)").click(function() {
						var l = e(this).data("page");
						return c(n, i, l, t), !1
					})
				} else HYD.hint("danger", "对不起，图片获取失败：" + o.msg)
			}
		})
	};
	UpdateSubTreeNums = function(i) {
		if ("undefined" == typeof i) var i = e(n).find(".j-albumsNodes .selected").data("id");
		e.ajax({
			url: "index.php?con=design&act=sub_folder&v=" + Math.round(100 * Math.random()),
			type: "post",
			dataType: "json",
			data: {
				id: i
			},
			success: function(i) {
				if (1 == i.status) {
					var o = i.data.tree,
						t = e(n).find("#j-panelTree");
					o.push({
						id: "-1",
						picNum: i.data.total
					}, {
						id: "0",
						picNum: i.data.nocat_total
					});
					var c = function(e) {
							var n = arguments.callee;
							_.each(e, function(e) {
								t.find("dt[data-id=" + e.id + "]").find(".j-num").text(e.picNum), e.subFolder && e.subFolder.length && n(e.subFolder)
							})
						};
					c(o)
				} else console.log("更新文件夹树图片数量失败")
			}
		})
	}, 
	e.albums = function(i) {
		t = e.extend(!0, {}, o, i);
		var d = e("#albums"),
			g = e("#albums-overlay");
		if (!d.length) {
			d = e(l.main), g = e(l.overlay), e("body").append(d.hide(), g.hide());
			var u = d.find("#j-close"),
				p = d.find("#j-addFolder"),
				m = d.find("#j-renameFolder"),
				f = d.find("#j-delFolder"),
				h = d.find("#j-addImg"),
				bidcmsUpload = d.find("#j-uploadImg"),
				b = d.find("#j-moveImg"),
				y = d.find("#j-cateImg"),
				v = d.find("#j-delImg"),
				P = d.find("#j-panelTree"),
				$ = function() {
					d.fadeOut("fast"), g.fadeOut("fast"), d.find("#j-panelImgs li").removeClass("selected")
				};
			e.ajax({
				url: a.getFolderTree + "&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				success: function(n) {
					if (1 == n.status) {
						var i = _.template(l.treeFn),
							o = i({
								dataset: n.data.tree,
								templateFn: i
							}),
							t = e(_.template(l.tree, {
								dataset: n.data,
								nodes: o
							}));
						P.empty().append(t), d.find(".j-albumsNodes > dt:first").click()
					} else HYD.hint("danger", "对不起，文件夹获取失败：" + n.msg)
				}
			}), e(n).on("click", ".j-albumsNodes dt", function(n) {
				var i = e(this),o = i.data("id");
				i.parents(".j-albumsNodes").find("dt").removeClass("selected");
				i.addClass("selected");
				if (e(n.currentTarget).parents(".j-propagation").length) s.moveFolderID = o;
				else {
					s.folderID = o;
					var t = i.data("add"),
						c = i.data("rename"),
						l = i.data("del");
					1 == t ? p.show() : p.hide(), 1 == c ? m.show() : m.hide(), 1 == l ? f.show() : f.hide(), r(d, s.folderID, 0)
				}
				return !1
			});
			var j = function(n, i) {
					e.ajax({
						url: a.getSubFolderTree + "&v=" + Math.round(100 * Math.random()),
						type: "post",
						dataType: "json",
						data: {
							id: i
						},
						success: function(i) {
							if (1 == i.status) {
								var o = _.template(l.treeFn),
									t = o({
										dataset: i.data,
										templateFn: o
									});
								$render = e(t), n.parent("dt").siblings("dd").empty().append($render), $render.filter("dl").slideDown(200)
							}
						}
					})
				};
			e(n).on("click", ".j-albumsNodes dt i", function() {
				var n = e(this),
					i = n.parent("dt").siblings("dd").find(" > dl"),
					o = i.length,
					t = n.parent("dt").data("id");
				return n.hasClass("open") ? (n.removeClass("open"), i.slideUp(200)) : (n.addClass("open"), o ? i.slideDown(200) : j(n, t)), !1
			});
			var k = 0;
			d.on("click", "#j-panelImgs li", function() {
				return e(this).toggleClass("selected"), e(this).find(".img-name-edit").hide(), e(this).data("selectindex", k++), !1
			}), d.on("click", "#j-panelImgs li .albums-edit", function() {
				return e(this).children(".img-name-edit").show(), !1
			}), d.on("click", "#j-useImg", function() {
				if (!d.find("#j-panelImgs li.selected").length) return void HYD.hint("warning", "请选择图片！");
				var n = {},
					i = [];
				d.find("#j-panelImgs li.selected").each(function() {
					n[e(this).data("selectindex")] = s.imgs[e(this).index()].file
				});
				for (var o in n) i.push(n[o]);
				return t.callback && (t.callback(i), $()), !1
			}), p.click(function() {
				var n = [{
					id: 0,
					name: "未命名文件夹",
					picNum: 0
				}];
				e.ajax({
					url: a.addFolder + "&v=" + Math.round(100 * Math.random()),
					type: "post",
					dataType: "json",
					data: {
						name: n[0].name,
						parent_id: s.folderID
					},
					success: function(i) {
						if (1 == i.status) {
							n[0].id = i.data;
							var o = _.template(l.treeFn, {
								dataset: n
							});
							$render = e(o), P.find("dt[data-id='" + s.folderID + "']").siblings("dd").append($render), $render.css("display", "block"), $render.parent().siblings("dt").find(".icon-folder").addClass("open"), $render.find("dt:first").click(), m.click()
						} else HYD.hint("danger", "对不起，添加失败：" + i.msg)
					}
				})
			}), m.click(function() {
				var n = P.find("dt[data-id='" + s.folderID + "']"),
					i = n.find(".j-treeShowTxt"),
					o = n.find(".j-ip"),
					t = n.find(".j-loading");
				i.hide(), o.show().focus().select(), o.blur(function() {
					var n = e(this).val();
					e.ajax({
						url: a.renameFolder + "&v=" + Math.round(100 * Math.random()),
						type: "post",
						dataType: "json",
						data: {
							name: n,
							category_img_id: s.folderID
						},
						beforeSend: function() {
							t.css("display", "inline-block")
						},
						success: function(e) {
							1 == e.status ? i.find(".j-name").text(n) : HYD.hint("danger", "对不起，重命名失败：" + e.msg), i.show(), o.hide(), t.hide()
						}
					})
				})
			}), f.click(function() {
				var n = e("#tpl_albums_delFolder").html(),
					i = e(n),
					o = i.find("input[name=isDelImgs]");
				e.jBox.show({
					title: "提示",
					content: i,
					btnOK: {
						onBtnClick: function(n) {
							var i = o.filter(":checked").val();
							e.ajax({
								url: a.delFolder + "&v=" + Math.round(100 * Math.random()),
								type: "post",
								dataType: "json",
								data: {
									type: i,
									id: s.folderID
								},
								success: function(e) {
									if (1 == e.status) {
										UpdateSubTreeNums();
										var n = P.find("dt[data-id=" + s.folderID + "]").parent("dl");
										n.parent("dd").siblings("dt").click(), n.remove()
									} else HYD.hint("danger", "对不起，删除失败失败：" + e.msg)
								}
							}), e.jBox.close(n)
						}
					}
				})
			}), v.click(function() {
				if (!d.find("#j-panelImgs li.selected").length) return void HYD.hint("warning", "请选择要删除的图片！");
				var n = [];
				d.find("#j-panelImgs li.selected").each(function() {
					n.push(e(this).data("id"))
				}), e.ajax({
					url: a.delImg + "&v=" + Math.round(100 * Math.random()),
					type: "post",
					dataType: "json",
					data: {
						file_id: n
					},
					success: function(n) {
						1 == n.status ? (d.find("#j-panelImgs li.selected").fadeOut(300, function() {
							e(this).remove()
						}), UpdateSubTreeNums()) : HYD.hint("danger", "对不起，删除失败：" + n.msg)
					}
				})
			}), h.uploadify({
				debug: !1,
				auto: !0,
				width: 86,
				height: 28,
				multi: !0,
				swf: "/statics/plugins/uploadify/uploadify.swf",
				uploader: a.addImg,
				buttonText: "上传图片",
				fileSizeLimit: "5MB",
				fileTypeExts: "*.jpg; *.jpeg; *.png; *.gif; *.bmp",
				onUploadStart: function() {
					h.uploadify("settings", "formData", {
						cate_id: -1 == s.folderID ? 0 : s.folderID,
						PHPSESSID: e.cookie("PHPSESSID")
					})
				},
				onSelectError: function(e, n, i) {
					switch (n) {
					case -100:
						HYD.hint("danger", "对不起，系统只允许您一次最多上传10个文件");
						break;
					case -110:
						HYD.hint("danger", "对不起，文件 [" + e.name + "] 大小超出5MB！");
						break;
					case -120:
						HYD.hint("danger", "文件 [" + e.name + "] 大小异常！");
						break;
					case -130:
						HYD.hint("danger", "文件 [" + e.name + "] 类型不正确！")
					}
				},
				onFallback: function() {
					HYD.hint("danger", "您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。")
				},
				onUploadSuccess: function(e, n, i) {
					console.log(e, n, i)
				},
				onQueueComplete: function(e) {
					r(d, s.folderID, 1);
					UpdateSubTreeNums();
				},
				onUploadError: function(e, n, i, o) {
					HYD.hint("danger", "对不起：" + e.name + "上传失败：" + o)
				}
			}), bidcmsUpload.click(function() {
				field=bidcmsUpload.data('id');
				d.find("#temparea").html('<form id="'+field+'form" target="tempframe" method="post" action="'+a.addImg+'" enctype="multipart/form-data"><input id="'+field+'" name="'+field+'" type="file" value=""></form>');
				d.find("#temparea").find("#"+field).click();
				d.find("#temparea").find("#"+field).on("change",function(){
					e.ajax({
						url: a.addImg,
						type: 'POST',
						cache: false,
						data: new FormData(e(this).parent()[0]),
						processData: false,
						contentType: false,
						dataType:"json",
						beforeSend: function(){
							uploading = true;
						},
						success : function(data) {
							if(data.status==1){
								HYD.hint("success", "上传成功");
								r(d, s.folderID, 1);
							} else {
								HYD.hint("danger", "上传失败：" + data.msg)
							}
						}
					});
				});
			}), b.click(function() {
				if (!d.find("#j-panelImgs li.selected").length) return void HYD.hint("warning", "请选择要移动的图片！");
				var n = e("<div class='albums-cl-tree j-albumsNodes j-propagation'></div>");
				n.append(P.find("dd:first").contents().clone()), e.jBox.show({
					title: "请选择移动文件夹",
					content: n,
					onOpen: function() {
						n.find("dt:first").click()
					},
					btnOK: {
						onBtnClick: function(n) {
							var i = [];
							d.find("#j-panelImgs li.selected").each(function() {
								i.push(e(this).data("id"))
							}), e.ajax({
								url: a.moveImg + "&v=" + Math.round(100 * Math.random()),
								type: "post",
								dataType: "json",
								data: {
									file_id: i,
									cate_id: s.moveFolderID
								},
								success: function(i) {
									if (1 == i.status) {
										var o = e(n).find(".j-albumsNodes .selected").data("id");
										d.find("#j-panelImgs li.selected").fadeOut(300, function() {
											e(this).remove()
										}), UpdateSubTreeNums(), UpdateSubTreeNums(o), HYD.hint("success", "恭喜您，操作成功！")
									} else HYD.hint("danger", "对不起，移动失败：" + i.msg)
								}
							}), e.jBox.close(n)
						}
					}
				})
			}), y.click(function() {
				if (!s.folderID) return void HYD.hint("warning", "请选择要移动的分类！");
				var n = e("<div class='albums-cl-tree j-albumsNodes j-propagation'></div>");
				n.append(P.find("dd:first").contents().clone()), e.jBox.show({
					title: "请选择移动文件夹",
					content: n,
					onOpen: function() {
						n.find("dt:first").click()
					},
					btnOK: {
						onBtnClick: function(n) {
							e.ajax({
								url: a.moveCateImg + "&v=" + Math.round(100 * Math.random()),
								type: "post",
								dataType: "json",
								data: {
									cid: s.folderID,
									cate_id: s.moveFolderID
								},
								success: function(i) {
									if (1 == i.status) {
										var o = e(n).find(".j-albumsNodes .selected").data("id");
										d.find("#j-panelImgs li.selected").fadeOut(300, function() {
											e(this).remove()
										}), UpdateSubTreeNums(), UpdateSubTreeNums(o), HYD.hint("success", "恭喜您，操作成功！")
									} else HYD.hint("danger", "对不起，移动失败：" + i.msg)
								}
							}), e.jBox.close(n)
						}
					}
				})
			}), u.click($)
		}
		d.fadeIn("fast"), g.fadeIn("fast"), d.outerHeight() >= c.height && d.css({
			position: "absolute",
			marginTop: "0",
			top: e(n).scrollTop() + 10
		}), d.on("click", ".renameImg", function() {
			var n = e(this),
				i = n.closest("li").data("id"),
				o = n.siblings("input.file_name").val();
			return e.ajax({
				url: a.renameImg + "&v=" + Math.round(100 * Math.random()),
				type: "post",
				dataType: "json",
				data: {
					file_id: i,
					file_name: o
				},
				success: function(e) {
					1 == e.status ? (n.closest(".albums-edit").children(".img-name-edit").hide(), n.closest(".albums-edit").children("p").html(o), n.closest(".albums-edit").children("input.file_name").val(o), HYD.hint("success", "恭喜您，操作成功！")) : HYD.hint("danger", "对不起，操作失败")
				}
			}), !1
		}), d.on("click", ".searchImg", function() {
			var n = e(this).prev().val();
			r(d, s.folderID, 1, n)
		})
	}
}(jQuery, document, window),
HYD.popbox.ImgPicker = function(e) {
	$.albums({
		callback: e
	})
}, $(function() {
	var e = '<span class="autosave-loading"></span>',
		n = '<span class="save-success"><em class="gicon-ok white"></em>已自动保存</span>',
		i = "undefined" != typeof URL_virChkb && URL_virChkb.length ? URL_virChkb : window.location.href;
	$(".j-vir-chkb").each(function() {
		var e = $(this),
			n = e.find(".vir-chkb-actions"),
			o = e.find(".vir-chkb-enable"),
			t = e.find(".vir-chkb-disable"),
			c = e.find(".j-vir-checkbox"),
			l = c.is(":checked") ? !0 : !1;
		l ? (n.removeClass("disable").addClass("enable"), o.show(), t.hide()) : (n.removeClass("enable").addClass("disable"), o.hide(), t.show()),
		c.change(function() {
			var e, n = $(this),o = n.attr("name"),t = {"commit":1};
			e = "undefined" == typeof n.data("enableval") ? n.is(":checked") ? 1 : 0 : n.is(":checked") ? n.data("enableval") : n.data("disableval"), t.name = o, t.value = e;
			if(n.data('join')){
				if(e==1){
					$("#"+n.data('join')).removeClass('hide');
				} else {
					$("#"+n.data('join')).addClass('hide');
				}
			}

			if(n.data('ajax')!='no'){

				var c = n.siblings(".j-vir-formdata");
				c.each(function() {
					var e = $(this);
					t[e.data("name")] = e.val()
				}), $.ajax({
					url: i + "&v=" + Math.round(100 * Math.random()),
					type: "POST",
					dataType: "json",
					data: t,
					success: function(e) {
						1 != e.status && HYD.hint("danger", "对不起，保存失败：" + e.msg)
					}
				})
			}

		}), n.show().click(function() {
			l ? (t.show(), n.animate({
				left: -66
			}, 150, function() {
				o.hide()
			}), c.attr("checked", !1), l = !1) : (o.show(), n.animate({
				left: 0
			}, 150, function() {
				t.hide()
			}), c.attr("checked", !0), l = !0), c.trigger("change")
		})
	}),
	$(".j-text-autosave,.j-select-autosave").change(function() {
		var o = $(this),
			t = o.attr("name"),
			c = o.val(),
			l = $(e),
			s = o.get(0).nextSibling,
			a = s ? $(s) : o;
		$.ajax({
			url: i + "&v=" + Math.round(100 * Math.random()),
			type: "POST",
			dataType: "json",
			data: {
				commit:1,
				name: t,
				value: c
			},
			beforeSend: function() {
				l.insertAfter(a)
			},
			success: function(e) {
				l.fadeOut("fast", function() {
					if ($(this).remove(), 1 == e.status) {
						var i = $(n);
						i.insertAfter(a).animate({
							opacity: 1
						}, 200, function() {
							setTimeout(function() {
								i.fadeOut("fast", function() {
									i.remove()
								})
							}, 1e3)
						})
					} else HYD.hint("danger", "对不起，保存失败：" + e.msg)
				})
			}
		})
	}),
	$(".j-radio-autosave").change(function() {
		var o = $(this),
			t = o.parents(".form-controls").find(".j-autosavePanel"),
			c = o.attr("type"),
			l = o.attr("name"),
			s = o.val();
		if ("radio" == c) {
			var a = $(e);
			$.ajax({
				url: i + "&v=" + Math.round(100 * Math.random()),
				type: "POST",
				dataType: "json",
				data: {
					commit:1,
					name: l,
					value: s
				},
				beforeSend: function() {
					t.append(a)
				},
				success: function(e) {
					a.fadeOut("fast", function() {
						if ($(this).remove(), 1 == e.status) {
							var i = $(n);
							t.append(i), i.animate({
								opacity: 1
							}, 200, function() {
								setTimeout(function() {
									i.fadeOut("fast", function() {
										i.remove()
									})
								}, 1e3)
							})
						} else HYD.hint("danger", "对不起，保存失败：" + e.msg)
					})
				}
			})
		}
	});
	var o = {};
	$(".j-checkbox-autosave").each(function() {
		var t = $(this),
			c = t.parents(".form-controls").find(".j-autosavePanel"),
			l = (t.attr("type"), t.attr("name")),
			s = function() {
				var o = [];
				$("input[name='" + l + "']").each(function() {
					$(this).is(":checked") && o.push($(this).val())
				});
				var t = $(e);
				$.ajax({
					url: i + "&v=" + Math.round(100 * Math.random()),
					type: "POST",
					dataType: "json",
					data: {
						commit:1,
						name: l,
						value: o
					},
					beforeSend: function() {
						c.append(t)
					},
					success: function(e) {
						t.fadeOut("fast", function() {
							if ($(this).remove(), 1 == e.status) {
								var i = $(n);
								c.append(i), i.animate({
									opacity: 1
								}, 200, function() {
									setTimeout(function() {
										i.fadeOut("fast", function() {
											i.remove()
										})
									}, 1e3)
								})
							} else HYD.hint("danger", "对不起，保存失败：" + e.msg)
						})
					}
				})
			};
		o[l] = null, t.change(function() {
			o[l] && clearTimeout(o[l]), o[l] = setTimeout(s, 800)
		})
	})
});
