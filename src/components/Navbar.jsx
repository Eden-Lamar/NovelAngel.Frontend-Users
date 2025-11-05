import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle  } from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
// import { Input } from "@heroui/input";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@heroui/button";
import { GiTwoCoins } from "react-icons/gi";
import { useState, useEffect } from "react";
import { CiSearch, CiCloudMoon  } from "react-icons/ci";
import { PiCloudSun } from "react-icons/pi";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo.png";


function NavbarSticky() {
  const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 🔥 Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Apply the current theme to the document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Persist choice
    localStorage.setItem("theme", theme);
  }, [theme]);


  // Check if current route is the book reader page
  const isBookReaderPage = location.pathname.includes("/book/") && location.pathname.includes("/read");

  
  const { auth, logout, isAuthenticated } = useAuth(); // ✅ get user + logout + auth state

  const user = auth?.user;
  const coins = user?.coinBalance;
  const avatar = user?.avatar; 

  console.log("auth", auth)
  console.log("auth", isAuthenticated)
  console.log("avatar", avatar)


  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Novels", path: "/novels" },
    { name: "Genres", path: "/genres" },
    { name: "Buy Coins", path: "/buy-coins" },
  ];

  return (
    <Navbar 
      position={isBookReaderPage ? "static" : "sticky"}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "px-4 md:px-8 max-w-full"
      }}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Logo - Centered on mobile, left on desktop */}
      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand as={Link} to="/">
          <img
            src={logo}
            alt="Novel Angel Logo"
            className="h-10 w-auto mr-1"
          />
          <span className="text-xl font-vibes text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
            Novel Angel
          </span>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Logo */}
      <NavbarContent className="hidden md:flex" justify="start">
        <NavbarBrand as={Link} to="/">
          <img
            src={logo}
            alt="Novel Angel Logo"
            className="h-14 w-auto mr-2"
          />
          <span className="px-1 text-3xl font-bold font-vibes text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
            Novel Angel
          </span>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation Links */}
      <NavbarContent className="hidden md:flex gap-4 justify-center flex-1">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base font-medium px-3 rounded-md transition-colors ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500"
                  : "text-gray-500 hover:text-gold"
              }`
            }
          >
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/novels"
            className={({ isActive }) =>
              `text-base font-medium px-3 rounded-md transition-colors ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500"
                  : "text-gray-500 hover:text-gold"
              }`
            }
          >
            Novels
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              `text-base font-medium px-3 rounded-md transition-colors ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500"
                  : "text-gray-500 hover:text-gold"
              }`
            }
          >
            Genres
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/buy-coins"
            className={({ isActive }) =>
              `text-base font-medium px-3 rounded-md transition-colors ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500"
                  : "text-gray-500 hover:text-gold"
              }`
            }
          >
            Buy Coins
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile - Avatar Only (show only if logged in) */}
      {isAuthenticated && (
      <NavbarContent className="md:hidden" justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                // className="transition-transform"
                // color="primary"
                size="sm"
                radius="sm"
                src={avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="coins" className="h-10 gap-2">
                <div className="flex items-center gap-2">
                  <GiTwoCoins className="text-lg text-yellow-500" />
                  
                  <span className="font-semibold">{coins} Coins</span>
                </div>
              </DropdownItem>
              <DropdownItem key="theme" onClick={toggleTheme}>
                <div className="flex items-center gap-2">
                  {theme === "light" ? (
                    <>
                      <CiCloudMoon className="text-xl" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <PiCloudSun className="text-xl" />
                      <span>Light Mode</span>
                    </>
                  )}
                </div>
              </DropdownItem>
              <DropdownItem key="my-profile" as={Link} to="/profile">My profile</DropdownItem>
              <DropdownItem key="library" as={Link} to="/library">My Library</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      )}

      {/* Mobile - Login/Register Buttons if not logged in */}
      {!isAuthenticated && (
        <NavbarContent className="md:hidden gap-2" justify="end">
          <NavbarItem>
            <Button as={Link} onClick={() => sessionStorage.setItem("lastVisited", window.location.pathname)} to="/login" color="primary" variant="flat" radius="md" size="sm">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} onClick={() => sessionStorage.setItem("lastVisited", window.location.pathname)} to="/signup" color="danger" variant="solid" radius="md" size="sm">
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Desktop - Right Side Icons */}
      <NavbarContent className="hidden md:flex gap-4 items-center" justify="end">
        {/* <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch className="text-2xl"/>}
          type="search"
        /> */}

        <NavbarItem>
          <Button color="primary" variant="light" radius="md" size="sm" isIconOnly onClick={toggleTheme}>
            {theme === "light" ? (
              <CiCloudMoon className="text-2xl" />
            ) : (
              <PiCloudSun className="text-2xl" />
            )}
          </Button>
        </NavbarItem>
      
      {/* Coins + Avatar (only show if logged in) */}
        {isAuthenticated ? (
          <>
            <NavbarItem className="flex items-center gap-1">
              <GiTwoCoins className="text-lg text-gold" />
              <span className="text-sm font-semibold">{coins}</span>
            </NavbarItem>

            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    // className="transition-transform"
                    // color="primary"
                    name={user?.username}
                    size="sm"
                    radius="sm"
                    src={avatar}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="my-profile" as={Link} to="/profile">My profile</DropdownItem>
                  <DropdownItem key="library"  as={Link} to="/library">My Library</DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
        </>
        ) : (
          <>
            {/* Login & Register buttons for guests */}
            <NavbarItem>
              <Button 
                as={Link} 
                onClick={() => sessionStorage.setItem("lastVisited", window.location.pathname)} 
                to="/login" 
                color="primary" 
                variant="flat" 
                radius="md" 
                size="sm"
                >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button 
                as={Link} 
                onClick={() => sessionStorage.setItem("lastVisited", window.location.pathname)} 
                to="/signup" 
                color="danger" 
                variant="solid" 
                radius="md" 
                size="sm"
                >
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <NavLink
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `w-full text-lg py-2 ${
                  isActive
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 font-semibold"
                    : "text-gray-600 dark:text-gray-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
        
        {/* Search in mobile menu */}
        {/* <NavbarMenuItem className="pt-4">
          <Input
            classNames={{
              base: "w-full",
              input: "text-small",
              inputWrapper:
                "h-10 font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<CiSearch className="text-2xl"/>}
            type="search"
          />
        </NavbarMenuItem> */}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarSticky;