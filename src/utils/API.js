import axios from './axios';


// Loan/schedule/installment related api calls

export function fetchLoanDetails (loanId) {
  return axios.get(`api/loan/details-view/${loanId}`)
    .then(res => {
      return res.data;
    })
}

export function fetchLoanSchedule (loanId) {
  return axios.get(`api/loan/schedule-view/${loanId}`)
    .then(res => {
      return res.data;
    })
}

export function fetchLoanPayments (loanId) {
  return axios
    .get(`api/loan/payments-view/${loanId}`)
    .then(res => { return res.data });
}

export function fetchLoanInvestorsPosition (loanId) {
  return axios
    .get(`api/loan/investors-view/${loanId}`)
    .then(res => { return res.data });
}

export function fetchInstallmentDetails (installmentId) {
  return axios
    .get(`api/loan/installment-view/${installmentId}`)
    .then(res => {
      return res.data;
    })
}



export async function fetchLoanTransactions(loanId) {
  return axios
    .get(`api/transaction/loan/${loanId}`)
    .then(res => {
      return res.data;
    })
}


export function deleteInstallmentPayment (payment) {
  return axios
    .delete(`api/payment/installment/${payment._id}`)
    .then((res) => res.data);
}

export function postInstallmentPayment (values) {
  return axios
    .post(`api/payment/installment/${values._loanSchedule}`, values)
    .then((res) => res.data);
}
