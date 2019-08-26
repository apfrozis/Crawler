    const Equipa = require('./equipa');

    class Game {

        constructor(equipaCasa, equipaFora, liga, href) {
            this.equipaCasa = new Equipa(equipaCasa);
            this.equipaFora = new Equipa(equipaFora);
            this.liga = liga;
            this.href = href;
        }
    }

    // exports = Cat; // It will not work with `new Cat();`
    // exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
    module.exports = Game;
