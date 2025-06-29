import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from '../ui/card'
import { Input } from '../ui/input' 
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../util/errorUtils'
import useAuthStore from '../../lib/store/authStore'

function LoginForm() {
    const navigate = useNavigate()
    const {setAuth } = useAuthStore();
    const [isLoading, setIsLoading] = useState()
    const [formValues, setFormValues] = useState({
            email:"",
            password:""   
        })

        const handleInputChange = (e)=>{
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name] : value
        })
    }
    
    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            console.log("response data", response)
            return response.data
        },
        onSuccess: (data)=>{
            if(data.token){
                const user = data.user;
                const token = data.token;
                setAuth(user, token)
                navigate('/dashboard')
            }
            
        },
        onError: (err)=>{
            console.log("err", err)
            setError(extractErrorMessages(err))
        }
    })

    const [error, setError] =useState(null);
    
        const handleSubmit = (e)=>{
            e.preventDefault();
            setError(null)
    
            if(!formValues.email || !formValues.password){
                setError('All fields are required ')
                return
            }
    
            
            // TODO: Mutation
    
            loginMutation.mutate({
                email: formValues.email,
                password: formValues.password
            })
    
        }



  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">Signin</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your Account
        </CardDescription>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-0">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Email</div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="emre@gmail.com"
                  required
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Password</div>
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="**************"
                  required
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="py-4">
              <Button type="submit" className={"w-full cursor-pointer"}>
                 {isLoading ? 
                 (<span className='flex items-center gap-2'>
                    <LoaderCircle /> login account... 
                    </span>) 
                    : ("Login Account")}
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className={"flex justify-center pt-0"}>
          <div className="text-center text-sm">
            Don't have an account ?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-primary hover:underline cursor-pointer"
            >
              Create account
            </a>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default LoginForm