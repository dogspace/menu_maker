
// Returns group tag (used for both table and menu groups)
const groupTagHTML = (groupName) => {
    return `
        <div class="group-tag">
            <div class="group-name">` + groupName + `</div>
            <div class="group-control-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                </svg>
            </div>
            <div class="group-controls hidden">
                <div class="group-ungroup">Ungroup items</div>
                <div class="group-delete">Delete group</div>
            </div>
        </div>`
}

// Return table group HTML
const tableGroupHTML = (groupName, className) => {
    if (groupName == 'ungrouped' || className == 'ungrouped') {
        return `<div class="table-group ` + className + `"></div>`
    } else {
        return `<div class="table-group ` + className + `">` + groupTagHTML(groupName) + `</div>`
    }
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
    if (groupName == 'ungrouped' || className == 'ungrouped') {
        return `<div class="menu-group ` + className + `"></div>`
    } else {
        return `<div class="menu-group ` + className + `">` + groupTagHTML(groupName) + `</div>`
    }
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
            <div class="dish-archive-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M360-200q-20 0-37.5-9T294-234L120-480l174-246q11-16 28.5-25t37.5-9h400q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H360Zm400-80v-400 400Zm-400 0h400v-400H360L218-480l142 200Zm96-40 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z"/>
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
