const container = document.querySelector('.todo_container');
const contentbox = container.querySelector('.items_container');
const errorcontent = container.querySelector('.empty_content');
const currentform = container.querySelector('form');
const todo = currentform.querySelector('#content');
const btnsubmit = currentform.querySelector('.btn_submit');
const DeleteSelected = container.querySelector('.btn_delete_selected');
const Select = container.querySelector('.btn_select_all');
const datecheck = container.querySelector('#check');


let contentchilderns = contentbox.children;
   


//check if input value empty or not
btnsubmit.onclick = () => {
   if (todo.value !== '') {
      btnsubmit.classList.remove('required_todo');
   } else {
      btnsubmit.classList.add('required_todo');
   }
}

//submit form 
currentform.onsubmit = e => {
   e.preventDefault();

   datecheck.checked
   ? contentbox.innerHTML += `<div class="todo_item date_checked">
             <div class="item_content">
                <p class="content" dir="auto">
                ${todo.value.replace(/\</g , '&lt;')}
                </p>
                <button class="btn_delete" data-index="${contentbox.children.length}" name="delete-button" aria-label="delete_button_item_${contentbox.children.length}">
                   <i class="far fa-trash-alt"></i>
                </button>
                <button class="btn_edit" data-index="${contentbox.children.length}"
                name="edit-button" aria-label="edit_button_item_${contentbox.children.length}">
                   <i class="far fa-edit"></i>
                </button> 
             </div>
             <div class="modification_box" data-index="${contentbox.children.length}">
                  <textarea data-index="${contentbox.children.length}" required class="modify_elem">${todo.value.replace(/\</g , '&lt;')}</textarea>
                  <button class="modify_submit" type="submit" name="modify-button" aria-label="modify_submit_button">Save Modifications</button>
             </div>
             <div class="date_content">
                <span class="content">
                   <b>Created at: </b>
                   <span class="date">
                   ${GetCurrentDate()}
                   </span>
                </span>
             </div>
            </div>`
   : contentbox.innerHTML += `<div class="todo_item">
             <div class="item_content">
                <p class="content" dir="auto">
                ${todo.value.replace(/\</g , '&lt;')}
                </p>
                <button class="btn_delete" data-index="${contentbox.children.length}" name="delete-button" aria-label="delete_button_item_${contentbox.children.length}">
                   <i class="far fa-trash-alt"></i>
                </button>
                <button class="btn_edit" data-index="${contentbox.children.length}"
                name="edit-button" aria-label="edit_button_item_${contentbox.children.length}">
                   <i class="far fa-edit"></i>
                </button> 
             </div>
             <div class="modification_box" data-index="${contentbox.children.length}">
                  <textarea data-index="${contentbox.children.length}" required class="modify_elem">${todo.value.replace(/\</g , '&lt;')}</textarea>
                  <button class="modify_submit" type="submit" name="modify-button" aria-label="modify_submit_button">Save Modifications</button>
             </div>
             
            </div>`
   todo.value = '';

   DisplayErrorContent(contentchilderns.length);

   const DeleteButtons = contentbox.querySelectorAll('.btn_delete');
   const EditButtons = contentbox.querySelectorAll('.btn_edit');
   // const Modifications = contentbox.querySelectorAll('.modification_box');
   
   CollectDeleteButtons(DeleteButtons);
   CollectEditButtons(EditButtons);
   // CollectAllModifications(Modifications);

   CollectItems(true);
}

function GetCurrentDate() {

   const d = new Date();
   const mn = d.getMonth();
   const day = d.getDay();
   const y = d.getFullYear();
   var h = d.getHours(); 
   var m = d.getMinutes(); 
   var session = "AM";
   const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
   ];
   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    
    var time = h + ":" + m + " " + session;
   
   const currentmonth = months[mn].toLowerCase().toString();
   const month = currentmonth.charAt(0).toUpperCase() + currentmonth.slice(1);
   
   const FullDate = days[day] + ', ' + month + ' ' + day + ' ,' + y + ' - ' + time;

   return FullDate;
}
//Check if there is any childs inside or not
window.onload = () => {
   DisplayErrorContent(contentchilderns.length)
}

//delete button
function CollectDeleteButtons(deletes) {
   
   deletes.forEach(del => {
      del.onclick = () => {
         let itdindex = del.dataset.index;
         var todoitems = contentbox.querySelectorAll('.todo_item');

         todoitems[itdindex].remove();
         
         CollectItems(false);
         DisplayErrorContent(contentchilderns.length);
      }
   })

}

//edit button

function CollectEditButtons(edits) {
   
   edits.forEach(edit => {
      edit.onclick = () => {
         let itdindex = edit.dataset.index;
         CollectItems(false);
         CollectAllModifications( itdindex );
      }
   })

}

function CollectAllModifications(id) {
   const ModificationBox = document.querySelector(`.modification_box[data-index="${ id }"]`);
   
   //check if modification box exite or not
   if (ModificationBox) {

      const modifyelem = ModificationBox.querySelector('textarea');
      const modifysubmit = ModificationBox.querySelector('.modify_submit');
      
      //set class name first to open it
      ModificationBox.classList.add('modifications_active');

      ModificationBox.onclick = () => CollectItems(false);

      modifysubmit.onclick = () => EditCurrentTodoItem(modifyelem.value, id , ModificationBox);
   }

   
}

function EditCurrentTodoItem(v, i, c) {

   c.classList.remove('modifications_active');
   contentbox.children[i].querySelector('.item_content .content').innerHTML = v.replace(/\</g , '&lt;');

}
//items

function CollectItems(order) {

const items = contentbox.querySelectorAll('.todo_item');

   items.forEach(item => {
      item.onclick = () => { 
         CollectItems(true);
         
         if (order) {
            
            if (item.classList.contains('selected_item')) {
               item.classList.remove('selected_item');
               item.removeAttribute('data-type');
            } else {
               item.classList.add('selected_item');
               item.setAttribute('data-type' , 'selected')
            }         
         
         } else {
               item.classList.remove('selected_item');
               item.removeAttribute('data-type');
         }

      }
   })
   
}

function DisplayErrorContent(show) {

   if (show === 0) {
      errorcontent.classList.add('empty_content_show');
   } else {
      errorcontent.classList.remove('empty_content_show');
   }
   
}

DeleteSelected.onclick = () => {
   const allSelected = document.querySelectorAll('.todo_item[data-type="selected"]');
   allSelected.forEach(sel => {
      sel.remove();
      DisplayErrorContent(contentchilderns.length);
   })
}

Select.onclick = () => {
   const allitems = document.querySelectorAll('.todo_item');
   
   allitems.forEach(it => {
      if (it.classList.contains('selected_item')) {
            it.classList.remove('selected_item');
            it.removeAttribute('data-type');
         } else {
            it.classList.add('selected_item');
            it.setAttribute('data-type' , 'selected')
         }
   })
   
}

