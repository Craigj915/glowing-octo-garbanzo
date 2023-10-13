"use client";
import React from "react";
import Days from "./components/Cards/Days";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url(https://images.unsplash.com/photo-1606929954274-71985d383323?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80)] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen max-w-screen flex justify-center">
        <Days />
      </div>
    </main>
  );
}
