// components/SupabaseChecker.js
'use client';

import { useEffect, useReducer } from 'react';
import { supabase } from '../lib/supabaseClient'



const initialState = {
  data: [],
  title: '',
  description: '',
}
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'fetch':
      return { ...state, data: action.payload }
    case 'add':
      return {
        ...state,
        title: action.title || state.title,  // Update title or keep existing
        description: action.desc || state.description, // Update description if provided
      }
    case 'reset':
      return {
        ...state,
        title: '',
        description: '',
      };
    default:
      return state;
  }
}

const Home = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchTodo = async () => {
      const { data: todoData, error } = await supabase.from('todo').select('*')
      if (error) {
        console.log(error.message)
      } else {
        dispatch({ type: 'fetch', payload: todoData })
      }
    }
    fetchTodo();
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { title, description } = state;
    const { data: todoData, error } = await supabase.from('todo').insert({ Title: title, Description: description }).select()
    if (error) {
      console.log(error.message)
    } else {
      console.log(todoData)
      dispatch({ type: 'reset' })
    }
  }

  return (
    <div className="flex place-content-center flex-wrap w-screen h-screen bg-red-100">
      <form className='bg-red-200 rounded-lg block basis-4/6 block lg:basis-1/3 h-fit p-8' onSubmit={handleSubmit}>
        <h3 className='font-mono block text-right text-2xl'>Create Todo</h3>
        <div className='basis-10/12 rounded-md bg-none m-2 h-fit p-2 '>
          <label className=" input input-bordered flex items-center gap-2">
            <svg fill="#000000" className='h-4 w-4 opacity-70'
              viewBox="0 0 306.637 306.637" >
              <g>
                <g>
                  <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
                l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
                  <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
                L265.13,75.602L231.035,41.507z"/>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
              </g>
            </svg>
            <input type="text" value={state.title} onChange={(e) => dispatch({ type: 'add', title: e.target.value })} className="grow" placeholder="Title" />
          </label>
          <textarea value={state.description} onChange={(e) => dispatch({ type: 'add', desc: e.target.value })} className="block textarea textarea-bordered textarea-md  mt-4 w-full" placeholder="Description (optional)"></textarea>
        </div>
        <button type="submit" className="ml-auto btn block btn-active">Add</button>
      </form>
    </div>
  );
};

export default Home;
