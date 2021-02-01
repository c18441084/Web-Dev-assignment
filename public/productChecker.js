$('#formShoeSearch').validate({
    rules: {
        shoeBrand: {
            required: true,
        },

        shoeSize: {
            required: true,
            maxlength: 2
        },
    },

    messages: {
        shoeBrand: {
            required: 'Please enter a shoe brand',
        },
        shoeSize: {
            required: 'Please enter a shoe size',
            maxlength: 'Jason has big feet',
        },
    },

    onfocusout: validateFiels,
    submitHandler: createAjaxPost
});

function validateFiels(element, event) {
    $(element).valid();
}




function createAjaxPost(){
    const data = {
        search_by: $('#search_by')[0].value,
        uservalue: $('#uservalue')[0].value
    }
    const post = $.post('http://localhost:3000/productChecker', data);


    console.log(search_by + "This is dg");
    post.done(processResults);
    post.fail(processErrors);
}

$('#search').click(function(){
    $('#formShoeSearch')
});

function processErrors(){
    console.log('Validation errors');
}

function processResults(rows, status, xhr){
    console.log('Data sent to the server');

    document.getElementById("rowTable").innerHTML = "";
    
    let resultsTable = `
    <table id="resultsTable" class="table">
    <thead>
        <tr>
            <th scope="col">Product Number</th>
            <th scope="col">Brand</th>
            <th scope="col">Size</th>
            <th scope="col">Quantity</th>
        </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < rows.length; i++) {
        resultsTable += `<tr> <td> ${rows[i].product_id}</td>`
        resultsTable += `<td>${rows[i].product_brand}</td>`
        resultsTable += `<td>${rows[i].product_size}</td>`
        resultsTable += `<td>${rows[i].product_quantity}</td></tr>`
    }
    resultsTable += `
        </tbody>
    </table>`;
    $(resultsTable).appendTo('#rowTable');
}