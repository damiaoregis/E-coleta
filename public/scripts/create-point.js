//selecionar os estados 
function poputateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states =>{
            for(state of states){
            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
            }
        } )
}

poputateUFs()

//selecionar as cidades
function getCity(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.seletedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then( cities =>{

            for(city of cities){
                citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
            }
            
            citySelect.disabled = false

        } )   
}

document.querySelector("select[name=uf]").addEventListener("change", getCity)


//Itens de coleta
//pegar todos os li's 
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("imput[name=items]")

let selectedItems = []


function handleSelectedItem(event){
   const itemLi = event.target

   //adicionando ou removendo uma classe com javascript
   itemLi.classList.target("selected")
   
   const itemId = itemLi.dataset.id


   // verificar se existem itens sellecionados, se sim 
   // pegar os itens selecionados 
   
   const alreadySelected = selectedItems
   .findIndex(item => item == itemId)


   if( alreadySelected >= 0 ){
     const filteredItems = selectedItems.filter(item => item != itemId)
       selectedItems = filteredItems
   } else {
     selectedItems.push(itemId)
   }

   collectedItems.value = selectedItems
}
