'use client';

import styles from "./authForm.module.css";

import Input from "@/app/components/inputs/inputs";
import Button from "@/app/components/button";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';


const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant ] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() =>    {
    if (session?.status === 'authenticated') {
        router.push('/users');
    }
    }, [session?.status, router]);





    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }  
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
     } = useForm<FieldValues>({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''

        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            axios.post('api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went worng'))
            .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data, 
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid Credentials');
                }
                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users');
                }
            })
            .finally(() => setIsLoading(false));
        }
    }


    return (
        <div className={styles.authForm}>
            <form className={styles.form}
             onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (
                    <>
                    <Input
                    id="firstname"
                    label="First name"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type={""}
                    />
                    <Input
                    id="lastname"
                    label="Last name"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type={""}
                    />
                    </>
                )}
                    <Input 
                    id="email" 
                    label="Email address" 
                    type="email"
                    register={register} 
                    errors={errors}
                    disabled={isLoading}
                    />
                    <Input 
                    id="password" 
                    label="Password" 
                    type="password"
                    register={register} 
                    errors={errors}
                    disabled={isLoading}
                    />
          
                <div className={styles.button}>
                <Button 
                disabled={isLoading}
                fullWidth
                type="submit"
                > 
                    {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                </Button>
            </div>
            </form>
            <div>
                <span>Or continue with </span>
            </div>
            <div>
                {variant === 'LOGIN' ? 'New to Ebla' : 'Already have an account?'}
            </div>
            <div onClick={toggleVariant}>
                {variant === 'LOGIN' ? 'Creat an account' : 'Login '}
            </div>
            
        </div>
    )
}

export default  AuthForm;