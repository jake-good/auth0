import { Counter } from "./components/Counter";
import Profile, { FetchData } from "./components/Profile";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <Profile />
  }
];

export default AppRoutes;
