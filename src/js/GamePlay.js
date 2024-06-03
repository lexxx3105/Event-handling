export default class GamePlay {
    constructor() {
      this.boardSize = 4;
      this.container = null;
      this.boardEl = null;
      this.cells = [];
      this.cellClickListeners = [];
    }
  
    bindToDOM(container) {
      if (!(container instanceof HTMLElement)) {
        throw new Error('container is not HTMLElement');
      }
      this.container = container;
    }
  
    /**
     * Draws boardEl with specific theme
     *
     * @param theme
     */
    drawUi(theme) {
      this.checkBinding();
  
      this.container.innerHTML = `
        <div id="scores" class="scores">
          <div data-id="dead" class="score"></div>
          <div data-id="lost" class="score"></div>
        </div>
        <div class="board-container">
          <div data-id="board" class="board"></div>
        </div>
      `;
  
      this.dead = this.container.querySelector('[data-id=dead]');
      this.lost = this.container.querySelector('[data-id=lost]');
  
      this.boardEl = this.container.querySelector('[data-id=board]');
  
      this.boardEl.classList.add(theme);
      for (let i = 0; i < this.boardSize ** 2; i += 1) {
        const cellEl = document.createElement('div');
        cellEl.classList.add('hole', 'cell', 'hammer-cursor');
        cellEl.setAttribute('id', `hole${i}`);
        cellEl.addEventListener('click', (event) => this.onCellClick(event));
        this.boardEl.appendChild(cellEl);
      }
  
      this.cells = Array.from(this.boardEl.children);
    }
  
    updateCurrentScore(dead, lost) {
      this.dead.textContent = `Убито кротов: ${dead}`;
      this.lost.textContent = `Промахов: ${Math.max(0, lost)}`;
    }
  
    activateHole(position) {
      this.boardEl.children[position].classList.add('hole_has-mole');
    }
  
    /**
     * Draws positions (with mole) on boardEl
     *
     * @param position
     */
    deactivateHole(position) {
      if (position >= 0 && position < this.boardSize ** 2) {
        this.boardEl.children[position].classList.remove('hole_has-mole');
      }
    }
  
    activeHole() {
      const mole = this.container.querySelector('.hole_has-mole');
      this.cells.indexOf(mole);
    }
  
    isActiveHole(position) {
      return this.boardEl.children[position].classList.contains('hole_has-mole');
    }
  
    /**
     * Add listener to mouse click for cell
     *
     * @param callback
     */
    addCellClickListener(callback) {
      this.cellClickListeners.push(callback);
    }
  
    removeCellClickListener(callback) {
      const index = this.cellClickListeners.indexOf(callback);
      if (index !== -1) {
        this.cellClickListeners.splice(index, 1);
      }
    }
  
    onCellClick(event) {
      const index = this.cells.indexOf(event.currentTarget);
      this.cellClickListeners.forEach((o) => o.call(null, index));
    }
  
    // Display "Game Over" message
    displayGameOver() {
      const overlayDiv = document.createElement('div');
      overlayDiv.classList.add('overlay');
      const gameOverText = document.createElement('div');
      gameOverText.classList.add('game-over-text');
      gameOverText.textContent = 'Game Over';
  
      overlayDiv.appendChild(gameOverText);
      this.boardEl.appendChild(overlayDiv);
    }
  
    showSmashCursor(index) {
      this.cells[index].classList.remove('hammer-cursor');
      this.cells[index].classList.add('hammer-smash-cursor');
      setTimeout(this.restoreHammerCursor.bind(this), 100, index);
    }
  
    restoreHammerCursor(index) {
      this.cells[index].classList.add('hammer-cursor');
      this.cells[index].classList.remove('hammer-smash-cursor');
    }
  
    checkBinding() {
      if (this.container === null) {
        throw new Error('GamePlay not bind to DOM');
      }
    }
  }