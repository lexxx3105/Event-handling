import GameController from '../GameController';

const mockGamePlay = {
  addCellClickListener: jest.fn(),
  removeCellClickListener: jest.fn(),
  drawUi: jest.fn(),
  activateHole: jest.fn(),
  deactivateHole: jest.fn(),
  isActiveHole: jest.fn(() => false), 
  updateCurrentScore: jest.fn(),
  showSmashCursor: jest.fn(),
  displayGameOver: jest.fn(),
};

// Test cases
describe('GameController', () => {
  let gameController;

  beforeEach(() => {
    gameController = new GameController(mockGamePlay);
  });

  afterEach(() => {
    clearInterval(gameController._mainTimer);
    clearInterval(gameController._interfaceTimer);
  });

  test('init должен установить начальные значения и добавить прослушиватель щелчков по ячейкам', () => {
    gameController.init();

    expect(gameController._dead).toBe(0);
    expect(gameController._lost).toBe(-1);
    expect(gameController.gameOver).toBe(false);

    expect(mockGamePlay.addCellClickListener).toHaveBeenCalledTimes(1);
    expect(mockGamePlay.updateCurrentScore).toHaveBeenCalledTimes(0);
    expect(mockGamePlay.drawUi).toHaveBeenCalledTimes(1);
    expect(gameController._mainTimer).toBeDefined();
    expect(gameController._interfaceTimer).toBeDefined();
  });

  test('endGame должен завершить игру и навести порядок', () => {
    gameController.endGame();

    expect(gameController.gameOver).toBe(true);
    expect(mockGamePlay.removeCellClickListener).toHaveBeenCalledTimes(1);
    expect(gameController._mainTimer).toBeUndefined();
    expect(gameController._interfaceTimer).toBeUndefined();
    expect(mockGamePlay.displayGameOver).toHaveBeenCalledTimes(1);
  });

});