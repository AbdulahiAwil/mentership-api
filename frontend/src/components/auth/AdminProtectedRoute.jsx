
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router'; // Saxan halkan
import api from '../../lib/api/apiClient';
import useAuthStore from '../../lib/store/authStore';
function AdminProtectedRoute({ children }) {
    const location = useLocation(); // Waxaan helay location object-ka
  const { user, setAuth, clearAuth, token } = useAuthStore();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/auth/me',{
        headers: {
        Authorization: `Bearer ${token}`
    }
      });
      return response.data;
    },
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, error, clearAuth]);

  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data, token);
      
    }
  }, [isSuccess, data, setAuth, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin text-destructive text-3xl" />
      </div>
    );
  }

  if (isError) {
    console.log('error here', error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    console.log('user not found', user);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if(user.role !== 'admin'){
    return(
        <div className='flex w-screen items-center bg-destructive/10 p-4'>
            <h1 className='text-destructive text-center'>Waxaa Authorize uleh Admins kaliya</h1>
        </div>
    )
  }


  return children;


  
}

export default AdminProtectedRoute