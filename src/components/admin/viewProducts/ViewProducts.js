import { useEffect, useState } from 'react'
import styles from "./ViewProducts.module.scss"
import { toast } from 'react-toastify'
import { query, deleteProduct, orderBy, collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {db,storage} from "../../../firebase/config"
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../loader/Loader"
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';


const ViewProducts = () => {
    const [search, setSearch] = useState("");
  const{data, isLoading} = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )
  },[dispatch,data])

  useEffect(() =>{
      dispatch(FILTER_BY_SEARCH({products:products, search:search}))
    },[dispatch, products, search])
  

  // useEffect(() =>{
  //   getProducts()
  // },[])


  // const getProducts = () =>{
  //   setIsLoading(true)
  //   try{
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));

  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) =>({
  //         id:doc.id,
  //         ...doc.data()
  //       }))
  //       console.log(allProducts)
  //       setProducts(allProducts)
  //       setIsLoading(false)
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts
  //         })
  //       )
  //     });

  //   }
  //   catch(error){
  //     setIsLoading(false);
  //     toast.error(error.message)
  //   }
  // }

  const confirmDelete  = (id, imageURL) =>{
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        console.log("Delete Cancelled")
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
        // etc...
      },
    );
  }

  const deleteProduct = async(id, imageURL) =>{
    try{
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("product deleted successfully")

    }
    catch(error){
      toast.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length} Products Found</b>
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredProducts.length === 0 ? ( 
          <p>No products found!!</p>
        ) : (
          <table>
            <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            </thead>
            
            <tbody>
            {filteredProducts.map((product, index) =>{
              const {id,name,price,imageURL,category} = product;
              return(
                <tr key={id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={imageURL} alt={name} style={{width: "100px"}} />
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {category}
                  </td>
                  <td>
                    {`$${price}`}
                  </td>
                  <td  className={styles.icons}>
                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={18} color='green'/>
                    </Link>
                    &nbsp;
                    <FaTrash size={18} color='red' onClick={() =>confirmDelete(id, imageURL)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>

          </table>
        )} 
      </div>
    </>
  )
}

export default ViewProducts
