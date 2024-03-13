import { useQuery } from "@tanstack/react-query";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fs } from "../firebase";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductInfo = async () => {
    const querySnapshot = await getDoc(doc(fs, "products", id));
    console.log(querySnapshot);
    return { id: querySnapshot.id, ...querySnapshot.data() };
  };

  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(fs, "products", id));
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  const { data, status, error } = useQuery({
    queryKey: ["product", id],
    queryFn: getProductInfo,
  });

  if (status === "pending") return <p>Loading ...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Product: {id}</h1>

      <h2>Product Name: {data?.productName}</h2>

      <button className="btn" onClick={() => navigate(-1)}>
        Go back
      </button>

      <button className="btn" onClick={deleteProduct}>
        Delete product
      </button>
    </div>
  );
};

export default Product;
