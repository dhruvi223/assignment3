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
        navigate("/");
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
        navigate("/");
      } else {
        toast.error("user is already registered");
      }
    } else {
      toast.error(`password and confirm password doesn't match`);
    }
  };
};
