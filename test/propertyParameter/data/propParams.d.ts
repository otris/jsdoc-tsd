/**
 * My test interface
 */
declare interface myTestInterface {
    /**
     * A simple function
     * @param propertyParameter My parameter with properties
     * @param propertyParameter.myProperty1 Description of myProperty1
     * @param propertyParameter.myProperty2 Description of myProperty2
     */
    mySimpleFunction(propertyParameter: mySimpleFunction_propertyParameter): void;
    /**
     * Assign the project to a list of employees
     * @param employees - The employees who are responsible for the project
     * @param employees[].name - The name of an employee
     * @param employees[].department - The employee's department
     */
    myEmployeeFunction(employees: (myEmployeeFunction_employees)[]): void;
}

declare interface mySimpleFunction_propertyParameter {
    /**
     * Description of myProperty1
     */
    myProperty1: string;
    /**
     * Description of myProperty2
     */
    myProperty2: number;
}

declare interface myEmployeeFunction_employees {
    /**
     * The name of an employee
     */
    name: string;
    /**
     * The employee's department
     */
    department: string;
}

