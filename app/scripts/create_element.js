
// Return table group HTML
const tableGroupHTML = (groupName, className) => {
    return `
        <div class="table-group ` + className + `">
            <div class="table-group-name">` + groupName + `</div>
        </div>`
}

// Return table item HTML
const tableItemHTML = (itemText) => {
    return `
        <div class="table-item">
            <div class="item-checkbox"><span class="circle"></span></div>
            <div class="item-content">` + itemText + `</div>
        </div>`
}

// Return menu group HTML
const menuGroupHTML = (groupName, className) => {
    return `
        <div class="menu-group ` + className + `">
            <div class="menu-group-name">` + groupName + `</div>
        </div>`
}

// Return menu dish HTML
const menuDishHTML = (id, title, items) => {
    return `
        <div class="menu-dish">
            <div class="dish-info">
                <div class="dish-id">` + id + `</div>
                <div class="dish-title">` + title + `</div>
            </div>
            <div class="dish-items">` + items + `</div>
            <div class="dish-delete inactive">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 
                    56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </div>
        </div>`
}


export {
    tableGroupHTML as tableGroupHTML,
    tableItemHTML as tableItemHTML,
    menuGroupHTML as menuGroupHTML,
    menuDishHTML as menuDishHTML
}
