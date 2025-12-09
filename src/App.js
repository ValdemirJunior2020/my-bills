import React, { useState } from "react";

function App() {
  // DEFAULT NUMBERS BASED ON YOUR SITUATION
  const [monthlyIncome, setMonthlyIncome] = useState(3988); // from $1,840.63 every 2 weeks
  const [rvPayment, setRvPayment] = useState(1038);
  const [rvParking, setRvParking] = useState(1150);
  const [carPayment, setCarPayment] = useState(236);
  const [carInsurance, setCarInsurance] = useState(140);
  const [childSupport, setChildSupport] = useState(800);
  const [phoneBill, setPhoneBill] = useState(40);
  const [food, setFood] = useState(400);

  // INVESTMENT SETTINGS
  const [k401Percent, setK401Percent] = useState(4); // % of income
  const [rothMonthly, setRothMonthly] = useState(50); // your Roth VOO
  const [sonsVoo, setSonsVoo] = useState(15); // son's VOO

  // CALCULATIONS
  const totalBills =
    rvPayment +
    rvParking +
    carPayment +
    carInsurance +
    childSupport +
    phoneBill +
    food;

  const afterBills = monthlyIncome - totalBills;

  const k401Contribution = (monthlyIncome * k401Percent) / 100;

  // employer matches up to 4% of salary
  const employerMatchPercent = Math.min(k401Percent, 4);
  const employerMatch = (monthlyIncome * employerMatchPercent) / 100;

  const after401k = afterBills - k401Contribution;

  const totalVooInvestments = rothMonthly + sonsVoo;
  const afterInvesting = after401k - totalVooInvestments;

  const isNegativeAfterBills = afterBills < 0;
  const isNegativeAfterInvesting = afterInvesting < 0;

  return (
    <div className="container py-4">
      <h1 className="mb-3 text-center">My Budget & Investment Planner</h1>
      <p className="text-center text-muted">
        Income, bills, 401(k) match, my Roth VOO, and my son&apos;s VOO.
      </p>

      <div className="row mt-4">
        {/* LEFT COLUMN: INCOME & BILLS */}
        <div className="col-lg-6 mb-4">
          {/* Income card */}
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-primary text-white">
              Monthly Income
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Monthly Income ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={monthlyIncome}
                  onChange={(e) =>
                    setMonthlyIncome(Number(e.target.value || 0))
                  }
                  min="0"
                />
                <div className="form-text">
                  Based on $1,840.63 every 2 weeks ≈ $3,988/month.
                </div>
              </div>
            </div>
          </div>

          {/* Bills card */}
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              Monthly Bills
            </div>
            <div className="card-body">
              <BillInput
                label="RV Payment"
                value={rvPayment}
                onChange={setRvPayment}
              />
              <BillInput
                label="RV Parking Spot"
                value={rvParking}
                onChange={setRvParking}
              />
              <BillInput
                label="Car Payment"
                value={carPayment}
                onChange={setCarPayment}
              />
              <BillInput
                label="Car Insurance"
                value={carInsurance}
                onChange={setCarInsurance}
              />
              <BillInput
                label="Child Support"
                value={childSupport}
                onChange={setChildSupport}
              />
              <BillInput
                label="Phone Bill"
                value={phoneBill}
                onChange={setPhoneBill}
              />
              <BillInput label="Food" value={food} onChange={setFood} />

              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total Bills:</strong>
                <strong>${totalBills.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <span>Left after bills:</span>
                <span
                  className={
                    "fw-bold " +
                    (isNegativeAfterBills ? "text-danger" : "text-success")
                  }
                >
                  ${afterBills.toFixed(2)}
                </span>
              </div>
              {isNegativeAfterBills && (
                <p className="text-danger mt-2">
                  ⚠️ Your bills are higher than your income.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INVESTMENTS & SUMMARY */}
        <div className="col-lg-6 mb-4">
          {/* Investment settings */}
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-success text-white">
              Investment Settings
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">
                  401(k) Contribution (% of income)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={k401Percent}
                  onChange={(e) =>
                    setK401Percent(Number(e.target.value || 0))
                  }
                  min="0"
                  max="100"
                />
                <div className="form-text">
                  Employer matches up to <strong>4%</strong>.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  My Roth IRA (VOO) Monthly Investment ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={rothMonthly}
                  onChange={(e) =>
                    setRothMonthly(Number(e.target.value || 0))
                  }
                  min="0"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  My Son&apos;s VOO Monthly Investment ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={sonsVoo}
                  onChange={(e) => setSonsVoo(Number(e.target.value || 0))}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              Summary & Cash Flow
            </div>
            <div className="card-body">
              <SummaryRow
                label="Income after bills"
                value={afterBills}
                highlight
                danger={afterBills < 0}
              />
              <SummaryRow
                label={`401(k) contribution (${k401Percent}% of income)`}
                value={-k401Contribution}
              />
              <SummaryRow
                label="Employer match (up to 4%)"
                value={employerMatch}
                positive
              />
              <SummaryRow
                label="Left after bills + 401(k)"
                value={after401k}
                highlight
                danger={after401k < 0}
              />
              <SummaryRow
                label="My Roth IRA (VOO)"
                value={-rothMonthly}
              />
              <SummaryRow
                label="My Son's VOO"
                value={-sonsVoo}
              />
              <hr />
              <SummaryRow
                label="Final leftover after all investing"
                value={afterInvesting}
                highlight
                danger={isNegativeAfterInvesting}
                big
              />

              {isNegativeAfterInvesting && (
                <p className="text-danger mt-2">
                  ⚠️ You&apos;re investing more than you can afford right now.
                </p>
              )}
              {!isNegativeAfterInvesting && afterInvesting < 200 && (
                <p className="text-warning mt-2">
                  ⚠️ Tight after investing — still okay, but be careful with
                  gas, food, and emergencies.
                </p>
              )}
              {!isNegativeAfterInvesting && afterInvesting >= 200 && (
                <p className="text-success mt-2">
                  ✅ Balanced! You&apos;re investing and still keeping a safety
                  buffer.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 text-muted small">
        Adjust any input to explore different scenarios with your 401(k), Roth
        IRA, and your son&apos;s VOO account.
      </div>
    </div>
  );
}

function BillInput({ label, value, onChange }) {
  return (
    <div className="mb-2">
      <label className="form-label">{label} ($)</label>
      <input
        type="number"
        className="form-control"
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
        min="0"
      />
    </div>
  );
}

function SummaryRow({ label, value, highlight, danger, positive, big }) {
  const formatted =
    value >= 0
      ? `$${value.toFixed(2)}`
      : `-$${Math.abs(value).toFixed(2)}`;

  let valueClasses = "fw-bold";
  if (highlight) valueClasses += " text-primary";
  if (danger) valueClasses += " text-danger";
  if (positive) valueClasses += " text-success";
  if (big) valueClasses += " fs-5";

  return (
    <div className="d-flex justify-content-between align-items-center mb-1">
      <span>{label}</span>
      <span className={valueClasses}>{formatted}</span>
    </div>
  );
}

export default App;
