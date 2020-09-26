var complete = document.getElementsByClassName("fa fa-check-square");
var trash = document.getElementsByClassName("fa fa-trash");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const order = this.parentNode.parentNode.childNodes[3].innerText
    console.log(name)
    fetch('deleteOrder', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'order': order

      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

Array.from(complete).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.parentNode.children[0].innerText
    const order = this.parentNode.parentNode.children[1].innerText
    const barista = this.parentNode.parentNode.children[2].innerText
    console.log(name)
    console.log(order)
    console.log(barista)

    var msg = new SpeechSynthesisUtterance();
    msg.text = `${name} your order ${order} is ready`;
    window.speechSynthesis.speak(msg);
    fetch('completed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'order': order,
        'barista': barista
      })
    }).then(function(response) {
      console.log(name, order)
      fetch('deleteOrder', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'order': order
        })
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});