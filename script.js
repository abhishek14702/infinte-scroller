const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

// Usplash API
let img_count = 5; // initially loading 5 images
const apiKey = 'mWmyCvELFgl5GuGcc2bRaAPJVXfbj1lDRRQ_xvuvYbo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${img_count}`;

// Checking if all images are loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		img_count = 15; // loading 15 images after the initial loading
	}
}

// Helper fx() to set attributes on DOM elements.
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Creating elements for links & photos, then adding to the DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArr.length;

	// Running fx() for each {} in photosArr
	photosArr.forEach((photo) => {
		// Creating <a> to link to unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		// Creating <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Evt. Listener, checking when each is finished loading
		img.addEventListener('load', imageLoaded);

		// Putting <img> inside <a>, the put both inside imageContainer El.
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Getting photos from Unsplash API
async function getPhotos() {
	try {
		const resp = await fetch(apiUrl);
		photosArr = await resp.json();
		displayPhotos();
	} catch (err) {
		// Catching Err. here
	}
}

// Checking to see if scrolling near the bottom of the page, loads more photos
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
const loadingPlaceholder = document.getElementById('loading-placeholder');

// Checking to see if scrolling near the bottom of the page, loads more photos

const imagePlaceholder = document.getElementById('image-placeholder'); // Added this line

// ...

// Function to hide the image placeholder


// Function to show the image placeholder
function showImagePlaceholder() {
    imagePlaceholder.style.display = 'flex';
}

// ...

// Checking to see if scrolling near the bottom of the page, loads more photos
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        showImagePlaceholder(); // Show the image placeholder
        getPhotos();
    }
});

// ...

// In the imageLoaded() function, after all images are loaded, hide the placeholder
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        img_count = 30; // loading 30 images after the initial loading
        hideImagePlaceholder(); // Hide the image placeholder
    }
}
