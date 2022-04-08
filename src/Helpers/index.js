const RANKING = 'ranking';

if (!JSON.parse(localStorage.getItem(RANKING))) {
  localStorage.setItem(RANKING, JSON.stringify([]));
}

const readRanking = () => JSON.parse(localStorage.getItem(RANKING));

const getRanking = () => {
  const gettingRanking = readRanking();
  return gettingRanking;
};

export default getRanking;
