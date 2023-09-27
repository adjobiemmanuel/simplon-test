import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ShowDashBoard from "../compoment/Dashboard/ShowDashBoard";
import Accueil from "../pages/Accueil";
import User from "../pages/User";
import Profil from "../pages/Profil";
import Page404 from "../pages/Page404"
import DetailUser from "../pages/DetailUser";
import { RequireAuth } from "../compoment/RequireAuth";
import ForgetPassword from "../pages/ForgetPassword"
import SaveParticipants from "../pages/SaveParticipants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Page404/>
  },
  {
    path: "mot-de-passe-oublie",
    element: <ForgetPassword />
  },

  {
    path: "",
    element: (
      <RequireAuth>
        <ShowDashBoard />
      </RequireAuth>
    ),
    children: [
     
      {
        path: "/tableau-bord",
        element: (
          <RequireAuth>
            {" "}
            <Accueil />{" "}
          </RequireAuth>
        ),
      },
      {
        path: "/utilisateurs",
        element: (
          <RequireAuth>
            {" "}
            <User />{" "}
          </RequireAuth>
        ),
      },
      {
        path: "save-utilisateurs",
        element: (
          <RequireAuth>
            {" "}
            <SaveParticipants />{" "}
          </RequireAuth>
        ),
      },
      {
        path: "/utilisateurs/:id",
        element: (
          <RequireAuth>
            {" "}
            <DetailUser />{" "}
          </RequireAuth>
        ),
      },
      {
        path: "profil",
        element: <Profil />,
      },
    ],
  },

  // {
  //   path: "/user/:id",
  //   element: <UserDetail />,
  // },
  // {
  //   path: "",
  //   element: (
  //     <RequireAuth>

  //     </RequireAuth>
  //   ),
  //   children: [
  //     //   {
  //     //     path: "contact",
  //     //     element: <Contact />,
  //     //   },
  //     {
  //       path: "about",
  //       element: (
  //         <RequireAuth>
  //           <About />
  //         </RequireAuth>
  //       ),
  //     },
  //     {
  //       path: "profile",
  //       element: <Profile />,
  //     },
  //   ],
  // },
]);

export default router;
