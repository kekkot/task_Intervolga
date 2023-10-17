function openModal(){
    document.querySelector(".modal").classList.add("open");
    document.querySelector(".overlay").classList.add("open");
}
function closeModal(){   
    document.querySelector(".overlay").classList.remove("open");    
    document.querySelector(".modal").classList.remove("open");
}
//Сбор данных формы
function serializeForm(formNode) {
    const { elements } = formNode

    const data = new FormData()
  
    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        const { name, value } = element
  
        data.append(name, value)
      })
      console.log(data);
    return data
}
//
function writeText(block, data){
    block.innerHTML = "";
    for(let [name, value] of data) {
        document.querySelector(".wrapper__content").innerHTML += (`${name} = ${value}`) + "<br>"; 
      }
}
function handleFormSubmit(event) {
    event.preventDefault();
    closeModal();
    let data = serializeForm(document.getElementById("modal"));        
    let block = document.querySelector(".wrapper__content");
    writeText(block, data);
  }
function openDatePicker(){
    this.type='date';
    this.showPicker();
}
function closeDatePicker(){
    this.type='text';
}
/*function eventCalllback(e){
    let el = e.target,
    clearVal = el.dataset.maskClear,
    pattern = el.dataset.maskPattern,
    matrix = pattern,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
}*/

window.onload = function(){
    document.getElementById('modal').addEventListener("submit", handleFormSubmit);
    document.querySelector('.modal__button-cancle').addEventListener("click", closeModal);

    document.querySelectorAll('text, input').forEach(function(e) {
        if(e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
        e.addEventListener('input', function() {
            window.sessionStorage.setItem(e.name, e.value);
        })
    })

    document.querySelector("#date").addEventListener("focus", openDatePicker);
    document.querySelector("#date").addEventListener("blur", closeDatePicker);

    /*let mask_inputs = document.querySelectorAll('[data-mask-pattern]');
    for (let elem of mask_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }*/
}