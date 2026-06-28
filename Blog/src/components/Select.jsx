import React, { useId } from "react";

function Select({ 
    // 1. Added curly braces around everything!
    options,
    label,
    className = "",
    ref,       // 2. Moved 'ref' up here!
    ...props   // 3. '...props' is now safely at the very bottom!
}) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="">
                    {label}
                </label>
            )}
            
            <select 
                id={id} 
                ref={ref} 
                {...props} // The order of these inside the tag doesn't matter as much, but putting it after ref is good practice
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* Optional Chaining (?.) is great here just in case 
                  the parent forgets to pass an options array! 
                */}
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;