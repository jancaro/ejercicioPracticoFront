export interface ReportModel {
  movementDate: Date,
  clientName: string,
  accountNumber: string,
  movementType: string,
  initialBalance: number,
  accountStatus: boolean,
  movementAmount: number,
  currentBalance: number
}
