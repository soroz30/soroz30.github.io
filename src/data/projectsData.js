const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

const projects = {
    0: {
        description: 'Sudoku',
        gitPage: 'https://soroz30.github.io/Sudoku/',
        gitCode: 'https://github.com/soroz30/Sudoku',
        img: images['sudoku.jpg']
    },
    1: {
        description: 'Country Search',
        gitPage: 'https://soroz30.github.io/Country-Search/',
        gitCode: 'https://github.com/soroz30/Country-Search',
        img: images['country-search.jpg']
    },
    2: {
        description: 'PsdToWeb12',
        gitPage: 'https://soroz30.github.io/PsdToWeb12',
        gitCode: 'https://github.com/soroz30/PsdToWeb12',
        img: images['psd-to-web12.jpg']
    },
    3: {
        description: 'PsdToWeb9',
        gitPage: 'https://soroz30.github.io/PsdToWeb9',
        gitCode: 'https://github.com/soroz30/PsdToWeb9',
        img: images['psd-to-web9.jpg']
    },
    4: {
        description: 'PsdToWeb7',
        gitPage: 'https://soroz30.github.io/PsdToWeb7',
        gitCode: 'https://github.com/soroz30/PsdToWeb7',
        img: images['psd-to-web7.jpg']
    },
    5: {
        description: 'PsdToWeb3',
        gitPage: 'https://soroz30.github.io/PsdToWeb3',
        gitCode: 'https://github.com/soroz30/PsdToWeb3',
        img: images['psd-to-web3.jpg']
    }
};

export default projects;
