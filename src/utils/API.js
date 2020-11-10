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


// Commissions routes

export function fetchLoanCommissions (loanId) {
  return axios
    .get(`api/commissions/loan/${loanId}`)
    .then(res => {
      return res.data;
    })
}

export function fetchCommissionProfiles (loanId) {
  return axios
    .get(`api/commissions/profiles/${loanId}`)
    .then(res => {
      return res.data;
    })
}

export function postLoanCommission (values) {
  console.log('API', values)
  return axios
    .post(`api/commissions/${values._loan}`, values)
    .then(res => {
      return res.data;
    })
}

export function removeLoanCommission (commissionId, loanId) {
  return axios
    .delete(`api/commissions/${commissionId}/loan/${loanId}`)
    .then(res => {
      return res.data;
    })
}

// Collaterals routes

export function fetchLoanCollaterals (loanId) {
  return axios
    .get(`api/collaterals/loan/${loanId}`)
    .then(res => {
      return res.data;
    })
}

export function fetchCollateralProfiles (loanId) {
  return axios
    .get(`api/collaterals/profiles/${loanId}`)
    .then(res => {
      return res.data;
    })
}

export function postLoanCollateral (values) {
  return axios
    .post(`api/collaterals/${values._loan}`, values)
    .then(res => {
      return res.data;
    })
}

export function updateLoanCollateral (values) {
  return axios
    .post(`api/collaterals/${values._loan}`, values)
    .then(res => {
      return res.data;
    })
}

export function removeLoanCollateral (collateralId, loanId) {
  return axios
    .delete(`api/collaterals/${collateralId}/loan/${loanId}`)
    .then(res => {
      return res.data;
    })
}
