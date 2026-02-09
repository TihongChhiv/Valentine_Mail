import React, { useState } from 'react';
import { Heart, X, Home } from 'lucide-react';

export default function ValentineProposal() {
  const [stage, setStage] = useState('envelope'); // envelope, opening, question, gifts, pictures, song, message, letter
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '50%', left: '50%' });
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
    const randomTop = Math.random() * 60 + 20;
    const randomLeft = Math.random() * 60 + 20;
    setNoButtonPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleYesClick = () => {
    setStage('gifts');
  };

  return (
    <div className="valentine-app">
      {stage === 'envelope' && <EnvelopeScreen onOpen={() => setStage('opening')} />}
      {stage === 'opening' && <OpeningAnimation onComplete={() => setStage('question')} />}
      {stage === 'question' && (
        <QuestionScreen 
          onYes={handleYesClick}
          onNo={handleNoClick}
          noPosition={noButtonPosition}
        />
      )}
      {stage === 'gifts' && (
        <GiftsScreen 
          onPictures={() => setStage('pictures')}
          onSong={() => setStage('song')}
          onMessage={() => setStage('message')}
        />
      )}
      {stage === 'pictures' && <PicturesScreen onBack={() => setStage('gifts')} />}
      {stage === 'song' && <SongScreen onBack={() => setStage('gifts')} />}
      {stage === 'message' && <MessageScreen onBack={() => setStage('gifts')} onLetter={() => setStage('letter')} />}
      {stage === 'letter' && <LetterScreen onBack={() => setStage('gifts')} />}

      <style jsx>{`
        .valentine-app {
          min-height: 100vh;
          font-family: 'Georgia', 'Garamond', serif;
          overflow-x: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}

// Envelope Screen - "Love Mail" - Initial closed envelope
function EnvelopeScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="envelope-screen">
      <div className="content">
        <h1 className="love-mail-title">Love Mail</h1>
        <p className="subtitle">click the envelope to open</p>
        
        <div className={`envelope-container ${isOpening ? 'opening' : ''}`} onClick={handleClick}>
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <div className="letter-peek"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .envelope-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .content {
          text-align: center;
          z-index: 1;
        }

        .love-mail-title {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-size: 6rem;
          color: #8b4049;
          margin-bottom: 0.5rem;
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0.02em;
        }

        .subtitle {
          font-family: 'Georgia', serif;
          font-size: 0.95rem;
          color: #6d4c51;
          margin-bottom: 3rem;
          font-weight: 300;
          letter-spacing: 0.05em;
        }

        .envelope-container {
          cursor: pointer;
          transition: transform 0.3s ease;
          perspective: 1000px;
        }

        .envelope-container:hover:not(.opening) {
          transform: translateY(-10px);
        }

        .envelope {
          position: relative;
          width: 380px;
          height: 240px;
          margin: 0 auto;
        }

        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 190px solid transparent;
          border-right: 190px solid transparent;
          border-top: 120px solid #c55d68;
          border-bottom: 0px solid transparent;
          z-index: 3;
          transform-origin: top center;
          transition: transform 1s ease;
        }

        .envelope-container.opening .envelope-flap {
          transform: rotateX(-180deg);
        }

        .envelope-body {
          position: absolute;
          top: 60px;
          left: 0;
          width: 380px;
          height: 180px;
          background: linear-gradient(145deg, #c55d68 0%, #b85360 100%);
          border-radius: 0 0 10px 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .envelope-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 190px solid transparent;
          border-right: 190px solid transparent;
          border-bottom: 60px solid #b34e5b;
        }

        .letter-peek {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          height: 200px;
          background: #faf7f0;
          border-radius: 4px 4px 0 0;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 1s ease 0.3s;
        }

        .envelope-container.opening .letter-peek {
          transform: translateX(-50%) translateY(-80px);
        }

        @media (max-width: 640px) {
          .love-mail-title { font-size: 4.5rem; }
          .envelope { width: 300px; height: 190px; }
          .envelope-flap {
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-top: 95px solid #c55d68;
          }
          .envelope-body { 
            width: 300px; 
            height: 142px;
            top: 48px;
          }
          .envelope-body::before {
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-bottom: 48px solid #b34e5b;
          }
          .letter-peek {
            width: 260px;
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
}

// Opening Animation Screen - Shows envelope opening, flowers appearing, then card
function OpeningAnimation({ onComplete }) {
  const [showFlowers, setShowFlowers] = useState(false);
  const [showCard, setShowCard] = useState(false);

  React.useEffect(() => {
    // Envelope is already open when this screen loads
    // Show flowers immediately
    setTimeout(() => setShowFlowers(true), 500);
    // Show card after flowers
    setTimeout(() => setShowCard(true), 1800);
    // Move to next screen
    setTimeout(() => onComplete(), 3800);
  }, [onComplete]);

  return (
    <div className="opening-screen">
      <div className="content-wrapper">
        {/* Flowers that bloom and stay as background */}
        <div className={`flowers-layer ${showFlowers ? 'visible' : ''}`}>
          <img 
            src={`${import.meta.env.BASE_URL}flower.png`}
            alt="Flowers" 
            className="flowers-image"
          />
        </div>

        {/* Card that slides up over flowers */}
        <div className={`card-layer ${showCard ? 'visible' : ''}`}>
          <div className="valentine-card">
            <p className="dedication">to the love of my life</p>
            <h2 className="name">Ounging</h2>
            <div className="photo-circle">
            <img src={`${import.meta.env.BASE_URL}her2.jpg`} alt="Us together" className="couple-photo" />
            </div>
          </div>
        </div>

        {/* Full opened red envelope at bottom - NOT cut in half */}
        <div className="envelope-bottom">
          <div className="envelope-full">
            {/* Top flap opened */}
            <div className="top-flap"></div>
            {/* Main envelope body */}
            <div className="envelope-main"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .opening-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .content-wrapper {
          position: relative;
          width: 400px;
          height: 600px;
        }

        /* Flowers layer - appears first and stays as background */
        .flowers-layer {
          position: absolute;
          bottom: 180px;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 360px;
          height: 250px;
          z-index: 2;
          opacity: 0;
          transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .flowers-layer.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .flowers-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: saturate(1.2) brightness(1.1);
        }

        /* Card layer - slides up after flowers */
        .card-layer {
          position: absolute;
          bottom: 200px;
          left: 50%;
          transform: translateX(-50%) translateY(150%);
          z-index: 3;
          opacity: 0;
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: 0.3s;
        }

        .card-layer.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .valentine-card {
          background: #faf7f0;
          padding: 2rem 2.5rem;
          border-radius: 8px 8px 0 0;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
          width: 320px;
        }

        .dedication {
          font-family: 'Georgia', serif;
          font-size: 0.75rem;
          color: #8b4049;
          margin-bottom: 0.5rem;
          font-weight: 300;
          letter-spacing: 0.1em;
        }

        .name {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-size: 3.5rem;
          color: #8b4049;
          margin: 0 0 1rem 0;
          font-weight: 400;
          font-style: italic;
        }

        .photo-circle {
          width: 140px;
          height: 140px;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #c55d68;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .couple-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Full red envelope at bottom - COMPLETE, not cut in half */
        .envelope-bottom {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 380px;
          height: 240px;
          z-index: 1;
        }

        .envelope-full {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Opened top flap */
        .top-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 190px solid transparent;
          border-right: 190px solid transparent;
          border-top: 120px solid #c55d68;
          transform: rotateX(180deg);
          transform-origin: bottom center;
          z-index: 2;
        }

        /* Main envelope body - FULL envelope not cut */
        .envelope-main {
          position: absolute;
          top: 60px;
          left: 0;
          width: 380px;
          height: 180px;
          background: linear-gradient(145deg, #c55d68 0%, #b85360 100%);
          border-radius: 0 0 10px 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          z-index: 1;
        }

        /* Inner flap triangles at top of envelope body */
        .envelope-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 190px solid transparent;
          border-right: 190px solid transparent;
          border-bottom: 60px solid #b34e5b;
        }

        /* Bottom left flap */
        .envelope-main::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0;
          border-bottom: 60px solid #b34e5b;
          border-left: 100px solid transparent;
        }

        @media (max-width: 640px) {
          .content-wrapper { width: 320px; height: 550px; }
          .flowers-layer {
            width: 300px;
            height: 220px;
            bottom: 150px;
          }
          .card-layer { bottom: 170px; }
          .valentine-card {
            width: 280px;
            padding: 1.5rem 2rem;
          }
          .name { font-size: 3rem; }
          .photo-circle { width: 120px; height: 120px; }
          .envelope-bottom { width: 300px; height: 200px; }
          .top-flap {
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-top: 100px solid #c55d68;
          }
          .envelope-main {
            width: 300px;
            height: 150px;
            top: 50px;
          }
          .envelope-main::before {
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-bottom: 50px solid #b34e5b;
          }
        }
      `}</style>
    </div>
  );
}

