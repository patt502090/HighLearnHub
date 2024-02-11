import { Button } from "flowbite-react";
import React from "react";

export default function LoginPage() {
    return (
        <>
            <div className='flex flex-col items-center mt-6'>
                <h className='text-xl font-bold'>Login Page</h>
            </div><br/>
            <div className='flex flex-col items-center mt-3'>
                <Button href='/register'>Register</Button><br/>
                <Button href='/member'>Member</Button><br/>
                <Button href='/admin'>Admin</Button>
            </div>
        </>
    )
}