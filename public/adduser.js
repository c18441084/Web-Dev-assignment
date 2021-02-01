$('#newUserFormCheck').validate({
    rules: {
        staff_name: {
            required: true,
            minlength: 1,
            maxlength: 50
        },

        staff_email: {
            required: true,
            email: true
        },

        password: {
            required: true,
            minlength: 5,
            maxlength: 15
        },

        conf_password: {
            required: true,
            minlength: 5,
            maxlength: 15
        }
    },

    messages: {
        staff_name: {
            required: 'Please enter your name',
            minlength: 'Field must be filled',
            maxlength: "Please enter less than 50 characters"
        },
        staff_email: {
            required: 'Please enter your email',
        },
        password: {
            required: 'Please enter password',
            minlength: 'Enter more than 5 characters',
            maxlength: 'Please enter less than 15 characters'
        },

        conf_password: {
            required: 'Please confirm your password',
            minlength: 'Enter more than 5 characters',
            maxlength: 'Please enter less than 15 characters'
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
        staff_name: $('#staff_name')[0].value,
        staff_email: $('#staff_email')[0].value,
        password: $('#password')[0].value,
        conf_password: $('#conf_password')[0].value
    }
    const post = $.post('http://localhost:3000/adduser', data);

    var pass = document.getElementById('password').value;
    var conf_pass = document.getElementById('conf_password').value;
    if(pass != conf_pass){
        let resu = `<p>Passwords Do not match</p>`;
        $(resu).appendTo('#result');
    }

    post.done(processResults);
    post.fail(processErrors);
}

$('#newUserEnter').click(function(){
    $('#newUserFormCheck')
});

function processErrors(){
    console.log('Validation errors');
}

function processResults(rows, status, xhr){
    console.log('Data sent to the server');

    var resu = document.getElementById("result");
    document.getElementById("result").innerHTML = "";
    resu =  `<p>Account made successfully</p>`;
    $(resu).appendTo('#result');
  
    var staff_name = document.getElementById('staff_name').value;

    document.getElementById('newUserEnter').style.display = 'none';

    let resul = `<p>
    Hi ${rows[0].staff_name}, 
    your new staff number is ${rows[0].staff_id}
    </p>`;  
    $(resul).appendTo('#result');
    
    document.getElementById("addprodnav").style.display = 'none';

    $('<a href="/" id = "back">Return</a>').appendTo('#result');
}
    

