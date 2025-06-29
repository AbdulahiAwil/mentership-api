import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from '../ui/card'
import { Input } from '../ui/input' 
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../util/errorUtils'



function RegisterForm() {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        name: "",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleInputChange = (e)=>{
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name] : value
        })
    }

     const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData);
            console.log("response data", response)
            return response.data
        },
        onSuccess: (data)=>{
            navigate('/login')
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

        if(!formValues.name || !formValues.email || !formValues.password){
            setError('All fields are required ')
            return
        }

        if(formValues.password !== formValues.confirmPassword){
            setError('Passwords do not match')
            return
        }

        // TODO: Mutation

        registerMutation.mutate({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        })

    }

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter to your detail to register
        </CardDescription>

        <form onSubmit={handleSubmit}> 
          <CardContent className="space-y-4 pt-0">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Full name</div>
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Emre Awil"
                  required
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
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
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">
                Confirm Password
              </div>
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="**************"
                  required
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="py-4">
              <Button type="submit" className={"w-full cursor-pointer"}>
                {registerMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle /> Creating account....
                  </span>
                ) : (
                  "Creating Account"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className={"flex justify-center pt-0"}>
          <div className="text-center text-sm">
            Already have an account ?{" "}
            <a
              onClick={() => navigate("/")}
              className="text-primary hover:underline cursor-pointer"
            >
              Sign in
            </a>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default RegisterForm