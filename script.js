// A faire retiere les variables intuiles

//référence aux élements input color
const mainColor=document.getElementById("mainColor")
const compColor=document.getElementById("compColor")
const monoAdd1Color=document.getElementById("monoAdd1Color")
const monoAdd2Color=document.getElementById("monoAdd2Color")
const neutral1Color=document.getElementById("neutral1Color")
const neutral2Color=document.getElementById("neutral2Color")
const triadColor=document.getElementById("triadColor")

const x=document.getElementById("x")
//référence aux élements span code hsl
const mainColorHSL=document.getElementById("mainColorHSL")
const compColorHSL=document.getElementById("compColorHSL")
const monoAdd1ColorHSL=document.getElementById("monoAdd1ColorHSL")
const monoAdd2ColorHSL=document.getElementById("monoAdd2ColorHSL")
const neutral1ColorHSL=document.getElementById("neutral1ColorHSL")
const neutral2ColorHSL=document.getElementById("neutral2ColorHSL")
const triadColorHSL=document.getElementById("triadColorHSL")

// référence à l'élement span pour X 
const xValueDisplay=document.getElementById("xValue")

let h=0
let s=0
let l=0
let comph=0
let compr=0
let compg=0
let compb=0
let monoadd1l=0
let monoadd1r=0
let monoadd1g=0
let monoadd1b=0
let monoadd2l=0
let monoadd2r=0
let monoadd2g=0
let monoadd2b=0

let mainColorValue=mainColor.value
let xValue=x.value
mainColor.addEventListener("input",showMainColor) 
x.addEventListener("change",getXValue) 
function showMainColor(event){
    mainColorValue=event.target.value
    mainColorHSL.textContent=mainColorValue
    console.log("mainColorValue",mainColorValue)
    convertRGBtoHSL()
}

function getXValue(event){
    xValue=event.target.value 
    xValueDisplay.textContent=xValue
    console.log(xValue)
    convertRGBtoHSL()
}


