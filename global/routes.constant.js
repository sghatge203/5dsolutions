/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:36:21
 * @modify date 2020-10-15 22:36:21
 * @desc [declaration of routes constants]
 */
var apiEndPoint = "/api";
const apiRoutes = {
    login: `${apiEndPoint}/auth/login`,
    register: `${apiEndPoint}/auth/register`,
    addMoment: `${apiEndPoint}/user/add-moment`,
    updateMoment: `${apiEndPoint}/user/update-moment`,
    getListMoment: `${apiEndPoint}/user/list-moment`,
    deleteMoment: `${apiEndPoint}/user/delete-moment`
}
module.exports = apiRoutes