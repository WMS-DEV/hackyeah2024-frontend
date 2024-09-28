import IncomingEvents from "../components/IncominEvents/IncomingEvents";
import CreateEvent from "./CreateEvent/CreateEvent";
import Profile from "./Profile/Profile";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import Login from "./Login/Login";
import { ProtectedLayout } from "../providers/AuthProvider/ProtectedLayout";
import { AuthLayout } from "../providers/AuthProvider/AuthLayout";
import { EventsLayout } from "../providers/EventsProvider/EventsLayout";
import { getTokenInfo } from "../api/proxyApi";
import { SliderLayout } from "../providers/SliderProvider/SliderLayout";
import Home from "./Home/Home";

const getUserLocation = (): Promise<{ lat: number; lng: number }> =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition((location) => {
      res({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }, rej);
  });

const getUserData = () => {
  return {
    userData: getTokenInfo(),
  };
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => {
        return defer({
          userData: getUserData(),
        });
      }}
      errorElement={<Login />}
    >
      <Route path="/" element={<Login />} />

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="/" element={<SliderLayout />}>
          <Route
            path="/"
            element={<EventsLayout />}
            loader={() => {
              return defer({
                geolocation: getUserLocation(),
              });
            }}
            errorElement={<div>Error</div>}
          >
            <Route path="/calendar" element={<IncomingEvents />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/create" element={<CreateEvent />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
