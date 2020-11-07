const fs = require('fs');
  
fs.readFile('in.txt', (err, data) => { 

    if (err){
        throw err;
    }  

    getDataFile(data.toString());
}) 

function getDataFile(data) {

    const datos = data.split('\r\n');

    var band = 0;
    var numTestV;
    var vecNum = [];

    datos.forEach(element => {

        const dataTest = element.split(' ');
        band++;

        if(band == 1){

            numTestV = dataTest;
        }else{

            vecNum.push(dataTest);
        }
        
    });

    operation(numTestV, vecNum);
}

function operation(numTestV, vecNum){

    console.log('numTest: ', parseInt(numTestV[0]));
    console.log('vecNum: ', vecNum);

    var numTest = parseInt(numTestV[0]);

    for(var i = 0; i < numTest; i++){

        var coins = [];

        for(var j = 2; j < parseInt(vecNum[i][1])+2; j++){
            
            coins.push(vecNum[i][j]);
        }
        coins = coins.map((coin) => parseInt(coin));
        calculateExchange(coins, parseInt(vecNum[i][0]));
    }

}

function calculateExchange(coins, pay){ // recibiendo vector con las denominaciones y el pago

    console.log(coins, pay);
    var contProm = 0;
    var vecIntercambios = []; //OJO cambiar a inglés

    for(var i = pay; i >= 1; i--){

        var resto = i; // pago de vueltas
        contProm = 0;

        for(var j = coins.length-1; j >= 0; j--){

            if(i == coins[j]){ // si está en la denominacion no hace mas nada

                contProm++;
                break;
            }else{

                while(resto >= coins[j]){
                
                    resto-=coins[j];
                    var restando;//OJO
                    contProm++;

                    if(resto < coins[j]){

                        if(resto > 0){

                            if(coins.includes(resto)){
                                resto = 0;
                                contProm++;
                                break;

                            }else{
                                
                                restando = (coins[j] - resto);

                                if(restando < 0){

                                    restando = restando*-1;
                                }

                                var finalResto; //arreglar nombre variable

                                finalResto = resto - coins[j-1];

                                if(restando < resto && restando < finalResto){

                                    resto = restando;
                                    contProm++;
                                }
                                
                            }
                        }
                    }
                }
            
            }
            
        }
        // console.log('Para pagar ', i,' se usaron ', contProm);
        vecIntercambios.push(contProm);
    }

    console.log('vecIntercambios: ', vecIntercambios);
}