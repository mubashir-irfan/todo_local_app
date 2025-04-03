"use client";
import { useTodoStore } from "@/lib/store/useTodoStore";
import { Button, GlobalErrorBoundary, Modal, ThemeToggle } from "@/shared/components";
import { Todo } from "@/types";
import { createTheme, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { Geist, Geist_Mono } from "next/font/google";
import { useMemo, useState } from "react";
import { TodoForm } from "./_components";
import { useTheme as useNextTheme } from 'next-themes';

import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, addTodo } = useTodoStore();
  const { theme } = useNextTheme();

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === 'dark' ? 'dark' : 'light',
          primary: {
            main: theme === 'dark' ? '#fff' : '#000',
          },
          secondary: {
            main: theme === 'dark' ? '#000' : '#fff',
          },
          background: {
            default: theme === 'dark' ? '#121212' : '#fff',
            paper: theme === 'dark' ? '#1e1e1e' : '#fff',
          },
          text: {
            primary: theme === 'dark' ? '#fff' : '#000',
            secondary: theme === 'dark' ? '#aaa' : '#666',
          },
          divider: theme === 'dark' ? '#333' : '#ccc',
        },
      }),
    [theme],
  );


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = (
    newTodo: Omit<Todo, "id" | "completed">,
  ): string | null => {
    if (todos.some((todo) => todo.name === newTodo.name)) {
      return "Todo name must be unique. This name already exists.";
    }

    const todo: Todo = {
      ...newTodo,
      id: Date.now(),
      completed: false,
    };
    addTodo(todo);
    return null;
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalErrorBoundary>
          <ThemeProvider theme={muiTheme}
          >
            <div className="flex flex-col h-screen p-4">
              <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 py-2">
                <Typography variant="h4" component="h1" gutterBottom>
                  Todo List
                </Typography>

                <Button label="Add Todo" onClick={openModal} />
              </div>

              <Modal open={isModalOpen} onClose={closeModal} title="Add New Todo">
                <TodoForm onAddTodo={handleAddTodo} onClose={closeModal} />
              </Modal>
              <main className="flex-grow">{children}</main>
              <footer className="flex gap-4 items-center w-fit mx-auto">
                {/* <ThemeToggle /> */}
              </footer>
            </div>
          </ThemeProvider>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
