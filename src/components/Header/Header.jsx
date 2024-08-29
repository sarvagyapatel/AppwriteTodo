import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    // {
    //     name: "All Posts",
    //     slug: "/all-posts",
    //     active: authStatus,
    // },
    // {
    //     name: "Add Post",
    //     slug: "/add-post",
    //     active: authStatus,
    // },
  ];

  return (
    <header className="py-3 w-full">
      <Container>
        <nav className="flex  items-center justify-center">
          <div className="mr-4">
            <Link to="/">
              <div className="flex flex-row  items-center">
                <Logo width="100px" />
                <span className="ml-4 text-lg font-bold">TodoList</span>
              </div>
            </Link>
          </div>
          <ul className="flex ml-auto font-semibold  items-center justify-center">
            {windowWidth >= 450 ? (
              <ul className="flex gap-2">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <button
                          onClick={() => navigate(item.slug)}
                          className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
              </ul>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  Menu
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 bg-gray-100 shadow-lg z-10 list-none p-0 m-0">
                    {navItems.map(
                      (item) =>
                        item.active && (
                          <li key={item.name}>
                            <button
                              onClick={() => {
                                navigate(item.slug);
                                setIsDropdownOpen(false); // Close dropdown after selection
                              }}
                              className="inline-block w-full text-left px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                            >
                              {item.name}
                            </button>
                          </li>
                        )
                    )}
                  </ul>
                )}
              </div>
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
