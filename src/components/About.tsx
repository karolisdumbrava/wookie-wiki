import React from "react";

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-grow flex items-center justify-center p-5 space-x-10">
        <div className="w-1/2">
          <p className="text-xl leading-relaxed">
            Welcome to <span className="font-bold">Wookiee-Wiki</span>, your
            ultimate Star Wars database. Delve deep into the world of Star Wars,
            explore films, characters, starships, and more. All powered by SWAPI
            - The Star Wars API.{" "}
            <span className="italic">May the Force be with your queries!</span>
          </p>
        </div>
      </main>

    </div>
  );
};
