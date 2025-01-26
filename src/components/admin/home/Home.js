import React from 'react'
import styles from "./Home.module.scss"
import InfoBox from '../../infoBox/InfoBox'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'

// Icons
const earningIcon = <AiFillDollarCircle size={30} color='#b624ff' />
const productIcon = <BsCart4 size={30} color='#1f93ff' />
const ordersIcon = <FaCartArrowDown size={30} color='orangered' />

const Home = () => {
  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox cardClass={`${styles.card} ${styles.card1}`} 
        title={"Earnings"}
        count={"188"}
        icon={earningIcon}
        />
        <InfoBox cardClass={`${styles.card} ${styles.card2}`} 
        title={"Products"}
        count={"188"}
        icon={productIcon}
        />
        <InfoBox cardClass={`${styles.card} ${styles.card3}`} 
        title={"Orders"}
        count={"188"}
        icon={ordersIcon}
        />
      </div>
    </div>
  )
}

export default Home