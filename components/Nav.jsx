"use client";

import Link from "next/link";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';



const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {

    const setUpProvider = async () => {
      const response = await getProviders();

      console.log(response)
      setProviders(response);
    };

    setUpProvider();
  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="ideaspark logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">IdeaSpark</p>
      </Link>

      {/* desktop navigation */}
      <div className="hidden sm:flex">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5 ">
              <Link href='/create-post' className="black_btn">
                Create Post
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile" className="flex gap-2 flex-center">
                <Image
                  src={session?.user.image}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>

            </div>
          ) : (
            <div>
              {providers && Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
            </div>

          )
        }
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (<div className="flex">
          <Image
            src={session?.user.image}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
            onClick={() => setToggleDropdown(prev => !prev)}
          />


          {
            toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >My Profile</Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >Create Post</Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >Sign Out</button>
              </div>
            )
          }
        </div>) : (
          <div>
            {providers && Object.values(providers).map(provider => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav;


