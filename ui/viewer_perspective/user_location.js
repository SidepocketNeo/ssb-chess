module.exports = () => {

  /**
   * Returns true if the user can currently see the chess app, and false otherwise.
   * The user might be in a different tab in the containing application, for example.
   */
  function chessAppIsVisible() {
    var topLevelElementArr = document.getElementsByClassName("ssb-chess-container");

    if (!topLevelElementArr || topLevelElementArr.length <= 0) {
      return false;
    } else {
      var element = topLevelElementArr[0];

      return document.hasFocus() && isVisible(element);
    }

  }

  function isVisible(elm) {
    // Thanks https://stackoverflow.com/a/33026481 =]
    if(!elm.offsetHeight && !elm.offsetWidth) { return false; }
    if(getComputedStyle(elm).visibility === 'hidden') { return false; }
    return true;
  }

  /**
   * Applies the function argument if the chess app is not currently visible
   * to the user.
   */
  function ifChessAppNotVisible(fn) {
    if (!chessAppIsVisible()) {
      fn();
    }
  }

  return {
    chessAppIsVisible: chessAppIsVisible,
    ifChessAppNotVisible: ifChessAppNotVisible
  }
}
