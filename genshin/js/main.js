var nav_shown = 0;
var popup_height = 130;
var popup_width = 200;
var popup_margin = 20;
var highlights = {};
var items = {};

function is_mobile() {
	// device detection
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
		return true;
	}

	return false;
}

function build_icon_img(type, name){
	var html = '<p id="' + name + '" class="optimized_icon ' + type + '"></p>';
	return html;
}

function build_icon(item, pos){
	var html = '<div class="icon" data-position="' + pos + '">';

	var bg_color = 'orange';

	if (item['star'] == 4){
		bg_color = 'purple';
	}

	if (item['star'] == 3){
		bg_color = 'blue';
	}

	html += '<div class="icon_inner ' + bg_color + '">';
	html += build_icon_img(item['type'], item['name']);	
	html += '</div>';
	var span_class = '';
	if (item['name'].length > 4){
		span_class = 'small';
	}
	html += '<span class="' + span_class + '"">' + item['name'] + '</span>';
	html += '</div>';

	return html;
}

function build_icons(items){
	var html = '<div class="iconset clearfix">';
	html += '<div class="iconset_inner clearfix">';

	var pos = 1;

	items.forEach(function(item){
		html += build_icon(item, pos++);
	});

	html += '</div>';
	html += '</div>';

	return html;
}

function build_material(day){
	if (day == -1){
		return;
	}

	var weapons = data['weapon_dates'][day];
	var html = '';

	for (i = 1; i <= 4; i++){
		html += '<p class="optimized_icon material" id="' + weapons[0] + i + '"></p>';
	}
	
	$('#mondstadt_weapon_material').html(html);

	html = '';
	for (i = 1; i <= 4; i++){
		html += '<p class="optimized_icon material" id="' + weapons[1] + i + '"></p>';
	}
	
	$('#liyue_weapon_material').html(html);

	var chars = data['char_dates'][day];

	html = '';
	html += '<span>' + chars[0] + '</span>';
	for (i = 1; i <= 3; i++){
		html += '<p class="optimized_icon material" id="' + chars[0] + i + '"></p>';
	}
	
	$('#mondstadt_trait_material').html(html);

	html = '';
	html += '<span>' + chars[1] + '</span>';
	for (i = 1; i <= 3; i++){
		html += '<p class="optimized_icon material" id="' + chars[1] + i + '"></p>';
	}
	
	$('#liyue_trait_material').html(html);
}

function build_weapons(day){
	var m_weapons = [];
	var l_weapons = [];
	var regions = [];

	if (day == -1){
		regions = data['weapon_dates'][0].concat(data['weapon_dates'][1]).concat(data['weapon_dates'][2]);
	}else{
		regions = data['weapon_dates'][day];
	}

	regions.forEach(function(r){
		weapons = data['weapons'][r];
		region = weapons[0]['region'];
		if (region == '蒙德'){
			m_weapons = m_weapons.concat(weapons);
		}

		if (region == '璃月'){
			l_weapons = l_weapons.concat(weapons);
		}
	});

	m_weapons.sort(function (a, b) {
		return b['star'] - a['star'];
	});

	var html = build_icons(m_weapons);
	$('#mondstadt_weapons').html(html);

	l_weapons.sort(function (a, b) {
		return b['star'] - a['star'];
	});

	html = build_icons(l_weapons);
	$('#liyue_weapons').html(html);
}

function build_chars(day){
	var m_chars = [];
	var l_chars = [];
	var regions = [];

	if (day == -1){
		regions = data['char_dates'][0].concat(data['char_dates'][1]).concat(data['char_dates'][2]);
	}else{
		regions = data['char_dates'][day];
	}

	regions.forEach(function(r){
		chars = data['chars'][r];
		region = chars[0]['region'];
		if (region == '蒙德'){
			m_chars = m_chars.concat(chars);
		}

		if (region == '璃月'){
			l_chars = l_chars.concat(chars);
		}
	});

	m_chars.sort(function (a, b) {
		return b['star'] - a['star'];
	});

	var html = build_icons(m_chars);
	$('#mondstadt_chars').html(html);

	l_chars.sort(function (a, b) {
		return b['star'] - a['star'];
	});

	html = build_icons(l_chars);
	$('#liyue_chars').html(html);
}

function rebuild_day(day){
	remove_sunday();

	update_cal_selector(day);
	update_material_heading(day);
	build_weapons(day - 1);
	build_chars(day - 1);
	build_material(day - 1);

	position_highlights();
}

function get_cal_day_text(day){
	var text = '';

	switch (day){
		case 0:
			text = '星期天';
			break;
		case 1:
			text = '星期一';
			break;
		case 2:
			text = '星期二';
			break;
		case 3:
			text = '星期三';
			break;
		case 4:
			text = '星期四';
			break;
		case 5:
			text = '星期五';
			break;
		case 6:
			text = '星期六';
			break;
	}

	var today = get_today();
	if (day == today){
		text = '今日';
	}

	return text;
}

