import './styles/index.scss';
import './scripts/vh';

const alertPage = document.body.classList.contains('alert-page');
const guidePage = document.body.classList.contains('guide-page');

if (alertPage) {
	const alertOpenBtn = document.querySelector('.btn-open');
	const arrow = document.querySelector('.arrow');
	const contentBox = document.querySelector('.alert-content');

	alertOpenBtn.addEventListener('click', () => {
		arrow.classList.toggle('up');
		contentBox.classList.toggle('show');
	});
}
if (guidePage) {
	const guideOpenBtn = document.querySelector('.btn--guide');
	const guideBox = document.querySelector('.guide');

	guideOpenBtn.addEventListener('click', () => {
		guideOpenBtn.classList.toggle('active');
		document.querySelector('.btn--guide__icon').classList.toggle('active');
		guideBox.classList.toggle('active');
	});
} else {
	console.log('⛔️ body element does not have class');
}

const infoPages = ['/m06.html', '/m12.html', '/m18.html', '/m24.html', '/m30.html'];

if (infoPages.includes(window.location.pathname)) {
	document.querySelector('.nav__info').classList.add('active');
}
