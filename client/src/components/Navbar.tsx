import { CircleUserRound, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router";
import useAuthStore from "../store/authStore";

// type LinkType = {
//   name: string;
//   path: string;
//   icon: React.ReactNode;
// };

const Navbar = () => {
  const { logout, success } = useAuthStore();

  const filteredLinks = success
    ? [
        {
          name: "About me",
          path: "/about-me",
          icon: <User />,
        },
        {
          name: "Log Out",
          path: "/",
          icon: <LogOut />,
          action: logout,
        },
      ]
    : [
        {
          name: "About me",
          path: "/about-me",
          icon: <User />,
        },
        {
          name: "Sign Up",
          path: "/signup",
          icon: <CircleUserRound />,
        },
        {
          name: "Login",
          path: "/login",
          icon: <LogIn />,
        },
      ];

  return (
    <div className="flex justify-between py-3 px-12">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        Logo
      </Link>
      <div className="flex-content gap-6">
        {filteredLinks.map((link, idx) =>
          link.name === "Log Out" ? (
            <button
              key={idx}
              onClick={link.action}
              className="flex-content gap-2 text-lg font-semibold text-indigo-600"
            >
              {link.icon}
              {link.name}
            </button>
          ) : (
            <Link
              key={idx}
              to={link.path}
              className="text-lg font-semibold text-indigo-600"
            >
              <div className="flex-content gap-2">
                {link.icon}
                {link.name}
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
