import { Route, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom';
import Login from './Login/Login';
import { ProtectedLayout } from '../providers/AuthProvider/ProtectedLayout';
import { AuthLayout } from '../providers/AuthProvider/AuthLayout';
import { EventsLayout } from '../providers/EventsProvider/EventsLayout';
import { getTokenInfo } from '../api/proxyApi';
import IncomingEvents from '../components/IncominEvents/IncomingEvents';
import CreateEvent from './CreateEvent/CreateEvent';

const getUserLocation = (): Promise<{ lat: number; lng: number }> =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition((location) => {
      res({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log('geolocation');
      console.log(location);
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
          <Route path="/map" element={<IncomingEvents />}></Route>
          <Route path="/create" element={<CreateEvent />}></Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
