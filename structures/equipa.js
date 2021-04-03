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
        this.totalMatchBothTeamScored = equipaInfo[8];
        this.totalMatchTeamNotScored = equipaInfo[9];
        this.totalMatchTeamNotConceded = equipaInfo[10];
        this.totalMatchWonToNil = equipaInfo[11];
        this.totalMatchLossToNil = equipaInfo[12];
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
        this.homeMatchBothTeamScored = equipaInfo[8];
        this.homeMatchTeamNotScored = equipaInfo[9];
        this.homeMatchTeamNotConceded = equipaInfo[10];
        this.homeMatchWonToNil = equipaInfo[11];
        this.homeMatchLossToNil = equipaInfo[12];
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
        this.awayMatchBothTeamScored = equipaInfo[8];
        this.awayMatchTeamNotScored = equipaInfo[9];
        this.awayMatchTeamNotConceded = equipaInfo[10];
        this.awayMatchWonToNil = equipaInfo[11];
        this.awayMatchLossToNil = equipaInfo[12];
    }
}
module.exports = Equipa;
