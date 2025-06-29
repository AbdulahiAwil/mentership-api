import React, { useState } from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DashboardWelcome from '../../components/dashboard/DashboardWelcome'
import TaskForm from '../../components/task/TaskForm'
import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { Loader } from 'lucide-react'
import TaskList from '../../components/task/TaskList'

function DashboardPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const handleCreateTaskClick = () => {
        setShowCreateForm(true)
    }

     const handleFormClose = () => {
        setShowCreateForm(false)
        setEditingTask(null)
    }
    const tasksQuery = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const response = await api.get('/task');
            return response.data;
        },
        retry: 1,
    })

    const handleEditTask = (task) => {
        setEditingTask(task)
        setShowCreateForm(true)
    }

     const handleStatusChange = async (taskId, statusData) => {
        // TODO : MUTATION TO UPDATE TASK STATUS
        // This function will be called when the status of a task is changed
    }

     if (tasksQuery.isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }

    
    if (tasksQuery.isError) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p className='text-red-500'>Error loading tasks: {tasksQuery.error.message}</p>
            </div>
        )
    }



  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}

        <DashboardHeader />

       
      {/* Main content*/}

       <main className='max-w-7xl mx-auto  px-4 py-8 space-y-6'>
          {/* Welcome Section */}

          <DashboardWelcome 
            showCreateForm={showCreateForm}
            onCreateTask={handleCreateTaskClick}
          />

          {/* Tasks Section */}

          <div>
            <TaskList 
                tasks={tasksQuery.data || []}
                isLoading={tasksQuery.isLoading}
                onEdit={handleEditTask}
                onStatusChange={handleStatusChange}
            />
          </div>
        </main>

      {/* Welcome Section */}


      {/* Task section */}

      <TaskForm 
        task={editingTask}
        open={showCreateForm || !!editingTask}
        onOpenChange={handleFormClose}
      />


    </div>
  )
}

export default DashboardPage