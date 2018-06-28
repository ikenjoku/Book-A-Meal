import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const success = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'toast',
    progressClassName: 'toast-progress',
  });
};

const error = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'toast',
    progressClassName: 'toast-progress',
  });
};


export default {
  success,
  error,
};
