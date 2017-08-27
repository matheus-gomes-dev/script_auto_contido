
console.log("dnjwenfoiew");
console.log(aux)


var htmlTemplate =  '<button>TESTE</button>'
var APIurl = 'https://mid-homolog.totvs.com:4007/api/v2';

//===CATALOG V2 API===
function catalogV2API(method, endpoint, data, cb){
    $.ajax({
        "url": APIurl + endpoint,
        "type": method,
        "contentType": "application/json",
        "dataType": "json",
        "data": JSON.stringify(data),
        "Accept": "application/json",
        "success": function (response) {
            cb(response);
        },
        "error": function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            cb("Erro na operação!")
        }
    });
}
//======

catalogV2API('GET', '/campos', '', function(response){
	console.log(response);
});

document.body.innerHTML +=htmlTemplate;

