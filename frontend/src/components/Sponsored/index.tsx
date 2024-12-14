"use client";
import { Card, CardHeader, CardFooter, Button, Image } from "@nextui-org/react";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const Sponsored = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      isFooterBlurred
      className="w-full max-w-96 h-[300px] col-span-12 sm:col-span-7 group bg-slate-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static image */}
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          Bring your musics to trending topics
        </p>
        <h4 className="text-white/90 font-medium text-xl">
          Your app to discover the greatest musics
        </h4>
      </CardHeader>
      {/* Video player */}
      {isHovered ? (
        <ReactPlayer
          url="/tutorial-youtube.mov"
          playing={isHovered}
          muted
          loop
          width="100%"
          height="100%"
          className="absolute mt-[48px] top-0 left-0 transform scale-200 "
        />
      ) : (
        <>
          {/* Container for image and video */}
          <div className="relative z-0 w-full h-full">
            <Image
              alt="Relaxing app background"
              style={{ imageRendering: "auto" }}
              className={`w-full mt-[95px]  transition-opacity duration-300 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
              src="/banner-youtube.png"
            />
          </div>
        </>
      )}

      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src="/logo-youtube.png"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Gallery Youtube</p>
            <p className="text-tiny text-white/60">Discover new musics</p>
          </div>
        </div>
        <Button
          radius="full"
          size="sm"
          onPress={() =>
            (window.location.href =
              "https://project-gallery-youtube.vercel.app")
          }
        >
          Go to page
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Sponsored;
