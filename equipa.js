class Equipa {
    constructor(nomeEquipa) {
        this.nomeEquipa = nomeEquipa;
    }

    setJogos(semJogos) {
        this.semJogos = semJogos;

    }

    informacaoTotal(equipaInfo) {
        this.totalMatchplayed = equipaInfo[0];
        this.totalAverageMatchGoal = equipaInfo[1];
        this.totalMatchGoalOver05 = equipaInfo[2];
        this.totalMatchGoalOver15 = equipaInfo[3];
        this.totalMatchGoalOver25 = equipaInfo[4];
        this.totalMatchGoalOver35 = equipaInfo[5];
        this.totalMatchGoalOver45 = equipaInfo[6];
        this.totalMatchGoalOver55 = equipaInfo[7];
        this.totalMatchGoalOver65 = equipaInfo[8];
        this.totalMatchBothTeamScored = equipaInfo[9];
        this.totalMatchTeamNotScored = equipaInfo[10];
        this.totalMatchTeamNotConceded = equipaInfo[11];
        this.totalMatchWonToNil = equipaInfo[12];
        this.totalMatchLossToNil = equipaInfo[13];
    }
    informacaoCasa(equipaInfo) {
        this.homeMatchplayed = equipaInfo[0];
        this.homeAverageMatchGoal = equipaInfo[1];
        this.homeMatchGoalOver05 = equipaInfo[2];
        this.homeMatchGoalOver15 = equipaInfo[3];
        this.homeMatchGoalOver25 = equipaInfo[4];
        this.homeMatchGoalOver35 = equipaInfo[5];
        this.homeMatchGoalOver45 = equipaInfo[6];
        this.homeMatchGoalOver55 = equipaInfo[7];
        this.homeMatchGoalOver65 = equipaInfo[8];
        this.homeMatchBothTeamScored = equipaInfo[9];
        this.homeMatchTeamNotScored = equipaInfo[10];
        this.homeMatchTeamNotConceded = equipaInfo[11];
        this.homeMatchWonToNil = equipaInfo[12];
        this.homeMatchLossToNil = equipaInfo[13];
    }

    informacaoFora(equipaInfo) {
        this.awayMatchplayed = equipaInfo[0];
        this.awayAverageMatchGoal = equipaInfo[1];
        this.awayMatchGoalOver05 = equipaInfo[2];
        this.awayMatchGoalOver15 = equipaInfo[3];
        this.awayMatchGoalOver25 = equipaInfo[4];
        this.awayMatchGoalOver35 = equipaInfo[5];
        this.awayMatchGoalOver45 = equipaInfo[6];
        this.awayMatchGoalOver55 = equipaInfo[7];
        this.awayMatchGoalOver65 = equipaInfo[8];
        this.awayMatchBothTeamScored = equipaInfo[9];
        this.awayMatchTeamNotScored = equipaInfo[10];
        this.awayMatchTeamNotConceded = equipaInfo[11];
        this.awayMatchWonToNil = equipaInfo[12];
        this.awayMatchLossToNil = equipaInfo[13];
    }
}

// exports = Cat; // It will not work with `new Cat();`
// exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
module.exports = Equipa;