function update_cal_selector(day){
	$('#nav_day').html(get_cal_day_text(day));
}

function setup_cal_selectors(){
	var html = '';

	for (i = 1; i < 7; i++){
		html += '<a class="day_selector" data-day=' + i + '>' + get_cal_day_text(i) + '</a>';
	}
		
	$('#nav_inner').html(html);
}

function update_material_heading(day){
	var date = get_cal_day_text(day);

	$('#trait_material_heading').html(date + '素材可升天赋角色');
	$('#weapon_material_heading').html(date + '素材可突破武器');
}

function get_today(){
	var date = new Date();
	var day = date.getDay();
	var hour = date.getHours();

	if (hour < 4){
		day = (day + 6) % 7;
	}

	return day;
}

function remove_all_popup(){
	$('#icon_popup').remove();
	$('.popped').removeClass('popped');
}

function create_popup($ele){
	var icon = $ele.parent().parent();
	var origin = icon.hasClass('popped');
	var id = icon.children('.icon_inner').children('.optimized_icon').attr('id')

	remove_all_popup();

	if (!origin){
		var highlight_class = '';

		if (highlights[id]){
			highlight_class = 'highlighted';
		}

		var html = '<div id="icon_popup"><i id="popup_triangle"></i><div id="icon_popup_inner"><h3>其他所需材料<a data-id="' + id + '" class="highlight_item ' + highlight_class + '">highlight</a></h3>';

		var bg_color = 'grey';

		html += '<div id="req1" class="req_icon">';
		html += '<div class="drop_icon_bg ' + bg_color + '">';
		html += build_icon_img('drop', items[id]['req1'] + '1');
		html += '</div>';
		html += '<span>' + items[id]['req1'] + '系列</span>';

		var item_id = items[id]['req2'] + '1';
		var item_name = items[id]['req2'] + '系列';

		if ($ele.hasClass('char')){
			bg_color = 'orange';
			item_id = items[id]['req2'];
			item_name = items[id]['req2'];
		}

		html += '</div><div id="req2" class="req_icon">';
		html += '<div class="drop_icon_bg ' + bg_color + '">';
		html += build_icon_img('drop', item_id);
		html += '</div>';
		html += '<span>' + item_name + '</span>';
		html += '</div>';
		html += '</div></div>';

		icon.append(html);
		icon.addClass('popped');

		if ($ele.hasClass('char')){
			gtag('event', 'char_click', {
				'event_category': 'material',
				'event_label': id
			});
		}

		if ($ele.hasClass('weapon')){
			gtag('event', 'weapon_click', {
				'event_category': 'material',
				'event_label': id
			});
		}
	}

	position_popup(icon);
}

function position_popup(icon){
	var body_height = document.body.offsetHeight;
	var body_width = document.body.offsetWidth;
	var icon_bottom = icon.offset().top + icon.height();
	var icon_right = icon.offset().left + icon.width();

	if ((body_height - icon_bottom) < (popup_height + popup_margin)){
		$('#icon_popup').css('top', '-' + (popup_height + 10) + 'px');
		$('#popup_triangle').css('top', '120px');
		$('#popup_triangle').css('border-width', '20px 16px 0 16px');
		$('#popup_triangle').css('border-color', '#E7E3DB transparent transparent transparent');
	} else {
		$('#icon_popup').css('top', icon.height() - 10 + 'px');
	}

	var half_icon = icon.width() / 2;
	var half_popup = popup_width / 2;
	var left_offset = - (half_popup - icon.width() / 2);
	var body_margin = 8;
	var triangle_offset = 84;

	// Adjust left positioning if cut off
	var left_spacing = icon.offset().left + half_icon - body_margin;
	if (left_spacing < half_popup){
		left_offset += half_popup - left_spacing;
		triangle_offset -= half_popup - left_spacing;
	}

	// Adjust right positioning if cut off
	var right_spacing = body_width - (icon.offset().left + icon.width() - half_icon) - body_margin;
	if (right_spacing < half_popup){
		left_offset -= half_popup - right_spacing;
		triangle_offset += half_popup - right_spacing;
	}

	$('#icon_popup').css('left', (left_offset) + 'px');
	$('#popup_triangle').css('left', triangle_offset + 'px');
}

function load_highlights(){
	var obj = localStorage.getItem('highlights');
	if (obj == null){
		for (r in data['weapons']){
			for (i in data['weapons'][r]){
				w = data['weapons'][r][i];
				highlights[w['name']] = 0;
			}
		}

		for (r in data['chars']){
			for (i in data['chars'][r]){
				w = data['chars'][r][i];
				highlights[w['name']] = 0;
			}
		}
	}else{
		highlights = JSON.parse(obj);
	}
}

function move_highlighted_icon(icon){
	var prev = icon.prev();

	while(prev.length){
		if (prev.hasClass('highlighted')){
			if (prev.data('position') > icon.data('position')){
				icon.insertBefore(prev);	
			}else{
				break;	
			}
		}else{
			icon.insertBefore(prev);
		}

		prev = icon.prev();
	}
	
	if ($('#icon_popup').length){
        position_popup(icon);
	}
}

