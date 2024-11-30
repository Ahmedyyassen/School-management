export interface Login{
  email: string;
  password: string;
  returnSecureToken	: boolean;
}
export interface student {
  StudentID: number
  ParentID: number
  address: string
  Phone: string
  Nationality: string
  FirstName: string
  LastName: string
  DateOfBirth: string;
  more: string;
  Gender: string
  Class: string
  expensesStutus: string
}

// export interface student{
//   StudentID	:string;
//   FirstName : string;
//   LastName : string;
//   DateOfBirth : string;
//   Gender : string;
//   Class : string;
//   expenses : string;
// }

export interface Salaries {
  EmployeeID: string;
  Month: number;
  Year: number;
  Amount: number;
  PaymentDate:string;
  PaymentStatus:string
}

export interface Employees{
  EmployeeID  :string
  FirstName :string
  LastName :string
  Role :string
  HireDate :string
  Salary :number;

}
export interface Teacher{
  info :Employees;
  subject :string;
  classes : string;
}

export interface Expenses {
ExpenseID :string;
 ExpenseType :string;
 Amount :number;
 Date :string;
 status: string;
}

