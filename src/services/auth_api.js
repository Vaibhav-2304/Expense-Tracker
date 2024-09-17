import Api from "./api_interceptor";

class Auth extends Api{

    async login(email, password){
        try{
            const response = await this.Api.post('/api/login', {
                email : email,
                password : password
            });

            if(response.status==200){return true;}
            else{
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }


    async register(name, email, password){
        try{
            const response = await this.Api.post('/api/register', {
                name : name,
                email : email,
                password : password
            });

            if(response.status==200){return true;}
            else{
                console.error(response.data);
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async logout(){
        try {
            this.Api.post('api/logout'); // this sets the max-age of jwt-key to 0.
            return true;
        } catch (error) {
            console.error(error.message);
        }
    } 

}

export default Auth;