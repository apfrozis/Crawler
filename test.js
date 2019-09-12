

let async = require('async')
let jogos = [];
let estatiscasLiga ;

//hack net


main(()=>{});
console.log('Finsih');

function initArry ( callback){

  var i = 0;
   async.doUntil((next)=>{
       i++;
       jogos.push({
           home : "benfica",
            away : "porto"
       })
    console.log('i' , i)
    next()
   },  (next) =>{
    
        next(null, i >= 20)
     
   },
   (err) =>{
    // console.log('final do doTuntil', jogos)
    callback(null,jogos );
   }
   );

}


function lerAsLigas(urlliga, equipaA, equipaB, next )
{
    console.log('ler as ligas...')
    //buscar a informacao sacar estatiscas
   
    setTimeout(function(){  next(null, "estatisticaDoJogo"); }, 3000);

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function forPelosJogos(jogos, next){

       
        var a = 1;
    // // assuming openFiles is an array of file names
        async.each(jogos, function(jogo, callback) {

            // console.log('jogo ', jogo)
            var b = 100;
            let random = getRandomInt(1000, 10000)

            a++;
            setTimeout(function(){
               
                console.log('vai sair do timeout ', random)
                console.log('b ', b * a)

                callback(null, "estatisticaDoJogo"); }, random );
            

           

        }, function(err) {
           
            next();
        });
    
    
}





function main(){


    async.waterfall([
        function(next) {
            initArry( ()=>{
                console.log('water 1');
            next(null);
            });
            
        },
        function(next) {
           
            forPelosJogos(jogos, (err, data) =>{
                console.log('water 2');
                next(null);
            });
           
        }
    ], function (err, result) {
        // result now equals 'done'
        console.log('final dos cliclos')
    });

    console.log('Main do main')

}