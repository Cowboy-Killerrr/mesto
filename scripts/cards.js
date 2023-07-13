const fujiyamaImage = new URL('../images/fujiyama.jpg', import.meta.url);
const parisImage = new URL('../images/eifel-tower.jpg', import.meta.url);
const goldenGateImage = new URL('../images/golden-gate.jpg', import.meta.url);
const mormonRowImage = new URL('../images/mormon-row.jpg', import.meta.url);
const comoLakeImage = new URL('../images/como-lake.jpg', import.meta.url);
const lincolnHeightsImage = new URL('../images/lincoln-heights.jpg', import.meta.url);

const galleryCards = [
  {
    name: 'Вулкан Фудзияма',
    link: fujiyamaImage
  },
  {
    name: 'Париж',
    link: parisImage
  },
  {
    name: 'Золотые Ворота',
    link: goldenGateImage
  },
  {
    name: 'Мормон Роу',
    link: mormonRowImage
  },
  {
    name: 'Озеро Комо',
    link: comoLakeImage
  },
  {
    name: 'Линкольн Хайтс',
    link: lincolnHeightsImage
  },
];

export { galleryCards };