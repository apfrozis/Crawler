    const Equipa = require('./equipa');

    var  Game = function(equipaCasa,equipaFora, liga, href ){
        this.equipaCasa = new Equipa(equipaCasa);
        this.equipaFora = new Equipa(equipaFora);
        this.liga = liga;
        this.href = href;
        this.percAcimaMedia = -1;
    }

        

    Game.prototype.ligaEstatisticas = function(over15, over25, over35) {
            this.over15 = over15;
            this.over25 = over25;
            this.over35 = over35;
        
        }
    

    // exports = Cat; // It will not work with `new Cat();`
    // exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
    module.exports = Game;
