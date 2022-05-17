const plays = {
  hamlet: { name: "hamlet", type: "tragedy" },
  "as-like": { name: "As You linke it", type: "commedy" },
  othello: { name: "Othello", type: "tragedy" },
};
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;

    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;

      case "commedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`unkown type: ${this.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;

    result += Math.max(this.performance.audience - 30, 0);

    if ("commedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);

    return result;
  }
}
function enrichPerformance(aPerformance) {
  const calculator = new PerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}
function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}
export function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalVolumeCredits = totalVolumeCredits(result);
  result.totalAmount = totalAmount(result);
  return result;
}