import React, { useEffect } from "react";
import { useState } from "react";

function ViewCart() {
  const [product, setProduct] = useState([]);

  const loggedin = JSON.parse(localStorage.getItem("loggedIn"));
  const email = loggedin.email;

  const userData = localStorage.getItem("users");
  const userDataj = JSON.parse(userData);
  const index = userDataj.findIndex((user) => user.email === email);

  const cart = JSON.parse(localStorage.getItem("cart"));

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          cart
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(cart).map((key) => (
            <div key={cart[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={cart[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{cart[key].title}</h2>
                  <p>{cart[key].category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
