(function() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
  
    var width = 1000;    // We will scale the photo width to this
    var height = 1000;     // This will be computed based on the input stream
  
    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
  
    var streaming = false;
  
    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.
  
    var video = null;
    var canvas = null;
    var photo = null;
    var formsrc = null;
    var startbutton = null;
  
    function startup() {
      video = document.getElementById('video');
      canvas = document.createElement('canvas');
      photo = document.getElementById('output_imgIdentityVeriflyExample');
      formsrc = document.getElementById('imgIdentityVeriflyExample');
      startbutton = document.getElementById('button_webcam');

      
  
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        var indexdb = window.indexedDB.open("mydatabase", 1);
        video.srcObject = stream;

        indexdb.onsuccess = function(event) {
          var db = event.target.result;
          let transaction = db.transaction(["image"], "readwrite");
          let objectStore = transaction.objectStore("image");
          const request = objectStore.get("case_" + get_maxcase() + '_' + formsrc.id);
          request.onsuccess = (event) => {
            const output_img = document.getElementById('output_' + formsrc.id)

              if (event.target.result !== undefined){
                video.style.display = "none"
                output_img.style.display = "block"
              }
              else{
                video.style.display = "block"
                output_img.style.display = "none"
              }
            video.play();
          };
        }

        
      })
      .catch(function(err) {
        const output_img = document.getElementById('output_' + formsrc.id)
        console.log("An error occurred: " + err);
        video.style.display = "none";
        output_img.style.display = "block"
        // startbutton.style.visibility = "hidden";


      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
  
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
  
          if (isNaN(height)) {
            height = width / (4/3);
          }
  
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
      startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);
  
    //   clearphoto();
    }
  
    // Fill the photo with an indication that none has been
    // captured.
  
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }
  
    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

  
    function takepicture() {
      var context = canvas.getContext('2d');
      var img = document.createElement('img');


      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        

        context.drawImage(video, 0, 0, width, height);

        var thai_currnet_date = document.getElementById('thai_currnet_date').innerHTML;
        context.font = '48px THsarabun';
        context.translate(width / 2, height / 2);
        context.rotate(-Math.PI / 4);
        context.textAlign = "center";
        context.fillText(thai_currnet_date, 0, 0);
  
        var data = canvas.toDataURL('image/jpeg',1.0);


        // photo.setAttribute('src', data);
        formsrc.setAttribute('value', data);


        canvas.toBlob(function (blob) {
            var resizedFile = new File([blob], 'resized_' + 'webcamera.jpg');
            var dataTransfer = new DataTransfer();
            dataTransfer.items.add(resizedFile);
            var real_file = dataTransfer.files;
            formsrc.files = real_file

            var indexdb = window.indexedDB.open("mydatabase", 1);
            indexdb.onsuccess = function(event) {
              var db = event.target.result;
              let transaction = db.transaction(["image"], "readwrite");
              let objectStore = transaction.objectStore("image");
   
              let datas = { Key: "case_" + get_maxcase() + '_' + formsrc.id, file: real_file[0] }
              const request = objectStore.put(datas);
              request.onsuccess = (event) => {
                dataurl = canvas.toDataURL(img.type);
                // document.getElementById('output_' + that.id).src = dataurl;
                const output_img = document.getElementById('output_' + formsrc.id)

                output_img.src = dataurl;
                output_img.classList.remove("org_img");
                output_img.style.display = "block";
                video.style.display = "none";
            };
   
            };
   
          }, 'image/jpeg', 1.0);

        
        

        
      } else {
        clearphoto();
      }
    }
    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
  })();