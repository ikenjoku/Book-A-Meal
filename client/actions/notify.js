import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const success = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'success-container',
    bodyClassName: 'toast-success',
  });
};

const error = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'error-container',
    bodyClassName: 'toast-error',
  });
};

export default {
  success,
  error,
};
