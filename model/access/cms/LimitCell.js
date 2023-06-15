class Batas {
    constructor(batasJSON) {
        const { badBawah, warningBawah, good, warningAtas, badAtas } = batasJSON;
        this.badBawah = badBawah;
        this.warningBawah = warningBawah;
        this.good = good;
        this.warningAtas = warningAtas;
        this.badAtas = badAtas;
    }

    getStatus(nilai) {
        if (nilai < this.badBawah || nilai > this.badAtas) {
            return "red";
        } else if (nilai < this.warningBawah || nilai > this.warningAtas) {
            return "orange";
        } else {
            return "green";
        }
    }
}



export default Batas;