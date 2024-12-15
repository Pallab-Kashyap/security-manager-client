import { Dispatch, FC, SetStateAction } from 'react'

interface InputProps {
    type: string
    placeholder: string
    className: string
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

const Input:FC<InputProps> = ({type, placeholder, className, value, setValue}) => {
  return (
    <input 
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${className} px-4 py-2 rounded-lg bg-gray-100/70 text-black`}
    />
  )
}

export default Input