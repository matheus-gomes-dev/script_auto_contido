
console.log("Pagina carregado com sucesso");
console.log(aux)


var htmlTemplate =  '<button>TESTE</button>'
var APIurl = 'https://mid-homolog.totvs.com:4007/api/v2';
var catalog_combo_template =    '<label for="sel{{counter}}">{{name}}:</label><br>';
catalog_combo_template +=       '<select style="' + selectElementWidth + '" class="form-control form-catalogo" {{status}} id="sel{{counter}}">';
catalog_combo_template +=           '<option value=""></option>';
catalog_combo_template +=       '</select>';
var cataloghtml = '<div class="form-catalogo catalogo-combos">';
var campos = [];

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


//===SET SELECT2 ON TARGET ELEMENT===
function setSelect2(camposIndex){
    $('#sel' + camposIndex).select2({
        ajax: {
            url: APIurl + '/opcoes_campos?id_campo=' + campos[camposIndex].id,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                console.log(params);
                return {
                    name: params.term// search term
                };
            },
            processResults: function (data, params) {
                console.log(data);
                console.log(params);
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                return {

                    results: $.map(data.opcoes_campos, function (item) {
                        console.log(item);
                        //var id_tag_zendesk = item.id + '|' + item.tag_zendesk;
                        return {
                            text: item.nome,
                            id: item.id
                        }
                    })
                    //results: data.items
                };
            },
            cache: true
        }
    });
}
//======

catalogV2API('GET', '/campos', '', function(response){
	campos = response.campos;
	console.log(campos);
	console.log(campos.length);

	for(var i=0; i<campos.length; i++){
        var html = catalog_combo_template;
        html = html.replace(/{{counter}}/g, i);
        html = html.replace('{{name}}', campos[i].nome);
        if(i == 0)
            html = html.replace('{{status}}', 'enabled');
        else
            html = html.replace('{{status}}', 'disabled');
        //$('.catalogo-combos').append(html);
        cataloghtml += html + '<br><br>';
    }
    cataloghtml += '</div>';
    document.getElementById("catalogV2").innerHTML = cataloghtml;


    //===GENERATE FIRST COMBO OPTIONS===
    setSelect2(0);
    //======

    //===CATALOG BOXES DEPENDENCIES===
    /*
    $('.form-catalogo').change(function(){
        if($("#hierarquia").is(':checked')){
            console.log("Executando função do catalogo para o ID: " + this.id);
            dynamicFormCombos(this);
        }
    });
    */
    //======

});

//document.body.innerHTML +=htmlTemplate;


