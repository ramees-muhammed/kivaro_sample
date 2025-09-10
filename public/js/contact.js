
//backend script

// $(document).ready(function () {
//   let isLoading = false;

//   $(".form-wrapper").on("submit", function (e) {
//     e.preventDefault();

//     if (isLoading) return;

//     const $btn = $(".banner-btn.primary-btn");
//     const originalText = $btn.text();
//     const minLoadingTime = 500; 
//     const startTime = Date.now();

//     // --- Set loading state ---
//     isLoading = true;
//     $btn
//       .prop("disabled", true)
//       .html(
//         `<span class="spinner-border spinner-border-sm me-2"></span> Submitting...`
//       );

//     // --- Collect Form Data ---
//     const formData = {
//       name: $("#inputFullname").val().trim(),
//       email: $("#inputEmail4").val().trim(),
//       phone: $("#inputPhoneNumber").val().trim(),
//       company: $("#comapanyName").val().trim(),
//       message: $("#inputMessage").val().trim(),
//     };

//     // --- Validation ---
//     if (!formData.name || !formData.email || !formData.message) {
//       resetButton($btn, originalText, startTime, minLoadingTime, () => {
//         showToast("Name, email, and message are required.", "error");
//       });
//       return;
//     }

//     // --- API Call ---
//     apiRequest("contact", "POST", formData)
//       .done(function (res) {
//         resetButton($btn, originalText, startTime, minLoadingTime, () => {
//           if (res.success) {
//             showToast(res.message, "success");
//             $(".form-wrapper")[0].reset();
//           } else {
//             showToast(res.message, "error");
//           }
//         });
//       })
//       .fail(function (xhr) {
//         resetButton($btn, originalText, startTime, minLoadingTime, () => {
//           console.error("API Error:", xhr.responseJSON || xhr);
//           showToast("Failed to submit form. Please try again.", "error");
//         });
//       });
//   });

//   // --- Reset button then run callback ---
//   function resetButton($btn, originalText, startTime, minLoadingTime, cb) {
//     const elapsed = Date.now() - startTime;
//     const remaining = Math.max(0, minLoadingTime - elapsed);

//     setTimeout(() => {
//       $btn.prop("disabled", false).text(originalText);
//       isLoading = false;
//       if (cb) cb(); // toast AFTER button is reset
//     }, remaining);
//   }
// });