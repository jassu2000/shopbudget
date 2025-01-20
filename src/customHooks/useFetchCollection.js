import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      console.log(`Docref: ${docRef}`);
      // const q = query(docRef, orderBy("orderConfig.createdAt", "desc"));
      const q = query(docRef);
      console.log(`Q: ${q}`);
      onSnapshot(q, (snapshot) => {
        console.log(`Snapshot : ${snapshot}`)
        console.log(`Docs : ${snapshot.docs}`);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allData);
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
