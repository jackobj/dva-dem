import http from "../http"
export default {
    userlogin(params){
        return http.get('/api/user/login',params)
    }
}