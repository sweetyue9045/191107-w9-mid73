//----------各種click----------
var searchbar = 0;
$(function () {
	var top = $('.container').offset().top - 55
	var down = $('footer').offset().top
	$(window).scroll(function () {
		if ($(this).scrollTop() > top) {
			$(".home_header").attr("style", "background-color: var(--Dark)")
		}
		else {
			$(".home_header").attr("style", "background-color: transparent ")
		}
	}).scroll();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			if ($(this).scrollTop() < down - 600) $('#backtotop').stop().animate({ bottom: "20px" });
			else $('#backtotop').stop().animate({ bottom: "-65px" });
		}
		else {
			$('#backtotop').stop().animate({ bottom: "-65px" });
		}
	}).scroll();

	$('#backtotop').click(function () { $('html,body').animate({ scrollTop: 0 }, 800); });
	var slide = 0;
	//----------景點----------
	//--輪播速度--
	$('.carousel').carousel({
		interval: 3500
	})
	//--預設地點點擊--
	$("#dropdown-toggle").click(function () {
		$("#dropdown-menu").slideToggle("");

		if (slide == 1) {
			slide = 0;
			$(".fa-chevron-up").attr("style", "display:none")
			$(".fa-chevron-down").attr("style", "display:block")
		}
		else {
			slide = 1;
			$(".fa-chevron-up").attr("style", "display:block")
			$(".fa-chevron-down").attr("style", "display:none")
		}
	});
	$('body').click(function (evt) {
		if (slide == 1) {
			if (evt.target.id != "dropdown-toggle") {
				$(".fa-chevron-up").attr("style", "display:none")
				$(".fa-chevron-down").attr("style", "display:block")
				$("#dropdown-menu").slideToggle("");
				slide = 0;
			}
		}
	});
	//--搜尋點擊--
	$("#searchitem").click(function () {
		if (searchbar == 0) {
			document.getElementById("dropdown-btn").style.display = "block";
			document.getElementById("form-control").style.display = "block";
			document.getElementById("attraction_hot").style.display = "none";
			$('#attraction_content').fadeIn();
			$("#searchitem").attr("style", "border-radius: 0 4px 4px 0 ;outline: none")
			$("#input-group").animate({ width: '200px' }, 200);
			searchbar = 1;
		}
		else if (searchbar != 0) {
			update();
		}
	});
	//--搜尋文字輸入--
	$(".form-control").keydown(function (event) {
		if (event.which != 8 && !event.shiftKey) {
			document.getElementById("load").style.display = "block";
			document.getElementById("attraction_content").style.display = "none";
		}
		if (event.which == 13) {
			update();
			return false;
		}
	});

	//----------行程----------
	//--選擇--
	$("#CheckAll").click(function () {
		$(".items:checkbox").prop("checked", false)
	});

	$(".items").click(function () {
		$("#CheckAll").prop("checked", false)
		var check = $("input[class='items']:checked").length
		console.log(check)
		if (check == 0) {
			$("#CheckAll").prop("checked", true)
			choosearea = null
			document.getElementById("route_content").style.display = "none";
			route(choosearea)
		}
	});
	//--搜尋文字輸入--
	$(".route_form_control").keydown(function (event) {
		if ($(".route_form_control").val().length == 1 && event.which == 8) {
			document.getElementById("route_form_control").value = ""
			document.getElementById("route_content").style.display = "none";
			change();
			$('#route_content').fadeIn();
		}
		if (event.which == 13) {
			document.getElementById("route_content").style.display = "none";
			change();
			$('#route_content').fadeIn();
			return false;
		}
	});
	$(".route_form_control").click(function () {
		$(".items:checkbox").prop("checked", false)
		$("#CheckAll").prop("checked", true)
		choosearea = null
		route(choosearea)
	})
	$('.showintro').hide();
	$('.introback').click(function (event) {
		$('.showintro').fadeOut();
	});
	$('.closeBtn1').click(function (event) {
		$('.showintro').fadeOut();
	});
	$('.closeBtn2').click(function (event) {
		$('.showintro').fadeOut();
	});
});

/*----------首頁頁面----------*/
//--抓資料庫--
function home(x) {
	$.ajax({
		type: 'GET',
		url: './static/Home.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				if (index == x) {
					document.getElementById("hot_content_title").innerHTML = element.title;
					document.getElementById("hot_content_text").innerHTML =
						'地址：' + element.address + " <br/> " +
						'電話：' + element.phone + " <br/> " +
						'開放時間：' + element.time + " <br/> <br/> " +
						element.hashtag;
					$(".hot_content img").attr("src", element.img)

				}
			});
		}
	});
}
//--點擊hot--
function changecontent(mytab) {
	home(mytab.id);
};
//--自己生成hot--
$(function () {
	home("hot1");
})

