import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function messageInfo(desc: string, status: string, time: number) {
    if (status === 'info') {
        toast.info(desc, {
            position: 'bottom-left',
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (status === 'success') {
        toast.success(desc, {
            position: 'bottom-left',
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (status === 'warning') {
        toast.warning(desc, {
            position: 'bottom-left',
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (status === 'error') {
        toast.error(desc, {
            position: 'bottom-left',
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else {
        toast(desc, {
            position: 'bottom-left',
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export function MessageInfoContainer() {
    return (
        <ToastContainer />
    );
}