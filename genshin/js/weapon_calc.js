var highlights = {};

function is_mobile() {
	// device detection
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
		return true;
	}

	return false;
}

function is_narrow_screen() {
	return window.innerWidth <= 600;
}

function is_retina() {
	var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";

	return matchMedia(query).matches;
}

function set_icon_bg($ele, type, id, size){
	var bg_image = 'images/角色雪碧图.png';

	if (type == 'weapon'){
		bg_image = 'images/武器雪碧图.png';
	}

	if (type == 'world_res'){
		bg_image = 'images/世界材料雪碧图.png';
	}

	if (type == 'ele_res'){
		bg_image = 'images/属性材料雪碧图.png';
	}

	if (type == 'drops'){
		bg_image = 'images/掉落雪碧图.png';
	}

	if (type == 'enhance_res'){
		bg_image = 'images/提升材料雪碧图.png';
	}

	if (type == 'daily_res'){
		bg_image = 'images/每日材料雪碧图.png';
	}

	$ele.css('background-image', 'url("' + bg_image + '")');

	var dim = positions[type]['dim'];
	var pos = positions[type]['list'][id];
	var cols = positions[type]['cols'];

	var new_width = size * cols;
	var new_height = size * (Math.ceil(Object.keys(positions[type]['list']).length / cols));

	$ele.css('background-size', (new_width + 'px ' + new_height + 'px'));

	var position = '-' + pos[1] * size + 'px -' + pos[0] * size + 'px';

	$ele.css('background-position', position);
}

function populate_weapon_level_selectors(){
	var html = '';

	for (i = 1; i <= 90; i++){
		html += '<span class="number_val_option" data-level="' + i + '">' + i + '</span>';
	}

	$('#weapon_lower_level .number_list_options').html(html);
	$('#weapon_higher_level .number_list_options').html(html);

	restrict_level_selections();
}

function hide_weapon_selector(){
	$('#weapon_selection_popup').hide();
	hide_overlay();
}

function hide_weapon_level_selection(id){
	$ele = $('#' + id);
	$ele.children('.number_list').hide();
	$ele.removeClass('selecting');
}

function show_weapon_level_selection(id){
	$ele = $('#' + id);
	$ele.children('.number_list').show();
	$ele.addClass('selecting');
}

function hide_weapon_level_selections(){
	hide_weapon_level_selection('weapon_lower_level');
	hide_weapon_level_selection('weapon_higher_level');
}

function toggle_weapon_level_selection(id){
	$ele = $('#' + id);
	if ($ele.hasClass('selecting')){
		hide_weapon_level_selection(id);
	}else{
		show_weapon_level_selection(id);

		gtag('event', 'lvl_click', {
			'event_category': 'weapon_calc',
			'event_label': id
		});
	}
}

function get_weapon_level_lower_val(){
	return $('#weapon_lower_level .number_val').data('level');
}

function get_weapon_level_higher_val(){
	return $('#weapon_higher_level .number_val').data('level');
}

function set_weapon_lower_level($ele, event){
	if ($ele.hasClass('disabled')){
		event.stopPropagation();
		return;
	}

	var level = $ele.data('level');

	$('#weapon_lower_level .number_val').html(level);
	$('#weapon_lower_level .number_val').data('level', level);

	restrict_level_selections();

	gtag('event', 'low_lvl_click', {
		'event_category': 'weapon_calc',
		'event_label': level
	});
}

function set_weapon_higher_level($ele, event){
	if ($ele.hasClass('disabled')){
		event.stopPropagation();
		return;
	}

	var level = $ele.data('level');

	$('#weapon_higher_level .number_val').html(level);
	$('#weapon_higher_level .number_val').data('level', level);

	restrict_level_selections();

	gtag('event', 'high_lvl_click', {
		'event_category': 'weapon_calc',
		'event_label': level
	});
}

function restrict_level_selections(){
	$('#weapon_lower_level .number_val_option').removeClass('disabled');
	$('#weapon_higher_level .number_val_option').removeClass('disabled');

	var lower_level = get_weapon_level_lower_val();
	var higher_level = get_weapon_level_higher_val();

	$('#weapon_lower_level .number_val_option').each(function(i, ele){
		level = $(ele).data('level');
		if (level > higher_level - 1){
			$(ele).addClass('disabled');
		}
	});

	$('#weapon_higher_level .number_val_option').each(function(i, ele){
		level = $(ele).data('level');
		if (level < lower_level + 1){
			$(ele).addClass('disabled');
		}
	});
}

function build_icon_img(type, name){
	var html = '<p id="' + name + '" class="optimized_icon ' + type + '"></p>';
	return html;
}

