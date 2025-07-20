import React, { useState } from 'react';
import axios from '../utilis/axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(loginStart());
            let payload = {
                email,
                password
            }
        const response = await axios.post('/api/auth/login', payload)
        dispatch(loginSuccess(response.data))
        toast.success(response.data.message)
        navigate('/')
        } catch (error) {
            dispatch(loginFailure(error))
            if(error.response) {
                toast.error(error.response.data.message)
                console.log('Server responds with error: ' + error.response.data.message)
            } else if(error.request) {
                toast.error('No response')
                console.log('No response')
            } else {
                toast.error('Error settings up request: ' + error.message)
                console.log('Error settings up request: ' + error.message)
            }
        }
    }


    return (
        <>
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-full max-w-xl px-10 py-10 m-10 shadow-md bg-gray-100 rounded-xl'>
                <h1 className='text-3xl text-gray-800 font-bold text-center mb-10'>Login To Your Account</h1>

                <form onSubmit={handleSubmit} className='space-y-7'>
                    <div className='mt-5'>
                        <label className='text-gray-600 text-xl'>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border border-gray-400 p-3 text-xl mt-3 rounded-md bg-white' type='email'></input>
                    </div>
                    <div className='mt-5'>
                        <label className='text-gray-600 text-xl'>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-gray-400 p-3 mt-3 text-lg rounded-md bg-white' type='password'></input>
                    </div>

                <div className='flex justify-center items-center mt-10'>
                    <button disabled={loading} className='bg-amber-500 text-2xl px-7 py-2 rounded-md cursor-pointer'>
                        Login
                    </button>
                </div>
                </form>
            </div>
        </div>
        </>
    )
} 

export default Login