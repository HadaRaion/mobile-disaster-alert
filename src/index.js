import './styles/index.scss';
import Glide from '@glidejs/glide';

window.addEventListener('load', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
});

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
	const scrollBox = document.querySelector('.chat__bottom');
	const chatBox = document.querySelector('.chat__bottom > ul');
	const inputChat = document.querySelector('.chat__input');
	let shouldScroll;

	const chatContent = [
		{
			avatar: '???',
			name: '??????????????????',
			text: '???????????? ?????? ??? ????????????????',
		},
		{
			avatar: '???',
			name: '???????????????',
			text: '????????? ?????? ?????? ????????????????',
		},
		{
			avatar: '???',
			name: '???????????????',
			text: '?????? ??????????????? ???????????? ????????? ??????????',
		},
		{
			avatar: '???',
			name: '????????????',
			text: '???????????? ????????? ????????? ???????????? ????????? ?????? ?????????..',
		},
		{
			avatar: '???',
			name: '??????',
			text: '???????????? ????????? ????????????',
		},
		{
			avatar: '???',
			name: '?????????',
			text: '???????????? ?????? ???????????? ????????????,, ??????????????? ????????????..',
		},
		{
			avatar: '???',
			name: '????????????',
			text: '????????? ?????????????',
		},
		{
			avatar: '???',
			name: '???????????????',
			text: '????????? ?????? ?????? ????????????????',
		},
	];

	inputChat.addEventListener('click', () => {
		chatBox.insertAdjacentHTML(
			'beforeend',
			`							
			<li class="from-me">
				<div class="chat__avatar">???</div>
				<div>
					<p class="chat__name t-xs">?????????</p>
					<p class="chat__text">
						????????? ?????? ????????? ??????????????????. ????????? ?????? ??? ???????????? ????????????
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
			nearMeBtn.classList.remove('active');
			map1.classList.add('active');
			map2.classList.remove('active');
		}
	});

	nearMeBtn.addEventListener('click', () => {
		selectEl.value = 'select';

		nearMeBtn.classList.add('active');
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
