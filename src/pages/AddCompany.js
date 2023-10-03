import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { addCompany } from '../apis/company.api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup.string().required(),
    numberOfUsers: yup.number().required(),
    numberOfProducts: yup.number().required(),
})

const AddCompany = () => {
    const navigate = useNavigate();
    const client = useQueryClient();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation(addCompany, {
        'onSuccess': (data) => {
            client.invalidateQueries('companies')
            toast.success(`New company added'}!`);
            navigate('/dashboard')

        },
        'onError': (err) => {
            console.log(err);
            if (err?.response?.data?.message) {
                return toast.error(err?.response?.data?.message)
            }
            toast.error('Something went wrong! Pls check your internet connection')
        }
    })

    const onSubmit = (data) => {
        const Percentage = (data.numberOfUsers / data.numberOfProducts) * 100;
        mutate({ ...data, Percentage });
    }

    return (
        <div className="create">
            <h4>Add Company</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label >Name </label>
                <input {...register('name')} />
                {
                    errors.email?.message ?
                        <small style={{ 'color': 'crimson' }}>{errors.name?.message}</small>
                        : ''
                }

                <label >Number of users </label>
                <input {...register('numberOfUsers')} />
                {
                    errors.numberOfUsers?.message ?
                        <small style={{ 'color': 'crimson' }}>{errors.numberOfUsers?.message}</small>
                        : ''
                }
                <label >Number of products </label>
                <input {...register('numberOfProducts')} />
                {
                    errors.numberOfProducts?.message ?
                        <small style={{ 'color': 'crimson' }}>{errors.numberOfProducts?.message}</small>
                        : ''
                }
                <button>{isLoading ? 'Loading...' : 'Login'} </button>
            </form>
        </div>
    );
}

export default AddCompany;