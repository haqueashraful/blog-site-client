import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Router/Routes.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { MyContext } from "./Context/MyContext.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-photo-view/dist/react-photo-view.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyContext>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </ChakraProvider>
      <ToastContainer />
    </QueryClientProvider>
    </MyContext>
  </React.StrictMode>
);
