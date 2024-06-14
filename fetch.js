// fetch('http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=10&offset=0')
// .then(response => {
//     console.log(response);
//     return response.json();
// })
// .then(aaa => {
//     console.log(aaa);
// })
// .catch(error => {
//     console.log(error);
// });

axios('http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=10&offset=0')
.then(response => {
    console.log(response);
})
.catch(error => {
    console.log(error);
});