// Question Screen - "Will you be my Valentine?"
function QuestionScreen({ onYes, onNo, noPosition }) {
  return (
    <div className="question-screen">
      <div className="floral-frame">
        <div className="question-card">
          <p className="question-top">WILL YOU BE MY</p>
          <h1 className="valentine-text">Valentine?</h1>
          <div className="heart-icon">
            <Heart size={60} fill="#fff" color="#fff" opacity={0.3} />
          </div>
          
          <div className="buttons-container">
            <button className="yes-btn" onClick={onYes}>YES</button>
            <button 
              className="no-btn" 
              onClick={onNo}
              style={{
                position: noPosition.top !== '50%' ? 'fixed' : 'relative',
                top: noPosition.top,
                left: noPosition.left,
                transform: noPosition.top !== '50%' ? 'translate(-50%, -50%)' : 'none'
              }}
            >
              NO
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .question-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floral-frame {
          position: relative;
          padding: 40px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><circle cx="80" cy="80" r="20" fill="%23ff8fa3"/><circle cx="60" cy="100" r="18" fill="%23ffa5b8"/><circle cx="100" cy="100" r="16" fill="%23ff6b8a"/><circle cx="420" cy="80" r="20" fill="%23ff8fa3"/><circle cx="440" cy="100" r="18" fill="%23ffa5b8"/><circle cx="400" cy="100" r="16" fill="%23ff6b8a"/><circle cx="80" cy="420" r="20" fill="%23ff8fa3"/><circle cx="60" cy="400" r="18" fill="%23ffa5b8"/><circle cx="100" cy="400" r="16" fill="%23ff6b8a"/><circle cx="420" cy="420" r="20" fill="%23ff8fa3"/><circle cx="440" cy="400" r="18" fill="%23ffa5b8"/><circle cx="400" cy="400" r="16" fill="%23ff6b8a"/></svg>') center/cover no-repeat;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .question-card {
          background: #faf7f0;
          padding: 3rem 3rem 2.5rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          text-align: center;
          min-width: 380px;
          position: relative;
        }

        .question-top {
          font-family: 'Georgia', serif;
          font-size: 1rem;
          color: #8b4049;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .valentine-text {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-size: 5.5rem;
          color: #c55d68;
          margin: 0 0 1rem 0;
          font-weight: 400;
          font-style: italic;
        }

        .heart-icon {
          margin-bottom: 2rem;
        }

        .buttons-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          position: relative;
        }

        .yes-btn, .no-btn {
          font-family: 'Georgia', serif;
          padding: 0.75rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.1em;
        }

        .yes-btn {
          background: #8b2c35;
          color: white;
        }

        .yes-btn:hover {
          background: #6d2229;
          transform: scale(1.05);
        }

        .no-btn {
          background: #8b2c35;
          color: white;
          transition: all 0.2s ease;
        }

        .no-btn:hover {
          background: #6d2229;
        }

        @media (max-width: 640px) {
          .question-card { 
            min-width: 320px; 
            padding: 2rem 1.5rem;
          }
          .valentine-text { font-size: 4.5rem; }
          .yes-btn, .no-btn { padding: 0.6rem 2rem; }
        }
      `}</style>
    </div>
  );
}

// Gifts Screen - Three heart cards
function GiftsScreen({ onPictures, onSong, onMessage }) {
  return (
    <div className="gifts-screen">
      <div className="floral-frame">
        <div className="gifts-card">
          <button className="close-btn" onClick={() => window.location.reload()}>
            <X size={24} color="#fff" />
          </button>
          
          <h2 className="gifts-title">Surprise gifts for you</h2>
          <p className="gifts-subtitle">
            I hope this brings a smile to your face<br/>
            and reminds you how special you are to me
          </p>
          
          <div className="heart-cards">
            <div className="heart-card" onClick={onPictures}>
              <div className="heart-gradient">
                <Heart size={50} fill="#fff" color="#fff" opacity={0.8} />
              </div>
            </div>
            <div className="heart-card" onClick={onSong}>
              <div className="heart-gradient">
                <Heart size={50} fill="#fff" color="#fff" opacity={0.8} />
              </div>
            </div>
            <div className="heart-card" onClick={onMessage}>
              <div className="heart-gradient">
                <Heart size={50} fill="#fff" color="#fff" opacity={0.8} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gifts-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floral-frame {
          position: relative;
          padding: 40px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500"><circle cx="80" cy="80" r="20" fill="%23ff8fa3"/><circle cx="60" cy="100" r="18" fill="%23ffa5b8"/><circle cx="100" cy="100" r="16" fill="%23ff6b8a"/><circle cx="520" cy="80" r="20" fill="%23ff8fa3"/><circle cx="540" cy="100" r="18" fill="%23ffa5b8"/><circle cx="500" cy="100" r="16" fill="%23ff6b8a"/><circle cx="80" cy="420" r="20" fill="%23ff8fa3"/><circle cx="60" cy="400" r="18" fill="%23ffa5b8"/><circle cx="100" cy="400" r="16" fill="%23ff6b8a"/><circle cx="520" cy="420" r="20" fill="%23ff8fa3"/><circle cx="540" cy="400" r="18" fill="%23ffa5b8"/><circle cx="500" cy="400" r="16" fill="%23ff6b8a"/></svg>') center/cover no-repeat;
          animation: fadeIn 0.5s ease-out;
        }

        .gifts-card {
          background: #faf7f0;
          padding: 2.5rem 3rem 3rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          text-align: center;
          min-width: 480px;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #c55d68;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: #a33a43;
          transform: rotate(90deg);
        }

        .gifts-title {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-size: 3.2rem;
          color: #8b4049;
          margin-bottom: 0.5rem;
          font-weight: 400;
          font-style: italic;
        }

        .gifts-subtitle {
          font-family: 'Georgia', serif;
          font-size: 0.85rem;
          color: #8b4049;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .heart-cards {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .heart-card {
          width: 120px;
          height: 180px;
          border: 2px solid #c55d68;
          border-radius: 8px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 192, 203, 0.3) 100%);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .heart-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 20px rgba(200, 67, 78, 0.3);
        }

        .heart-gradient {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(255, 182, 193, 0.6) 100%);
        }

        @media (max-width: 640px) {
          .gifts-card { 
            min-width: 340px;
            padding: 2rem 1.5rem;
          }
          .gifts-title { font-size: 2.8rem; }
          .heart-cards { gap: 1rem; }
          .heart-card { width: 90px; height: 140px; }
          .heart-gradient svg { width: 35px; height: 35px; }
        }
      `}</style>
    </div>
  );
}

