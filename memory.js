var memory = {

	randomCards: null,
	rows: 0,
	cols: 0,
	imgPairs: 0,
	cardOne: null,
	cardTwo: null,
	numberOfTries: 0,
	numberOfOpenCards: 0,
	completedPairs: 0,


	init: function() {
		memory.rows = 4;
		memory.cols = 4;
		memory.imgPairs = memory.rows * memory.cols / 2;
		var imagePlace = 0;  //används för tilldelning av id

		//slumptalsgenerering för utplacering av korten
		randomCards = RandomGenerator.getPictureArray(memory.rows, memory.cols);

		//Genererar spelplanen
		var gameBoard = "<table width='150'>\n\t<tbody>\n";
		for (var row = 0; row < memory.rows; row++) {
			gameBoard += "\t\t<tr>\n";
			for (var col = 0; col < memory.cols; col++) {
				gameBoard += "\t\t\t<td><a href='#' id='" + imagePlace + "'><img  src='0.png'  id='" + imagePlace + "'alt='image' /></a></td>\n";
				imagePlace++;
			}
			gameBoard += "\t\t</tr>\n";
		}
		gameBoard += "</table>\n\t</tbody>\n";
		document.getElementsByTagName("div")[0].innerHTML = gameBoard;

		//Tilldelar varje kort ett onclick-event.
		var triggerLink = document.getElementsByTagName("a");
		for (var i = 0; i < triggerLink.length; i++) {
			triggerLink[i].onclick = memory.turnCard;
		}
	},


	turnCard: function() {
		var imageNumber = this.firstChild.src;
		var imageArray = document.getElementsByTagName("img");
		var imageIdN = this.firstChild.id;

		if (memory.completedPairs < memory.imgPairs && this.firstChild.className != "done") {

			// om antalet öppna kort är mindre än två skall de "vändas", annars skall inget värde returneras
			if (memory.numberOfOpenCards < 2) {
				this.firstChild.src = "" + randomCards[this.id] + ".png";
				memory.numberOfOpenCards += 1;

				// sparar undan källan till första kortet i cardOne
				if (memory.numberOfOpenCards == 1) {
					memory.cardOne = this.firstChild.src;
					memory.numberOfTries += 1;
				}

				//sparar undan källan till andra  kortet i cardTwo
				if (memory.numberOfOpenCards == 2) {
					memory.cardTwo = this.firstChild.src;

					//om första kortet inte är samma som andra kortet vänds de tillbaka efter 1s.
					if (memory.cardOne != memory.cardTwo) {
						setTimeout(memory.turnBackCards, 1000);
					}

					else {  //om båda korten är lika tilldelas båda klassnamnet "done"
						var imageArray = document.getElementsByTagName("img");
						for (var i = 0; i < imageArray.length; i++) {
							if (imageArray[i].src == memory.cardOne || imageArray[i].src == memory.cardTwo) {
								imageArray[i].className = "done";
							}
						}

						//numberOfOpenCards sätts om till 0 och öppna par räknas upp med ett
						memory.numberOfOpenCards = 0;
						memory.completedPairs += 1;

						//om antalet uppvända par är lika med totalt antal par har man vunnit
						if (memory.completedPairs == memory.imgPairs) {
							var x;
							var r=confirm("Game Over, you won! \nYou made it in " + memory.numberOfTries + " tries. \n Play again?");
							if (r==true)
						  {
								location.reload();
						  }
							else
						  {
								x="<p>Tack för att du provade Q:te Memory!\nHa en fin dag.</p><p><a href=\"index.html\">Jag ångrar mig, jag vill spela.</a></p>";
								document.getElementById("info").innerHTML=x;
						  }


							//window.confirm("Game Over, you won! \nYou made it in " + memory.numberOfTries + " tries");
							//location.reload();
						 }
					}
				}
			}
			else { return; }
		}

	},


	turnBackCards: function() {

        //kollar igenom alla a-taggar, om någon har samma källa som cardOne
        //eller cardTwo "vänds" kortet tillbaka
		var imageSource = document.getElementsByTagName("a");
		for (var i = 0; i < imageSource.length; i++) {
			if (imageSource[i].firstChild.src == memory.cardOne || imageSource[i].firstChild.src == memory.cardTwo) {
				imageSource[i].firstChild.src = "0.png";
			}
		}
		memory.numberOfOpenCards = 0;
	}


}
window.onload = memory.init;