function move_unhighlighted_icon(icon){
	var next = icon.next();

	while(next.length){
		if (next.hasClass('highlighted')){
			icon.insertAfter(next);
		}else{
			if (next.data('position') > icon.data('position')){
				break;
			}else{
				icon.insertAfter(next);	
			}	
		}

		next = icon.next();
	}

	if ($('#icon_popup').length){
        position_popup(icon);
	}
}

function save_highlights(){
	localStorage.setItem('highlights', JSON.stringify(highlights));
}

function highlight_icon(id){
	var icon = $('#' + id).parent().parent();
	icon.addClass('highlighted');
	icon.append('<i class="icon_highlight"></i>');
	move_highlighted_icon(icon);
}

function unhighlight_icon(id){
	var icon = $('#' + id).parent().parent();
	icon.removeClass('highlighted');
	icon.children('.icon_highlight').remove();
	move_unhighlighted_icon(icon);
}

function toggle_highlight(ele){
	var id = ele.data('id');

	if (highlights[id]){
		highlights[id] = 0;
		unhighlight_icon(id);
		ele.removeClass('highlighted');

		gtag('event', 'unfavorite', {
			'event_category': 'material',
			'event_label': id
		});
	}else{
		highlights[id] = 1;
		highlight_icon(id);
		ele.addClass('highlighted');

		gtag('event', 'favorite', {
			'event_category': 'material',
			'event_label': id
		});
	}

	save_highlights();
}

function position_highlights(){
	for (id in highlights){
		if (highlights[id]){
			if ($('#' + id).length){
				highlight_icon(id);	
			}
		}
	}
}

function load_items(){
	for (i in data['chars']){
		for (j in data['chars'][i]){
			items[data['chars'][i][j]['name']] = data['chars'][i][j];
		}
	}

	for (i in data['weapons']){
		for (j in data['weapons'][i]){
			items[data['weapons'][i][j]['name']] = data['weapons'][i][j];
		}
	}	
}

function update_for_sunday(){
	$('#trait_material_heading').before('<div id="sunday_remark"><p id="sunday_remark_inner">今天啥都掉，掉啥任你选(｡･ ω<)ゞ♡<br />所以只看你★的角色就好啦~<br />想知道其他日期的可以点击右上角周历哟</p></div>');
}

function remove_sunday(){
	$('#weapon_section').show();
	$('.material_section').show();

	$('#sunday_remark').remove();
}

function show_nav(){
	$('nav').show();

	var height = window.innerHeight;
	var header_height = 70;

	if (is_mobile()){
		header_height = 50;
	}

	height -= header_height;
	$('nav').css('height', height + 'px');

	$('#nav_slide_footer').css('position', 'absolute');
	$('#nav_slide_footer').css('bottom', 0);

	var top_bottom = Math.round($('#nav_slide_links').offset().top + $('#nav_slide_links').height());
	var bottom_top = Math.round(height - $('#nav_slide_footer').height());
	var note_height = $('#nav_slide_note').height();

	$('#nav_slide_note').css('margin-top', (Math.round((bottom_top - top_bottom) / 2) - 8) + 'px');
}

function close_nav(){
	$('nav').hide();
}

function toggle_nav(){
	if ($('nav').css('display') == 'none'){
		show_nav();
	}else{
		close_nav();
	}
}

$(document).ready(function(){
	var today = get_today();
	setup_cal_selectors();
	update_cal_selector(today);
	update_material_heading(today);
	load_highlights();
	load_items();

	build_material(today - 1);
	build_weapons(today - 1);
	build_chars(today - 1);

	position_highlights();

	if (today == 0){
		update_for_sunday();
	}

	$('#nav_dropdown').on('click', function(){
		if (!nav_shown){
			$('#nav_inner').show();
			nav_shown = 1;

			gtag('event', 'cal_click', {
				'event_category': 'material'
			});
		}else{
			$('#nav_inner').hide();
			nav_shown = 0;
		}
	});

	$('.day_selector').on('click', function(e){
		day = $(this).data('day');
		rebuild_day(day);

		gtag('event', 'cal_click', {
			'event_category': 'material',
			'event_label': day
		});
	});

	$('#trait_section').on('click', '.char', function(e){
		create_popup($(this));
		e.stopPropagation();
	});

	$('#weapon_section').on('click', '.weapon', function(e){
		create_popup($(this));
		e.stopPropagation();
	});

	$('main').on('click', '#icon_popup', function(e){
		e.stopPropagation();
	});

	$('body').on('click', function(){
		remove_all_popup();
		close_nav();
	});

	$('main').on('click', '.highlight_item', function(){
		toggle_highlight($(this));
	});

	$('#nav_burger').on('click', function(e){
		toggle_nav();
		e.stopPropagation();
	});
});