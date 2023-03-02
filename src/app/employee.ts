export interface Employee {
    // id:string
    // employeeCode?: string;
    // employeeName?: string;
    // employeeHiringDate?: Date;
    // employeeNationalID?: number;
    // employeeEmail?: string;
    // employeeDepartment?: any;
    // employeeManager?: string;
    // employeeMobile?: number;
    
        id: string,
        code: string,
        name: string,
        department: string,
        hiringDate: Date,
        nationalID: number,
        email: string,
        manager: string,
        mobile: number,
        isEditable?: boolean
    
}

