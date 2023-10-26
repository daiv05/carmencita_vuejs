import { useToast } from 'vue-toastification';

const toast = useToast();

const MSG_INFO = 'info';

const style_toast = {
    position: "bottom-left",
    timeout: 2994,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.27,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}

export function showMessages(tipo, mensaje) {

    if (tipo == true) {
        toast.success(mensaje, style_toast);
    } else if (tipo == MSG_INFO) {
        toast.info(mensaje, style_toast);
    } else {
        toast.error(mensaje, style_toast);
    }
}

export default showMessages ;