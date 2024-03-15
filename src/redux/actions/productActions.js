import { ActionTypes } from "../constants/action-types";
import toast from "react-hot-toast";

import bcrypt from "bcryptjs-react";

export const signin = (email, password, setEmail, setPassword, navigate) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SIGN_IN });
    const userData = localStorage.getItem("users");
    const userDataj = JSON.parse(userData);
    const user = userDataj.find((user) => user.email === email);

    //setting logged in user in local storage

    if (user !== undefined) {
      const loggedInuser = {
        email: email,
        password: user.password,
      };
      localStorage.setItem("loggedIn", JSON.stringify(loggedInuser));

      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        setEmail(email);
        setPassword(password);
        toast.success("logged in successfully");
        navigate("/productlist");
      } else {
        toast.error("password is incorrect");
      }
    } else {
      toast.error("email is not registered");
    }
  };
};

export const signup = (
  email,
  password,
  firstName,
  lastName,
  cpassword,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  navigate
) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SIGN_UP });

    if (password === cpassword) {
      const userData = localStorage.getItem("users");
      const userDataj = JSON.parse(userData);
      const user = userDataj.find((user) => user.email === email);

      if (user === undefined) {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPassword(password);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        let usersData = JSON.parse(localStorage.getItem("users"));
        usersData.push({
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: hashedPassword,
        });
        localStorage.setItem("users", JSON.stringify(usersData));

        const loggedInuser = {
          email: email,
          password: hashedPassword,
        };
        localStorage.setItem("loggedIn", JSON.stringify(loggedInuser));
        navigate("/productlist");
      } else {
        toast.error("user is already registered");
      }
    } else {
      toast.error(`password and confirm password doesn't match`);
    }
  };
};



export const fetchproduct = (setProduct) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_PRODUCT });
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((json) => {
        setProduct(json);
      });
  };

}

export const searchproduct = (setData, searchTerm) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH });
    fetch(`https://fakestoreapi.com/products/${searchTerm}`)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });

  };
}


export const paginationFunction = (setPagination) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.PAGINATION });
    fetch(`https://fakestoreapi.com/products?limit=5`)
    .then((response) => response.json())
    .then((json) => {
      setPagination(json);
    });

  };
}


export const descFunction = (setDesc) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.DESCENDING });
    fetch("https://fakestoreapi.com/products?sort=desc")
        .then((response) => response.json())
        .then((json) => {
          setDesc(json);
        });
  };
}


export const asceFunction = (setAsce) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.ASCENDING});
     fetch("https://fakestoreapi.com/products?sort=asce")
        .then((response) => response.json())
        .then((json) => {
          setAsce(json);
        });
  };
}


export const jewelleryFunction = (setJewellery) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.JEWELLERY});

    fetch("https://fakestoreapi.com/products/category/jewelery")
          .then((response) => response.json())
          .then((json) => {
            setJewellery(json);
          });
  };
}


export const electronicsFunction = (setElectronics) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.ELECTRONICS});

    fetch("https://fakestoreapi.com/products/category/electronics")
          .then((response) => response.json())
          .then((json) => {
            setElectronics(json);
          });

  };
}


export const menFunction = (setMen) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.MEN});
    
    fetch(`https://fakestoreapi.com/products/category/men's%20clothing`)
          .then((response) => response.json())
          .then((json) => {
            setMen(json);
          });

  };
}


export const womenFunction = (setWomen) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.WOMEN});

    fetch(`https://fakestoreapi.com/products/category/women's%20clothing`)
          .then((response) => response.json())
          .then((json) => {
            setWomen(json);
          });
  };
}