function playSound() {   
    var audio = document.getElementById("audio");
    audio.play();
}

document.addEventListener('DOMContentLoaded',function(event){
    
    var dataText = ["cd documents\\projects"];

    /* function typeWriter(el, text) {
        i = 0;

        if(i < text.length){
            setTimeout(function(){
                document.getElementById(el).textContent = text.substring(0, i);
                typeWriter(el,text){}
            }, 500);

            
        }
    }

    typeWriter("input1", dataText[0]); */

    

    
    
    function typeWriter(el, text, j) {
      
        if (j <= (text.length)) {
            document.getElementById(el).textContent = text.substring(0, j);
            setTimeout(function() {
                typeWriter(el, text, j+1);
            }, Math.floor(500 * (Math.random() ** 3) + 50));
        }

        if (j == text.length) {
            setTimeout(function() {
                document.getElementById("output").textContent = "\n C:\\Users\\Alex\\Documents\\Projects>";
            }, 500);
        }
       
    }
    
    typeWriter("input1", dataText[0], 0); 

    

  });
