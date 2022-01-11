function playSound() {   
    var audio = document.getElementById("audio");
    audio.play();
}

document.addEventListener('DOMContentLoaded',function(event){
    
    var inputText = ["cd documents\\projects", "tree"];
    var outputText = ["\n C:\\Users\\Alex\\Documents\\Projects>", "\n bruh"]


    function printout(el, i, fncallback) {
        document.getElementById(el).textContent = outputText[i];
        setTimeout(fncallback, 1000);
    }

    function typeWriter(el, i, j, fncallback) {
      
        if (j <= (inputText[i].length)) {
            document.getElementById(el).textContent = inputText[i].substring(0, j);
            setTimeout(
                function() {
                    typeWriter(el, i, j+1, fncallback);
                }, 
                Math.floor(400 * (Math.random() ** 3) + 50));
        }

        if (j == inputText[i].length) {
            setTimeout(fncallback, 700);
        }
    }

    typeWriter("input1", 0, 0, () => 
    printout("output1", 0, () =>
    typeWriter("input2", 1, 0, () =>
    printout("output2", 1))
    ));

  });
