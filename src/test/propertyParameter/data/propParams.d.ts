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

