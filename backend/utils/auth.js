import bcryptjs from 'bcryptjs';


const hashPassword = (password)=>{
    const saltRounds = 10;
    const hashedPassword = bcryptjs.hashSync(password, saltRounds);
    return hashedPassword;

}
const comparePassword  = (password, hashedPassword)=>{
    return bcryptjs.compareSync(password, hashedPassword);
}
export {hashPassword, comparePassword}; 