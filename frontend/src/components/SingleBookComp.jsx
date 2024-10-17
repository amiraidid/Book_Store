/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function SingleBookComp({ bookInfo }) {
  return (
    <div className="container mx-auto md:mx-5 max-sm:mx-7 mt-3 overflow-hidden">
      <div className="flex items-start gap-8 md:w-full max-sm:flex-wrap max-sm:my-10">
        <img src={bookInfo.image} alt={bookInfo.name} className="max-sm:min-w-fit" />
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900 my-5">{bookInfo.name}</h1>
          <div className="flex items-center gap-4">
            <h3>Author: <span className="font-medium capitalize">{bookInfo.author}</span></h3>
            <h3>Author: <span className="font-medium capitalize">{bookInfo.category}</span></h3>
          </div>
          <p className="text-2xl text-gray-800 my-5 w-[650px] max-sm:w-80">{bookInfo.description}</p>
          <span className="flex items-center gap-4 mt-8">
            <Link to={`/books/checkout/${bookInfo._id}`}><button className="bg-purple-500 px-8 py-2 rounded-md text-white hover:bg-purple-400 hover:scale-[1.1] transition-all">Buy Now</button></Link>
            <button className="bg-transparent border-2 px-8 py-2 rounded-md text-black hover:scale-[1.1] transition-all">Add to Cart</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleBookComp;
