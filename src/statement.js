import React from "react";
import { createStatementData } from "./createStatementData";

const invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audience: 55 },
    { playID: "as-like", audience: 35 },
    { playID: "othello", audience: 40 },
  ],
};
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    }) seats\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits. \n`;

  return result;
}
export function statement() {
  return renderPlainText(createStatementData(invoice));
}
export function htmlStatement() {
  return renderHtml(createStatementData(invoice));
  function renderHtml(data) {
    return (
      <>
        <h1>Statement for ${data.customer}</h1>
        <table>
          <thead>
            <tr>
              <th>play</th>
              <th>seats</th>
              <th>cost</th>
            </tr>
          </thead>
          <tbody>
            {data.performances.map((perf) => (
              <tr key={perf.play.name}>
                <td>{perf.play.name}</td>
                <td>{usd(perf.amount)}</td>
                <td>({perf.audience})</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Amount owed is ${usd(data.totalAmount)}</p>
        <p>You earned ${data.totalVolumeCredits} credits.</p>
      </>
    );
  }
}
