$('#formCheck').validate({
    rules: {
        username: {
            required: true,
            minlength: 1,
            maxlength: 4
        },

        password: {
            required: true,
            minlength: 5,
            maxlength: 15
        },
    },

    messages: {
        username: {
            required: 'Please enter ID',
            minlength: 'ID should contain at least 1-4 integers.'
        },
        password: {
            required: 'Please enter password',
            minlength: 'Password should contain at least 5-15 chars.'
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
        sID: $('#sID')[0].value,
        password: $('#password')[0].value
    }
    const post = $.post('http://localhost:3000/insertDetails', data);

    post.done(processResults);
    post.fail(processErrors);
}

$('#btnSubmit').click(function(){
    $('#formCheck').submit();
});

function processErrors(){
    console.log('Validation errors');
}

function processResults(){
    console.log('Data sent to the server');
}