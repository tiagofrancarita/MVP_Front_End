/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/carros';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.carros.forEach(item => insertList(item.id, item.marca, item.modelo, item.placa, item.quilometragem, item.ano))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputMarca, inputModelo, inputPlaca, inputQuilometragem, inputAno) => {
    const formData = new FormData();
    formData.append('marca', inputMarca);
    formData.append('modelo', inputModelo);
    formData.append('placa', inputPlaca);
    formData.append('Quilometagem', inputQuilometragem);
    formData.append('Anp', inputAno);
  
    let url = 'http://127.0.0.1:5000/carro';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza que deseja excluir o carro ?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/carro?id=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com nome, quantidade e valor 
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputMarca = document.getElementById("newMarca").value;
    let inputModelo = document.getElementById("newModel").value;
    let inputPlaca = document.getElementById("newBoard").value;
    let inputQuilometragem = document.getElementById("newQuilometers").value;
    let inputAno = document.getElementById("newYars").value;
  
    if (inputMarca === '') {
      alert("Digite a marca do carro");
    } else if (isNaN(inputQuilometragem)|| isNaN(inputAno)) {
      alert("Quilometagem e ano precisam ser números!");
    } else {
      insertList(inputMarca, inputModelo, inputPlaca, inputQuilometragem,inputAno)
      postItem(inputMarca, inputModelo, inputPlaca, inputQuilometragem,inputAno)
      
      alert("Carro adicionado!")
      location.reload(true)
      
    }

    
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (id, marca, modelo, placa, quilometragem, ano) => {
    var item = [id, marca, modelo, placa, quilometragem, ano]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newMarca").value = "";
    document.getElementById("newModel").value = "";
    document.getElementById("newBoard").value = "";
    document.getElementById("newQuilometers").value = "";
    document.getElementById("newYars").value = "";
    
    removeElement()
  }