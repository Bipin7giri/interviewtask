
$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 86){
    $("#banner").addClass("shrink");
  }
  else
  {
    $("#banner").removeClass("shrink");
  }
});

$(document).ready(function () {
  // Make the AJAX request to the Numbers API
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Update the content on the page
      let content = data.text; // Assuming the API response has a "text" property
      $("#api-content").text(content); // Update the content of the specified div
    },
    error: function () {
      // Handle any errors that occur during the AJAX request
      console.error("Failed to fetch data from the API");
    },
  });
});

  document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const message = document.getElementById('message');
    const previewImage = document.getElementById('preview-image');

    imageInput.addEventListener('change', function () {
      const file = imageInput.files[0];
      previewImage.src = URL.createObjectURL(file); // Display the selected image
      uploadImage(file);
    });

    function uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);

      fetch('http://localhost:5000/upload', { // Replace with your server's endpoint
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // If the server returns JSON, you can parse it here
          } else {
            throw new Error('Upload failed.');
          }
        })
        .then((data) => {
          // Handle the response data here (if needed)
          message.innerHTML = 'Upload successful!';
        })
        .catch((error) => {
          console.error('Error:', error);
          message.innerHTML = 'Upload failed.';
        });
    }
  });


