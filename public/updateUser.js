$('#updatedUser').validate({
    rules: {
        userID: {
            required: true
        },
        password: {
            required: true
        },
        newpassword: {
            required: true
        },
        confnewpassword: { 
            required: true
        }
    },

    messages: {
        userID: {
            required: 'Please enter user ID'
        },
        password: {
            required: 'Please enter password'
        },
        newpassword: {
            required: 'Please enter new password'
        }, 
        confnewpassword: {
            required : 'Confirm New Password'
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
        password: $('#password')[0].value,
        newpassword: $('#newpassword')[0].value,
        confnewpassword: $('#confnewpassword')[0].value,
    };
    const post = $.post('http://localhost:3000/updatingUser', data);

    var pass = document.getElementById('newpassword').value;
    var conf_pass = document.getElementById('confnewpassword').value;
    if(pass != conf_pass){
        let resu = `<p>Passwords Do not match</p>`;
        $(resu).appendTo('#result');
    }else{
        post.done(processResults);
        post.fail(processErrors);
    }
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
    message =  `<p>User updated successfully</p>`;
    $(message).appendTo('#result');
}