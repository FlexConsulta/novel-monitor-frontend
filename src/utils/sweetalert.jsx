import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/**
 * IMPORTAÇÃO DO PLUGIN DE SWEET ALERT
 * @name: sweetalert2
 * @description: A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES ZERO DEPENDENCIES
 * @link:  https://sweetalert2.github.io/
 */

export default class SweetAlert {
  // SweetAlert.small({ position: 'top', showConfirmButton: false, timer: 3000, timerProgressBar: true, type: 'error', title: error })

  static small({ type, timer, title, cb, position }) {
    const MySwal = Swal.mixin({
      toast: true,
      position: position || "top-end",
      showConfirmButton: false,
      timer: timer || 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    MySwal.fire({ icon: type, title: title }).then(() => (cb ? cb() : false));
  }

  static default(param) {
    const MySwal = withReactContent(Swal);
    const { title, text, icon, showBtnCancel, confirmButtonText, callback } =
      param;

    MySwal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: showBtnCancel,
      confirmButtonColor: "#142939",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      if (result.value) callback();
    });
  }

  static mixin(param) {
    const { icon, title } = param;

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({ icon, title });
  }
}
