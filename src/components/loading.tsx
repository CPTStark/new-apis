function Loading() {
    return (
        <div className='absolute inset-0 flex items-center justify-center w-screen h-screen bg-black/20'>
            <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-purple-600'></div>
        </div>
    )
}

export default Loading