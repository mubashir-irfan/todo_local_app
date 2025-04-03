'use client'
import { useTodoStore } from '@/lib/store/useTodoStore';
import { Button, Modal, ThemeToggle } from '@/shared/components';
import { ThemeProvider } from '@/shared/context';
import { Todo } from '@/types';
import { Typography } from '@mui/material';
import { Geist, Geist_Mono } from 'next/font/google';
import { useState } from 'react';
import { TodoForm } from './_components';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, addTodo } = useTodoStore();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'completed'>): string | null => {
    if (todos.some((todo) => todo.name === newTodo.name)) {
      return 'Todo name must be unique. This name already exists.';
    }

    const todo: Todo = {
      ...newTodo,
      completed: false,
    };
    addTodo(todo);
    return null;
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <GTClientProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen p-4">
            <div className='flex justify-between border-b border-gray-300 dark:border-gray-700'>
              <Typography variant="h4" component="h1" gutterBottom>
                Todo List
              </Typography>

              <Button label='Add Todo' onClick={openModal} className="mb-4" />
            </div>


            <Modal open={isModalOpen} onClose={closeModal} title="Add New Todo">
              <TodoForm onAddTodo={handleAddTodo} onClose={closeModal} />
            </Modal>
            <main className="flex-grow">
              {children}
            </main>
            <footer className="flex gap-4 items-center w-fit mx-auto">
              <ThemeToggle />
              {/* <LocaleSelector /> */}
            </footer>

          </div>

        </ThemeProvider>
        {/* </GTClientProvider> */}
      </body>
    </html>
  );
}
