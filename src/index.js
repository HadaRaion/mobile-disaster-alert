import './styles/index.scss';
import Glide from '@glidejs/glide';
import FlareLane from '@flarelane/flarelane-web-sdk';

// FlareLane.initialize({
// 	projectId: '프로젝트ID',
// 	// 사용중인 별도 이름의 ServiceWorker가 있는 경우 해당 경로
// 	// serviceWorkerPath: '/otherServiceWorker.js'
// });

const alertPage = document.body.classList.contains('alert-page');
const myLocationPage = document.body.classList.contains('my-location');
const infoPage = document.body.classList.contains('info');
const m18Page = document.body.classList.contains('m18');
const m26Page = document.body.classList.contains('m26');

const newsPage = document.body.classList.contains('news');
const guidePage = document.body.classList.contains('guide');
const cctvPage = document.body.classList.contains('cctv');
const detourPage = document.body.classList.contains('detour');
const reportPage = document.body.classList.contains('report');

// Navigation
infoPage && document.querySelector('.nav__info').classList.add('active');
newsPage && document.querySelector('.nav__news').classList.add('active');
guidePage && document.querySelector('.nav__guide').classList.add('active');
cctvPage && document.querySelector('.nav__cctv').classList.add('active');
detourPage && document.querySelector('.nav__detour').classList.add('active');
reportPage && document.querySelector('.nav__report').classList.add('active');

if (alertPage) {
	const alertOpenBtn = document.querySelector('.alert-title');
	const arrow = document.querySelector('.arrow');
	const contentBox = document.querySelector('.alert-content');

	alertOpenBtn.addEventListener('click', () => {
		arrow.classList.toggle('up');
		contentBox.classList.toggle('show');
	});
}

if (myLocationPage) {
	const guideOpenBtn = document.querySelector('.btn--guide');
	const guideBox = document.querySelector('.guide');
	const guideCloseBtn = document.querySelector('.btn--close');

	guideOpenBtn.addEventListener('click', () => toggleGuideBox());
	guideCloseBtn.addEventListener('click', () => toggleGuideBox());

	function toggleGuideBox() {
		guideOpenBtn.classList.toggle('active');
		document.querySelector('.btn--guide__icon').classList.toggle('active');
		guideBox.classList.toggle('active');
	}
}

if (m18Page) {
	const buttonsWrapper = document.querySelector('.info__map-btn');
	const buttons = document.querySelectorAll('.btn--map');
	const maps = document.querySelectorAll('.info__maps > div');

	buttonsWrapper.onclick = e => openModal(e, buttons, maps);

	const magnitudeData = document.querySelectorAll('.magnitude-td ');
	const magnitudeInfo = document.querySelectorAll('.tooltip');

	magnitudeData.forEach(el => {
		el.addEventListener('click', () => {
			magnitudeData.forEach(data => {
				data.classList.remove('active');
			});
			magnitudeInfo.forEach(info => {
				info.classList.remove('active');
			});

			el.classList.add('active');
			document.getElementById(el.dataset.id).classList.add('active');
		});
	});
}

