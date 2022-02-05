import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { status } from "../constants";
import { ReactComponent as Clipboard } from '../data/Clipboard.svg';
import Fail from '../data/Cross.png';
import Success from '../data/Success.png';
import { ReactComponent as Twitter } from '../data/Twitter.svg';

Modal.setAppElement('#root')

const shareOnTwitter = (resultWord) => {
  var shareURL = "http://twitter.com/share?";
  var params = {
    url: "https://dspinellis.github.io/word-master/",
    text: resultWord,
    hashtags: "GreekWordle"
  }
  for (var prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
  window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}

const returnEmoji = (word) => {
  if (word === status.gray) {
    return '⬛';
  }
  if (word === status.yellow) {
    return '🟨';
  }
  if (word === status.green) {
    return '🟩'
  }
  return ' '
}


const setArrayToString = (answerBoard) => {
  let shareString = "Greek Wordle \n \n";
  answerBoard.map((row) => {
    row.map((column) => {
      shareString = shareString + returnEmoji(column);
    })
    shareString = shareString + "\n";
  })
  shareString = shareString + "\n";
  return shareString;
}

export const EndGameModal = ({
  isOpen,
  handleClose,
  styles,
  darkMode,
  gameState,
  state,
  currentStreak,
  longestStreak,
  answer,
  playAgain,
  answerBoard,
}) => {
  const [answerBoardShare, setAnswerBoardShare] = useState(setArrayToString(answerBoard))
  useEffect(() => {
    setAnswerBoardShare(setArrayToString(answerBoard))
  }, [isOpen])
  const PlayAgainButton = () => {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <button
          type="button"
          className="rounded-lg px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
          onClick={playAgain}
        >
          Παίξτε ξανά
        </button>
      </div>
    )
  }

  const ShareResult = (props) => {
    const { answerBoardShare } = props
    const [showClipboardText, setShowClipboardText] = useState(false)
    return (
      <>
        <div className="flex flex-row gap-5">
          <ClipBoardButton answerBoardShare={answerBoardShare} setClipboard={setShowClipboardText} />
          <ShareOnTwitter answerBoardShare={answerBoardShare} />
        </div>
        {showClipboardText &&
          <div className='mt-3 text-2'>
            Αντιγράφηκε με επιτυχία στο clipboard
          </div>
        }
      </>
    )
  }
  const ClipBoardButton = (props) => {
    const { answerBoardShare, setClipboard } = props;
    const copyToClipboard = (resultString) => {
      navigator.clipboard.writeText(resultString);
      setClipboard(true);
    }

    return (
      <div className={darkMode ? 'dark' : ''}>
        <button
          type="button"
          className="rounded-lg px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
          onClick={() => { copyToClipboard(answerBoardShare) }}
        >
          <Clipboard />
        </button>
      </div>
    )
  }
  const ShareOnTwitter = (props) => {
    const { answerBoardShare } = props
    return (
      <div className={darkMode ? 'dark' : ''}>
        <button
          type="button"
          className="rounded-lg px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
          onClick={() => { shareOnTwitter(answerBoardShare) }}
        >
          <Twitter />
        </button>
      </div>
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      contentLabel="Game End Modal"
    >
      <div className={darkMode ? 'dark' : ''}>
        <div className="h-full flex flex-col items-center justify-center max-w-[300px] mx-auto text-primary dark:text-primary-dark">
          {gameState === state.won && (
            <>
              <img src={Success} alt="success" height="auto" width="auto" />
              <h1 className=" text-3xl">Συγχαρητήρια!</h1>
              <p className="mt-6">
                Τρέχουσες συνεχείς επιτυχίες: <strong>{currentStreak}</strong> {currentStreak > 4 && '🔥'}
              </p>
              <p>
                Καλύτερες συνεχείς επιτυχίες: <strong>{longestStreak}</strong>
              </p>
            </>
          )}
          {gameState === state.lost && (
            <>
              <img src={Fail} alt="success" height="auto" width="80%" />
              <div className="text-primary dark:text-primary-dark text-4xl text-center">
                <p>Ωχ!</p>
                <p className="mt-3 text-2xl">
                  Η λέξη ήταν <strong>{answer}</strong>
                </p>
                <p className="mt-6 text-base">
                  Τρέχουσες συνεχείς επιτυχίες: <strong>{currentStreak}</strong> {currentStreak > 4 && '🔥'}
                </p>
                <p className="text-base">
                  Καλύτερες συνεχείς επιτυχίες: <strong>{longestStreak}</strong>
                </p>
              </div>
            </>
          )}

          <PlayAgainButton />
          <ShareResult answerBoardShare={answerBoardShare} />
        </div>
      </div>
    </Modal>
  )
}
