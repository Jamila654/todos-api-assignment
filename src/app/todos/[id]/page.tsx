'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HoverEffect } from '@/components/ui/card-hover-effect';

interface ITodo {
  id: number;
  todo: string;
}

const TodoPage = () => {
  const [todo, setTodo] = useState<ITodo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchTodo = async () => {
      setError('');
      setLoading(true);

      try {
        const res = await fetch(`https://dummyjson.com/todos/${id}`);
        if (!res.ok) {
          throw new Error('Error fetching todo');
        }
        const data = await res.json();
        setTodo(data);
      } catch (error) {
        setError('Error fetching todo');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-white flex flex-col min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <div className="title font-extrabold sm:text-5xl">Todo Details</div>
      {todo ? (
        <div className="card  p-4 rounded">
          <HoverEffect  items={[{ title: `ID: ${todo.id}`, description: todo.todo, link: `/todos/${todo.id}` }]} />
        </div>
      ) : (
        <div>No todo found</div>
      )}
    </div>
  );
};

export default TodoPage;
