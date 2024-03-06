import React from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fs } from "../firebase";
import { useQuery } from "@tanstack/react-query";

function StallDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const getStallData = async () => {
    const querySnapshot = await getDoc(doc(fs, "stalls", params.id));

    return querySnapshot.data();
  };

  const deleteStall = () => {
    deleteDoc(doc(fs, "stalls", params.id)).then(() => {
      alert("Doc deleted");
      setTimeout(() => {
        try {
          navigate("/stalls");
          console.log("redirected");
        } catch (error) {
          console.log(error);
        }
      }, 2000);
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
      {/* <div>StallDetails - {params.id}</div> */}
      <div>Stall Name: {data?.stallName}</div>

      <button className="btn btn-wide" onClick={deleteStall}>
        Delete Doc
      </button>
      <Link to={".."} relative="path">
        Go back
      </Link>

      {/* Stall details layout */}
    </div>
  );
}

export default StallDetails;
