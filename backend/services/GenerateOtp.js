import otpGenerator from 'otp-generator'


export const generateOtp = ()=>{
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    return OTP;

}