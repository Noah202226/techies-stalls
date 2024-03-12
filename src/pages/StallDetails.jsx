import React, { useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { fs } from "../firebase";
import { useQuery } from "@tanstack/react-query";

function StallDetails() {
  const [addingDoc, setAddingDoc] = useState(false);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [deleting, setDeletingDoc] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  // Input refs
  const productNameRef = useRef();
  const productCosRef = useRef();
  const productPriceRef = useRef();
  const productSourceRef = useRef();
  const productImageRef = useRef();

  const getStallData = async () => {
    const querySnapshot = await getDoc(doc(fs, "stalls", params.id));

    return { id: querySnapshot.id, ...querySnapshot.data() };
  };

  const getStallProducts = async () => {
    const getProductsQuery = query(
      collection(fs, "products"),
      where("productStallRef", "==", params.id)
    );
    const queryProducts = await getDocs(getProductsQuery);

    const stallProducts = queryProducts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(stallProducts);
    return stallProducts;
  };

  const addProduct = () => {
    setAddingDoc(true);
    addDoc(collection(fs, "products"), {
      productName: productNameRef.current.value,
      cos: productCosRef.current.value,
      price: productPriceRef.current.value,
      productSourceRef: productSourceRef.current.value,
      productStallRef: params.id,
    })
      .then(() => {
        alert("product added");
        setAddingDoc(false);
        productNameRef.current.value = "";
        productCosRef.current.value = "";
        productPriceRef.current.value = "";
        productSourceRef.current.value = "";
        document.getElementById("my_modal_3").close();
      })
      .catch((e) => alert(e));
  };
  const deleteStall = () => {
    setDeletingDoc(true);
    deleteDoc(doc(fs, "stalls", params.id)).then(() => {
      setDeletingDoc(false);

      setTimeout(() => {
        try {
          navigate("/stalls");
          console.log("redirected");
        } catch (error) {
          console.log(error);
        }
      }, 500);
    });
  };

  const { data, status, error } = useQuery({
    queryKey: ["stalls", params.id],
    queryFn: getStallData,
  });

  const {
    data: stallProductsdata,
    status: stallProductsStatus,
    error: stallProductsError,
  } = useQuery({
    queryKey: ["stallProducts", params.id],
    queryFn: getStallProducts,
    enabled: !!data?.id,
  });

  if (status === "loading") return <h2>Loading....</h2>;
  if (status === "error") return <h2>Error: {error.message}</h2>;

  if (stallProductsStatus === "loading") return <h2>Loading....</h2>;
  if (stallProductsStatus === "error")
    return <h2>Error: {stallProductsError.message}</h2>;

  return (
    <div className="max-w-screen-2xl mx-auto p-4 flex">
      <div className="border-4 shadow-lg rounded-lg p-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                className="w-full h-auto max-h-40 rounded-lg"
                src={data?.bannerImg}
                alt="Stall Banner"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Stall Name {data?.stallName} - ID: {data?.id}
              </h1>
              <p>Location: {data?.stallLocation}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">About Us</h2>
              <p>{data?.vision}</p>
            </div>

            <div className=" rounded-lg p-4 mb-4">
              <h2 className="text-xl font-bold mb-2">Opening Hours</h2>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <strong>Monday:</strong> 9am - 6pm
                </li>
                <li>
                  <strong>Tuesday:</strong> 9am - 6pm
                </li>
                <li>
                  <strong>Wednesday:</strong> 9am - 6pm
                </li>
                <li>
                  <strong>Thursday:</strong> 9am - 6pm
                </li>
                <li>
                  <strong>Friday:</strong> 9am - 6pm
                </li>
                <li>
                  <strong>Saturday:</strong> 10am - 4pm
                </li>
                <li>
                  <strong>Sunday:</strong> Closed
                </li>
              </ul>
            </div>
            <h2 className="text-xl font-bold mb-2 mt-4">Contact Information</h2>
            <p>
              <strong>Phone:</strong> 123-456-7890
            </p>
            <p>
              <strong>Email:</strong> example@example.com
            </p>
            <p>
              <strong>Website:</strong> www.example.com
            </p>
          </div>
        </div>
        <button
          onClick={deleteStall}
          className="btn w-full my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <span
            className={`${deleting ? "loading" : ""} loading-spinner`}
          ></span>
          Delete Doc
        </button>
      </div>

      {/* Modal */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">New Product</h3>
          <p className="py-4 text-sm">
            Press ESC key or click on ✕ button to close
          </p>

          <label className="input input-bordered flex items-center gap-2 my-2">
            Product Name:
            <input
              type="text"
              className="grow"
              placeholder="PC Parts"
              ref={productNameRef}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-2">
            Cost of Sale:
            <input
              type="number"
              className="grow"
              placeholder="0"
              ref={productCosRef}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-2">
            Selling Price:
            <input
              type="number"
              className="grow"
              placeholder="0"
              ref={productPriceRef}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-2">
            Source:
            <input
              type="text"
              className="grow"
              placeholder="Source"
              ref={productSourceRef}
            />
          </label>

          <div className="flex align-center justify-between my-2">
            <button
              className={`btn btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg mr-4`}
              onClick={addProduct}
            >
              {addingDoc ? "Saving ..." : "Save Product"}
            </button>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-ghost ">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="border-4 md:col-span-1 md:ml-4 w-full">
        <div className="rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">
            Additional Information or Products
          </h2>
          <div>
            <p>Cash on hand / Rotating funds: </p>
            <p>
              Remaing Cos value of products:{" "}
              {stallProductsdata?.reduce(
                (acc, product) => acc + parseInt(product.cos),
                0
              )}
            </p>
            <p>
              Remaing Cos value of products:{" "}
              {stallProductsdata?.reduce(
                (acc, product) => acc + parseInt(product.price),
                0
              )}
            </p>
          </div>
          {/* You can open/close the modal using document.getElementById('ID').showModal() or .close() method */}
          <button
            className="btn"
            onClick={() => {
              document.getElementById("my_modal_3").showModal();
            }}
          >
            open modal
          </button>
          <h3>Products</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {stallProductsdata &&
              stallProductsdata?.map((product) => (
                <div
                  key={product.id}
                  className="card w-50 bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {product.productName}
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline w-full">
                        COS: {product.cos}, SELLING: {product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StallDetails;
