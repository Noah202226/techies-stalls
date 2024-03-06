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
    stallLocation: "San Ildefonso, Bulacan",
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
    return (
      <div className="flex flex-1 items-center justify-center h-screen ">
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <NavLink className="btn" to={"/"}>
        Home
      </NavLink>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Add Stall
      </button>
      <label className="input input-bordered flex items-center gap-2 my-2">
        <input
          type="text"
          className="grow"
          placeholder="Search something .... (Pc Components, Hardware, Store name, Tags) "
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4 bg-gray-900 shadow-lg rounded-lg">
        {data?.map((stall) => (
          <Link to={"/stalls/" + stall.id} key={stall?.id}>
            <div className="bg-gray-800 text-white p-4 h-full flex flex-col rounded-lg overflow-hidden transition-transform duration-300 transform-gpu hover:scale-105 focus:scale-105">
              <figure className="h-40 overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={stall?.bannerImg}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="card-title">
                    {stall?.stallName}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <div className="rating rating-xs rating-half">
                    <input
                      type="radio"
                      name="rating-10"
                      className="rating-hidden"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-1"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-2"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-1"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-2"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-1"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-2"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-1"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-2"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-1"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-green-500 mask mask-star-2 mask-half-2"
                      readOnly
                    />
                  </div>
                  <p className="text-ellipsis overflow-hidden">
                    Vision: {stall?.vision}
                  </p>
                  <p className="text-ellipsis overflow-hidden">
                    Stall Location:{" "}
                    {stall.stallLocation != null || undefined
                      ? stall.stallLocation
                      : "N/A"}
                  </p>
                </div>
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