if (newsPage) {
	// ---------- Live News Layout ----------
	const layoutBody = document.querySelector('body');
	const fullscreenBtn = document.querySelector('.btn--fullscreen');
	const closeChatBtn = document.querySelector('.btn--closechat');
	const backToChatBtn = document.querySelector('.btn--chat-screen');

	fullscreenBtn.onclick = () => layoutBody.classList.add('news--horizontal');
	closeChatBtn.onclick = () => layoutBody.classList.add('full');
	backToChatBtn.addEventListener('click', () => {
		layoutBody.classList.remove('full');
		layoutBody.classList.remove('news--horizontal');
	});

	// ---------- Live News Chat ----------
	const scrollBox = document.querySelector('.chat__bottom');
	const chatBox = document.querySelector('.chat__bottom > ul');
	const inputChat = document.querySelector('.chat__input');
	let shouldScroll;

	const chatContent = [
		{
			avatar: '다',
			name: '다슬기칼국수',
			text: '올해들어 가장 큰 태풍인거죠?',
		},
		{
			avatar: '서',
			name: '서브미사일',
			text: '서울은 아직 해가 쩅쨍합니다?',
		},
		{
			avatar: '들',
			name: '돌매화나무',
			text: '부디 인명피해가 없었으면 하네요 ㅠㅠㅠ?',
		},
		{
			avatar: '세',
			name: '세한송백',
			text: '긴장하게 만드는 태풍은 생각보다 피해가 크지 않았어..',
		},
		{
			avatar: '팅',
			name: '팅즈',
			text: '마린시티 도망가 붕괴된다',
		},
		{
			avatar: '구',
			name: '구상인',
			text: '이시점에 항상 제주도에 갇혔어요,, 하는사람들 나오던데..',
		},
		{
			avatar: '양',
			name: '양파시러',
			text: '이번엔 힌남로네?',
		},
		{
			avatar: '서',
			name: '서브미사일',
			text: '서울은 아직 해가 쨍쨍합니다?',
		},
	];

	inputChat.addEventListener('click', () => {
		chatBox.insertAdjacentHTML(
			'beforeend',
			`							
			<li class="from-me">
				<div class="chat__avatar">다</div>
				<div>
					<p class="chat__name t-xs">다슬기</p>
					<p class="chat__text">
						부산도 슬슬 날씨가 흐려집니다…. 태풍이 쫌만 더 꺾였으면 좋겠네요
					</p>
				</div>
			</li>
			`
		);
		shouldScroll = scrollBox.scrollTop + scrollBox.clientHeight < scrollBox.scrollHeight;
		shouldScroll && scrollToBottom();
	});

	chatContent.forEach((el, index) => {
		setTimeout(() => {
			chatBox.insertAdjacentHTML(
				'beforeend',
				`
				<li class="chat-list">
					<div class="chat__avatar">${el.avatar}</div>
					<div>
						<p class="chat__name t-xs">${el.name}</p>
						<p class="chat__text">${el.text}</p>
					</div>
				</li>
				`
			);

			shouldScroll = scrollBox.scrollTop + scrollBox.clientHeight < scrollBox.scrollHeight;
			shouldScroll && scrollToBottom();
		}, index * 1000);
	});

	function scrollToBottom() {
		scrollBox.scrollTop = scrollBox.scrollHeight;
	}

	// ---------- Live News Sound Play ----------
	const newsVideo = document.querySelector('.news-video > video');
	newsVideo.addEventListener('click', () => (newsVideo.muted = !newsVideo.muted));
}

if (guidePage) {
	const mobileMap = document.querySelector('.mobile__shelter__map');
	const mobileShelterPins = document.querySelectorAll('.mobile__shelter .map__pins__pin');
	const mobileShelterModals = document.querySelectorAll('.map__modal > div');
	const tabletMap = document.querySelector('.tablet__shelter__map');
	const tabletShelterPins = document.querySelectorAll('.tablet__shelter .map__pins__pin');
	const tabletShelterModals = document.querySelectorAll('.tablet__shelter__list > li');

	mobileMap.onclick = e => openModal(e, mobileShelterPins, mobileShelterModals);
	tabletMap.onclick = e => openModal(e, tabletShelterPins, tabletShelterModals);
}

if (guidePage && !m26Page) {
	const tabs = document.querySelector('.tab-menu');
	const tabButton = document.querySelectorAll('.tab-menu__btn');
	const contents = document.querySelectorAll('.tab-content');

	tabs.onclick = e => openModal(e, tabButton, contents);
}

if (m26Page) {
	new Glide('.glide').mount();
}

if (cctvPage) {
	const selectEl = document.querySelector('select');
	const nearMeBtn = document.querySelector('.btn--near-me');
	const map1 = document.querySelector('.map--1');
	const map2 = document.querySelector('.map--2');
	const cctvPins = document.querySelectorAll('.map__pins__pin');
	const cctvVideoModals = document.querySelectorAll('.map__modal > div');

	selectEl.addEventListener('change', e => {
		if (e.target.value === 'select') {
			map1.classList.remove('active');
			map2.classList.add('active');
		} else {
			map1.classList.add('active');
			map2.classList.remove('active');
		}
	});

	nearMeBtn.addEventListener('click', () => {
		selectEl.value = 'select';

		map1.classList.remove('active');
		map2.classList.add('active');
	});

	map2.onclick = e => openModal(e, cctvPins, cctvVideoModals);
}

function openModal(e, triggers, modals) {
	const id = e.target.dataset.id;

	if (id) {
		triggers.forEach(trigger => {
			trigger.classList.remove('active');
		});
		e.target.classList.add('active');

		modals.forEach(modal => {
			modal.classList.remove('active');
		});

		const element = document.getElementById(id);
		element && element.classList.add('active');
	}

	if (e.target.classList.contains('btn--close')) {
		e.target.parentNode.classList.remove('active');
		triggers.forEach(trigger => {
			trigger.classList.remove('active');
		});
	}
}
