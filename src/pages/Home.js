import React, { useEffect, useState } from "react";

import Card from "../components/UI/Card";

import { FaLeaf } from "react-icons/fa";
import { IoLeaf } from "react-icons/io5";

import styles from "./styles/Home.module.css";

const Home = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isIntersecting2, setIsIntersecting2] = useState(false);
  const card2 = React.createRef();
  const card3 = React.createRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(card2.current);
  }, [card2]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsIntersecting2(entry.isIntersecting);
    });
    observer.observe(card3.current);
  }, [card3]);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.headline}>Welcome to WeShop!</h1>
      <h2 className={styles.subHeadline}>
        <FaLeaf className={styles.leaves} /> Shop Fair And Green
        <IoLeaf className={styles.leaves} />{" "}
      </h2>
      <Card
        className={`${styles.paragraphContainer} ${styles.fair} ${styles.animateFirstCard}`}
      >
        <p className={styles.argument}>
          Our philosophy is simple: Offer the best quality at the best price,
          yet keep it fair and environmental friendly.
        </p>
      </Card>
      <Card
        ref={card2}
        className={`${styles.paragraphContainer} ${styles.moneyBack} ${
          isIntersecting ? styles.intersectingAnimation : ""
        }`}
      >
        <p className={styles.argument}>
          We offer fast delivery and guarantee 100% money back, if you're not
          happy with your products - no questions asked.
        </p>
      </Card>
      <Card
        ref={card3}
        className={`${styles.paragraphContainer} ${styles.green} ${
          isIntersecting2 ? styles.intersectingAnimation2 : ""
        }`}
      >
        <p className={styles.argument}>
          As we have stores around the globe, we offer world wide shipping -
          always using the shortest route to save resources!
        </p>
      </Card>
    </div>
  );
};

export default Home;
