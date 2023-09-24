// DOM Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const imagePlaceholder = document.getElementById('image-placeholder');
const loadingPlaceholder = document.getElementById('loading-placeholder');

// Variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];
let img_count = 5;
const apiKey = 'mWmyCvELFgl5GuGcc2bRaAPJVXfbj1lDRRQ_xvuvYbo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${img_count}`;

// Event Listeners
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		showImagePlaceholder();
		getPhotos();
	}
});

// Functions
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		img_count = 30;
		hideImagePlaceholder();
	}
}

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArr.length;

	photosArr.forEach((photo) => {
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		img.addEventListener('load', imageLoaded);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const resp = await fetch(apiUrl);
		photosArr = await resp.json();
		displayPhotos();
	} catch (err) {
		console.error('Error fetching photos:', err);
	}
}

function showImagePlaceholder() {
	imagePlaceholder.style.display = 'flex';
}

function hideImagePlaceholder() {
	imagePlaceholder.style.display = 'none';
}

// Initial Load
getPhotos();
