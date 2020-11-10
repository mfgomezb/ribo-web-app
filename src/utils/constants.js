exports.paymentFrequency = {
  monthly: 'Mensual',
  quarterly: 'Trimestral',
  semiAnnually: 'Semianual',
  annually: 'Anual',
  months: 'Mensual',
  biWeekly: 'Bi-semanal',
  biMonthly: 'Quincenal',
  payDay: 'Quincenal',
  weekly: 'Semanal',
}

exports.collateralTypesFormConstants = [
  { value: 'automobile', label: 'Automovil' },
  { value: 'motorcycle', label: 'Motocicleta' },
  { value: 'receivables', label: 'Cuentas por cobrar' },
  { value: 'investments', label: 'Inversiones' },
  { value: 'machinaryAndEquipment', label: 'Maquinaria' },
  { value: 'valuablesAndColletibles', label: 'Prendas' },
  { value: 'electronicItems', label: 'Electronicos' },
  { value: 'employmentBenefit', label: 'Beneficios/Sueldo' }
];

exports.currentStatusFormConstants = [
  { value: 'depositedIntoBranch', label: 'Depositado' },
  { value: 'collateralWithBorrower', label: 'Con prestatario' },
  { value: 'returnedToBorrower', label: 'Regresado al prestatario' },
  { value: 'reposessionInitiated', label: 'Iniciada la recuperación del activo' },
  { value: 'repossed', label: 'Recuperado' },
  { value: 'underAuction', label: 'Subasta' },
  { value: 'sold', label: 'Vendido' },
  { value: 'transferedOwnership', label: 'Transferencia de propiedad' },
  { value: 'lost', label: 'Perdido' },
  { value: 'stolen', label: 'Robado' },
  { value: 'insuranceClaim', label: 'Enviado al seguro' }
];
