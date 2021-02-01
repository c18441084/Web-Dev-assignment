$('#userGone').validate({
    rules: {
        userID: {
            required: true
        },

        password: {
            required: true
        }
    },

    messages: {
        userID: {
            required: 'Please enter user ID'
        },
        password: {
            required: 'Please enter password'
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
        userID: $('#userID')[0].value,
        password: $('#password')[0].value
    };
    const post = $.post('http://localhost:3000/byeUser', data);
    post.done(processResults);
    post.fail(processErrors);
}

function processErrors(){
    console.log('Validation errors');
    var message = document.getElementById("result");
    document.getElementById("result").innerHTML = "";
    message =  `<p>User doesn't exist</p>`;
    $(message).appendTo('#result');
}

function processResults(){
    console.log('Data sent to the server');

    var message = document.getElementById("result");
    document.getElementById("result").innerHTML = "";
    message =  `<p>User deleted successfully</p>`;
    $(message).appendTo('#result');
}