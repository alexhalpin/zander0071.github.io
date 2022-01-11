function playSound() {   
    var audio = document.getElementById("audio");
    audio.play();
}

document.addEventListener('DOMContentLoaded',function(event){
    
    var dataText = ["C:\\Users\\Alex>"];
    
    function typeWriter(text, j, fnCallback) {
      
        if (j < (text.length)) {
            document.querySelector("p1").innerHTML = text.substring(0, j+1);
            setTimeout(function() {typeWriter(text, j+1, fnCallback);}, Math.floor(Math.random() * 500));
        }

    }
    
    typeWriter(dataText[0], 0, function(){ typeWriter(j+1);});

  });