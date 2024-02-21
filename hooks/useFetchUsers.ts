'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';


interface User {
    ID: string;
    Name: string;
    Email: string;
    Password: string;
}


const useFetchUsers = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const { data, status } = await axios.get<User[]>("http://localhost:8080/users");
            if (status === 200) {
                setUsers(data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Error fetching users");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useFetchUsers;
