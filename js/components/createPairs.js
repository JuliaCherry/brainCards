import { createElement } from '../helper/createElement.js';
import { showAlert } from './showAlert.js';
import { shuffleArray } from '../helper/shuffleArray.js';

export const createPairs = app => {
  const pairs = createElement('section', {
    className: 'card section-offset',
  });

  const container = createElement('div', {
    className: 'container card__container',
  });

  const btnReturn = createElement('button', {
    className: 'card__return',
    ariaLable: 'Возврат к категориям',
  });

  const btnCard = createElement('button', {
    className: 'card__item',
  });

  const front = createElement('span', {
    className: 'card__front',
    textContent: 'one',
  });

  const back = createElement('span', {
    className: 'card__back',
    textContent: 'один',
  });

  btnCard.append(front, back);
  container.append(btnReturn, btnCard);
  pairs.append(container);

  let dataCards = [];

  const flipCard = () => {
    btnCard.classList.add('card__item_flipped');
    btnCard.removeEventListener('click', flipCard);

    setTimeout(() => {
      btnCard.classList.remove('card__item_flipped');

      setTimeout(() => {
        btnCard.index++;
        if (btnCard.index === dataCards.length) {
          front.textContent = 'The End';
          showAlert('Вернемся к категориям!', 2000);

          setTimeout(() => {
            btnReturn.click();
          }, 2000);
          return;
        }

        front.textContent = dataCards[btnCard.index][0];
        back.textContent = dataCards[btnCard.index][1];

        setTimeout(() => {
          btnCard.addEventListener('click', flipCard);
        }, 300);
      }, 100);
    }, 1000);
  };

  const cardControler = data => {
    dataCards = [...data];
    btnCard.index = 0;
    front.textContent = data[btnCard.index][0];
    back.textContent = data[btnCard.index][1];

    btnCard.addEventListener('click', flipCard);
  };

  const mount = data => {
    app.append(pairs);
    const newDate = shuffleArray(data.pairs);
    cardControler(newDate);
  };

  const unmount = () => {
    pairs.remove();
    btnCard.removeEventListener('click', flipCard);
  };
  return { btnReturn, mount, unmount };
};
