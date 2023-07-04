import { createRoot } from "react-dom/client";
import React from "react";

import MainScreen from "./components/MainScreen";

const root = createRoot(document.getElementById("root"));
root.render(<MainScreen />);
