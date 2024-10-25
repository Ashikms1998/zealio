import Image from "next/image"
import Link from "next/link"
import React from "react"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const EmailVerification = ({ searchParams }: PageProps) => {

  const token = searchParams.token;
  const error = searchParams.error;
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      {error && typeof error === "string" ? (
        <div className="grid gap-6">
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <h3 className="font-semibold text-2xl"> {error}</h3>
            <p className="text-muted-foreground text-center">
              Try{" "}
              <Link href={"/signup"} replace>
                <span className="text-bold text-xl underline">Sigin UP</span>{" "}
              </Link>
              again
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {token && token.length == 36 ? (
            <div className="grid gap-6">
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                {/* <div className="relative mb-4 h-80 w-80 text-muted-foreground">
                  <Image
                    src="/other/Confirmed-pana.png"
                    alt="Email Send"
                    fill
                  />
                </div> */}

                <h3 className="font-semibold text-2xl">Email Verified</h3>

                <p className="text-muted-foreground text-center">
                  YOU CAN{" "}
                  <Link href={"/login"} replace>
                  <span className="text-bold text-xl underline">Login</span> 
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              {/* <div className="relative mb-4 h-80 w-80 text-muted-foreground">
                <Image src="/other/Confirmed-pana.png" alt="Email Send" fill />
              </div> */}
              <h3 className="font-semibold text-2xl">Check your email</h3>

              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmailVerification