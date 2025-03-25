import { Loader } from "lucide-react"

function Loading() {
    return (
        <div className='absolute inset-0 flex items-center justify-center w-screen h-screen bg-black/20'>
            <Loader size={40} className="animate-spin text-purple-700" />
        </div>
    )
}

export default Loading