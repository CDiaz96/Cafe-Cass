var trash = document.getElementsByClassName("fa fa-trash");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const order = this.parentNode.parentNode.children[0].innerText.slice(18)
    const name = this.parentNode.parentNode.children[2].innerText.slice(15)
    const barista = this.parentNode.parentNode.children[4].innerText
    console.log(order)
    console.log(name)
    console.log(barista)
    fetch('/deleteCompletedOrder', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'order': order,
        'barista': barista

      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

orderVoice = document.querySelector('#update')
orderVoice.addEventListener('click', () => {
  orderInput = document.querySelector('#name')
  if (orderInput.value) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = `Your order is being prepared.`;
    window.speechSynthesis.speak(msg);
  } else {
    alert("Please input an order")
  }

})