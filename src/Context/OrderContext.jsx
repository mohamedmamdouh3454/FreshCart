import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { getDecodedToken } from "../utils/auth";

export let orderContext = createContext();

async function getUserAllOrders() {
  // take the id from the signed token, not from a storage key the user can edit
  let decoded = getDecodedToken();
  if (!decoded?.id) return false;

  return axios
    .get(`${baseUrl}/orders/user/${decoded.id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((data) => data)
    .catch((err) => err);
}

export default function OrderContextProvider({ children }) {
  const [allOrders, setAllOrders] = useState([]);
  return (
    <orderContext.Provider
      value={{ getUserAllOrders, allOrders, setAllOrders }}
    >
      {children}
    </orderContext.Provider>
  );
}
