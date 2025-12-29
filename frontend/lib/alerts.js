import Swal from "sweetalert2";

export function showErrorAlert(message) {
    Swal.fire({
        toast: true,
        icon: "error",
        title: message,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}

export function showSuccessAlert(message) {
    Swal.fire({
        toast: true,
        icon: "success",
        title: message,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}