// Pictures Screen
function PicturesScreen({ onBack }) {
  return (
    <div className="pictures-screen">
      <div className="floral-frame">
        <div className="pictures-card">
          <button className="home-btn" onClick={onBack}>
            <Home size={24} color="#fff" />
          </button>
          
          <h2 className="pictures-title">Favorite Pictures</h2>
          <p className="pictures-subtitle">Every photo reminds me why you mean so much to me.</p>
          
          <div className="photos-grid">
            <div className="photo-frame">
              <img src={`${import.meta.env.BASE_URL}kid.jpg`} alt="Kid" />
            </div>
            <div className="photo-frame main-photo">
              <img src={`${import.meta.env.BASE_URL}us.png`} alt="Us" />
            </div>
            <div className="photo-frame">
              <img src={`${import.meta.env.BASE_URL}her.png`} alt="Her" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pictures-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .floral-frame {
          position: relative;
          padding: 40px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 600"><circle cx="80" cy="80" r="20" fill="%23ff8fa3"/><circle cx="60" cy="100" r="18" fill="%23ffa5b8"/><circle cx="620" cy="80" r="20" fill="%23ff8fa3"/><circle cx="640" cy="100" r="18" fill="%23ffa5b8"/><circle cx="80" cy="520" r="20" fill="%23ff8fa3"/><circle cx="60" cy="500" r="18" fill="%23ffa5b8"/><circle cx="620" cy="520" r="20" fill="%23ff8fa3"/><circle cx="640" cy="500" r="18" fill="%23ffa5b8"/></svg>') center/cover no-repeat;
        }

        .pictures-card {
          background: #faf7f0;
          padding: 2.5rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          text-align: center;
          position: relative;
          max-width: 600px;
        }

        .home-btn {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #c55d68;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .home-btn:hover {
          background: #a33a43;
          transform: translateX(-50%) scale(1.1);
        }

        .pictures-title {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-style: italic;
          font-size: 3rem;
          color: #8b4049;
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .pictures-subtitle {
          font-family: 'Georgia', serif;
          font-size: 0.85rem;
          color: #8b4049;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .photos-grid {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          margin-bottom: 4rem;
        }

        .photo-frame {
          background: #c55d68;
          padding: 12px;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
        }

        .photo-frame:hover {
          transform: scale(1.05);
        }

        .photo-frame img {
          width: 140px;
          height: 180px;
          object-fit: cover;
          border-radius: 2px;
        }

        .main-photo {
          transform: translateY(-20px);
        }

        .main-photo img {
          width: 160px;
          height: 200px;
        }

        @media (max-width: 640px) {
          .pictures-card { padding: 2rem 1.5rem; }
          .pictures-title { font-size: 2.5rem; }
          .photos-grid { flex-direction: column; gap: 1rem; }
          .photo-frame img { width: 200px; height: 260px; }
          .main-photo { transform: none; }
          .main-photo img { width: 220px; height: 280px; }
        }
      `}</style>
    </div>
  );
}

// Song Screen
function SongScreen({ onBack }) {
  return (
    <div className="song-screen">
      <div className="floral-frame">
        <div className="song-card">
          <button className="home-btn" onClick={onBack}>
            <Home size={24} color="#fff" />
          </button>
          
          <h2 className="song-title">Song for my Valentine</h2>
          <p className="song-subtitle">The song I think of when I think of you.</p>
          
          <div className="video-container">
            <iframe
              width="100%"
              height="280"
              src="https://www.youtube.com/embed/9RyyTNuGQkQ"
              title="Our Song"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px', border: '4px solid #c55d68' }}
            ></iframe>
          </div>
        </div>
      </div>

      <style jsx>{`
        .song-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .floral-frame {
          position: relative;
          padding: 40px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500"><circle cx="80" cy="80" r="20" fill="%23ff8fa3"/><circle cx="60" cy="100" r="18" fill="%23ffa5b8"/><circle cx="520" cy="80" r="20" fill="%23ff8fa3"/><circle cx="540" cy="100" r="18" fill="%23ffa5b8"/><circle cx="80" cy="420" r="20" fill="%23ff8fa3"/><circle cx="60" cy="400" r="18" fill="%23ffa5b8"/><circle cx="520" cy="420" r="20" fill="%23ff8fa3"/><circle cx="540" cy="400" r="18" fill="%23ffa5b8"/></svg>') center/cover no-repeat;
        }

        .song-card {
          background: #faf7f0;
          padding: 2.5rem 3rem 5rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          text-align: center;
          max-width: 550px;
          position: relative;
        }

        .home-btn {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #c55d68;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .home-btn:hover {
          background: #a33a43;
          transform: translateX(-50%) scale(1.1);
        }

        .song-title {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-style: italic;
          font-size: 3rem;
          color: #8b4049;
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .song-subtitle {
          font-family: 'Georgia', serif;
          font-size: 0.85rem;
          color: #8b4049;
          margin-bottom: 2rem;
          font-weight: 300;
          font-style: italic;
        }

        .video-container {
          margin-bottom: 1rem;
        }

        @media (max-width: 640px) {
          .song-card { padding: 2rem 1.5rem 4.5rem; }
          .song-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

// Message Screen - Introduction
function MessageScreen({ onBack, onLetter }) {
  return (
    <div className="message-screen">
      <div className="floral-frame-simple">
        <div className="message-card">
          <h2 className="message-title">My Dearest OI,</h2>
          <p className="message-text">
            I just wanted to take a moment to tell you how much you mean to me. Being around you makes everything feel lighter, and every conversation, laugh, and quiet moment we share is something I truly treasure.
          </p>
          <p className="message-text">
            This year I might not be able to give you a physical flower or an expensive gift, but this is something I made from my heart. I've been wanting to do this since last year, but I wasn't capable yet — so this year I tried my best to make it happen. I really hope you love it and enjoy the letter, honey.
          </p>
          
          <button className="continue-btn" onClick={onLetter}>continue</button>
        </div>
      </div>

      <style jsx>{`
        .message-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .floral-frame-simple {
          position: relative;
        }

        .message-card {
          background: #faf7f0;
          padding: 3rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          max-width: 500px;
          border: 2px solid rgba(200, 67, 78, 0.2);
        }

        .message-title {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-style: italic;
          font-size: 3rem;
          color: #8b4049;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }

        .message-text {
          font-family: 'Georgia', serif;
          font-size: 1rem;
          color: #5a3a3a;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .continue-btn {
          font-family: 'Georgia', serif;
          background: #c55d68;
          color: white;
          border: none;
          padding: 0.75rem 3rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          display: block;
          margin: 2rem auto 0;
        }

        .continue-btn:hover {
          background: #a33a43;
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .message-card { padding: 2rem 1.5rem; }
          .message-title { font-size: 2.5rem; }
          .message-text { font-size: 0.95rem; }
        }
      `}</style>
    </div>
  );
}

// Letter Screen - Full Valentine letter
function LetterScreen({ onBack }) {
  return (
    <div className="letter-screen">
      <div className="floral-frame">
        <div className="letter-card">
          <button className="home-btn" onClick={onBack}>
            <Home size={24} color="#fff" />
          </button>
          
          <h2 className="letter-title">To my Valentine,</h2>
          
          <div className="letter-content">
            <p className="letter-paragraph">
              I know I'm not always the best at expressing my feelings, but that doesn't mean I don't love you deeply. Honestly, if it wasn't for you, I probably wouldn't have stepped out of my comfort zone or tried this hard to improve myself day by day. From the very beginning, I've always wanted to become a better man for you.
            </p>
            <p className="letter-paragraph">
              Thank you for everything — for always pushing me past my limits, for never doubting me, and for staying by my side through the rough days. The road is still not easy, but I promise you that one day I'll be able to take good care of you and give you everything you deserve.
            </p>
            <p className="letter-paragraph">
              Happy 2nd Valentines Day, honey. Please take care of yourself, even though that is my responsibility. and You're about to step more into the real world now, so I wish you the best in everything. And always remember — no matter how tough the path gets, you'll always have me by your side , បងស្រឡាញ់អូន 🤍
            </p>
            <p className="letter-signature">~ Your Handsome BF, Jayden ~</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .letter-screen {
          min-height: 100vh;
          background: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .floral-frame {
          position: relative;
          padding: 40px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 650"><circle cx="80" cy="80" r="20" fill="%23ff8fa3"/><circle cx="60" cy="100" r="18" fill="%23ffa5b8"/><circle cx="520" cy="80" r="20" fill="%23ff8fa3"/><circle cx="540" cy="100" r="18" fill="%23ffa5b8"/><circle cx="80" cy="570" r="20" fill="%23ff8fa3"/><circle cx="60" cy="550" r="18" fill="%23ffa5b8"/><circle cx="520" cy="570" r="20" fill="%23ff8fa3"/><circle cx="540" cy="550" r="18" fill="%23ffa5b8"/></svg>') center/cover no-repeat;
        }

        .letter-card {
          background: #faf7f0;
          padding: 3rem 3rem 5rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          max-width: 550px;
          position: relative;
        }

        .home-btn {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #c55d68;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .home-btn:hover {
          background: #a33a43;
          transform: translateX(-50%) scale(1.1);
        }

        .letter-title {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-style: italic;
          font-size: 3rem;
          color: #8b4049;
          margin-bottom: 2rem;
          font-weight: 400;
          text-align: center;
        }

        .letter-content {
          font-family: 'Georgia', serif;
        }

        .letter-paragraph {
          font-size: 0.95rem;
          color: #5a3a3a;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .letter-signature {
          font-family: 'Georgia', serif;
          font-size: 1rem;
          color: #8b4049;
          font-style: italic;
          text-align: center;
          margin-top: 2rem;
        }

        @media (max-width: 640px) {
          .letter-card { padding: 2.5rem 2rem 4.5rem; }
          .letter-title { font-size: 2.5rem; }
          .letter-paragraph { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}