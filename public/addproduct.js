$('#newProductCheck').validate({
    rules: {
        NewPName: {
            required: true
        },

        NewPSize: {
            required: true
        },

        NewPQuan: {
            required: true
        }
    },

    messages: {
        NewPName: {
            required: 'Please enter product name'
        },
        NewPSize: {
            required: 'Please enter product size'
        },

        NewPQuan: {
            required: 'Please enter quantity'
        }
    },

    onfocusout: validateFiels,
    submitHandler: createAjaxPost
});

function validateFiels(element, event) {
    $(element).valid();
}

function createAjaxPost(){
    const data = {
        NewPName: $('#NewPName')[0].value,
        NewPSize: $('#NewPSize')[0].value,
        NewPQuan: $('#NewPQuan')[0].value
    }
    const post = $.post('http://localhost:3000/addProduct', data);

    post.done(processResults);
    post.fail(processErrors);
}

$('#AddProdEnter').click(function(){
    $('#newProductCheck').submit();
});

function processErrors(){
    console.log('Validation errors');
}

function processResults(){
    console.log('Data sent to the server');

    var message = document.getElementById("result");
    document.getElementById("result").innerHTML = "";
    message =  `<p>Product added successfully</p>`;
    $(message).appendTo('#result');
}