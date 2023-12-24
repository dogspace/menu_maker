
// Return table group HTML
const tableGroupHTML = (groupName, className) => {
    let groupTag = ''
    if (groupName != 'ungrouped' && className != 'ungrouped') {
        groupTag = `
        <div class="table-group-tag">
            <div class="table-group-name">` + groupName + `</div>
            <div class="table-group-handle">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-360v-80h640v80H160Zm0-160v-80h640v80H160Z"/></svg>
            </div>
        </div>`
    }
    return `<div class="table-group ` + className + `">` + groupTag + `</div>`
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
    let groupTag = ''
    if (groupName != 'ungrouped' && className != 'ungrouped') {
        groupTag = `<div class="menu-group-name">` + groupName + `</div>`
    }
    return `<div class="menu-group ` + className + `">` + groupTag + `</div>`
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
