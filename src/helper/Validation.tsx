type ValidationType =
  | 'email'
  | 'password'
  | 'mobile'
  | 'name'
  | 'address'
  | 'pincode'
  | 'otp'
  | 'gst'
  | 'firm'
  | 'number'
  | 'quantity'
  | 'string';

const Validate = (type: ValidationType, data: any, isMandatory = true): string => {
  if(!isMandatory && data === ''){
    return '';
  }
  if (isMandatory && (data === '' || data === undefined || data === null)) {
    return 'Mandatory field';
  }
  switch (type) {
    case 'email':
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return !emailRegex.test(data) ? 'Please enter a valid email address' : '';

    case 'password':
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return !passwordRegex.test(data)
        ? 'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
        : '';

    case 'mobile':
      const phoneRegex = /^[0-9]{10}$/;
      return !phoneRegex.test(data) ? 'Invalid phone number !' : '';

    case 'name':
      const nameRegex = /^[A-Za-z0-9\&\-\@\%\(\)\,\*\?\£\€\?\%\,\s]+?$/;
      return !nameRegex.test(data) ? 'Please enter a valid name' : '';

    case 'address':
      const addressRegex = /^[a-zA-Z0-9\s,'-/]*$/;
      return !addressRegex.test(data) ? 'Please enter a valid address' : '';

    case 'pincode':
      const pincodeRegex = /^[0-9]{6}$/;
      return !pincodeRegex.test(data) ? 'Please enter a valid pincode' : '';

    case 'otp':
      const otpRegex = /^[0-9]{6}$/;
      return !otpRegex.test(data) ? 'Please enter a valid OTP' : '';
    case 'quantity':
      const quantityRegex = /^[1-9]\d*$/;
      return !quantityRegex.test(data) ? 'Please enter a valid quantity' : '';
    case 'number':
      const numberRegex = /^[0-9]*$/;
      return !numberRegex.test(data) ? 'Please enter a valid number' : '';
    case 'string':
      const isString = typeof data === 'string';
      return !isString ? 'Invalid !' : '';
    case 'gst':
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[A-Z]{1}[0-9A-Z]{1}$/;
      return !gstRegex.test(data) ? 'Please enter a valid GST number' : '';
    case 'firm':
      const firmRegex = /^[A-Za-z0-9\&\-\@\%\(\)\,\*\?\£\€\?\%\,\s]+?$/;
      return !firmRegex.test(data) ? 'Please enter a valid firm name' : '';

    default:
      return 'Please enter a valid value';
  }
};

export default Validate;