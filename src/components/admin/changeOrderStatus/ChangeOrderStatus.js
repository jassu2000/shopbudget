import React, { useState } from 'react'
import styles from "./ChangeOrderStatus.module.scss"
import Card from '../../card/Card'
import Loader from '../../loader/Loader';
const ChangeOrderStatus = () => {

    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const editOrder = () =>{

    }
  return (
      <>
      {isLoading ? <Loader /> : (
        <div className={styles.status}>
      <Card cardClass={styles.card}>
        <h4>Update Order Status</h4>
        <form onSubmit={editOrder}>
            <span>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">---Select---</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Processing">Processing...</option>
                    <option value="Shipped">Shipped...</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </span>
            <span>
                <button type='submit' className='--btn --btn-primary'>Update Status</button>
            </span>
        </form>
      </Card>
      </div>
        )}
    </>
  )
}

export default ChangeOrderStatus
