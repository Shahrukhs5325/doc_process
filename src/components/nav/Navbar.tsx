import React, { useState } from 'react';
import { signOut } from "aws-amplify/auth"

type Props = {
};

const Navbar: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const signOutHandler = async () => {
    await signOut()
    //  await localStorage.clear();
  }

  return (

    <div className="flex w-full items-center justify-between bg-theme-color py-3 px-8" >

      <div className="flex w-full items-center justify-between gap-2  text-white font-lg">
        Ezy Intelligent Document Processing
      </div>
      <div>
        <div className="container mx-auto">

          <div className="flex w-full items-center justify-between ">

            <div
              id="navbarCollapse"
              className={`absolute right-4 top-full w-full  rounded-lg bg-white   shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"}`}>
              <div className="block">
                <div className="relative">
                  <button
                    onClick={() => setShowMegaMenu(!showMegaMenu)}
                    className="flex w-full items-center justify-between gap-1 py-2  text-white font-medium text-body-color "
                  >
                    user email
                    <span
                      className={`${showMegaMenu ? "-scale-y-100" : ""} duration-200`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`w-full rounded-md bg-white p-2 lg:absolute lg:right-0 lg:top-full lg:w-[220px] lg:p-4 lg:shadow-lg ${showMegaMenu ? "block" : "hidden"}`}
                  >
                    <div>
                      <div className="flex flex-col space-y-2">
                        <div className="text-base font-medium text-body-color hover:text-primary "
                          onClick={() => signOutHandler()}>
                          Sign Out
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>


    </div>


  );
};

export default Navbar;
