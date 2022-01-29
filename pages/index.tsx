import type { NextPage } from "next";
import { useEffect } from "react";

import Home from "../app/components/home/home";
import { useCategory } from "../app/hooks/useApi";
import { useStore } from "../app/store/store";

const Main: NextPage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Main;