function build_icon(type, name){
	var html = '<div class="icon">';

	var bg_color = 'orange';
	var star = get_weapon_star(name);

	if (star == 4){
		bg_color = 'purple';
	}

	html += '<div class="icon_inner ' + bg_color + '">';
	html += build_icon_img(type, name);	
	html += '</div>';
	var span_class = '';
	if (name.length > 4){
		span_class = 'small';
	}
	html += '<span class="' + span_class + '"">' + name + '</span>';
	html += '</div>';

	return html;
}

function load_highlights(){
	var obj = localStorage.getItem('highlights');
	if (obj == null){
		highlights = {};
	}else{
		highlights = JSON.parse(obj);
	}
}

function set_favorite_weapons(){
	var html = '';
	var have_highlights = 0;

	for(weapon in highlights){
		if (weapon in highlights && highlights[weapon] && weapon in data['weapon_reqs']){
			html += build_icon('weapon', weapon);
			have_highlights++;
		}
	}

	if (have_highlights){
		$('#weapon_selection_fav_list').html(html);
		reposition_icons($('#weapon_selection_fav_list'));	
	}else{
		$('#weapon_selection_fav_section').hide();
	}
}

function show_weapon_selection_popup(){
	$('#weapon_selection_popup').show();
}

function toggle_popup_fav_list(){
	if ($('#weapon_selection_fav_list').hasClass('show')){
		$('#weapon_selection_fav_list').hide();
		$('#weapon_selection_fav_list').removeClass('show');
		$('#weapon_selection_expander i').removeClass('expanded');
	}else{
		$('#weapon_selection_fav_list').show();
		$('#weapon_selection_fav_list').addClass('show');
		$('#weapon_selection_expander i').addClass('expanded');
	}
}

function toggle_form_selection($ele){
	var form = $ele.data('form');
	$('.weapon_selection_form_tab').removeClass('selected');
	$ele.addClass('selected');

	show_form_weapons(form);

	gtag('event', 'weapon_selection_open', {
		'event_category': 'weapon_calc'
	});
}

function show_form_weapons(form){
	var html = '';

	for (weapon in data['weapon_reqs']){
		if (data['weapon_reqs'][weapon]['form'] == form){
			html += build_icon('weapon', weapon);
		}
	}

	$('#weapon_selection_form_list').html(html);

	reposition_icons($('#weapon_selection_form_list'));
}

function get_weapon_star(name){
	return data['weapon_reqs'][name]['star'];
}

function set_level_list_values(star){
	if (star == 4){
		$('#weapon_lower_level .number_val_option').each(function(e, ele){
			if ($(ele).data('level') > 80){
				$(ele).hide();
			}
		});

		$('#weapon_higher_level .number_val_option').each(function(e, ele){
			if ($(ele).data('level') > 80){
				$(ele).hide();
			}
		});

		if ($('#weapon_lower_level .number_val').data('level') >= 80){
			$('#weapon_lower_level .number_val').data('level', 1);
			$('#weapon_lower_level .number_val').html(1);
		}

		if ($('#weapon_higher_level .number_val').data('level') > 80){
			$('#weapon_higher_level .number_val').data('level', 80);
			$('#weapon_higher_level .number_val').html(80);
		}
	}else{
		$('#weapon_lower_level .number_val_option').each(function(e, ele){
			if ($(ele).data('level') > 80){
				$(ele).show();
			}
		});

		$('#weapon_higher_level .number_val_option').each(function(e, ele){
			if ($(ele).data('level') > 80){
				$(ele).show();
			}
		});
	}
}

function set_weapon(name){
	$('#selector_plus').hide();

	set_icon_bg($('#weapon_calc_weapon_selector_inner'), 'weapon', name, 70);

	var bg = 'bg_orange';
	var star = get_weapon_star(name);

	if (star == 4){
		bg = 'bg_purple';
	}

	$('#weapon_calc_weapon_selector').removeClass();
	$('#weapon_calc_weapon_selector').addClass(bg);

	$('#weapon_calc_weapon_selector').data('weapon', name);
	$('#needed_materials').hide();

	gtag('event', 'weapon_selection', {
		'event_category': 'weapon_calc',
		'event_label': name
	});
}

