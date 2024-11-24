'use client'
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { HoverEffect } from '@/components/ui/card-hover-effect'

const page = () => {
  const [todos, settodos] = useState<ITodos[]| null>(null)
  const [error, seterror] = useState('')
  const [loading, setloading] = useState(false)

  const fetchTodos = async () => {
    seterror('')
    settodos(null)
    setloading(true)

    try {
      const res = await fetch('https://dummyjson.com/todos')
      if (!res.ok) {
        throw new Error(error)
      }
      const data = await res.json();
      settodos(data.todos)

      
    } catch (error) {
      seterror('Error fetching data')
    }finally{
      setloading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  


  interface ITodos{
    id: number,
    todo: string,

  }
  return (
    <div className='bg-slate-100 flex flex-col min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
     <div className="title font-extrabold text-2xl sm:text-5xl">Todos</div>
     {error && (
      <div className="error text-red-600 font-extrabold text-2xl">{error}</div>
     )}
     {loading ? (
        <div className="loading font-bold text-2xl">Fetching data...</div>
      ) : (
        <div className="cards   grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {todos &&
            todos.map((todo) => (
              <div
                key={todo.id}
                className="card"
              >
                <Link href={`/todos/${todo.id}`}><HoverEffect  items={[{ title: todo.todo, description: "", link: `/todos/${todo.id}` }]} /></Link>
                
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default page

