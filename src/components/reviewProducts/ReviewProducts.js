import React, { useEffect, useState } from 'react'
import styles from "./ReviewProducts.module.scss"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/slice/productSlice';
import { selectUserID, selectUserName } from '../../redux/slice/authSlice';
import Card from '../card/Card';
import StarsRating from 'react-star-rate';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import UseFetchDocument from '../../customHooks/UseFetchDocument';
import spinnerImg from "../../assets/spinner.jpg"
const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("")
  const [product,setProduct] = useState(null);
  const {id} = useParams();
  const {document} = UseFetchDocument("products", id)

  const products = useSelector(selectProducts);
  console.log(`Products from review product: ${JSON.stringify(products)}`);

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  // const product = products.find((item) => item.id === id)
  // console.log(`Product from review product: ${JSON.stringify(product)}`);
  useEffect(()=>{
    setProduct(document);
  },[document]);
  const submitReview = (e) =>{
    e.preventDefault();
    console.log(rate, review);
    const today = new Date();
        const date = today.toDateString();
        const reviewConfig = {
          userID,
          userName,
          productID:id,
          rate,
          review,
          reviewDate:date,
          createdAt: Timestamp.now().toDate()
        }
        try{
          addDoc(collection(db, "reviews"), {reviewConfig});
          toast.success("review saved");
          setRate(0);
          setReview("");
        }
        catch(error){
          toast.error(error.message)
        }

  }
  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review This product</h2>
        {product === null ? (<img src={spinnerImg} alt='Loading...' />) 
        :
        (
          <>
            <p><b>Product Name:</b>{product.name}</p>
            <img src={product.imageURL} alt={product.name}  style={{width:"50px"}} 
            styles={{width:"100px"}}/>
          </>
          )}
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating value={rate} onChange={rate => {setRate(rate)}} />
              <label>Review:</label>
              <textarea value={review} required onChange={(e) =>setReview(e.target.value)}
               cols="30" rows="10" />
               <button type='submit' className="--btn --btn-primary">Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewProducts
