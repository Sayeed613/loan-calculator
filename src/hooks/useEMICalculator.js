import {useState} from 'react';
// EMI Calculation Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
// P = Principal loan amount
// r = Monthly interest rate (Annual rate / 12 / 100)
// n = Loan duration in months
export const useEMICalculator = () => {
    const [emi, setEMI] = useState(null);
    const[amortizationSchedule, setAmortizationSchedule] = useState([]);

    const calculateEMI = (principal, annualInterestRate, loanDuration) =>{
        const monthlyRate = annualInterestRate / 12 / 100;
        const emiValue = (
            (principal * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) /
            (Math.pow(1 + monthlyRate, loanDuration) - 1)
        ).toFixed(2);
        setEMI(emiValue);

        const schedule = []
        let remainingPrincipal = principal;
        for(let month = 1; month <= loanDuration; month++){
            const interestPayment = (remainingPrincipal * monthlyRate).toFixed(2);
            const principalPayment = (emiValue - interestPayment).toFixed(2);
            remainingPrincipal = (remainingPrincipal - principalPayment).toFixed(2);

            schedule.push({
                month,
                principal:principalPayment,
                interest:interestPayment,
                balance:remainingPrincipal,
            })
        }
        setAmortizationSchedule(schedule);
    }
    return {emi, calculateEMI, amortizationSchedule};
}