import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n.jsx";
import { Provider } from "react-redux";
import store from "@store/admin/index.js";
// import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/client/cart/cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
      <CartProvider>
        <App />

        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

serviceWorker.unregister();
