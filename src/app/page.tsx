"use client";
import { TodoList } from "./_components";
import dynamic from "next/dynamic";

function Home() {
  return <TodoList />;
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
