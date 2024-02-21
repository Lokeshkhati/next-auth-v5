"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3).max(50),
    password: z.string().min(5).max(20),
    confirm_password: z.string().min(5).max(20),
});

const UpdateUserInfoForm = () => {
    const userInfo = {
        name: 'lokesh',
        email: 'lokeshkhati@gmail.com',
        password: '12345',
        confirm_password: '12345',
    };

    const { register, handleSubmit, setValue } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {

        console.log('Updated data:', data);
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        defaultValue={userInfo.name}
                        onChange={(e) => setValue('name', e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={userInfo.email}
                        disabled
                        className="mt-1 p-2 border rounded w-full bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        defaultValue={userInfo.password}
                        onChange={(e) => setValue('password', e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirm_password')}
                        defaultValue={userInfo.confirm_password}
                        onChange={(e) => setValue('confirm_password', e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateUserInfoForm;
