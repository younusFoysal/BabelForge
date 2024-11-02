import { useEffect, useRef } from 'react';
import styles from './PricingCards.module.css';

const PricingCards = () => {
  const overlayRef = useRef();
  const cardsContainerRef = useRef();

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(`.${styles.card}`));
    //console.log('card number', cards);
    const overlay = overlayRef.current;
    const cardsContainer = cardsContainerRef.current;

    const applyOverlayMask = e => {
      const x = e.pageX - cardsContainer.offsetLeft;
      const y = e.pageY - cardsContainer.offsetTop;
      overlay.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
    };

    const createOverlayCta = (overlayCard, ctaEl) => {
      const overlayCta = document.createElement('div');
      overlayCta.classList.add(styles.cta);
      overlayCta.textContent = ctaEl.textContent;
      overlayCta.setAttribute('aria-hidden', true);
      overlayCard.append(overlayCta);
    };

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
          overlay.children[cardIndex].style.width = `${width}px`;
          overlay.children[cardIndex].style.height = `${height}px`;
        }
      });
    });

    const initOverlayCard = cardEl => {
      const overlayCard = document.createElement('div');
      overlayCard.classList.add(styles.card);
      createOverlayCta(overlayCard, cardEl.lastElementChild);
      overlay.append(overlayCard);
      observer.observe(cardEl);
    };

    cards.forEach(initOverlayCard);
    document.body.addEventListener('pointermove', applyOverlayMask);

    return () => {
      document.body.removeEventListener('pointermove', applyOverlayMask);
    };
  }, []);

  return (
    <main className={`${styles.main} ${styles.flow} `}>
      <h1 className={styles.main__heading}>Pricing</h1>
      <div ref={cardsContainerRef} className={`${styles.main__cards} ${styles.cards}`}>
        <div className={`${styles.cards__inner}`}>
          <div className={`${styles.cards__card} ${styles.card}`}>
            <h2 className={styles.card__heading}>Basic</h2>
            <p className={styles.card__price}>$9.99</p>
            <ul role="list" className={`${styles.card__bullets} ${styles.flow}`}>
              <li>Access to standard workouts and nutrition plans</li>
              <li>Email support</li>
            </ul>
            <a href="#basic" className={`${styles.card__cta} ${styles.cta}`}>
              Get Started
            </a>
          </div>

          <div className={`${styles.cards__card} ${styles.card}`}>
            <h2 className={styles.card__heading}>Pro</h2>
            <p className={styles.card__price}>$19.99</p>
            <ul role="list" className={`${styles.card__bullets} ${styles.flow}`}>
              <li>Access to advanced workouts and nutrition plans</li>
              <li>Priority Email support</li>
              <li>Exclusive access to live Q&A sessions</li>
            </ul>
            <a href="#pro" className={`${styles.card__cta} ${styles.cta}`}>
              Upgrade to Pro
            </a>
          </div>

          <div className={`${styles.cards__card} ${styles.card}`}>
            <h2 className={styles.card__heading}>Ultimate</h2>
            <p className={styles.card__price}>$29.99</p>
            <ul role="list" className={`${styles.card__bullets} ${styles.flow}`}>
              <li>Access to all premium workouts and nutrition plans</li>
              <li>24/7 Priority support</li>
              <li>1-on-1 virtual coaching session every month</li>
              <li>Exclusive content and early access to new features</li>
            </ul>
            <a href="#ultimate" className={`${styles.card__cta} ${styles.cta}`}>
              Go Ultimate
            </a>
          </div>

          <div className={`${styles.cards__card} ${styles.card}`}>
            <h2 className={styles.card__heading}>Ultimate</h2>
            <p className={styles.card__price}>$29.99</p>
            <ul role="list" className={`${styles.card__bullets} ${styles.flow}`}>
              <li>Access to all premium workouts and nutrition plans</li>
              <li>24/7 Priority support</li>
              <li>1-on-1 virtual coaching session every month</li>
              <li>Exclusive content and early access to new features</li>
            </ul>
            <a href="#ultimate" className={`${styles.card__cta} ${styles.cta}`}>
              Get Started
            </a>
          </div>
        </div>

        <div ref={overlayRef} className={`${styles.overlay} ${styles.cards__inner}`}></div>
      </div>
    </main>
  );
};

export default PricingCards;
