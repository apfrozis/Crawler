    const Equipa = require('./equipa');

    class League {

        constructor(liga, link) {
            this.liga = liga;
            this.link = link;
            this.equipas = [];
        }

        addEquipa(equipa){
            this.equipas.push(equipa)
        }

        ligaEstatisticas(over15, over25, over35) {
            this.over15 = over15;
            this.over25 = over25;
            this.over35 = over35;
        }
    }

    // exports = Cat; // It will not work with `new Cat();`
    // exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
    module.exports = League;
