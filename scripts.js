function playSound() {   
    var audio = document.getElementById("audio");
    audio.play();
}

document.addEventListener('DOMContentLoaded',function(event){
    
    var inputText = ["cd documents\\projects", "tree","Click one....  *rbt*"];
    var outputText = [
        "\n C:\\Users\\Alex\\Documents\\Projects>", 
        "\n ├───<a href=\"project1.html \" >Project1.html</a>    \
         \n ├───<a href=\"project2.html \" >Project2.html</a>    \
         \n ├───<a href=\"project3.html \" >Project3.html</a>    \
         \n └───<a href=\"resume.html \" >Resume.html</a>    \
         \n C:\\Users\\Alex\\Documents\\Projects>"
         
        ];


    function printout(el, i, fncallback) {
        document.getElementById(el).innerHTML = outputText[i];
        setTimeout(fncallback, 1000);
    }

    function typeWriter(el, i, j, fncallback) {
      
        if (j <= (inputText[i].length)) {
            document.getElementById(el).textContent = inputText[i].substring(0, j);
            setTimeout(
                function() {
                    typeWriter(el, i, j+1, fncallback);
                }, 
                Math.floor(250 * (Math.random() ** 5) + 50));
        }

        if (j == inputText[i].length) {
            setTimeout(fncallback, 500);
        }
    }

    function speech(el, i, j, fncallback) {
      
        if (j <= (inputText[i].length)) {
            document.getElementById(el).textContent = inputText[i].substring(0, j);
            setTimeout(
                function() {
                    speech(el, i, j+1, fncallback);
                }, 
                Math.floor(150));
        }

        if (j == inputText[i].length) {
            setTimeout(fncallback, 700);
        }
    }

    function appear(fncallback) {
        setTimeout( () => {
            document.getElementById('bubble').style.color = 'white'},4000
        );
        setTimeout( () => {
            fncallback();}, 4500
        );
    }

    typeWriter("input1", 0, 0, () => 
    printout("output1", 0, () =>
    typeWriter("input2", 1, 0, () =>
    printout("output2", 1, 
    appear( () =>
    speech("bubbletxt", 2, 0)
    )))));

  });
