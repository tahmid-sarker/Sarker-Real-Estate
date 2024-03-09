import React, { useState, useEffect } from 'react';
import { useDarkMode } from "../components/DarkModeContext";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Link } from "react-scroll";
import { auth, googleProvider } from '../firebase/firebase';
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import logo from "../assets/images/logo.png";
import Login from './Login';
import Signup from './Signup';


const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLoginPopup = () => {
    if (showSignupPopup) setShowSignupPopup(false);
    setShowLoginPopup(!showLoginPopup);
  }

  const toggleSignupPopup = () => {
    if (showLoginPopup) setShowLoginPopup(false);
    setShowSignupPopup(!showSignupPopup);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
      alert("Error logging out: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowLoginPopup(false);
      setShowSignupPopup(false);
    } catch (error) {
      console.error("Error with Google login: ", error);
      alert("Error with Google login: " + error.message);
    }
  };

  const navItems = [
    { link: "Home", path: "hero" },
    { link: "About", path: "about" },
    { link: "Properties", path: "properties" },
    { link: "Services", path: "services" },
    { link: "Testimonials", path: "testimonials" },
    { link: "Contact", path: "contact" },
  ];

  return (
    <nav className={`${ darkMode ? "dark bg-black" : "light bg-[#f3f3f3]"} flex justify-between items-center gap-4 lg:px-20 px-4 py-3 sticky top-0 z-30`}>
      <div id="logo">
        <img src={logo} alt="Company Logo" className="lg:w-[150px] w-[120px] dark:invert"/>
      </div>

      <ul className="lg:flex justify-center items-center gap-8 hidden">
        {navItems.map(({ link, path }) => (
          <Link key={path} className="text-black text-[15px] uppercase font-semibold cursor-pointer px-3 py-2 dark:text-white rounded-lg hover:bg-red-600 hover:text-white" to={path} spy={true} smooth={true} offset={-100}>
            {link}
          </Link>
        ))}
      </ul>

      <div className="flex justify-center items-center lg:gap-8 gap-2">
        <div className="flex justify-center items-center lg:gap-3 gap-1">
            <FaPhoneAlt className="size-5 text-red-600" />
            <h1 className="lg:text-xl text-sm text-black dark:text-white font-semibold">+8801234567890</h1>
        </div>
        <FaUserCircle className="size-6 text-red-600" />
        {user ? <button onClick={handleLogout} className="bg-red-500 text-white uppercase font-semibold cursor-pointer py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">Logout</button>
        :
        <button onClick={toggleLoginPopup} className="bg-red-500 text-white uppercase font-semibold cursor-pointer py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">Login/Sign Up</button>}
      </div>

      {/* Mobile menu icon starts here */}
      <div className="flex justify-center items-center lg:hidden" onClick={toggleMenu}>
        <div>
          {isMenuOpen ? <FaXmark className="text-black dark:text-white text-2xl cursor-pointer" /> : <FaBars className="text-black dark:text-white text-2xl cursor-pointer" />}
        </div>
      </div>

      <div className={`${isMenuOpen ? "flex" : "hidden"} w-full h-fit bg-slate-800 p-4 absolute top-[80px] left-0`} onClick={closeMenu}>
        <ul className="flex flex-col justify-center items-center gap-2 w-full">
          {navItems.map(({ link, path }) => (
            <Link key={path} className="text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:bg-red-600 hover:text-black w-full text-center" to={path} spy={true} smooth={true} offset={-100}>
              {link}
            </Link>
          ))}
        </ul>
        {user ? <button onClick={handleLogout} className="bg-red-500 text-white uppercase font-semibold cursor-pointer py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">Logout</button>
        : 
        <button onClick={toggleLoginPopup} className="bg-red-500 text-white uppercase font-semibold cursor-pointer py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">Login/Sign Up</button>}
      </div>

      {showLoginPopup && <Login handleGoogleLogin={handleGoogleLogin} setShowLoginPopup={setShowLoginPopup} toggleSignupPopup={toggleSignupPopup} />}
      {showSignupPopup && <Signup handleGoogleLogin={handleGoogleLogin} setShowSignupPopup={setShowSignupPopup} toggleLoginPopup={toggleLoginPopup} />}
    </nav>
  );
};

export default Header;