document.getElementById("mailForm").addEventListener('submit', function(event){
    event.preventDefault();
    console.log("Submit catched");
    const name = document.getElementById("mailName").value;
    const email = document.getElementById("mailEmail").value;
    const content = document.getElementById("mailContent").value;

    console.log({name, email, content});
    sendMail(name, email, content);

});


function sendMail(name, email, content){
    $.ajax({
        url: server + "emails/send",
        type: "POST",
        data: {name: name, email: email, content},
        dataType: "json",
        success: function(data) {
            console.log(data);  
        },
        error: function(data){
            console.error(data);
        }
    });
}

