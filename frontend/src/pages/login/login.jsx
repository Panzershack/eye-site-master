import React, { useState } from 'react';

const RegisterAndLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Handle login
            console.log('Logging in with email:', email, 'and password:', password);
        } else {
            // Handle registration
            console.log('Registering with email:', email, 'and password:', password);
        }
        // Reset email and password fields
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-center">
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-8 mx-4 md:w-1/2 lg:w-1/3">
                <h2 className="text-3xl font-semibold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 px-4 py-2" 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 px-4 py-2" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            className="text-blue-500 hover:text-blue-700" 
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterAndLogin;
