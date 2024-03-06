import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { fs } from "../firebase";

function StallDetails() {
  const params = useParams();

  const deleteStall = () => {
    deleteDoc(doc(fs, "stalls", params.id)).then(() => {
      alert("Doc deleted");
      setTimeout(() => {
        try {
          redirect("/login");
          console.log("redirected");
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    });
  };
  return (
    <div>
      <div>StallDetails - {params.id}</div>

      <button className="btn btn-wide" onClick={deleteStall}>
        Deleted Doc
      </button>
      <Link to={".."}>Go back</Link>
    </div>
  );
}

export default StallDetails;