function convertRGBtoHSL(){
    let urlRgb2Hsl="https://www.thecolorapi.com/id?hex=" //url pour vertir du hex au hsl
    let urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=" //url pour vertir du hex au hex
    let hexRGB=mainColorValue.replace("#","")
    urlRgb2Hsl+=hexRGB
    // fetch les valeurs hsl de la couleur principale et màj sur la page
    fetch(urlRgb2Hsl)
    .then(response=>response.json())
    .then(response=>{
        h=JSON.stringify(response.hsl.h) ;
        s=JSON.stringify(response.hsl.s) ;
        l=JSON.stringify(response.hsl.l) ;
    })
    .then(response=>console.log(h,s,l))
    .then((response)=> {
        mainColorHSL.textContent= "hsl(" + h + "," + s + "%,"+l+"%)"})
    // calcul de la couleur complémentaire et reconvrsion en hex pour màj de l'input "color" 
    .then(response=>{
        comph=parseInt(h)+180 ;
        compColorHSL.textContent= "hsl(" + comph + "," + s + "%,"+ l+"%)";})
    .then(response =>{urlHsl2Rgb=urlHsl2Rgb+"("+comph+ "," + s + "%,"+ l +"%)" ; console.log(urlHsl2Rgb)})
    .then(response=>fetch(urlHsl2Rgb))
    .then(response=>response.json())
    .then(response=>{
        compColor.setAttribute("value",JSON.stringify(response.hex.value).replaceAll("\"","") )})
    .then(response=>urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=")
    // calcul des valeurs HSL pour le sch monochromatiques (2 couleurs additionnelles)
    .then(response=>{monoadd1l=parseInt(l) -parseInt(l/3); 
                    monoAdd1ColorHSL.textContent= "hsl(" + h + "," + s + "%,"+ monoadd1l+"%)"})                 
    .then(response=>{monoadd2l=parseInt(l) -parseInt(2*l/3); 
                    monoAdd2ColorHSL.textContent= "hsl(" + h + "," + s + "%,"+ monoadd2l+"%)";})                   
    //reconvrsion en rgb pour la couleur add1
    .then(response =>{urlHsl2Rgb=urlHsl2Rgb+ h + "," + s + "%,"+ monoadd1l+"%)" ; console.log(urlHsl2Rgb)})
    .then(response=>fetch(urlHsl2Rgb))
    .then(response=>response.json())
    .then(response=>{
        monoAdd1Color.setAttribute("value",JSON.stringify(response.hex.value).replaceAll("\"","") )
    })    
    .then(response=>urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=")
    //reconversion en rgb pour la couleur add2
    .then(response =>{urlHsl2Rgb=urlHsl2Rgb+ h + "," + s + "%,"+ monoadd2l+"%)" ; console.log(urlHsl2Rgb)})
    .then(response=>fetch(urlHsl2Rgb))
    .then(response=>response.json())
    .then(response=>{
        monoAdd2Color.setAttribute("value",JSON.stringify(response.hex.value).replaceAll("\"","") )
    })    
    .then(response=>urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=")
    // calcul des valeurs HSL pour le sch neutre (2 couleurs additionnelles)
    .then(response=>{neutral1h=parseInt(h) + parseInt(xValue); 
        neutral1ColorHSL.textContent= "hsl(" + neutral1h + "," + s + "%,"+ l+"%)"})                 
    .then(response=>{neutral2h=parseInt(h) -parseInt(xValue); 
        neutral2ColorHSL.textContent= "hsl(" + neutral2h + "," + s + "%,"+ l+"%)";})
    //reconvrsion en rgb pour la couleur neutral1
    .then(response =>{urlHsl2Rgb=urlHsl2Rgb+ neutral1h + "," + s + "%,"+ l+"%)" ; console.log(urlHsl2Rgb)})
    .then(response=>fetch(urlHsl2Rgb))
    .then(response=>response.json())
    .then(response=>{
        neutral1Color.setAttribute("value",JSON.stringify(response.hex.value).replaceAll("\"","") )
    })  
    .then(response=>urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=")
    //reconvrsion en rgb pour la couleur neutral2
    .then(response =>{urlHsl2Rgb=urlHsl2Rgb+ neutral2h + "," + s + "%,"+ l+"%)" ; console.log(urlHsl2Rgb)})
    .then(response=>fetch(urlHsl2Rgb))
    .then(response=>response.json())
    .then(response=>{
        neutral2Color.setAttribute("value",JSON.stringify(response.hex.value).replaceAll("\"","") )
    }) 
    .then(response=>urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=")            
    // calcul des valeurs HSL pour le sch triadique 
    .then(response=>{triadColorh=parseInt(h) + parseInt(120); 
        triadColorHSL.textContent= "hsl(" + triadColorh + "," + s + "%,"+ l+"%)"})                 
    //reconvrsion en rgb pour la couleur triadique
    .then(response =>{urlHsl2Rgb=urlHsl2Rgb+ triadColorh + "," + s + "%,"+ l+"%)" ; console.log(urlHsl2Rgb)})
    .then(response=>fetch(urlHsl2Rgb))
    .then(response=>response.json())
    .then(response=>{
        triadColor.setAttribute("value",JSON.stringify(response.hex.value).replaceAll("\"","") )
    })  
    .then(response=>urlHsl2Rgb="https://www.thecolorapi.com/id?hsl=")
    

} 
// - Sch.de cleurs triadique :

// H + 120°


// {"hex":
// {"value":"#04C304","clean":"04C304"},
// "rgb":{"fraction":{"r":0.01568627450980392,"g":0.7647058823529411,"b":0.01568627450980392},
// "r":4,"g":195,"b":4,"value":"rgb(4, 195, 4)"},
//"hsl":{"fraction":{"h":0.33333333333333337,"s":0.9597989949748745,"l":0.3901960784313725},"h":120,"s":96,"l":39,"value":"hsl(120, 96%, 39%)"},"hsv":{"fraction":{"h":0.33333333333333337,"s":0.9794871794871796,"v":0.7647058823529411},"value":"hsv(120, 98%, 76%)","h":120,"s":98,"v":76},"name":{"value":"Green","closest_named_hex":"#00FF00","exact_match_name":false,"distance":5442},"cmyk":{"fraction":{"c":0.9794871794871796,"m":0,"y":0.9794871794871796,"k":0.23529411764705888},"value":"cmyk(98, 0, 98, 24)","c":98,"m":0,"y":98,"k":24},"XYZ":{"fraction":{"X":0.28275921568627443,"Y":0.5513850980392155,"Z":0.10636549019607841},"value":"XYZ(28, 55, 11)","X":28,"Y":55,"Z":11},"image":{"bare":"https://www.thecolorapi.com/id?format=svg&named=false&hex=04C304","named":"https://www.thecolorapi.com/id?format=svg&hex=04C304"},"contrast":{"value":"#000000"},"_links":{"self":{"href":"/id?hex=04C304"}},"_embedded":{}}
