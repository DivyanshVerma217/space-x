import React, { useEffect, useState, version } from "react";
import { Link } from "react-router-dom";

function Body() {
  const [launchpad, setLaunchpad] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getLaunchpad = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/launchpads");
      setLaunchpad(await response.json());
    } catch (error) {
      console.log("my error is " + error);
    }
  };
  useEffect(() => {
    getLaunchpad();
  }, []);

  return (
    <div className=" px-6  bg-hero-lg bg-contain">
      <h1 className="text-3xl text-white font-bold p-8 text-center">
        🚀--Launcpads--🚀
      </h1>

      <div className="flex  max-w-3xl m-auto   flex-grow items-center pl-2 py-2 bg-gray-100  rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <input
         className=" flex-grow text-base bg-transparent outline-none"
          type="text"
          placeholder="Search Launchpads "
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className = " text-3xl">🔍</button>
      </div>

      <p className=" text-white text-3xl text-center flex flex-col justify-center max-w-3xl m-auto p-8 border-4 cursor-pointer mt-10 rounded-xl mb-10">TOTAL COUNT : {launchpad.length}</p>

      <div>
        {launchpad
          .filter((item) => {
            if (searchTerm === "") {
              return item;
            } else if (
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return item;
            }
          })
          .map((items) => {
            return (
              <div className="px-4">
                <div className=" shadow-white shadow-lg flex flex-col justify-center max-w-3xl m-auto p-8 border-4 cursor-pointer mt-10 rounded-xl mb-10 bg-white bg-transparent text-white  ">
                  <div>
                    <img src={items.images.large} alt="" />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-2xl font-bold text-center">
                      <h1 className="underline">{items.name}</h1>
                      <h1>• {items.status}</h1>
                    </div>
                    <div>{items.details}</div>
                  </div>
                  <div className="flex justify-center p-2 ">
                    <Link to={`/knowmore/${items.name}`}>
                      <button className="border-2 justify-center p-2 text-black bg-white rounded-lg hover:bg-black hover:text-white">
                        KNOW MORE
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Body;