/*----------熱門頁面----------*/
--抓資料庫 + 渲染景點--
function attraction() {
	$.ajax({
		type: 'GET',
		url: '../static/attraction.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				var a = element.length
				for (i = 0; i < a; i++) {
					var attraction = element[i];
					$("#attraction_site").append('<div class="wrap attraction_intbox" data-index="' + attraction.name.toLowerCase() + ' ' + attraction.address + '"><div class="attraction_hover ' + attraction.name + '"><img src="' + attraction.img + '" /><div class="attraction_text"><div class="intbox_title">' + attraction.title + '</div><div class="intbox_address">' + attraction.area + '</div></div><div class="intbox_mask"><div class="intbox_mask_text">地址<br/>' + attraction.address + '<br/>開放時間<br/>' + attraction.time + '<br/>連絡電話<br/>' + attraction.phone + '</div></div></div></div>')
				}
			});
		}
	});
}
//--更新景點--
function update() {
	document.getElementById("load").style.display = "none";
	$('#attraction_content').fadeIn();
	var cSearch = $("#c-search");
	var value = $('#form-control').val();
	if (!value) {
		cSearch.html("");
		return;
	};
	cSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
}
//--點擊預設景點--
function area(area) {
	document.getElementById("form-control").value = area.text
	if (area.text == "全部") document.getElementById("form-control").value = ""
	document.getElementById("attraction_content").style.display = "none";
	update()
}

/*----------行程頁面----------*/
//--抓資料庫+渲染行程--
function route(myroute) {
	$("#route_content").empty()
	$.ajax({
		type: 'GET',
		url: '../static/route.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				var a = element.length
				if (myroute != null) {
					for (k = 0; k < choosearea.length; k++) {
						area = response[myroute[k]];
						if (index == myroute[k]) {
							for (i = 0; i < a; i++) {
								var route = area[i];
								$("#route_content").append('<div class="wrap" data-index="' + route.title + ' ' + route.area + '"><a class="name" id="' + route.title + '" onclick="showin(this)">' + route.title + '</a></div>')
							}
						}
					}
				}
				if (myroute == null) {
					for (i = 0; i < a; i++) {
						var route = element[i];
						$("#route_content").append('<div class="wrap" data-index="' + route.title + ' ' + route.area + '"><a class="name" id="' + route.title + '" onclick="showin(this)">' + route.title + '</a></div>')
					}
					choosearea = []
				}
			});
		}
	});
	$("#route_content").fadeIn(800)
}
function change() {
	var rSearch = $("#route_search");
	var value = $('#route_form_control').val();
	if (!value) {
		rSearch.html("");
		return;
	};
	rSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
	$('#route_content').fadeIn();

}
var choosearea = [];

function choose(mychoose) {
	Array.prototype.remove = function () {
		var what, a = arguments, L = a.length, ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax = this.indexOf(what)) !== -1) {
				this.splice(ax, 1);
			}
		}
		return this;
	}
	if (mychoose.checked) {
		choosearea.push(mychoose.id);
		if (mychoose.id == "CheckAll") {
			choosearea = null
		}
	}
	else {
		choosearea.remove(mychoose.id)
	}
	document.getElementById("route_content").style.display = "none";
	route(choosearea)
}


/*----------介紹頁面----------*/
function showin(id) {
	$(".tourline").empty()
	$.ajax({
		type: 'GET',
		url: '../static/route.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				var a = element.length
				for (i = 0; i < a; i++) {
					if (element[i].title == id.id) {
						var b = element[i].place.length
						for (x = 0; x < b; x++) {
							$(".tourline").append('<div class="tourlineBox"><img src="' + element[i].img[x] + '"><div class="tourlineSpots_Right"><div class="tourlineSpots_title">' + element[i].place[x] + '</div>' + element[i].contents[x] + '</div></div>')
							if (x < b - 1) {
								$(".tourline").append('<div class="tourlineBox_distance"><div class="distancebtn"><i class="fas fa-map-marker-alt"></i><a href="' + element[i].map[x] + '" target="_blank">  兩點距離：' + element[i].distance[x] + '</a></div></div>')
							}
						}
					}
				}

			})
		}
	})
	console.log(id.id)
	$('.showintro').fadeIn();
}

