/**
 * Class description
 */
declare class OverloadedClass {
    /**
     * Description of constructor with parameter
     * @param constructorParam Description of the constructor parameter
     */
    constructor(constructorParam: string);

    /**
     * Description of constructor without parameter
     */
    constructor();

    /**
     * @param param
     */
    static overloadedFunction(param: boolean): void;

    static overloadedFunction(): void;

}

