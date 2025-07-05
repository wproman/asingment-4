import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store.ts";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

import "./index.css";
import router from "./routes";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
