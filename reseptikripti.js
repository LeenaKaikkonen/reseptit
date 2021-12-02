function haeRuoka() {
  const ruoka = document.getElementById("ruokateksti").value;
  const rasva = document.getElementById("aineteksti").value;
  console.log("Haetaan ruokaa " + ruoka);
  console.log("Haetaan rasvaa " + rasva);
  haeResepti(ruoka, rasva);
}

function haeResepti(ruoka, rasva) {
  let url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=c67fd93349ff4d9882f6d20fc16c54f2&number=100";

  if (ruoka != "") url += "&query=" + ruoka;
  if (rasva != "") url += "&maxFat=" + rasva;

  let ruutu = '<div class="container"><div class="row">';

  let i = 0;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      htmlData = "";
      //document.getElementById("reseptilista").innerHTML = data.results;
      data.results.forEach((resepti) => {
        console.log(resepti.title);
        htmlData +=
          "<h6>" +
          resepti.title +
          '</h6><img width=40% src="horizontal-line.png"></img><br/>';
        htmlData +=
          '<button onclick="haeAineosat(' +
          resepti.id +
          ')" type="button" class="">Recipe</button> <div id="reseptilista' +
          resepti.id +
          '" ></div>';
        htmlData +=
          '<img class="reseptikuva" src=' + resepti.image + "></img><br/>";

        if (i <= 2) {
          ruutu += '<div class="col-4">' + htmlData + "</div>";
          i++;
          htmlData = "";
        } else {
          ruutu +=
            '</div><div class="row"><div class="col-4">' + htmlData + "</div>";
          i = 1;
          htmlData = "";
        }
      });

      ruutu += "</div></div>";
      document.getElementById("reseptilista").innerHTML = ruutu;
    });
}

function haeAineosat(id) {
  let url =
    "https://api.spoonacular.com/recipes/" +
    id +
    "/information?apiKey=c67fd93349ff4d9882f6d20fc16c54f2";

  let lahde = "";
  let taulu = "<table width=100%>";
  taulu +=
    "<tr><td><h5>Incredient</h5></td><td><h5>Amount</h5></td><td><h5>Unit</h5></td></tr>";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //htmlData = "";
      lahde =
        '<br/><a href="' +
        data.sourceUrl +
        '" class="button kokoresepti">The full recipe can be found here</a><br/><br/>';

      data.extendedIngredients.forEach((ainesosa) => {
        console.log(ainesosa.aisle);
        taulu += "<tr>";
        taulu += "<td>" + ainesosa.name + "</td>";
        taulu += "<td>" + ainesosa.measures.metric.amount + "</td>";
        taulu += "<td>" + ainesosa.measures.metric.unitShort + "</td>";
        taulu += "</tr>";
      });
      taulu += "</table>";
      const finalHtml = taulu + lahde;
      console.log("FINAL: " + finalHtml);
      console.log(lahde);
      document.getElementById("reseptilista" + id).innerHTML = finalHtml;
    });
}
