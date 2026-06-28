import React from "react";

function Button ({
     children,
     type='button',
     bgcolor='bg-blue-600',
     textColor='text-white',
     className='',
     ...props
}){
    return (
        <button 
            // 1. Added the type attribute so it doesn't default to submitting forms randomly!
            type={type} 
            // 2. Closed the backticks BEFORE the props!
            className={`px-4 py-2 rounded-lg ${bgcolor} ${textColor} ${className}`} 
            // 3. Props are now outside, so onClick will actually work!
            {...props} 
        >
            {children}
        </button>
    )
}

export default Button;