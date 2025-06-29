import React, { useState } from 'react'
import { useMutation, useQueryClient} from '@tanstack/react-query'
import { Button } from '@/components/ui/button';

// API functions

async function createTask(newTask) {
    const response = await fetch('http://localhost:5000/api/task',{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    });

    if(!response.ok) throw new Error('Failed to create new task');
    return response.json()
}

function Tasks() {

    const [ task, setTask ] = useState('')

    const queryClient = useQueryClient()

    const mutation = useMutation({

        mutationFn: createTask,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['task']})
        }

        
    })

    const handleAdd = ()=>{

        mutation.mutate({title: task, completed: false})
            
        }


  return (
    <div>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
        <Button variant="default" size="icon" onClick={handleAdd}>Add</Button>

    </div>
  )
}

export default Tasks