const Employee = require("./Employee")
//TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee{
    constructor(name, id, email, officeNum) {
        super(name, id, email);
        this.officeNum = officeNum;
    }
    getgitHub(){
        return this.officeNum
    }
    
    getRole(){
        return 'Manager'
    }

}
module.exports = Manager