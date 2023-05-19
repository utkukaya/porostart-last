import Swal from 'sweetalert2'

// export const PopupModal = withReactContent(Swal)

export const PopupModal = (props) => {
    // Swal.fire({
    //     title: props.title,
    //     icon: props.icon,
    //     confirmButtonText: props.confirmButtonText
    //   });
      Swal.fire({
        icon: 'warning',
        title: 'Emin misiniz?',
        text: 'Bu işlem geri alınamaz!',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'Hayır, vazgeç'
      }).then((result) => {
        if (result.isConfirmed) {
            props.handleSuccess();
          // Silme işlemi gerçekleştirilir
          Swal.fire(
            'Silindi!',
            'İşleminiz başarıyla tamamlandı.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // İşlem iptal edilir
          Swal.fire(
            'İptal edildi',
            'İşleminiz iptal edildi.',
            'error'
          );
        }
      });
}
// PopupModal.fire({
//   title: <p>Hello World</p>,
//   didOpen: () => {
//     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
//     PopupModal.showLoading()
//   },
// }).then(() => {
//   return PopupModal.fire(<p>Shorthand works too</p>)
// })