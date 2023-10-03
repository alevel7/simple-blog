import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {
    useMutation,
} from 'react-query'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { login } from '../apis/auth.api';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

const Login = () => {
    const navigate = useNavigate();
    const { register, setValue, handleSubmit, control, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation(login, {
        'onSuccess': (data) => {
            localStorage.setItem("user", JSON.stringify(data?.data));
            localStorage.setItem("token", data?.data?.accessToken);
            toast.success(`Welcome Back ${data?.data?.firstName || 'User'}!`)
            navigate('/dashboard')
        },
        'onError': (err) => {
            if (err?.response?.data?.message) {
                return toast.error(err?.response?.data?.message)
            }
            toast.error('Something went wrong! Pls check your internet connection')
        }
    })

    const onSubmit = (data) => {
        mutate(data);
    }
    return (
        <div className="create">
            <h4>Sign In</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label >Email </label>
                <input {...register('email')} />
                {
                    errors.email?.message ?
                        <small style={{ 'color': 'crimson' }}>{errors.email?.message}</small>
                        : ''
                }

                <label >Password </label>
                <input {...register('password')} />
                {
                    errors.password?.message ?
                        <small style={{ 'color': 'crimson' }}>{errors.password?.message}</small>
                        : ''
                }
                <button disable={isLoading ? "true" : "false"}>{isLoading ? 'Loading...' : 'Login'} </button>
            </form>
        </div>
    );
}

export default Login;