function calculate_level_req(){
	var name = $('#weapon_calc_weapon_selector').data('weapon');

	if (!name){
		return;
	}

	var reqs = data['weapon_reqs'][name];

	var lower_level = get_weapon_level_lower_val();
	var higher_level = get_weapon_level_higher_val();

	var xp_needed = _calculate_needed_xp(reqs['star'], lower_level, higher_level);
	var mats_needed = _calculate_breakthrough_mats(lower_level, higher_level, reqs);

	var mats = _flatten_mats(mats_needed);
	mats['xp'] = xp_needed;

	populate_req_output(mats);

	gtag('event', 'calc_weapon', {
		'event_category': 'weapon_calc'
	});
}

function get_mineral_count(xp){
	var large = Math.floor(xp / 10000);
	var remaining = xp - Math.floor(xp / 10000) * 10000;
	var med = Math.floor(remaining / 2000);
	var remaining = remaining - Math.floor(remaining / 2000) * 2000;
	var small = Math.ceil(remaining / 400);

	return [large, med, small];
}

function populate_req_minerals(minerals_count){
	var large = minerals_count[0];
	var med = minerals_count[1];
	var small = minerals_count[2];

	var html = '';

	html += '<div class="needed_book">';
	html += '<div class="mat_icon bg_blue" data-name="水晶3" data-type="enhance_res"><div class="mat_icon_inner"></div></div><span><i class="mat_multiplier">x</i><b class="mat_count">' + large + '</b></span>';
	html += '</div>';

	html += '<div class="needed_book">';
	html += '<div class="mat_icon bg_green" data-name="水晶2" data-type="enhance_res"><div class="mat_icon_inner"></div></div><span><i class="mat_multiplier">x</i><b class="mat_count">' + med + '</b></span>';
	html += '</div>';

	html += '<div class="needed_book">';
	html += '<div class="mat_icon bg_grey" data-name="水晶1" data-type="enhance_res"><div class="mat_icon_inner"></div></div><span><i class="mat_multiplier">x</i><b class="mat_count">' + small + '</b></span>';
	html += '</div>';

	$('#needed_books').html(html);
}

function get_total_mora_needed(minerals_count, mora){
	var total_mora = mora;

	total_mora += minerals_count[0] * 1000;
	total_mora += minerals_count[1] * 200;
	total_mora += minerals_count[2] * 40;

	return total_mora;
}

function populate_req_output(mats){
	$('#needed_xp span').html(mats['xp']);
	var minerals_count = get_mineral_count(mats['xp']);

	populate_req_minerals(minerals_count);

	var mora_needed = 0;

	if ('mora' in mats){
		mora_needed = mats['mora']['c'];
	}

	var total_mora = get_total_mora_needed(minerals_count, mora_needed);

	$('#needed_mora span').html(total_mora);

	delete mats['xp'];
	delete mats['mora'];

	var html = '';

	for (mat in mats){
		var proper_name = mat;

		if (mat in data['name_transform']){
			proper_name = data['name_transform'][mat];	
		}

		var bg = 'bg_orange';

		var star = data['item_rarity'][proper_name];

		switch (star){
			case 4:
				bg = 'bg_purple';
				break;
			case 3:
				bg = 'bg_blue';
				break;
			case 2:
				bg = 'bg_green';
				break;
			case 1:
				bg = 'bg_grey';
				break;
		}

		html += '<div class="needed_res">';
		html += '<div class="mat_icon ' + bg + '" data-name="' + mat + '" data-type="' + mats[mat]['t'] + '"><div class="mat_icon_inner"></div></div><span>' + proper_name + '<i class="mat_multiplier">x</i><b class="mat_count">' + mats[mat]['c'] + '</b></span>';
		html += '</div>';
	}

	$('#needed_mats').html(html);
	$('#needed_materials').show();

	$('.mat_icon').each(function(i, ele){
		var type = $(ele).data('type');
		var name = $(ele).data('name');
		var inner = $(ele).children('.mat_icon_inner');
		var size = 60;

		if (is_mobile() || is_narrow_screen()){
			size = 40;
		}

		set_icon_bg(inner, type, name, size);
	});
}

function _flatten_mats(mats){
	var out = {};

	for (mat in mats){
		for (level in mats[mat]){
			if (level == 0){
				out[mat] = {
					'c': mats[mat][level],
					't': mats[mat]['type']
				}
			}else{
				if (level != 'type'){
					out[mat + level] = {
						'c': mats[mat][level],
						't': mats[mat]['type']
					}
				}
			}
		}
	}

	return out;
}

