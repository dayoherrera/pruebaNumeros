const fs = require('fs');
  
fs.readFile('input.txt', (err, data) => { 

    if (err){
        throw err;
    }  
    
    console.log('in: \n', data.toString());
    getDataFile(data.toString());
}) 

function getDataFile(data) {

    const lines = data.split('\n');
    
    var band = 0;
    var numberOfTest;
    var matrix = [];

    lines.forEach(line => { 

        const dataTest = line.split(' ');
        band++;

        if(band == 1){
            
            numberOfTest = dataTest;
        }else{

            matrix.push(dataTest);
        }
        
    });
    
    getCoins(numberOfTest, matrix);
}

function getCoins(numberOfTest, matrix){

    var numTest = parseInt(numberOfTest[0]);

    console.log('\noutput: \n');
    for(var i = 0; i < numTest; i++){

        var coins = [];
        for(var j = 2; j < parseInt(matrix[i][1])+2; j++){
            
            coins.push(matrix[i][j]);
        }
        coins = coins.map((coin) => parseInt(coin));
        calculateExchange(coins, parseInt(matrix[i][0]));
    }

}

function calculateExchange(coins, pay){ // recibiendo vector con las denominaciones y el pago
    var contProm = 0;
    var contProm2 = 0;
    var minimuns = []; 

    for(var i = pay; i >= 1; i--){

        var rest = i; 
        var rest2 = i;
        contProm = 0;
        contProm2 = 0;

        for(var j = coins.length-1; j >= 0; j--){

            if(i == coins[j]){ // si está en la denominacion no hace mas nada

                contProm++;
                break;

            }else{

                while(rest >= coins[j]){

                    rest-=coins[j];
                    var resting;
                    contProm++;

                    if(rest < coins[j]){

                        if(rest > 0){

                            if(coins.includes(rest)){
                                rest = 0;
                                contProm++;
                                break;

                            }else{
                                
                                resting = (coins[j] - rest);

                                if(resting < 0){

                                    resting = resting*-1;
                                }

                                var finalRest = rest - coins[j-1];

                                if(resting < rest && resting < finalRest){

                                    rest = resting;
                                    contProm++;
                                }
                                
                            }
                        }
                    }
                }

                if(rest2 < coins[j]){

                    var division = Math.round( coins[j] / rest2);
        
                    rest2-=(coins[j]*division);
                    contProm2+=division;
        
                    if(rest2 < 0){
        
                        rest2*=(-1);
                    }
                }
            }  
            
        }
        if(contProm > contProm2 && contProm2 != 0){

            contProm = contProm2;
        }
        minimuns.push(contProm);
    }
    
    getOutput(minimuns, pay);
    
}

function getOutput(finish, pay){
    
    var max = -1;
    var acum = 0;

    finish.forEach((fini) => acum += fini);

    var average = acum / pay;

    for(var i = 0; i < finish.length; i++){
        
        if(finish[i] > max){

            max = finish[i];
        }
    }

    console.log(average.toFixed(2), max);

}