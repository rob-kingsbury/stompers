import gsap from 'gsap';

let mapIframe = null;
let currentActiveItem = null;

export function initTourMap() {
  const tourItems = document.querySelectorAll('.tour-item');
  mapIframe = document.getElementById('tour-map');

  if (tourItems.length === 0 || !mapIframe) return;

  tourItems.forEach((item) => {
    item.addEventListener('mouseenter', () => handleTourItemHover(item));
    item.addEventListener('click', () => handleTourItemClick(item));
  });

  if (tourItems.length > 0) {
    setActiveItem(tourItems[0]);
  }
}

function handleTourItemHover(item) {
  updateMap(item);
}

function handleTourItemClick(item) {
  setActiveItem(item);
}

function setActiveItem(item) {
  if (currentActiveItem) {
    currentActiveItem.classList.remove('is-active');
  }
  item.classList.add('is-active');
  currentActiveItem = item;
  updateMap(item);
}

function updateMap(item) {
  const venue = item.dataset.venue || '';
  const location = item.dataset.location || '';

  const searchQuery =
    venue && !venue.toLowerCase().includes('private')
      ? `${venue} ${location}`
      : location;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;

  if (mapIframe && mapIframe.src !== mapUrl) {
    gsap.to(mapIframe, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        mapIframe.src = mapUrl;
        gsap.to(mapIframe, {
          opacity: 1,
          duration: 0.3,
          delay: 0.3,
        });
      },
    });
  }
}

export function getTourData(item) {
  return {
    venue: item.dataset.venue,
    location: item.dataset.location,
    month: item.dataset.month,
    day: item.dataset.day,
    link: item.dataset.link,
    age: item.dataset.age,
  };
}
