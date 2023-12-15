import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import NavLink from "./NavLink";

const navLinks = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/appointment",
    title: "Appointment"

  }
];
const Navbar = () => {
  return (
    <div className=" max-w-[1500px] mx-auto ">
      <nav className="px-3 lg:px-20 flex justify-between items-center">
        <div className="py-5 text-green-500 font-bold text-3xl">
          <Link href="/">
            <span className="text-blue-600 font-bold">Qwik</span> Medic
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex items-center space-x-10 font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  exact={link.path === "/"}
                  activeClassName="text-green-600 ease-in duration-200"
                >
                  <div className="flex items-center">
                    <p className="text-lg">{link?.title}</p>
                  </div>
                </NavLink>
              </li>
            ))}

            <div className="dropdown dropdown-bottom">
              <label
                tabIndex={0}
                className="  text-green-600 ease-in duration-200 font-medium"
              >
                Services
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  {" "}
                  <Link href="/pharmacy">Pharmacy </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/estore">E-store </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/doctor">Doctor </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/blood">Blood Donation </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/ambulance">Ambulance</Link>
                </li>
              </ul>
            </div>

            <li>
              <FaSearch />
            </li>
            <li>
              <Link href = "/mycart"><FaShoppingCart /></Link>
              
            </li>

            <div className="dropdown dropdown-end flex items-center">
              <Link href="/profile">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      height={100}
                      width={100}
                      className="w-10 h-10"
                      alt=""
                      src="https://images.pexels.com/photos/3757656/pexels-photo-3757656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                  </div>
                </label>
              </Link>

              <li>
                <Link href="/login">Login</Link>{" "}
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