function _get_mats_for_level(level, reqs){
	var mats = data['weapon_breakthrough_stats'][reqs['star']][level];
	var out = {};

	out[reqs['daily_req']] = {
		'level': mats['daily_req_level'],
		'count': mats['daily_req_count'],
		'type': 'daily_res'
	};

	out[reqs['champ_attrib_req']] = {
		'level': mats['champ_attrib_req_level'],
		'count': mats['champ_attrib_req_count'],
		'type': 'drops'
	};

	out[reqs['world_mon_req']] = {
		'level': mats['world_mon_req_level'],
		'count': mats['world_mon_req_count'],
		'type': 'drops'
	};

	out['mora'] = {
		'count': mats['mora'],
		'type': 'mora'
	};

	return out;
}

function _calculate_breakthrough_mats(low, high, reqs){
	var out = [];

	var breakthrough_levels = [20, 40, 50, 60, 70, 80];
	var all_mats = [];

	breakthrough_levels.forEach(function(i){
		if (low <= i && high > i){
			all_mats.push(_get_mats_for_level(i, reqs));
		}
	});

	return _merge_mats(all_mats);
}

function _merge_mats(mats){
	var out = {};

	mats.forEach(function(m){
		for (name in m){
			if (m[name]['count'] == 0){
				continue;
			}

			if (name in out){
				if ('level' in m[name]){
					if (out[name][m[name]['level']]){
						out[name][m[name]['level']] += m[name]['count'];
					}else{
						out[name][m[name]['level']] = m[name]['count'];
					}
				}else{
					out[name][0] += m[name]['count'];
				}
			}else{
				out[name] = {'type': m[name]['type']};
				if ('level' in m[name]){
					out[name][m[name]['level']] = m[name]['count'];
				}else{
					out[name][0] = m[name]['count'];
				}
			}
		}
	});

	return out;
}

function _calculate_needed_xp(star, low, high){
	var sum = 0;

	for (i = low; i < high; i++){
		sum += data['weapon_level_stats'][star][i];
	}

	return sum;
}

function reposition_icons($list){
	var icons = $list.children('.icon');
	var prev_item = icons[0];

	icons.each(function(i){
		var id = $(icons[i]).children('.icon_inner').children('p').attr('id');
		var star = get_weapon_star(id);

		if (star == 5){
			$(icons[i]).insertBefore($(icons[0]));
		}
	});
}

function show_overlay(){
	var height = document.body.offsetHeight;
	var header_height = 70;

	if (is_mobile()){
		header_height = 50;
	}

	height -= header_height - 20;

	$('#overlay').css('top', header_height + 'px');
	$('#overlay').css('height', height + 'px');
	$('#overlay').show();
}

function hide_overlay(){
	$('#overlay').hide();
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
	populate_weapon_level_selectors();
	load_highlights();
	set_favorite_weapons();
	show_form_weapons('单手剑');

	$('#weapon_lower_level').on('click', function(e){
		hide_weapon_level_selection('weapon_higher_level');
		toggle_weapon_level_selection('weapon_lower_level');
		e.stopPropagation();
	});

	$('#weapon_higher_level').on('click', function(e){
		hide_weapon_level_selection('weapon_lower_level');
		toggle_weapon_level_selection('weapon_higher_level');
		e.stopPropagation();
	});

	$('#weapon_lower_level').on('click', '.number_val_option', function(e){
		set_weapon_lower_level($(this), e);
		hide_weapon_level_selections();
		e.stopPropagation();
	});

	$('#weapon_higher_level').on('click', '.number_val_option', function(e){
		set_weapon_higher_level($(this), e);
		hide_weapon_level_selections();
		e.stopPropagation();
	});

	$('#weapon_calc_weapon_selector').on('click', function(e){
		show_weapon_selection_popup();
		hide_weapon_level_selections();
		show_overlay();
		e.stopPropagation();
	});

	$('#weapon_selection_popup').on('click', function(e){
		e.stopPropagation();
	});

	$('#weapon_selection_expander').on('click', function(){
		toggle_popup_fav_list();
	});

	$('.weapon_selection_form_tab').on('click', function(){
		toggle_form_selection($(this));
	});

	$('#weapon_selection_fav_list').on('click', '.weapon', function(){
		set_weapon($(this).attr('id'));
		hide_weapon_selector();
	});

	$('#weapon_selection_form_list').on('click', '.weapon', function(){
		set_weapon($(this).attr('id'));
		hide_weapon_selector();
	});

	$('#weapon_level_calc_btn').on('click', function(){
		calculate_level_req();
	});

	$('body').on('click', function(){
		hide_weapon_selector();
		hide_weapon_level_selections();
		close_nav();
	});

	$('#overlay').on('click', function(e){
		hide_weapon_selector();
		e.stopPropagation();
	});

	$('#nav_burger').on('click', function(e){
		toggle_nav();
		e.stopPropagation();
	});
});