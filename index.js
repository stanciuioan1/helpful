var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});


/* GET users listing. */
router.get('/result', function(req, res, next) {
  res.sendFile('result.html');
});


router.post('/calculate-imc',(request, response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  console.log(JSON.stringify(request));

  let sex = request.body.sex;
  let varsta = request.body.varsta;
  let inaltime = request.body.inaltime;
  let masa = request.body.masa;

  console.log(`${sex}, ${varsta}, ${inaltime}, ${masa}`);

  // Validation
  let valid = validateData(sex, varsta, inaltime, masa);
  if(valid != ""){
    response.json({
      error: valid
    });
    return;
  }

  // Se poate face in validare?
  varsta = parseFloat(varsta);
  masa = parseFloat(masa);
  inaltime = parseFloat(inaltime);

  // Calculate
  const inaltimeMetrii = inaltime * 30.48 / 100;
  const IMC = masa / (inaltimeMetrii * inaltimeMetrii);
  const rezultat = calculRezultat(IMC, sex);

  response.json({
    nume: "Joe",
    prenume: "Doe",
    grupa: "DSWT 1A",
    IMC: IMC,
    rezultat: rezultat
  });
});


function validateData(sex, varsta, inaltime, masa){
  //TODO: Validate that.

  return "";
}

function calculRezultat(IMC, sex){
  switch(sex){
    case "masculin":
      if (IMC < 20) return "Subponderal";
      if (IMC <= 25) return "Masa normala";
      if (IMC <= 30) return "Supraponderal";
      if (IMC <= 40) return "Obezitate";
      return "Obezitate severa";
    case "feminin":
      if (IMC < 19) return "Subponderal";
      if (IMC <= 24) return "Masa normala";
      if (IMC <= 30) return "Supraponderal";
      if (IMC <= 40) return "Obezitate";
      return "Obezitate severa";
  }
  return "";
}

module.exports = router;
