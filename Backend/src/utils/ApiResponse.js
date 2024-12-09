class ApiResponse {
    constructor(statusCode, data = null , message = "") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 4000 ;
    }
  }
  
  export { ApiResponse };