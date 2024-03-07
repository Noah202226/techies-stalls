import React, { useRef, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fs } from "../firebase";
import { useQuery } from "@tanstack/react-query";

function StallDetails() {
  const [addingDoc, setAddingDoc] = useState(false);

  const inputStallName = useRef();

  const params = useParams();
  const navigate = useNavigate();

  const getStallData = async () => {
    const querySnapshot = await getDoc(doc(fs, "stalls", params.id));

    return querySnapshot.data();
  };

  const deleteStall = () => {
    setAddingDoc(true);
    deleteDoc(doc(fs, "stalls", params.id)).then(() => {
      setAddingDoc(false);

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

  if (status === "loading") return <h2>Loading....</h2>;
  if (status === "error") return <h2>Error: {error.message}</h2>;
  return (
    <div>
      <div className="absolute w-8 m-5">
        <Link to={".."} relative="path">
          <img src="/back-arrow.svg" alt="back-arrow" />
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto p-4 flex">
        <div className="bg-white shadow-lg rounded-lg p-4 flex-grow">
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
                  Stall Name {data?.stallName}
                </h1>
                <p className="text-gray-500">Location: {data?.stallLocation}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">About Us</h2>
                <p>{data?.vision}</p>
              </div>
            </div>
            <div className="md:col-span-1 md:ml-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-2">Opening Hours</h2>
                <ul className="list-disc ml-4">
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
              <div className="mt-4 bg-gray-100 rounded-lg p-4">
                <h2 className="text-xl font-bold mb-2">Contact Information</h2>
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
          </div>
        </div>
        <div className="md:col-span-1 md:ml-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">
              Additional Information or Products
            </h2>
            {/* Add content for additional information or products here */}
          </div>
        </div>
      </div>

      <button
        onClick={deleteStall}
        className="btn w-full my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <span
          className={`${addingDoc ? "loading" : ""} loading-spinner`}
        ></span>
        Delete Doc
      </button>
    </div>
  );
}

export default StallDetails;
