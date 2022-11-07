var paid = document.getElementsByClassName("fa-check");
var unpaid = document.getElementsByClassName("fa-remove");
var trash = document.getElementsByClassName("fa-trash-o");

Array.from(paid).forEach(function(element) {
      element.addEventListener('click', function(event){

        const company = this.parentNode.parentNode.childNodes[1].innerText
        const client = this.parentNode.parentNode.childNodes[3].innerText
        const dueDate = this.parentNode.parentNode.childNodes[5].innerText
        const balance = this.parentNode.parentNode.childNodes[7].innerText
        // const hasBeenPaid = this.parentNode.parentNode.childNodes[9]
        const hasBeenPaid = this.parentNode.parentNode.childNodes[9].innerText
        // const green = document.getElementById("green")
        // const hasBeenPaid = event.target.classList.contains('money-green') ? true : false
        // hasBeenPaid ? paid.classList.remove('money-green') : paid.classList.add('money-green')
        console.log(hasBeenPaid)
        // console.log(checked)
     
        fetch('invoices', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'company': company,
            'client': client,
            'dueDate': dueDate,
            'balance': balance,
            'hasBeenPaid': hasBeenPaid,

          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        

        })
      });
});
Array.from(unpaid).forEach(function(element) {
  element.addEventListener('click', function(event){

    const company = this.parentNode.parentNode.childNodes[1].innerText
    const client = this.parentNode.parentNode.childNodes[3].innerText
    const dueDate = this.parentNode.parentNode.childNodes[5].innerText
    const balance = this.parentNode.parentNode.childNodes[7].innerText
    const hasBeenPaid = this.parentNode.parentNode.childNodes[9].innerText
    // const hasBeenPaid = this.parentNode.parentNode.childNodes[9]
    // const green = document.getElementById("green")
    // const hasBeenPaid = event.target.classList.contains('money-green') ? true : false
    // hasBeenPaid ? unpaid.classList.remove('money-green') : unpaid.classList.add('money-green')
    console.log(hasBeenPaid)
    // console.log(checked)
 
    fetch('unpaidInvoices', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'company': company,
        'client': client,
        'dueDate': dueDate,
        'balance': balance,
        'hasBeenPaid': hasBeenPaid,

      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    

    })
  });
});
// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     //add phone number
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     console.log(thumbDown)
//     //fetches to api created in routes
//     //a request
//     fetch('dislikes', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp': thumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
