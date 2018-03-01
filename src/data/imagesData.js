const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.slice(2, -4).toLowerCase().replace(/\W/g, '')] = `dist/${r(item)}`; });
  return images;
}

const images = importAll(require.context('../images', false, /\.jpg$/));

export default images;