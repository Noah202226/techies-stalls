import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { fs } from "../firebase";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, redirect } from "react-router-dom";

const getStalls = async () => {
  return useQuery({
    queryKey: ["stalls"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(fs, "stalls"));

      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(todosData);
      return todosData;
    },
  });
};

// Saving New Stall
const saveStall = () => {
  addDoc(collection(fs, "stalls"), {
    stallName: "New Stall",
    vision: "New stall Vision",
    owner: "New Stall Owner",
    createdAt: serverTimestamp(),
    bannerImg:
      "https://img.freepik.com/free-vector/new-opening-hours-sign_23-2148823326.jpg?t=st=1709694724~exp=1709698324~hmac=e5852cb43d2defe2f3a931a1260857c0e12d9d6871f550d60c841ef3a535dc44&w=740",
  }).then(() => {
    alert("Doc added.");
    redirect("/", 300);
    document.getElementById("my_modal_5").hidden();
  });
};

function Home() {
  // Queries
  const { data, status, error } = useQuery({
    queryKey: ["stalls"],
    queryFn: getStalls(),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-screen h-screen bg-white">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Add Stall
      </button>
      <NavLink className="btn" to={"login"}>
        Login
      </NavLink>

      <div className="flex flex-1 items-center justify-center bg-slate-400 w-full">
        {data?.map((stall) => (
          <Link to={"stalls/" + stall.id}>
            <div
              key={stall?.id}
              className="card w-96 bg-base-100 h-96 p-2 m-2 shadow-xl hover:cursor-pointer hover:border-4 focus:border-4"
              onClick={() => console.log(stall?.id)}
            >
              <figure>
                <img className=" " src={stall?.bannerImg} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {stall?.stallName}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className="text-ellipsis overflow-hidden">
                  Vision: {stall?.vision}
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Stall</h3>
          <p className="py-4">Provide your stall information</p>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Stall Name" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Vision" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Owner" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            onClick={saveStall}
          >
            Save Stall
          </button>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Home;
