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

exports.condition = {
  new: 'Nuevo',
  excellent: 'Excelente',
  good: 'Bien',
  fair: 'Normal',
  damaged: 'Daños importantes'
}

exports.currentStatus = {
  depositedIntoBranch: 'Depositado',
  collateralWithBorrower: 'Con prestatario',
  returnedToBorrower: 'Regresado al prestatario',
  reposessionInitiated: 'Iniciada la recuperación del activo',
  repossed: 'Recuperado',
  underAuction: 'Subasta',
  sold: 'Vendido',
  transferedOwnership: 'Transferencia de propiedad',
  lost: 'Perdido',
  stolen: 'Robado',
  insuranceClaim: 'Enviado al seguro'
}

exports.collateralTypes = {
  automobile: 'Automovil',
  motorcycle: 'Motocicleta',
  receivables: 'Cuentas por cobrar',
  investments: 'Inversiones',
  machinaryAndEquipment: 'Maquinaria',
  valuablesAndColletibles: 'Prendas',
  electronicItems: 'Electronicos',
  employmentBenefit: 'Beneficios/Sueldo',
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

exports.conditionFormConstants = [
  { value: 'new', label: 'Nuevo' },
  { value: 'excellent', label: 'Excelente' },
  { value: 'good', label: 'Bien' },
  { value: 'fair', label: 'Normal' },
  { value: 'damaged', label: 'Daños importantes' }
];


