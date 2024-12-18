import { toast } from 'react-toastify';

const ConfirmDeleteToast = ({cb}: {cb: () => void}) => {

  return (
    <div>
    <p className='mb-2 text-black'>Are you sure you want to delete?</p>
    <div className="flex space-x-4 items-center">
      <button
        onClick={() => {
            cb()
            toast.dismiss();
        }}
        className="bg-red-500 text-white h-fit px-3 py-1 rounded"
      >
        Delete
      </button>
      <button
        onClick={() => toast.dismiss()} // Close the toast on cancel
        className="bg-gray-300 text-black h-fit px-3 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
  )
}

export default ConfirmDeleteToast
