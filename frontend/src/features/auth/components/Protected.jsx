import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import React, { Children } from 'react'

const Protected = ({ children }) => {

    const { loading, user } = useAuth()

    if (loading) {
        return <div className='flex items-center justify-center h-screen bg-black text-white border border-gray-300 rounded-md'>
            <p>Loading...</p>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default Protected