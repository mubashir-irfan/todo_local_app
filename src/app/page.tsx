"use client";
import dynamic from "next/dynamic";
import { TodoList } from "./_components";

function Home() {
  return <TodoList />;
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
